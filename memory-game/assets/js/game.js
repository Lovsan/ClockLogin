// game.js: with click count, idle-based hints + extensive debug logging
console.clear();
console.log('Game script loaded');

const USER = JSON.parse(localStorage.getItem('mm_current'));
console.log('Current user:', USER);
const SCORES_KEY = 'mm_scores';
function getScores() { return JSON.parse(localStorage.getItem(SCORES_KEY) || '[]'); }
function saveScores(s) { localStorage.setItem(SCORES_KEY, JSON.stringify(s)); console.log('Scores saved:', s); }

const stageSizes = [2, 4, 6, 8, 10];
let cur = 0;
let clicks = 0;
let matched = 0;
let pairs = 0;
let first = null;
let busy = false;
let start = 0;
let hintTimeout = null;

const board = document.getElementById('game-board');
const elStage = document.getElementById('stage-num');
const elClick = document.getElementById('clicks');
const elTime = document.getElementById('timer');

const HINT_IDLE = 15000; // idle before hint
const HINT_DURATION = 1000;

function startStage() {
  console.log('--- startStage called for stage', cur+1, '---');
  if (hintTimeout) clearTimeout(hintTimeout);
  board.innerHTML = '';
  clicks = matched = 0;
  first = null; busy = false;

  elStage.textContent = cur + 1;
  elClick.textContent = clicks;
  elTime.textContent = '0:00';

  const size = stageSizes[cur];
  pairs = (size * size) / 2;
  console.log(`Grid size ${size}x${size}, pairs to find: ${pairs}`);

  board.style.display = 'grid';
  board.style.gridTemplateColumns = `repeat(${size},50px)`;
  board.style.gap = '8px';
  board.style.justifyContent = 'center';

  const baseSymbols = ['⏰','🕰️','⌚','🕒','🕑','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
  const symbols = [];
  for (let i = 0; i < pairs; i++) {
    symbols.push({
      icon: baseSymbols[i % baseSymbols.length],
      color: `hsl(${Math.floor(i * (360 / pairs))},70%,50%)`
    });
  }
  console.log('Symbols array:', symbols);

  let deck = symbols.flatMap(s => [{ ...s }, { ...s }]).sort(() => Math.random() - 0.5);
  console.log('Shuffled deck:', deck);

  deck.forEach((data, idx) => {
    const cont = document.createElement('div');
    cont.className = 'card-container';
    cont.dataset.symbol = data.icon;
    cont.dataset.index = idx;
    cont.onclick = () => flipCard(cont);

    const inner = document.createElement('div'); inner.className = 'card-inner';
    const back = document.createElement('div'); back.className = 'card-face card-back';
    const front = document.createElement('div'); front.className = 'card-face card-front';
    front.style.backgroundColor = data.color; front.textContent = data.icon;
    inner.append(back, front); cont.appendChild(inner); board.appendChild(cont);
  });

  start = Date.now();
  console.log('Stage', cur+1, 'timer started at', start);
  setInterval(updateTime, 1000);
  scheduleHint();
}

function scheduleHint() {
  console.log('Scheduling hint in', HINT_IDLE, 'ms');
  if (hintTimeout) clearTimeout(hintTimeout);
  hintTimeout = setTimeout(() => {
    console.log('Hint triggered');
    showHint();
    scheduleHint();
  }, HINT_IDLE);
}

function updateTime() {
  const elapsed = Date.now() - start;
  const s = Math.floor(elapsed / 1000);
  const m = Math.floor(s / 60);
  elTime.textContent = `${m}:${(s % 60).toString().padStart(2, '0')}`;
  console.log('Time update:', elTime.textContent);
}

function flipCard(el) {
  console.log('flipCard called on index', el.dataset.index, 'symbol', el.dataset.symbol);
  if (busy || el.classList.contains('flipped') || el.classList.contains('matched')) {
    console.log('Ignored flip: busy or already open/matched');
    return;
  }
  el.classList.add('flipped');
  clicks++; elClick.textContent = clicks;
  console.log('Clicks:', clicks);
  scheduleHint();

  if (!first) {
    first = el; console.log('First card selected:', first.dataset.symbol, first.dataset.index);
    return;
  }
  console.log('Comparing first', first.dataset.symbol, 'and second', el.dataset.symbol);
  if (first.dataset.symbol === el.dataset.symbol) {
    first.classList.add('matched'); el.classList.add('matched'); matched++;
    console.log('Match found. Total matched:', matched);
    first = null;
    if (matched === pairs) finishStage();
  } else {
    busy = true;
    setTimeout(() => {
      first.classList.remove('flipped'); el.classList.remove('flipped');
      console.log('Flip back cards:', first.dataset.index, el.dataset.index);
      first = null; busy = false;
    }, 800);
  }
}

function showHint() {
  if (matched === pairs) { console.log('All matched, skipping hint'); return; }
  const available = Array.from(document.querySelectorAll('.card-container:not(.flipped):not(.matched)'));
  console.log('Available for hint:', available.map(c => c.dataset.symbol));
  if (available.length < 2) return;
  let idx1 = Math.floor(Math.random() * available.length);
  let idx2 = Math.floor(Math.random() * (available.length - 1)); if (idx2 >= idx1) idx2++;
  const c1 = available[idx1], c2 = available[idx2];
  console.log('Hint flipping:', c1.dataset.index, c1.dataset.symbol, 'and', c2.dataset.index, c2.dataset.symbol);
  c1.classList.add('flipped'); c2.classList.add('flipped');
  setTimeout(() => {
    c1.classList.remove('flipped'); c2.classList.remove('flipped');
    console.log('Hint cards closed');
  }, HINT_DURATION);
}

function finishStage() {
  if (hintTimeout) clearTimeout(hintTimeout);
  const timeElapsed = Date.now() - start;
  console.log('Finishing stage', cur+1, 'time:', timeElapsed, 'clicks:', clicks);
  const scores = getScores(); scores.push({ user: USER.username, stage: cur + 1, time: timeElapsed, clicks }); saveScores(scores);
  document.dispatchEvent(new CustomEvent('stageCompleted',{ detail:{ stage:cur+1, time:timeElapsed, clicks }}));
  alert(`Stage ${cur+1} complete!`);
  if (cur < stageSizes.length - 1) { cur++; startStage(); } else alert('All stages completed!');
}

document.addEventListener('DOMContentLoaded', startStage);
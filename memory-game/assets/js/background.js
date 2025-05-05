// background.js: floating clock icons
document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['⏰','🕰️','⌚','🕒','🕑','🕓','🕔','🕕'];
    const container = document.getElementById('floating-bg');
    for(let i=0; i<30; i++){
      const icon = document.createElement('span');
      icon.className = 'floating-icon';
      icon.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      icon.style.left = Math.random()*100 + '%';
      icon.style.fontSize = (20 + Math.random()*30) + 'px';
      icon.style.animationDuration = (10 + Math.random()*10) + 's';
      icon.style.animationDelay = Math.random()*5 + 's';
      container.appendChild(icon);
    }
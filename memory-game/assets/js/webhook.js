// webhook.js: send Discord webhooks on game start and stage completion
function sendWebhook(eventType, payload) {
    const webhookUrl = 'https://discordapp.com/api/webhooks/1369021812708741435/PMfAms219WjEa6UvVGtM8zyNA5hi4JuV6ws_q1SmZUv7RXlbTKy7-owzE3f_kIbQ65te';
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `**${eventType}** - User: ${payload.user}${payload.stage?`, Stage: ${payload.stage}`:''}${payload.time?`, Time: ${payload.time}ms`:``}${payload.clicks?`, Clicks: ${payload.clicks}`:''}` })
    });
  }
  
  // On game load
  document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('mm_current')||'{}');
    sendWebhook('GameStarted', { user: user.username || 'Guest' });
  });
  
  // On stage completion
  document.addEventListener('stageCompleted', e => {
    const user = JSON.parse(localStorage.getItem('mm_current')||'{}');
    sendWebhook('StageCompleted', { user: user.username || 'Guest', stage: e.detail.stage, time: e.detail.time, clicks: e.detail.clicks });
  });
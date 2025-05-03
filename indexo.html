<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Secret Clock Lock</title>
  <style>
    body {
      background: black;
      color: #fff;
      font-family: Arial, sans-serif;
      margin: 0;
      overflow: hidden; /* no scroll, as symbols move out of view */
    }
    #app {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    /* Floating symbols container fills the screen */
    #floating-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      overflow: hidden;
    }
    /* Centered clock and message container */
    #clock-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 1; /* above floating symbols */
    }
    #clock {
      font-size: 5rem;
      text-shadow: 0 0 10px #fff; /* slight glow for clock text */
    }
    #message {
      margin-top: 1rem;
      font-size: 1.2rem;
      opacity: 0.8;
    }
    /* Base style for all floating symbols */
    .symbol {
      position: absolute;
      font-size: 2.5rem;
      pointer-events: none; /* clicks pass through by default */
    }
    /* Color-coded glow styles for each group */
    .red    { color: #f00; text-shadow: 0 0 5px #f00; }
    .violet { color: #d0f; text-shadow: 0 0 5px #d0f; }
    .green  { color: #0f0; text-shadow: 0 0 5px #0f0; }
    .yellow { color: #ff0; text-shadow: 0 0 5px #ff0; }
    /* Keyframes for animations */
    @keyframes float {
      0%   { transform: translateY(0); }
      50%  { transform: translateY(-20px); }
      100% { transform: translateY(0); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50%     { transform: translateY(-30px); }
    }
    @keyframes scale {
      0%, 100% { transform: scale(1); }
      50%     { transform: scale(1.3); }
    }
    /* CSS classes to apply animations */
    .float  { animation: float 6s ease-in-out infinite; }
    .spin   { animation: spin 8s linear infinite; }
    .bounce { animation: bounce 4s ease-in-out infinite; }
    .scale  { animation: scale 5s ease-in-out infinite; }
    /* Special styling for the target symbol */
    .target-symbol {
      text-shadow: 0 0 10px #0ff, 0 0 20px #0ff; /* brighter cyan glow */
      animation: float 3s ease-in-out infinite, spin 12s linear infinite; /* multiple animations */
      pointer-events: auto; /* make target clickable */
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- Floating symbols will be injected into this container -->
    <div id="floating-container"></div>
    <!-- Clock and message in the center -->
    <div id="clock-container">
      <div id="clock">12:00</div>
      <div id="message">Find and click the correct symbol to unlock</div>
    </div>
  </div>
  <script>
    // Symbol sets categorized by color
    const symbolSets = {
      red:    ['!', '@', '#', '$'],
      violet: ['%', '^', '&', '*'],
      green:  ['(', ')', '-', '='],
      yellow: ['+', '<', '>', '?']
    };
    const colors = Object.keys(symbolSets);                // ["red","violet","green","yellow"]
    const animations = ['float', 'spin', 'bounce', 'scale']; // possible animation classes
    let currentTarget = '%';  // define the current target symbol (example: violet '%')
    const targetProbability = 0.2;  // 20% of spawned symbols will be the target
    
    // Function to spawn a single symbol
    function spawnSymbol() {
      const isTarget = Math.random() < targetProbability;
      let symbolChar, colorClass;
      if (isTarget) {
        // Spawn the target symbol with its original color class
        symbolChar = currentTarget;
        for (let color in symbolSets) {
          if (symbolSets[color].includes(symbolChar)) {
            colorClass = color;
            break;
          }
        }
      } else {
        // Spawn a random non-target symbol
        colorClass = colors[Math.floor(Math.random() * colors.length)];
        const symbols = symbolSets[colorClass];
        symbolChar = symbols[Math.floor(Math.random() * symbols.length)];
        // Avoid accidentally picking the target symbol as a decoy
        if (symbolChar === currentTarget) {
          symbolChar = symbols[0] === currentTarget ? symbols[1] : symbols[0];
        }
      }
      // Create the symbol element
      const span = document.createElement('span');
      span.textContent = symbolChar;
      span.classList.add('symbol', colorClass);
      if (isTarget) span.classList.add('target-symbol');
      // Random position within the viewport
      const maxX = document.documentElement.clientWidth;
      const maxY = document.documentElement.clientHeight;
      span.style.left = Math.random() * maxX + 'px';
      span.style.top  = Math.random() * maxY + 'px';
      // Random opacity between 0.1 and 0.5 for subtlety
      span.style.opacity = (Math.random() * 0.4 + 0.1).toFixed(2);
      // Assign a random animation class for movement
      const anim = animations[Math.floor(Math.random() * animations.length)];
      span.classList.add(anim);
      // Add the symbol to the floating container
      document.getElementById('floating-container').appendChild(span);
      // Remove the symbol after 10 seconds to keep the scene from overcrowding
      setTimeout(() => span.remove(), 10000);
    }
    
    // Continuously spawn symbols every 1 second
    setInterval(spawnSymbol, 1000);
    
    // Update the clock display every second
    setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      document.getElementById('clock').textContent = hh + ':' + mm;
    }, 1000);
    
    // Click handler to detect if the target symbol is clicked
    document.getElementById('floating-container').addEventListener('click', (e) => {
      if (e.target.classList.contains('symbol')) {
        const clickedSymbol = e.target.textContent;
        if (clickedSymbol === currentTarget) {
          alert('Unlocked! You found the correct symbol.');
          // Additional unlock logic can be added here
        }
      }
    });
  </script>
</body>
</html>

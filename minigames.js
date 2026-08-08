// ===== Mini Games =====

// Sound Effects using Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let isMuted = localStorage.getItem('gameSoundsMuted') === 'true';

function getAudioContext() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {}
}

const sounds = {
  splash: () => { playTone(800, 0.15, 'sine'); setTimeout(() => playTone(600, 0.1, 'sine'), 50); },
  sizzle: () => { playTone(200, 0.3, 'sawtooth', 0.2); },
  miss: () => { playTone(150, 0.2, 'square', 0.2); },
  swish: () => { playTone(1200, 0.1, 'sine'); setTimeout(() => playTone(1600, 0.15, 'sine'), 50); },
  brick: () => { playTone(100, 0.15, 'square', 0.3); },
  bounce: () => { playTone(300, 0.1, 'triangle'); },
  flip: () => { playTone(800, 0.05, 'sine', 0.2); },
  match: () => { playTone(523, 0.1, 'sine'); setTimeout(() => playTone(659, 0.1, 'sine'), 100); setTimeout(() => playTone(784, 0.15, 'sine'), 200); },
  win: () => { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.4), i * 150)); },
  gameOver: () => { playTone(300, 0.2, 'square'); setTimeout(() => playTone(200, 0.3, 'square'), 200); }
};

// Country phrases for Travel Memory
const countryPhrases = {
  'Canada': { lang: 'en-CA', phrases: ['Great job!', 'Awesome!', 'Nice one, eh!'] },
  'USA': { lang: 'en-US', phrases: ['Awesome!', 'Nice match!', 'You got it!'] },
  'Greece': { lang: 'el-GR', phrases: ['Μπράβο!', 'Τέλεια!', 'Πολύ καλά!'] },
  'Germany': { lang: 'de-DE', phrases: ['Super!', 'Gut gemacht!', 'Ausgezeichnet!'] },
  'Sweden': { lang: 'sv-SE', phrases: ['Bra jobbat!', 'Utmärkt!', 'Fantastiskt!'] },
  'Spain': { lang: 'es-ES', phrases: ['¡Muy bien!', '¡Excelente!', '¡Genial!'] },
  'Italy': { lang: 'it-IT', phrases: ['Bravo!', 'Perfetto!', 'Benissimo!'] },
  'Mexico': { lang: 'es-MX', phrases: ['¡Órale!', '¡Muy bien!', '¡Chido!'] },
  'UK': { lang: 'en-GB', phrases: ['Brilliant!', 'Well done!', 'Lovely!'] },
  'France': { lang: 'fr-FR', phrases: ['Bravo!', 'Magnifique!', 'Très bien!'] },
  'Denmark': { lang: 'da-DK', phrases: ['Godt klaret!', 'Fantastisk!', 'Perfekt!'] },
  'Belize': { lang: 'en-BZ', phrases: ['Nice one!', 'You got it!', 'Well done!'] },
  'Russia': { lang: 'ru-RU', phrases: ['Молодец!', 'Отлично!', 'Прекрасно!'] },
  'Estonia': { lang: 'et-EE', phrases: ['Tubli!', 'Suurepärane!', 'Väga hea!'] },
  'Finland': { lang: 'fi-FI', phrases: ['Hienoa!', 'Loistavaa!', 'Mahtavaa!'] },
  'Jamaica': { lang: 'en-JM', phrases: ['Irie!', 'Yah mon!', 'Big up!'] },
  'Puerto Rico': { lang: 'es-PR', phrases: ['¡Wepa!', '¡Muy bien!', '¡Brutal!'] },
  'Switzerland': { lang: 'de-CH', phrases: ['Toll!', 'Super gmacht!', 'Wunderbar!'] },
  'Turkey': { lang: 'tr-TR', phrases: ['Harika!', 'Çok güzel!', 'Aferin!'] },
  'Austria': { lang: 'de-AT', phrases: ['Super!', 'Sehr gut!', 'Wunderbar!'] },
  'Bosnia': { lang: 'bs-BA', phrases: ['Bravo!', 'Odlično!', 'Super!'] },
  'Cayman Islands': { lang: 'en-KY', phrases: ['Awesome!', 'Great job!', 'Well done!'] },
  'Haiti': { lang: 'ht-HT', phrases: ['Trè byen!', 'Anfòm!', 'Brav!'] },
  'Monaco': { lang: 'fr-MC', phrases: ['Magnifique!', 'Bravo!', 'Excellent!'] },
  'Netherlands': { lang: 'nl-NL', phrases: ['Goed gedaan!', 'Fantastisch!', 'Prima!'] },
  'Panama': { lang: 'es-PA', phrases: ['¡Muy bien!', '¡Excelente!', '¡Chévere!'] }
};

function speakPhrase(country) {
  if (isMuted || !window.speechSynthesis) return;
  const data = countryPhrases[country];
  if (!data) return;
  const phrase = data.phrases[Math.floor(Math.random() * data.phrases.length)];
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = data.lang;
  utterance.rate = 1.0;
  utterance.pitch = 1.1;
  utterance.volume = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// ===== Coffee Catch Game =====
let coffeeGame = {
  score: 0,
  lives: 3,
  combo: 0,
  items: [],
  cupPosition: 50,
  gameOver: false,
  animationId: null,
  highScore: parseInt(localStorage.getItem('coffeeCatchHighScore') || '0')
};

function openCoffeeGame() {
  document.getElementById('coffeeGameModal').classList.add('active');
  resetCoffeeGame();
  startCoffeeGame();
}

function closeCoffeeGame() {
  document.getElementById('coffeeGameModal').classList.remove('active');
  cancelAnimationFrame(coffeeGame.animationId);
  coffeeGame.items = [];
}

function resetCoffeeGame() {
  coffeeGame.score = 0;
  coffeeGame.lives = 3;
  coffeeGame.combo = 0;
  coffeeGame.items = [];
  coffeeGame.gameOver = false;
  coffeeGame.cupPosition = 50;
  // Reset cup position using CSS variable for GPU-accelerated transforms
  const cup = document.getElementById('coffeeCup');
  if (cup) cup.style.setProperty('--cup-x', 50);
  updateCoffeeUI();
  document.getElementById('coffeeGameOver').style.display = 'none';
  // Clean up any remaining falling items
  const gameArea = document.getElementById('coffeeGameArea');
  if (gameArea) {
    gameArea.querySelectorAll('.falling-item').forEach(el => el.remove());
  }
}

function updateCoffeeUI() {
  document.getElementById('coffeeScore').textContent = coffeeGame.score;
  const comboMultiplier = Math.min(Math.floor(coffeeGame.combo / 3) + 1, 5);
  document.getElementById('coffeeCombo').textContent = coffeeGame.combo + (coffeeGame.combo >= 3 ? ` (${comboMultiplier}x)` : '');
  document.getElementById('coffeeLives').textContent = '☕'.repeat(coffeeGame.lives);
  document.getElementById('coffeeHighScore').textContent = coffeeGame.highScore;
}

function startCoffeeGame() {
  const gameArea = document.getElementById('coffeeGameArea');
  const cup = document.getElementById('coffeeCup');
  const mobileSlider = document.getElementById('coffeeMobileSlider');
  const sliderThumb = document.getElementById('coffeeSliderThumb');
  const mobileHint = document.getElementById('coffeeMobileHint');
  let lastSpawn = 0;
  
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
  
  // Show/hide mobile slider based on device
  if (isMobile) {
    mobileSlider.style.display = 'block';
    mobileHint.style.display = 'block';
  } else {
    mobileSlider.style.display = 'none';
    mobileHint.style.display = 'none';
  }
  
  // Desktop controls - direct game area interaction
  if (!isMobile) {
    gameArea.onmousemove = (e) => {
      if (coffeeGame.gameOver) return;
      const rect = gameArea.getBoundingClientRect();
      coffeeGame.cupPosition = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
      cup.style.setProperty('--cup-x', coffeeGame.cupPosition);
    };
    
    gameArea.ontouchmove = (e) => {
      if (coffeeGame.gameOver) return;
      const rect = gameArea.getBoundingClientRect();
      coffeeGame.cupPosition = Math.max(10, Math.min(90, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
      cup.style.setProperty('--cup-x', coffeeGame.cupPosition);
    };
  } else {
    // Disable game area touch on mobile to prevent interference
    gameArea.onmousemove = null;
    gameArea.ontouchmove = null;
  }
  
  // Mobile slider controls
  const handleSliderMove = (clientX) => {
    if (coffeeGame.gameOver) return;
    const rect = mobileSlider.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    coffeeGame.cupPosition = Math.max(10, Math.min(90, x));
    cup.style.setProperty('--cup-x', coffeeGame.cupPosition);
    sliderThumb.style.left = coffeeGame.cupPosition + '%';
  };
  
  mobileSlider.ontouchstart = (e) => {
    e.preventDefault();
    handleSliderMove(e.touches[0].clientX);
  };
  
  mobileSlider.ontouchmove = (e) => {
    e.preventDefault();
    handleSliderMove(e.touches[0].clientX);
  };
  
  function gameLoop(time) {
    if (coffeeGame.gameOver) return;
    
    // Spawn items - faster after 200
    let spawnInterval, duration;
    
    if (coffeeGame.score >= 200) {
      // Intense mode after 200
      spawnInterval = Math.max(400, 600 - (coffeeGame.score - 200) * 2);
      duration = Math.max(1200, 1800 - (coffeeGame.score - 200) * 3);
    } else {
      // Normal progression
      spawnInterval = Math.max(800, 1200 - coffeeGame.score * 10);
      duration = Math.max(2000, 3500 - coffeeGame.score * 30);
    }
    
    if (time - lastSpawn > spawnInterval) {
      spawnCoffeeItem(time, duration);
      lastSpawn = time;
    }
    
    // Update items
    updateCoffeeItems(time);
    
    coffeeGame.animationId = requestAnimationFrame(gameLoop);
  }
  
  coffeeGame.animationId = requestAnimationFrame(gameLoop);
}

function spawnCoffeeItem(time, duration) {
  const isHot = Math.random() > 0.75;
  const gameArea = document.getElementById('coffeeGameArea');
  const gameHeight = gameArea.offsetHeight;
  
  const item = {
    id: Date.now(),
    x: Math.random() * 70 + 15,
    startTime: time,
    type: isHot ? 'hot' : 'coffee',
    duration: duration,
    element: null,
    gameHeight: gameHeight
  };
  
  const el = document.createElement('div');
  el.className = 'falling-item';
  el.textContent = isHot ? '🔥☕' : '🧊☕';
  el.style.left = item.x + '%';
  el.style.top = '0';
  // Use transform animation instead of top transition for GPU acceleration
  el.style.animation = `fallDown ${duration}ms linear forwards`;
  el.style.setProperty('--fall-distance', gameHeight + 'px');
  gameArea.appendChild(el);
  
  item.element = el;
  coffeeGame.items.push(item);
}

function updateCoffeeItems(time) {
  const toRemove = [];
  
  coffeeGame.items.forEach((item, index) => {
    const elapsed = time - item.startTime;
    const progress = Math.min(elapsed / item.duration, 1);
    const yPos = progress * 100;
    
    // Check catch zone
    if (yPos >= 78 && yPos <= 100 && !item.caught) {
      const catchRadius = 12; // Same catch radius for both types
      if (Math.abs(item.x - coffeeGame.cupPosition) <= catchRadius) {
        item.caught = true;
        if (item.type === 'coffee') {
          sounds.splash();
          coffeeGame.combo++;
          const multiplier = Math.min(Math.floor(coffeeGame.combo / 3) + 1, 5);
          coffeeGame.score += multiplier;
          if (coffeeGame.score > coffeeGame.highScore) {
            coffeeGame.highScore = coffeeGame.score;
            localStorage.setItem('coffeeCatchHighScore', coffeeGame.highScore);
          }
        } else {
          sounds.sizzle();
          triggerHitFlash();
          coffeeGame.combo = 0;
          coffeeGame.lives--;
          if (coffeeGame.lives <= 0) endCoffeeGame();
        }
        updateCoffeeUI();
        item.element.remove();
        toRemove.push(index);
      }
    }
    
    // Fallen past bottom
    if (progress >= 1 && !item.caught) {
      if (item.type === 'coffee') {
        // Missing iced coffee just resets combo, no life lost
        sounds.miss();
        coffeeGame.combo = 0;
        updateCoffeeUI();
      }
      // Hot coffee falling past is fine - player avoided it successfully
      item.element.remove();
      toRemove.push(index);
    }
  });
  
  toRemove.reverse().forEach(i => coffeeGame.items.splice(i, 1));
}

// Trigger red flash and shake effect
function triggerHitFlash() {
  const gameArea = document.getElementById('coffeeGameArea');
  const flashOverlay = document.getElementById('coffeeHitFlash');
  
  // Show red flash
  flashOverlay.style.opacity = '0.4';
  setTimeout(() => flashOverlay.style.opacity = '0', 200);
  
  // Shake effect
  gameArea.classList.add('shake');
  setTimeout(() => gameArea.classList.remove('shake'), 200);
}

function endCoffeeGame() {
  coffeeGame.gameOver = true;
  sounds.gameOver();
  document.getElementById('coffeeFinalScore').textContent = coffeeGame.score;
  document.getElementById('coffeeGameOver').style.display = 'flex';
}

// ===== Basketball Game =====
let basketballGame = {
  score: 0,
  attempts: 0,
  streak: 0,
  power: 50,
  angle: 45,
  isFlying: false,
  movingHoop: false,
  timerMode: false,
  timeLeft: 30,
  timerActive: false,
  hoopOffset: 0,
  highScore: parseInt(localStorage.getItem('basketballHighScore') || '0'),
  bestStreak: parseInt(localStorage.getItem('basketballBestStreak') || '0')
};

function openBasketballGame() {
  document.getElementById('basketballGameModal').classList.add('active');
  resetBasketballGame();
}

function closeBasketballGame() {
  document.getElementById('basketballGameModal').classList.remove('active');
  basketballGame.timerActive = false;
  basketballGame.movingHoop = false;
  if (hoopAnimationId) {
    cancelAnimationFrame(hoopAnimationId);
    hoopAnimationId = null;
  }
}

function resetBasketballGame() {
  basketballGame.score = 0;
  basketballGame.attempts = 0;
  basketballGame.streak = 0;
  basketballGame.timeLeft = 30;
  basketballGame.timerActive = false;
  basketballGame.isFlying = false;
  basketballGame.hoopOffset = 0;
  // Reset hoop position to center
  document.getElementById('basketballHoop').style.transform = 'translateX(-50%)';
  updateBasketballUI();
  document.getElementById('basketballTimerEnd').style.display = 'none';
}

function updateBasketballUI() {
  document.getElementById('basketballScore').textContent = basketballGame.score;
  const multiplier = getComboMultiplier(basketballGame.streak);
  document.getElementById('basketballStreak').textContent = '🔥 ' + basketballGame.streak + (basketballGame.streak >= 3 ? ` (${multiplier}x)` : '');
  document.getElementById('basketballBest').textContent = basketballGame.timerMode ? `⏱️ ${basketballGame.timeLeft}s` : basketballGame.bestStreak;
  document.getElementById('powerValue').textContent = basketballGame.power + '%';
  document.getElementById('angleValue').textContent = basketballGame.angle + '°';
  
  // Highlight sweet spot
  document.getElementById('powerValue').className = Math.abs(basketballGame.power - 55) <= 10 ? 'highlight' : '';
  document.getElementById('angleValue').className = Math.abs(basketballGame.angle - 47) <= 7 ? 'highlight' : '';
}

function getComboMultiplier(streak) {
  if (streak >= 10) return 5;
  if (streak >= 7) return 4;
  if (streak >= 5) return 3;
  if (streak >= 3) return 2;
  return 1;
}

function toggleMovingHoop() {
  basketballGame.movingHoop = !basketballGame.movingHoop;
  document.getElementById('movingHoopBtn').classList.toggle('active', basketballGame.movingHoop);
  
  // Reset hoop to center when toggling off
  if (!basketballGame.movingHoop) {
    basketballGame.hoopOffset = 0;
    document.getElementById('basketballHoop').style.transform = 'translateX(-50%)';
  }
  
  resetBasketballGame();
  
  if (basketballGame.movingHoop) {
    animateHoop();
  }
}

let hoopAnimationId = null;

function animateHoop() {
  // Cancel any existing animation
  if (hoopAnimationId) {
    cancelAnimationFrame(hoopAnimationId);
    hoopAnimationId = null;
  }
  
  if (!basketballGame.movingHoop) {
    basketballGame.hoopOffset = 0;
    document.getElementById('basketballHoop').style.transform = 'translateX(-50%)';
    return;
  }
  
  const startTime = performance.now();
  const hoop = document.getElementById('basketballHoop');
  
  function animate(time) {
    if (!basketballGame.movingHoop) {
      basketballGame.hoopOffset = 0;
      hoop.style.transform = 'translateX(-50%)';
      return;
    }
    
    const elapsed = (time - startTime) / 1000;
    // Smooth sine wave movement - combining two waves for natural feel
    const offset = Math.sin(elapsed * 1.2) * 80 + Math.sin(elapsed * 0.7) * 40;
    
    basketballGame.hoopOffset = offset;
    hoop.style.transform = `translateX(calc(-50% + ${offset}px))`;
    hoopAnimationId = requestAnimationFrame(animate);
  }
  
  hoopAnimationId = requestAnimationFrame(animate);
}

function toggleTimerMode() {
  basketballGame.timerMode = !basketballGame.timerMode;
  document.getElementById('timerModeBtn').classList.toggle('active', basketballGame.timerMode);
  resetBasketballGame();
}

function shootBasketball() {
  if (basketballGame.isFlying) return;
  if (basketballGame.timerMode && basketballGame.timeLeft <= 0) return;
  
  if (basketballGame.timerMode && !basketballGame.timerActive) {
    basketballGame.timerActive = true;
    runBasketballTimer();
  }
  
  basketballGame.isFlying = true;
  basketballGame.attempts++;
  sounds.bounce();
  
  const ball = document.getElementById('basketballBall');
  ball.classList.add('flying');
  
  // Calculate if scored - wider tolerances for better feel
  const hoopAdjustment = basketballGame.movingHoop ? basketballGame.hoopOffset * 0.1 : 0;
  const effectivePowerTarget = 55 + hoopAdjustment;
  const powerDiff = Math.abs(basketballGame.power - effectivePowerTarget);
  const angleDiff = Math.abs(basketballGame.angle - 47);
  const powerTolerance = basketballGame.movingHoop ? 25 : 20;
  const angleTolerance = basketballGame.movingHoop ? 18 : 15;
  const scored = powerDiff <= powerTolerance && angleDiff <= angleTolerance;
  
  setTimeout(() => {
    if (scored) {
      sounds.swish();
      basketballGame.streak++;
      const multiplier = getComboMultiplier(basketballGame.streak);
      basketballGame.score += multiplier;
      
      if (basketballGame.score > basketballGame.highScore) {
        basketballGame.highScore = basketballGame.score;
        localStorage.setItem('basketballHighScore', basketballGame.highScore);
      }
      if (basketballGame.streak > basketballGame.bestStreak) {
        basketballGame.bestStreak = basketballGame.streak;
        localStorage.setItem('basketballBestStreak', basketballGame.bestStreak);
      }
      if (basketballGame.streak === 5) sounds.win();
      showBasketballResult('score', 'Swish! 🏀' + (multiplier > 1 ? ` (${multiplier}x!)` : ''));
    } else {
      sounds.brick();
      basketballGame.streak = 0;
      showBasketballResult('miss', 'Brick! 🧱');
    }
    updateBasketballUI();
    
    setTimeout(() => {
      ball.classList.remove('flying');
      basketballGame.isFlying = false;
      hideBasketballResult();
    }, 800);
  }, 600);
}

function showBasketballResult(type, message) {
  const el = document.getElementById('basketballResult');
  el.textContent = message;
  el.className = 'game-result ' + type;
  el.style.display = 'block';
}

function hideBasketballResult() {
  document.getElementById('basketballResult').style.display = 'none';
}

function runBasketballTimer() {
  if (!basketballGame.timerActive || basketballGame.timeLeft <= 0) {
    if (basketballGame.timeLeft <= 0) {
      document.getElementById('basketballFinalScore').textContent = basketballGame.score;
      document.getElementById('basketballTimerEnd').style.display = 'flex';
      basketballGame.timerActive = false;
    }
    return;
  }
  
  setTimeout(() => {
    basketballGame.timeLeft--;
    updateBasketballUI();
    runBasketballTimer();
  }, 1000);
}

// ===== Travel Memory Game =====
const allDestinations = [
  { emoji: '🇨🇦', country: 'Canada' },
  { emoji: '🇺🇸', country: 'USA' },
  { emoji: '🇬🇷', country: 'Greece' },
  { emoji: '🇩🇪', country: 'Germany' },
  { emoji: '🇸🇪', country: 'Sweden' },
  { emoji: '🇪🇸', country: 'Spain' },
  { emoji: '🇮🇹', country: 'Italy' },
  { emoji: '🇲🇽', country: 'Mexico' },
  { emoji: '🇬🇧', country: 'UK' },
  { emoji: '🇫🇷', country: 'France' },
  { emoji: '🇩🇰', country: 'Denmark' },
  { emoji: '🇧🇿', country: 'Belize' },
  { emoji: '🇷🇺', country: 'Russia' },
  { emoji: '🇪🇪', country: 'Estonia' },
  { emoji: '🇫🇮', country: 'Finland' },
  { emoji: '🇯🇲', country: 'Jamaica' },
  { emoji: '🇵🇷', country: 'Puerto Rico' },
  { emoji: '🇨🇭', country: 'Switzerland' },
  { emoji: '🇹🇷', country: 'Turkey' },
  { emoji: '🇦🇹', country: 'Austria' },
  { emoji: '🇧🇦', country: 'Bosnia' },
  { emoji: '🇰🇾', country: 'Cayman Islands' },
  { emoji: '🇭🇹', country: 'Haiti' },
  { emoji: '🇲🇨', country: 'Monaco' },
  { emoji: '🇳🇱', country: 'Netherlands' },
  { emoji: '🇵🇦', country: 'Panama' }
];

const PAIRS_COUNT = 8;

// Get random destinations for each game
function getRandomDestinations() {
  const shuffled = [...allDestinations].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, PAIRS_COUNT);
}

let travelGame = {
  cards: [],
  flippedCards: [],
  moves: 0,
  matches: 0,
  isChecking: false,
  bestScore: parseInt(localStorage.getItem('travelMemoryBestScore') || '0') || null
};

function openTravelGame() {
  document.getElementById('travelGameModal').classList.add('active');
  initTravelGame();
}

function closeTravelGame() {
  document.getElementById('travelGameModal').classList.remove('active');
}

function initTravelGame() {
  travelGame.cards = [];
  travelGame.flippedCards = [];
  travelGame.moves = 0;
  travelGame.matches = 0;
  travelGame.isChecking = false;
  
  // Get random destinations and create pairs
  const selectedDestinations = getRandomDestinations();
  const pairs = [...selectedDestinations, ...selectedDestinations];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  
  travelGame.cards = pairs.map((dest, index) => ({
    id: index,
    emoji: dest.emoji,
    country: dest.country,
    isFlipped: false,
    isMatched: false
  }));
  
  renderTravelCards();
  updateTravelUI();
}

function renderTravelCards() {
  const grid = document.getElementById('travelGrid');
  grid.innerHTML = '';
  
  travelGame.cards.forEach(card => {
    const el = document.createElement('button');
    el.className = 'memory-card' + (card.isFlipped || card.isMatched ? ' flipped' : '') + (card.isMatched ? ' matched' : '');
    el.onclick = () => flipTravelCard(card.id);
    el.disabled = card.isMatched || travelGame.isChecking;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-front">✈️</div>
        <div class="card-back">
          <span class="card-emoji">${card.emoji}</span>
          <span class="card-country">${card.country}</span>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

function updateTravelUI() {
  document.getElementById('travelMoves').textContent = travelGame.moves;
  document.getElementById('travelMatches').textContent = travelGame.matches + '/8';
  document.getElementById('travelBest').textContent = travelGame.bestScore || '—';
}

function flipTravelCard(id) {
  if (travelGame.isChecking) return;
  if (travelGame.flippedCards.length >= 2) return;
  
  const card = travelGame.cards[id];
  if (card.isFlipped || card.isMatched) return;
  
  sounds.flip();
  card.isFlipped = true;
  travelGame.flippedCards.push(id);
  renderTravelCards();
  
  if (travelGame.flippedCards.length === 2) {
    travelGame.moves++;
    travelGame.isChecking = true;
    updateTravelUI();
    
    const [first, second] = travelGame.flippedCards;
    const card1 = travelGame.cards[first];
    const card2 = travelGame.cards[second];
    
    if (card1.emoji === card2.emoji) {
      // Match!
      setTimeout(() => {
        sounds.match();
        speakPhrase(card1.country);
        card1.isMatched = true;
        card2.isMatched = true;
        travelGame.matches++;
        
        if (travelGame.matches === 8) {
          sounds.win();
          if (!travelGame.bestScore || travelGame.moves < travelGame.bestScore) {
            travelGame.bestScore = travelGame.moves;
            localStorage.setItem('travelMemoryBestScore', travelGame.bestScore);
          }
          setTimeout(() => showTravelWin(), 500);
        }
        
        travelGame.flippedCards = [];
        travelGame.isChecking = false;
        renderTravelCards();
        updateTravelUI();
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        sounds.miss();
        card1.isFlipped = false;
        card2.isFlipped = false;
        travelGame.flippedCards = [];
        travelGame.isChecking = false;
        renderTravelCards();
      }, 1000);
    }
  }
}

function showTravelWin() {
  document.getElementById('travelWin').style.display = 'block';
  document.getElementById('travelFinalMoves').textContent = travelGame.moves;
}

function hideTravelWin() {
  document.getElementById('travelWin').style.display = 'none';
}

// ===== Mute Toggle =====
function toggleGameMute() {
  isMuted = !isMuted;
  localStorage.setItem('gameSoundsMuted', isMuted);
  document.querySelectorAll('.mute-btn').forEach(btn => {
    btn.innerHTML = isMuted ? 
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 5-6 4H2v6h3l6 4zM22 9l-6 6M16 9l6 6"/></svg>' :
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 5-6 4H2v6h3l6 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
  });
}

// ===== Initialize Passion Card Clicks =====
document.addEventListener('DOMContentLoaded', () => {
  const passionCards = document.querySelectorAll('.passion-card');
  passionCards[0]?.addEventListener('click', openCoffeeGame);
  passionCards[1]?.addEventListener('click', openBasketballGame);
  passionCards[2]?.addEventListener('click', openTravelGame);
  
  // Note: passion-hint elements are already in HTML, no need to add them dynamically
  passionCards.forEach(card => {
    card.style.cursor = 'pointer';
  });
  
  // Slider inputs
  document.getElementById('powerSlider')?.addEventListener('input', (e) => {
    basketballGame.power = parseInt(e.target.value);
    updateBasketballUI();
  });
  
  document.getElementById('angleSlider')?.addEventListener('input', (e) => {
    basketballGame.angle = parseInt(e.target.value);
    updateBasketballUI();
  });
});

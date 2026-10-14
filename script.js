const GameState = {
  screen: 'menu',
  currentLevel: 1,
  stats: { hunger: 80, energy: 80, mood: 80 },
  bonus: { jumpHeight: 1.0, runSpeed: 1.0, duration: 0 },
  totalBugs: 0,
  totalStars: 0,
  unlockedRooms: ['Кухня'],
  dragonSkin: 0,
  unlockedSkins: [0],
  coins: 0
};

const SKIN_DATA = [
  { id: 0, name: 'ЗЕЛЁНЫЙ', body: '#22c55e', belly: '#86efac', wing: '#16a34a', price: 0 },
  { id: 1, name: 'ФИОЛЕТОВЫЙ', body: '#8b5cf6', belly: '#c4b5fd', wing: '#6d28d9', price: 30 },
  { id: 2, name: 'ОРАНЖЕВЫЙ', body: '#f97316', belly: '#fed7aa', wing: '#ea580c', price: 50 },
  { id: 3, name: 'ГОЛУБОЙ', body: '#06b6d4', belly: '#a5f3fc', wing: '#0891b2', price: 80 },
  { id: 4, name: 'РОЗОВЫЙ', body: '#ec4899', belly: '#fbcfe8', wing: '#db2777', price: 120 }
];

const ROOM_DATA = [
  { name: 'Кухня', emoji: 'КУХНЯ', price: 0 },
  { name: 'Спальня', emoji: 'СПАЛЬНЯ', price: 40 },
  { name: 'Игровая', emoji: 'ИГРОВАЯ', price: 70 },
  { name: 'Ванная', emoji: 'ВАННАЯ', price: 100 }
];

function drawPixelDragon(ctx, x, y, size, skin, facing, frame) {
  const s = size / 16;
  const colors = {
    body: skin.body,
    belly: skin.belly,
    wing: skin.wing,
    eye: '#fff',
    pupil: '#000',
    horn: '#fbbf24'
  };

  ctx.save();
  ctx.translate(x, y);
  if (facing === 'left') {
    ctx.scale(-1, 1);
    ctx.translate(-size, 0);
  }

  const pixels = [
    {x:3,y:0,c:colors.horn},{x:4,y:0,c:colors.horn},
    {x:3,y:1,c:colors.horn},
    {x:11,y:0,c:colors.horn},{x:12,y:0,c:colors.horn},
    {x:12,y:1,c:colors.horn},
    {x:5,y:1,c:colors.body},{x:6,y:1,c:colors.body},{x:7,y:1,c:colors.body},{x:8,y:1,c:colors.body},{x:9,y:1,c:colors.body},{x:10,y:1,c:colors.body},
    {x:4,y:2,c:colors.body},{x:5,y:2,c:colors.body},{x:6,y:2,c:colors.body},{x:7,y:2,c:colors.body},{x:8,y:2,c:colors.body},{x:9,y:2,c:colors.body},{x:10,y:2,c:colors.body},{x:11,y:2,c:colors.body},
    {x:4,y:3,c:colors.body},{x:5,y:3,c:colors.eye},{x:6,y:3,c:colors.eye},{x:7,y:3,c:colors.body},{x:8,y:3,c:colors.body},{x:9,y:3,c:colors.eye},{x:10,y:3,c:colors.eye},{x:11,y:3,c:colors.body},
    {x:4,y:4,c:colors.body},{x:5,y:4,c:colors.pupil},{x:6,y:4,c:colors.pupil},{x:7,y:4,c:colors.body},{x:8,y:4,c:colors.body},{x:9,y:4,c:colors.pupil},{x:10,y:4,c:colors.pupil},{x:11,y:4,c:colors.body},
    {x:5,y:5,c:colors.body},{x:6,y:5,c:colors.body},{x:7,y:5,c:colors.body},{x:8,y:5,c:colors.body},{x:9,y:5,c:colors.body},{x:10,y:5,c:colors.body},
    {x:6,y:6,c:colors.body},{x:7,y:6,c:colors.body},{x:8,y:6,c:colors.body},{x:9,y:6,c:colors.body},
    {x:4,y:7,c:colors.body},{x:5,y:7,c:colors.body},{x:6,y:7,c:colors.body},{x:7,y:7,c:colors.body},{x:8,y:7,c:colors.body},{x:9,y:7,c:colors.body},{x:10,y:7,c:colors.body},{x:11,y:7,c:colors.body},
    {x:3,y:8,c:colors.body},{x:4,y:8,c:colors.body},{x:5,y:8,c:colors.belly},{x:6,y:8,c:colors.belly},{x:7,y:8,c:colors.belly},{x:8,y:8,c:colors.belly},{x:9,y:8,c:colors.body},{x:10,y:8,c:colors.body},{x:11,y:8,c:colors.body},{x:12,y:8,c:colors.body},
    {x:3,y:9,c:colors.body},{x:4,y:9,c:colors.body},{x:5,y:9,c:colors.belly},{x:6,y:9,c:colors.belly},{x:7,y:9,c:colors.belly},{x:8,y:9,c:colors.belly},{x:9,y:9,c:colors.body},{x:10,y:9,c:colors.body},{x:11,y:9,c:colors.body},{x:12,y:9,c:colors.body},
    {x:3,y:10,c:colors.body},{x:4,y:10,c:colors.body},{x:5,y:10,c:colors.belly},{x:6,y:10,c:colors.belly},{x:7,y:10,c:colors.belly},{x:8,y:10,c:colors.belly},{x:9,y:10,c:colors.body},{x:10,y:10,c:colors.body},{x:11,y:10,c:colors.body},{x:12,y:10,c:colors.body},
    {x:3,y:11,c:colors.body},{x:4,y:11,c:colors.body},{x:5,y:11,c:colors.body},{x:6,y:11,c:colors.body},{x:7,y:11,c:colors.body},{x:8,y:11,c:colors.body},{x:9,y:11,c:colors.body},{x:10,y:11,c:colors.body},{x:11,y:11,c:colors.body},{x:12,y:11,c:colors.body},
    {x:4,y:12,c:colors.body},{x:5,y:12,c:colors.body},{x:6,y:12,c:colors.body},{x:7,y:12,c:colors.body},{x:8,y:12,c:colors.body},{x:9,y:12,c:colors.body},{x:10,y:12,c:colors.body},{x:11,y:12,c:colors.body},
    {x:5,y:13,c:colors.body},{x:6,y:13,c:colors.body},{x:9,y:13,c:colors.body},{x:10,y:13,c:colors.body},
    {x:5,y:14,c:colors.body},{x:6,y:14,c:colors.body},{x:9,y:14,c:colors.body},{x:10,y:14,c:colors.body},
    {x:5,y:15,c:colors.body},{x:6,y:15,c:colors.body},{x:9,y:15,c:colors.body},{x:10,y:15,c:colors.body},
  ];

  const wingOffset = Math.sin(Date.now() / 200) * 2;
  pixels.push(
    {x:1,y:7+wingOffset,c:colors.wing},{x:2,y:7+wingOffset,c:colors.wing},
    {x:1,y:8+wingOffset,c:colors.wing},{x:2,y:8+wingOffset,c:colors.wing},
    {x:1,y:9+wingOffset,c:colors.wing},{x:2,y:9+wingOffset,c:colors.wing},
    {x:1,y:10+wingOffset,c:colors.wing},{x:2,y:10+wingOffset,c:colors.wing}
  );

  pixels.push(
    {x:0,y:11,c:colors.body},{x:1,y:11,c:colors.body},
    {x:0,y:12,c:colors.body}
  );

  pixels.forEach(p => {
    ctx.fillStyle = p.c;
    ctx.fillRect(Math.floor(p.x * s), Math.floor(p.y * s), Math.ceil(s), Math.ceil(s));
  });

  ctx.restore();
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  GameState.screen = name;
  if (name === 'home') {
    updateHomeUI();
    drawHomeDragon();
  }
  if (name === 'shop') updateShopUI();
  if (name === 'menu') {
    updateMenuUI();
    drawMenuDragons();
  }
  saveGame();
}

function saveGame() {
  try {
    localStorage.setItem('dragon-save', JSON.stringify(GameState));
  } catch (e) {}
}

function loadGame() {
  try {
    const data = localStorage.getItem('dragon-save');
    if (data) {
      const parsed = JSON.parse(data);
      Object.assign(GameState, parsed);
      return true;
    }
  } catch (e) {}
  return false;
}

let audioCtx = null;
function getAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square'; // Пиксельный звук!
    switch (type) {
      case 'jump':
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'collect':
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
        break;
      case 'star':
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        break;
      case 'hurt':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
        break;
      case 'win':
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'square';
          o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
          g.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
          g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + i * 0.12 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3);
          o.start(ctx.currentTime + i * 0.12);
          o.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
        break;
      case 'action':
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
        break;
    }
  } catch (e) {}
}

function generateLevel(levelNum) {
  const levelWidth = 2400 + levelNum * 200;
  const groundY = 500;
  const platforms = [];
  const collectibles = [];
  const obstacles = [];

  for (let x = 0; x < levelWidth; x += 300) {
    const hasGap = Math.random() < 0.2 && x > 200 && x < levelWidth - 400;
    if (!hasGap) {
      platforms.push({ x, y: groundY, width: 300, height: 40, type: 'normal' });
    }
  }

  const numFloating = 8 + levelNum * 2;
  for (let i = 0; i < numFloating; i++) {
    const x = 200 + (i / numFloating) * (levelWidth - 400);
    const y = 250 + Math.random() * 200;
    const isMoving = Math.random() < 0.2 + levelNum * 0.03;
    platforms.push({
      x, y, width: 100 + Math.random() * 60, height: 20,
      type: isMoving ? 'moving' : 'normal',
      originX: x, moveRange: 80
    });
  }

  const numBugs = 10 + levelNum * 3;
  for (let i = 0; i < numBugs; i++) {
    collectibles.push({
      x: 150 + Math.random() * (levelWidth - 300),
      y: 200 + Math.random() * 280,
      type: 'bug', collected: false,
      animOffset: Math.random() * Math.PI * 2
    });
  }

  const numStars = 3 + levelNum;
  for (let i = 0; i < numStars; i++) {
    collectibles.push({
      x: 200 + Math.random() * (levelWidth - 400),
      y: 150 + Math.random() * 200,
      type: 'star', collected: false,
      animOffset: Math.random() * Math.PI * 2
    });
  }

  const numObs = 3 + levelNum * 2;
  for (let i = 0; i < numObs; i++) {
    const x = 300 + (i / numObs) * (levelWidth - 600);
    obstacles.push({
      x, y: groundY - 30, width: 30, height: 30,
      type: Math.random() < 0.5 ? 'spike' : 'fire'
    });
  }

  const bgColors = ['#1a1a2e', '#16213e', '#0f3460', '#1b4332', '#3d0066', '#2d1b69', '#1a472a', '#4a1942'];
  return {
    platforms, collectibles, obstacles,
    goalX: levelWidth - 100, goalY: groundY - 60,
    backgroundColor: bgColors[levelNum % bgColors.length],
    groundY, levelWidth
  };
}

let engine = null;

class GameEngine {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false; // Пиксельный рендеринг!
    this.level = level;
    this.running = true;
    this.timeLeft = 60;
    this.bugsCollected = 0;
    this.starsCollected = 0;
    this.animTime = 0;
    this.particles = [];
    this.levelComplete = false;
    this.gameOver = false;
    this.lastTime = performance.now();
    this.keys = new Set();
    this.camera = { x: 0, y: 0 };
    this.player = {
      x: 50, y: level.groundY - 50,
      width: 32, height: 40,
      vx: 0, vy: 0,
      onGround: false,
      facing: 'right',
      animFrame: 0, animTimer: 0
    };
    this.setupInput();
  }

  get jumpPower() {
    const hungerPenalty = Math.max(0.65, GameState.stats.hunger / 100);
    return -14 * hungerPenalty * GameState.bonus.jumpHeight;
  }

  get runSpeed() {
    const energyPenalty = Math.max(0.6, GameState.stats.energy / 100);
    return 5 * energyPenalty * GameState.bonus.runSpeed;
  }

  setupInput() {
    this._keyDown = (e) => {
      this.keys.add(e.code);
      if (e.code === 'Space' || e.code === 'ArrowUp') e.preventDefault();
    };
    this._keyUp = (e) => { this.keys.delete(e.code); };
    window.addEventListener('keydown', this._keyDown);
    window.addEventListener('keyup', this._keyUp);
  }

  cleanup() {
    this.running = false;
    window.removeEventListener('keydown', this._keyDown);
    window.removeEventListener('keyup', this._keyUp);
  }

  update(dt) {
    if (!this.running || this.levelComplete || this.gameOver) return;
    this.animTime += dt;
    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.gameOver = true;
      this.endLevel(false);
      return;
    }
    const p = this.player;
    const speed = this.runSpeed;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) {
      p.vx = -speed;
      p.facing = 'left';
    } else if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) {
      p.vx = speed;
      p.facing = 'right';
    } else {
      p.vx *= 0.8;
    }
    if ((this.keys.has('Space') || this.keys.has('ArrowUp') || this.keys.has('KeyW')) && p.onGround) {
      p.vy = this.jumpPower;
      p.onGround = false;
      this.spawnParticles(p.x + p.width / 2, p.y + p.height, 5, '#aaa');
      playSound('jump');
    }
    p.vy += 0.6;
    p.x += p.vx;
    p.y += p.vy;
    p.onGround = false;

    for (const plat of this.level.platforms) {
      if (plat.type === 'moving' && plat.originX !== undefined) {
        plat.x = plat.originX + Math.sin(this.animTime * 1.5) * plat.moveRange;
      }
      if (p.vy >= 0 &&
        p.x + p.width > plat.x &&
        p.x < plat.x + plat.width &&
        p.y + p.height > plat.y &&
        p.y + p.height < plat.y + plat.height + 12) {
        p.y = plat.y - p.height;
        p.vy = 0;
        p.onGround = true;
      }
    }

    if (p.y > 700) {
      p.x = 50;
      p.y = this.level.groundY - 50;
      p.vy = 0;
      GameState.stats.energy = Math.max(0, GameState.stats.energy - 5);
    }

    for (const col of this.level.collectibles) {
      if (col.collected) continue;
      const dx = (p.x + p.width / 2) - col.x;
      const dy = (p.y + p.height / 2) - col.y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) {
        col.collected = true;
        if (col.type === 'bug') {
          this.bugsCollected++;
          this.spawnParticles(col.x, col.y, 8, '#4ade80');
          playSound('collect');
        } else {
          this.starsCollected++;
          this.spawnParticles(col.x, col.y, 12, '#fbbf24');
          playSound('star');
        }
      }
    }

    for (const obs of this.level.obstacles) {
      if (p.x + p.width > obs.x && p.x < obs.x + obs.width &&
        p.y + p.height > obs.y && p.y < obs.y + obs.height) {
        GameState.stats.energy = Math.max(0, GameState.stats.energy - 10);
        p.vy = -8;
        p.x += p.facing === 'right' ? -30 : 30;
        this.spawnParticles(p.x + p.width / 2, p.y + p.height / 2, 10, '#ef4444');
        playSound('hurt');
      }
    }

    if (p.x > this.level.goalX - 30) {
      this.levelComplete = true;
      this.spawnParticles(this.level.goalX, this.level.goalY, 30, '#fbbf24');
      playSound('win');
      setTimeout(() => this.endLevel(true), 1000);
    }

    this.camera.x = p.x - this.canvas.width / 3;

    this.particles = this.particles.filter(pt => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.1;
      pt.life -= dt;
      return pt.life > 0;
    });

    if (Math.abs(p.vx) > 0.5) {
      p.animTimer += dt;
      if (p.animTimer > 0.1) {
        p.animTimer = 0;
        p.animFrame = (p.animFrame + 1) % 4;
      }
    } else {
      p.animFrame = 0;
    }
  }

  spawnParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        life: 0.5 + Math.random() * 0.5,
        color,
        size: 4 + Math.random() * 4
      });
    }
  }

  endLevel(completed) {
    const bugs = this.bugsCollected;
    const stars = this.starsCollected;
    const earned = bugs * 2 + stars * 5;
    GameState.coins += earned;
    GameState.totalBugs += bugs;
    GameState.totalStars += stars;
    GameState.stats.hunger = Math.max(0, GameState.stats.hunger - 15);
    GameState.stats.energy = Math.max(0, GameState.stats.energy - 20);
    GameState.stats.mood = Math.max(0, GameState.stats.mood - 10);
    if (completed) {
      GameState.bonus = { jumpHeight: 1.1, runSpeed: 1.0, duration: 3 };
      GameState.currentLevel++;
    }
    if (GameState.bonus.duration > 0) {
      GameState.bonus.duration--;
      if (GameState.bonus.duration <= 0) {
        GameState.bonus = { jumpHeight: 1.0, runSpeed: 1.0, duration: 0 };
      }
    }
    saveGame();
    showResult(completed, bugs, stars, earned);
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.imageSmoothingEnabled = false;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, this.level.backgroundColor);
    bgGrad.addColorStop(1, '#000011');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#fff';
    for (let i = 0; i < 60; i++) {
      const sx = ((i * 137 + 50) % (w + 200) - this.camera.x * 0.05) % (w + 200);
      const sy = (i * 97 + 30) % (h * 0.5);
      const size = (i % 3 === 0) ? 3 : 2;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
    }

    const moonX = w * 0.8 - this.camera.x * 0.02;
    ctx.fillStyle = '#fef9c3';
    ctx.fillRect(Math.floor(moonX) - 20, 60, 40, 40);
    ctx.fillStyle = this.level.backgroundColor;
    ctx.fillRect(Math.floor(moonX) - 10, 55, 20, 20);

    ctx.fillStyle = '#1e1e3e';
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w + 100; x += 50) {
      const worldX = x + this.camera.x * 0.15;
      const mh = Math.sin(worldX * 0.003) * 80 + Math.sin(worldX * 0.007) * 40 + 200;
      ctx.lineTo(x, h - mh);
    }
    ctx.lineTo(w, h);
    ctx.fill();

    ctx.fillStyle = '#14142e';
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w + 100; x += 30) {
      const worldX = x + this.camera.x * 0.3;
      const hh = Math.sin(worldX * 0.005) * 50 + Math.sin(worldX * 0.012) * 25 + 120;
      ctx.lineTo(x, h - hh);
    }
    ctx.lineTo(w, h);
    ctx.fill();

    ctx.save();
    ctx.translate(-this.camera.x, 0);

    for (const plat of this.level.platforms) {
      if (plat.type === 'moving') {
        ctx.fillStyle = '#6366f1';
      } else {
        ctx.fillStyle = '#4a5568';
      }
      ctx.fillRect(Math.floor(plat.x), Math.floor(plat.y), plat.width, plat.height);
      ctx.fillStyle = plat.type === 'moving' ? '#818cf8' : '#718096';
      ctx.fillRect(Math.floor(plat.x), Math.floor(plat.y), plat.width, 4);
      if (plat.y === this.level.groundY) {
        ctx.fillStyle = '#22c55e';
        for (let gx = plat.x; gx < plat.x + plat.width; gx += 8) {
          ctx.fillRect(Math.floor(gx), Math.floor(plat.y) - 4, 4, 6);
        }
      }
    }

    for (const col of this.level.collectibles) {
      if (col.collected) continue;
      const bob = Math.sin(this.animTime * 3 + col.animOffset) * 4;
      ctx.save();
      ctx.translate(Math.floor(col.x), Math.floor(col.y + bob));
      if (col.type === 'bug') {
        this.drawBug(ctx);
      } else {
        this.drawStar(ctx);
      }
      ctx.restore();
    }

    for (const obs of this.level.obstacles) {
      ctx.save();
      ctx.translate(Math.floor(obs.x), Math.floor(obs.y));
      if (obs.type === 'spike') {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(0, obs.height);
        ctx.lineTo(obs.width / 2, 0);
        ctx.lineTo(obs.width, obs.height);
        ctx.fill();
        ctx.fillStyle = '#fca5a5';
        ctx.fillRect(5, obs.height - 10, obs.width / 2 - 5, 10);
      } else {
        const flicker = Math.sin(this.animTime * 10) * 3;
        ctx.fillStyle = '#f97316';
        ctx.fillRect(0, flicker, obs.width, obs.height);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(5, flicker + 5, obs.width - 10, obs.height - 10);
      }
      ctx.restore();
    }

    ctx.save();
    ctx.translate(Math.floor(this.level.goalX), Math.floor(this.level.goalY));
    const pulse = Math.sin(this.animTime * 4) * 0.2 + 1;
    ctx.scale(pulse, pulse);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, -60, 4, 60);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(4, -60, 30, 15);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(10, -55, 8, 8);
    ctx.restore();

    this.drawDragon(ctx);

    for (const pt of this.particles) {
      ctx.globalAlpha = pt.life;
      ctx.fillStyle = pt.color;
      ctx.fillRect(Math.floor(pt.x - pt.size / 2), Math.floor(pt.y - pt.size / 2), Math.ceil(pt.size), Math.ceil(pt.size));
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    this.drawHUD(ctx, w);
  }

  drawBug(ctx) {
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(-8, -6, 16, 12);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(-6, -4, 12, 8);
    const flap = Math.sin(this.animTime * 15) * 3;
    ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
    ctx.fillRect(-12, -10 + flap, 6, 8);
    ctx.fillRect(6, -10 + flap, 6, 8);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-4, -3, 3, 3);
    ctx.fillRect(1, -3, 3, 3);
    ctx.fillStyle = '#000';
    ctx.fillRect(-3, -2, 2, 2);
    ctx.fillRect(2, -2, 2, 2);
  }

  drawStar(ctx) {
    const glow = Math.sin(this.animTime * 5) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(251, 191, 36, ${glow})`;
    ctx.fillRect(-2, -12, 4, 4);
    ctx.fillRect(-6, -8, 12, 4);
    ctx.fillRect(-10, -4, 20, 4);
    ctx.fillRect(-6, 0, 12, 4);
    ctx.fillRect(-2, 4, 4, 4);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-1, -2, 2, 2);
  }

  drawDragon(ctx) {
    const p = this.player;
    const skin = SKIN_DATA[GameState.dragonSkin] || SKIN_DATA[0];
    drawPixelDragon(ctx, p.x, p.y, p.width, skin, p.facing, p.animFrame);
  }

  drawHUD(ctx, w) {
    ctx.fillStyle = '#000';
    ctx.fillRect(Math.floor(w / 2) - 50, 10, 100, 30);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(Math.floor(w / 2) - 50, 10, 100, 30);
    ctx.fillStyle = this.timeLeft < 10 ? '#ef4444' : '#fff';
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(Math.ceil(this.timeLeft) + 's', w / 2, 32);

    ctx.fillStyle = '#000';
    ctx.fillRect(10, 10, 120, 30);
    ctx.strokeStyle = '#4ade80';
    ctx.strokeRect(10, 10, 120, 30);
    ctx.fillStyle = '#4ade80';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('x' + this.bugsCollected, 20, 32);

    ctx.fillStyle = '#000';
    ctx.fillRect(140, 10, 120, 30);
    ctx.strokeStyle = '#fbbf24';
    ctx.strokeRect(140, 10, 120, 30);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('x' + this.starsCollected, 150, 32);

    const barW = 80;
    const barH = 10;
    const bx = w - 250;
 
    ctx.fillStyle = '#000';
    ctx.fillRect(bx, 10, barW + 60, 14);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(bx, 10, barW + 60, 14);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(bx + 50, 12, Math.floor(barW * (GameState.stats.hunger / 100)), barH);
    ctx.fillStyle = '#fff';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText('HP', bx + 5, 22);

    ctx.fillStyle = '#000';
    ctx.fillRect(bx, 28, barW + 60, 14);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(bx, 28, barW + 60, 14);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(bx + 50, 30, Math.floor(barW * (GameState.stats.energy / 100)), barH);
    ctx.fillStyle = '#fff';
    ctx.fillText('EN', bx + 5, 40);

    ctx.fillStyle = '#000';
    ctx.fillRect(bx, 46, barW + 60, 14);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(bx, 46, barW + 60, 14);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(bx + 50, 48, Math.floor(barW * (GameState.stats.mood / 100)), barH);
    ctx.fillStyle = '#fff';
    ctx.fillText('MO', bx + 5, 58);
  }

  start() {
    this.lastTime = performance.now();
    const loop = () => {
      if (!this.running) return;
      const now = performance.now();
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;
      this.update(dt);
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }
}

function startGame() {
  const canvas = document.getElementById('gameCanvas');
  const level = generateLevel(GameState.currentLevel);
  const maxW = Math.min(800, window.innerWidth - 20);
  const maxH = Math.min(600, window.innerHeight - 120);
  canvas.width = maxW;
  canvas.height = maxH;
  document.getElementById('level-num').textContent = GameState.currentLevel;
  if (engine) engine.cleanup();
  engine = new GameEngine(canvas, level);
  engine.start();
  showScreen('game');
}

function stopGame() {
  if (engine) {
    engine.cleanup();
    engine = null;
  }
}

function showResult(completed, bugs, stars, coins) {
  stopGame();
  document.getElementById('result-emoji').textContent = completed ? 'ПОБЕДА!' : 'ПРОИГРЫШ';
  document.getElementById('result-title').textContent = completed ? 'УРОВЕНЬ ПРОЙДЕН!' : 'ВРЕМЯ ВЫШЛО!';
  document.getElementById('result-level').textContent = 'УРОВЕНЬ ' + (completed ? GameState.currentLevel - 1 : GameState.currentLevel);
  document.getElementById('result-bugs').textContent = bugs;
  document.getElementById('result-stars').textContent = stars;
  document.getElementById('result-coins').textContent = '+' + coins;
  document.getElementById('btn-next-level').style.display = completed ? 'block' : 'none';
  document.getElementById('result-bonus').style.display = completed ? 'block' : 'none';
  showScreen('result');
}

function updateMenuUI() {
  const hasSave = GameState.currentLevel > 1 || GameState.totalBugs > 0;
  document.getElementById('btn-continue').style.display = hasSave ? 'block' : 'none';
}

function drawMenuDragons() {
  const menuCanvas = document.getElementById('menu-dragon-canvas');
  if (menuCanvas) {
    const ctx = menuCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 128, 128);
    const skin = SKIN_DATA[GameState.dragonSkin] || SKIN_DATA[0];
    drawPixelDragon(ctx, 0, 0, 128, skin, 'right', 0);
  }
  const previewCanvas = document.getElementById('preview-dragon');
  if (previewCanvas) {
    const ctx = previewCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 160, 180);
    const skin = SKIN_DATA[GameState.dragonSkin] || SKIN_DATA[0];
    drawPixelDragon(ctx, 16, 20, 128, skin, 'right', 0);
  }
}

function drawHomeDragon() {
  const canvas = document.getElementById('home-dragon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, 120, 140);
  const skin = SKIN_DATA[GameState.dragonSkin] || SKIN_DATA[0];
  drawPixelDragon(ctx, 0, 0, 120, skin, 'right', 0);
}

function updateHomeUI() {
  document.getElementById('home-coins').textContent = GameState.coins;
  document.getElementById('bar-hunger').style.width = GameState.stats.hunger + '%';
  document.getElementById('bar-energy').style.width = GameState.stats.energy + '%';
  document.getElementById('bar-mood').style.width = GameState.stats.mood + '%';
  document.getElementById('val-hunger').textContent = Math.round(GameState.stats.hunger) + '%';
  document.getElementById('val-energy').textContent = Math.round(GameState.stats.energy) + '%';
  document.getElementById('val-mood').textContent = Math.round(GameState.stats.mood) + '%';

  const roomsGrid = document.getElementById('rooms-grid');
  roomsGrid.innerHTML = '';
  ROOM_DATA.forEach((room) => {
    const unlocked = GameState.unlockedRooms.includes(room.name);
    const card = document.createElement('div');
    card.className = 'room-card ' + (unlocked ? 'room-unlocked' : 'room-locked');
    card.innerHTML = `<div class="room-emoji">${unlocked ? room.emoji : 'ЗАКРЫТО'}</div><div class="room-name">${room.name}</div>`;
    roomsGrid.appendChild(card);
  });
}

function performAction(action) {
  playSound('action');
  const messages = {
    feed: 'НЯМ-НЯМ! ДРАКОНЧИК ДОВОЛЕН!',
    bath: 'БУЛЬ-БУЛЬ! ЧИСТЕНЬКИЙ!',
    sleep: 'ZZZ... СЛАДКИХ СНОВ!',
    play: 'ВЕСЕЛО! НАСТРОЕНИЕ ПОВЫШЕНО!'
  };
  const emojis = { feed: 'МЯСО', bath: 'ВОДА', sleep: 'СОН', play: 'ЗВЕЗДА' };
  const container = document.getElementById('dragon-container');
  container.classList.add('bounce');
  setTimeout(() => container.classList.remove('bounce'), 300);

  const emojiEl = document.getElementById('action-emoji');
  emojiEl.textContent = emojis[action];
  emojiEl.style.animation = 'none';
  emojiEl.offsetHeight;
  emojiEl.style.animation = 'action-pop 0.4s steps(4) forwards';

  const msgEl = document.getElementById('action-message');
  msgEl.textContent = messages[action];
  setTimeout(() => { msgEl.textContent = ''; }, 2000);

  switch (action) {
    case 'feed':
      GameState.stats.hunger = Math.min(100, GameState.stats.hunger + 25);
      break;
    case 'bath':
      GameState.stats.energy = Math.min(100, GameState.stats.energy + 15);
      GameState.stats.mood = Math.min(100, GameState.stats.mood + 10);
      break;
    case 'sleep':
      GameState.stats.energy = Math.min(100, GameState.stats.energy + 35);
      break;
    case 'play':
      GameState.stats.mood = Math.min(100, GameState.stats.mood + 30);
      break;
  }
  updateHomeUI();
  drawHomeDragon();
  saveGame();
}

function updateShopUI() {
  document.getElementById('shop-coins').textContent = GameState.coins;

  const skinsGrid = document.getElementById('skins-grid');
  skinsGrid.innerHTML = '';
  SKIN_DATA.forEach(skin => {
    const owned = GameState.unlockedSkins.includes(skin.id);
    const selected = GameState.dragonSkin === skin.id;
    const canBuy = GameState.coins >= skin.price && !owned;
    const card = document.createElement('div');
    card.className = 'skin-card' + (selected ? ' selected' : '') + (owned ? ' owned' : '');
    let btnHTML = '';
    if (selected) {
      btnHTML = '<div class="skin-badge">ВЫБРАН</div>';
    } else if (owned) {
      btnHTML = `<button class="skin-buy-btn select-btn" data-skin="${skin.id}">ВЫБРАТЬ</button>`;
    } else {
      btnHTML = `<button class="skin-buy-btn ${canBuy ? 'can-buy' : 'cannot-buy'}" data-buy-skin="${skin.id}" ${!canBuy ? 'disabled' : ''}>${skin.price} М</button>`;
    }
    card.innerHTML = `
      <div class="skin-preview">
        <canvas width="50" height="60" data-skin-canvas="${skin.id}"></canvas>
      </div>
      <div class="skin-name">${skin.name}</div>
      ${btnHTML}
    `;
    skinsGrid.appendChild(card);
  });

  setTimeout(() => {
    SKIN_DATA.forEach(skin => {
      const canvas = document.querySelector(`[data-skin-canvas="${skin.id}"]`);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        drawPixelDragon(ctx, 0, 0, 50, skin, 'right', 0);
      }
    });
  }, 50);

  const roomsGrid = document.getElementById('shop-rooms-grid');
  roomsGrid.innerHTML = '';
  ROOM_DATA.forEach(room => {
    const owned = GameState.unlockedRooms.includes(room.name);
    const canBuy = GameState.coins >= room.price && !owned;
    const card = document.createElement('div');
    card.className = 'shop-room-card' + (owned ? ' owned' : '');
    let btnHTML = '';
    if (owned) {
      btnHTML = '<div class="room-owned-label">ОТКРЫТО</div>';
    } else {
      btnHTML = `<button class="room-buy-btn ${canBuy ? 'can-buy' : 'cannot-buy'}" data-buy-room="${room.name}" ${!canBuy ? 'disabled' : ''}>${room.price} М</button>`;
    }
    card.innerHTML = `
      <div class="shop-room-emoji">${owned ? room.emoji : 'ЗАКРЫТО'}</div>
      <div class="shop-room-name">${room.name}</div>
      ${btnHTML}
    `;
    roomsGrid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadGame();

  document.getElementById('btn-new-game').addEventListener('click', () => {
    GameState.currentLevel = 1;
    GameState.stats = { hunger: 80, energy: 80, mood: 80 };
    GameState.bonus = { jumpHeight: 1.0, runSpeed: 1.0, duration: 0 };
    GameState.coins = 0;
    GameState.totalBugs = 0;
    GameState.totalStars = 0;
    GameState.unlockedRooms = ['Кухня'];
    GameState.dragonSkin = 0;
    GameState.unlockedSkins = [0];
    saveGame();
    showScreen('home');
  });

  document.getElementById('btn-continue').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('btn-home-to-menu').addEventListener('click', () => {
    showScreen('menu');
  });

  document.getElementById('btn-play-game').addEventListener('click', () => {
    startGame();
  });

  document.getElementById('btn-shop').addEventListener('click', () => {
    showScreen('shop');
  });

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      performAction(btn.dataset.action);
    });
  });

  document.getElementById('btn-quit').addEventListener('click', () => {
    stopGame();
    showScreen('home');
  });

  document.getElementById('btn-next-level').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('btn-retry').addEventListener('click', () => {
    startGame();
  });

  document.getElementById('btn-result-home').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('btn-shop-back').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('skins-grid').addEventListener('click', (e) => {
    const selectBtn = e.target.closest('[data-skin]');
    const buyBtn = e.target.closest('[data-buy-skin]');
    if (selectBtn) {
      GameState.dragonSkin = parseInt(selectBtn.dataset.skin);
      updateShopUI();
      saveGame();
    }
    if (buyBtn && !buyBtn.disabled) {
      const skinId = parseInt(buyBtn.dataset.buySkin);
      const skin = SKIN_DATA[skinId];
      if (GameState.coins >= skin.price && !GameState.unlockedSkins.includes(skinId)) {
        GameState.coins -= skin.price;
        GameState.unlockedSkins.push(skinId);
        GameState.dragonSkin = skinId;
        playSound('collect');
        updateShopUI();
        saveGame();
      }
    }
  });

  document.getElementById('shop-rooms-grid').addEventListener('click', (e) => {
    const buyBtn = e.target.closest('[data-buy-room]');
    if (buyBtn && !buyBtn.disabled) {
      const roomName = buyBtn.dataset.buyRoom;
      const room = ROOM_DATA.find(r => r.name === roomName);
      if (room && GameState.coins >= room.price && !GameState.unlockedRooms.includes(roomName)) {
        GameState.coins -= room.price;
        GameState.unlockedRooms.push(roomName);
        playSound('collect');
        updateShopUI();
        saveGame();
      }
    }
  });

  const setupTouch = (btnId, keyCode) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (engine) engine.keys.add(keyCode);
    });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (engine) engine.keys.delete(keyCode);
    });
    btn.addEventListener('mousedown', () => {
      if (engine) engine.keys.add(keyCode);
    });
    btn.addEventListener('mouseup', () => {
      if (engine) engine.keys.delete(keyCode);
    });
  };
  setupTouch('touch-left-btn', 'ArrowLeft');
  setupTouch('touch-right-btn', 'ArrowRight');
  setupTouch('touch-jump-btn', 'Space');

  showScreen('menu');
});
/**
 * Glowing Particle Heart — matches reference image
 * ─────────────────────────────────────────────────
 * • 2-layer rendering: offscreen bloom pass (blurred glow canvas)
 *   composited under a sharp particle canvas — pure canvas 2D, no Three.js needed
 * • Heart filled with ~3000 particles of varying sizes
 * • ~200 scattered ambient particles outside the heart
 * • Wave fill: crimson/rose wash rises from bottom, driven by progress
 * • Particles jitter slightly to feel alive
 * • Deep black background with subtle radial blue-black vignette
 */

'use strict';

/* ─── Config ──────────────────────────────────── */
const CFG = {
  targetDateStr:  '2029-07-28',
  startDateStr:   '2023-07-28',
  heartParticles: 1700,
  edgeParticles:  420,
  dustParticles:  90,
  outlineDuration: 1.1,
  fillDuration:    1.4,
  // colour theme — matches reference but in rose/crimson instead of cyan
  // set HUE to match user's palette
  hue: 195,           // rose-red. Change to 195 for cyan like the reference image.
};

const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (PREFERS_REDUCED_MOTION) {
  CFG.heartParticles = 700;
  CFG.edgeParticles = 160;
  CFG.dustParticles = 24;
  CFG.outlineDuration = 0.01;
  CFG.fillDuration = 0.01;
}

/* ─── Canvases ────────────────────────────────── */
const canvas  = document.getElementById('c');
const ctx     = canvas.getContext('2d');

/* ─── State ───────────────────────────────────── */
const S = {
  W: 0, H: 0,
  cx: 0, cy: 0,   // heart centre in screen px
  scale: 0,       // px per heart unit
  targetDate: null, startDate: null,
  daysLeft: 0, daysPast: 0, progress: 0,
  heartPts: [],   // particles inside heart
  edgePts:  [],   // particles on heart outline
  dustPts:  [],   // ambient scatter
  t: 0,           // elapsed seconds
  waveY: -1.1,    // current wave top (normalised heart coords, -1=bottom +1=top)
  introStart: 0,  // intro animation start in seconds
  lastDaysLeft: null,
  sparkles: [],
};

/* ─── Date helpers ────────────────────────────── */
function parseDateLocal(s) {
  const [y,m,d] = s.split('-').map(Number);
  return new Date(y, m-1, d);
}
function formatShort(d) {
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}
function calcDates() {
  const now    = new Date();
  const msLeft = S.targetDate - now;
  S.daysLeft   = msLeft <= 0 ? 0 : Math.ceil(msLeft / 86_400_000);
  const msPast = now - S.startDate;
  S.daysPast   = msPast <= 0 ? 0 : Math.floor(msPast / 86_400_000);
  const msTotal = Math.max(S.targetDate - S.startDate, 1);
  S.progress    = Math.min(Math.max((now - S.startDate) / msTotal, 0), 1);
}

/* ─── Heart math ──────────────────────────────── */
// Parametric heart: x = 16sin³t,  y = 13cos(t)-5cos(2t)-2cos(3t)-cos(4t)
// Normalised to roughly [-1,1] range
function heartXY(t) {
  const x =  16 * Math.pow(Math.sin(t), 3);
  const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
  return { x: x/16, y: y/14 };
}

// Is point (nx, ny) inside the heart? Use ray-casting on outline polygon.
let _heartPoly = null;
function getHeartPoly(steps = 256) {
  if (_heartPoly) return _heartPoly;
  _heartPoly = [];
  for (let i = 0; i < steps; i++) {
    _heartPoly.push(heartXY(i / steps * Math.PI * 2));
  }
  return _heartPoly;
}

function insideHeart(nx, ny) {
  const poly = getHeartPoly();
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    const intersect = ((yi > ny) !== (yj > ny)) &&
      (nx < (xj - xi) * (ny - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/* ─── Particle creation ───────────────────────── */
function makeHeartParticles() {
  S.heartPts = [];
  const N = CFG.heartParticles;
  let tries = 0;
  while (S.heartPts.length < N && tries < N * 12) {
    tries++;
    const nx = (Math.random() - 0.5) * 2.2;
    const ny = (Math.random() - 0.5) * 2.2;
    if (!insideHeart(nx, ny)) continue;

    // distance from outline → bigger dots near edge (like reference)
    const edgeDist = Math.min(
      Math.abs(nx), Math.abs(ny),
      Math.sqrt(nx*nx + ny*ny)
    );

    S.heartPts.push({
      nx, ny,                               // normalised position
      r: 1.5 + Math.random() * 4.5,         // base radius px
      // slight random velocity for jitter
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      phase: Math.random() * Math.PI * 2,   // shimmer phase
      brightness: 0.5 + Math.random() * 0.5,
    });
  }
}

function makeEdgeParticles() {
  S.edgePts = [];
  const N = CFG.edgeParticles;
  for (let i = 0; i < N; i++) {
    const tt = (i / N) * Math.PI * 2;
    const p = heartXY(tt);
    const jitter = (Math.random() - 0.5) * 0.015;
    const angle = Math.random() * Math.PI * 2;
    S.edgePts.push({
      nx: p.x + Math.cos(angle) * jitter,
      ny: p.y + Math.sin(angle) * jitter,
      r: 1.3 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
      brightness: 0.65 + Math.random() * 0.35,
      order: Math.random(),
    });
  }
  S.edgePts.sort((a, b) => a.order - b.order);
}

function makeDustParticles() {
  S.dustPts = [];
  for (let i = 0; i < CFG.dustParticles; i++) {
    // scatter in a wide area around the heart
    const angle = Math.random() * Math.PI * 2;
    const dist  = 0.8 + Math.random() * 1.0;   // normalised units from centre
    S.dustPts.push({
      nx: Math.cos(angle) * dist * 1.2,
      ny: Math.sin(angle) * dist * 0.9,
      r:  0.8 + Math.random() * 2.5,
      alpha: 0.08 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.0002,
    });
  }
}

function addMilestoneSparkles(count = 52) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.14 + Math.random() * 0.22;
    const baseR = (0.15 + Math.random() * 0.85) * S.scale;
    const ox = Math.cos(angle) * baseR * (0.85 + Math.random() * 0.35);
    const oy = Math.sin(angle) * baseR * (0.7 + Math.random() * 0.45);
    S.sparkles.push({
      x: S.cx + ox,
      y: S.cy + oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.035,
      r: 1.2 + Math.random() * 2.8,
      life: 0.95 + Math.random() * 0.75,
      age: 0,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function drawTinyHeart(ctx2d, x, y, size, fillStyle) {
  const s = Math.max(0.6, size);
  ctx2d.fillStyle = fillStyle;
  ctx2d.beginPath();
  ctx2d.moveTo(x, y + s * 0.35);
  ctx2d.bezierCurveTo(
    x - s * 0.95, y - s * 0.3,
    x - s * 0.9, y - s * 1.25,
    x, y - s * 0.45
  );
  ctx2d.bezierCurveTo(
    x + s * 0.9, y - s * 1.25,
    x + s * 0.95, y - s * 0.3,
    x, y + s * 0.35
  );
  ctx2d.closePath();
  ctx2d.fill();
}

/* ─── Colour logic ────────────────────────────── */
/**
 * Returns [r,g,b] for a heart particle given:
 *   ny       — normalised y (-1=bottom, +1=top of heart bounding box)
 *   progress — overall fill level 0→1
 *   waveOff  — wave scroll offset (time-driven)
 *   bright   — per-particle brightness 0→1
 */
function particleColor(ny, progress, waveOff, bright, px) {
  const H = CFG.hue;

  // ny is in roughly [-1, 1]; remap to [0,1] bottom→top
  // Canvas Y grows downward, so bottom is ny ~= +1.
  const yn = (1.0 - ny) / 2.0;

  // Ripple at the fill boundary
  const ripple = 0.04 * Math.sin(px * 8 + waveOff * 5);
  const fillLine = progress + ripple;

  // Distance below fill line (positive = filled)
  const dist = fillLine - yn;
  const waveW = 0.10;

  let lightness, saturation, alpha;

  if (dist > waveW) {
    // Fully filled — vivid
    lightness  = 45 + bright * 25;
    saturation = 90;
    alpha      = 0.75 + bright * 0.25;
  } else if (dist > -waveW) {
    // Wave front — bright glow crest
    const t = (dist + waveW) / (waveW * 2);
    const pulse = Math.sin(t * Math.PI);
    lightness  = 35 + t * 35 + pulse * 30;
    saturation = 80 + pulse * 20;
    alpha      = 0.5 + t * 0.5;
  } else {
    // Unfilled — dim, slight shimmer so still visible
    lightness  = 18 + bright * 10;
    saturation = 60;
    alpha      = 0.18 + bright * 0.15;
  }

  return `hsla(${H},${saturation.toFixed(0)}%,${lightness.toFixed(0)}%,${alpha.toFixed(2)})`;
}

/* ─── Resize ──────────────────────────────────── */
function resize() {
  S.W = canvas.width  = window.innerWidth;
  S.H = canvas.height = window.innerHeight;
  const isMobile = S.W <= 840;
  S.cx    = S.W / 2;
  S.cy    = S.H * (isMobile ? 0.25 : 0.36);
  S.scale = Math.min(S.W, S.H) * (isMobile ? 0.27 : 0.31);
  positionProgressBar();
}

function positionProgressBar() {
  const barWrap = document.getElementById('progress-bar-wrap');
  if (!barWrap) return;
  if (window.innerWidth <= 840) {
    barWrap.style.top = '';
    return;
  }
  const verticalGap = Math.max(16, Math.min(64, S.H * 0.025));
  const heartBottom = S.cy + S.scale;
  const maxTop = S.H - 70;
  const topPx = Math.min(heartBottom + verticalGap, maxTop);
  barWrap.style.top = `${topPx}px`;
}

/* ─── Render ──────────────────────────────────── */
function render() {
  const { W, H, cx, cy, scale, progress, t } = S;
  const waveOff = t * 0.22;
  const introElapsed = Math.max(0, t - S.introStart);
  const outlineRatio = Math.min(introElapsed / CFG.outlineDuration, 1);
  const fillRatio = Math.min(Math.max((introElapsed - CFG.outlineDuration * 0.55) / CFG.fillDuration, 0), 1);
  const revealedProgress = progress * fillRatio;
  const edgeVisible = Math.floor(S.edgePts.length * outlineRatio);
  const beat = 1 + Math.max(0, Math.sin(t * 1.2)) ** 8 * 0.006;
  const drawScale = scale * beat;

  const H0 = CFG.hue;

  /* ── 2. Main canvas ── */
  // Black background with subtle vignette
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Vignette
  const vig = ctx.createRadialGradient(cx, cy, H*0.05, cx, cy, H*0.85);
  vig.addColorStop(0, 'rgba(0,0,20,0)');
  vig.addColorStop(1, 'rgba(0,0,10,0.85)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  // Dust / scatter particles (sharp dots)
  for (const p of S.dustPts) {
    const sx = cx + p.nx * drawScale;
    const sy = cy + p.ny * drawScale;
    const flicker = 0.85 + 0.15 * Math.sin(t * 0.8 + p.phase);
    const alpha   = p.alpha * flicker;
    drawTinyHeart(ctx, sx, sy, p.r * 0.9, `hsla(${H0},80%,70%,${alpha.toFixed(2)})`);
  }

  // Heart particles — sharp layer
  for (const p of S.heartPts) {
    const yn = (1 - p.ny) * 0.5;
    if (yn > revealedProgress) continue;
    // Gentle jitter
    const jx = Math.sin(t * 0.45 + p.phase) * 0.0006 * scale;
    const jy = Math.cos(t * 0.4 + p.phase) * 0.0006 * scale;
    const sx = cx + p.nx * drawScale + jx;
    const sy = cy + p.ny * drawScale + jy;

    const col = particleColor(p.ny, revealedProgress, waveOff, p.brightness, p.nx);
    const shimmer = 0.94 + 0.06 * Math.sin(t * 1.1 + p.phase);
    const r = p.r * shimmer;

    drawTinyHeart(ctx, sx, sy, r * 0.72, col);
  }
  for (let i = 0; i < edgeVisible; i++) {
    const p = S.edgePts[i];
    const jx = Math.sin(t * 0.5 + p.phase) * 0.0005 * scale;
    const jy = Math.cos(t * 0.45 + p.phase) * 0.0005 * scale;
    const sx = cx + p.nx * drawScale + jx;
    const sy = cy + p.ny * drawScale + jy;
    const pulse = 0.96 + 0.04 * Math.sin(t * 1.0 + p.phase);
    const r = p.r * pulse;
    drawTinyHeart(ctx, sx, sy, r * 0.95, `hsla(${H0},95%,78%,0.95)`);
  }

  // One-shot milestone accents (short sparkling burst)
  for (let i = S.sparkles.length - 1; i >= 0; i--) {
    const sp = S.sparkles[i];
    sp.age += 1 / 60;
    if (sp.age >= sp.life) {
      S.sparkles.splice(i, 1);
      continue;
    }
    const k = sp.age / sp.life;
    const easeOut = 1 - (1 - k) * (1 - k);
    const x = sp.x + sp.vx * easeOut * S.scale * 0.9;
    const y = sp.y + sp.vy * easeOut * S.scale * 0.9;
    const alpha = (1 - k) * (0.6 + 0.4 * Math.sin(t * 8 + sp.phase));
    drawTinyHeart(ctx, x, y, sp.r * (1 - k * 0.5), `hsla(${H0},100%,84%,${alpha.toFixed(2)})`);
  }
}

/* ─── Animation loop ──────────────────────────── */
let last = 0;
function loop(now) {
  S.t = now / 1000;
  render();
  if (!PREFERS_REDUCED_MOTION) {
    requestAnimationFrame(loop);
  }
}

/* ─── UI helpers ──────────────────────────────── */
function updateUI() {
  calcDates();
  const ctrEl  = document.getElementById('counter-block');
  const msgEl  = document.getElementById('message');
  const fillEl = document.getElementById('progress-bar-fill');
  const pastNumEl = document.getElementById('past-days-number');
  const pastLabelEl = document.getElementById('past-days-label');
  pastNumEl.textContent = S.daysPast;
  pastLabelEl.textContent = S.daysPast === 1 ? 'day passed' : 'days passed';

  if (S.daysLeft <= 0) {
    ctrEl.classList.add('hidden');
    msgEl.classList.remove('hidden');
    S.progress = 1;
    fillEl.style.width = '100%';
  } else {
    ctrEl.classList.remove('hidden');
    msgEl.classList.add('hidden');
    document.getElementById('days-number').textContent = S.daysLeft;
    document.getElementById('days-label').textContent  = S.daysLeft === 1 ? 'day' : 'days';
    const progressWidth = (S.progress * 100).toFixed(1) + '%';
    if (PREFERS_REDUCED_MOTION) {
      fillEl.style.width = progressWidth;
    } else {
      setTimeout(() => { fillEl.style.width = progressWidth; }, 160);
    }
  }
  document.getElementById('start-label').textContent = formatShort(S.startDate);
  document.getElementById('end-label').textContent   = formatShort(S.targetDate);

  const milestones = [100, 30, 7, 1];
  if (!PREFERS_REDUCED_MOTION && S.lastDaysLeft !== null && S.daysLeft < S.lastDaysLeft) {
    for (const mark of milestones) {
      if (S.lastDaysLeft > mark && S.daysLeft <= mark) {
        addMilestoneSparkles(mark <= 7 ? 86 : 60);
        break;
      }
    }
  }
  S.lastDaysLeft = S.daysLeft;
}

/* ─── Init ────────────────────────────────────── */
function init() {
  const bodyStartDate = document.body.dataset.startDate || CFG.startDateStr;
  const bodyEndDate = document.body.dataset.endDate || CFG.targetDateStr;
  const saved = localStorage.getItem('heartCountdownTarget') || bodyEndDate;
  S.targetDate = parseDateLocal(saved);
  S.startDate = parseDateLocal(bodyStartDate);

  const picker  = document.getElementById('date-input');
  picker.value  = saved;
  picker.addEventListener('change', () => {
    if (!picker.value) return;
    localStorage.setItem('heartCountdownTarget', picker.value);
    S.targetDate = parseDateLocal(picker.value);
    calcDates();
    updateUI();
  });

  resize();
  window.addEventListener('resize', () => { resize(); makeHeartParticles(); makeEdgeParticles(); makeDustParticles(); });

  makeHeartParticles();
  makeEdgeParticles();
  makeDustParticles();
  calcDates();
  updateUI();
  setInterval(updateUI, 60_000);
  S.introStart = performance.now() / 1000;
  requestAnimationFrame(loop);
}

document.addEventListener('DOMContentLoaded', init);

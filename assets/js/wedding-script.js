/**
 * WEDDING WEBSITE — script.js
 * Modules: Countdown · Heart Canvas · Particles · Scroll Reveal · Nav · RSVP · Music
 */

'use strict';

/* =============================================
   CONFIG — change these to personalise
   ============================================= */
const WEDDING_DATE = new Date('2026-04-26T14:00:00');

/* =============================================
   DOM READY
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initHeart();
  initParticles();
  initScrollReveal();
  initNav();
  initRSVP();
  initMusic();
  initParallax();
});

/* =============================================
   1. COUNTDOWN
   ============================================= */
function initCountdown() {
  const numEl   = document.getElementById('counterNumber');
  const labelEl = document.getElementById('counterLabel');
  if (!numEl || !labelEl) return;

  function update() {
    const now   = new Date();
    const diff  = WEDDING_DATE - now;
    const days  = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (diff <= 0) {
      numEl.textContent  = '♥';
      labelEl.textContent = 'Hôm nay là ngày trọng đại';
    } else {
      numEl.textContent  = days;
      labelEl.textContent = days === 1 ? 'còn 1 ngày' : 'ngày nữa';
    }
  }

  update();
  setInterval(update, 60 * 1000);
}

/* =============================================
   2. HEART CANVAS ANIMATION
   A soft parametric heart drawn with rotating
   golden particles, beating gently.
   ============================================= */
function initHeart() {
  const canvas = document.getElementById('heartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;
  let beatPhase = 0;

  // Parametric heart point
  function heartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    return { x, y };
  }

  class HeartParticle {
    constructor(t) {
      this.t      = t;
      this.speed  = 0.002 + Math.random() * 0.004;
      this.offset = Math.random() * 0.12 - 0.06;
      this.alpha  = 0.3 + Math.random() * 0.65;
      this.size   = 1.2 + Math.random() * 2.2;
      this.trail  = [];
      this.trailLen = Math.floor(3 + Math.random() * 5);
    }
    update(scale, cx, cy, beat) {
      this.t = (this.t + this.speed) % (Math.PI * 2);
      const p = heartPoint(this.t);
      const r = scale * (1 + this.offset);
      this.x = cx + p.x * r * beat;
      this.y = cy + p.y * r * beat;
      this.trail.unshift({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLen) this.trail.pop();
    }
    draw(ctx) {
      for (let i = this.trail.length - 1; i >= 0; i--) {
        const ratio  = 1 - i / this.trail.length;
        const a      = this.alpha * ratio * ratio;
        const s      = this.size * ratio;
        const hue    = 30 + 15 * ratio;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = `hsl(${hue}, 72%, 65%)`;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = `rgba(230, 190, 100, ${a * 0.6})`;
        ctx.beginPath();
        ctx.arc(this.trail[i].x, this.trail[i].y, s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildParticles();
  }

  function buildParticles() {
    const N = Math.min(220, Math.floor(W * 0.14));
    particles = Array.from({ length: N }, (_, i) =>
      new HeartParticle((i / N) * Math.PI * 2)
    );
  }

  function draw(time) {
    animId = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);

    beatPhase += 0.025;
    const beat = 1 + 0.025 * Math.sin(beatPhase);

    const cx    = W / 2;
    const cy    = H / 2 - H * 0.03;
    const scale = Math.min(W, H) * 0.026;

    for (const p of particles) {
      p.update(scale, cx, cy, beat);
      p.draw(ctx);
    }
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* =============================================
   3. FLOATING BACKGROUND PARTICLES
   Tiny glowing specks drifting upward
   ============================================= */
function initParticles() {
  const container = document.getElementById('particleCanvas');
  if (!container) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible';
  container.appendChild(svg);

  const N = 28;
  const dots = [];

  for (let i = 0; i < N; i++) {
    const circle = document.createElementNS(SVG_NS, 'circle');
    const r     = 0.8 + Math.random() * 1.4;
    const x     = Math.random() * 100;  // %
    const y     = 100 + Math.random() * 30;
    const dur   = 14 + Math.random() * 20;
    const delay = Math.random() * -dur;

    circle.setAttribute('r', r);
    circle.setAttribute('cx', `${x}%`);
    circle.setAttribute('cy', `${y}%`);
    circle.setAttribute('fill', `rgba(201,168,76,${0.2 + Math.random() * 0.4})`);
    circle.style.animation = `floatUp ${dur}s ${delay}s linear infinite`;

    svg.appendChild(circle);
    dots.push({ el: circle, startY: y, x });
  }

  // Inject keyframes once
  if (!document.getElementById('floatKF')) {
    const style = document.createElement('style');
    style.id = 'floatKF';
    style.textContent = `
      @keyframes floatUp {
        0%   { transform: translateY(0) scale(1);    opacity: 0; }
        5%   { opacity: 1; }
        90%  { opacity: 0.6; }
        100% { transform: translateY(-120vh) scale(0.3); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* =============================================
   4. SCROLL REVEAL
   ============================================= */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* =============================================
   5. NAV
   ============================================= */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  if (new Date() > WEDDING_DATE) {
    const rsvpLink = nav.querySelector('.nav__rsvp');
    if (rsvpLink) rsvpLink.textContent = 'Khoảnh khắc';
  }

  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth anchor links
  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* =============================================
   6. RSVP FORM
   ============================================= */
function initRSVP() {
  const rsvpInner = document.querySelector('#rsvp .rsvp__inner');
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');

  if (new Date() > WEDDING_DATE) {
    if (rsvpInner) {
      rsvpInner.innerHTML = `
        <p class="rsvp__eyebrow reveal">Sau ngày cưới</p>
        <h2 class="section-title reveal">Khoảnh khắc đám cưới</h2>
        <div class="rsvp__post-gallery reveal">
          <div class="rsvp__post-item"><img src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=900&q=80" alt="Khoảnh khắc cưới 1" loading="lazy" /></div>
          <div class="rsvp__post-item"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80" alt="Khoảnh khắc cưới 2" loading="lazy" /></div>
          <div class="rsvp__post-item"><img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80" alt="Khoảnh khắc cưới 3" loading="lazy" /></div>
          <div class="rsvp__post-item"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80" alt="Khoảnh khắc cưới 4" loading="lazy" /></div>
          <div class="rsvp__post-item"><img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80" alt="Khoảnh khắc cưới 5" loading="lazy" /></div>
          <div class="rsvp__post-item"><img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80" alt="Khoảnh khắc cưới 6" loading="lazy" /></div>
        </div>
      `;
    }
    initScrollReveal();
    return;
  }

  if (!form) return;

  function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input)  input.classList.toggle('error', !!msg);
    if (error)  error.textContent = msg || '';
    return !!msg;
  }

  function clearErrors() {
    ['nameError', 'attendanceError', 'guestsError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    const name       = document.getElementById('name')?.value.trim();
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value;
    const guests     = document.getElementById('guests')?.value;

    let hasError = false;

    if (!name) {
      hasError = setError('name', 'nameError', 'Vui lòng nhập tên của bạn.') || hasError;
    }
    if (!attendance) {
      hasError = true;
      const err = document.getElementById('attendanceError');
      if (err) err.textContent = 'Vui lòng chọn xác nhận tham dự.';
    }
    if (attendance === 'yes' && (!guests || guests < 1)) {
      hasError = setError('guests', 'guestsError', 'Vui lòng nhập số lượng khách.') || hasError;
    }

    if (!hasError) {
      form.style.transition = 'opacity 0.5s, transform 0.5s';
      form.style.opacity    = '0';
      form.style.transform  = 'translateY(-12px)';
      setTimeout(() => {
        form.style.display = 'none';
        success.classList.add('visible');
      }, 500);
    }
  });
}

/* =============================================
   7. MUSIC TOGGLE
   ============================================= */
function initMusic() {
  const btn   = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  // Use direct audio file URLs (.mp3/.ogg), not page URLs.
  const playlist = [
    'https://long-nguyen12.github.io/assets/songs/song3.mp3',
    'https://long-nguyen12.github.io/assets/songs/song2.mp3',
    'https://long-nguyen12.github.io/assets/songs/song1.mp3',
  ];

  let trackIndex = 0;
  let playing = false;
  let waitingForUserGesture = false;

  function setButtonState(isPlaying) {
    btn.classList.toggle('playing', isPlaying);
    btn.querySelector('.music-icon').textContent = isPlaying ? '♫' : '♪';
  }

  function loadTrack(index) {
    trackIndex = (index + playlist.length) % playlist.length;
    audio.src = playlist[trackIndex];
    audio.load();
  }

  function playCurrentTrack() {
    return audio.play();
  }

  loadTrack(trackIndex);

  audio.addEventListener('ended', () => {
    loadTrack(trackIndex + 1);
    if (playing) playCurrentTrack();
  });

  audio.addEventListener('error', () => {
    // If a track fails to load, move on automatically.
    loadTrack(trackIndex + 1);
    if (playing) playCurrentTrack();
  });

  async function attemptAutoPlay() {
    // Most mobile browsers allow autoplay only when muted.
    audio.muted = true;
    audio.volume = 0;
    try {
      await playCurrentTrack();
      audio.muted = false;
      playing = true;
      waitingForUserGesture = false;
      setButtonState(true);
      fadeAudio(audio, 0, 0.35, 2000);
    } catch (_) {
      // Browser blocked autoplay; user can start with the button.
      playing = false;
      waitingForUserGesture = true;
      setButtonState(false);
    }
  }

  attemptAutoPlay();

  function resumeAfterGesture() {
    if (!waitingForUserGesture || playing) return;
    waitingForUserGesture = false;
    audio.muted = false;
    audio.volume = 0;
    playCurrentTrack()
      .then(() => {
        playing = true;
        setButtonState(true);
        fadeAudio(audio, 0, 0.35, 1600);
      })
      .catch(() => {
        playing = false;
        setButtonState(false);
      });
  }

  ['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
    document.addEventListener(eventName, resumeAfterGesture, { once: true, passive: true });
  });

  btn.addEventListener('click', () => {
    playing = !playing;
    if (playing) {
      waitingForUserGesture = false;
      audio.muted = false;
      audio.volume = 0;
      playCurrentTrack().catch(() => {});
      fadeAudio(audio, 0, 0.35, 2000);
      setButtonState(true);
    } else {
      fadeAudio(audio, audio.volume, 0, 800, () => audio.pause());
      setButtonState(false);
    }
  });

  function fadeAudio(audio, from, to, duration, cb) {
    const steps    = 30;
    const interval = duration / steps;
    const delta    = (to - from) / steps;
    let current    = from;
    let count      = 0;
    const timer = setInterval(() => {
      current += delta;
      audio.volume = Math.max(0, Math.min(1, current));
      count++;
      if (count >= steps) {
        clearInterval(timer);
        if (cb) cb();
      }
    }, interval);
  }
}

/* =============================================
   8. PARALLAX (hero elements only, lightweight)
   ============================================= */
function initParallax() {
  const hero   = document.querySelector('.hero');
  const bg     = document.querySelector('.hero__bg');
  const heart  = document.getElementById('heartCanvas');
  if (!hero || !bg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.5) {
          if (bg)    bg.style.transform    = `translateY(${y * 0.3}px)`;
          if (heart) heart.style.transform = `translateY(${y * 0.15}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

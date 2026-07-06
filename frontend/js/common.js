/* =========================================================
   GROWING WITH SID — Common site behaviors (every page)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initLoader();
  initCursorGlow();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initNeuralCanvas();
  initRevealObserver();
  initCounters();
  initToolTilt();
});

/* ---------------- Loader ---------------- */
function initLoader(){
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 400));
  setTimeout(() => loader.classList.add('hidden'), 2000);
}

/* ---------------- Cursor glow ---------------- */
function initCursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(max-width: 900px)').matches) return;
  let x = window.innerWidth/2, y = window.innerHeight/2, cx = x, cy = y;
  window.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
  function anim(){
    cx += (x-cx)*0.12; cy += (y-cy)*0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(anim);
  }
  anim();
}

/* ---------------- Navbar ---------------- */
function initNavbar(){
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* ---------------- Mobile menu ---------------- */
function initMobileMenu(){
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ---------------- Theme toggle ---------------- */
function initThemeToggle(){
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const saved = localStorage.getItem('gws-theme');
  if (saved === 'light') applyTheme('light');

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });

  function applyTheme(mode){
    if (mode === 'light'){
      document.documentElement.setAttribute('data-theme','light');
      icon.setAttribute('data-lucide','sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      icon.setAttribute('data-lucide','moon');
    }
    localStorage.setItem('gws-theme', mode);
    if (window.lucide) lucide.createIcons();
  }
}

/* ---------------- Neural network canvas (hero / page-header signature) ---------------- */
function initNeuralCanvas(){
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  const host = canvas.closest('.hero, .page-header') || canvas.parentElement;

  function resize(){
    w = canvas.width = host.offsetWidth;
    h = canvas.height = host.offsetHeight;
    const count = Math.min(70, Math.floor((w*h)/18000));
    nodes = Array.from({length: count}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
      r: Math.random()*1.6+0.6
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  const colors = ['79,157,255','123,97,255','0,229,255'];

  function draw(){
    ctx.clearRect(0,0,w,h);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    for (let i=0;i<nodes.length;i++){
      for (let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < 140){
          ctx.strokeStyle = `rgba(${colors[i%3]},${(1 - d/140)*0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    nodes.forEach((n,i) => {
      ctx.fillStyle = `rgba(${colors[i%3]},0.7)`;
      ctx.beginPath();
      ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------------- Scroll reveal ---------------- */
function initRevealObserver(){
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

/* ---------------- Animated counters ---------------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));

  function animateCounter(el){
    const target = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.decimal || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function frame(now){
      const progress = Math.min((now-start)/duration, 1);
      const eased = 1 - Math.pow(1-progress, 3);
      const value = target * eased;
      el.textContent = formatNumber(value, decimals) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = formatNumber(target, decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }

  function formatNumber(value, decimals){
    if (decimals > 0) return value.toFixed(decimals);
    if (value >= 1000) return Math.round(value).toLocaleString('en-US');
    return Math.round(value).toString();
  }
}

/* ---------------- Tool card cursor glow ---------------- */
function initToolTilt(){
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.tool-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}

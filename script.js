/* =========================================================
   GROWING WITH SID — App JS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  document.getElementById('year').textContent = new Date().getFullYear();

  initLoader();
  initCursorGlow();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initNeuralCanvas();
  initRevealObserver();
  initCounters();
  initReels();
  initBlog();
  initTools();
  initTestimonials();
  initMarquee();
  initForms();
  initToolTilt();
});

/* ---------------- Loader ---------------- */
function initLoader(){
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // fallback in case load event already fired
  setTimeout(() => loader.classList.add('hidden'), 2000);
}

/* ---------------- Cursor glow ---------------- */
function initCursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(max-width: 900px)').matches) return;
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
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* ---------------- Mobile menu ---------------- */
function initMobileMenu(){
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ---------------- Theme toggle ---------------- */
function initThemeToggle(){
  const btn = document.getElementById('themeToggle');
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
    lucide.createIcons();
  }
}

/* ---------------- Neural network canvas (hero signature) ---------------- */
function initNeuralCanvas(){
  const canvas = document.getElementById('neuralCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  const hero = document.querySelector('.hero');

  function resize(){
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
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

/* =========================================================
   DATA
   ========================================================= */
const REELS = [
  { title:"5 ChatGPT prompts that save me 10hrs/week", desc:"The exact prompt formulas I use for planning, writing and research.", cat:"chatgpt", catLabel:"ChatGPT", views:"612K", likes:"48K", date:"1d ago", img:"https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&auto=format&fit=crop" },
  { title:"Automate your inbox with AI in 5 minutes", desc:"Set up a zero-effort email triage system using GPT + Zapier.", cat:"automation", catLabel:"Automation", views:"389K", likes:"31K", date:"2d ago", img:"https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=600&auto=format&fit=crop" },
  { title:"This AI tool builds websites in 60 seconds", desc:"A hands-on look at the fastest AI website builder I've tested.", cat:"websites", catLabel:"Websites", views:"1.2M", likes:"96K", date:"3d ago", img:"https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop" },
  { title:"Notion + AI: my exact second brain setup", desc:"How I organize projects, notes and tasks with AI-assisted Notion.", cat:"productivity", catLabel:"Productivity", views:"455K", likes:"38K", date:"4d ago", img:"https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop" },
  { title:"Top 7 AI tools nobody's talking about yet", desc:"Underrated tools that quietly outperform the popular ones.", cat:"ai-tools", catLabel:"AI Tools", views:"780K", likes:"61K", date:"4d ago", img:"https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop" },
  { title:"Full ChatGPT tutorial for total beginners", desc:"Everything you need to know to start using ChatGPT the right way.", cat:"tutorials", catLabel:"Tutorials", views:"920K", likes:"71K", date:"5d ago", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" },
  { title:"The 2-minute AI trick to write better captions", desc:"A tiny prompt tweak that instantly improves your social copy.", cat:"tips", catLabel:"Tips & Tricks", views:"334K", likes:"28K", date:"6d ago", img:"https://images.unsplash.com/photo-1655720031554-a929595ffad7?q=80&w=600&auto=format&fit=crop" },
  { title:"Build a personal AI assistant with no code", desc:"Step-by-step: connect GPT to your calendar, tasks and notes.", cat:"automation", catLabel:"Automation", views:"501K", likes:"42K", date:"6d ago", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop" },
  { title:"I let AI plan my entire week — here's what happened", desc:"An honest experiment handing my calendar over to an AI agent.", cat:"productivity", catLabel:"Productivity", views:"667K", likes:"55K", date:"1w ago", img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" },
  { title:"3 AI tools that replaced my entire team", desc:"How solo creators are shipping like small studios in 2026.", cat:"ai-tools", catLabel:"AI Tools", views:"1.1M", likes:"88K", date:"1w ago", img:"https://images.unsplash.com/photo-1526378787940-576a539ba69d?q=80&w=600&auto=format&fit=crop" },
  { title:"Landing pages in minutes with AI website builders", desc:"Comparing three tools so you don't have to test them yourself.", cat:"websites", catLabel:"Websites", views:"298K", likes:"22K", date:"1w ago", img:"https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=600&auto=format&fit=crop" },
  { title:"Prompt engineering in plain English", desc:"A tutorial that finally makes prompting click for beginners.", cat:"tutorials", catLabel:"Tutorials", views:"812K", likes:"64K", date:"2w ago", img:"https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop" },
];

const BLOGS = [
  { title:"The State of AI in 2026: What Actually Changed", excerpt:"Cutting through the hype to look at what genuinely shifted for creators and businesses this year.", cat:"ai-news", catLabel:"AI News", time:"7 min read", date:"Jun 28, 2026", img:"https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=700&auto=format&fit=crop" },
  { title:"10 AI Tools Worth Paying For (And 5 That Aren't)", excerpt:"A no-nonsense breakdown of which AI subscriptions actually earn their spot in your stack.", cat:"ai-tools", catLabel:"AI Tools", time:"9 min read", date:"Jun 21, 2026", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=700&auto=format&fit=crop" },
  { title:"How to Build Your First AI Automation, Step by Step", excerpt:"A beginner-friendly walkthrough of connecting your first no-code AI workflow.", cat:"tutorials", catLabel:"Tutorials", time:"12 min read", date:"Jun 14, 2026", img:"https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=700&auto=format&fit=crop" },
  { title:"The Productivity Stack I Actually Use Daily", excerpt:"Every app, prompt and shortcut in my real daily workflow — no filler.", cat:"productivity", catLabel:"Productivity", time:"6 min read", date:"Jun 7, 2026", img:"https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=700&auto=format&fit=crop" },
  { title:"How Small Businesses Are Quietly Winning with AI", excerpt:"Real examples of small teams using AI to compete with much bigger budgets.", cat:"business", catLabel:"Business", time:"8 min read", date:"May 30, 2026", img:"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=700&auto=format&fit=crop" },
  { title:"Automation Isn't Scary: A Practical Starter Guide", excerpt:"Why 'automation' sounds harder than it is, and where to actually begin.", cat:"automation", catLabel:"Automation", time:"7 min read", date:"May 22, 2026", img:"https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=700&auto=format&fit=crop" },
  { title:"Inside the AI Tools Changing How We Write", excerpt:"A look at the newest writing assistants and where they genuinely help.", cat:"ai-tools", catLabel:"AI Tools", time:"5 min read", date:"May 15, 2026", img:"https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=700&auto=format&fit=crop" },
  { title:"AI News Roundup: The Launches That Mattered", excerpt:"Skipping the noise to cover the handful of releases worth your attention.", cat:"ai-news", catLabel:"AI News", time:"6 min read", date:"May 8, 2026", img:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=700&auto=format&fit=crop" },
];

const TOOLS = [
  { name:"PromptForge", cat:"Prompt Engineering", rating:4.8, desc:"Build, test and version your prompts like code — with built-in A/B comparisons.", initial:"P" },
  { name:"FlowPilot", cat:"Automation", rating:4.7, desc:"Drag-and-drop AI workflows connecting your favorite apps in minutes.", initial:"F" },
  { name:"NoteMind", cat:"Productivity", rating:4.6, desc:"An AI second brain that organizes notes, tasks and ideas automatically.", initial:"N" },
  { name:"SiteCraft AI", cat:"Website Builder", rating:4.5, desc:"Describe your site in plain English and get a launch-ready page.", initial:"S" },
  { name:"ClipGenius", cat:"Content Creation", rating:4.7, desc:"Turns long videos into short, caption-ready clips automatically.", initial:"C" },
  { name:"InboxZero AI", cat:"Automation", rating:4.4, desc:"Triages, drafts and schedules your email replies while you focus elsewhere.", initial:"I" },
];

const TESTIMONIALS = [
  { text:"Sid's reels are the only AI content I actually finish watching. Practical, no fluff, and I use something from almost every video.", name:"Ananya Rao", role:"Product Designer", img:"https://randomuser.me/api/portraits/women/68.jpg" },
  { text:"I automated half my content workflow after one blog post. Growing With Sid pays for itself in saved hours every single week.", name:"Marcus Lee", role:"Freelance Creator", img:"https://randomuser.me/api/portraits/men/32.jpg" },
  { text:"Finally, someone who explains AI without the jargon. My whole team follows the newsletter now.", name:"Priya Nair", role:"Marketing Lead, Loopwave", img:"https://randomuser.me/api/portraits/women/44.jpg" },
  { text:"The tool reviews alone have saved me from at least three bad subscriptions. Honest, sharp, and always useful.", name:"Daniel Kim", role:"Indie Hacker", img:"https://randomuser.me/api/portraits/men/76.jpg" },
];

const BRANDS = ["Notion","Zapier","Framer","Vercel","Linear","OpenAI","Superhuman","Runway"];

/* ---------------- Reels ---------------- */
function initReels(){
  const grid = document.getElementById('reelsGrid');
  const filters = document.getElementById('reelFilters');
  const loadMoreBtn = document.getElementById('loadMoreReels');
  let activeFilter = 'all';
  let visibleCount = 6;
  const step = 6;

  function cardHTML(r){
    return `
    <article class="reel-card" data-cat="${r.cat}">
      <div class="reel-thumb">
        <img src="${r.img}" alt="${r.title}" loading="lazy" />
        <span class="reel-cat-badge">${r.catLabel}</span>
        <div class="play-icon"><i data-lucide="play"></i></div>
      </div>
      <div class="reel-info">
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
        <div class="reel-meta">
          <span><i data-lucide="eye"></i> ${r.views}</span>
          <span><i data-lucide="heart"></i> ${r.likes}</span>
          <span><i data-lucide="calendar"></i> ${r.date}</span>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener" class="btn btn-glass">
          <i data-lucide="instagram"></i> Watch on Instagram
        </a>
      </div>
    </article>`;
  }

  function render(){
    const filtered = REELS.filter(r => activeFilter === 'all' || r.cat === activeFilter);
    const toShow = filtered.slice(0, visibleCount);
    grid.innerHTML = toShow.map(cardHTML).join('');
    lucide.createIcons();
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reel-card').forEach((el,i) => {
        setTimeout(() => el.classList.add('show'), i*60);
      });
    });
    loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
  }

  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    visibleCount = step;
    render();
  });

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += step;
    render();
  });

  render();
}

/* ---------------- Blog ---------------- */
function initBlog(){
  const grid = document.getElementById('blogGrid');
  const filters = document.getElementById('blogFilters');
  const search = document.getElementById('blogSearch');
  const emptyState = document.getElementById('blogEmpty');
  let activeFilter = 'all';
  let query = '';

  function cardHTML(b){
    return `
    <article class="blog-card">
      <div class="blog-thumb"><img src="${b.img}" alt="${b.title}" loading="lazy" /></div>
      <div class="blog-body">
        <div class="blog-meta-row">
          <span class="blog-cat">${b.catLabel}</span>
          <span>${b.time} · ${b.date}</span>
        </div>
        <h3>${b.title}</h3>
        <p>${b.excerpt}</p>
        <a href="#" class="blog-read">Read More <i data-lucide="arrow-right"></i></a>
      </div>
    </article>`;
  }

  function render(){
    const filtered = BLOGS.filter(b => {
      const matchCat = activeFilter === 'all' || b.cat === activeFilter;
      const matchQuery = !query || b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
    grid.innerHTML = filtered.map(cardHTML).join('');
    emptyState.hidden = filtered.length > 0;
    lucide.createIcons();
  }

  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    render();
  });

  search.addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  render();
}

/* ---------------- Tools ---------------- */
function initTools(){
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = TOOLS.map(t => `
    <div class="tool-card">
      <div class="tool-top">
        <div class="tool-logo">${t.initial}</div>
        <div>
          <h4>${t.name}</h4>
          <span class="tool-cat">${t.cat}</span>
        </div>
      </div>
      <p>${t.desc}</p>
      <div class="tool-bottom">
        <span class="tool-rating"><i data-lucide="star"></i> ${t.rating}</span>
        <a href="#" class="tool-visit">Visit Website <i data-lucide="arrow-up-right"></i></a>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function initToolTilt(){
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest && e.target.closest('.tool-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}

/* ---------------- Testimonials slider ---------------- */
function initTestimonials(){
  const track = document.getElementById('testimonialTrack');
  const dots = document.getElementById('testimonialDots');
  let current = 0;

  track.innerHTML = TESTIMONIALS.map((t,i) => `
    <div class="testimonial-slide ${i===0?'active':''}">
      <p>"${t.text}"</p>
      <div class="testimonial-person">
        <img src="${t.img}" alt="${t.name}" />
        <div><strong>${t.name}</strong><span>${t.role}</span></div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = TESTIMONIALS.map((_,i) => `<button class="${i===0?'active':''}" data-i="${i}"></button>`).join('');

  function goTo(i){
    current = i;
    track.querySelectorAll('.testimonial-slide').forEach((el,idx) => el.classList.toggle('active', idx===i));
    dots.querySelectorAll('button').forEach((el,idx) => el.classList.toggle('active', idx===i));
  }

  dots.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    goTo(parseInt(btn.dataset.i));
  });

  setInterval(() => goTo((current+1) % TESTIMONIALS.length), 5000);
}

/* ---------------- Brands marquee ---------------- */
function initMarquee(){
  const track = document.getElementById('marqueeTrack');
  const list = [...BRANDS, ...BRANDS];
  track.innerHTML = list.map(b => `<span>${b}</span>`).join('');
}

/* ---------------- Forms ---------------- */
function initForms(){
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterNote = document.getElementById('newsletterNote');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterNote.textContent = "You're in! Check your inbox for a welcome email.";
    newsletterForm.reset();
  });

  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactNote.textContent = "Message sent — I'll get back to you within 48 hours.";
    contactForm.reset();
  });
}

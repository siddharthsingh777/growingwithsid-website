/* =========================================================
   Reusable render functions — called by each page's small
   init script with a container id + options.
   ========================================================= */

/* ---------------- Reels ---------------- */
function reelCardHTML(r){
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
      <a href="${r.link || 'https://instagram.com'}" target="_blank" rel="noopener" class="btn btn-glass">
        <i data-lucide="instagram"></i> Watch on Instagram
      </a>
    </div>
  </article>`;
}

async function initReelsSection({ gridId, filtersId, loadMoreId, initialCount = 6, step = 6 }){
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const filters = filtersId ? document.getElementById(filtersId) : null;
  const loadMoreBtn = loadMoreId ? document.getElementById(loadMoreId) : null;

  const allReels = await getReels();
  let activeFilter = 'all';
  let visibleCount = initialCount;

  function render(){
    const filtered = allReels.filter(r => activeFilter === 'all' || r.cat === activeFilter);
    const toShow = filtered.slice(0, visibleCount);
    grid.innerHTML = toShow.map(reelCardHTML).join('');
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reel-card').forEach((el,i) => {
        setTimeout(() => el.classList.add('show'), i*60);
      });
    });
    if (loadMoreBtn) loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
  }

  if (filters){
    filters.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      visibleCount = initialCount;
      render();
    });
  }

  if (loadMoreBtn){
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += step;
      render();
    });
  }

  render();
}

/* ---------------- Blog ---------------- */
function blogCardHTML(b){
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

async function initBlogSection({ gridId, filtersId, searchId, emptyId, limit }){
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const filters = filtersId ? document.getElementById(filtersId) : null;
  const search = searchId ? document.getElementById(searchId) : null;
  const emptyState = emptyId ? document.getElementById(emptyId) : null;

  const allBlogs = await getBlogs();
  let activeFilter = 'all';
  let query = '';

  function render(){
    let filtered = allBlogs.filter(b => {
      const matchCat = activeFilter === 'all' || b.cat === activeFilter;
      const matchQuery = !query || b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
    if (limit) filtered = filtered.slice(0, limit);
    grid.innerHTML = filtered.map(blogCardHTML).join('');
    if (emptyState) emptyState.hidden = filtered.length > 0;
    if (window.lucide) lucide.createIcons();
  }

  if (filters){
    filters.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      render();
    });
  }

  if (search){
    search.addEventListener('input', (e) => {
      query = e.target.value.trim().toLowerCase();
      render();
    });
  }

  render();
}

/* ---------------- Tools ---------------- */
function toolCardHTML(t){
  return `
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
      <a href="${t.link || '#'}" class="tool-visit">Visit Website <i data-lucide="arrow-up-right"></i></a>
    </div>
  </div>`;
}

async function initToolsSection({ gridId, limit }){
  const grid = document.getElementById(gridId);
  if (!grid) return;
  let tools = await getTools();
  if (limit) tools = tools.slice(0, limit);
  grid.innerHTML = tools.map(toolCardHTML).join('');
  if (window.lucide) lucide.createIcons();
}

/* ---------------- Testimonials ---------------- */
async function initTestimonialsSection({ trackId, dotsId }){
  const track = document.getElementById(trackId);
  if (!track) return;
  const dots = dotsId ? document.getElementById(dotsId) : null;
  const testimonials = await getTestimonials();
  let current = 0;

  track.innerHTML = testimonials.map((t,i) => `
    <div class="testimonial-slide ${i===0?'active':''}">
      <p>"${t.text}"</p>
      <div class="testimonial-person">
        <img src="${t.img}" alt="${t.name}" />
        <div><strong>${t.name}</strong><span>${t.role}</span></div>
      </div>
    </div>
  `).join('');

  if (dots){
    dots.innerHTML = testimonials.map((_,i) => `<button class="${i===0?'active':''}" data-i="${i}"></button>`).join('');
    dots.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      goTo(parseInt(btn.dataset.i));
    });
  }

  function goTo(i){
    current = i;
    track.querySelectorAll('.testimonial-slide').forEach((el,idx) => el.classList.toggle('active', idx===i));
    if (dots) dots.querySelectorAll('button').forEach((el,idx) => el.classList.toggle('active', idx===i));
  }

  if (testimonials.length > 1){
    setInterval(() => goTo((current+1) % testimonials.length), 5000);
  }
}

/* ---------------- Brands marquee ---------------- */
function initMarquee(trackId){
  const track = document.getElementById(trackId);
  if (!track) return;
  const list = [...BRANDS, ...BRANDS];
  track.innerHTML = list.map(b => `<span>${b}</span>`).join('');
}

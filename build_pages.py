import os

ROOT = "/home/claude/growing-with-sid/frontend"

NAV_ITEMS = [
    ("index.html", "Home"),
    ("blog.html", "Blog"),
    ("tools.html", "AI Tools"),
    ("about.html", "About"),
    ("community.html", "Community"),
    ("contact.html", "Contact"),
]

def head(title, description, canonical):
    return f"""<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content="{description}" />

<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" />
<meta property="og:url" content="https://growingwithsid.com/{canonical}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" />

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2246%22 fill=%22%23090909%22 stroke=%22%2300E5FF%22 stroke-width=%224%22/><text x=%2250%22 y=%2266%22 font-size=%2255%22 fill=%22%234F9DFF%22 text-anchor=%22middle%22 font-family=%22sans-serif%22>S</text></svg>" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<link rel="stylesheet" href="css/style.css">"""

def nav(active):
    links = "\n      ".join(
        f'<a href="{href}"{" class=\"active\"" if href == active else ""}>{label}</a>'
        for href, label in NAV_ITEMS
    )
    mobile_links = "\n  ".join(
        f'<a href="{href}">{label}</a>' for href, label in NAV_ITEMS
    )
    return f"""<!-- ================= NAVBAR ================= -->
<header class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <span class="logo-mark">S</span>
      <span class="logo-text">Growing With <em>Sid</em></span>
    </a>

    <nav class="nav-links" id="navLinks">
      {links}
    </nav>

    <div class="nav-actions">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <i data-lucide="moon"></i>
      </button>
      <a href="index.html#newsletter" class="btn btn-primary btn-sm">Join the List</a>
      <button class="nav-burger" id="navBurger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<!-- ================= MOBILE MENU ================= -->
<div class="mobile-menu" id="mobileMenu">
  {mobile_links}
  <a href="index.html#newsletter" class="btn btn-primary">Join the List</a>
</div>"""

TOP = """<!-- ================= CURSOR GLOW ================= -->
<div class="cursor-glow" id="cursorGlow"></div>
<div class="noise-overlay"></div>

<!-- ================= LOADER ================= -->
<div class="loader" id="pageLoader">
  <div class="loader-inner">
    <div class="loader-ring"></div>
    <span class="loader-text">GROWING WITH SID</span>
  </div>
</div>"""

FOOTER = """<!-- ================= FOOTER ================= -->
<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="logo">
        <span class="logo-mark">S</span>
        <span class="logo-text">Growing With <em>Sid</em></span>
      </a>
      <p>Learn AI. Build Faster. Grow Smarter.</p>
      <div class="footer-socials">
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" class="youtube"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="linkedin"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Explore</h4>
      <a href="reels.html">Reels</a>
      <a href="blog.html">Blog</a>
      <a href="tools.html">AI Tools</a>
      <a href="about.html">About</a>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <a href="community.html">Community</a>
      <a href="index.html#newsletter">Newsletter</a>
      <a href="contact.html">Contact</a>
    </div>

    <div class="footer-col">
      <h4>Legal</h4>
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms &amp; Conditions</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <span id="year"></span> Growing With Sid. All rights reserved.</span>
    <span class="footer-made">Designed for the AI era.</span>
  </div>
</footer>"""

def scripts(extra_inline=""):
    base = """<script src="js/config.js"></script>
<script src="js/data.js"></script>
<script src="js/api.js"></script>
<script src="js/common.js"></script>
<script src="js/render.js"></script>
<script src="js/forms.js"></script>"""
    if extra_inline:
        base += f"\n<script>\n{extra_inline}\n</script>"
    return base

def page_header(eyebrow, title, sub, breadcrumb_label, with_canvas=True):
    canvas = '<canvas id="neuralCanvas"></canvas>\n  ' if with_canvas else ''
    return f"""<section class="page-header">
  {canvas}<div class="hero-blob blob-1"></div>
  <div class="hero-blob blob-2"></div>
  <div class="page-header-content">
    <div class="breadcrumb"><a href="index.html">Home</a> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i> <span>{breadcrumb_label}</span></div>
    <span class="section-eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    <p>{sub}</p>
  </div>
</section>"""

def write(path, html):
    full_path = os.path.join(ROOT, path)
    with open(full_path, "w") as f:
        f.write(html)
    print("wrote", full_path)

def page(title, description, canonical, active, body, extra_inline=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
{head(title, description, canonical)}
</head>
<body>
{TOP}

{nav(active)}

<main>
{body}
</main>

{FOOTER}

{scripts(extra_inline)}
</body>
</html>
"""

print("Partials ready.")

# =========================================================
# HOME PAGE
# =========================================================
home_body = """
<!-- ================= HERO ================= -->
<section class="hero" id="home">
  <canvas id="neuralCanvas"></canvas>
  <div class="hero-blob blob-1"></div>
  <div class="hero-blob blob-2"></div>
  <div class="hero-blob blob-3"></div>

  <div class="hero-content">
    <div class="eyebrow reveal-up"><span class="dot-live"></span> LIVE — New reel drops daily</div>
    <h1 class="hero-title reveal-up" data-delay="1">
      Master <span class="grad-text">AI</span> & Transform<br class="lg-only" />
      Your Digital <span class="grad-text-2">Life</span>
    </h1>
    <p class="hero-sub reveal-up" data-delay="2">
      Daily AI reels, practical tutorials, free tools, and productivity hacks —
      built for creators, students, and teams who want to move faster.
    </p>

    <div class="hero-ctas reveal-up" data-delay="3">
      <a href="reels.html" class="btn btn-primary">
        <i data-lucide="play"></i> Watch Reels
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener" class="btn btn-glass">
        <i class="fa-brands fa-instagram"></i> Visit Instagram
      </a>
      <a href="blog.html" class="btn btn-ghost">
        Read Blogs <i data-lucide="arrow-up-right"></i>
      </a>
    </div>

    <div class="hero-stats reveal-up" data-delay="4">
      <div><strong data-counter="128000">0</strong><span>Followers</span></div>
      <div class="hero-stat-divider"></div>
      <div><strong data-counter="420">0</strong><span>Reels Published</span></div>
      <div class="hero-stat-divider"></div>
      <div><strong data-counter="18500000" data-suffix="+">0</strong><span>Total Views</span></div>
    </div>
  </div>

  <a href="#featured" class="scroll-cue">
    <span>Scroll</span>
    <i data-lucide="chevron-down"></i>
  </a>
</section>

<!-- ================= FEATURED REEL ================= -->
<section class="featured-reel-section" id="featured">
  <div class="container">
    <div class="section-head">
      <span class="section-eyebrow">// Latest Drop</span>
      <h2>Fresh off the feed</h2>
    </div>

    <div class="featured-reel glass-card reveal-up">
      <div class="featured-media">
        <div class="featured-glow-border"></div>
        <img src="https://images.unsplash.com/photo-1655720031554-a929595ffad7?q=80&w=1000&auto=format&fit=crop" alt="Featured reel preview: building an AI automation workflow" />
        <div class="featured-play"><i data-lucide="play"></i></div>
        <span class="badge badge-live">NEW</span>
      </div>
      <div class="featured-info">
        <span class="tag">Automation</span>
        <h3>I built a 0-click content pipeline with AI agents</h3>
        <p>From idea to published post — no manual work. Here's the exact n8n + GPT stack I use to automate my entire content pipeline in under 10 minutes a day.</p>
        <div class="featured-meta">
          <span><i data-lucide="eye"></i> 892K views</span>
          <span><i data-lucide="heart"></i> 74.2K likes</span>
          <span><i data-lucide="calendar"></i> 2 days ago</span>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener" class="btn btn-primary">
          Watch Now <i data-lucide="arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ================= REELS PREVIEW ================= -->
<section class="reels-section">
  <div class="container">
    <div class="section-head">
      <span class="section-eyebrow">// Instagram Feed</span>
      <h2>Reels worth your scroll</h2>
      <p class="section-sub">A quick taste of the daily drops — the full library filters by topic.</p>
    </div>

    <div class="reels-grid preview-grid" id="reelsPreviewGrid"></div>

    <div class="section-foot">
      <a href="reels.html" class="btn btn-glass">View All Reels <i data-lucide="arrow-right"></i></a>
    </div>
  </div>
</section>

<!-- ================= ABOUT TEASER ================= -->
<section class="about-section" id="about">
  <div class="container about-grid">
    <div class="about-media reveal-up">
      <div class="about-photo-frame">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop" alt="Sid, creator of Growing With Sid" />
        <div class="about-glow"></div>
      </div>
      <div class="about-float-card card-1">
        <i data-lucide="sparkles"></i>
        <div><strong>420+</strong><span>Reels shipped</span></div>
      </div>
      <div class="about-float-card card-2">
        <i data-lucide="users"></i>
        <div><strong>128K</strong><span>Community</span></div>
      </div>
    </div>

    <div class="about-content reveal-up">
      <span class="section-eyebrow">// Who's Sid</span>
      <h2>Turning AI complexity into daily clarity.</h2>
      <p>Hi, I'm Sid. I simplify Artificial Intelligence into practical, easy-to-follow content that helps creators, students, professionals, and businesses save time and work smarter.</p>
      <a href="about.html" class="btn btn-ghost">Learn more about Sid <i data-lucide="arrow-up-right"></i></a>

      <div class="about-stats">
        <div class="stat-card"><strong data-counter="128000" data-suffix="+">0</strong><span>Followers</span></div>
        <div class="stat-card"><strong data-counter="420" data-suffix="+">0</strong><span>Total Reels</span></div>
        <div class="stat-card"><strong data-counter="18.5" data-decimal="1" data-suffix="M+">0</strong><span>Total Views</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ================= TOOLS TEASER ================= -->
<section class="tools-section">
  <div class="container">
    <div class="section-head">
      <span class="section-eyebrow">// Stack</span>
      <h2>AI tools I actually use</h2>
      <p class="section-sub">Hand-picked, tested, and reviewed — no random affiliate spam.</p>
    </div>

    <div class="tools-grid" id="toolsPreviewGrid"></div>

    <div class="section-foot">
      <a href="tools.html" class="btn btn-glass">Explore All Tools <i data-lucide="arrow-right"></i></a>
    </div>
  </div>
</section>

<!-- ================= COMMUNITY TEASER ================= -->
<section class="social-proof">
  <div class="container">
    <div class="section-head">
      <span class="section-eyebrow">// Social Proof</span>
      <h2>Trusted by a growing community</h2>
    </div>

    <div class="testimonial-slider">
      <div class="testimonial-track" id="testimonialTrack"></div>
      <div class="testimonial-dots" id="testimonialDots"></div>
    </div>

    <div class="section-foot">
      <a href="community.html" class="btn btn-glass">See the Community <i data-lucide="arrow-right"></i></a>
    </div>
  </div>
</section>

<!-- ================= NEWSLETTER ================= -->
<section class="newsletter-section" id="newsletter">
  <div class="container">
    <div class="newsletter-card glass-card reveal-up">
      <div class="newsletter-glow"></div>
      <span class="section-eyebrow">// Weekly Drop</span>
      <h2>Stay Ahead with AI</h2>
      <p>One email, every week. The best AI tools, prompts, and workflow shortcuts — zero fluff.</p>
      <form class="newsletter-form" id="newsletterForm">
        <input type="email" placeholder="you@email.com" required />
        <button type="submit" class="btn btn-primary">Subscribe <i data-lucide="send"></i></button>
      </form>
      <span class="form-note" id="newsletterNote">Join 24,000+ readers. Unsubscribe anytime.</span>
    </div>
  </div>
</section>
"""

home_inline = """
document.addEventListener('DOMContentLoaded', () => {
  initReelsSection({ gridId: 'reelsPreviewGrid', initialCount: 4 });
  initToolsSection({ gridId: 'toolsPreviewGrid', limit: 3 });
  initTestimonialsSection({ trackId: 'testimonialTrack', dotsId: 'testimonialDots' });
});
"""

write("index.html", page(
    "Growing With Sid — Learn AI. Build Faster. Grow Smarter.",
    "Daily AI reels, practical tutorials, free tools, and productivity hacks.",
    "", "index.html", home_body, home_inline
))

# =========================================================
# REELS PAGE
# =========================================================
reels_body = page_header(
    "// Instagram Feed", "Reels worth your scroll",
    "Bite-sized AI lessons, tool breakdowns and workflow hacks — new drops every day.",
    "Reels"
) + """
<section class="reels-section section-tight">
  <div class="container">
    <div class="filter-bar" id="reelFilters">
      <button class="filter-chip active" data-filter="all">All</button>
      <button class="filter-chip" data-filter="ai-tools">AI Tools</button>
      <button class="filter-chip" data-filter="chatgpt">ChatGPT</button>
      <button class="filter-chip" data-filter="automation">Automation</button>
      <button class="filter-chip" data-filter="productivity">Productivity</button>
      <button class="filter-chip" data-filter="websites">Websites</button>
      <button class="filter-chip" data-filter="tutorials">Tutorials</button>
      <button class="filter-chip" data-filter="tips">Tips &amp; Tricks</button>
    </div>

    <div class="reels-grid" id="reelsGrid"></div>

    <div class="load-more-wrap">
      <button class="btn btn-glass" id="loadMoreReels">Load More Reels <i data-lucide="refresh-cw"></i></button>
    </div>
  </div>
</section>
"""

reels_inline = """
document.addEventListener('DOMContentLoaded', () => {
  initReelsSection({ gridId: 'reelsGrid', filtersId: 'reelFilters', loadMoreId: 'loadMoreReels', initialCount: 6, step: 6 });
});
"""

write("reels.html", page(
    "Reels — Growing With Sid",
    "Daily AI reels covering ChatGPT, automation, productivity, websites and tutorials.",
    "reels.html", "reels.html", reels_body, reels_inline
))

# =========================================================
# BLOG PAGE
# =========================================================
blog_body = page_header(
    "// Field Notes", "AI blogs &amp; deep dives",
    "Longer reads for when a 30-second reel isn't enough.",
    "Blog"
) + """
<section class="blog-section section-tight">
  <div class="container">
    <div class="blog-controls">
      <div class="search-box">
        <i data-lucide="search"></i>
        <input type="text" id="blogSearch" placeholder="Search articles…" />
      </div>
      <div class="filter-bar" id="blogFilters">
        <button class="filter-chip active" data-filter="all">All</button>
        <button class="filter-chip" data-filter="ai-news">AI News</button>
        <button class="filter-chip" data-filter="ai-tools">AI Tools</button>
        <button class="filter-chip" data-filter="tutorials">Tutorials</button>
        <button class="filter-chip" data-filter="productivity">Productivity</button>
        <button class="filter-chip" data-filter="business">Business</button>
        <button class="filter-chip" data-filter="automation">Automation</button>
      </div>
    </div>

    <div class="blog-grid" id="blogGrid"></div>
    <p class="empty-state" id="blogEmpty" hidden>No articles match your search — try a different keyword.</p>
  </div>
</section>
"""

blog_inline = """
document.addEventListener('DOMContentLoaded', () => {
  initBlogSection({ gridId: 'blogGrid', filtersId: 'blogFilters', searchId: 'blogSearch', emptyId: 'blogEmpty' });
});
"""

write("blog.html", page(
    "Blog — Growing With Sid",
    "AI news, tool reviews, tutorials, productivity and automation articles.",
    "blog.html", "blog.html", blog_body, blog_inline
))

# =========================================================
# TOOLS PAGE
# =========================================================
tools_body = page_header(
    "// Stack", "AI tools I actually use",
    "Hand-picked, tested, and reviewed — no random affiliate spam.",
    "AI Tools"
) + """
<section class="tools-section section-tight">
  <div class="container">
    <div class="tools-grid" id="toolsGrid"></div>
  </div>
</section>
"""

tools_inline = """
document.addEventListener('DOMContentLoaded', () => {
  initToolsSection({ gridId: 'toolsGrid' });
});
"""

write("tools.html", page(
    "AI Tools — Growing With Sid",
    "Hand-picked, tested AI tools for prompt engineering, automation, productivity and more.",
    "tools.html", "tools.html", tools_body, tools_inline
))

# =========================================================
# ABOUT PAGE
# =========================================================
about_body = page_header(
    "// Who's Sid", "Turning AI complexity into daily clarity.",
    "The story, the stats, and the mission behind Growing With Sid.",
    "About"
) + """
<section class="about-section section-tight">
  <div class="container about-grid">
    <div class="about-media reveal-up">
      <div class="about-photo-frame">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop" alt="Sid, creator of Growing With Sid" />
        <div class="about-glow"></div>
      </div>
      <div class="about-float-card card-1">
        <i data-lucide="sparkles"></i>
        <div><strong>420+</strong><span>Reels shipped</span></div>
      </div>
      <div class="about-float-card card-2">
        <i data-lucide="users"></i>
        <div><strong>128K</strong><span>Community</span></div>
      </div>
    </div>

    <div class="about-content reveal-up">
      <span class="section-eyebrow">// The Story</span>
      <h2>From personal notes to a daily practice</h2>
      <p>Hi, I'm Sid. I simplify Artificial Intelligence into practical, easy-to-follow content that helps creators, students, professionals, and businesses save time and work smarter.</p>
      <p class="muted">What started as personal notes on ChatGPT prompts turned into a daily practice of testing, breaking, and rebuilding AI workflows — then sharing exactly what works, minus the hype.</p>

      <div class="about-stats">
        <div class="stat-card"><strong data-counter="128000" data-suffix="+">0</strong><span>Instagram Followers</span></div>
        <div class="stat-card"><strong data-counter="420" data-suffix="+">0</strong><span>Total Reels</span></div>
        <div class="stat-card"><strong data-counter="18.5" data-decimal="1" data-suffix="M+">0</strong><span>Total Views</span></div>
        <div class="stat-card"><strong data-counter="96" data-suffix="+">0</strong><span>Blogs Published</span></div>
        <div class="stat-card"><strong data-counter="65" data-suffix="+">0</strong><span>AI Tools Reviewed</span></div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="timeline reveal-up">
      <div class="timeline-item">
        <span class="timeline-year">2023</span>
        <div><h4>First posts</h4><p>Started sharing personal ChatGPT notes and prompt experiments with a small following.</p></div>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2024</span>
        <div><h4>Growing With Sid is born</h4><p>Rebranded around a single mission: make AI practical for everyday work.</p></div>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2025</span>
        <div><h4>100K+ community</h4><p>Crossed six figures in followers and started publishing weekly deep-dive blogs.</p></div>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2026</span>
        <div><h4>Tools, newsletter &amp; beyond</h4><p>Launched the AI tools review series and the weekly "Stay Ahead with AI" newsletter.</p></div>
      </div>
    </div>
  </div>
</section>
"""

write("about.html", page(
    "About Sid — Growing With Sid",
    "Meet Sid — simplifying Artificial Intelligence into practical, easy-to-follow content.",
    "about.html", "about.html", about_body
))

# =========================================================
# COMMUNITY PAGE
# =========================================================
community_body = page_header(
    "// Social Proof", "Trusted by a growing community",
    "Real feedback, real collaborations, and a community that keeps growing.",
    "Community"
) + """
<section class="social-proof section-tight">
  <div class="container">
    <div class="proof-stats reveal-up">
      <div class="proof-stat"><strong data-counter="128000" data-suffix="+">0</strong><span>Community members</span></div>
      <div class="proof-stat"><strong data-counter="42" data-suffix="+">0</strong><span>Brand collaborations</span></div>
      <div class="proof-stat"><strong data-counter="9" data-suffix="+">0</strong><span>Countries reached</span></div>
      <div class="proof-stat"><strong data-counter="97" data-suffix="%">0</strong><span>Positive feedback</span></div>
    </div>

    <div class="testimonial-slider">
      <div class="testimonial-track" id="testimonialTrack"></div>
      <div class="testimonial-dots" id="testimonialDots"></div>
    </div>

    <div class="brands-marquee">
      <div class="marquee-track" id="marqueeTrack"></div>
    </div>

    <div class="section-head">
      <span class="section-eyebrow">// Collaborations</span>
      <h2>Working with creators &amp; brands</h2>
    </div>

    <div class="collab-grid reveal-up">
      <div class="collab-card"><i data-lucide="briefcase"></i><h4>Sponsored Series</h4><p>Multi-part reel series built with SaaS and AI-tool brands.</p></div>
      <div class="collab-card"><i data-lucide="graduation-cap"></i><h4>Workshops</h4><p>Live AI workshops for teams and student communities.</p></div>
      <div class="collab-card"><i data-lucide="mic"></i><h4>Podcast Guesting</h4><p>Conversations on AI, productivity and the creator economy.</p></div>
      <div class="collab-card"><i data-lucide="handshake"></i><h4>Tool Partnerships</h4><p>Honest, tested reviews in exchange for early product access.</p></div>
    </div>
  </div>
</section>
"""

community_inline = """
document.addEventListener('DOMContentLoaded', () => {
  initTestimonialsSection({ trackId: 'testimonialTrack', dotsId: 'testimonialDots' });
  initMarquee('marqueeTrack');
});
"""

write("community.html", page(
    "Community — Growing With Sid",
    "Testimonials, community growth, and brand collaborations from Growing With Sid.",
    "community.html", "community.html", community_body, community_inline
))

# =========================================================
# CONTACT PAGE
# =========================================================
contact_body = page_header(
    "// Get In Touch", "Let's build something with AI",
    "Collabs, sponsorships, or just want to say hi — my inbox is open.",
    "Contact"
) + """
<section class="contact-section section-tight">
  <div class="container">
    <div class="platform-logos reveal-up">
      <a href="https://instagram.com" target="_blank" rel="noopener" class="platform-logo instagram" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
      <a href="https://facebook.com" target="_blank" rel="noopener" class="platform-logo facebook" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="https://youtube.com" target="_blank" rel="noopener" class="platform-logo youtube" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener" class="platform-logo linkedin" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
      <a href="mailto:hello@growingwithsid.com" class="platform-logo email" aria-label="Email"><i data-lucide="mail"></i></a>
    </div>
  </div>

  <div class="container contact-grid">
    <div class="contact-info reveal-up">
      <span class="section-eyebrow">// Direct Lines</span>
      <h2>Reach out however's easiest</h2>
      <p class="muted">Whether it's a collab, a question about a tool, or feedback on a reel — I read everything.</p>

      <div class="contact-links">
        <a href="mailto:hello@growingwithsid.com"><i data-lucide="mail"></i> hello@growingwithsid.com</a>
        <a href="https://instagram.com" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i> @growingwithsid</a>
        <a href="https://youtube.com" target="_blank" rel="noopener"><i class="fa-brands fa-youtube"></i> Growing With Sid</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin-in"></i> /in/growingwithsid</a>
        <a href="https://facebook.com" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i> Growing With Sid</a>
      </div>
    </div>

    <form class="contact-form glass-card reveal-up" id="contactForm">
      <div class="form-row">
        <input type="text" placeholder="Your name" required />
        <input type="email" placeholder="Your email" required />
      </div>
      <input type="text" placeholder="Subject" required />
      <textarea rows="5" placeholder="Tell me a bit about your idea…" required></textarea>
      <button type="submit" class="btn btn-primary">Send Message <i data-lucide="arrow-right"></i></button>
      <span class="form-note" id="contactNote"></span>
    </form>
  </div>
</section>
"""

write("contact.html", page(
    "Contact — Growing With Sid",
    "Get in touch with Sid for collaborations, sponsorships, or questions.",
    "contact.html", "contact.html", contact_body
))

print("All pages generated.")

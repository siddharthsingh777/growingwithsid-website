# Growing With Sid — Full Website (Frontend + Backend)

A multi-page, dark-mode-first personal brand website for an AI/productivity Instagram creator, with a working backend API for content and forms.

## Structure

```
growing-with-sid/
├── frontend/           → the website (plain HTML/CSS/JS, no build step)
│   ├── index.html      → Home
│   ├── reels.html      → All reels, filterable
│   ├── blog.html       → All blog posts, searchable + filterable
│   ├── tools.html      → AI tools directory
│   ├── about.html      → About Sid + timeline
│   ├── community.html  → Testimonials, stats, brand collabs
│   ├── contact.html    → Contact form + platform links
│   ├── privacy.html / terms.html
│   ├── css/style.css
│   └── js/              → config.js, data.js, api.js, common.js, render.js, forms.js
├── backend/            → Express API (reels/blogs/tools/testimonials + newsletter/contact storage)
│   ├── server.js
│   ├── package.json
│   ├── data/*.json     → simple JSON "database"
│   └── README.md       → backend-specific run/test/deploy instructions
└── build_pages.py       → the generator script used to build the frontend pages (optional, dev tool only)
```

The **Reels** link was intentionally removed from the main navigation (per request) — it's still a real page (`reels.html`), reachable from the "Watch Reels" buttons on the homepage and the reels preview section.

Platform logos (Instagram, Facebook, YouTube, LinkedIn) appear as real brand icons (via Font Awesome) in the footer of every page and on the Contact page, each in its brand color on hover.

## Quick start (local)

**1. Start the backend:**
```bash
cd backend
npm install
cp .env.example .env
npm start
```
Runs at `http://localhost:4000`. Full test instructions (curl commands, admin endpoints) are in `backend/README.md`.

**2. Open the frontend:**
Easiest — just double-click `frontend/index.html`.

For the smoothest experience (and for the theme toggle / relative paths to behave exactly like production), serve it instead:
```bash
cd frontend
python3 -m http.server 5500
```
Then visit `http://localhost:5500`.

The site works **with or without the backend running** — if the API isn't reachable, every page automatically falls back to built-in sample content (see `frontend/js/data.js`), and the forms will show an error instead of crashing.

## How to check the backend is working

See `backend/README.md` for the full list, but quickly:
```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/reels
curl -X POST http://localhost:4000/api/newsletter -H "Content-Type: application/json" -d '{"email":"test@example.com"}'
```
Then look inside `backend/data/subscribers.json` — your test submission will be there.

## Deployment

**Frontend** (static site — deploy the `frontend/` folder only):
- Netlify / Vercel: drag-and-drop the `frontend` folder onto their dashboard, or connect your GitHub repo and set the "root directory" to `frontend`.
- GitHub Pages: push `frontend/`'s contents to a repo and enable Pages on the `main` branch.
- Any static host (Cloudflare Pages, S3 + CloudFront, etc.) works the same way.

**Backend** (Node API — deploy the `backend/` folder):
- Render.com is the simplest free option — full step-by-step is in `backend/README.md`.
- Railway.app and Fly.io work almost identically (root directory `backend`, build `npm install`, start `npm start`).
- A VPS works too — just run `npm install && npm start` behind a process manager like `pm2`, and put Nginx in front of it for HTTPS.

**Connect the two:** after the backend is deployed, open `frontend/js/config.js` and change:
```js
const API_BASE_URL = "http://localhost:4000/api";
```
to your live backend URL, e.g.:
```js
const API_BASE_URL = "https://growing-with-sid-api.onrender.com/api";
```
Then redeploy the frontend.

## Customizing content

- **Reels / blogs / tools / testimonials**: edit the JSON files in `backend/data/` (if using the backend) — the frontend fetches live from there. Without a backend, edit the matching arrays in `frontend/js/data.js` instead.
- **Colors / fonts**: CSS variables at the top of `frontend/css/style.css`.
- **Copy**: page headings and body text live directly in each `.html` file (or regenerate via `build_pages.py` if you prefer editing content in Python).
- **Real photos**: swap the Unsplash/randomuser.me placeholder image URLs for your own reel thumbnails, blog images, and profile photo.

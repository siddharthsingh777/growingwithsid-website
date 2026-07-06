# Growing With Sid — Backend API

A small Express API that powers the reels, blog, tools and testimonials content, and stores newsletter signups + contact form messages. Data is stored in plain JSON files in `data/` — no external database needed.

## 1. Run it locally

```bash
cd backend
npm install
cp .env.example .env
npm start
```

You should see:
```
Growing With Sid API running on http://localhost:4000
```

## 2. Check it's working

**In your browser**, visit:
- http://localhost:4000/api/health → `{"status":"ok", ...}`
- http://localhost:4000/api/reels → list of reels
- http://localhost:4000/api/blogs → list of blog posts
- http://localhost:4000/api/tools → list of tools
- http://localhost:4000/api/testimonials → list of testimonials

**With curl**, test the forms:

```bash
# Subscribe to the newsletter
curl -X POST http://localhost:4000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Send a contact message
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Hello","message":"Just testing the form."}'
```

Both should return a `201` status with a success message. You can confirm the data was saved by opening `backend/data/subscribers.json` and `backend/data/messages.json` — your test entries will appear there.

**Admin endpoints** (protected by the `ADMIN_KEY` in your `.env` file):

```bash
curl http://localhost:4000/api/admin/subscribers -H "x-api-key: change-me-super-secret"
curl http://localhost:4000/api/admin/messages -H "x-api-key: change-me-super-secret"
curl http://localhost:4000/api/admin/stats -H "x-api-key: change-me-super-secret"
```

Replace `change-me-super-secret` with whatever you set `ADMIN_KEY` to in `.env`.

## 3. Connect the frontend to it

Open `frontend/js/config.js` and set:

```js
const API_BASE_URL = "http://localhost:4000/api";
```

While the backend is running, open `frontend/index.html` (ideally via a local static server, see the main README) and the site will pull live data from the API and submit real form data. If the backend isn't reachable, the frontend automatically falls back to its built-in sample content, so the site never breaks.

## 4. Deploying the backend

Any Node host works. The easiest free option is **Render**:

1. Push this project to a GitHub repo.
2. On [render.com](https://render.com), click **New → Web Service** and connect the repo.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env.example` (`PORT` is set automatically by Render — you can leave it out; make sure to set `ADMIN_KEY` and `ALLOWED_ORIGINS`).
7. Deploy. Render gives you a URL like `https://growing-with-sid-api.onrender.com`.
8. Update `frontend/js/config.js` with that URL (`https://growing-with-sid-api.onrender.com/api`) and redeploy your frontend.

Railway, Fly.io, or a basic VPS work the same way — install Node, run `npm install`, then `npm start` (use a process manager like `pm2` on a VPS so it stays running).

## Notes

- Data resets if your host wipes the filesystem on redeploy (true of some free tiers). For a production CMS, swap the JSON file reads/writes in `server.js` for a real database (Postgres, MongoDB, etc.) — the route logic stays the same.
- Lock down `ALLOWED_ORIGINS` to your real frontend domain once deployed, instead of `*`.
- Change `ADMIN_KEY` to a long random string before deploying.

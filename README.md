# Growing With Sid — Website

A premium, dark-mode-first personal brand website for an AI/productivity Instagram creator.

## What's inside
- `index.html` — the full one-page site (Hero, Featured Reel, Reels grid + filters, Blog + search, AI Tools, About, Testimonials, Newsletter, Contact, Footer)
- `privacy.html`, `terms.html` — legal pages linked from the footer
- `css/style.css` — all design tokens, layout, glassmorphism, and animations
- `js/script.js` — interactivity: filters, search, counters, testimonial slider, animated neural-network hero background, cursor glow, theme toggle, forms

## How to use it
No build step needed — it's plain HTML/CSS/JS.

1. Unzip the folder.
2. Double-click `index.html` to open it in your browser, **or** for the smoothest experience serve it locally:
   ```bash
   cd growing-with-sid
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.
3. To publish it, drag the folder into Netlify/Vercel drop-deploy, or upload it to any static host (GitHub Pages, Cloudflare Pages, S3, etc).

## Customizing
- **Reels, blog posts, tools, testimonials**: edit the `REELS`, `BLOGS`, `TOOLS`, `TESTIMONIALS`, `BRANDS` arrays near the top of `js/script.js`. Swap in your real Instagram thumbnails, links, and stats.
- **Colors/fonts**: all defined as CSS variables at the top of `css/style.css` (`:root`).
- **Copy**: hero heading/subheading, about text, and section copy live directly in `index.html`.
- **Social + contact links**: update the `href`s in the Contact section and Footer.
- **Newsletter/contact forms**: currently show a success message on submit without sending data anywhere. Connect them to a service like Mailchimp, ConvertKit, Formspree, or your own backend to make them functional.

## Notes
- Images are pulled from Unsplash/randomuser.me placeholder URLs — replace with your real reel thumbnails, blog images, and profile photo.
- Built to be fully responsive (desktop, tablet, mobile) with reduced-motion support for accessibility.

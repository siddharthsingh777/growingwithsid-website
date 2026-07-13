/* Thin fetch wrappers around the backend API.
   Every function falls back to the local sample data (data.js) if the
   backend is unreachable, so the site works with or without it running. */

async function apiGet(path, fallback) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE_URL}${path}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('Bad response');
    return await res.json();
  } catch (err) {
    console.warn(`API unreachable for ${path}, using fallback data.`, err.message);
    return fallback;
  }
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

async function getReels() { return apiGet('/reels', FALLBACK_REELS); }
async function getPosts() { return apiGet('/posts', FALLBACK_POSTS); }
async function getBlogs() { return apiGet('/blogs', FALLBACK_BLOGS); }
async function getTools() { return apiGet('/tools', FALLBACK_TOOLS); }
async function getTestimonials() { return apiGet('/testimonials', FALLBACK_TESTIMONIALS); }
async function subscribeNewsletter(email) { return apiPost('/newsletter', { email }); }
async function sendContactMessage(payload) { return apiPost('/contact', payload); }

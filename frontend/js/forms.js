/* =========================================================
   Newsletter + Contact forms — POST to the backend API
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm){
    const note = document.getElementById('newsletterNote');
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      try {
        const res = await subscribeNewsletter(email);
        setNote(note, res.message || "You're in!", 'success');
        newsletterForm.reset();
      } catch (err) {
        setNote(note, err.message || 'Something went wrong. Please try again.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    const note = document.getElementById('contactNote');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputs = contactForm.querySelectorAll('input, textarea');
      const [nameEl, emailEl, subjectEl, messageEl] = inputs;
      const payload = {
        name: nameEl.value, email: emailEl.value,
        subject: subjectEl.value, message: messageEl.value
      };
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      try {
        const res = await sendContactMessage(payload);
        setNote(note, res.message || 'Message sent!', 'success');
        contactForm.reset();
      } catch (err) {
        setNote(note, err.message || 'Something went wrong. Please try again.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  function setNote(el, text, type){
    if (!el) return;
    el.textContent = text;
    el.classList.remove('error','success');
    el.classList.add(type);
  }
});

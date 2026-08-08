/* =========================================================
   Neha Jangid — landing page behaviour
   ========================================================= */

/* TODO: replace with the inbox that should receive "Ask one question" submissions.
   Leave FORM_ENDPOINT empty to fall back to opening the visitor's mail client. */
const CONTACT_EMAIL = 'hello@example.com';
const FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxx'

/* ---------- Accent colour schemes ----------
   One click on the palette button repaints every accent on the page:
   buttons, gradients, glows, rails, links, chart numbers. The chosen scheme
   sticks across visits. Teal Signal is the brand default. */
const SCHEMES = [
  { name: 'Teal Signal',   h1: 172, h2: 190 },
  { name: 'Aurora Mint',   h1: 158, h2: 178 },
  { name: 'Cyan Wire',     h1: 190, h2: 206 },
  { name: 'Cobalt Rise',   h1: 218, h2: 234 },
  { name: 'Electric Iris', h1: 256, h2: 280 },
  { name: 'Ultraviolet',   h1: 278, h2: 302 },
  { name: 'Magenta Pulse', h1: 320, h2: 340 },
  { name: 'Rose Ember',    h1: 344, h2: 6 },
  { name: 'Coral Flare',   h1: 10,  h2: 28 },
  { name: 'Solar Amber',   h1: 38,  h2: 22 },
  { name: 'Lime Circuit',  h1: 86,  h2: 108 },
  { name: 'Jade Deep',     h1: 148, h2: 168 },
];

const root = document.documentElement;
let currentScheme = SCHEMES[0];

const isLight = () => root.getAttribute('data-theme') === 'light';

/* HSL -> hex, only for the label under the button. */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (n) =>
    Math.round(255 * f(n))
      .toString(16)
      .padStart(2, '0');
  return `#${hex(0)}${hex(8)}${hex(4)}`;
}

function applyScheme(scheme) {
  currentScheme = scheme;
  const light = isLight();
  // Light backgrounds need a deeper accent to stay readable; dark ones need a brighter one.
  const s = light ? 78 : 85;
  const l1 = light ? 38 : 57;
  const l2 = light ? 45 : 65;

  const a1 = `hsl(${scheme.h1} ${s}% ${l1}%)`;
  const a2 = `hsl(${scheme.h2} ${s}% ${l2}%)`;

  root.style.setProperty('--accent', a1);
  root.style.setProperty('--accent-2', a2);
  root.style.setProperty('--grad', `linear-gradient(120deg, ${a1} 0%, ${a2} 100%)`);
  root.style.setProperty('--accent-soft', `hsl(${scheme.h1} ${s}% ${l1}% / ${light ? 0.1 : 0.14})`);
  root.style.setProperty('--accent-line', `hsl(${scheme.h1} ${s}% ${l1}% / 0.34)`);
  root.style.setProperty('--accent-ink', light ? '#ffffff' : `hsl(${scheme.h1} 55% 8%)`);

  return hslToHex(scheme.h1, s, l1);
}

/* ---------- Theme ---------- */
(function initTheme() {
  // Dark is the brand default; visitors can opt into light and it sticks.
  root.setAttribute('data-theme', localStorage.getItem('nj-theme') || 'dark');

  const savedName = localStorage.getItem('nj-scheme');
  const saved = savedName && SCHEMES.find((sc) => sc.name === savedName);
  if (saved) applyScheme(saved);
})();

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = isLight() ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('nj-theme', next);
  // Re-mix the accent for the new background.
  if (localStorage.getItem('nj-scheme')) applyScheme(currentScheme);
});

/* ---------- Accent shuffle button ---------- */
const colorBtn = document.getElementById('colorBtn');
const colorTip = document.getElementById('colorTip');
let tipTimer = null;

colorBtn?.addEventListener('click', () => {
  let next = currentScheme;
  while (next.name === currentScheme.name) {
    next = SCHEMES[Math.floor(Math.random() * SCHEMES.length)];
  }

  const hex = applyScheme(next);
  localStorage.setItem('nj-scheme', next.name);

  colorBtn.classList.remove('spinning');
  void colorBtn.offsetWidth; // restart the animation
  colorBtn.classList.add('spinning');
  setTimeout(() => colorBtn.classList.remove('spinning'), 650);

  if (colorTip) {
    colorTip.innerHTML =
      `<span class="tip-name">${next.name}</span><span class="tip-hex">${hex}</span>`;
    colorTip.classList.add('show');
    clearTimeout(tipTimer);
    tipTimer = setTimeout(() => colorTip.classList.remove('show'), 1800);
  }
});

/* ---------- Sticky nav + back-to-top ---------- */
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');

const onScroll = () => {
  const y = window.scrollY;
  nav?.classList.toggle('stuck', y > 24);
  toTop?.classList.toggle('show', y > 700);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mobileMenu?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

/* ---------- Reveal on scroll ---------- */
const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('in'));
}

/* ---------- Active nav link ---------- */
const sections = ['services', 'process', 'work', 'voices', 'faq']
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll('.nav-link');

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- FAQ: one open at a time ---------- */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) =>
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  })
);

/* ---------- Ask-a-question form ---------- */
const askForm = document.getElementById('askForm');
const formNote = document.getElementById('formNote');
const defaultNote = formNote?.textContent.trim();

const setNote = (text, state) => {
  if (!formNote) return;
  formNote.textContent = text;
  formNote.classList.remove('err', 'ok');
  if (state) formNote.classList.add(state);
};

askForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(askForm).entries());
  const website = (data.website || '').trim();
  const question = (data.question || '').trim();
  const email = (data.email || '').trim();

  if (!website || !question || !email) {
    setNote('Please fill in your website, your question, and your email address.', 'err');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setNote('That email address doesn’t look right — mind checking it?', 'err');
    return;
  }

  const submitBtn = askForm.querySelector('button[type="submit"]');

  if (FORM_ENDPOINT) {
    submitBtn.disabled = true;
    setNote('Sending…');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ website, question, email }),
      });
      if (!res.ok) throw new Error(res.statusText);
      askForm.reset();
      setNote('Thank you — your question is in. I’ll personally reply to ' + email + '.', 'ok');
    } catch (err) {
      setNote('Something went wrong sending that. Please email ' + CONTACT_EMAIL + ' instead.', 'err');
    } finally {
      submitBtn.disabled = false;
    }
    return;
  }

  // No endpoint configured yet — hand off to the visitor's mail client.
  const subject = encodeURIComponent('Organic growth question — ' + website);
  const body = encodeURIComponent(
    `Website: ${website}\nEmail: ${email}\n\nQuestion:\n${question}\n`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  setNote('Opening your email app… if nothing happens, write to ' + CONTACT_EMAIL + '.', 'ok');
});

askForm?.addEventListener('input', () => {
  if (formNote?.classList.contains('err')) setNote(defaultNote);
});

/* ---------- Video testimonials ----------
   Thumbnail facades keep the page light; the YouTube player only loads on click. */
document.querySelectorAll('.video-card').forEach((card) => {
  card.addEventListener('click', () => {
    const id = card.dataset.video;
    if (!id || card.dataset.loaded) return;
    card.dataset.loaded = 'true';
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = 'Video testimonial';
    frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    card.replaceChildren(frame);
  });
});

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

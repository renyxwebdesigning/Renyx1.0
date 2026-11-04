/* Navigation, Reveal, Öffnungsstatus, Kontaktformular (mailto), Karte nach Klick */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const toggle = $('.nav-toggle'), nav = $('#nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
  } else $$('[data-reveal]').forEach(el => el.classList.add('in'));

  // Heutigen Tag markieren und "jetzt geöffnet" aus den Zeiten in der Liste berechnen
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const now = +get('hour') + +get('minute') / 60;
  const ranges = li => [...li.querySelector('b').textContent.matchAll(/(\d{1,2})[:.](\d{2})\s*[–-]\s*(\d{1,2})[:.](\d{2})/g)].map(m => [+m[1] + m[2] / 60, +m[3] + m[4] / 60]);
  let today = null;
  $$('[data-hours] li').forEach(li => { if ((li.dataset.days || '').split(',').map(Number).includes(day)) { li.classList.add('is-today'); today = today || li; } });
  $$('[data-open-now]').forEach(pill => {
    const r = today ? ranges(today) : [];
    const open = r.some(([a, b]) => now >= a && now < b);
    const next = r.find(([a]) => a > now);
    const fmt = h => `${Math.floor(h)}:${String(Math.round(h % 1 * 60)).padStart(2, '0')}`;
    pill.classList.toggle('is-open', open);
    $('span', pill).textContent = open ? `Jetzt erreichbar · bis ${fmt(r.find(([a, b]) => now >= a && now < b)[1])} Uhr`
      : next ? `Heute wieder ab ${fmt(next[0])} Uhr erreichbar` : 'Zurzeit geschlossen – schreiben Sie uns';
    pill.hidden = false;
  });

  // Kontaktformular -> vorbereitete E-Mail
  $$('form[data-mailto]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form), err = $('.form-error', form);
    const ok = f.get('name').trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.get('email').trim()) && f.get('nachricht').trim();
    err.hidden = !!ok;
    if (!ok) return;
    const subject = `Anfrage: ${f.get('anliegen') || 'Allgemein'} – ${f.get('name')}`;
    const lines = [`Name: ${f.get('name')}`];
    if (f.get('firma').trim()) lines.push(`Firma: ${f.get('firma')}`);
    lines.push(`E-Mail: ${f.get('email')}`);
    if (f.get('telefon').trim()) lines.push(`Telefon: ${f.get('telefon')}`);
    lines.push(`Anliegen: ${f.get('anliegen')}`, '', f.get('nachricht'));
    const body = lines.join('\n');
    location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }));

  $$('[data-map-load]').forEach(b => b.addEventListener('click', () => {
    const box = b.closest('[data-map]'), f = document.createElement('iframe');
    f.src = box.dataset.map; f.title = 'Karte'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
    box.innerHTML = ''; box.appendChild(f);
  }));
})();

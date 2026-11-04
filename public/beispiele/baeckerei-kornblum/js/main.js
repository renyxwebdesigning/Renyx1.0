// Bäckerei Kornblum – Header, Menü, Einblenden, Kategorien, «Jetzt geöffnet», Lightbox, Karte nach Klick, Formulare
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  var mobile = window.matchMedia('(max-width: 1040px)');

  // ---------- Header ----------
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile Navigation ----------
  function setMenu(open) {
    if (open) nav.style.setProperty('--nav-top', header.getBoundingClientRect().bottom + 'px');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  mobile.addEventListener('change', function (m) { if (!m.matches) setMenu(false); });

  // ---------- Einblenden beim Scrollen ----------
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Kategorien im Sortiment ----------
  var chipLinks = document.querySelectorAll('.chips-sticky a');
  if (chipLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        chipLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('active', on);
          if (on) { var bar = a.parentNode; bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' }); }
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('.range').forEach(function (s) { spy.observe(s); });
  }

  // ---------- «Jetzt geöffnet» ----------
  // data-hours: "1-5=06:00-19:00;6=…;0=…" – Wochentage (0 = Sonntag) mit Öffnungszeit
  var DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  function parseHours(spec) {
    var week = [[], [], [], [], [], [], []];
    spec.split(';').forEach(function (part) {
      var p = part.split('='), days = p[0].split('-'), t = p[1].split('-');
      var from = +days[0], to = days.length > 1 ? +days[1] : from;
      for (var d = from; d <= to; d++) week[d].push([t[0], t[1]]);
    });
    return week;
  }
  function mins(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function fmt(t) { return t.replace(/^0/, '').replace(':', '.'); }
  function openState(spec) {
    var week = parseHours(spec), now = new Date(), day = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    var today = week[day];
    for (var i = 0; i < today.length; i++) {
      if (m >= mins(today[i][0]) && m < mins(today[i][1])) return { open: true, text: 'Jetzt geöffnet · bis ' + fmt(today[i][1]) + ' Uhr' };
    }
    for (var k = 0; k < 8; k++) {
      var d = (day + k) % 7;
      for (var j = 0; j < week[d].length; j++) {
        if (k === 0 && mins(week[d][j][0]) <= m) continue;
        var when = k === 0 ? 'heute' : k === 1 ? 'morgen' : DAYS[d];
        return { open: false, text: 'Geschlossen · öffnet ' + when + ' um ' + fmt(week[d][j][0]) + ' Uhr' };
      }
    }
    return { open: false, text: 'Geschlossen' };
  }
  function updateOpen() {
    document.querySelectorAll('[data-hours]').forEach(function (el) {
      var s = openState(el.getAttribute('data-hours'));
      el.textContent = s.text;
      el.classList.toggle('is-open', s.open);
    });
  }
  updateOpen();
  setInterval(updateOpen, 60000);

  // ---------- Lightbox ----------
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('figcaption');
  var group = [], index = 0, lastFocus = null;
  function show(i) {
    index = (i + group.length) % group.length;
    var a = group[index];
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.dataset.caption || '';
    lbCap.textContent = (a.dataset.caption || '') + (group.length > 1 ? '  ·  ' + (index + 1) + ' / ' + group.length : '');
    lb.querySelector('.lb-prev').hidden = group.length < 2;
    lb.querySelector('.lb-next').hidden = group.length < 2;
  }
  function openLb(a) {
    var g = a.closest('.gallery');
    group = g ? Array.prototype.slice.call(g.querySelectorAll('.tile')) : [a];
    lastFocus = a;
    show(group.indexOf(a));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function closeLb() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.tile');
    if (a) { e.preventDefault(); openLb(a); }
  });
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!lb.hidden) closeLb();
      else if (nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
    }
    if (lb.hidden) return;
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // ---------- Karte erst nach Klick laden ----------
  document.querySelectorAll('.map').forEach(function (m) {
    var btn = m.querySelector('.map-load');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = m.dataset.src.replace(/&amp;/g, '&');
      f.title = 'Karte: Bäckerei Kornblum, Marktplatz 2, 8997 Kornwil';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      m.replaceChildren(f);
    });
  });

  // ---------- Formulare (öffnen das E-Mail-Programm) ----------
  var LABELS = { name: 'Name', email: 'E-Mail', telefon: 'Telefon', datum: 'Datum', personen: 'Personen', art: 'Lieferung / Abholung', filiale: 'Filiale' };
  document.querySelectorAll('.contact-form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var email = form.dataset.email;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var bad = el.type === 'checkbox' ? !el.checked : !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
        el.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) {
        status.textContent = 'Bitte füllen Sie alle Pflichtfelder korrekt aus.';
        status.classList.add('error');
        var first = form.querySelector('.invalid');
        if (first) first.focus();
        return;
      }
      var lines = [];
      Object.keys(LABELS).forEach(function (n) {
        var el = form.elements[n];
        if (el) lines.push(LABELS[n] + ': ' + (el.value.trim() || '–'));
      });
      lines.push('', form.elements.nachricht.value.trim());
      var name = form.elements.name.value.trim();
      window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(form.dataset.subject + ' – ' + name) + '&body=' + encodeURIComponent(lines.join('\n'));
      status.classList.remove('error');
      status.textContent = 'Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die vorbereitete Nachricht ab. Falls sich nichts öffnet: ' + email;
    });
    form.addEventListener('input', function (e) { e.target.classList.remove('invalid'); });
    form.addEventListener('change', function (e) { e.target.classList.remove('invalid'); });
  });

  // ---------- Jahr im Footer ----------
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

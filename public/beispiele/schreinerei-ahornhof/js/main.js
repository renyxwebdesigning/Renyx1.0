// Schreinerei Ahornhof AG – Header, Menü, Einblenden, Kategorien der Referenzen, Lightbox, Karte nach Klick, Kontaktformular
(function () {
  'use strict';

  var EMAIL = 'info@schreinerei-ahornhof.example';
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  var mobile = window.matchMedia('(max-width: 980px)');

  // ---------- Header ----------
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile Navigation ----------
  function setMenu(open) {
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

  // ---------- Kategorien der Referenzen ----------
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
    document.querySelectorAll('.ref').forEach(function (s) { spy.observe(s); });
  }

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
      f.title = 'Karte: Schreinerei Ahornhof AG, Werkhofstrasse 11, 8998 Birkwil';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      m.replaceChildren(f);
    });
  });

  // ---------- Kontaktformular (öffnet E-Mail-Programm) ----------
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
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
      var v = function (n) { return (form.elements[n].value || '').trim(); };
      var name = v('vorname') + ' ' + v('nachname');
      var body = [
        'Name: ' + name,
        'PLZ / Ort: ' + (v('ort') || '–'),
        'E-Mail: ' + v('email'),
        'Telefon: ' + (v('telefon') || '–'),
        'Thema: ' + v('thema'),
        '',
        v('nachricht')
      ].join('\n');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Anfrage ' + v('thema') + ' – ' + name) + '&body=' + encodeURIComponent(body);
      status.classList.remove('error');
      status.textContent = 'Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die vorbereitete Nachricht ab. Falls sich nichts öffnet: ' + EMAIL;
    });
    form.addEventListener('input', function (e) { if (e.target.classList.contains('invalid')) e.target.classList.remove('invalid'); });
    form.addEventListener('change', function (e) { if (e.target.classList.contains('invalid')) e.target.classList.remove('invalid'); });
  }

  // ---------- Jahr im Footer ----------
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

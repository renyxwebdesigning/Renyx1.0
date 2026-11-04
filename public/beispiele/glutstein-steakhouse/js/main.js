// Glutstein Steakhouse – Header, Menü, Einblenden, Lightbox, Kategorien der Speisekarte, «Jetzt geöffnet»
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  var mobile = window.matchMedia('(max-width: 1080px)');

  // ---------- Header ----------
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 20); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile Navigation ----------
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
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

  // ---------- Kategorien der Speisekarte ----------
  var menuLinks = document.querySelectorAll('.menu-nav a');
  if (menuLinks.length && 'IntersectionObserver' in window) {
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        menuLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + id;
          a.classList.toggle('active', on);
          if (on && a !== current) {
            current = a;
            var bar = a.parentNode;
            bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('.menu-section').forEach(function (s) { spy.observe(s); });
  }

  // ---------- «Jetzt geöffnet» ----------
  // data-hours: "2-6=11:00-23:00;0=…" – Wochentage (0 = Sonntag) mit Öffnungszeit
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
  function openState(spec) {
    var week = parseHours(spec), now = new Date(), day = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    var today = week[day];
    for (var i = 0; i < today.length; i++) {
      if (m >= mins(today[i][0]) && m < mins(today[i][1])) return { open: true, text: 'Jetzt geöffnet · bis ' + today[i][1] + ' Uhr' };
    }
    for (var k = 0; k < 8; k++) {
      var d = (day + k) % 7;
      for (var j = 0; j < week[d].length; j++) {
        if (k === 0 && mins(week[d][j][0]) <= m) continue;
        var when = k === 0 ? 'heute' : k === 1 ? 'morgen' : DAYS[d];
        return { open: false, text: 'Geschlossen · öffnet ' + when + ' um ' + week[d][j][0] + ' Uhr' };
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
    var g = a.closest('.gallery, .gallery-teaser');
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

  // ---------- Jahr im Footer ----------
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

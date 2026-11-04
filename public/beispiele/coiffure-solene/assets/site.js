(function () {
  // Oeffnungszeiten pro Wochentag (0 = Sonntag), Minuten seit Mitternacht
  var HOURS = { 3: [540, 1080], 4: [540, 1080], 5: [540, 1080], 6: [540, 960] };
  var NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function zurichNow() {
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Zurich', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day: day, min: (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10) };
  }
  function clock(m) {
    var h = Math.floor(m / 60), r = m % 60;
    return (h < 10 ? '0' : '') + h + ':' + (r < 10 ? '0' : '') + r;
  }
  function nextOpen(now) {
    for (var i = 1; i <= 7; i++) {
      var d = (now.day + i) % 7;
      if (HOURS[d]) return (i === 1 ? 'morgen' : 'am ' + NAMES[d]) + ' ab ' + clock(HOURS[d][0]);
    }
  }

  try {
    var now = zurichNow();
    document.querySelectorAll('[data-week] [data-day="' + now.day + '"]').forEach(function (li) {
      li.classList.add('today');
      li.setAttribute('aria-current', 'date');
    });
    var el = document.querySelector('[data-now]');
    if (el) {
      var h = HOURS[now.day], text;
      if (h && now.min >= h[0] && now.min < h[1]) text = 'Heute geöffnet bis ' + clock(h[1]) + '.';
      else if (h && now.min < h[0]) text = 'Heute geöffnet ab ' + clock(h[0]) + '.';
      else text = 'Gerade geschlossen, wieder offen ' + nextOpen(now) + '.';
      el.textContent = text;
      el.hidden = false;
    }
  } catch (e) { /* Ohne Statuszeile bleibt die Seite vollstaendig */ }

  // Karte erst nach Klick laden
  var loadBtn = document.querySelector('[data-map-load]');
  if (loadBtn) {
    loadBtn.addEventListener('click', function () {
      var box = loadBtn.closest('[data-map]');
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-map');
      f.title = 'Karte: Lindenstrasse 7, 8996 Seewil';
      f.loading = 'eager';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      box.textContent = '';
      box.classList.add('loaded');
      box.appendChild(f);
    });
  }

  // Formular als vorbereitete E-Mail oeffnen
  var form = document.querySelector('form[data-mail]');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var body = 'Name: ' + v('f-name') + '\nTelefon: ' + v('f-tel') + '\n\n' + v('f-text');
      location.href = 'mailto:' + form.getAttribute('data-mail') +
        '?subject=' + encodeURIComponent('Terminanfrage von ' + v('f-name')) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();

/* Fristen-Tafel: Tage bis zur nächsten Frist mit Zähl-Animation; Unterlagen-Checkliste */
(() => {
  const box = document.querySelector('[data-deadlines]');
  if (box) {
    const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const z = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).split('-').map(Number);
    const today = new Date(Date.UTC(z[0], z[1] - 1, z[2]));
    const DAY = 864e5;
    const d = (y, m, day) => new Date(Date.UTC(y, m, day));
    const addDays = (date, n) => new Date(date.getTime() + n * DAY);
    const fmt = date => `${date.getUTCDate()}. ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
    const y = today.getUTCFullYear();

    // Jede Regel liefert [Beginn der Periode, Frist, Zusatz zum Label]
    const rules = {
      steuer: () => {
        let due = d(y, 2, 31);
        if (due < today) due = d(y + 1, 2, 31);
        return [d(due.getUTCFullYear() - 1, 0, 1), due, `Steuerjahr ${due.getUTCFullYear() - 1}`];
      },
      mwst: () => {
        // Quartalsenden des Vor- und laufenden Jahres, Frist = Quartalsende + 60 Tage
        const ends = [];
        for (const yy of [y - 1, y]) [2, 5, 8, 11].forEach(m => ends.push(d(yy, m + 1, 0)));
        for (const end of ends) {
          const due = addDays(end, 60);
          if (due >= today) return [addDays(end, 1 - 91), due, `Q${Math.floor(end.getUTCMonth() / 3) + 1}/${end.getUTCFullYear()}`];
        }
        const end = d(y, 12, 0); return [d(y, 9, 1), addDays(end, 60), `Q4/${y}`];
      },
      gv: () => {
        let due = d(y, 5, 30);
        if (due < today) due = d(y + 1, 5, 30);
        return [d(due.getUTCFullYear() - 1, 0, 1), due, `Geschäftsjahr ${due.getUTCFullYear() - 1}`];
      }
    };

    box.querySelector('[data-today]').textContent = `Heute: ${fmt(today)}`;
    const items = [...box.querySelectorAll('[data-kind]')].map(el => {
      const [start, due, extra] = rules[el.dataset.kind]();
      const days = Math.round((due - today) / DAY);
      el.querySelector('[data-label]').textContent = `${fmt(due)} (${extra})`;
      el.setAttribute('aria-label', `${el.querySelector('h3').textContent}: noch ${days} Tage bis ${fmt(due)}`);
      el.classList.toggle('is-soon', days <= 30);
      const progress = Math.min(1, Math.max(0, (today - start) / (due - start)));
      return { el, days, progress };
    });
    // Nächste Frist zuerst
    items.sort((a, b) => a.days - b.days).forEach(i => box.insertBefore(i.el, box.querySelector('.dl-note')));
    items[0].el.classList.add('is-next');

    const run = () => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, t0 = performance.now();
      const step = t => {
        const p = reduced ? 1 : Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 4);
        items.forEach(i => {
          i.el.querySelector('[data-days]').textContent = Math.round(i.days * e);
          i.el.querySelector('[data-progress]').style.width = `${i.progress * e * 100}%`;
        });
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    new IntersectionObserver(([en], io) => { if (en.isIntersecting) { run(); io.disconnect(); } }, { threshold: .3 }).observe(box);
  }

  const list = document.querySelector('[data-checklist]');
  if (list) {
    const done = document.querySelector('[data-check-done]'), boxes = [...list.querySelectorAll('input')];
    list.addEventListener('change', () => {
      boxes.forEach(b => b.closest('li').classList.toggle('is-done', b.checked));
      const all = boxes.every(b => b.checked);
      done.hidden = !all;
      list.closest('.stamp-card').classList.toggle('all-done', all);
    });
  }
})();

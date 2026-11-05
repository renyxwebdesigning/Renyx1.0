// Flow: die Linie, die tanzenden Buchstaben und der Stundenplan.
(function () {
  var wurzel = document.documentElement;
  var koerper = document.body;
  var buehne = document.getElementById("buehne");
  var startbild = document.getElementById("startbild");
  var ziel = document.getElementById("ziel");
  var bewegt = wurzel.classList.contains("bewegt");
  var svgNS = "http://www.w3.org/2000/svg";
  var mailBasis = "mailto:hallo@flow-tanz.example?subject=";

  /* ---------- Text in Zeichen teilen, für den Einstieg der Titel ---------- */
  document.querySelectorAll("[data-teilen]").forEach(function (titel) {
    var text = titel.textContent;
    titel.setAttribute("aria-label", text);
    titel.textContent = "";
    var i = 0;
    text.split(" ").forEach(function (wort, n, alle) {
      var w = document.createElement("span");
      w.className = "wort";
      w.setAttribute("aria-hidden", "true");
      wort.split("").forEach(function (z) {
        var s = document.createElement("span");
        s.className = "zeichen";
        s.style.setProperty("--i", i++);
        s.textContent = z;
        w.appendChild(s);
      });
      titel.appendChild(w);
      if (n < alle.length - 1) titel.appendChild(document.createTextNode(" "));
    });
  });

  /* ---------- Das grosse Wort ---------- */
  var wort = document.getElementById("wort");
  var buchstaben = [];
  (function () {
    var text = wort.textContent;
    wort.setAttribute("aria-label", text);
    wort.textContent = "";
    text.split("").forEach(function (z) {
      var s = document.createElement("span");
      s.className = "buchstabe";
      s.setAttribute("aria-hidden", "true");
      s.textContent = z;
      wort.appendChild(s);
      buchstaben.push(s);
    });
  })();

  var maus = { x: -9999, y: -9999, aktiv: false };
  window.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    maus.x = e.clientX;
    maus.y = e.clientY;
    maus.aktiv = true;
  }, { passive: true });

  function wortTanzt(zeit) {
    var r = wort.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    buchstaben.forEach(function (b, i) {
      var welle = Math.sin(zeit / 900 + i * 1.1);
      var wght = 620 + welle * 170;
      var wdth = 90 + welle * 10;
      if (maus.aktiv) {
        var br = b.getBoundingClientRect();
        var d = Math.hypot(maus.x - (br.left + br.width / 2), maus.y - (br.top + br.height / 2));
        var nah = Math.max(0, 1 - d / (r.width * 0.55));
        wght = wght * (1 - nah) + 200 * nah;
        wdth = wdth * (1 - nah) + 75 * nah;
      }
      b.style.fontVariationSettings = '"wght" ' + wght.toFixed(0) + ', "wdth" ' + wdth.toFixed(1);
      b.style.transform = "translateY(" + (welle * -1.4).toFixed(2) + "%)";
    });
  }
  function wortRuht() {
    buchstaben.forEach(function (b) {
      b.style.fontVariationSettings = "";
      b.style.transform = "";
    });
  }

  /* ---------- Die Linie ---------- */
  var svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "linie");
  svg.setAttribute("aria-hidden", "true");
  var pfad = document.createElementNS(svgNS, "path");
  var kopfpunkt = document.createElementNS(svgNS, "circle");
  kopfpunkt.setAttribute("r", "7");
  svg.appendChild(pfad);
  svg.appendChild(kopfpunkt);
  buehne.appendChild(svg);

  var gesamt = 0;
  var tabelle = []; // [{l, maxY}] aufsteigend
  var zaehler = [];
  var aktuell = 0;

  function rel(el) {
    var r = el.getBoundingClientRect();
    var b = buehne.getBoundingClientRect();
    return { l: r.left - b.left, t: r.top - b.top, w: r.width, h: r.height };
  }

  // Position eines Bildpunkts bei object-fit: cover.
  // Gemessen am Rahmen, weil das Bild selbst beim Einstieg noch zoomt.
  function aufBild(img, fx, fy) {
    var r = rel(img.parentElement);
    var s = Math.max(r.w / img.naturalWidth, r.h / img.naturalHeight) || 1;
    var dw = img.naturalWidth * s;
    var dh = img.naturalHeight * s;
    var pos = getComputedStyle(img).objectPosition.split(" ");
    var ox = (r.w - dw) * (parseFloat(pos[0]) / 100);
    var oy = (r.h - dh) * (parseFloat(pos[1]) / 100);
    return [r.l + ox + dw * fx, r.t + oy + dh * fy];
  }

  // Runde Kurve durch alle Punkte.
  function kurve(p) {
    var d = "M" + p[0][0].toFixed(1) + " " + p[0][1].toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var a = p[i - 1] || p[i];
      var b = p[i];
      var c = p[i + 1];
      var e = p[i + 2] || c;
      d += "C" + (b[0] + (c[0] - a[0]) / 6).toFixed(1) + " " + (b[1] + (c[1] - a[1]) / 6).toFixed(1) +
        " " + (c[0] - (e[0] - b[0]) / 6).toFixed(1) + " " + (c[1] - (e[1] - b[1]) / 6).toFixed(1) +
        " " + c[0].toFixed(1) + " " + c[1].toFixed(1);
    }
    return d;
  }

  function aufbauen() {
    var B = buehne.getBoundingClientRect();
    var W = B.width;
    var schmal = W <= 760;
    var rand = W - (schmal ? 10 : Math.min(W * 0.0225, 36));
    var p = [];
    var marken = [];

    // Start: die Fingerspitzen im ersten Bild.
    var hand = aufBild(startbild, 0.204, 0.082);
    var si = rel(startbild.parentElement);
    p.push(hand);
    p.push([si.l + si.w * 0.16, si.t + si.h * 0.42]);
    p.push([si.l + si.w * 0.3, si.t + si.h * 0.8]);
    p.push([si.l + si.w * 0.55, si.t + si.h + 30]);

    // Idee: frei auf der rechten Seite.
    var idee = rel(document.querySelector(".idee"));
    if (schmal) {
      p.push([rand, idee.t + 30], [rand, idee.t + idee.h - 30]);
    } else {
      p.push([W * 0.86, idee.t + idee.h * 0.22], [W * 0.92, idee.t + idee.h * 0.55], [W * 0.84, idee.t + idee.h * 0.92]);
    }

    // Durch jedes Bild eine Schlaufe, immer abwechselnd gedreht.
    var zahl = 1;
    document.querySelectorAll("[data-weg]").forEach(function (el, n) {
      var r = rel(el);
      var cx = r.l + r.w / 2;
      var cy = r.t + r.h / 2;
      var radius = Math.min(r.w, r.h) * (schmal ? 0.2 : 0.24);
      var dreh = n % 2 ? 1 : -1;
      p.push([cx + dreh * radius * 0.2, r.t + r.h * 0.08]);
      for (var k = 0; k < 6; k++) {
        var w = -Math.PI / 2 + dreh * k * Math.PI / 2.4;
        var q = [cx + Math.cos(w) * radius, cy + Math.sin(w) * radius];
        p.push(q);
        if (k % 2 === 1) {
          marken.push({ x: cx + Math.cos(w) * (radius + 22), y: cy + Math.sin(w) * (radius + 22), zahl: zahl });
          zahl = zahl % 8 + 1;
        }
      }
      p.push([cx - dreh * radius * 0.2, r.t + r.h * 0.92]);
      if (schmal) {
        // Am Rand am Text vorbei.
        var naechstes = el.parentElement.nextElementSibling;
        var t = rel(el.parentElement);
        p.push([rand, r.t + r.h + 26], [rand, t.t + t.h - 26]);
        if (!naechstes) p.push([rand, t.t + t.h + 20]);
      } else {
        p.push([W * 0.5, r.t + r.h]);
      }
    });

    // Stundenplan: ganz aussen.
    var plan = rel(document.querySelector(".plan"));
    p.push([rand, plan.t + plan.h * 0.08], [rand, plan.t + plan.h * 0.5], [rand, plan.t + plan.h * 0.96]);

    // Ziel: oben auf den Kreis.
    var z = rel(ziel);
    var zx = z.l + z.w / 2;
    if (schmal) {
      p.push([rand, z.t - z.h * 0.35], [zx + z.w * 0.3, z.t - z.h * 0.16]);
    } else {
      p.push([Math.min(rand, zx + z.w * 0.62), z.t - z.h * 0.55]);
    }
    p.push([zx, z.t]);

    svg.setAttribute("viewBox", "0 0 " + W.toFixed(0) + " " + B.height.toFixed(0));
    pfad.setAttribute("d", kurve(p));
    gesamt = pfad.getTotalLength();
    pfad.style.strokeDasharray = gesamt.toFixed(1);

    // Nachschlagetabelle: wie weit ist die Linie bei welcher Höhe?
    tabelle = [];
    var maxY = -1e9;
    var schritt = 14;
    var proben = [];
    for (var l = 0; l <= gesamt; l += schritt) {
      var punkt = pfad.getPointAtLength(l);
      maxY = Math.max(maxY, punkt.y);
      tabelle.push({ l: l, maxY: maxY });
      proben.push(punkt);
    }

    // Zählzeiten neben den Schlaufen, wie beim Tanzen: 1, 2, 3 ...
    zaehler.forEach(function (z) { z.el.remove(); });
    zaehler = marken.map(function (m) {
      var t = document.createElementNS(svgNS, "text");
      t.setAttribute("x", m.x.toFixed(1));
      t.setAttribute("y", m.y.toFixed(1));
      t.textContent = m.zahl;
      svg.appendChild(t);
      var beste = 0;
      var bestD = Infinity;
      proben.forEach(function (q, i) {
        var d = Math.hypot(q.x - m.x, q.y - m.y);
        if (d < bestD) { bestD = d; beste = i; }
      });
      return { el: t, l: beste * schritt };
    });

    if (!bewegt) zeichnen(gesamt);
  }

  function zeichnen(l) {
    pfad.style.strokeDashoffset = (gesamt - l).toFixed(1);
    var q = pfad.getPointAtLength(l);
    kopfpunkt.setAttribute("cx", q.x.toFixed(1));
    kopfpunkt.setAttribute("cy", q.y.toFixed(1));
    kopfpunkt.style.display = bewegt && l < gesamt - 1 ? "" : "none";
    zaehler.forEach(function (z) { z.el.classList.toggle("an", l >= z.l); });
    ziel.classList.toggle("angekommen", l >= gesamt - 3);
  }

  function zielLaenge() {
    var doc = wurzel.scrollHeight;
    var ende = window.scrollY + window.innerHeight >= doc - 4;
    if (ende) return gesamt;
    var y = window.scrollY + window.innerHeight * 0.62 - (buehne.getBoundingClientRect().top + window.scrollY);
    var lo = 0;
    var hi = tabelle.length - 1;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (tabelle[mid].maxY < y) lo = mid + 1; else hi = mid;
    }
    return tabelle[lo] ? tabelle[lo].l : 0;
  }

  /* ---------- Farbwechsel der ganzen Seite ---------- */
  var farbflaechen = Array.prototype.slice.call(document.querySelectorAll("main [data-farbe]"));
  var farbeJetzt = "";
  function farbe() {
    var mitte = window.innerHeight * 0.5;
    var neu = "tief";
    farbflaechen.forEach(function (f) {
      var r = f.getBoundingClientRect();
      if (r.top <= mitte && r.bottom > mitte) neu = f.dataset.farbe;
    });
    if (neu !== farbeJetzt) {
      koerper.classList.remove("farbe-" + farbeJetzt);
      koerper.classList.add("farbe-" + neu);
      farbeJetzt = neu;
    }
  }

  /* ---------- Parallaxe und Laufband ---------- */
  var bilder = Array.prototype.slice.call(document.querySelectorAll(".reihe-bild img"));
  var band = document.querySelector(".band-lauf");
  var letztesY = window.scrollY;
  var schief = 0;
  function nebeneffekte() {
    var vh = window.innerHeight;
    bilder.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      var teil = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = "translateY(" + (teil * -6).toFixed(2) + "%)";
    });
    var tempo = window.scrollY - letztesY;
    letztesY = window.scrollY;
    schief += (Math.max(-14, Math.min(14, tempo * 0.35)) - schief) * 0.1;
    band.style.setProperty("--schief", schief.toFixed(2) + "deg");
  }

  /* ---------- Der eine Takt für alles ---------- */
  var laeuft = false;
  function takt(zeit) {
    if (!bewegt) { laeuft = false; return; }
    var soll = zielLaenge();
    aktuell += (soll - aktuell) * 0.09;
    if (Math.abs(soll - aktuell) < 0.5) aktuell = soll;
    zeichnen(aktuell);
    wortTanzt(zeit);
    farbe();
    nebeneffekte();
    requestAnimationFrame(takt);
  }
  function starte() {
    if (!laeuft && bewegt) {
      laeuft = true;
      requestAnimationFrame(takt);
    }
  }

  /* ---------- Einstiege ---------- */
  if ("IntersectionObserver" in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          // Bilder sind selbst weggeschnitten, darum wacht ihre Reihe für sie.
          var bild = e.target.classList.contains("reihe") ? e.target.querySelector(".reihe-bild") : e.target;
          bild.classList.add("da");
          beobachter.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".zeigen, .reihe, [data-teilen]").forEach(function (el) {
      beobachter.observe(el);
    });
  } else {
    wurzel.classList.remove("bewegt");
    bewegt = false;
  }

  /* ---------- Stundenplan ---------- */
  var wahl = document.getElementById("wahl");
  document.querySelectorAll(".kurs").forEach(function (knopf) {
    knopf.addEventListener("click", function () {
      var war = knopf.getAttribute("aria-pressed") === "true";
      document.querySelectorAll(".kurs").forEach(function (k) { k.setAttribute("aria-pressed", "false"); });
      wahl.textContent = "";
      if (war) {
        wahl.append("Noch keine Stunde gewählt. ");
        var a = document.createElement("a");
        a.href = "#plan";
        a.textContent = "Zum Stundenplan";
        wahl.append(a);
        ziel.href = mailBasis + encodeURIComponent("Probestunde buchen");
        return;
      }
      knopf.setAttribute("aria-pressed", "true");
      wahl.textContent = "Deine Probestunde: " + knopf.dataset.kurs;
      ziel.href = mailBasis + encodeURIComponent("Probestunde: " + knopf.dataset.kurs);
    });
  });

  /* ---------- Bewegung an und aus ---------- */
  var schalter = document.getElementById("schalter");
  schalter.hidden = false;
  function schalterText() { schalter.textContent = bewegt ? "Bewegung aus" : "Bewegung an"; }
  schalterText();
  schalter.addEventListener("click", function () {
    bewegt = !bewegt;
    wurzel.classList.toggle("bewegt", bewegt);
    try { localStorage.setItem("flow-bewegung", bewegt ? "an" : "aus"); } catch (e) {}
    schalterText();
    if (bewegt) {
      aktuell = zielLaenge();
      starte();
    } else {
      wortRuht();
      bilder.forEach(function (img) { img.style.transform = ""; });
      band.style.removeProperty("--schief");
      koerper.classList.remove("farbe-" + farbeJetzt);
      farbeJetzt = "";
      zeichnen(gesamt);
    }
    aufbauen();
    if (!bewegt) zeichnen(gesamt);
  });

  /* ---------- Los ---------- */
  function neuAufbauen() {
    var anteil = gesamt ? aktuell / gesamt : 0;
    aufbauen();
    aktuell = bewegt ? anteil * gesamt : gesamt;
    zeichnen(aktuell);
  }
  var warte;
  function spaeter() {
    clearTimeout(warte);
    warte = setTimeout(neuAufbauen, 150);
  }
  window.addEventListener("resize", spaeter);
  if ("ResizeObserver" in window) new ResizeObserver(spaeter).observe(buehne);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(spaeter);

  function bereit() {
    aufbauen();
    aktuell = bewegt ? 0 : gesamt;
    zeichnen(aktuell);
    if (bewegt) farbe();
    starte();
  }
  if (startbild.complete && startbild.naturalWidth) bereit();
  else startbild.addEventListener("load", bereit, { once: true });
})();

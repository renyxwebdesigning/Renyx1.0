// Florabunt: sanftes Einblenden und der Strauss-Rechner.
(function () {
  var erlaubt = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (erlaubt && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("da");
          beobachter.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".zeigen, .reihe-bild, .kalender").forEach(function (el) {
      beobachter.observe(el);
    });
  }

  // Die Blume in der Säule wandert beim Scrollen langsam mit.
  var saeulenbild = document.getElementById("saeulenbild");
  if (erlaubt && saeulenbild) {
    var wartet = false;
    window.addEventListener("scroll", function () {
      if (wartet) return;
      wartet = true;
      requestAnimationFrame(function () {
        wartet = false;
        if (window.scrollY < window.innerHeight * 1.2) {
          saeulenbild.style.transform = "translateY(" + (window.scrollY * -0.05).toFixed(1) + "px)";
        }
      });
    }, { passive: true });
  }

  // Reine Vorführung: Es wird nichts gespeichert oder gesendet.
  var form = document.getElementById("binden");
  if (!form) return;
  form.hidden = false;
  var summe = document.getElementById("summe");
  var antwort = document.getElementById("antwort");
  var angezeigt = 55;
  var lauf;

  function gewaehlt(name) {
    return form.querySelector('input[name="' + name + '"]:checked');
  }
  function preis() {
    return Number(gewaehlt("groesse").dataset.preis) + Number(gewaehlt("weg").dataset.preis);
  }
  function zeigen(wert) {
    summe.textContent = "CHF " + wert;
  }
  function zaehlen(ziel) {
    cancelAnimationFrame(lauf);
    if (!erlaubt) { angezeigt = ziel; zeigen(ziel); return; }
    var start = angezeigt;
    var beginn = performance.now();
    (function schritt(jetzt) {
      var t = Math.min(1, (jetzt - beginn) / 450);
      var sanft = 1 - Math.pow(1 - t, 3);
      angezeigt = Math.round(start + (ziel - start) * sanft);
      zeigen(angezeigt);
      if (t < 1) lauf = requestAnimationFrame(schritt);
    })(beginn);
  }

  form.addEventListener("change", function () {
    antwort.textContent = "";
    zaehlen(preis());
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    antwort.textContent = "";
    var b = document.createElement("b");
    b.textContent = gewaehlt("groesse").value + ", " + gewaehlt("stil").value + ", " + gewaehlt("weg").value + ": CHF " + preis() + ".";
    antwort.appendChild(b);
    antwort.appendChild(document.createTextNode(" So würde deine Bestellung aussehen. Dies ist ein Konzeptbeispiel: Es wurde nichts bestellt oder gesendet."));
  });
})();

// mmac Gym: die Rundenuhr. Jede Runde läuft beim Scrollen ab, dann schlägt der Gong.
(function () {
  var ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phasen = Array.prototype.slice.call(document.querySelectorAll("[data-phase]"));
  var anzeige = document.getElementById("anzeige");
  var nameFeld = document.getElementById("anzeige-name");
  var zeitFeld = document.getElementById("anzeige-zeit");
  var balken = document.getElementById("balken");
  var gong = document.getElementById("gong");
  var gongText = document.getElementById("gong-text");
  var hauptteil = document.getElementById("inhalt");
  var geschlagen = {};
  var letzte = -1;
  var wartet = false;

  function format(sek) {
    var s = Math.max(0, Math.ceil(sek));
    var r = s % 60;
    return Math.floor(s / 60) + ":" + (r < 10 ? "0" : "") + r;
  }

  function name(el) {
    if (el.dataset.phase === "runde") return "Runde " + el.dataset.n;
    if (el.dataset.phase === "pause") return "Pause";
    return "Aus";
  }

  function schlagen(text) {
    if (ruhig) return;
    gongText.textContent = text;
    gong.classList.remove("schlaegt");
    hauptteil.classList.remove("wackelt");
    void gong.offsetWidth; // Animation neu starten
    gong.classList.add("schlaegt");
    hauptteil.classList.add("wackelt");
  }
  gong.addEventListener("animationend", function (e) {
    if (e.target === gong) gong.classList.remove("schlaegt");
  });
  hauptteil.addEventListener("animationend", function () {
    hauptteil.classList.remove("wackelt");
  });

  function aktualisieren() {
    wartet = false;
    var linie = window.innerHeight * 0.65;
    var aktiv = -1;
    phasen.forEach(function (el, i) {
      if (el.getBoundingClientRect().top <= linie) aktiv = i;
    });

    anzeige.hidden = aktiv < 0;
    if (aktiv < 0) {
      balken.style.transform = "scaleX(0)";
      letzte = -1;
      return;
    }

    var el = phasen[aktiv];
    var r = el.getBoundingClientRect();
    var teil = Math.min(1, Math.max(0, (linie - r.top) / r.height));
    var sek = Number(el.dataset.sek || 0);
    nameFeld.textContent = name(el);
    zeitFeld.textContent = format(sek * (1 - teil));
    balken.style.transform = "scaleX(" + (el.dataset.phase === "ende" ? 1 : teil).toFixed(3) + ")";

    // Der Gong schlägt nur beim ersten Vorwärtsgehen in eine neue Runde.
    if (aktiv > letzte && !geschlagen[aktiv]) {
      geschlagen[aktiv] = true;
      if (el.dataset.phase === "runde") schlagen("Runde " + el.dataset.n);
      if (el.dataset.phase === "ende") schlagen("Schluss");
    }
    letzte = aktiv;
  }

  function anfordern() {
    if (!wartet) {
      wartet = true;
      requestAnimationFrame(aktualisieren);
    }
  }
  window.addEventListener("scroll", anfordern, { passive: true });
  window.addEventListener("resize", anfordern);
  aktualisieren();
})();

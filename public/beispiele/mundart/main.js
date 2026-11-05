// Sanftes Einblenden: ohne Skript oder bei reduzierter Bewegung bleibt alles sichtbar.
if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("da");
        beobachter.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".zeigen, .reihe-bild").forEach(function (el) {
    beobachter.observe(el);
  });
}

// Buchung: reine Vorführung. Es wird nichts gespeichert oder gesendet.
(function () {
  var form = document.getElementById("buchung");
  if (!form) return;
  form.hidden = false;

  var tagBox = document.getElementById("wahl-tag");
  var zeitBox = document.getElementById("wahl-zeit");
  var hinweis = document.getElementById("hinweis-schmerzen");
  var ergebnis = document.getElementById("ergebnis");
  var alleZeiten = ["07:45", "08:30", "09:15", "10:00", "11:30", "13:45", "14:30", "16:00", "17:15"];
  var wochentag = new Intl.DateTimeFormat("de-CH", { weekday: "long" });
  var datum = new Intl.DateTimeFormat("de-CH", { day: "numeric", month: "long" });

  function option(name, wert, haupt, zusatz) {
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.className = "vh";
    input.type = "radio";
    input.name = name;
    input.value = wert;
    var span = document.createElement("span");
    span.textContent = haupt;
    if (zusatz) {
      var small = document.createElement("small");
      small.textContent = zusatz;
      span.appendChild(small);
    }
    label.appendChild(input);
    label.appendChild(span);
    return label;
  }

  // Die nächsten fünf Arbeitstage ab morgen.
  var tag = new Date();
  var anzahl = 0;
  while (anzahl < 5) {
    tag.setDate(tag.getDate() + 1);
    if (tag.getDay() === 0 || tag.getDay() === 6) continue;
    var name = wochentag.format(tag);
    tagBox.appendChild(option("tag", name + ", " + datum.format(tag), name, datum.format(tag)));
    tagBox.lastChild.firstChild.dataset.index = anzahl;
    anzahl++;
  }

  function zeitenFuer(index) {
    zeitBox.textContent = "";
    alleZeiten.forEach(function (zeit, i) {
      // Beispielhaft belegte Zeiten, je Tag anders.
      if ((i + index * 2) % 3 === 0) return;
      zeitBox.appendChild(option("zeit", zeit, zeit));
    });
  }

  form.addEventListener("change", function (e) {
    ergebnis.textContent = "";
    if (e.target.name === "grund") hinweis.hidden = e.target.value !== "Schmerzen";
    if (e.target.name === "tag") zeitenFuer(Number(e.target.dataset.index));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var fehlt = [];
    if (!d.get("grund")) fehlt.push(["grund", "den Grund"]);
    if (!d.get("tag")) fehlt.push(["tag", "den Tag"]);
    if (!d.get("zeit")) fehlt.push(["zeit", "die Zeit"]);
    if (fehlt.length) {
      var namen = fehlt.map(function (f) { return f[1]; });
      var letzter = namen.pop();
      ergebnis.textContent = "Bitte wählen Sie noch " + (namen.length ? namen.join(", ") + " und " : "") + letzter + ".";
      var erstes = form.querySelector('input[name="' + fehlt[0][0] + '"]') || form.querySelector('input[name="tag"]');
      if (erstes) erstes.focus();
      return;
    }
    ergebnis.textContent = "";
    var b = document.createElement("b");
    b.textContent = d.get("grund") + ", " + d.get("tag") + ", " + d.get("zeit") + " Uhr.";
    ergebnis.appendChild(b);
    ergebnis.appendChild(document.createTextNode(" So würde Ihre Anfrage aussehen. Dies ist ein Konzeptbeispiel: Es wurde nichts gespeichert oder gesendet."));
  });
})();

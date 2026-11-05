// Modellwahl auf der Startseite: zeigt den Text zum gewählten Lautsprecher.
document.querySelectorAll("button.modell").forEach(function (knopf) {
  knopf.addEventListener("click", function () {
    document.querySelectorAll("button.modell").forEach(function (k) {
      k.setAttribute("aria-pressed", String(k === knopf));
    });
    document.querySelectorAll(".boden-text").forEach(function (t) {
      t.hidden = t.dataset.modell !== knopf.dataset.modell;
    });
  });
});

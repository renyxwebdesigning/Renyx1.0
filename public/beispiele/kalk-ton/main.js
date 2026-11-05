// Sanftes Einblenden beim Scrollen. Ohne Skript oder bei reduzierter Bewegung bleibt alles sichtbar.
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
  document.querySelectorAll(".zeigen, .bild-rahmen").forEach(function (el) {
    beobachter.observe(el);
  });
}

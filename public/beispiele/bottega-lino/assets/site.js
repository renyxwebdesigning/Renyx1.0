// Mobiles Menü auf- und zuklappen.
document.documentElement.classList.add("js");
var knopf = document.querySelector(".nav-btn");
var nav = document.getElementById("nav");
if (knopf && nav) {
  knopf.addEventListener("click", function () {
    var offen = nav.classList.toggle("open");
    knopf.setAttribute("aria-expanded", String(offen));
  });
}

import { refreshScrollSpy } from "./utilidades.js";
// Luego de que carge la pagina se actualiza el scrollspy para iluminar en el nav la seccion actual
window.addEventListener("load", function () {
  //everything is fully loaded, don't use me if you can use DOMContentLoaded
  setTimeout(refreshScrollSpy, 500);
});

// Se prepara el carrousel para mostrar los mitos
let items = document.querySelectorAll(".carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 2;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

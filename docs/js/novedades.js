var contenedorNovedades = document.getElementById("contenedorNovedades");
var listadoNovedades;
// Esta es la referencia a la Hoja de Calculo de Google externa que tiene las novedades a mostrar
const hojaNovedades =
  "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/o7d3cgn/public/values?alt=json";

// Si hay novedades guardadas localmente se cargan inmediatamente
listadoNovedades = JSON.parse(localStorage.getItem("listadoNovedades")) || {};
listadoNovedades != {}
  ? colocarListadoNovedares()
  : console.log("Sin novedades guardadas localmente");

// Se obtienen las novedades de -hojaNovedades- guardandolas en -listadoNovedades- y luego colocandolas en el HTML
// obtenerListadoNovedades();
async function obtenerListadoNovedades() {
  await fetchNovedades();
  async function fetchNovedades() {
    const response = await fetch(hojaNovedades);
    let json_novedades = await response.json();
    json_novedades = json_novedades.feed.entry;
    listadoNovedades = { ...json_novedades };
  }
  console.log("Listado de Novedades json:", listadoNovedades);
  colocarListadoNovedares();
  localStorage.setItem("listadoNovedades", JSON.stringify(listadoNovedades));
}
function colocarListadoNovedares() {
  contenedorNovedades.innerHTML = "";
  for (const key in listadoNovedades) {
    if (Object.hasOwnProperty.call(listadoNovedades, key)) {
      const novedad = listadoNovedades[key];
      agregarNovedad(
        novedad.gsx$fecha.$t,
        novedad.gsx$titulo.$t,
        novedad.gsx$contenido.$t,
        novedad.gsx$enlace.$t,
        novedad.gsx$imagen.$t
      );
    }
  }
}
function agregarNovedad(fecha, titulo, contenido, enlace = "#", imagen = "") {
  enlace = enlace != "" ? enlace : "#";
  imagen =
    imagen != ""
      ? imagen
      : "https://via.placeholder.com/300x200/FF7F50/000000?text=...";
  contenedorNovedades.innerHTML += `
  <div class="col-12 col-sm-6 col-md-6 col-lg-4">
    <div class="widget single-news">
      <div class="image">
      <a href="${enlace}" ${!enlace.startsWith("#") ? "target='_blank'" : ""}>
          <img src="${imagen}" class="img-responsive">
          <span class="gradient"></span>
        </a>
      </div>
      <div class="details">
        <div class="title"><a href="${enlace}" target="_blank">${titulo}</a></div>
        <h3>
          <a href="${enlace}"${
    !enlace.startsWith("#") ? "target='_blank'" : ""
  }>${contenido}</a></h3>
        <time><a href="${enlace}" ${
    !enlace.startsWith("#") ? "target='_blank'" : ""
  }>${fecha}</a></time>
      </div>
    </div>
  </div>
  `;
}

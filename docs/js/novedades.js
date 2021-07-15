var contenedorNovedades = document.getElementById("contenedorNovedades");
var listadoNovedades;
// Esta es la referencia a la Hoja de Calculo de Google externa que tiene las novedades a mostrar
const hojaNovedades =
  "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/o7d3cgn/public/values?alt=json";

/* actualizarListadoNovedades(); */
async function actualizarListadoNovedades() {
  await fetchNovedades();
  async function fetchNovedades() {
    const response = await fetch(hojaNovedades);
    let json_novedades = await response.json();
    json_novedades = json_novedades.feed.entry;
    listadoNovedades = { ...json_novedades };
  }
  console.log("Listado de Novedades json:", listadoNovedades);
  for (const key in listadoNovedades) {
    if (Object.hasOwnProperty.call(listadoNovedades, key)) {
      const novedad = listadoNovedades[key];
      agregarNovedad(
        novedad.gsx$fecha.$t,
        novedad.gsx$titulo.$t,
        novedad.gsx$contenido.$t,
        novedad.gsx$enlace.$t
      );
    }
  }
}
function agregarNovedad(fecha, titulo, contenido, enlace) {
  contenedorNovedades.innerHTML += `
  <div class="col-sm-6">
    ${enlace != "" ? "<a href='" + enlace + "' target='_blank'>" : ""}
      <div class="card cajadegradado bg-light mb-3${
        enlace != "" ? " sombra" : ""
      }">
        ${
          fecha != "" || enlace != ""
            ? "<div class='card-header'><h3 class='color otraletra d-flex'>"
            : ""
        }
          ${
            fecha != ""
              ? "<span class='material-icons bd-highlight'>event</span>"
              : ""
          }
          ${
            fecha != ""
              ? "<span class='fecha bd-highlight'>" + fecha + "</span>"
              : ""
          }
          ${
            enlace != ""
              ? "<span class='material-icons ms-auto bd-highlight'>link</span>"
              : ""
          }
          ${fecha != "" || enlace != "" ? "</h3></div>" : ""}
        ${titulo != "" ? "<h2 class='card-title'>" + titulo + "</h2>" : ""}
        ${
          contenido != ""
            ? "<div class='card-body'><p class='card-text otraletra'>" +
              contenido +
              "</p></div>"
            : ""
        }
      </div>
    ${enlace != "" ? "</a>" : ""}
  </div>
  `;
}

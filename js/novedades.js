var contenedorNovedades = document.getElementById("contenedorNovedades");
var listadoNovedades;
// Esta es la referencia a la Hoja de Calculo de Google externa que tiene las novedades a mostrar
const hojaNovedades =
  "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/o7d3cgn/public/values?alt=json";

actualizarListadoNovedades();
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
  let separador = " : ";
  contenedorNovedades.innerHTML += `
  <div class="col-sm-6">
    ${enlace != "" ? "<a href='" + enlace + "' target='_blank'>" : ""}
      <div class="card cajadegradado bg-light mb-3${
        enlace != "" ? " sombra" : ""
      }">
        <div class="card-header">
          <h3 class="color otraletra">
            ${
              fecha != ""
                ? "<span class='material-icons float-left'>event</span>"
                : ""
            }
            ${
              fecha != ""
                ? "<span class='fecha'>" + fecha + separador + "</span>"
                : ""
            }
            <span>${titulo}</span>
            ${
              enlace != ""
                ? "<span class='material-icons float-right'>link</span>"
                : ""
            }
          </h3>
        </div>
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

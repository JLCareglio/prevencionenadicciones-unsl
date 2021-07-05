/* ----------Actualiza listado de eventos para inscripciones---------- */
// Esta es la referencia a la Hoja de Calculo de Google externa que tiene los eventos con sus fechas y horarios
const hojaEventos =
  "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/od6/public/values?alt=json";

/* Otras hojas
const SPREADSHEET = "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/";
const hojaNovedades = SPREADSHEET + "o7d3cgn/public/values?alt=json";
const hojaEncuestas = SPREADSHEET + "o57dwj3/public/values?alt=json";
*/

async function fetchInscripciones() {
  const response = await fetch(hojaEventos);
  let json_eventos = await response.json();
  json_eventos = json_eventos.feed.entry;
  console.log(json_eventos);
}

/* ----------Validar Formulario---------- */
// Variables de todos los inputs a validar
var inputEmail = document.getElementById("emailAddress");
var inputNombre = document.getElementById("7835639");
var inputEvento = document.getElementById("831586866");
// Asignacion de funciones que validan lo ingresado
//inputEmail.addEventListener("focusout", validarEmail);

/* ----------Envio de inscripcion a GoogleForm---------- */
// This script requires jQuery and jquery-form plugin
$("#bootstrapForm").submit(function (event) {
  event.preventDefault();
  var extraData = {};
  $("#bootstrapForm").ajaxSubmit({
    data: extraData,
    dataType: "jsonp", // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
    error: function () {
      // Submit of form should be successful but JSONP callback will fail because Google Forms
      // does not support it, so this is handled as a failure.
      $("#inscripcionEnviadaModal").modal("show");
      // You can also redirect the user to a custom thank-you page:
      // window.location = 'http://www.mydomain.com/thankyoupage.html'
    },
  });
});

/* ----------Imprimir Comprobante---------- */
function imprimirElemento(elemento) {
  var ventana = window.open("", "PRINT");
  ventana.document.write("<html><head><title>" + document.title + "</title>");
  ventana.document.write("</head><body >");
  ventana.document.write(elemento.innerHTML);
  let datosIngresados = document.createElement("div");
  datosIngresados.innerHTML = `
    <p>Email: ${inputEmail.value}</p>
    <p>Nombre: ${inputNombre.value}</p>
    <p>Evento: ${inputEvento.value}</p>
  `;
  ventana.document.write(datosIngresados.innerHTML);
  ventana.document.write("</body></html>");
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();
  return true;
}
document.querySelector("#btnImprimir").addEventListener("click", function () {
  var div = document.querySelector("#comprobanteInscripcion");
  imprimirElemento(div);
});

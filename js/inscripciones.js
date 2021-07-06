// Variables de todos los inputs del formulario de inscripcion
var inputEmail = document.getElementById("emailAddress");
var inputNombre = document.getElementById("7835639");
var inputEvento = bootstrapForm.elements["entry.1134359719"];
var inputComoEnteraste = bootstrapForm.elements["entry.253668503"];
var inputComoEnterasteOtraOpcion =
  bootstrapForm.elements["entry.253668503.other_option_response"];
var inputComentarios = document.getElementById("710177639");

/* ----------Actualiza listado de eventos para inscripciones---------- */
// Esta es la referencia a la Hoja de Calculo de Google externa que tiene los eventos con sus fechas y horarios
const hojaEventos =
  "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/od6/public/values?alt=json";

/* Otras hojas
const SPREADSHEET = "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/";
const hojaNovedades = SPREADSHEET + "o7d3cgn/public/values?alt=json";
const hojaEncuestas = SPREADSHEET + "o57dwj3/public/values?alt=json";
*/

fetchInscripciones();
async function fetchInscripciones() {
  const response = await fetch(hojaEventos);
  let json_eventos = await response.json();
  json_eventos = json_eventos.feed.entry;
  console.log(json_eventos);
}

/* ----------Validar Formulario---------- */
// Asignacion de funciones que validan lo ingresado
//inputEmail.addEventListener("focusout", validarEmail);
inputEmail.addEventListener("focusout", validarEmail);
inputNombre.addEventListener("focusout", validarNombre);
inputComoEnteraste[3].addEventListener("click", validarOtraOpcion);
inputComoEnterasteOtraOpcion.addEventListener("focusout", validarOtraOpcion);
inputComoEnterasteOtraOpcion.addEventListener("focus", function () {
  inputComoEnteraste[3].checked = true;
});

function validarEmail() {
  const exprecionRegular =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (exprecionRegular.test(String(inputEmail.value).toLowerCase())) {
    console.log("email valido");
    return true;
  } else {
    console.log("email invalido");
    return false;
  }
}
function validarNombre() {
  const exprecionRegular = /^[A-Za-z\s]+$/;
  if (exprecionRegular.test(String(inputNombre.value).toLowerCase())) {
    console.log("nombre valido");
    return true;
  } else {
    console.log("nombre invalido");
    return false;
  }
}
function validarOtraOpcion() {
  if (
    inputComoEnteraste.value == "__other_option__" &&
    inputComoEnterasteOtraOpcion.value == ""
  ) {
    console.log("por favor, escribe algo si seleccionas 'otra opción'");
    return false;
  } else {
    console.log("'otra opción' ok");
    return true;
  }
}

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

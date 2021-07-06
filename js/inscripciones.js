var listadoEventos;
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

actualizarListadoEventos();
async function actualizarListadoEventos() {
  await fetchInscripciones();
  async function fetchInscripciones() {
    const response = await fetch(hojaEventos);
    let json_eventos = await response.json();
    json_eventos = json_eventos.feed.entry;
    listadoEventos = { ...json_eventos };
  }
  console.log("Listado de Eventos json:", listadoEventos);
  for (const key in listadoEventos) {
    if (Object.hasOwnProperty.call(listadoEventos, key)) {
      const evento = listadoEventos[key];
      const fechaInicio =
        evento.gsx$inicio.$t != "" ? " ~ " + evento.gsx$inicio.$t : "";
      const fechaFin = evento.gsx$fin.$t != "" ? " ~ " + evento.gsx$fin.$t : "";
      const textoEvento =
        evento.gsx$nombredelevento.$t + fechaInicio + fechaFin;
      inputEvento.innerHTML += `<option value="${textoEvento}">${textoEvento}</option>`;
    }
  }
}

/* ----------Validar Formulario---------- */
// Asignacion de funciones que validan lo ingresado
inputEmail.addEventListener("focusout", validarEmail);
inputNombre.addEventListener("focusout", validarNombre);
for (const radioBtn of inputComoEnteraste) {
  radioBtn.addEventListener("click", validarOtraOpcion);
}
inputComoEnterasteOtraOpcion.addEventListener("focusout", validarOtraOpcion);
inputComoEnterasteOtraOpcion.addEventListener("focus", function () {
  inputComoEnteraste[3].checked = true;
});

function validarEmail() {
  const exprecionRegular =
    /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
  if (exprecionRegular.test(String(inputEmail.value))) {
    console.log("email valido");
    colorearBorder(inputEmail, "#0DFC77");
    return true;
  } else {
    console.log("email invalido");
    colorearBorder(inputEmail, "#FC220D");
    return false;
  }
}
function validarNombre() {
  const exprecionRegular = /^[A-Za-z\s]+$/;
  if (exprecionRegular.test(String(inputNombre.value))) {
    console.log("nombre valido");
    colorearBorder(inputNombre, "#0DFC77");
    return true;
  } else {
    console.log("nombre invalido");
    colorearBorder(inputNombre, "#FC220D");
    return false;
  }
}
function validarOtraOpcion() {
  if (
    inputComoEnteraste.value == "__other_option__" &&
    inputComoEnterasteOtraOpcion.value == ""
  ) {
    console.log("por favor, escribe algo si seleccionas 'otra opción'");
    colorearBorder(inputComoEnterasteOtraOpcion, "#FC220D");
    return false;
  } else {
    console.log("'otra opción' ok");
    colorearBorder(inputComoEnterasteOtraOpcion, "#0DFC77");
    return true;
  }
}
function colorearBorder(idElement, color) {
  idElement.style.border = "2px solid " + color;
}
function comprobarTodosInputs() {
  return validarEmail() && validarNombre() && validarOtraOpcion();
}

/* ----------Envio de inscripcion a GoogleForm---------- */
// This script requires jQuery and jquery-form plugin
$("#bootstrapForm").submit(function (event) {
  event.preventDefault();
  var extraData = {};
  if (comprobarTodosInputs()) {
    document.getElementById("comprobanteInscripcion").innerHTML = `
      <h2>Comprobante de Inscripcion</h2>
      <p>Numero de inscripcion: ${Math.floor(Math.random() * 10000000)}</p>
      <p>Email: ${inputEmail.value}</p>
      <p>Nombre: ${inputNombre.value}</p>
      <p>Inscripto a: ${inputEvento.value}</p>
    `;
    $("#bootstrapForm").ajaxSubmit({
      data: extraData,
      dataType: "jsonp", // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
      error: function () {
        // Submit of form should be successful but JSONP callback will fail because Google Forms
        // does not support it, so this is handled as a failure.
        $("#inscripcionEnviadaModal").modal("show");
        document
          .querySelector("#btnImprimir")
          .addEventListener("click", function () {
            var div = document.querySelector("#comprobanteInscripcion");
            imprimirElemento(div);
          });
      },
    });
  } else {
    alert(
      "Para inscribirte primero corrige todas las entradas marcadas en rojo."
    );
  }
});

/* ----------Imprimir Comprobante---------- */
function imprimirElemento(elemento) {
  var ventana = window.open("", "PRINT");
  ventana.document.write("<html><head><title>" + document.title + "</title>");
  ventana.document.write("</head><body >");
  ventana.document.write(elemento.innerHTML);
  ventana.document.write("</body></html>");
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();
  return true;
}

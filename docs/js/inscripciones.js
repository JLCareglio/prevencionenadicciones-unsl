import { validar, resetInputsStyle } from "./utilidades.js";

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

var listadoEventos;
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
const exRegVacio = /([^\s])/;
const exRegNom = /^[A-Za-z\s]+$/;
const exRegEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
// Asignacion de funciones que validan lo ingresado
inputNombre.addEventListener("focusout", function () {
  validar(exRegNom, inputNombre, failInputNombre);
});
inputEmail.addEventListener("focusout", function () {
  validar(exRegEmail, inputEmail, failInputEmail);
});
inputEvento.addEventListener("change", function () {
  validar(exRegVacio, inputEvento, failInputEvento);
});
for (const radioBtn of inputComoEnteraste) {
  radioBtn.addEventListener("click", validarOtraOpcion);
}
inputComoEnterasteOtraOpcion.addEventListener("focusout", validarOtraOpcion);
inputComoEnterasteOtraOpcion.addEventListener("focus", function () {
  inputComoEnteraste[3].checked = true;
});

function validarOtraOpcion() {
  if (
    inputComoEnteraste.value == "__other_option__" &&
    inputComoEnterasteOtraOpcion.value == ""
  ) {
    inputComoEnterasteOtraOpcion.classList.remove("border-success");
    inputComoEnterasteOtraOpcion.classList.add("border-info");
    return true;
  } else {
    inputComoEnterasteOtraOpcion.classList.remove("border-info");
    inputComoEnterasteOtraOpcion.classList.add("border-success");
    if (inputComoEnteraste.value != "__other_option__") {
      inputComoEnterasteOtraOpcion.classList.remove(
        "border-success",
        "border-info"
      );
    }
    return true;
  }
}

function comprobarTodosInputs() {
  resetInputsStyle(
    [inputNombre, inputEmail, inputEvento, inputComoEnterasteOtraOpcion],
    [failInputNombre, failInputEmail, failInputEvento]
  );
  let r = true;
  r = validar(exRegNom, inputNombre, failInputNombre) ? r : false;
  r = validar(exRegEmail, inputEmail, failInputEmail) ? r : false;
  r = validar(exRegVacio, inputEvento, failInputEvento) ? r : false;
  r = validarOtraOpcion() ? r : false;
  return r;
}
inputComentarios.addEventListener("keyup", function () {
  inputComentariosCount.innerText = inputComentarios.value.length;
  inputComentariosCount.style.height = "1px";
  inputComentariosCount.style.height =
    28 + inputComentariosCount.scrollHeight + "px";
});

/* ----------Envio de inscripcion a GoogleForm---------- */
// This script requires jQuery and jquery-form plugin
$("#bootstrapForm").submit(function (event) {
  event.preventDefault();
  var extraData = {};
  if (comprobarTodosInputs()) {
    document.getElementById("btnSubmit").disabled = true;
    document.getElementById("comprobanteInscripcion").innerHTML = `
      <h2 class="color">Comprobante de Inscripcion</h2>
      <p>Nombre: <span class="otraletra">${inputNombre.value}</span></p>
      <p>Email: <span class="otraletra">${inputEmail.value}</span></p>
      <p>Inscripto a: <span class="otraletra">${inputEvento.value}</span></p>
      <p>Numero de inscripcion: <span class="otraletra">${Math.floor(
        Math.random() * 10000000
      )}</span></p>
    `;
    $("#bootstrapForm").ajaxSubmit({
      data: extraData,
      dataType: "jsonp", // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
      error: function () {
        // Submit of form should be successful but JSONP callback will fail because Google Forms
        // does not support it, so this is handled as a failure.
        $("#inscripcionEnviadaModal").modal("show");
      },
    });
  }
});
$("#inscripcionEnviadaModal").on("hidden.bs.modal", function () {
  resetInputsStyle(
    [inputNombre, inputEmail, inputEvento, inputComoEnterasteOtraOpcion],
    [failInputNombre, failInputEmail, failInputEvento]
  );
  inputComentariosCount.innerText = "0";
  bootstrapForm.reset();
  document.getElementById("btnSubmit").disabled = false;
});
/* ----------Generar Comprobante---------- */
document.querySelector("#btnImprimir").addEventListener("click", function () {
  var imprimir = document.querySelector("#comprobanteInscripcion");
  if (screen.width < 1024) {
    document.getElementById("viewport").setAttribute("content", "width=1200px");
  }
  html2canvas(imprimir)
    .then((canvas) => {
      document.body.appendChild(canvas);
      canvas.style.display = "none";
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", "ComprobanteDeInscripcion.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
  if (screen.width < 1024) {
    document
      .getElementById("viewport")
      .setAttribute("content", "width=device-width, initial-scale=1");
  }
});

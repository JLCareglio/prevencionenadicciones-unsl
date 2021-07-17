import { validar } from "./utilidades.js";
// Variables de todos los inputs del formulario de contacto
var inputNombre = document.getElementById("2005620554");
var inputTel = document.getElementById("1166974658");
var inputEmail = document.getElementById("1045781291");
var inputMensaje = document.getElementById("839337160");

/* ----------Validar Formulario---------- */
const exRegVacio = /([^\s])/;
const exRegNom = /^[A-Za-z\s]+$/;
const exRegEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
const exRegTel =
  /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
// Asignacion de funciones que validan lo ingresado
inputNombre.addEventListener("focusout", function () {
  validar(exRegNom, inputNombre, failInputNombre);
});
inputTel.addEventListener("focusout", comprobarTelYEmail);
inputEmail.addEventListener("focusout", comprobarTelYEmail);
inputMensaje.addEventListener("focusout", function () {
  validar(exRegVacio, inputMensaje, failInputMensaje);
});
function resetInputsStyle() {
  inputNombre.classList.remove(
    "border-success",
    "border-danger",
    "is-valid",
    "is-invalid"
  );
  inputTel.classList.remove(
    "border-success",
    "border-danger",
    "border-info",
    "is-valid",
    "is-invalid"
  );
  inputEmail.classList.remove(
    "border-success",
    "border-danger",
    "border-info",
    "is-valid",
    "is-invalid"
  );
  inputMensaje.classList.remove(
    "border-success",
    "border-danger",
    "is-valid",
    "is-invalid"
  );
  failInputNombre.style.display = "none";
  failInputTel.style.display = "none";
  failInputTel2.style.display = "none";
  failInputEmail.style.display = "none";
  failInputEmail2.style.display = "none";
  failInputMensaje.style.display = "none";
}
function comprobarTelYEmail() {
  let r = true;
  inputTel.classList.remove(
    "border-success",
    "border-danger",
    "border-info",
    "is-valid",
    "is-invalid"
  );
  inputEmail.classList.remove(
    "border-success",
    "border-danger",
    "border-info",
    "is-valid",
    "is-invalid"
  );
  if (inputTel.value == "" && inputEmail.value == "") {
    failInputTel2.style.display = "none";
    failInputEmail2.style.display = "none";
    r = validar(exRegTel, inputTel, failInputTel) ? r : false;
    r = validar(exRegEmail, inputEmail, failInputEmail) ? r : false;
  } else {
    failInputTel.style.display = "none";
    failInputEmail.style.display = "none";
    if (inputTel.value != "") {
      r = validar(exRegTel, inputTel, failInputTel2) ? r : false;
    }
    if (inputEmail.value != "") {
      r = validar(exRegEmail, inputEmail, failInputEmail2) ? r : false;
    }
  }
  return r;
}
function comprobarTodosInputs() {
  let r = true;
  resetInputsStyle();
  r = validar(exRegNom, inputNombre, failInputNombre) ? r : false;
  r = comprobarTelYEmail() ? r : false;
  r = validar(exRegVacio, inputMensaje, failInputMensaje) ? r : false;
  return r;
}
inputMensaje.addEventListener("keyup", function () {
  inputMensajeCount.innerText = inputMensaje.value.length;
});
/* ----------Envio de consulta a GoogleForm---------- */
// This script requires jQuery and jquery-form plugin
$("#bootstrapForm").submit(function (event) {
  event.preventDefault();
  var extraData = {};
  if (comprobarTodosInputs()) {
    document.getElementById("btnSubmit").disabled = true;
    $("#bootstrapForm").ajaxSubmit({
      data: extraData,
      dataType: "jsonp", // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
      error: function () {
        // Submit of form should be successful but JSONP callback will fail because Google Forms
        // does not support it, so this is handled as a failure.
        $("#contactoEnviadoModal").modal("show");
      },
    });
  }
});
$("#contactoEnviadoModal").on("hidden.bs.modal", function () {
  resetInputsStyle();
  inputMensajeCount.innerText = "0";
  bootstrapForm.reset();
  document.getElementById("btnSubmit").disabled = false;
});

// Variables de todos los inputs del formulario de contacto
var inputNombre = document.getElementById("2005620554");
var inputTel = document.getElementById("1166974658");
var inputEmail = document.getElementById("1045781291");
var inputMensaje = document.getElementById("839337160");

/* ----------Validar Formulario---------- */
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
function comprobarTodosInputs() {
  let r = true;
  resetInputsStyle();
  if (inputNombre.value == "") {
    inputNombre.classList.add("border-danger", "is-invalid");
    failInputNombre.style.display = "inline";
    r = false;
  } else {
    inputNombre.classList.add("border-success", "is-valid");
  }
  if (inputEmail.value == "" && inputTel.value == "") {
    inputEmail.classList.add("border-info");
    inputTel.classList.add("border-info");
    failInputEmail.style.display = "inline";
    failInputTel.style.display = "inline";
    r = false;
  }
  if (inputEmail.value != "") {
    const exprecionRegular =
      /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
    if (exprecionRegular.test(String(inputEmail.value))) {
      inputEmail.classList.add("border-success", "is-valid");
    } else {
      inputEmail.classList.add("border-danger", "is-invalid");
      failInputEmail2.style.display = "inline";
      r = false;
    }
  }
  if (inputTel.value != "") {
    const exprecionRegular =
      /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
    if (exprecionRegular.test(String(inputTel.value))) {
      inputTel.classList.add("border-success", "is-valid");
    } else {
      inputTel.classList.add("border-danger", "is-invalid");
      failInputTel2.style.display = "inline";
      r = false;
    }
  }
  if (inputMensaje.value == "") {
    inputMensaje.classList.add("border-danger", "is-invalid");
    failInputMensaje.style.display = "inline";
    r = false;
  } else {
    inputMensaje.classList.add("border-success", "is-valid");
  }
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
document.getElementById("btnCerrar").addEventListener("click", function () {
  resetInputsStyle();
  bootstrapForm.reset();
});

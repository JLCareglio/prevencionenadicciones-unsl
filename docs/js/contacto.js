// Variables de todos los inputs del formulario de contacto
var inputNombre = document.getElementById("2005620554");
var inputTel = document.getElementById("1166974658");
var inputEmail = document.getElementById("1045781291");
var inputMensaje = document.getElementById("839337160");

/* ----------Validar Formulario---------- */
function colorearBorder(idElement, color) {
  idElement.style.border = "2px solid " + color;
}
function comprobarTodosInputs() {
  let r = true;
  if (inputNombre.value == "") {
    colorearBorder(inputNombre, "#FC220D");
    failInputNombre.style.display = "inline";
    r = false;
  } else {
    colorearBorder(inputNombre, "#0DFC77");
    failInputNombre.style.display = "none";
  }
  if (inputEmail.value == "" && inputTel.value == "") {
    colorearBorder(inputEmail, "#00FAFC");
    colorearBorder(inputTel, "#00FAFC");
    failInputEmail.innerText = "Se necesita este dato o un Telefono.";
    failInputEmail.style.display = "inline";
    failInputTel.innerText = "Se necesita este dato o un Email.";
    failInputTel.style.display = "inline";
    r = false;
  } else {
    colorearBorder(inputEmail, "#ced4da");
    colorearBorder(inputTel, "#ced4da");
    failInputEmail.style.display = "none";
    failInputTel.style.display = "none";
  }
  if (inputEmail.value != "") {
    const exprecionRegular =
      /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
    if (exprecionRegular.test(String(inputEmail.value))) {
      colorearBorder(inputEmail, "#0DFC77");
      failInputEmail.style.display = "none";
    } else {
      colorearBorder(inputEmail, "#FC220D");
      failInputEmail.innerText = "Ingresa un email valido.";
      failInputEmail.style.display = "inline";
      r = false;
    }
  }
  if (inputTel.value != "") {
    const exprecionRegular =
      /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
    if (exprecionRegular.test(String(inputTel.value))) {
      colorearBorder(inputTel, "#0DFC77");
      failInputTel.style.display = "none";
    } else {
      colorearBorder(inputTel, "#FC220D");
      failInputTel.innerText = "Ingresa un telefono valido.";
      failInputTel.style.display = "inline";
      r = false;
    }
  }
  return r;
}
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
        document
          .querySelector("#btnCerrar")
          .addEventListener("click", resetForm);
      },
    });
  }
});
function resetForm() {
  bootstrapForm.reset();
}

var fnombre = document.getElementById("fnombre");
var fmail = document.getElementById("fmail");
var fmensaje = document.getElementById("fmensaje");

document.getElementById("fboton").addEventListener("click", validar);
fnombre.addEventListener("focus", function () {
  colorearBorder(fnombre, "black");
});
fmail.addEventListener("focus", function () {
  colorearBorder(fmail, "black");
});
fmensaje.addEventListener("focus", function () {
  colorearBorder(fmensaje, "black");
});

function validarnom(name) {
  const exprecionRegular = /^[A-Za-z\s]+$/;
  if (exprecionRegular.test(String(name))) {
    console.log("nombre valido");
    colorearBorder(fnombre, "#0DFC77");
    return true;
  } else {
    console.log("nombre invalido");
    colorearBorder(fnombre, "#FC220D");
    return false;
  }
}
function valmail(ema) {
  const exprecionRegular =
    /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
  if (exprecionRegular.test(String(ema))) {
    console.log("email valido");
    colorearBorder(fmail, "#0DFC77");
    return true;
  } else {
    console.log("email invalido");
    colorearBorder(fmail, "#FC220D");
    return false;
  }
}
function colorearBorder(idElement, color) {
  idElement.style.border = "2px solid " + color;
}
function validar() {
  var control = 0;
  var name = document.f1.nombre.value;
  var ema = document.f1.mail.value;
  var msg = document.f1.mensaje.value;

  if (name == "" || !validarnom(name)) {
    colorearBorder(fnombre, "#FC220D");
    control = 1;
  } else {
    colorearBorder(fnombre, "#0DFC77");
  }

  if (ema == "" || !valmail(ema)) {
    colorearBorder(fmail, "#FC220D");
    control = 1;
  } else {
    colorearBorder(fmail, "#0DFC77");
  }

  if (msg == "") {
    colorearBorder(fmensaje, "#FC220D");
    console.log("no dejo ningun mensaje");
    control = 1;
  } else {
    colorearBorder(fmensaje, "#0DFC77");
  }
  if (control == 0) {
    document.getElementById("fcont").submit();
  } else {
    return;
  }
}

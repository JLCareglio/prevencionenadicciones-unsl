/* 
const exRegVacio = /([^\s])/;
const exRegNom = /^[A-Za-z\s]+$/;
const exRegEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
const exRegTel = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
*/
export function validar(expReg, inputObj, failObj) {
  inputObj.classList.remove(
    "border-success",
    "border-danger",
    "border-info",
    "is-valid",
    "is-invalid"
  );
  failObj.style.display = "none";

  if (expReg.test(String(inputObj.value))) {
    inputObj.classList.add("border-success", "is-valid");
    refreshScrollSpy;
    return true;
  } else {
    if (failObj.classList.contains("bg-danger")) {
      inputObj.classList.add("border-danger", "is-invalid");
      refreshScrollSpy;
    } else {
      inputObj.classList.add("border-info");
    }
    failObj.style.display = "inline";
    refreshScrollSpy;
    return false;
  }
}

export function resetInputsStyle(listInputs, listFails) {
  listInputs.forEach((input) => {
    input.classList.remove(
      "border-success",
      "border-danger",
      "border-info",
      "is-valid",
      "is-invalid"
    );
  });
  listFails.forEach((fail) => {
    fail.style.display = "none";
  });
  refreshScrollSpy;
}

export function refreshScrollSpy() {
  const savedPosY =
    window.pageXOffset !== undefined
      ? window.pageYOffset
      : document.documentElement.scrollTop;
  window.scrollTo(0, 0);
  $('[data-bs-spy="scroll"]').each(function () {
    $(this).scrollspy("refresh");
  });
  window.scrollTo(0, savedPosY);
}

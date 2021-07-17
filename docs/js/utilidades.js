/* 
const exRegVacio = /([^\s])/;
const exRegNom = /^[A-Za-z\s]+$/;
const exRegEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
const exRegTel = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
*/
export function validar(expReg, inputObj, failObj) {
  console.log("llamada a validador para: ", inputObj);
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
    return true;
  } else {
    if (failObj.classList.contains("bg-danger")) {
      inputObj.classList.add("border-danger", "is-invalid");
    } else {
      inputObj.classList.add("border-info");
    }
    failObj.style.display = "inline";
    return false;
  }
}

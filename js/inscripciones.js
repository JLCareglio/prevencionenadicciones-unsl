// Esta es la referencia a la Hoja de Calculo de Google externa
const hojaInscripciones =
  "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/od6/public/values?alt=json";

/* Otras hojas
const SPREADSHEET = "https://spreadsheets.google.com/feeds/list/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/";
const hojaNovedades = SPREADSHEET + "o7d3cgn/public/values?alt=json";
const hojaEncuestas = SPREADSHEET + "o57dwj3/public/values?alt=json";
*/

/* fetchInscripciones(); */
fetchInscripciones();
async function fetchInscripciones() {
  const response = await fetch(hojaInscripciones);
  let json_inscipciones = await response.json();
  json_inscipciones = json_inscipciones.feed.entry;
  embeberGform(json_inscipciones[0].gsx$googleform.$t);
}
function embeberGform(url = window.location.href.split("gForm=")[1]) {
  let noGForm = document.getElementById("noGForm");
  if (url != undefined) {
    noGForm.style.display = "none";
    const urlEmbebed = url.split("/viewform?")[0] + "/viewform?embedded=true";
    const urlNormal = url.split("/viewform?")[0] + "/viewform?usp=sf_link";
    let gForm = document.getElementById("gForm");
    let linkGForm = document.getElementById("linkGForm");
    url = url.split("/viewform?")[0] + "/viewform?embedded=true";
    gForm.style.display = "inline";
    gForm.src = urlEmbebed;
    // linkGForm.href = urlNormal;
    // linkGForm.innerHTML = urlNormal;
  } else {
    noGForm.style.display = "inline";
  }
}

/* ----------Seccion para validaciones---------- */
// Extraer los id de inputs usndo la variable
// FB_PUBLIC_LOAD_DATA_ de Google

// Variables de todos los inputs a validar
var inputEmail = document.getElementById("email");

// Asignacion de funciones que validan lo ingresado
inputEmail.addEventListener("focusout", validarEmail);

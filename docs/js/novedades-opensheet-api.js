var contenedorNovedades = document.getElementById("contenedorNovedades");
var listadoNovedades;
var imgNovedad = [];
// Esta es la referencia a la Hoja de Calculo de Google externa que tiene las novedades a mostrar
const hojaNovedades =
  "https://opensheet.vercel.app/1TUAdPdrHf1lWyYhQe_xm7o9BET8Pi7bioyMAm1zuFVo/%F0%9F%93%B0%20Novedades";

// Si hay novedades guardadas localmente se cargan inmediatamente
listadoNovedades = JSON.parse(localStorage.getItem("listadoNovedades")) || [];
listadoNovedades != []
  ? colocarListadoNovedares()
  : console.log("Sin novedades guardadas localmente");

// Se obtienen las novedades de -hojaNovedades- guardandolas en -listadoNovedades- para luego colocarlas en el HTML dentro de contenedorNovedades
obtenerListadoNovedades();
async function obtenerListadoNovedades() {
  let listadoNovedadesN;
  await fetchNovedades();
  async function fetchNovedades() {
    const response = await fetch(hojaNovedades);
    let json_novedades = await response.json();
    listadoNovedadesN = { ...json_novedades };
    listadoNovedadesN = Object.values(listadoNovedadesN).reverse();
    listadoNovedadesN.forEach((lNovN) => {
      ["id", "updated", "category", "title", "content", "link"].forEach(
        (e) => delete lNovN[e]
      );
    });
  }
  console.log(listadoNovedadesN);
  if (JSON.stringify(listadoNovedadesN) == JSON.stringify(listadoNovedades)) {
    console.log("sin novedades nuevas");
  } else {
    listadoNovedades = listadoNovedadesN;
    console.log("hay novedades nuevas, actualizando...");
    colocarListadoNovedares();
    localStorage.listadoNovedades = JSON.stringify(listadoNovedades);
  }
}
function colocarListadoNovedares() {
  contenedorNovedades.innerHTML = "";
  let id = 0;
  for (const key in listadoNovedades) {
    if (Object.hasOwnProperty.call(listadoNovedades, key)) {
      const novedad = listadoNovedades[key];
      agregarNovedad(
        id,
        novedad.Fecha,
        novedad.Titulo,
        novedad.Contenido,
        novedad.Enlace,
        "img/placeholder_300x200_0288ad.webp"
      );
      if (listadoNovedades[id].Imagen != "") {
        const idClon = id;
        imgNovedad[idClon] = new Image();
        imgNovedad[idClon].addEventListener("load", function () {
          document.getElementById("img" + idClon).src = imgNovedad[idClon].src;
        });
        imgNovedad[idClon].src = novedad.Imagen;
      }
      id += 1;
    }
  }
}

function agregarNovedad(id, fecha, titulo, contenido, enlace = "#", imagen) {
  enlace = enlace != "" ? enlace : "#";
  if (imagen.includes("drive.google.com/file/d/")) {
    // Si la imagen esta subida a google drive se le extrae su id y se prepara una url para web
    imagen =
      "https://drive.google.com/uc?export=view&id=" +
      imagen.split("/file/d/")[1].split("/")[0];
  }
  contenedorNovedades.innerHTML += `
  <div id="${"novedad" + id}" class="col-12 col-sm-6 col-md-6 col-lg-4">
    <div class="widget single-news">
      <div class="image">
        <a id="${"enlace" + id}
        href="${enlace}" ${!enlace.startsWith("#") ? "target='_blank'" : ""}>
          <img id="${"img" + id}" src="${imagen}" class="img-responsive">
          <span class="gradient"></span>
        </a>
      </div>
      <div class="details">
        <div class="title">
          <a id="${"titulo" + id} href="${enlace}" target="_blank">
            ${titulo}
          </a>
        </div>
        <h3>
          <a id="${"contenido" + id}
          href="${enlace}"${!enlace.startsWith("#") ? "target='_blank'" : ""}>
            ${contenido}
          </a>
        </h3>
        <time>
          <a id="${"fecha" + id}
          href="${enlace}" ${!enlace.startsWith("#") ? "target='_blank'" : ""}>
            ${fecha}
          </a>
        </time>
      </div>
    </div>
  </div>
  `;
}

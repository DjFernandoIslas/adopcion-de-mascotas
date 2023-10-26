const perroActualElement = document.getElementById("perroActual");//constante para la ID imagen del html
const spinner = document.getElementById("spinner");//este seria para la constante del cargador de imagen
const perrosLikeContainer = document.getElementById("perrosLikeContainer");
const perrosDislikeContainer = document.getElementById("perrosDislikeContainer");
perrosLikeContainer.classList.toggle("escondido");
perrosDislikeContainer.classList.toggle("escondido");

let perroActual;

document.getElementById("like").addEventListener("click", () => {
  rankearPerro("+");
});
document.getElementById("dislike").addEventListener("click", () => {
  rankearPerro("-");
});
//evento para cargar nueva imagen al hacer click en pasar imagen
document.getElementById("saltear").addEventListener("click", nuevoPerro); 
perroActualElement.addEventListener("load", () => {
  spinner.classList.toggle("escondido", true);
  perroActualElement.classList.toggle("escondido", false);
});
//FUNCION PARA EL VOTO DE LA IMAGEN DEL PERRO 
function rankearPerro(ranking) {
  const nuevaImagen = document.createElement("img");
  nuevaImagen.src = perroActual;
  if (ranking === "+") {
    perrosLikeContainer.appendChild(nuevaImagen);
    perrosLikeContainer.classList.toggle("escondido",false)
  } else {
    perrosDislikeContainer.appendChild(nuevaImagen);
    perrosDislikeContainer.classList.toggle("escondido",false)
  }
  nuevoPerro();
}
// creamos una funcion asyncronica donde consultamos la API y recibimos la respuesta
// de la API y al recibir la respuesta convierta la respuesta de texto a un JSON 
// tambien utilizamos el await mientras el server piensa, el resto se va cargando.
//
async function nuevoPerro() {
  perroActualElement.classList.toggle("escondido", true);
  spinner.classList.toggle("escondido", false);
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const jsonRes = await res.json();
  if (jsonRes.status === "success") {
    perroActual = jsonRes.message;
    perroActualElement.src = perroActual;
  } else {
    nuevoPerro();
  }
}

//Ejecución de la funcion nuevoPerro cada vez ke se cargue o actualiza la pagina 
nuevoPerro();
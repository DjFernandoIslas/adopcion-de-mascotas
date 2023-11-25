const apiUrl = "https://dog.ceo/api/breeds/image/random";
const fotoactual = document.getElementById("fotoactual");

function cargarImagen(){

    fetch(apiUrl)
    .then((Response) => Response.json())
    .then((data) => {
        const imageUrl = data.message;
        fotoActualElement.src = imageUrl;
    })

    .finally(() => {
        spinner.classList.add("escondido");
        fotoActualElement.classList.remove("escondido");
    })
}

cargarImagen();

console.log("hola");
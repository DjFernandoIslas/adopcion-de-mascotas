let indiceActual = 0;
let slides = document.querySelectorAll('.slide');
let totalSlides = slides.length;
let slider = document.querySelector('.slides');
let intervalo = 4000; // Intervalo entre slides en milisegundos
let autoMove = setInterval(moverHaciaSiguiente, intervalo); // Iniciar el movimiento automático
let adelante = true; // Variable para controlar la dirección del slider

// Función para mover hacia el siguiente slide
function moverHaciaSiguiente() {
  if (adelante) {
    indiceActual++;
    if (indiceActual === totalSlides) {
      adelante = false; // Cambia la dirección a reversa
      indiceActual -= 2; // Ajusta el índice para ir al penúltimo slide
    }
  } else {
    indiceActual--;
    if (indiceActual === -1) {
      adelante = true; // Cambia la dirección a adelante
      indiceActual = 1; // Ajusta el índice para ir al segundo slide
    }
  }
  desplazarSlider();
}

// Función para actualizar la transformación del slider
function desplazarSlider() {
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(${-100 * indiceActual}%)`;
}

// Event listeners para los botones
document.querySelector('.prev').addEventListener('click', function() {
  adelante = !adelante; // Cambia la dirección al hacer clic manualmente
  moverHaciaSiguiente();
  reiniciarAutoMovimiento();
});

document.querySelector('.next').addEventListener('click', function() {
  adelante = !adelante; // Cambia la dirección al hacer clic manualmente
  moverHaciaSiguiente();
  reiniciarAutoMovimiento();
});

// Función para reiniciar el movimiento automático
function reiniciarAutoMovimiento() {
  clearInterval(autoMove);
  autoMove = setInterval(moverHaciaSiguiente, intervalo);
}

// Reiniciar la transición después de que haya ocurrido un salto sin transición
slider.addEventListener('transitionend', function() {
  slider.style.transition = 'transform 0.5s ease-in-out';
});

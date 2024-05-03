// Crear el div con clase "margenes_carrusel"
var margenesCarrusel = document.createElement("div");
margenesCarrusel.classList.add("margenes_carrusel");

// Crear el div con texto "empresa prueba" en un h2
var empresaPrueba = document.createElement("div");
var h2 = document.createElement("h2");
h2.textContent = "Empresa Prueba";
empresaPrueba.appendChild(h2);

// Crear el div con clase "contenedor"
var contenedor = document.createElement("div");
contenedor.classList.add("contenedor");

// Crear la etiqueta <a> con una imagen dentro y clase "img1"
var enlace = document.createElement("a");
var imagen1 = document.createElement("img");
imagen1.classList.add("img1");
imagen1.src = "ruta_de_la_imagen.jpg"; // Agrega la ruta correcta de tu imagen aquí
enlace.appendChild(imagen1);

// Agregar el div con clase "carousel-container" con el evento onwheel
var carouselContainer = document.createElement("div");
carouselContainer.classList.add("carousel-container");
carouselContainer.setAttribute("onwheel", "scrollHorizontally(event, this)");

// Crear varios <a> con imágenes dentro y clase "img" dentro del carousel-container
for (var i = 1; i <= 5; i++) {
    var enlaceCarousel = document.createElement("a");
    var imagenCarousel = document.createElement("img");
    imagenCarousel.classList.add("img");
    imagenCarousel.src = "ruta_de_la_imagen_" + i + ".jpg"; // Agrega la ruta correcta de tus imágenes aquí
    enlaceCarousel.appendChild(imagenCarousel);
    carouselContainer.appendChild(enlaceCarousel);
}

// Agregar los elementos creados al div "margenes_carrusel"
margenesCarrusel.appendChild(empresaPrueba);
margenesCarrusel.appendChild(contenedor);
contenedor.appendChild(enlace);
contenedor.appendChild(carouselContainer);

// Agregar el div "margenes_carrusel" al body del documento
document.body.appendChild(margenesCarrusel);
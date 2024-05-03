// Función para crear un elemento "a" con una imagen dentro y la clase "img"
function createImageLinkWithClass(href, src, alt) {
    var a = document.createElement("a");
    a.href = href;

    var img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.classList.add("img"); // Agregar la clase "img" a la imagen

    a.appendChild(img);

    return a;
}

// Contenido de las imágenes para el primer conjunto de datos
var imagenes1 = [
    { href: "Producto1.html", src: "Images/Productos Rótelo/spider-cat.png", alt: "Imagen 1" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/spider-punk.png", alt: "Imagen 2" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/perry.png", alt: "Imagen 3" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/pañuelos.png", alt: "Imagen 4" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/judo de ansiedad.png", alt: "Imagen 5" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/assoeach.png", alt: "Imagen 6" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/anidepressant.png", alt: "Imagen 7" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/dont give papaya.png", alt: "Imagen 8" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/easliy disblabla.png", alt: "Imagen 9" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/fck gato.png", alt: "Imagen 10" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/gato triste.png", alt: "Imagen 11" },
    { href: "Producto1.html", src: "Images/Productos Rótelo/jabon rey.png", alt: "Imagen 12" }
];

// Contenido de las imágenes para el segundo conjunto de datos
var imagenes2 = [
    { href: "Producto1.html", src: "Images/Productos canutos/botas de lluvia.png", alt: "Imagen 1" },
    { href: "Producto1.html", src: "Images/Productos canutos/cepillo.png", alt: "Imagen 2" },
    { href: "Producto1.html", src: "Images/Productos canutos/comedero.png", alt: "Imagen 3" },
    { href: "Producto1.html", src: "Images/Productos canutos/culebra juguete.png", alt: "Imagen 4" },
    { href: "Producto1.html", src: "Images/Productos canutos/deslanador.png", alt: "Imagen 5" },
    { href: "Producto1.html", src: "Images/Productos canutos/lickmat.png", alt: "Imagen 6" },
    { href: "Producto1.html", src: "Images/Productos canutos/moño.png", alt: "Imagen 7" },
    { href: "Producto1.html", src: "Images/Productos canutos/rascador.png", alt: "Imagen 8" },
    { href: "Producto1.html", src: "Images/Productos canutos/rolon.png", alt: "Imagen 9" }
];

// Crear el contenido para cada sección de "ocho"
var contenido1 = document.createElement("div");
contenido1.innerHTML = `
    <h2>Prueba JS1</h2>
    <div class="contenedor">
        <a href="Empresa1.html"><img src="Images/Logos/Empresa 1.jpeg" alt="Logo empresa 1" class="img1"></a>
        <div class="carousel-container" onwheel="scrollHorizontally(event, this)">
            ${imagenes1.map(image => createImageLinkWithClass(image.href, image.src, image.alt).outerHTML).join('')}
        </div>
    </div>
`;

var contenido2 = document.createElement("div");
contenido2.innerHTML = `
    <h2>Prueba JS1</h2>
    <div class="contenedor">
        <a href="Empresa1.html"><img src="Images/Logos/Empresa 2.jpeg" alt="Logo empresa 2" class="img1"></a>
        <div class="carousel-container" onwheel="scrollHorizontally(event, this)">
            ${imagenes2.map(image => createImageLinkWithClass(image.href, image.src, image.alt).outerHTML).join('')}
        </div>
    </div>
`;

// Obtener el elemento con la clase "margenes_carrusel"
var margenesCarrusel = document.querySelector('.margenes_carrusel');

// Agregar los contenidos a "margenes_carrusel"
margenesCarrusel.appendChild(contenido1);
margenesCarrusel.appendChild(contenido2);

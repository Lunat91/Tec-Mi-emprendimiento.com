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
/*
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
*/
// Crear una función para hacer la solicitud AJAX y generar el contenido
function cargarDatosYGenerarContenido() {
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud
    xhr.open('GET', 'base_de_datos/galeria.json', true);

    // Manejar la carga exitosa de los datos
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Convertir la respuesta JSON en un objeto JavaScript
            var datos = JSON.parse(xhr.responseText);
            // Procesar los datos aquí
            //console.log(datos);

            // Definir el arreglo imagenes1
            var imagenes1 = [];

            // Agregar los datos al arreglo imagenes1
            for (var i = 0; i < datos.imagenes.length; i++) {
                imagenes1.push({
                    href: datos.imagenes[i].href,
                    src: datos.imagenes[i].src,
                    alt: datos.imagenes[i].alt
                });
            }
            console.log(imagenes1);

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

            // Obtener el elemento con la clase "margenes_carrusel"
            var margenesCarrusel = document.querySelector('.margenes_carrusel');

            // Agregar los contenidos a "margenes_carrusel"
            margenesCarrusel.appendChild(contenido1);
        } else {
            console.error('Error al cargar los datos:', xhr.statusText);
        }
    };

    // Manejar errores de la solicitud
    xhr.onerror = function() {
        console.error('Error de red al cargar los datos.');
    };

    // Enviar la solicitud
    xhr.send();
}

// Llamar a la función para cargar los datos y generar el contenido
cargarDatosYGenerarContenido();


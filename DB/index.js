function createImageLinkWithClass(href, src, alt, nombreProducto) {
    var a = document.createElement("a");
    var nombreProductoDecodificado = decodeURIComponent(nombreProducto);
a.href = `${href}?nombre=${encodeURIComponent(nombreProductoDecodificado)}`;


    var img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.classList.add("img");

    a.appendChild(img);

    return a;
}


function cargarDatosYGenerarContenido() {
    var xhrProductos = new XMLHttpRequest();
    var xhrEmpresas = new XMLHttpRequest();

    // Configurar la solicitud para productos
    xhrProductos.open('GET', 'DB/producto.php', true);

    // Manejar la carga exitosa de los datos de productos
    xhrProductos.onload = function() {
        if (xhrProductos.status >= 200 && xhrProductos.status < 300) {
            var datosProductos = JSON.parse(xhrProductos.responseText);

            // Configurar la solicitud para empresas
            xhrEmpresas.open('GET', 'DB/empresa.php', true);

            // Manejar la carga exitosa de los datos de empresas
            xhrEmpresas.onload = function() {
                if (xhrEmpresas.status >= 200 && xhrEmpresas.status < 300) {
                    var datosEmpresas = JSON.parse(xhrEmpresas.responseText);

                    // Agrupar los productos por empresa
                    var empresas = {};
                    datosProductos.forEach(function(producto) {
                        if (!empresas[producto.empresa]) {
                            empresas[producto.empresa] = [];
                        }
                        empresas[producto.empresa].push(producto);
                    });

                    // Generar contenido para cada empresa
                    for (var empresa in empresas) {
                        if (empresas.hasOwnProperty(empresa)) {
                            var contenido = document.createElement("div");

                            // Obtener la URL del logo de la empresa
                            var logoEmpresa = datosEmpresas.find(e => e.Nombre === empresa)?.Logo || '';

                            contenido.innerHTML = `
                                <h2>${empresa}</h2>
                                <div class="contenedor">
                                    <a href="Empresa.html?nombre=${encodeURIComponent(empresa)}"><img src="${logoEmpresa}" alt="Logo ${empresa}" class="img1"></a>
                                    <div class="carousel-container" onwheel="scrollHorizontally(event, this)">
                                        ${empresas[empresa].map(function(producto) {
                                            const nombreProducto = encodeURIComponent(producto.nombre);
                                            return createImageLinkWithClass("Producto.html", producto.imagen, producto.nombre, nombreProducto).outerHTML;
                                        }).join('')}
                                    </div>
                                </div>
                            `;

                            // Obtener el elemento con la clase "margenes_carrusel"
                            var margenesCarrusel = document.querySelector('.margenes_carrusel');

                            // Agregar el contenido a "margenes_carrusel"
                            margenesCarrusel.appendChild(contenido);
                        }
                    }
                } else {
                    console.error('Error al cargar los datos de empresas:', xhrEmpresas.statusText);
                }
            };

            // Manejar errores de la solicitud de empresas
            xhrEmpresas.onerror = function() {
                console.error('Error de red al cargar los datos de empresas.');
            };

            // Enviar la solicitud para empresas
            xhrEmpresas.send();
        } else {
            console.error('Error al cargar los datos de productos:', xhrProductos.statusText);
        }
    };

    // Manejar errores de la solicitud de productos
    xhrProductos.onerror = function() {
        console.error('Error de red al cargar los datos de productos.');
    };

    // Enviar la solicitud para productos
    xhrProductos.send();
}

// Llamar a la función para cargar los datos y generar el contenido
cargarDatosYGenerarContenido();

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

            // Leer la cookie
            var nombreEmpresaBuscada = decodeURIComponent(getCookie('buscar'));
            console.log(nombreEmpresaBuscada)

            // Configurar la solicitud para empresas
            xhrEmpresas.open('GET', 'DB/empresa.php', true);

            // Manejar la carga exitosa de los datos de empresas
            xhrEmpresas.onload = function() {
                if (xhrEmpresas.status >= 200 && xhrEmpresas.status < 300) {
                    var datosEmpresas = JSON.parse(xhrEmpresas.responseText);

                    // Filtrar los datos para mostrar solo la empresa correspondiente
                    var empresaFiltrada = datosEmpresas.find(e => e.Nombre === nombreEmpresaBuscada);
                    if (empresaFiltrada) {
                        var contenido = document.createElement("div");

                        // Obtener la URL del logo de la empresa
                        var logoEmpresa = empresaFiltrada.Logo || '';

                        contenido.innerHTML = `
                            <h2>${empresaFiltrada.Nombre}</h2>
                            <div class="contenedor">
                                <a href="Empresa.html?nombre=${encodeURIComponent(empresaFiltrada.Nombre)}"><img src="${logoEmpresa}" alt="Logo ${empresaFiltrada.Nombre}" class="img1"></a>
                                <div class="carousel-container" onwheel="scrollHorizontally(event, this)">
                                    ${datosProductos.filter(producto => producto.empresa === nombreEmpresaBuscada).map(function(producto) {
                                        const nombreProducto = encodeURIComponent(producto.nombre);
                                        return createImageLinkWithClass("Producto.html", producto.imagen, producto.nombre, nombreProducto).outerHTML;
                                    }).join('')}
                                </div>
                            </div>
                        `;

                        // Obtener el elemento con la clase "margenes_carrusel"
                        var margenesCarrusel = document.querySelector('.margenes_carrusel');

                        // Limpiar el contenido existente
                        margenesCarrusel.innerHTML = '';

                        // Agregar el contenido a "margenes_carrusel"
                        margenesCarrusel.appendChild(contenido);
                    } else {
                        console.error('No se encontró la empresa en los datos.');
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

// Función para obtener el valor de una cookie por su nombre
function getCookie(nombre) {
    var nombreEQ = nombre + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1,cookie.length);
        }
        if (cookie.indexOf(nombreEQ) == 0) {
            return cookie.substring(nombreEQ.length,cookie.length);
        }
    }
    return null;
}

function cargarDatosYGenerarContenido(nombreProducto) {
    var xhrProductos = new XMLHttpRequest();

    // Configurar la solicitud para productos
    xhrProductos.open('GET', 'DB/producto.php', true);
    // Manejar la carga exitosa de los datos de productos
    xhrProductos.onload = function() {
        if (xhrProductos.status >= 200 && xhrProductos.status < 300) {
            var datosProductos = JSON.parse(xhrProductos.responseText);
            
            // Encontrar el producto por nombre
            var producto = datosProductos.find(function(producto) {
                return producto.nombre === nombreProducto;
            });
            if (producto) {
                // Configurar la solicitud para empresas
                var xhrEmpresas = new XMLHttpRequest();
                xhrEmpresas.open('GET', 'DB/empresa.php', true);
                // Manejar la carga exitosa de los datos de empresas
                xhrEmpresas.onload = function() {
                    if (xhrEmpresas.status >= 200 && xhrEmpresas.status < 300) {
                        var datosEmpresas = JSON.parse(xhrEmpresas.responseText);
                        // Encontrar la empresa relacionada con el producto
                        var empresaRelacionada = datosEmpresas.find(function(empresa) {
                            return empresa.Nombre === producto.empresa;
                        });
                        if (empresaRelacionada) {
                            // Crear elementos HTML con los datos de la empresa y agregarlos al DOM
                            var empresaHTML = `
                                                <div class="uno"></div>
                                                            <div class="seis"> <h2>Modificar Producto</h2></div>
                                                            <div class="uno"></div>  <!--Título-->
                                                    
                                                            <form action="DB/modificar_producto.php?nombre=${encodeURIComponent(producto.nombre)}" method="post" enctype="multipart/form-data" class="ocho">
                                                    
                                                                <div class="ocho centro">
                                                                    <div class="cuatro">
                                                                        <label for="foto" class="espacioFormlariosLabel">Imagen</label>
                                                                        <input type="file" id="foto" name="foto" class="espacioFormlariosInput" accept="image/*">
                                                                    </div>
                                                                    <div class="uno"></div>
                                                                    <div class="tres">
                                                                        <label for="nombreProducto" class="espacioFormlariosLabel"> Nombre del producto</label>
                                                                        <input type="text" id="nombreProducto" name="nombreProducto" class="transparente_negro cuadro espacioFormlariosInput" value="${producto.nombre}">
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="ocho centro">
                                                                    <div class="cuatro">
                                                                        <label for="descripcionProducto" class="espacioFormlariosLabel">Descripción</label>
                                                                        <input id="descripcionProducto" name="descripcionProducto" class="transparente_negro cuadro espacioFormlariosInputIzq" value="${producto.descripcion}">
                                                                    </div>
                                                                    <div class="uno"></div>
                                                                    <div class="tres">
                                                                        <label for="precioProducto" class="espacioFormlariosLabel">Precio:</label>
                                                                        <input type="number" class="transparente_negro cuadro espacioFormlariosInputIzq" placeholder="$" step="1000" id="precioProducto" name="precioProducto" value="${producto.precio}">
                                                                    </div>
                                                                </div>
                                                            
                                                                <div class="ocho"></div>
                                                                <div class="centro">
                                                                <div class="dos"></div>
                                                                    <div class="cuatro">
                                                                        <input type="submit" value="Guardar cambios" class="botonv kodchasan-regular ">
                                                                        <div class="uno"></div>
                                                                    </div>
                                                                    <div class="dos"></div>
                                                                </div>
                                                            </form>
                                                            <div class="dos"></div>
                                                            <div class="cuatro">
                                                                <form action="DB/eliminar_producto.php?nombre=${encodeURIComponent(producto.nombre)}" method="post" enctype="multipart/form-data" class="ocho">
                                                                    <input type="submit" value="Eliminar producto" class="botonrosa kodchasan-regular " id="eliminarProductoBtn">
                                                                </form>
                                                            </div>
                                                            <div class="dos"></div>
                                                    
                            `;
                            // Obtener el div con clase "margenes_generales"
                            var margenesGenerales = document.querySelector('.margenes_generales');
                            // Agregar el contenido generado dentro del div "margenes_generales"
                            margenesGenerales.innerHTML += empresaHTML;

                            console.log(empresaDecodificada)
                            console.log(producto.empresa)
                        } else {
                            console.error('No se encontró la empresa relacionada con el producto.');
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
                console.error('No se encontró el producto con el nombre proporcionado.');
            }
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

// Obtener el nombre del producto de los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const nombreProducto = urlParams.get('nombre');

// Llamar a la función para cargar los datos y generar el contenido
cargarDatosYGenerarContenido(nombreProducto);
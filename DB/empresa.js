// Obtener el valor de la cookie "empresa"
var empresaCookie = obtenerValorCookie("empresa");

// Verificar si la cookie "empresa" está vacía
if (empresaCookie === "") {
  console.log("La cookie 'empresa' está vacía.");
} else {
  // Decodificar el valor de la cookie para obtener los espacios normales
  var empresaDecodificada = decodeURIComponent(empresaCookie);
  console.log("La cookie 'empresa' no está vacía. El valor es: " + empresaDecodificada);
}

// Función para obtener el valor de una cookie específica
function obtenerValorCookie(nombre) {
  // Separar las cookies individuales
  var cookies = document.cookie.split(';');
  
  // Iterar sobre las cookies para encontrar la que tiene el nombre específico
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    // Verificar si la cookie actual comienza con el nombre de la cookie que estamos buscando
    if (cookie.indexOf(nombre + '=') === 0) {
      // Obtener el valor de la cookie sin los espacios iniciales ni finales
      var valor = cookie.substring(nombre.length + 1).trim();
      // Devolver el valor de la cookie
      return valor;
    }
  }
  // Si no se encuentra la cookie específica, devolver una cadena vacía
  return "";
}


function cargarDatosYGenerarContenido(nombreEmpresa) {
    var xhrEmpresas = new XMLHttpRequest();
    var xhrProductos = new XMLHttpRequest();

    // Configurar la solicitud para empresas
    xhrEmpresas.open('GET', 'DB/empresa.php', true);
    // Manejar la carga exitosa de los datos de empresas
    xhrEmpresas.onload = function() {
        if (xhrEmpresas.status >= 200 && xhrEmpresas.status < 300) {
            var datosEmpresas = JSON.parse(xhrEmpresas.responseText);
            // Encontrar la empresa por nombre
            var empresa = datosEmpresas.find(function(empresa) {
                // Limpiar el nombre de la empresa eliminando espacios en blanco adicionales y saltos de línea
                var nombreEmpresaLimpiado = empresa.Nombre.trim();
                return nombreEmpresaLimpiado === nombreEmpresa;
            });
            if (empresa) {
                // Crear elementos HTML con los datos de la empresa y agregarlos al DOM
                var empresaHTML = `
                    <div class="dos">
                        <h2 class="Nombre_e">${empresa.Nombre}</h2>
                    </div>
                    <div class="cinco"></div>
                    <div class="dos">
                        <img src="${empresa.Logo}" alt="${empresa.Nombre}" class="img1">
                    </div>
                    <div class="seis">
                        <div>
                            <h2 class="descrip_e">${empresa.Descripcion}</h2>
                            <a href="${empresa.RedSocial}" class="redsocial" target="_blank">
                                <p class="descrip_e verde">${empresa.RedSocial}</p>
                            </a>
                        </div> 
                    </div>
                `;
                // Obtener el div con clase "margenes_generales"
                var margenesGenerales = document.querySelector('.margenes_generales');
                // Agregar el contenido generado dentro del div "margenes_generales"
                margenesGenerales.innerHTML += empresaHTML;

                // Configurar la solicitud para productos
                xhrProductos.open('GET', 'DB/producto.php', true);
                // Manejar la carga exitosa de los datos de productos
                xhrProductos.onload = function() {
                    if (xhrProductos.status >= 200 && xhrProductos.status < 300) {
                        var datosProductos = JSON.parse(xhrProductos.responseText);
                        
                        // Filtrar productos por empresa
                        var productosDeEmpresa = datosProductos.filter(function(producto) {
                            return producto.empresa === nombreEmpresa;
                        });
                        
                        // Crear el div contenedor para todas las imágenes de productos
                        var contenedorProductos = document.createElement('div');
                        contenedorProductos.classList.add('ocho', 'flexspace2');

                        console.log(empresaDecodificada)
                        console.log(nombreEmpresa)


                        if (empresaDecodificada === nombreEmpresa) {
                            var productoHTML2 = `
                                    <div class="dos"></div>
                                        <div class="seis">
                                        <div class="flexspace1">
                                                <div class="flexspace">
                                                    <a href="agregarproducto.html" >
                                                        <div class="botonaz">Agregar producto</div>
                                                    </a>
                                                    <a href="modificarempresa.html">
                                                        <div class="botonaz">Modificar empresa</div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                `;
                                contenedorProductos.innerHTML += productoHTML2;
                        }

                        // Iterar sobre cada producto y agregar su HTML al contenido del contenedor
                        productosDeEmpresa.forEach(function(producto) {
                            var productoHTML = `
                                <div class="prod">
                                    <a href="Producto.html?nombre=${encodeURIComponent(producto.nombre)}">
                                        <img src="${producto.imagen}" alt="${producto.nombre}" class="imgp">
                                        <p class="pligther">${producto.nombre}</p>
                                    </a>
                                </div>
                            `;
                            contenedorProductos.innerHTML += productoHTML;
                        });

                        // Agregar el contenedor de productos al div "margenes_generales"
                        margenesGenerales.appendChild(contenedorProductos);
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
            } else {
                console.error('No se encontró la empresa con el nombre proporcionado.');
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
}

// Obtener el nombre de la empresa de los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const nombreEmpresa = urlParams.get('nombre');

// Llamar a la función para cargar los datos y generar el contenido
cargarDatosYGenerarContenido(nombreEmpresa);

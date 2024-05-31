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

                            <div class="cuatro">
                                    <img class="imgprod" src="${producto.imagen}" alt="Spider-cat">
                                </div>

                                <div class="cuatro">
                                    <h2 class="Nombre_p">${producto.nombre}</h2>
                                    <p class="descrip_p">${producto.descripcion}</p>
                                </div>

                                <div class="ocho portre">
                                    <p class="DM"> Este producto lo puedes comprar yendo a la <a href="${empresaRelacionada.RedSocial}" class="redsocialprincipal" target="_blank">red social</a> de la empresa y                                                                   mandando un mensaje directo!</p>
                                    <p class="Price">$${producto.precio}</p>
                                </div>
                            `;
                            // Obtener el div con clase "margenes_generales"
                            var margenesGenerales = document.querySelector('.margenes_generales');
                            // Agregar el contenido generado dentro del div "margenes_generales"
                            margenesGenerales.innerHTML += empresaHTML;

                            console.log(empresaDecodificada)
                            console.log(producto.empresa)

                            if (empresaDecodificada === producto.empresa) {
                                var productoHTML2 = `
                                    <div class="cinco"></div>
                                    <div class="tres">
                                                    <nav>
                                                        <ul id="nadademg">
                                                            <li> <a href="ModificarProducto.html?nombre=${encodeURIComponent(producto.nombre)}" class="botonaz" id="modprod">Modificar </a></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                    `;
                                    margenesGenerales.innerHTML += productoHTML2;
                            }
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

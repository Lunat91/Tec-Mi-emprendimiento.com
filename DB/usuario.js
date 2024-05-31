// Obtener el valor de la cookie "email"
var emailCookie = obtenerValorCookie("email");

// Verificar si la cookie "email" está vacía
if (emailCookie === "") {
  console.log("La cookie 'email' está vacía.");
} else {
  // Decodificar el valor de la cookie para obtener los espacios normales
  var emailDecodificado = decodeURIComponent(emailCookie);
  console.log("La cookie 'email' no está vacía. El valor es: " + emailDecodificado);
  // Llamar a la función para cargar los datos y generar el contenido solo para el usuario con el email correspondiente
  cargarDatosYGenerarContenido(emailDecodificado);
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

function cargarDatosYGenerarContenido(emailUsuario) {
    var xhrUsuarios = new XMLHttpRequest();

    // Configurar la solicitud para usuarios
    xhrUsuarios.open('GET', 'DB/usuario.php', true);
    // Manejar la carga exitosa de los datos de usuarios
    xhrUsuarios.onload = function() {
        if (xhrUsuarios.status >= 200 && xhrUsuarios.status < 300) {
            var datosUsuarios = JSON.parse(xhrUsuarios.responseText);
            
            // Encontrar el usuario por email
            var usuario = datosUsuarios.find(function(usuario) {
                return usuario.correo === emailUsuario;
            });
            if (usuario) {
                // Crear elementos HTML con los datos del usuario y agregarlos al DOM
                var usuarioHTML = `
                       <img src="Images/Logos/perfilPredeterminado.png" alt="Perfil 1" class="imgperfil">
                        </div>
                        <div class="cinco">
                            <div>
                                <h3>¡Hola ${usuario.nombre}! <br> Estás en tu perfil de usuario.</h3> 
                            </div>
                        </div>
                        
                        <div class="ocho">
                            <h2 class="semiboldmargenes">Tu información personal:</h2>
                    
                            <nav class="MostrarListaDatos">
                                <ul>
                                    <li class="info">
                                        Nickname: <b>${usuario.nickname}</b> 
                                    </li>
                                    <li class="info">
                                        Nombre Completo: <b>${usuario.nombre}</b>
                                    </li>
                                    <li  class="info">
                                        Correo: <b>${usuario.correo}</b>
                                    </li>
                                    <li class="info">
                                        Celular: <b>${usuario.celular}</b>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        
                        <div class="dos"></div>
                        <div class="cuatro cien">  
                            <a href="EditarPerfil.html">
                                <p class="botonv">Editar información personal</p>
                            </a>
                        </div>
                        <div class="dos"></div>
                        <div class="dos"></div>
                        <div class="tres cien">  
                            <a href="Iniciarsesion.html">
                            <p class="botonrosa">Cerrar sesión</p>
                            </a>
                        </div>
                        <div class="dos"></div>
                `;
                // Obtener el div con clase "usuarios"
                var contenedorUsuarios = document.querySelector('.margenes_generales.content');
                // Agregar el contenido generado dentro del div "usuarios"
                contenedorUsuarios.innerHTML += usuarioHTML;
            } else {
                console.error('No se encontró el usuario con el correo proporcionado.');
            }
        } else {
            console.error('Error al cargar los datos de usuarios:', xhrUsuarios.statusText);
        }
    };
    // Manejar errores de la solicitud de usuarios
    xhrUsuarios.onerror = function() {
        console.error('Error de red al cargar los datos de usuarios.');
    };
    // Enviar la solicitud para usuarios
    xhrUsuarios.send();
}

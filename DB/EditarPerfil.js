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
                      <div class="uno"></div>
                            <div class="dos"> 
                                <img src="Images\Logos\perfilPredeterminado.png" alt="Perfil 1" class="imgperfil">
                                <!--**-->
                            </div>
                            <div class="cuatro">
                                <div>
                                    <h3>Editar información personal</h3> 
                                </div>
                            </div>
                            <div class="uno"></div>
                            <form action="DB/editar_informacion.php" method="post" enctype="multipart/form-data" class="ocho">
                                <div class="">
                        
                                    <div class="centro">
                                        <div class="uno"></div>
                                        <div class="dos">
                                            <label for="nickName" class="espacioFormlariosLabel"> Nombre de usuario: </label>
                                        </div>
                                        <div class="tres">
                                            <input type="text" id="nickName" name="nickName" class="espacioFormlariosInput cuadroTexto kodchasan-regular" value="${usuario.nickname}">
                                        </div>
                                        <span class="material-symbols-outlined uno">
                                            edit
                                        </span>
                                    </div>
                        
                                    <div class="centro">
                                        <div class="uno"></div>
                                        <div class="dos">
                                            <label for="fullName" class="espacioFormlariosLabel"> Nombre completo: </label>
                                        </div>
                                        <div class="tres">
                                            <input type="text" id="fullName" name="fullName" class="espacioFormlariosInput cuadroTexto kodchasan-regular" value="${usuario.nombre}">
                                        </div>
                                        <span class="material-symbols-outlined uno">
                                            edit
                                        </span>
                                    </div>
                        
                                    <div class="centro">
                                        <div class="uno"></div>
                                        <div class="dos">
                                            <label for="correoUsuario" class="espacioFormlariosLabel"> Correo: </label>
                                        </div>
                                        <div class="tres">
                                            <input type="email" id="correoUsuario" name="correoUsuario" class="espacioFormlariosInput cuadroTexto kodchasan-regular" value="${usuario.correo}">
                                        </div>
                                        <span class="material-symbols-outlined uno">
                                            edit
                                        </span>
                                    </div>
                        
                                    <div class="centro">
                                        <div class="uno"></div>
                                        <div class="dos">
                                            <label for="passwordUsuario" class="espacioFormlariosLabel"> Contraseña: </label>
                                        </div>
                                        <div class="tres">
                                            <input type="text" id="passwordUsuario" name="passwordUsuario" class="espacioFormlariosInput cuadroTexto kodchasan-regular" value="${usuario.password}">
                                        </div>
                                        <span class="material-symbols-outlined uno">
                                            edit
                                        </span>
                                    </div>
                        
                                    <div class="centro">
                                        <div class="uno"></div>
                                        <div class="dos">
                                            <label for="celUsuario" class="espacioFormlariosLabel"> Celular: </label>
                                        </div>
                                        <div class="tres">
                                            <input type="tel" id="celUsuario" name="celUsuario" class="espacioFormlariosInput cuadroTexto kodchasan-regular" value="${usuario.celular}" maxlength="10">
                                        </div>
                                        <span class="material-symbols-outlined uno">
                                            edit
                                        </span>
                                    </div>
                                    
                                    <div class="ocho"></div>
                                    <div class="centro">
                                        <div class="dos cero"></div>
                                        <div class="cuatro cien">
                                            <input type="submit" value="Guardar cambios" class="botonv kodchasan-regular ">
                                        </div>
                                        <div class="dos cero"></div>
                                    </div>
                        
                                </div>
                        
                            </form>
                        
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
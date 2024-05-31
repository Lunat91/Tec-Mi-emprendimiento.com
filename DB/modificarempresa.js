// Obtener el valor de la cookie "empresa"
var empresaCookie = obtenerValorCookie("empresa");

// Verificar si la cookie "empresa" está vacía
if (empresaCookie === "") {
  console.log("La cookie 'empresa' está vacía.");
} else {
  // Decodificar el valor de la cookie para obtener los espacios normales
  var empresaDecodificada = decodeURIComponent(empresaCookie);
  console.log("La cookie 'empresa' no está vacía. El valor es: " + empresaDecodificada);

  // Llamar a la función para cargar los datos y generar el contenido usando el nombre de la empresa
  cargarDatosYGenerarContenido(empresaDecodificada);
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
    // Crear una nueva solicitud XMLHttpRequest
    var xhrEmpresas = new XMLHttpRequest();
    // Configurar la solicitud GET con el nombre de la empresa
    xhrEmpresas.open('GET', 'DB/empresa.php?nombre=' + encodeURIComponent(nombreEmpresa), true);

    // Manejar la carga exitosa de los datos de empresas
    xhrEmpresas.onload = function() {
        if (xhrEmpresas.status >= 200 && xhrEmpresas.status < 300) {
            try {
                var datosEmpresas = JSON.parse(xhrEmpresas.responseText);
                console.log(datosEmpresas); // Imprimir los datos obtenidos para depuración

                var empresaRelacionada = datosEmpresas.find(function(datosEmpresas) {
                            return datosEmpresas.Nombre === nombreEmpresa;
                        });


                // Generar el contenido HTML con los datos de la empresa
                var empresaHTML = `
                    <div class="uno"></div>
                    <div class="seis"> <h2>Modificar Empresa</h2></div>
                    <div class="uno"></div>  <!--Título-->
            
                    <form action="DB/modificar_empresa.php?nombre=${encodeURIComponent(empresaRelacionada.Nombre)}" method="post" enctype="multipart/form-data" class="ocho">
                        <div class="ocho centro">
                            <div class="tres">
                                <label for="fotoEmpresa" class="espacioFormlariosLabel">Imagen</label>
                                <input type="file" id="fotoEmpresa" name="fotoEmpresa" class="espacioFormlariosInput" accept="image/*">
                            </div>
                            <div class="dos"></div>
                            <div class="tres">
                                <label for="descripcionEmpresa" class="espacioFormlariosLabel">Descripción</label>
                                <input type="text" id="descripcionEmpresa" name="descripcionEmpresa" class="transparente_negro cuadro espacioFormlariosInputIzq" value="${empresaRelacionada.Descripcion}">
                            </div>
                        </div>
                        
                        <div class="ocho centro">
                            <div class="tres">
                                <label for="nombreEmpresa" class="espacioFormlariosLabel"> Nombre</label>
                                <input type="text" id="nombreEmpresa" name="nombreEmpresa" class="transparente_negro cuadro espacioFormlariosInput" value="${empresaRelacionada.Nombre}">
                            </div>
                            <div class="dos"></div>
                            <div class="tres">
                                <label for="redSocial" class="espacioFormlariosLabel">Red social</label>
                                <input type="url" id="redSocial" name="redSocial" class="transparente_negro cuadro espacioFormlariosInput" value="${empresaRelacionada.RedSocial}">
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
                    <form action="DB/eliminar_empresa.php?nombre=${encodeURIComponent(empresaRelacionada.Nombre)}" method="post" enctype="multipart/form-data" class="ocho">
                            <div class="centro">
                                <div class="dos"></div>
                                <div class="cuatro">
                                    <input type="submit" value="Eliminar Empresa" class="botonrosa kodchasan-regular ">
                                </div>
                                <div class="dos"></div>
                            </div>
                    </form>
                `;

                // Obtener el div con clase "margenes_generales content"
                var margenesGenerales = document.querySelector('.margenes_generales.content');
                // Agregar el contenido generado dentro del div "margenes_generales"
                margenesGenerales.innerHTML += empresaHTML;
            } catch (e) {
                console.error('Error al parsear el JSON de la respuesta:', e);
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

<?php 

include "conexion.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verificar si la conexión se ha establecido correctamente
if ($conn) {
    echo "Conexión a la base de datos establecida correctamente.<br>";
} else {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

// Tomar el valor del nombre del producto desde la URL
if (isset($_GET['nombre'])) {
    $base = utf8_encode($_GET['nombre']);
} else {
    die("Error: nombre del producto no especificado en la URL.");
}

$nombre = utf8_encode($_POST["nombreEmpresa"]);
$descripcion = utf8_encode($_POST["descripcionEmpresa"]);
$redSocial = $_POST["redSocial"]; 

// Consulta SQL base
$sql = "UPDATE Empresa SET Nombre='$nombre',Descripcion='$descripcion', RedSocial='$redSocial'";

// Verificar si se ha subido una nueva foto
if(isset($_FILES["fotoEmpresa"]) && $_FILES["fotoEmpresa"]["error"] === UPLOAD_ERR_OK) {
    $archivoNombreOriginal = $_FILES["fotoEmpresa"]["name"];
    $archivoTempNombre = $_FILES["fotoEmpresa"]["tmp_name"];
    // Obtener la extensión del archivo original
    $extension = pathinfo($archivoNombreOriginal, PATHINFO_EXTENSION);

    $directorioDestino = "productos/";
    // Ruta completa del archivo de destino
    $directorioDestinoCompleto = $directorioDestino . $nombre . "." . $extension;

    // Mover el archivo a la carpeta de destino con el nuevo nombre
    if(move_uploaded_file($archivoTempNombre, $directorioDestinoCompleto)) {
        $directorioFinal = "DB/" . $directorioDestinoCompleto;
        // Añadir la parte de la actualización de la imagen a la consulta SQL
        $sql .= ", imagen='$directorioFinal'";
    } else {
        echo "Error al mover el archivo.";
    }
} 

// Completar la consulta SQL con la condición WHERE
$sql .= " WHERE nombre='$base'";

if ($conn->query($sql) === TRUE) {
    echo "Registro actualizado correctamente.<br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Actualizar el nombre de la empresa en la tabla Productos
$sqlProductos = "UPDATE Productos SET Empresa='$nombre' WHERE Empresa='$base'";

if ($conn->query($sqlProductos) === TRUE) {
    echo "Registros de productos actualizados correctamente.<br>";
} else {
    echo "Error al actualizar los productos: " . $sqlProductos . "<br>" . $conn->error;
}

// Actualizar el nombre de la empresa en la tabla Productos
$sqlProductos = "UPDATE Usuarios SET Empresa='$nombre' WHERE Empresa='$base'";

if ($conn->query($sqlProductos) === TRUE) {
    echo "Registros de productos actualizados correctamente.<br>";
} else {
    echo "Error al actualizar los productos: " . $sqlProductos . "<br>" . $conn->error;
}

// Cambiar el valor de la cookie 'empresa'
echo '<script>
document.cookie = "empresa=' . rawurlencode($nombre) . '; path=/";
window.location = "../index.html";
</script>';

// Cerrar la conexión a la base de datos
$conn->close();
?>

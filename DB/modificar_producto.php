<?php 

include "conexion.php";

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

$nombre = utf8_encode($_POST["nombreProducto"]);
$descripcion = utf8_encode($_POST["descripcionProducto"]);
$precio = $_POST["precioProducto"]; 

// Consulta SQL base
$sql = "UPDATE Productos SET nombre='$nombre',descripcion='$descripcion', precio='$precio'";

// Verificar si se ha subido una nueva foto
if(isset($_FILES["foto"]) && $_FILES["foto"]["error"] === UPLOAD_ERR_OK) {
    $archivoNombreOriginal = $_FILES["foto"]["name"];
    $archivoTempNombre = $_FILES["foto"]["tmp_name"];
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
    echo '<script>window.location = "../index.html";</script>';
    exit; // Salir del script después de la redirección
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>

<?php 

include "conexion.php";

// Verificar si la conexión se ha establecido correctamente
if ($conn) {
    echo "Conexión a la base de datos establecida correctamente.<br>";
} else {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

$nombre = utf8_encode($_POST["nombreProducto"]);
$foto = $_FILES["imagen"]; 
$descripcion = utf8_encode($_POST["descripcionProducto"]);
$precio = $_POST["precioProducto"]; 

// Tomar el valor de la cookie "empresa"
$empresa = $_COOKIE["empresa"];

if(isset($_FILES["foto"])) {
    if ($_FILES["foto"]["error"] === UPLOAD_ERR_OK) {
        $archivoNombreOriginal = $_FILES["foto"]["name"];
        $archivoTempNombre = $_FILES["foto"]["tmp_name"];
        // Obtener la extensión del archivo original
        $extension = pathinfo($archivoNombreOriginal, PATHINFO_EXTENSION);

        $directorioDestino = "productos/";
        // Ruta completa del archivo de destino
        $directorioDestinoCompleto = $directorioDestino . $nombre. "." . $extension;

        // Consulta SQL de inserción

        $directorioFinal = "DB/".$directorioDestinoCompleto;
        $sql = "INSERT INTO Productos (nombre, imagen, descripcion, precio, empresa)
                VALUES ('$nombre','$directorioFinal','$descripcion', '$precio', '$empresa')";
        // Mover el archivo a la carpeta de destino con el nuevo nombre
        if(move_uploaded_file($archivoTempNombre, $directorioDestinoCompleto)) {
            if ($conn->query($sql) === TRUE) {
                echo "Registro insertado correctamente.<br>";
                echo '<script>window.location = "../index.html";</script>';
                exit; // Salir del script después de la redirección
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            
        } else {
            echo "Error al mover el archivo.";
        }
    } else {
        echo "Error al subir el archivo: " . $_FILES["foto"]["error"];
    }
} else {
    echo "No se ha seleccionado ningún archivo.";
}
// Cerrar la conexión a la base de datos
$conn->close();
?>


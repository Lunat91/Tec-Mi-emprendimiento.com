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
    $nombre_producto = utf8_encode($_GET['nombre']);
} else {
    die("Error: nombre del producto no especificado en la URL.");
}

// Consulta SQL para eliminar la entrada con el nombre especificado
$sql = "DELETE FROM Productos WHERE nombre='$nombre_producto'";

if ($conn->query($sql) === TRUE) {
    echo "Entrada eliminada correctamente.<br>";
    echo '<script>window.location = "../index.html";</script>';
    exit; // Salir del script después de la redirección
} else {
    echo "Error al eliminar la entrada: " . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>

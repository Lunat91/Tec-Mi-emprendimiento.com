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
    $nombre_empresa = utf8_encode($_GET['nombre']);
} else {
    die("Error: nombre de la empresa no especificado en la URL.");
}

// Consulta SQL para eliminar las entradas de Empresa con el nombre especificado
$sql_empresa = "DELETE FROM Empresa WHERE Nombre='$nombre_empresa'";

// Consulta SQL para eliminar las entradas de Productos con la empresa especificada
$sql_productos = "DELETE FROM Productos WHERE empresa='$nombre_empresa'";

// Consulta SQL para eliminar las entradas de Usuarios relacionadas con la empresa
$sql_usuarios = "DELETE FROM Usuarios WHERE empresa='$nombre_empresa'";

// Ejecutar la consulta de Empresa
if ($conn->query($sql_empresa) === TRUE) {
    // Ejecutar la consulta de Productos si la de Empresa tuvo éxito
    if ($conn->query($sql_productos) === TRUE) {
        // Ejecutar la consulta de Usuarios si la de Productos tuvo éxito
        if ($conn->query($sql_usuarios) === TRUE) {
            echo "Entradas eliminadas correctamente.<br>";
            echo '<script>window.location = "../index.html";</script>';
            exit; // Salir del script después de la redirección
        } else {
            echo "Error al eliminar las entradas de Usuarios: " . $conn->error;
        }
    } else {
        echo "Error al eliminar las entradas de Productos: " . $conn->error;
    }
} else {
    echo "Error al eliminar las entradas de Empresa: " . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>

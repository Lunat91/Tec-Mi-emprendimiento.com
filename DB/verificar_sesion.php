<?php
include "conexion.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = array(); // Crear un array para almacenar la respuesta

// Verificar si las cookies de email y password están establecidas
if (isset($_COOKIE['email']) && isset($_COOKIE['password'])) {
    $correo = $_COOKIE['email'];
    $password = $_COOKIE['password'];

    // Prevenir inyecciones SQL usando prepared statements
    $stmt = $conn->prepare("SELECT nombre FROM Usuarios WHERE correo = ? AND password = ?");
    $stmt->bind_param("ss", $correo, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // Sesión activa, establecer la respuesta como sesionActiva = true y obtener el nombre del usuario
        $row = $result->fetch_assoc();
        $nombre = $row['nombre'];
        $response['sesionActiva'] = true;
        $response['nombreUsuario'] = $nombre;
    } else {
        // Sesión no activa, establecer la respuesta como sesionActiva = false
        $response['sesionActiva'] = false;
    }

    // Cerrar la conexión a la base de datos
    $stmt->close();
} else {
    // Si las cookies no están establecidas, establecer la respuesta como sesionActiva = false
    $response['sesionActiva'] = false;
}

// Convertir el array de respuesta a formato JSON y enviarlo
echo json_encode($response);

$conn->close();
?>




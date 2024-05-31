<?php 
include "conexion.php";

// Mostrar errores de PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar si la conexión se ha establecido correctamente
if ($conn) {
    echo "Conexión a la base de datos establecida correctamente.<br>";
} else {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

// Obtener el rol del formulario
$role = $_POST['role'];

echo $role;

// Obtener el nombre de la cookie
$nombre = $_COOKIE['nombre'];

// Verificar si el nombre existe en la base de datos
$sql = "SELECT * FROM Usuarios WHERE nombre='$nombre'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El nombre existe en la base de datos, actualizar el rol
    $row = $result->fetch_assoc();
    $userId = $row['id']; // Suponiendo que 'id' es la columna que identifica de manera única a cada usuario
    $sql = "UPDATE Usuarios SET rol='$role' WHERE id=$userId";

    if ($conn->query($sql) === TRUE) {
        echo "Rol actualizado correctamente para el usuario: $nombre";
        
        // Redirigir al usuario según el valor de la cookie
        if ($role === 'Consumidor') {
            header("Location: ../index.html");
            exit();
        } elseif ($role === 'Emprendedor') {
            header("Location: ../crearempresa.html");
            exit();
        } else {
            echo "Error: Rol no reconocido.";
        }
    } else {
        echo "Error al actualizar el rol: " . $conn->error;
    }
} else {
    echo "El nombre de usuario no existe en la base de datos.";
}

// Cerrar conexión
$conn->close();
?>
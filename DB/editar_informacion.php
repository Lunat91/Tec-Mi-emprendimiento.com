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

$nickname = utf8_encode($_POST["nickName"]);
$fullName = utf8_encode($_POST["fullName"]);
$correoUsuario = utf8_encode($_POST["correoUsuario"]);
$passwordUsuario = utf8_encode($_POST["passwordUsuario"]);
$celUsuario = utf8_encode($_POST["celUsuario"]);

// Obtener el valor de la cookie 'email'
$base = $_COOKIE["email"];


// Actualizar el nombre de la empresa en la tabla Productos
$sql = "UPDATE Usuarios SET nickname='$nickname',nombre='$fullName', correo='$correoUsuario', celular='$celUsuario', password='$passwordUsuario' WHERE correo='$base'";

if ($conn->query($sql) === TRUE) {
    echo "Registros de productos actualizados correctamente.<br>";
    // Crear la cookie 'email'
    setcookie("email", $correoUsuario, time() + (86400 * 30), "/"); // 30 días de duración
    // Crear la cookie 'password'
    setcookie("password", $passwordUsuario, time() + (86400 * 30), "/"); // 30 días de duración
    // Redirigir a Usuario.html usando JavaScript
    echo '<script>window.location.href = "../Usuario.html";</script>';
} else {
    echo "Error al actualizar los productos: " . $sql . "<br>" . $conn->error;
}


// Cerrar la conexión a la base de datos
$conn->close();
?>

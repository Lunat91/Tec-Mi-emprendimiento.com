<?php 
include "conexion.php";

// Verificar si la conexión se ha establecido correctamente
if ($conn) {
    echo "Conexión a la base de datos establecida correctamente.<br>";
} else {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

$nickname = utf8_encode($_POST["nickname"]);
$nombre = utf8_encode($_POST["nombre"]);
$celular = utf8_encode($_POST["celular"]);
$correo = utf8_encode($_POST["email"]);
$password = utf8_encode($_POST["password"]);

$sql = "INSERT INTO Usuarios (nickname, nombre, celular, correo, password)
                VALUES ('$nickname','$nombre','$celular', '$correo', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Registro insertado correctamente.<br>";

    // Crear cookies para las variables
    setcookie("nickname", $nickname, time() + (86400 * 30), "/");
    setcookie("nombre", $nombre, time() + (86400 * 30), "/");
    setcookie("celular", $celular, time() + (86400 * 30), "/");
    setcookie("email", $correo, time() + (86400 * 30), "/");
    setcookie("password", $password, time() + (86400 * 30), "/");

    // Redireccionar al usuario a empresa.html
    echo '<script>window.location = "../rol.html";</script>';
    exit; // Salir del script después de la redirección
} else {
    echo "error en el registro";
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
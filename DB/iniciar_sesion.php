<?php 
include "conexion.php";

// Verificar si la conexión se ha establecido correctamente
if ($conn) {
    echo "Conexión a la base de datos establecida correctamente.<br>";
} else {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

$correo = utf8_encode($_POST["email"]);
$password = utf8_encode($_POST["password"]);

// Prevenir inyecciones SQL usando prepared statements
$stmt = $conn->prepare("SELECT * FROM Usuarios WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['password'] === $password) {
        // Usuario y contraseña coinciden, establecer cookies y redirigir a index.html
        setcookie("email", $correo, time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie("password", $password, time() + (86400 * 30), "/");
        setcookie("empresa", $row['empresa'], time() + (86400 * 30), "/");
        header("Location: ../index.html");
        exit();
    } else {
        echo "<script>alert('Contraseña incorrecta.'); window.location.href = '../Iniciarsesion.html';</script>";
    }
} else {
    echo "<script>alert('Correo no encontrado.'); window.location.href = '../Iniciarsesion.html';</script>";
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
?>

<?php 

// Datos de conexión a la base de datos
$servername = "sql104.infinityfree.com";
$username = "if0_36562365";
$password = "PcwBMoh5bde77GH";
$database = "if0_36562365_Miemprendimiento";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos";
}

?>
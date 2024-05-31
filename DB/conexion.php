<?php 

// Datos de conexión a la base de datos
$servername = "sql104.infinityfree.com";
$username = "if0_36562365";
$password = "PcwBMoh5bde77GH";
$database = "if0_36562365_Miemprendimiento";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Establecer el conjunto de caracteres a UTF-8
if (!$conn->set_charset("utf8")) {
    printf("Error cargando el conjunto de caracteres utf8: %s\n", $conn->error);
    exit();
}
?>
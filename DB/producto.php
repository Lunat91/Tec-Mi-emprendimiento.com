<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "conexion.php";

// Verificar la conexión
if ($conn->connect_error) {
    $response = array("error" => "Conexión fallida: " . $conn->connect_error);
} else {
    // Consulta SQL
    $sql = "SELECT id, empresa, nombre, descripcion, imagen, precio FROM Productos";
    $result = $conn->query($sql);

    if (!$result) {
        $response = array("error" => "Error en la consulta: " . $conn->error);
    } else {
        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            $data = array();

            // Iterar sobre los resultados y agregarlos al array
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            // Establecer el array como respuesta
            $response = $data;
        } else {
            $response = array("mensaje" => "No se encontraron resultados.");
        }
    }
}

// Cerrar la conexión
$conn->close();

// Establecer el encabezado de respuesta como JSON
header('Content-Type: application/json; charset=utf-8');

// Imprimir el JSON
echo json_encode($response);
?>

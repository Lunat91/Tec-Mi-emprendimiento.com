<?php

include "conexion.php";

// Consulta SQL para seleccionar datos de la tabla de imágenes
$sql = "SELECT nombre, descripcion, imagen, precio FROM Productos";
$result = $conn->query($sql);

// Array para almacenar los datos de las imágenes
$productos  = array();

// Verificar si hay resultados y agregarlos al array de productos
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $producto = array(
            "nombre" => $row["nombre"],
            "descripcion" => $row["descripcion"],
            "imagen" => $row["imagen"],
            "precio" => $row["precio"]
        );
        array_push($productos, $producto);
    }
}

// Leer el contenido actual del archivo JSON
$archivo_json = 'galeria.json';
$json_existente = file_get_contents($archivo_json);
$datos_existente = json_decode($json_existente, true);

// Fusionar los datos nuevos con los datos existentes
$datos_actualizados = array_merge($datos_existente, array("productos" => $productos));

// Convertir los datos actualizados a formato JSON
$json_actualizado = json_encode($datos_actualizados, JSON_PRETTY_PRINT);

// Guardar el JSON actualizado en el archivo
file_put_contents($archivo_json, $json_actualizado);

echo "JSON actualizado y guardado en el archivo '$archivo_json'";

// Cerrar la conexión
$conn->close();
?>


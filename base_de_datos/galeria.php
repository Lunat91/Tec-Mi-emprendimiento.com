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

// Crear el JSON con los datos de los productos
$json_data = array("productos" => $productos);
$json_string = json_encode($json_data, JSON_PRETTY_PRINT);

// Guardar el JSON en un archivo
$archivo_json = 'productos.json';
file_put_contents($archivo_json, $json_string);

echo "JSON generado y guardado en el archivo '$archivo_json'";

// Cerrar la conexión
$conn->close();
?>


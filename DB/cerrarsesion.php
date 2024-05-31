<?php
// Obtener todas las cookies
$cookies = $_COOKIE;

// Recorrer todas las cookies y borrarlas una por una
foreach ($cookies as $cookie_name => $cookie_value) {
    // Configurar la expiración de la cookie en el pasado para eliminarla
    setcookie($cookie_name, '', time() - 3600, '/');
    // También es recomendable eliminar la cookie en el dominio y la ruta adecuados
    // Cambia '/' por la ruta correcta si tus cookies están configuradas en una ruta específica
}

// Redirigir a Iniciarsesion.html después de borrar las cookies
header("Location: ../Iniciarsesion.html");
exit(); // Terminar el script para evitar que se sigan ejecutando más instrucciones
?>

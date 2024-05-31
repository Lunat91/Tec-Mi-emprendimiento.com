<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se ha enviado el valor de búsqueda
    if(isset($_POST['buscar'])) {
        $buscar = $_POST['buscar'];
        setcookie('buscar', $buscar, time() + (86400 * 30), "/"); // La cookie expirará en 30 días     
        echo "<script>window.location.href = '../busqueda.html';</script>";   
    }
}
?>
<?php
include "conexion.php";

// Verificar si la conexión se ha establecido correctamente
if ($conn) {
    echo "Conexión a la base de datos establecida correctamente.<br>";
} else {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
}

// Obtener el nombre de la empresa desde el formulario
$nombre = utf8_encode($_POST["nombreEmpresa"]);
$foto = $_FILES["fotoEmpresa"]; 
$descripcion = utf8_encode($_POST["descripcionEmpresa"]);
$red = utf8_encode($_POST["redSocial"]); 

// Leer el valor del cookie de nombre
if(isset($_COOKIE["nombre"])) {
    $nombre_usuario = $_COOKIE["nombre"];
    // Consulta SQL para actualizar la columna de empresa en la tabla Usuarios
    $sql_update_usuario = "UPDATE Usuarios SET empresa = '$nombre' WHERE nombre = '$nombre_usuario'";
    // Ejecutar la consulta para actualizar la empresa del usuario
    if ($conn->query($sql_update_usuario) === TRUE) {
        echo "Empresa actualizada para el usuario: $nombre_usuario.<br>";
    } else {
        echo "Error al actualizar la empresa para el usuario: $nombre_usuario - " . $conn->error;
    }
} else {
    echo "No se ha encontrado el cookie de nombre.<br>";
}

// Verificar si se ha seleccionado un archivo para subir
if(isset($_FILES["fotoEmpresa"])) {
    if ($_FILES["fotoEmpresa"]["error"] === UPLOAD_ERR_OK) {
        $archivoNombreOriginal = $_FILES["fotoEmpresa"]["name"];
        $archivoTempNombre = $_FILES["fotoEmpresa"]["tmp_name"];
        // Obtener la extensión del archivo original
        $extension = pathinfo($archivoNombreOriginal, PATHINFO_EXTENSION);

        $directorioDestino = "logos/";
        // Ruta completa del archivo de destino
        $directorioDestinoCompleto = $directorioDestino . $nombre. "." . $extension;

        // Consulta SQL de inserción
        $directorioFinal = "DB/".$directorioDestinoCompleto;

        $sql = "INSERT INTO Empresa (Nombre, Logo, Descripcion, RedSocial)
                VALUES ('$nombre','$directorioFinal','$descripcion', '$red')";
        // Mover el archivo a la carpeta de destino con el nuevo nombre
        if(move_uploaded_file($archivoTempNombre, $directorioDestinoCompleto)) {
            if ($conn->query($sql) === TRUE) {
                echo "Registro insertado correctamente.<br>";

                // Crear cookie con el nombre de la empresa
                setcookie("empresa", $nombre, time() + (86400 * 30), "/"); // 86400 segundos = 1 día

                // Valores predeterminados para la inserción de productos
                $vacio = "Mi primer producto";
                $vacio2 = "Puedes modificar o eliminar este producto si deseas";
                $vacio3 = "1000";

                // Consulta SQL de inserción de producto predeterminado
                $sqlvacio = "INSERT INTO Productos (empresa, nombre, descripcion, imagen, precio)
                             VALUES ('$nombre','$vacio','$vacio2', '$directorioFinal', '$vacio3')";

                // Ejecutar la consulta de inserción de producto predeterminado
                if ($conn->query($sqlvacio) === TRUE) {
                    // Redireccionar al usuario a empresa.html
                    echo '<script>window.location = "../index.html";</script>';
                    exit; // Salir del script después de la redirección
                } else {
                    echo "Error al insertar el producto predeterminado: " . $conn->error;
                }
            } else {
                echo "Error al insertar el registro: " . $conn->error;
            }
        } else {
            echo "Error al mover el archivo.";
        }
    } else {
        echo "Error al subir el archivo: " . $_FILES["fotoEmpresa"]["error"];
    }
} else {
    echo "No se ha seleccionado ningún archivo.";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>


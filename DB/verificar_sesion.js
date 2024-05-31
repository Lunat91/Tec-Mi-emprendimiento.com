document.addEventListener("DOMContentLoaded", function() {
    verificarSesion();

    function verificarSesion() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const sesionActiva = JSON.parse(this.responseText).sesionActiva;

                const usuarioSesion = document.getElementById('usuario-sesion');

                if (sesionActiva) {
                } else {
                    // Sesión no activa, redirigir a la página de inicio de sesión
                    window.location.href = "Iniciarsesion.html";
                }
            }
        };
        xhttp.open("GET", "DB/verificar_sesion.php", true);
        xhttp.send();
    }
});

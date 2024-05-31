document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.column-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        var nickname = document.getElementById('nickname').value;
        var nombre = document.getElementById('nombre').value;
        var celular = document.getElementById('celular').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Obtener la fecha y hora actual
        var expirationDate = new Date();
        // Ajustar el tiempo de expiración a 5 minutos (5 * 60 segundos * 1000 milisegundos)
        expirationDate.setTime(expirationDate.getTime() + (5 * 60 * 1000));

        // Crear las cookies con los valores obtenidos y el tiempo de expiración adecuado
        document.cookie = "nickname=" + nickname + "; expires=" + expirationDate.toUTCString();
        document.cookie = "nombre=" + nombre + "; expires=" + expirationDate.toUTCString();
        document.cookie = "celular=" + celular + "; expires=" + expirationDate.toUTCString();
        document.cookie = "email=" + email + "; expires=" + expirationDate.toUTCString();
        document.cookie = "password=" + password + "; expires=" + expirationDate.toUTCString();

        // Redirigir a otra página
        window.location.href = "rol.html";
    });
});
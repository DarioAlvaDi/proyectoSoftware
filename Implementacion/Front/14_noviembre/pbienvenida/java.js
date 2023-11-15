// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene los botones por su ID
    var botonSesion = document.getElementById('Sesion');
    var botonRegistrar = document.getElementById('Registrar');

    // Función que maneja el evento de clic o toque y redirige a la otra página
    function redirigir(url) {
        window.location.href = url;
    }

    // Agrega eventos de clic o toque a los botones
    botonSesion.addEventListener('click', function() {
        redirigir('../login/Login.html');
    });

    botonSesion.addEventListener('touchend', function(event) {
        event.preventDefault();
        redirigir('../login/Login.html');
    });

    botonRegistrar.addEventListener('click', function() {
        redirigir('../pregistro/registro.html');
    });
});

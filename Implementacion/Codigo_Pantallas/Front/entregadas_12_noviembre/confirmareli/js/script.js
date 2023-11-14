document.getElementById('mostrarVentana').addEventListener('click', function() {
    document.getElementById('ventanaEmergente').style.display = 'flex';
});

document.getElementById('confirmar').addEventListener('click', function() {
    alert('Acción confirmada');
    cerrarVentanaEmergente();
});

document.getElementById('cancelar').addEventListener('click', function() {
    cerrarVentanaEmergente();
});

function cerrarVentanaEmergente() {
    document.getElementById('ventanaEmergente').style.display = 'none';
}

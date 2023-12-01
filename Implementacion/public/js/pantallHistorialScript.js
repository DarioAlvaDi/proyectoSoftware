
/*Obtener de la base de datos los sitios guardados */
document.addEventListener('DOMContentLoaded', () => {
    const historial = [
        {imagen: 'Friday', nombre: 'October 13, 2023'},
        {imagen: 'Saturday', nombre: 'October 14, 2023'},
        {imagen: 'Sunday', nombre: 'October 15, 2023'},
        {imagen: 'Monday', nombre: 'October 16, 2023'},
    ];

    /*let contenido=document.getElementById('contenido');
    if(historial.length==0){
        contenido.innerHTML=`<div class="container d-flex justify-content-center align-items-center">
        <div class="col-12  historial-container">
            <div class="historial-empty">
                <p>Historial se encuentra vacio</p>
            </div>
        </div>
    </div>`;
    }else{
        contenido.innerHTML=`<div class="col-12 center-items" style="margin-top: 0.5rem; z-index: 2;">
        <div id="selectedDayInfo"></div>
        <div id="historial"></div>
        </div>`;
    }*/ /*Prototipo para que si el historial no tiene lugares aparezca el mensaje de que esta vacio en caso contrario que aparezcan los lugares del historial*/



    const historialElement = document.getElementById('historial');
    let num=0;
    historial.forEach(nombre => {
    let nombreLugar="Nombre lugar";
    let nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add('resize');
    nuevoElemento.id="lugar"+num;

    nuevoElemento.innerHTML = `
    <div class="container rounded-pill border border-3 border-dark p-3 contenedorSitio">
        <div class="row">
            <div class="col text-center">
                <img src="img/Xochimilco.png" alt="busqueda" style="width:50%; height: 6rem">
            </div>
            <div class="col">
                <div class="row text-center">
                    <div class="col">
                        <p class="fw-bold nameSitio">`+historial[num].nombre+`</p>
                        <button class="detalles" onclick="window.location.href = '../PantallaActualizarDatos/PantallaActulizarDatos.html'">Detalles</button>
                    </div>
                    <div class="col-3">
                    <button id="eliminar`+num+`" class="boton-redondo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill eliminar" viewBox="0 0 16 16" style="margin-top:25%">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById("historial").appendChild(nuevoElemento);
    num++;
    });

    /*var body = document.getElementById("body");
    for(let i=0;i<historial.length;i++){
        body.innerHTML=`<script>document.getElementById('eliminar`+i+`').addEventListener('click', function() {
            document.getElementById('lugar`+i+`').innerHTML = '';});</script>`;
    }*/ /* Prototipo para que cada boton que se encuentra en los sitios pueda eliminar el sitio del historial*/

    document.getElementById('eliminar0').addEventListener('click', function() {
    document.getElementById('lugar0').innerHTML = '';});

    document.getElementById('eliminar1').addEventListener('click', function() {
    document.getElementById('lugar1').innerHTML = '';});

    document.getElementById('eliminar2').addEventListener('click', function() {
    document.getElementById('lugar2').innerHTML = '';});
    

    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        historialElement.innerHTML = '';
    });
});
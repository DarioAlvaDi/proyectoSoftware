function recargar(favoritos) {
    console.log("entro en la funcion" + favoritos);
    const contenido = document.getElementById('contenido');
    if (favoritos.length == 0) {
        contenido.innerHTML = '';
        contenido.innerHTML =
            `<div class="tab-container">
        <div class="tab-content">
            <div class="container d-flex justify-content-center align-items-center">
                <div class="col-12 favoritos-container">
                    <div class="tab-shadow">
                        <div class="favoritos-empty">    
                            <p>Favoritos se encuentra vacío</p>
                        </div>
                    </div> 
                </div>
            </div>
        </div> 
    </div>
    <footer class="fixed-bottom navColor">
    <div class="container-fluid " style="margin-bottom: 3rem">
        <div class="fondo-con-boton">
            <button  id='agregarBtn' type="button" class="boton-en-fondo">
                <a href="agregarfavoritos.html">
                    <img  src="../imgs/imgFavoritos/Agregar.png" alt="Descripción de la imagen del botón">
                </a>
            </button>
        </div></div>
    </footer>`;
    } else {
        contenido.innerHTML = '';
        contenido.innerHTML = `<div class="col-12 center-items" style="margin-top: 0.5rem; z-index: 2;">
        
        <div id="favoritos"></div>
        </div>`+
            `<footer class="fixed-bottom navColor">
        <div class="container-fluid " style="margin-bottom: 5.5rem">
        <div class="container-fluid fixed-bottom" style="margin-bottom: 2rem">
            <div class="row">    
                <div class="col-12 text-center"><button id="eliminarbtn" data-bs-toggle="modal" data-bs-target="#modalEliminarfavoritos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" style="margin-right: 10%">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>Eliminar Favoritos</button></div>    
                </div>
                <div class="fondo-con-boton">
                    <button  id='agregarBtn' type="button" class="boton-en-fondo">
                        <a href="agregarfavoritos.html">
                            <img  src="../imgs/imgFavoritos/Agregar.png" alt="Descripción de la imagen del botón">
                        </a>
                    </button>
                </div>
        </div>
        </div>
        </footer>`;
    } /*Prototipo para que si favoritos no tiene lugares aparezca el mensaje de que esta vacio en caso contrario que aparezcan los lugares del favoritos*/
}


document.addEventListener('DOMContentLoaded', () => {
    let favoritos = [{ imagen: 'Friday', nombre: 'taquitos de la esquina' },
    { imagen: 'Saturday', nombre: 'bellas artes' },
    { imagen: 'Sunday', nombre: 'zocalo' },
    { imagen: 'Monday', nombre: 'chapultepec' }];
    let contenido = document.getElementById('contenido');
    recargar(favoritos);
    let favoritosElement = document.getElementById('favoritos');
    let num = 0;
    favoritos.forEach(nombre => {

        let nombreLugar = "Nombre lugar";
        let nuevoElemento = document.createElement("div");
        nuevoElemento.classList.add('resize');
        nuevoElemento.id = "lugar" + num;
        nuevoElemento.innerHTML = `
        <div class="container rounded-pill border border-3 border-dark p-3 contenedorSitio">
            <div class="row">
                <div class="col text-center">
                    <img src="../imgs/imgFavoritos/Xochimilco.png" alt="busqueda" style="width:50%; height: 6rem">
                </div>
                <div class="col">
                    <div class="row text-center">
                        <div class="col">
                            <p class="fw-bold nameSitio">`+ favoritos[num].nombre + `</p>
                            <button class="detalles" onclick="window.location.href = '../PantallaActualizarDatos/PantallaActulizarDatos.html'">Detalles</button>
                        </div>
                        <div class="col-3">
                        <button id="eliminar`+ num + `" class="boton-redondo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill eliminar" viewBox="0 0 16 16" style="margin-top:25%">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                        </svg>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;
        document.getElementById("favoritos").appendChild(nuevoElemento);
        num++;
    });

    var body = document.getElementById("body");

    for (let i = 0; i < favoritos.length; i++) {
        document.getElementById(`eliminar${i}`).addEventListener('click', function () {
            document.getElementById(`lugar${i}`).innerHTML = '';
            favoritos.splice(i, 1);
            console.log('i= ' + i + ' num = ' + num);
            num--;
            if (num == 0) {
                console.log("num==0 favoritos = " + favoritos.length);
                favoritos.length = 0;
            }
            if (favoritos.length == 0) {
                console.log("entro en el if" + favoritos);
                recargar(favoritos);
            }
        });
    }
    /*const agregarBtn = document.getElementById('agregarBtn');
    
        agregarBtn.addEventListener('click', () => {
            num++;
            favoritos.push({imagen: 'Friday', nombre: 'October 13, 2023'});
            console.log("entro agregar boton" +num+favoritos);
            recargar(favoritos);
        });*/



    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        favoritosElement.innerHTML = '';
        favoritos.length = 0;
        recargar(favoritos);
    });
});


function colorear() {
    var color = document.getElementById('favorite');

    const modal3 = new bootstrap.Modal(document.getElementById('modal3'));
    const modal4 = new bootstrap.Modal(document.getElementById('modal4'));

    if (color.getAttribute("fill") !== "gold") {
        color.setAttribute("fill", "gold");
        modal3.toggle();
        agregarFavorito()
        setTimeout(() => {
            modal3.hide();
        }, 2000);

    }
    else {
        color.removeAttribute("fill");
        modal4.toggle();
        eliminarfavorito()
        setTimeout(() => {
            modal4.hide();
        }, 2000);
    }
}

function colorearf() {
    const color = document.getElementById('flag');
    const modal1 = new bootstrap.Modal(document.getElementById('modal1'));
    const modal2 = new bootstrap.Modal(document.getElementById('modal2'));

    if (color.getAttribute("fill") !== "rgb(19, 126, 176)") {
        color.setAttribute("fill", "rgb(19, 126, 176)");
        modal1.toggle();
        agregarHistorial()
        setTimeout(() => {
            modal1.hide();
        }, 2000);
    }
    else {
        color.removeAttribute("fill");
        modal2.toggle();
        eliminarHistorial()
        setTimeout(() => {
            modal2.hide();
        }, 2000);
    }
}
function eliminarHistorial() {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id')
    let data = { id: id }
    fetch('/turistas/eliminarFavoritosIndividual',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(function () {
    });
}
function agregarHistorial() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    let data = { id: id }
    fetch('/turistas/agregarHistorial',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}

function eliminarfavorito() {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id')
    let data = { id: id }
    fetch('/turistas/eliminarFavoritosIndividual',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(function () {
    });
}

function agregarFavorito() {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id')
    let data = { id: id }
    fetch('/turistas/agregarFavorito',
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id')
    service = new google.maps.places.PlacesService(
        document.createElement("div")
    );
    var request = {
        placeId: id,
        language: "es",
        fields: ["name", "rating", "opening_hours", "geometry", "photo"]
    };

    service.getDetails(request, callback);

    function callback(place, status) {
        console.log(place);
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            document.getElementById("nombre").innerHTML = place.name;
            document.getElementById("calificacion").innerHTML = place.rating + ' ☆';
            document.getElementById("nombre").innerHTML = place.name;
            if (place.opening_hours != undefined) {
                document.getElementById("lunes").innerHTML = place.opening_hours.weekday_text[0];
                document.getElementById("martes").innerHTML = place.opening_hours.weekday_text[1];
                document.getElementById("miercoles").innerHTML = place.opening_hours.weekday_text[2];
                document.getElementById("jueves").innerHTML = place.opening_hours.weekday_text[3];
                document.getElementById("viernes").innerHTML = place.opening_hours.weekday_text[4];
                document.getElementById("sabado").innerHTML = place.opening_hours.weekday_text[5];
                document.getElementById("domingo").innerHTML = place.opening_hours.weekday_text[6];
            }
            if (place.photos != undefined) {
                for (let i = 0; i < place.photos.length; i++) {
                    if (i == 0) {
                        document.getElementById("carrusel").innerHTML = document.getElementById("carrusel").innerHTML +
                            `
                        <div class="carousel-item active">
                            <img
                            src="`+ place.photos[i].getUrl({ maxWidth: 335, maxHeight: 400 }) + `"
                            class="d-block img-fluid"
                            alt="Imagen 1"
                            />
                        </div>
                        `
                    } else {
                        document.getElementById("carrusel").innerHTML = document.getElementById("carrusel").innerHTML +
                            `
                        <div class="carousel-item">
                            <img
                            src="`+ place.photos[i].getUrl({ maxWidth: 335, maxHeight: 400 }) + `"
                            class="d-block img-fluid"
                            alt="Imagen 1"
                            />
                        </div>
                        `
                    }
                }
            }

        }
    }

};

function calendario() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    window.location.href = "/turistas/calendario?id=" + id;
}

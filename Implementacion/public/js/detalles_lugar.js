function colorear() {
    var color = document.getElementById('favorite');
    if (color.getAttribute("fill") !== "gold") {
        color.setAttribute("fill", "gold");
    }
    else (color.removeAttribute("fill"));
}

function colorearf() {
    var color = document.getElementById('flag');
    if (color.getAttribute("fill") !== "rgb(19, 126, 176)") {
        color.setAttribute("fill", "rgb(19, 126, 176)");
    }
    else (color.removeAttribute("fill"));
}

fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAUvlCB-hBLbxN1Li2d8HwDANi4yLgmQ8I&location=-33.8670522,151.1957362&radius=5000&type=restaurant')
    .then(data => {
        return data.json()
    }).then(jsonData => {
        console.log(jsonData.results)
    }).catch(error => {
        console.log(error);
    }) 
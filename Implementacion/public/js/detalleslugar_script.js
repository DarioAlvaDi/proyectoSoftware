function colorear() {
    var color = document.getElementById('favorite');
    if (color.getAttribute("fill") !== "gold") {
        color.setAttribute("fill", "gold");
    }
    else (color.removeAttribute("fill"));
}

function colorearf() {
    var color = document.getElementById('flag');
    if (color.getAttribute("fill") !== "blue") {
        color.setAttribute("fill", "blue");
    }
    else (color.removeAttribute("fill"));
}

fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=school&location=19.504835%2C-99.147106&radius=1000&type=shopping_mall&key=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

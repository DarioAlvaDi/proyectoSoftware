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



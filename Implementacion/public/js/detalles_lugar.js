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


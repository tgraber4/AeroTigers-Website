var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");

// The donate URL, link-box text, and instructions file path are stored in
// ../data.json under "donateLink", "donateText", and "instructions-file".
var donateLink = "";
var instructionsFile = "";
fetch("../data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        donateLink = data.donateLink;
        instructionsFile = data["instructions-file"];
        document.getElementById("donateText").textContent = data.donateText;
    });

function box1Pressed(event) {
    window.location.href = donateLink;
}

function box2Pressed(event) {
    if (instructionsFile) window.open(instructionsFile, "_blank");
}

box1.addEventListener('click', box1Pressed);
box2.addEventListener('click', box2Pressed);

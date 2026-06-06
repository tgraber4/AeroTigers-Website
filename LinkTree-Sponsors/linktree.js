var box1 = document.getElementById("box1");

// The donate URL and button text are stored in ../data.json under
// "donateLink" and "donateText".
var donateLink = "";
fetch("../data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        donateLink = data.donateLink;
        document.getElementById("donateText").textContent = data.donateText;
    });

function box1Pressed(event) {
    window.location.href = donateLink;
}

box1.addEventListener('click', box1Pressed);

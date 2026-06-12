var imagecategory = localStorage.getItem("imagecategory") || "Normal";
var imageyear = localStorage.getItem("imageyear");
var currentFiles = JSON.parse(localStorage.getItem("currentFiles") || "{}");
var fileList = currentFiles[imagecategory] || [];
var maxnum = fileList.length;
var photoTypes = []; // loaded from ../data.json ("photoTypes")

// photos.js tracks Normal and Competition positions separately
var numkey = (imagecategory === "Normal") ? "imagenum1" : "imagenum2";
var currentnum = Number(localStorage.getItem(numkey)) || 1;

var imageShown = document.getElementById("image1");
var prevBtn = document.getElementById("prevbtn");
var nextBtn = document.getElementById("nextbtn");
var counter = document.getElementById("photocounter");
var viewer = document.getElementById("viewer");

function currentImageType() {
    if (photoTypes.length > 0 && fileList.length > 0) {
        return photoTypes[fileList[currentnum - 1]];
    }
    return localStorage.getItem("imagetype");
}

function updateDisplay() {
    var type = currentImageType();
    imageShown.src = "../Images/" + imageyear + " Photos/" + imagecategory + "/" + currentnum + "." + type;
    counter.textContent = (maxnum > 0) ? currentnum + " / " + maxnum : "";
    prevBtn.classList.toggle("disabled", currentnum <= 1);
    nextBtn.classList.toggle("disabled", maxnum === 0 || currentnum >= maxnum);
    // Keep the gallery page in sync so it shows this image when closed
    localStorage.setItem(numkey, currentnum);
    if (type) {
        localStorage.setItem("imagetype", type);
    }
}

function showPrev() {
    if (currentnum > 1) {
        currentnum -= 1;
        updateDisplay();
    }
}
function showNext() {
    if (currentnum < maxnum) {
        currentnum += 1;
        updateDisplay();
    }
}

prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
        showPrev();
    } else if (e.key === "ArrowRight") {
        showNext();
    } else if (e.key === "Escape" && !document.fullscreenElement) {
        window.location.href = "photos.html";
    }
});

// Swipe left/right on mobile
var touchStartX = null;
viewer.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
}, { passive: true });
viewer.addEventListener("touchend", function (e) {
    if (touchStartX === null) {
        return;
    }
    var dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (dx > 50) {
        showPrev();
    } else if (dx < -50) {
        showNext();
    }
}, { passive: true });

document.getElementById("fullscreen").addEventListener("click", function () {
    if (imageShown.requestFullscreen) {
        imageShown.requestFullscreen();
    } else if (imageShown.webkitRequestFullscreen) { /* Safari */
        imageShown.webkitRequestFullscreen();
    } else if (imageShown.msRequestFullscreen) { /* IE11 */
        imageShown.msRequestFullscreen();
    }
});

updateDisplay();

fetch("../data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        photoTypes = data.photoTypes;
        updateDisplay();
    });

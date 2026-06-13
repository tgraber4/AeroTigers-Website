// Prefer the URL (?year=&cat=&num=&type=) so a shared link shows the same
// photo; fall back to localStorage for the normal in-site flow.
var params = new URLSearchParams(window.location.search);

var imagecategory = params.get("cat") || localStorage.getItem("imagecategory") || "Normal";
var imageyear = params.get("year") || localStorage.getItem("imageyear");
var urlType = params.get("type");
var currentFiles = JSON.parse(localStorage.getItem("currentFiles") || "{}");
var fileList = currentFiles[imagecategory] || [];
var maxnum = fileList.length;
var photoTypes = []; // loaded from ../data.json ("photoTypes")

// photos.js tracks Normal and Competition positions separately
var numkey = (imagecategory === "Normal") ? "imagenum1" : "imagenum2";
var currentnum = Number(params.get("num")) || Number(localStorage.getItem(numkey)) || 1;

// Extensions already tried for the current image (used by the error fallback
// below to resolve the right file type for shared links without currentFiles).
var triedTypes = [];

var imageShown = document.getElementById("image1");
var prevBtn = document.getElementById("prevbtn");
var nextBtn = document.getElementById("nextbtn");
var counter = document.getElementById("photocounter");
var viewer = document.getElementById("viewer");

function imagePath(type) {
    return "../Images/" + imageyear + " Photos/" + imagecategory + "/" + currentnum + "." + type;
}

function currentImageType() {
    if (photoTypes.length > 0 && fileList.length > 0 && fileList[currentnum - 1] >= 0) {
        return photoTypes[fileList[currentnum - 1]];
    }
    return urlType || localStorage.getItem("imagetype");
}

// When opened from a shared URL we don't have currentFiles, so the exact file
// extension may be unknown or wrong. If the image fails to load, try the other
// known extensions before giving up.
imageShown.addEventListener("error", function () {
    for (var i = 0; i < photoTypes.length; i++) {
        if (triedTypes.indexOf(photoTypes[i]) === -1) {
            triedTypes.push(photoTypes[i]);
            imageShown.src = imagePath(photoTypes[i]);
            return;
        }
    }
});

function syncUrl() {
    var qs = "?year=" + encodeURIComponent(imageyear) +
             "&cat=" + encodeURIComponent(imagecategory) +
             "&num=" + currentnum;
    var type = currentImageType();
    if (type) {
        qs += "&type=" + encodeURIComponent(type);
    }
    history.replaceState(null, "", qs);
}

function updateDisplay() {
    var type = currentImageType() || photoTypes[0];
    triedTypes = type ? [type] : [];
    imageShown.src = imagePath(type);
    counter.textContent = (maxnum > 0) ? currentnum + " / " + maxnum : "";
    prevBtn.classList.toggle("disabled", currentnum <= 1);
    nextBtn.classList.toggle("disabled", maxnum === 0 || currentnum >= maxnum);
    // Keep the gallery page in sync so it shows this image when closed
    localStorage.setItem(numkey, currentnum);
    if (type) {
        localStorage.setItem("imagetype", type);
    }
    // Keep the address bar in sync so sharing mid-navigation works too
    if (imageyear) {
        syncUrl();
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
        // Shared links have no currentFiles, so get the photo count for this
        // year/category straight from data.json.
        if (maxnum === 0 && imageyear) {
            var entry = data.photos.filter(function (p) {
                return String(p.year) === String(imageyear);
            })[0];
            if (entry) {
                maxnum = (imagecategory === "Competition") ? entry.competitionCount : entry.normalCount;
            }
        }
        updateDisplay();
    });

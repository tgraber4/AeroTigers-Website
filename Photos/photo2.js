let imagecategory = localStorage.getItem("imagecategory");
let currentnum = 0;
if (imagecategory === "Normal") {
    currentnum = Number(localStorage.getItem("imagenum1"));
} else {
    currentnum = Number(localStorage.getItem("imagenum2"));
}
let imageyear = localStorage.getItem("imageyear");
let imagetype = localStorage.getItem("imagetype");
var imageShown = document.getElementById("image1");
var Backarrow = document.getElementById("backarrow");
imageShown.src = "../Images/" + imageyear + " Photos/" + imagecategory + "/" + currentnum + "." + imagetype;

function openFullscreen() {
    if (imageShown.requestFullscreen) {
        imageShown.requestFullscreen();
    } else if (Image1.webkitRequestFullscreen) { /* Safari */
        imageShown.webkitRequestFullscreen();
    } else if (Image1.msRequestFullscreen) { /* IE11 */
        imageShown.msRequestFullscreen();
    }
  }
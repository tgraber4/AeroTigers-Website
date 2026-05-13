var check = ["imageyear", "imagenum1", "imagenum2", "imagecategory", "imagetype", "currentFiles"];
for (var i = 0; i < check.length; i++) {
    if (localStorage.getItem(check[i]) != null) {
        localStorage.removeItem(check[i]);
    }
}
var navLinks = document.getElementById("navLinks");
var updateDisplay1 = function () {
    navLinks.style.display = "none";
}
var hideMenu = function () {
    navLinks.style.animation="turn2 1s ease 1";
    navLinks.style.right = "-200px";
    var run = setTimeout(updateDisplay1, 1100);
}
var showMenu = function () {
    navLinks.style.display = "initial";
    navLinks.style.animation="turn1 1s ease 1";
    navLinks.style.right = "0px";
}

var scollFunction = function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}



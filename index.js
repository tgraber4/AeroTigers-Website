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

// insertContentBlock("Title", "Description", "./path/to/file", "image" or "video")
// For "video", a YouTube embed URL (contains "youtube.com") is rendered in an
// iframe; any other src is treated as a direct video file (mp4).
var insertContentBlock = function (title, description, src, type) {
    var block = document.createElement("div");
    block.setAttribute("class", "placeholder1");

    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(title));
    block.appendChild(h2);

    var textholder = document.createElement("div");
    textholder.setAttribute("class", "textholder");
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(description));
    textholder.appendChild(p);
    block.appendChild(textholder);

    if (type === "image") {
        var img = document.createElement("img");
        img.src = src;
        block.appendChild(img);
    } else if (type === "video") {
        if (src.includes("youtube.com")) {
            var iframe = document.createElement("iframe");
            iframe.width = 600;
            iframe.height = 380;
            iframe.setAttribute("frameborder", 0);
            iframe.setAttribute("allowfullscreen", true);
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.src = src;
            block.appendChild(iframe);
        } else {
            var video = document.createElement("video");
            video.width = 600;
            video.height = 380;
            video.controls = true;
            var source = document.createElement("source");
            source.src = src;
            source.type = "video/mp4";
            video.appendChild(source);
            block.appendChild(video);
        }
    }

    var bottom = document.querySelector(".bottom");
    bottom.parentNode.insertBefore(block, bottom);
}



fetch("./data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        for (var i = 0; i < data.homeContent.length; i++) {
            var c = data.homeContent[i];
            insertContentBlock(c.title, c.description, c.src, c.type);
        }
    });
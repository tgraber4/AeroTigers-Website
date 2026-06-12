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

// Rows fade in the first time they enter the viewport (or are scrolled past).
var pendingRows = [];
var revealRows = function () {
    for (var i = pendingRows.length - 1; i >= 0; i--) {
        if (pendingRows[i].getBoundingClientRect().top < window.innerHeight * 0.85) {
            pendingRows[i].classList.add("visible");
            pendingRows.splice(i, 1);
        }
    }
};
window.addEventListener("scroll", revealRows, { passive: true });
window.addEventListener("resize", revealRows);

// insertContentBlock("Title", "Description", "./path/to/file", "image" or "video", index)
// For "video", a YouTube embed URL (contains "youtube.com") is rendered in an
// iframe; any other src is treated as a direct video file (mp4).
// Odd-indexed rows are flipped (media on the right) for a zig-zag layout.
var insertContentBlock = function (title, description, src, type, index) {
    var alt = index % 2 === 1;

    var band = document.createElement("section");
    band.setAttribute("class", "content-band" + (alt ? " alt" : ""));

    var row = document.createElement("div");
    row.setAttribute("class", "content-row" + (alt ? " reverse" : ""));
    band.appendChild(row);

    var media = document.createElement("div");
    media.setAttribute("class", "content-media");
    if (type === "image") {
        var img = document.createElement("img");
        img.src = src;
        img.alt = title;
        media.appendChild(img);
    } else if (type === "video") {
        if (src.includes("youtube.com")) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("frameborder", 0);
            iframe.setAttribute("allowfullscreen", true);
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.src = src;
            media.appendChild(iframe);
        } else {
            var video = document.createElement("video");
            video.controls = true;
            var source = document.createElement("source");
            source.src = src;
            source.type = "video/mp4";
            video.appendChild(source);
            media.appendChild(video);
        }
    }
    row.appendChild(media);

    var text = document.createElement("div");
    text.setAttribute("class", "content-text");
    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(title));
    text.appendChild(h2);
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(description));
    text.appendChild(p);
    row.appendChild(text);

    var bottom = document.querySelector(".bottom");
    bottom.parentNode.insertBefore(band, bottom);

    pendingRows.push(row);
    revealRows();
}



fetch("./data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        for (var i = 0; i < data.homeContent.length; i++) {
            var c = data.homeContent[i];
            insertContentBlock(c.title, c.description, c.src, c.type, i);
        }
    });
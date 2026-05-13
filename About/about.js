var head = document.getElementById("head");
const box = document.getElementById("whitebox");
const about = document.getElementById("about");
var headheight = head.getBoundingClientRect().height;


// padding for the p in the element with class "whitebox"
var bottomPadding = 20;


var updateHeadHeight = function () {
    headheight = head.getBoundingClientRect().height;
}

/*
adjustFontSize
- When the user resizes the window, this function changes the font size of the history paragraph. This 
helps with making sure the text doesn't overflow the white box.
*/
const adjustFontSize = () => {
    let fontSize = 24;
    about.style.fontSize = `${fontSize}px`;
    while ((about.scrollHeight + headheight + bottomPadding) > box.clientHeight) {
        console.log("wat")
        fontSize -= 0.1; 
        about.style.fontSize = `${fontSize}px`;
        if (fontSize <= 10) break; 
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("resize", adjustFontSize);
    adjustFontSize();
    window.addEventListener("resize", updateHeadHeight);
});


var pastComp = function () {
    window.location.href="about2.html";
}



// <p>Mizzou AeroTigers Alumni have gone on to work at companies like Boeing, Textron, Spirit, and Northrop Grumman. We have an extensive network of alumni who have accomplished some amazing feats due to their time at Mizzou AeroTigers.</p>




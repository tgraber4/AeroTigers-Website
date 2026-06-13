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


/*
Dynamic "third year" word in the history paragraph.
The Mizzou AeroTigers' first academic year was 2022-2023, so this counts how
many academic years in we are and writes the matching ordinal word (e.g.
"third") into the <span id="recognitionYear">. Academic years are treated as
rolling over in August. If you count from a different season, change
FIRST_ACADEMIC_YEAR (the start calendar year of year #1).
*/
var FIRST_ACADEMIC_YEAR = 2022; // 2022-2023 = "first"

var recognitionYearWord = function () {
    var now = new Date();
    // From August (month index 7) onward, the new academic year has begun.
    var academicStartYear = (now.getMonth() >= 7) ? now.getFullYear() : now.getFullYear() - 1;
    var n = academicStartYear - FIRST_ACADEMIC_YEAR + 1;
    if (n < 1) {
        n = 1;
    }
    var words = ["first", "second", "third", "fourth", "fifth", "sixth",
                 "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];
    return words[n - 1] || (n + "th");
};

var recognitionYearEl = document.getElementById("recognitionYear");
if (recognitionYearEl) {
    recognitionYearEl.textContent = recognitionYearWord();
}



// <p>Mizzou AeroTigers Alumni have gone on to work at companies like Boeing, Textron, Spirit, and Northrop Grumman. We have an extensive network of alumni who have accomplished some amazing feats due to their time at Mizzou AeroTigers.</p>




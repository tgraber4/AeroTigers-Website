var photosdata = [];

/* 
----- Adding Instructions -----
var insertVideo# = [[]]
photosdata.push([(Year), (# of normal photos), (name of video variable), (# of competition photos)]);
*/

var insertVideos3 = [["Test Flight",  "Check out our first flight attempt for our 2024-2025 Plane!", "https://www.youtube.com/embed/sa56r8oEJpA?si=7Zou6wSZUh_eXJOq"]];
photosdata.push(["2024-2025", 10, insertVideos3, 9]);

var insertVideos2 = [["Test Flight", "Check out this cool video of our 2023-2024 Plane!", "https://www.youtube.com/embed/0XxYHCxHvfU?si=J-dg1tc7vAyeLwsZ"]];
photosdata.push(["2023-2024", 9, insertVideos2, 10]);
var insertVideos1 = [["Test Flight", "Check out this cool video of our 2022-2023 Plane!", "../Videos/Old-Testflight-1.mp4"]];
photosdata.push(["2022-2023", 9, insertVideos1, 6]);





var photoTypes = ["jpg", "png", "jpeg", "webp"]; // add to this if any more photo file types are found

var currentFileList = {}; // Contains the file types for each image for that year
var enlargeUsed = 0;

var PhotoNum1 = document.getElementById("photo_number1");
var LeftButton1 = document.getElementById("leftbutton1");
var RightButton1 = document.getElementById("rightbutton1");
var Image1 = document.getElementById("image1");

var PhotoNum2 = document.getElementById("photo_number2");
var LeftButton2 = document.getElementById("leftbutton2");
var RightButton2 = document.getElementById("rightbutton2");
var Image2 = document.getElementById("image2");

var currentnum1 = 1;
var currentnum2 = 1;
var selectnum = 0;
var currentVideos = [];

var scollFunction = function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

if (localStorage.getItem("imagenum1") != null && localStorage.getItem("imagecategory") != null) {
    currentnum1 = Number(localStorage.getItem("imagenum1"));
    currentnum2 = Number(localStorage.getItem("imagenum2"));
  if (localStorage.getItem("imagecategory") === "Competition") {
    setTimeout(scollFunction, 100);
  }
  currentFileList = JSON.parse(localStorage.getItem("currentFiles"));
  enlargeUsed = 1;
} 
if (localStorage.getItem("imageyear") != null) {
  for (var i = 0; i < photosdata.length; i++) {
    if (localStorage.getItem("imageyear") == photosdata[i][0]) {
      selectnum = i;
    }
  }
}



var maxImgNum1 = photosdata[selectnum][1];
var maxImgNum2 = photosdata[selectnum][3];

var addOption = function (text) {
  const option1 = document.createElement("option");

  const node1 = document.createTextNode(text);

  option1.appendChild(node1);

  var element = document.getElementById("selectContainer");

  element.appendChild(option1);
}

for (var i = 0; i < photosdata.length; i++) {
  addOption(photosdata[i][0]);
}

function checkIfImageExists(url, j, i, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true, j, i);
  } else {
    img.onload = () => {
      callback(true, j, i);
    };
    
    img.onerror = () => {
      callback(false, j, i);
    };
  }
}
// updateImageTypes() --> determines what image types each image will be (Ex: png, jpg)
var updateImageTypes = function () {
  currentFileList = {};
  var tempArray = [];
  for (var i = 0; i < photosdata[selectnum][1]; i++) {
    tempArray.push(-1);
  }
  currentFileList["Normal"] = tempArray;
  tempArray = [];
  for (var i = 0; i < photosdata[selectnum][3]; i++) {
    tempArray.push(-1);
  }
  currentFileList["Competition"] = tempArray;
  for (var j = 1; j <= maxImgNum1; j++) {
    for (var i = 0; i < photoTypes.length; i++) {
      checkIfImageExists("../Images/" + photosdata[selectnum][0] + " Photos/Normal/" + j + "." + photoTypes[i], j, i, (exists, correctj, correcti) => {
        if (exists) {
          currentFileList["Normal"][correctj - 1] = correcti;
        } else {
          console.clear();
        }
      });
    }
  }
  for (var j = 1; j <= maxImgNum2; j++) {
    for (var i = 0; i < photoTypes.length; i++) {
      checkIfImageExists("../Images/" + photosdata[selectnum][0] + " Photos/Competition/" + j + "." + photoTypes[i], j, i, (exists, correctj, correcti) => {
        if (exists) {
          currentFileList["Competition"][correctj - 1] = correcti;
        } else {
          console.clear();
        }
      });
    }
  }
}


var StartLoadingAnimation = function () {
  var photoMain = document.getElementById("photomain");
  photoMain.style.display = "None";
  var loading = document.getElementById("loading");
  loading.style.display = "flex";
}
var RemoveLoadingAnimation = function () {
  var photoMain = document.getElementById("photomain");
  photoMain.style.display = "initial";
  var loading = document.getElementById("loading");
  loading.style.display = "None";
}

var UpdateDisplay = function () {
  RemoveLoadingAnimation();
  Image1.src = "../Images/" + photosdata[selectnum][0] + " Photos/Normal/" + currentnum1 + "." + photoTypes[currentFileList["Normal"][currentnum1 - 1]];
  PhotoNum1.innerHTML = currentnum1 + " / " + maxImgNum1;
  if (maxImgNum2 > 0) {
    Image2.src = "../Images/" + photosdata[selectnum][0] + " Photos/Competition/" + currentnum2 + "." + photoTypes[currentFileList["Competition"][currentnum2 - 1]];
    PhotoNum2.innerHTML = currentnum2 + " / " + maxImgNum2;
  }
}
var checkForDisplay = function () {
  var checker = 1;
  if (currentFileList["Normal"].includes(-1) === true) {
    checker = 0;
  }
  if (maxImgNum2 > 0) {
    if (currentFileList["Competition"].includes(-1) === true) {
      checker = 0;
    }
  }
  if (checker === 1) {
    UpdateDisplay();
  } else {
    StartLoadingAnimation();
    setTimeout(checkForDisplay, 250);
  }
}
var UpdateComp = function () {
  const compholder = document.getElementById("compholder");
  if (maxImgNum2 === 0) {
    compholder.style.display = "none";
  } else {
    compholder.style.display = "initial";
  }
}

/*
Checks if list of image types is empty or not
*/
if (currentFileList["Normal"] === undefined) {
  updateImageTypes();
}


/*
Checks if user just came from enlarging the image (photo2.html)
*/
if (enlargeUsed === 0) {
  StartLoadingAnimation();
  setTimeout(checkForDisplay, 250);
} else {
  UpdateDisplay();
}


UpdateComp();

var UpdateYear = function (value) {
  for (var i = 0; i < photosdata.length; i++) {
    if (photosdata[i][0] === value) {
      currentnum1 = 1;
      currentnum2 = 1;
      selectnum = i;
      maxImgNum1 = photosdata[selectnum][1];
      maxImgNum2 = photosdata[selectnum][3];
      if (localStorage.getItem("imagenum1") != null  && localStorage.getItem("imagecategory") != null) {
        localStorage.removeItem("imagenum1");
        localStorage.removeItem("imagenum2");
        localStorage.removeItem("imagecategory");
      }
      localStorage.setItem("imageyear", photosdata[selectnum][0]);
      removeVideos();
      for (var j = 0; j < photosdata[i][2].length; j++) {
        addVideo(photosdata[i][2][j][0], photosdata[i][2][j][1], photosdata[i][2][j][2]);
      }
      UpdateComp();
    }
  }
  updateImageTypes();
  StartLoadingAnimation();
  setTimeout(checkForDisplay, 250); 
}

function LeftPressed(num) {
  if (currentnum1 > 1 && num === 1) {
    currentnum1-= 1;
    UpdateDisplay();
  } else if (currentnum2 > 1 && num === 2) {
    currentnum2-= 1;
    UpdateDisplay();
  }
}
LeftButton1.addEventListener('click', function() {
  LeftPressed(1);
});
LeftButton2.addEventListener('click', function() {
  LeftPressed(2);
});

function RightPressed(num) {
  if (currentnum1 < maxImgNum1 && num === 1) {
    currentnum1+= 1;
    UpdateDisplay();
  } else if (currentnum2 < maxImgNum2 && num === 2) {
    currentnum2+= 1;
    UpdateDisplay();
  }
}
  
RightButton1.addEventListener('click', function() {
  RightPressed(1);
});
RightButton2.addEventListener('click', function() {
  RightPressed(2);
});

function ImagePressed(num) {
  if (num === 1) {
    localStorage.setItem("imagecategory", "Normal");
    localStorage.setItem("imagetype", photoTypes[currentFileList["Normal"][currentnum1 - 1]]);
  } else if (num === 2) {
    localStorage.setItem("imagecategory", "Competition");
    localStorage.setItem("imagetype", photoTypes[currentFileList["Competition"][currentnum2 - 1]]);
  }
  localStorage.setItem("imagenum1", currentnum1);
  localStorage.setItem("imagenum2", currentnum2);
  localStorage.setItem("imageyear", photosdata[selectnum][0]);
  localStorage.setItem("currentFiles", JSON.stringify(currentFileList));
}

Image1.addEventListener('click', function() {
  ImagePressed(1);
});
Image2.addEventListener('click', function() {
  ImagePressed(2);
});
var videonum = 1;
var makeYoutubeVideo = function (link) {
  const iframe1 = document.createElement("iframe");

  iframe1.setAttribute("allowfullscreen", true);
  iframe1.setAttribute("height", 400);
  iframe1.setAttribute("width", 600);
  iframe1.setAttribute("class", "video1");
  iframe1.style.marginTop = "20px";
  iframe1.setAttribute("frameborder", 0);
  iframe1.setAttribute("rel", 0);
  iframe1.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe1.src = link;

  return iframe1;
}
var addVideo = function (title, description, videosrc) {
  var video1;
  var source1;
  if (videosrc.includes("www.youtube.com")) {
    video1 = makeYoutubeVideo(videosrc);
  } else {
    video1 = document.createElement("video");

    video1.setAttribute("controls", true);

    video1.setAttribute("height", 400);

    video1.setAttribute("width", 600);

    video1.setAttribute("class", "video1");

    source1 = document.createElement("source");

    source1.src = videosrc;

    source1.type = "video/mp4";

    video1.appendChild(source1);
  }
  const div1 = document.createElement("div");

  div1.id = "videodiv" + videonum;

  currentVideos.push("videodiv" + videonum);

  div1.setAttribute("class", "videocenter");

  const p1 = document.createElement("p");

  p1.id = "p1" + videonum;

  currentVideos.push("p1" + videonum);

  const node2 = document.createTextNode(description);

  p1.appendChild(node2);

  p1.setAttribute("class", "video-title");

  const h41 = document.createElement("h4");

  h41.id = "h41" + videonum;

  currentVideos.push("h41" + videonum);

  const node1 = document.createTextNode(title);

  h41.appendChild(node1);

  div1.appendChild(video1);

  var element = document.getElementById("videoholder");

  element.appendChild(h41);

  element.appendChild(p1);

  element.appendChild(div1);

  videonum++;
}

for (var j = 0; j < photosdata[selectnum][2].length; j++) {
  addVideo(photosdata[selectnum][2][j][0], photosdata[selectnum][2][j][1], photosdata[selectnum][2][j][2]);
}
var removeVideos = function () {
  for (var k = 0; k < currentVideos.length; k++) {
    const temp = document.getElementById(currentVideos[k]);
    temp.remove();
  }
  currentVideos = [];
}



// ------- Yellow Select -------
/*
UpdateYear()
  - This is where your function should go
a.innerText = photosdata[selectnum][0];
  - This is how you update the select box naturally showing up as
*/
var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            UpdateYear(this.innerText); 
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
a.innerText = photosdata[selectnum][0];
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);
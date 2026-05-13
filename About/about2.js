
var dictlist = [];
var currelem = [];
var adder = function (year, president, vicepres, teams, prop, report, dbf, updates) {
    var tempdict = {};
    tempdict["year"] = year;
    tempdict["president"] = president;
    tempdict["vicepres"] = vicepres;
    tempdict["teams"] = teams;
    tempdict["prop"] = prop;
    tempdict["report"] = report;
    tempdict["dbf"] = dbf;
    tempdict["updates"] = updates;
    dictlist.push(tempdict);
}
/*
---------------------- Add to Past Competitions Here ----------------------

 (-) Add to the top of the list (look at how the years descend)
*/ 


// adder("year", "president", "vice president", "list of team leads", "proposal score", "report score", "fly-off score", "list of updates(if any)") 
// - put "N/A" if no updates

adder("2024 - 2025", "Michael Mischkot", "Ryan Carlson", ["Aidan Chastain", "Tyler Graber"], "60th / 159", "69th / 111", "85th / 96", "N/A");
adder("2023 - 2024", "Graham Bond", "Luke Sanders", ["Logan Frommelt", "Michael Mischkot", "Landon Toler"], "2nd / 149", "10th / 107", "65th / 93", "Mizzou AeroTigers Co. founded as a 501(c)(3) nonprofit corporation");
adder("2022 - 2023", "Landon Toler", "Lane Atchison", ["Graham Bond", "Sam Janavicius", "Joe Jenner", "Sam Kaplan", "Luke Sanders"], "38th / 135", "88th / 110", "63rd / 81", ["AeroTigers founded as a Recognized Student Organization.", "Recognized as a finalist in \"Best New Student Organization\" by the Organizational Resource Group."]);

var pages = Math.ceil((dictlist.length + 1) / 2);
var currentpage = 1;
var pager = document.getElementById("pager");
pager.innerHTML = currentpage + " / " + pages;

var createp = function (text, item) {
    const p6 = document.createElement("p");

    const node6 = document.createTextNode(text);

    p6.appendChild(node6);

    item.appendChild(p6);
}
var createh3 = function (text, item) {

    const h32 = document.createElement("h3");

    const node17 = document.createTextNode(text);

    h32.appendChild(node17);

    item.appendChild(h32);
}

var createItem1 = function (num) { 

    var sect1 = document.getElementById("sect1");

    var element = document.createElement("div");

    const div11 = document.createElement("div");

    div11.classList.add("gap");

    const div10 = document.createElement("div");

    div10.classList.add("gap");

    const div9 = document.createElement("div");

    div9.classList.add("flexbox");

    const div8 = document.createElement("div");

    div8.classList.add("gap");

    const div7 = document.createElement("div");

    div7.classList.add("flexbox");

    const h21 = document.createElement("h2");

    const node15 = document.createTextNode(dictlist[num].year);

    h21.appendChild(node15);

    const div6 = document.createElement("div");

    div6.classList.add("team");

    const div5 = document.createElement("div");

    div5.classList.add("team");

    const div4 = document.createElement("div");

    div4.classList.add("team");

    const div3 = document.createElement("div");

    div3.classList.add("team");

    const div2 = document.createElement("div");

    div2.classList.add("team");

    const div1 = document.createElement("div");

    div1.classList.add("team");

    const p14 = document.createElement("p");

    const node14 = document.createTextNode(dictlist[num].dbf);

    p14.appendChild(node14);

    const p13 = document.createElement("p");

    const node13 = document.createTextNode("Fly-Off");

    p13.appendChild(node13);

    p13.classList.add("title2");

    const p12 = document.createElement("p");

    const node12 = document.createTextNode(dictlist[num].report);

    p12.appendChild(node12);

    const p11 = document.createElement("p");

    const node11 = document.createTextNode("Design Report");

    p11.appendChild(node11);

    p11.classList.add("title2");

    const p10 = document.createElement("p");

    const node10 = document.createTextNode(dictlist[num].prop);

    p10.appendChild(node10);

    const p9 = document.createElement("p");

    const node9 = document.createTextNode("Design Proposal");

    p9.appendChild(node9);

    p9.classList.add("title2");

    const p5 = document.createElement("p");

    const node5 = document.createTextNode("Team Leads");

    p5.appendChild(node5);

    p5.classList.add("title");

    const p4 = document.createElement("p");

    const node4 = document.createTextNode(dictlist[num].vicepres);

    p4.appendChild(node4);

    const p3 = document.createElement("p");

    const node3 = document.createTextNode("Vice President");

    p3.appendChild(node3);

    p3.classList.add("title");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode(dictlist[num].president);

    p2.appendChild(node2);

    const p1 = document.createElement("p");

    const node1 = document.createTextNode("President");

    p1.appendChild(node1);

    p1.classList.add("title");

    div1.appendChild(p1);

    div1.appendChild(p2);

    div2.appendChild(p3);

    div2.appendChild(p4);

    div3.appendChild(p5);

    if (dictlist[num].teams.constructor === Array) {
        for (var j = 0; j < dictlist[num].teams.length; j++) {
            createp(dictlist[num].teams[j], div3)
        }
    } else {
        createp(dictlist[i].teams, div3)
    }

    div4.appendChild(p9);

    div4.appendChild(p10);

    div5.appendChild(p11);

    div5.appendChild(p12);

    div6.appendChild(p13);

    div6.appendChild(p14);

    div7.appendChild(div1);

    div7.appendChild(div2);

    div7.appendChild(div3);

    div9.appendChild(div4);

    div9.appendChild(div5);

    div9.appendChild(div6);

    element.appendChild(h21);

    element.appendChild(div7);

    element.appendChild(div8);

    element.appendChild(div9);

    element.appendChild(div10);

    var updater = 1;
    if (dictlist[num].updates.constructor === Array) {
        if (dictlist[num].updates[0] === "N/A") {
            updater = 0;
        }
    } else {
        if (dictlist[num].updates === "N/A") {
            updater = 0;
        }
    }
    if (updater != 0) {
        const h31 = document.createElement("h3");

        const node16 = document.createTextNode("Updates");

        h31.appendChild(node16);

        h31.classList.add("update_title");

        element.appendChild(h31);
        
        if (dictlist[num].updates.constructor === Array) {
            for (var j = 0; j < dictlist[num].updates.length; j++) {
                createh3(dictlist[num].updates[j], element);
            }
        } else {
            createh3(dictlist[num].updates, element);
        }
    }

    element.appendChild(div11);

    sect1.appendChild(element);

    currelem.push(element);
}

var createItem2 = function () {

    var sect1 = document.getElementById("sect1");

    var element = document.createElement("div");

    const div4 = document.createElement("div");

    div4.classList.add("flexbox");

    const p8 = document.createElement("p");

    const node9 = document.createTextNode("Part of ASME");

    p8.appendChild(node9);

    p8.classList.add("ASME");

    const p7 = document.createElement("p");

    const node8 = document.createTextNode("AeroTigers Was Founded");

    p7.appendChild(node8);

    p7.classList.add("Found");

    const h21 = document.createElement("h2");

    const node7 = document.createTextNode("2021 - 2022");

    h21.appendChild(node7);

    const div3 = document.createElement("div");

    div3.classList.add("team");

    const div2 = document.createElement("div");

    div2.classList.add("team");

    const div1 = document.createElement("div");

    div1.classList.add("team");

    const p6 = document.createElement("p");

    const node6 = document.createTextNode("92nd / 97");

    p6.appendChild(node6);

    const p5 = document.createElement("p");

    const node5 = document.createTextNode("Fly-Off");

    p5.appendChild(node5);

    p5.classList.add("title");

    const p4 = document.createElement("p");

    const node4 = document.createTextNode("90th / 110");

    p4.appendChild(node4);

    const p3 = document.createElement("p");

    const node3 = document.createTextNode("Design Report");

    p3.appendChild(node3);

    p3.classList.add("title");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode("107th / 135");

    p2.appendChild(node2);

    const p1 = document.createElement("p");

    const node1 = document.createTextNode("Design Proposal");

    p1.appendChild(node1);

    p1.classList.add("title");

    div1.appendChild(p1);

    div1.appendChild(p2);

    div2.appendChild(p3);

    div2.appendChild(p4);

    div3.appendChild(p5);

    div3.appendChild(p6);

    div4.appendChild(div1);

    div4.appendChild(div2);

    div4.appendChild(div3);

    element.appendChild(h21);

    element.appendChild(p7);

    element.appendChild(p8);

    element.appendChild(div4);

    sect1.appendChild(element);

    currelem.push(element);
}

var createLine = function () {
    const linediv1 = document.createElement("div");
    linediv1.classList.add("line");
    var element = document.getElementById("sect1");
    element.appendChild(linediv1);
    currelem.push(linediv1);
}
var loadpage = function () {
    if (currentpage < pages) {
        createItem1((currentpage - 1) * 2, 1);
        createLine();
        createItem1((currentpage - 1) * 2 + 1, 1);
        createLine();
    } else {
        if (dictlist.length % 2 === 0) {
            createItem2();
            createLine();
        } else {
            createItem1((currentpage - 1) * 2, 1);
            createLine();
            createItem2();
            createLine();
        }
    }
}
var Remover = function () {
    for (var i = 0; i < currelem.length; i++) {
        var temp = currelem[i];
        temp.remove();
    }
    currelem = [];
}
loadpage();
var Left = function () {
    if (currentpage > 1) {
        Remover();
        currentpage--;
        loadpage();
        pager.innerHTML = currentpage + " / " + pages;
    }
}
var Right = function () {
    if (currentpage < pages) {
        Remover();
        currentpage++;
        loadpage();
        pager.innerHTML = currentpage + " / " + pages;
    }
}


// Code below this makes the floating dots


var poslist = [];
var elements = [];
const boxmain = document.getElementById("box");
var rect = boxmain.getBoundingClientRect();
var diff = rect.bottom - rect.top;

function frame(num) {
    if (poslist[num] == (rect.bottom - 3)) {
        poslist[num] = 0;
        elements[num].style.top = 0 + 'px'; 
    } else {
    poslist[num]++; 
    elements[num].style.top = poslist[num] + 'px'; 
    }
}
var CreateDot = function (position, size, currentnum) {
    const maindiv = document.createElement("div");
    maindiv.classList.add("dot");
    maindiv.style.width = size + "px";
    maindiv.style.height = size + "px";
    maindiv.style.left = position + "px";
    var temptop = (Math.round(Math.random() * diff - 6) + 6 + rect.top)
    maindiv.style.top = temptop + "px";
    poslist[currnum] = temptop;
    maindiv.id = currentnum + "div";
    const element = document.getElementById("box");
    element.appendChild(maindiv);
    elements.push(document.getElementById(currentnum + "div"));
    var run = setInterval(frame, (Math.round((Math.random() * 9000) / 100) + 6), currentnum);
}
box = document.getElementById("box");
var boxsize = box.offsetWidth;

var pos = 10;
var temppos = 0;
var currnum = 0;
while (pos < boxsize) { 
    temppos = Math.round((Math.random() * 200) / 100) + 1;
    CreateDot(pos, temppos, currnum);
    pos = pos + temppos + 9;
    currnum++;
}
var tester = function () {
    if (scrollY > 42) {
        scrollY -= 3;
        
    } 
}
var testrun = setInterval(tester, 10);
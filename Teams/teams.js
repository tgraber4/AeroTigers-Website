/*
Questions:
1.) What is your favorite part of AeroTigers?
2.) What are your plans after college?
*/

// people and team sections are loaded from ../data.json (see the fetch below).
// Each team member entry is normalized to [role, peopleIndex].
var people = [];
var sections = [];

var teamleadlist = []; 
var createTeamLead = function (sectitle, secimage, secname, secyear, secdesc) {

    const section1 = document.createElement("section");

    section1.setAttribute("class", "teamlead");

    const p2 = document.createElement("p");

    const node6 = document.createTextNode(secdesc);

    p2.appendChild(node6);

    const h51 = document.createElement("h5");

    const node5 = document.createTextNode(secyear);

    h51.appendChild(node5);

    const h41 = document.createElement("h4");

    const node4 = document.createTextNode(secname);

    h41.appendChild(node4);

    const img1 = document.createElement("img");

    img1.src = secimage;

    img1.alt = secname;

    img1.loading = "lazy";

    const h31 = document.createElement("h3");

    const node3 = document.createTextNode(sectitle);

    h31.appendChild(node3);

    const info = document.createElement("div");

    info.setAttribute("class", "teamlead-info");

    section1.appendChild(img1);

    info.appendChild(h31);

    info.appendChild(h41);

    info.appendChild(h51);

    info.appendChild(p2);

    section1.appendChild(info);

    teamleadlist.push(section1);
}

var mainteamnum = 1;
var createSection = function (i) {
    teamleadlist = [];

    var sectionname = sections[i][0];
    var sectiondesc = sections[i][1];
    for (var k = 0; k < sections[i][2].length; k++) {
        var person = people[sections[i][2][k][1]];
        createTeamLead(sections[i][2][k][0], person.image, person.name, person.year, person.desc);
    }
    const section2 = document.createElement("section");

    section2.id = "mainteam" + mainteamnum;

    section2.setAttribute("class", "team-panel");

    const div1 = document.createElement("div");

    div1.setAttribute("class", "teamdesc");

    const p1 = document.createElement("p");

    const node2 = document.createTextNode(sectiondesc);

    p1.appendChild(node2);

    const h21 = document.createElement("h2");

    const node1 = document.createTextNode(sectionname);

    h21.appendChild(node1);

    div1.appendChild(h21);

    div1.appendChild(p1);

    section2.appendChild(div1);

    const extradiv = document.createElement("section");

    extradiv.setAttribute("class", "multi-teams");

    for (var k = 0; k < teamleadlist.length; k++) {
        extradiv.appendChild(teamleadlist[k]);
    }
    section2.appendChild(extradiv);

    var element = document.getElementById("back");

    element.appendChild(section2);


    const div3 = document.createElement("button");
    div3.type = "button";
    div3.setAttribute("class", "team-tab");
    div3.id = "teamheading" + mainteamnum;
    var tempnum = mainteamnum;
    div3.onclick = function() { TeamSelect(tempnum); };
    const node10 = document.createTextNode(sectionname);
    div3.appendChild(node10);
    var adder = document.getElementById("team-names");
    adder.appendChild(div3);
    mainteamnum++;
}
fetch("../data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        people = data.people;
        sections = data.teamSections.map(function (s) {
            return [s.name, s.description, s.members.map(function (m) { return [m.role, m.person]; })];
        });
        for (var j = 0; j < sections.length; j++) {
            createSection(j);
        }
        TeamSelect(1);
    });

var TeamSelect = function (num) {
    for (var i = 1; i < mainteamnum; i++) {
        var mainteam = document.getElementById("mainteam" + i);
        var tab = document.getElementById("teamheading" + i);
        if (i === num) {
            mainteam.style.display = "block";
            tab.classList.add("active");
        } else {
            mainteam.style.display = "none";
            tab.classList.remove("active");
        }
    }
}
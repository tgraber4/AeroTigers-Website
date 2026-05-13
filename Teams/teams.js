var sections = [];
/*
Questions:
1.) What is your favorite part of AeroTigers?
2.) What are your plans after college?
*/


// for a single ' use \'
sections.push(["Lead Engineers", "Two Lead Engineers supervise and manage the project by creating timetables, integrating the work of the three teams, acquiring funding, recruiting new members, and leading general body meetings. They act both as design experts and project managers. These lead engineers also represent the team to the University and the public as president and vice president.", [["President", "../Images/People/Aidan.jpg", "Aidan Chastain", "Senior", "Hello, I\'m a Mechanical Engineering major with minors in Math and Aerospace Engineering. My favorite part of AeroTigers is the meetings where we decide as a group what designs we want to try, and everyone gives their thoughts and ideas! After this year, I will be pursing a career as a Manufacturing Engineer for Boeing in St. Louis."], ["Vice President", "../Images/People/Bryce.jpg", "Bryce Taylor", "Senior", "Hello, I\'m a Mechanical Engineering major with a minor in Mathematics. My favorite part of AeroTigers is working with like-minded engineers to design and build an aircraft. After this year, I hope to work in the aerospace manufacturing industry."]]]);
sections.push(["Electronics", "The Electronics team is responsible for the design, testing, and validation of the propulsion, control, and energy storage systems. They are subject matter experts in selecting and optimizing critical components of the aircraft, including the motor, batteries, electronic speed controllers, servos, and receivers.", [["Team Lead", "../Images/People/Michael.jpg", "Michael Mischkot", "Graduate", "Hello! I am an Electrical Engineering and Computer Engineering major. My favorite part of AeroTigers is getting to work through challenges and setbacks and see our plane progress over time to a successful design. After this year, I will be pursuing a career in flight data recording systems and circuit card troubleshooting for fighter aircraft at Boeing - St. Louis."]]])
sections.push(["Aeronautics", "The Aeronautics team is responsible for the preliminary sizing, planform design, and aerodynamic analysis of the aircraft, which are critical to the optimization of mission deliverables. This includes XFLR5 analysis, static and dynamic stability analysis, computational fluid dynamics, and standard aeronautical design calculations.", [["Team Lead", "../Images/People/Aidan.jpg", "Aidan Chastain", "Senior", "Hello, I\'m a Mechanical Engineering major with minors in Math and Aerospace Engineering. My favorite part of AeroTigers is the meetings where we decide as a group what designs we want to try, and everyone gives their thoughts and ideas! After this year, I will be pursing a career as a Manufacturing Engineer for Boeing in St. Louis."]]]);
sections.push(["Mechanical", "The Mechanical team is responsible for the design, SolidWorks modeling, and implementation of aircraft structures and mechanisms. They are subject matter experts in the design and analysis of mechanical components, DFAM (design for additive manufacturing), and manufacturing methods.", [["Team Lead", "../Images/People/Bryce.jpg", "Bryce Taylor", "Senior", "Hello, I\'m a Mechanical Engineering major with a minor in Mathematics. My favorite part of AeroTigers is working with like-minded engineers to design and build an aircraft. After this year, I hope to work in the aerospace manufacturing industry."]]]);
sections.push(["Administration", "The Administration team is responsible for event planning, outreach, and managing technical documentation, which are critical to competition technical reports. This includes outreaching to both university students and company outreach, in addition to other miscellaneous admin tasks. ", [["Team Lead", "../Images/People/Tyler_Graber.jpg", "Tyler Graber", "Junior", "Hello, I\'m a Computer Science major with a minor in Cybersecurity. My favorite part of AeroTigers is being able to collaborate with people in a variety of different fields and see all these unique ideas come together to make a functioning, flyable plane. My current goal is to get an internship doing software development at an aviation company."]]])
sections.push(["Missions", "The Missions team is responsible for maintaining and setting up the flight simulator, developing MATLAB software, and integrating mission objectives into the overall aircraft design. This includes designing and improving mission components and managing the 3D printing process.", [["Team Lead", "../Images/People/Joey.jpg", "Joey Tietze", "Sophomore", "Hello, I\'m a Mechanical Engineering major with a minor in Aerospace Engineering. My favorite part of AeroTigers is the community and the problem-solving required to make something fly. My current goal is to apply for internships for 2026."]]])

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

    const h31 = document.createElement("h3");

    const node3 = document.createTextNode(sectitle);

    h31.appendChild(node3);

    section1.appendChild(h31);

    section1.appendChild(img1);

    section1.appendChild(h41);

    section1.appendChild(h51);

    section1.appendChild(p2);

    teamleadlist.push(section1);
}

var mainteamnum = 1;
var createSection = function (i) {
    teamleadlist = [];

    var sectionname = sections[i][0];
    var sectiondesc = sections[i][1];
    for (var k = 0; k < sections[i][2].length; k++) {
        createTeamLead(sections[i][2][k][0], sections[i][2][k][1], sections[i][2][k][2], sections[i][2][k][3], sections[i][2][k][4]);
    }
    const section2 = document.createElement("section");
        
    section2.id = "mainteam" + mainteamnum;

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

    if (teamleadlist.length === 1) {
        section2.appendChild(teamleadlist[0]);
    } else {
        const extradiv = document.createElement("section");

        extradiv.setAttribute("class", "multi-teams");

        for (var k = 0; k < teamleadlist.length; k++) {
            extradiv.appendChild(teamleadlist[k]);
        }
        section2.appendChild(extradiv);
    }

    var element = document.getElementById("back");

    element.appendChild(section2);


    const div3 = document.createElement("div");
    div3.id = "teamheading" + mainteamnum;
    var tempnum = mainteamnum;
    div3.onclick = function() { TeamSelect(tempnum); };
    const node10 = document.createTextNode(sectionname);
    div3.appendChild(node10);
    var adder = document.getElementById("team-names");
    adder.appendChild(div3);
    mainteamnum++;
}
for (var j = 0; j < sections.length; j++) {
   createSection(j);
}
var TurnDisplaysOff = function () {
    for (var i = 2; i < mainteamnum; i++) {
        var mainteam = document.getElementById("mainteam" + i);
        mainteam.style.display = "none";
    }
}
TurnDisplaysOff();

var TeamSelect = function (num) {
    for (var i = 1; i < mainteamnum; i++) {
        var mainteam = document.getElementById("mainteam" + i);
        var teamnum = document.getElementById("teamheading" + i)
        if (i === num) {
            mainteam.style.display = "initial";
            teamnum.style.borderColor = "black";
        } else {
            mainteam.style.display = "none";
            teamnum.style.borderColor = "white";
        }
    }
}
/*
----------- What the HTML Code Looks Like -----------

<section id="mainteam4">
    <div class="teamdesc">
        <h2>Mechanical</h2>
        <p>The Mechanical team is responsible for the design, SolidWorks modeling, and implementation of aircraft structures and mechanisms. They are subject matter experts in the design and analysis of mechanical components, DFAM (design for additive manufacturing), and manufacturing methods.</p>
    </div>

    <section class="teamlead">
        <h3>Team Lead</h3>
        <img id="Team4_Image" src="">
        <h4 id="Team4_Name">Name</h4>
        <h5 id="Team4_Year">Year</h5>
        <p id="Team4_Desc">Description</p>
    </section>
</section>
*/

/*
<section id="mainteam1">
    <div class="teamdesc">
        <h2>Lead Engineers</h2>
        <p>Two Lead Engineers supervise and manage the project by creating timetables, integrating the work of the three teams, acquiring funding, recruiting new members, and leading general body meetings. They act both as design experts and project managers. These lead engineers also represent the team to the University and the public as president and vice president.</p>
    </div>

    <div class="multi-teams">
        <section class="teamlead">
            <h3>President</h3>
            <img id="Team1_Image" src="">
            <h4 id="Team1_Name">Name</h4>
            <h5 id="Team1_Year">Year</h5>
            <p id="Team1_Desc">Description</p>
        </section>
        <section class="teamlead">
            <h3>Vice President</h3>
            <img id="Team1_Image2" src="">
            <h4 id="Team1_Name2">Name</h4>
            <h5 id="Team1_Year2">Year</h5>
            <p id="Team1_Desc2">Description</p>
        </section>
    </div>
</section>
*/
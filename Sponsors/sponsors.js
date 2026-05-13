var CreateSponsor = function (ImageLink, Supplies, Name, Link, LinkName) {
    const maindiv = document.createElement("div");
    maindiv.classList.add("box");

    const firstdiv = document.createElement("div");
    firstdiv.classList.add("imageholder");
    const image1 = document.createElement("img");
    image1.src = ImageLink;
    image1.classList.add("image");
    firstdiv.appendChild(image1);

    const seconddiv = document.createElement("div");
    seconddiv.classList.add("textholder");
    const p1 = document.createElement("p");
    const node = document.createTextNode(Supplies);
    p1.appendChild(node);
    seconddiv.appendChild(p1);
    const h5 = document.createElement("h5");
    const node2 = document.createTextNode(Name);
    h5.appendChild(node2);
    seconddiv.appendChild(h5);
    const centerdiv = document.createElement("div");
    seconddiv.classList.add("center");
    const a = document.createElement("a");
    a.href = Link;
    const node3 = document.createTextNode(LinkName);
    a.appendChild(node3);
    a.classList.add("sponlink");
    centerdiv.appendChild(a);
    seconddiv.appendChild(centerdiv);

    maindiv.appendChild(firstdiv);
    maindiv.appendChild(seconddiv);
    const element = document.getElementById("sponsers");
    element.appendChild(maindiv);
}

CreateSponsor("../Images/Logos/Mizzou_Engineering.jpg", "Funding, Guidance, Resources", "MU College of Engineering", "https://engineering.missouri.edu/", "engineering.missouri.edu");
CreateSponsor("../Images/Logos/Mizzou-logo.png", "Funding, Validation, Resources", "MU Organizational Resource Group", "https://getinvolved.missouri.edu/student-organizations/", "getinvolved.missouri.edu/student-organizations");
CreateSponsor("../Images/Logos/hitec.png", "Electronics", "HiTec", "https://hitecrcd.com/", "hitecrcd.com")
CreateSponsor("../Images/Logos/SolidWorks-Logo.png", "Software", "SolidWorks", "https://www.solidworks.com/", "solidworks.com");
CreateSponsor("../Images/Logos/MathWorks-Logo.jpeg", "Software", "MathWorks", "https://www.mathworks.com/", "mathworks.com");
CreateSponsor("../Images/Logos/APC-logo.webp", "Resources", "APC Propellers", "https://www.apcprop.com/", "apcprop.com");
CreateSponsor("../Images/Logos/Scorpion-Power-System-Logo.jpeg", "Discounts", "Scorpion Power System", "https://www.scorpionsystem.com/", "scorpionsystem.com");
CreateSponsor("../Images/Logos/Simnet.png", "Software", "SIMNET Designer", "https://www.simnet.aero/designer", "simnet.aero/designer");
CreateSponsor("../Images/Logos/Ansys-logo.jpg", "Software", "ANSYS", "https://www.ansys.com/", "ansys.com");
CreateSponsor("../Images/Logos/rock_west_composites_logo.jpeg", "Discounts", "Rock West Composites", "https://www.rockwestcomposites.com/", "rockwestcomposites.com");

// CreateSponsor("../Images/Logos/(Image location goes here)", "What they gave", "Name", "Actual Link", "Display Link");
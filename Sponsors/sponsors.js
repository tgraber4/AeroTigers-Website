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

// Sponsors are stored in ../data.json under "sponsors". Each entry maps to
// CreateSponsor(image, supplies, name, link, linkName).
fetch("../data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        for (var i = 0; i < data.sponsors.length; i++) {
            var s = data.sponsors[i];
            CreateSponsor(s.image, s.supplies, s.name, s.link, s.linkName);
        }
    });
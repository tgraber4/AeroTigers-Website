var CreateSponsor = function (ImageLink, Supplies, Name, Link, LinkName) {
    const maindiv = document.createElement("div");
    maindiv.classList.add("box");

    // Logo area: object-fit keeps every logo at its natural aspect ratio so
    // nothing gets stretched or cropped, regardless of the source dimensions.
    const firstdiv = document.createElement("div");
    firstdiv.classList.add("imageholder");
    const image1 = document.createElement("img");
    image1.src = ImageLink;
    image1.alt = Name + " logo";
    image1.loading = "lazy";
    image1.classList.add("image");
    firstdiv.appendChild(image1);

    const seconddiv = document.createElement("div");
    seconddiv.classList.add("textholder");

    const h5 = document.createElement("h5");
    h5.appendChild(document.createTextNode(Name));
    seconddiv.appendChild(h5);

    // Turn the comma-separated supplies string into individual pill badges.
    const suppliesDiv = document.createElement("div");
    suppliesDiv.classList.add("supplies");
    String(Supplies).split(",").forEach(function (item) {
        const label = item.trim();
        if (!label) { return; }
        const tag = document.createElement("span");
        tag.classList.add("supply-tag");
        tag.appendChild(document.createTextNode(label));
        suppliesDiv.appendChild(tag);
    });
    seconddiv.appendChild(suppliesDiv);

    const a = document.createElement("a");
    a.href = Link;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(document.createTextNode(LinkName));
    a.classList.add("sponlink");
    seconddiv.appendChild(a);

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

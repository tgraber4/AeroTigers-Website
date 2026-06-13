
function APressed(event, tempelemid) {
    console.log(tempelemid);
    localStorage.setItem("elemid", tempelemid);
}

var AddProposal = function (FileName, IdYear, Ranking) {
    const maindiv = document.createElement("div");
    maindiv.classList.add("filesmain");

    const firstdiv = document.createElement("div");
    firstdiv.classList.add("flex-two");

    const firstinsidediv = document.createElement("div");
    firstinsidediv.classList.add("Filesholder");
    const i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-paperclip");
    firstinsidediv.appendChild(i);
    firstdiv.appendChild(firstinsidediv);

    const secondinsidediv = document.createElement("div");
    secondinsidediv.classList.add("Yearsholder");
    const a = document.createElement("a");
    a.href = "files2.html?doc=" + encodeURIComponent(IdYear);
    a.setAttribute("id",IdYear);
    const p = document.createElement("p");
    const node = document.createTextNode(FileName);
    p.appendChild(node);
    a.appendChild(p);
    secondinsidediv.appendChild(a);
    firstdiv.appendChild(secondinsidediv);



    const thirdinsidediv = document.createElement("div");
    thirdinsidediv.classList.add("extraspace3");
    firstdiv.appendChild(thirdinsidediv);


    const fourthinsidediv = document.createElement("div");
    fourthinsidediv.classList.add("Rankingsholder");
    const p2 = document.createElement("p");
    const node2 = document.createTextNode(Ranking);
    p2.appendChild(node2);
    fourthinsidediv.appendChild(p2);
    firstdiv.appendChild(fourthinsidediv);


    maindiv.appendChild(firstdiv);
    const element = document.getElementById("proposalholder");
    element.appendChild(firstdiv);

    var a1 = document.getElementById(IdYear);
    a1.addEventListener("click", (event) => { 
        APressed(event, a1.id); 
      }); 
}

// Proposals are stored in ../data.json under "proposals". The display name is
// always "<idYear> Proposal", so it is generated here from idYear.
fetch("../data.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
        for (var i = 0; i < data.proposals.length; i++) {
            var p = data.proposals[i];
            AddProposal(p.idYear + " Proposal", p.idYear, p.ranking);
        }
    });


// var Image1 = document.getElementById("image1");



// Image1.addEventListener('click', ImagePressed);
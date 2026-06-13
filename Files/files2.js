// Decide which PDF to show, in priority order:
//   1. ?file=<name.pdf>  -> load that exact file (for hidden/unlisted links)
//   2. ?doc=<idYear>     -> load "<idYear>_Proposal.pdf" (shareable proposal link)
//   3. localStorage elemid -> set when a proposal is clicked on files.html
const params = new URLSearchParams(window.location.search);
const file = params.get("file");
const doc = params.get("doc") || localStorage.getItem("elemid");

var pdf = document.getElementById("pdfsrc");
if (file) {
    pdf.src = "../PDFs/" + file;
} else {
    pdf.src = "../PDFs/" + doc + "_Proposal.pdf";
}
console.log(pdf.src);

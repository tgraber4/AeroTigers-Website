"use strict";

/*
AeroTigers Admin Panel
----------------------
The host is a static (no Node) web host, so data.json cannot be written from the
browser. Instead this panel:
  1. Loads data.json into the in-memory `data` variable.
  2. Lets you edit every section through form controls (edits write back to `data`).
  3. On the Export tab, outputs the result as copyable text to paste back into
     data.json by hand.
The Import box lets you paste an existing data.json back in to keep editing later.
*/

var data = null;

var LEVELS = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
var MEDIA_TYPES = ["video", "image"];

// ---------- small DOM helpers ----------

// Normalize a media path the user pasted from the project root into the
// "../<root-relative>" form the static pages need. Accepts either slash style
// (/ or \) and an optional leading "/", "./", or "../". Full URLs (YouTube
// embeds, etc.) and data: URIs are left untouched.
function normalizeMediaPath(value) {
    var v = (value == null ? "" : String(value)).trim();
    if (v === "") return "";
    if (/^(https?:)?\/\//i.test(v) || /^data:/i.test(v)) return v;
    v = v.replace(/\\/g, "/");          // backslashes -> forward slashes
    v = v.replace(/\/{2,}/g, "/");      // collapse duplicate slashes
    v = v.replace(/^(\.\.?\/|\/)+/, ""); // strip leading ./ ../ or /
    return "../" + v;
}

// makeInput(value, oninput, opts)
//   opts.textarea -> <textarea>; opts.options -> <select>; opts.type -> input type
//   opts.normalizePath -> run paths through normalizeMediaPath on commit
function makeInput(value, oninput, opts) {
    opts = opts || {};
    var input;
    if (opts.textarea) {
        input = document.createElement("textarea");
        input.value = value == null ? "" : value;
    } else if (opts.options) {
        input = document.createElement("select");
        opts.options.forEach(function (o) {
            var op = document.createElement("option");
            op.value = o.value;
            op.textContent = o.label;
            if (String(o.value) === String(value)) op.selected = true;
            input.appendChild(op);
        });
    } else {
        input = document.createElement("input");
        input.type = opts.type || "text";
        input.value = value == null ? "" : value;
    }
    input.addEventListener("input", function () { oninput(input.value); });
    input.addEventListener("change", function () {
        if (opts.normalizePath) input.value = normalizeMediaPath(input.value);
        oninput(input.value);
    });
    return input;
}

function labeled(text, inputEl) {
    var wrap = document.createElement("label");
    wrap.className = "field";
    var span = document.createElement("span");
    span.textContent = text;
    wrap.appendChild(span);
    wrap.appendChild(inputEl);
    return wrap;
}

function button(text, cls, onclick) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.className = cls || "";
    b.addEventListener("click", onclick);
    return b;
}

// Drag grip for re-orderable cards (drag-and-drop is wired up via SortableJS).
function dragHandle() {
    var h = document.createElement("div");
    h.className = "drag-handle";
    h.title = "Drag to reorder";
    h.textContent = "⠿"; // ⠿
    return h;
}

// Reusable delete-only action row.
function deleteAction(onDelete) {
    var actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(button("Delete", "danger small", onDelete));
    return actions;
}

function peopleOptions() {
    return data.people.map(function (p, idx) {
        return { value: idx, label: (p.name || "(unnamed)") };
    });
}

function setStatus(msg) {
    document.getElementById("status").textContent = msg;
}

// Scroll a freshly added card into view and briefly highlight it, so the user
// can see where the new entry landed (top or bottom).
function flashNew(listId, index) {
    var card = document.getElementById(listId).children[index];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("flash");
    setTimeout(function () { card.classList.remove("flash"); }, 1500);
}

// ---------- section renderers ----------

function renderPeople() {
    var list = document.getElementById("people-list");
    list.innerHTML = "";
    data.people.forEach(function (p, i) {
        var card = document.createElement("div");
        card.className = "card";
        var title = document.createElement("h3");
        title.textContent = p.name || "Person " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Name", makeInput(p.name, function (v) { p.name = v; title.textContent = v || "Person " + (i + 1); })));
        card.appendChild(labeled("Image path", makeInput(p.image, function (v) { p.image = v; }, { normalizePath: true })));
        card.appendChild(labeled("School level", makeInput(p.year, function (v) { p.year = v; }, { options: LEVELS.map(function (l) { return { value: l, label: l }; }) })));
        card.appendChild(labeled("Description", makeInput(p.desc, function (v) { p.desc = v; }, { textarea: true })));
        card.appendChild(deleteAction(function () { deletePerson(i); }));
        list.appendChild(card);
    });
}

// Deleting a person must fix the index-based references stored in teamSections.
function deletePerson(i) {
    if (!window.confirm("Delete this person? They will also be removed from any teams.")) return;
    data.people.splice(i, 1);
    data.teamSections.forEach(function (t) {
        t.members = t.members.filter(function (m) { return m.person !== i; });
        t.members.forEach(function (m) { if (m.person > i) m.person -= 1; });
    });
    renderPeople();
    renderTeams();
}

function renderTeams() {
    var list = document.getElementById("teams-list");
    list.innerHTML = "";
    data.teamSections.forEach(function (t, i) {
        var card = document.createElement("div");
        card.className = "card";
        card.appendChild(dragHandle());
        var title = document.createElement("h3");
        title.textContent = t.name || "Team " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Team title", makeInput(t.name, function (v) { t.name = v; title.textContent = v || "Team " + (i + 1); })));
        card.appendChild(labeled("Description", makeInput(t.description, function (v) { t.description = v; }, { textarea: true })));

        var memWrap = document.createElement("div");
        memWrap.className = "subsection";
        var memHead = document.createElement("h4");
        memHead.textContent = "Assigned people";
        memWrap.appendChild(memHead);
        t.members.forEach(function (m, mi) {
            var row = document.createElement("div");
            row.className = "row";
            row.appendChild(labeled("Person", makeInput(m.person, function (v) { m.person = Number(v); }, { options: peopleOptions() })));
            row.appendChild(labeled("Title on team", makeInput(m.role, function (v) { m.role = v; })));
            row.appendChild(button("Remove", "danger small", function () { t.members.splice(mi, 1); renderTeams(); }));
            memWrap.appendChild(row);
        });
        memWrap.appendChild(button("+ Assign person", "small", function () {
            t.members.push({ role: "Team Lead", person: 0 });
            renderTeams();
        }));
        card.appendChild(memWrap);

        card.appendChild(deleteAction(function () {
            if (window.confirm("Delete this team?")) { data.teamSections.splice(i, 1); renderTeams(); }
        }));
        list.appendChild(card);
    });
}

function renderDonate() {
    var card = document.getElementById("donate-card");
    card.innerHTML = "";
    var h = document.createElement("h3");
    h.textContent = "Mizzou Giving";
    card.appendChild(h);
    card.appendChild(labeled("Donate link", makeInput(data.donateLink, function (v) { data.donateLink = v; })));
    card.appendChild(labeled("Donate button text", makeInput(data.donateText, function (v) { data.donateText = v; })));
    card.appendChild(labeled("Donation instructions file path", makeInput(data["instructions-file"], function (v) { data["instructions-file"] = v; }, { normalizePath: true })));
}

function renderSponsors() {
    var list = document.getElementById("sponsors-list");
    list.innerHTML = "";
    data.sponsors.forEach(function (s, i) {
        var card = document.createElement("div");
        card.className = "card";
        card.appendChild(dragHandle());
        var title = document.createElement("h3");
        title.textContent = s.name || "Sponsor " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Name", makeInput(s.name, function (v) { s.name = v; title.textContent = v || "Sponsor " + (i + 1); })));
        card.appendChild(labeled("Resources provided", makeInput(s.supplies, function (v) { s.supplies = v; })));
        card.appendChild(labeled("Display link (shown text)", makeInput(s.linkName, function (v) { s.linkName = v; })));
        card.appendChild(labeled("Actual link (href)", makeInput(s.link, function (v) { s.link = v; })));
        card.appendChild(labeled("Image path", makeInput(s.image, function (v) { s.image = v; }, { normalizePath: true })));
        card.appendChild(deleteAction(function () {
            if (window.confirm("Delete this sponsor?")) { data.sponsors.splice(i, 1); renderSponsors(); }
        }));
        list.appendChild(card);
    });
}

function renderPhotos() {
    var list = document.getElementById("photos-list");
    list.innerHTML = "";
    data.photos.forEach(function (yr, i) {
        var card = document.createElement("div");
        card.className = "card";
        card.appendChild(dragHandle());
        var title = document.createElement("h3");
        title.textContent = yr.year || "Year " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Year", makeInput(yr.year, function (v) { yr.year = v; title.textContent = v || "Year " + (i + 1); })));
        card.appendChild(labeled("# of regular photos", makeInput(yr.normalCount, function (v) { yr.normalCount = Number(v) || 0; }, { type: "number" })));
        card.appendChild(labeled("# of competition photos", makeInput(yr.competitionCount, function (v) { yr.competitionCount = Number(v) || 0; }, { type: "number" })));

        var vidWrap = document.createElement("div");
        vidWrap.className = "subsection";
        var vh = document.createElement("h4");
        vh.textContent = "Showcases (videos)";
        vidWrap.appendChild(vh);
        yr.videos.forEach(function (v, vi) {
            var vcard = document.createElement("div");
            vcard.className = "subcard";
            vcard.appendChild(labeled("Title", makeInput(v.title, function (val) { v.title = val; })));
            vcard.appendChild(labeled("Description", makeInput(v.description, function (val) { v.description = val; }, { textarea: true })));
            vcard.appendChild(labeled("Video link", makeInput(v.src, function (val) { v.src = val; }, { normalizePath: true })));
            vcard.appendChild(button("Remove showcase", "danger small", function () { yr.videos.splice(vi, 1); renderPhotos(); }));
            vidWrap.appendChild(vcard);
        });
        vidWrap.appendChild(button("+ Add showcase", "small", function () {
            yr.videos.push({ title: "", description: "", src: "" });
            renderPhotos();
        }));
        card.appendChild(vidWrap);

        card.appendChild(deleteAction(function () {
            if (window.confirm("Delete this year?")) { data.photos.splice(i, 1); renderPhotos(); }
        }));
        list.appendChild(card);
    });
}

function renderProposals() {
    var list = document.getElementById("proposals-list");
    list.innerHTML = "";
    data.proposals.forEach(function (p, i) {
        var card = document.createElement("div");
        card.className = "card";
        var title = document.createElement("h3");
        title.textContent = p.idYear || "Proposal " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Year (e.g. 2024-2025)", makeInput(p.idYear, function (v) { p.idYear = v; title.textContent = v || "Proposal " + (i + 1); })));
        card.appendChild(labeled("Ranking", makeInput(p.ranking, function (v) { p.ranking = v; })));
        card.appendChild(deleteAction(function () {
            if (window.confirm("Delete this proposal?")) { data.proposals.splice(i, 1); renderProposals(); }
        }));
        list.appendChild(card);
    });
}

function renderHome() {
    var list = document.getElementById("home-list");
    list.innerHTML = "";
    data.homeContent.forEach(function (w, i) {
        var card = document.createElement("div");
        card.className = "card";
        card.appendChild(dragHandle());
        var title = document.createElement("h3");
        title.textContent = w.title || "Widget " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Title", makeInput(w.title, function (v) { w.title = v; title.textContent = v || "Widget " + (i + 1); })));
        card.appendChild(labeled("Description", makeInput(w.description, function (v) { w.description = v; }, { textarea: true })));
        card.appendChild(labeled("Type", makeInput(w.type, function (v) { w.type = v; }, { options: MEDIA_TYPES.map(function (t) { return { value: t, label: t }; }) })));
        card.appendChild(labeled("Video / image path", makeInput(w.src, function (v) { w.src = v; }, { normalizePath: true })));
        card.appendChild(deleteAction(function () {
            if (window.confirm("Delete this widget?")) { data.homeContent.splice(i, 1); renderHome(); }
        }));
        list.appendChild(card);
    });
}

function renderHistory() {
    var list = document.getElementById("history-list");
    list.innerHTML = "";
    data.pastCompetitions.forEach(function (c, i) {
        var card = document.createElement("div");
        card.className = "card";
        var title = document.createElement("h3");
        title.textContent = c.year || "Competition " + (i + 1);
        card.appendChild(title);
        card.appendChild(labeled("Year", makeInput(c.year, function (v) { c.year = v; title.textContent = v || "Competition " + (i + 1); })));
        card.appendChild(labeled("President", makeInput(c.president, function (v) { c.president = v; })));
        card.appendChild(labeled("Vice President", makeInput(c.vicepres, function (v) { c.vicepres = v; })));
        card.appendChild(labeled("Proposal ranking", makeInput(c.prop, function (v) { c.prop = v; })));
        card.appendChild(labeled("Report ranking", makeInput(c.report, function (v) { c.report = v; })));
        card.appendChild(labeled("Competition ranking", makeInput(c.dbf, function (v) { c.dbf = v; })));

        var teamWrap = document.createElement("div");
        teamWrap.className = "subsection";
        var th = document.createElement("h4");
        th.textContent = "Officers";
        teamWrap.appendChild(th);
        c.officers.forEach(function (name, ti) {
            var row = document.createElement("div");
            row.className = "row";
            row.appendChild(makeInput(name, function (v) { c.officers[ti] = v; }));
            row.appendChild(button("Remove", "danger small", function () { c.officers.splice(ti, 1); renderHistory(); }));
            teamWrap.appendChild(row);
        });
        teamWrap.appendChild(button("+ Add officer", "small", function () { c.officers.push(""); renderHistory(); }));
        card.appendChild(teamWrap);

        var upWrap = document.createElement("div");
        upWrap.className = "subsection";
        var uh = document.createElement("h4");
        uh.textContent = "Updates (leave empty for none)";
        upWrap.appendChild(uh);
        c.updates.forEach(function (u, ui) {
            var row = document.createElement("div");
            row.className = "row";
            row.appendChild(makeInput(u, function (v) { c.updates[ui] = v; }, { textarea: true }));
            row.appendChild(button("Remove", "danger small", function () { c.updates.splice(ui, 1); renderHistory(); }));
            upWrap.appendChild(row);
        });
        upWrap.appendChild(button("+ Add update", "small", function () { c.updates.push(""); renderHistory(); }));
        card.appendChild(upWrap);

        card.appendChild(deleteAction(function () {
            if (window.confirm("Delete this competition?")) { data.pastCompetitions.splice(i, 1); renderHistory(); }
        }));
        list.appendChild(card);
    });
}

function renderAll() {
    renderPeople();
    renderTeams();
    renderDonate();
    renderSponsors();
    renderPhotos();
    renderProposals();
    renderHome();
    renderHistory();
    initSortables();
}

// ---------- drag-and-drop reordering (SortableJS) ----------

var sortablesInited = false;

// Bind drag-and-drop to a list once. The list container persists across
// re-renders (we only swap its children), so a single Sortable instance stays
// valid. On drop we reorder the backing array and re-render so every card's
// captured index is correct again.
function makeSortable(listId, key, render) {
    Sortable.create(document.getElementById(listId), {
        handle: ".drag-handle",
        animation: 150,
        onEnd: function (e) {
            if (e.oldIndex === e.newIndex) return;
            var moved = data[key].splice(e.oldIndex, 1)[0];
            data[key].splice(e.newIndex, 0, moved);
            render();
        }
    });
}

function initSortables() {
    if (sortablesInited || typeof Sortable === "undefined") return;
    sortablesInited = true;
    makeSortable("teams-list", "teamSections", renderTeams);
    makeSortable("sponsors-list", "sponsors", renderSponsors);
    makeSortable("photos-list", "photos", renderPhotos);
    makeSortable("home-list", "homeContent", renderHome);
}

// ---------- load / normalize / export ----------

// Bring loaded JSON into the shape the editor expects (and tolerate missing keys).
// `updates` is normalized to an array here and converted back on export.
function normalize(d) {
    d = d || {};
    if (d.donateLink == null) d.donateLink = "";
    if (d.donateText == null) d.donateText = "";
    if (d["instructions-file"] == null) d["instructions-file"] = "";
    if (d.photoTypes == null) d.photoTypes = ["jpg", "png", "jpeg", "webp"];
    d.people = d.people || [];
    d.teamSections = d.teamSections || [];
    d.sponsors = d.sponsors || [];
    d.photos = d.photos || [];
    d.proposals = d.proposals || [];
    d.homeContent = d.homeContent || [];
    d.pastCompetitions = d.pastCompetitions || [];

    d.teamSections.forEach(function (t) { if (!t.members) t.members = []; });
    d.photos.forEach(function (p) { if (!p.videos) p.videos = []; });
    d.pastCompetitions.forEach(function (c) {
        if (!c.officers) c.officers = [];
        if (c.updates === "N/A" || c.updates == null) c.updates = [];
        else if (!Array.isArray(c.updates)) c.updates = [c.updates];
    });
    return d;
}

// Produce the final data.json text. Re-collapses `updates` back to the original
// convention: none -> "N/A", single -> string, multiple -> array.
function buildOutput() {
    var out = JSON.parse(JSON.stringify(data));
    out.pastCompetitions.forEach(function (c) {
        if (Array.isArray(c.updates)) {
            if (c.updates.length === 0) c.updates = "N/A";
            else if (c.updates.length === 1) c.updates = c.updates[0];
        }
    });
    return JSON.stringify(out, null, 2);
}

// ---------- wire up controls ----------

document.getElementById("add-person").addEventListener("click", function () {
    data.people.push({ image: "", name: "", year: "Freshman", desc: "" });
    renderPeople();
    flashNew("people-list", data.people.length - 1);
});
document.getElementById("add-team").addEventListener("click", function () {
    data.teamSections.push({ name: "", description: "", members: [] });
    renderTeams();
    flashNew("teams-list", data.teamSections.length - 1);
});
document.getElementById("add-sponsor").addEventListener("click", function () {
    data.sponsors.push({ image: "", supplies: "", name: "", link: "", linkName: "" });
    renderSponsors();
    flashNew("sponsors-list", data.sponsors.length - 1);
});
document.getElementById("add-photo-year").addEventListener("click", function () {
    // Newest year goes to the top.
    data.photos.unshift({ year: "", normalCount: 0, competitionCount: 0, videos: [] });
    renderPhotos();
    flashNew("photos-list", 0);
});
document.getElementById("add-proposal").addEventListener("click", function () {
    // Newest proposal goes to the top.
    data.proposals.unshift({ idYear: "", ranking: "" });
    renderProposals();
    flashNew("proposals-list", 0);
});
document.getElementById("add-home").addEventListener("click", function () {
    data.homeContent.push({ title: "", description: "", src: "", type: "video" });
    renderHome();
    flashNew("home-list", data.homeContent.length - 1);
});
document.getElementById("add-history").addEventListener("click", function () {
    // Newest competition goes to the top (matches the descending-year convention).
    data.pastCompetitions.unshift({ year: "", president: "", vicepres: "", officers: [], prop: "", report: "", dbf: "", updates: [] });
    renderHistory();
    flashNew("history-list", 0);
});

var tabButtons = document.querySelectorAll("#tabs button");

function activateTab(name) {
    tabButtons.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === name); });
    document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
    document.getElementById("tab-" + name).classList.add("active");
    if (name === "export") {
        // Auto-generate the output whenever the Export tab is opened.
        document.getElementById("output").value = buildOutput();
    }
}

tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { activateTab(btn.getAttribute("data-tab")); });
});

// ----- Settings modal + Import toggle (persisted in localStorage) -----

var IMPORT_KEY = "aerotigers-admin-import";

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

// Show/hide the Import tab; if it gets hidden while active, fall back to Export.
function applyImportSetting(enabled) {
    document.getElementById("tab-btn-import").hidden = !enabled;
    if (!enabled && document.getElementById("tab-import").classList.contains("active")) {
        activateTab("export");
    }
}

var importSelect = document.getElementById("setting-import");
importSelect.value = (lsGet(IMPORT_KEY) === "allow") ? "allow" : "default";
applyImportSetting(importSelect.value === "allow");

importSelect.addEventListener("change", function () {
    lsSet(IMPORT_KEY, importSelect.value);
    applyImportSetting(importSelect.value === "allow");
});

var settingsModal = document.getElementById("settings-modal");
document.getElementById("settings-btn").addEventListener("click", function () { settingsModal.hidden = false; });
document.getElementById("settings-close").addEventListener("click", function () { settingsModal.hidden = true; });
settingsModal.addEventListener("click", function (e) { if (e.target === settingsModal) settingsModal.hidden = true; });

document.getElementById("copy").addEventListener("click", function () {
    var ta = document.getElementById("output");
    if (!ta.value) ta.value = buildOutput();
    ta.select();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ta.value).then(function () { setStatus("Copied to clipboard."); });
    } else {
        document.execCommand("copy");
        setStatus("Copied to clipboard.");
    }
});

document.getElementById("import-btn").addEventListener("click", function () {
    var txt = document.getElementById("import").value.trim();
    if (!txt) return;
    try {
        data = normalize(JSON.parse(txt));
        renderAll();
        setStatus("Loaded pasted JSON.");
    } catch (e) {
        setStatus("Could not parse pasted JSON: " + e.message);
        window.alert("Invalid JSON: " + e.message);
    }
});

// ---------- initial load ----------

fetch("../data.json")
    .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
    })
    .then(function (d) {
        data = normalize(d);
        renderAll();
        setStatus("Loaded data.json. Edit, then open Export to copy the result.");
    })
    .catch(function (e) {
        data = normalize({});
        renderAll();
        setStatus("Could not load data.json (" + e.message + "). Paste it in the Export / Import tab, or start fresh.");
    });

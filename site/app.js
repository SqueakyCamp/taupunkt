// Taupunkt – Lernhilfe Gebäudephysik I
const $ = (s, el = document) => el.querySelector(s);
const app = $("#app");
const STORE = "taupunkt-v1";
let S = {}; try { S = JSON.parse(localStorage.getItem(STORE)) || {}; } catch { S = {}; }
S.done ||= {}; S.mc ||= {}; S.cards ||= {}; S.drills ||= {};
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch { } };
const CH = Object.fromEntries(CHAPTERS.map(c => [c.id, c]));
const TOPICS = [["Grundlagen Wärmeschutz, U-Wert, Fenster", 1, 37], ["Energiebilanz & Heizwärmebedarf", 38, 117], ["Energieausweis: HEB, EEB, PEB, CO₂", 118, 130], ["Sommerlicher Wärmeschutz", 131, 165], ["Dauerhaftigkeit: Dehnung, Luft-/Winddichtheit", 166, 178], ["Feuchteschutz: Grundlagen & Transport", 179, 206], ["Nachweis & nachweisfreie Konstruktionen", 207, 230], ["Glaser-Verfahren", 231, 254], ["Schimmel & Oberflächenkondensat", 255, 272]];
const mcId = q => q.c + ":" + q.q.slice(0, 48);
const cardId = q => q.c + ":" + q.q.slice(0, 48);

// ---------- Theme
(function () { const t = S.theme; if (t) document.documentElement.dataset.theme = t; })();
$("#themeBtn").onclick = () => {
  const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  S.theme = cur === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = S.theme; save();
};

// ---------- Mathe + Folienlinks
function slideLinks(html) {
  return html.replace(/\[\[([FP]?)(\d+)\]\]/g, (m, d, n) => {
    const doc = d === "F" ? "f" : d === "P" ? "p" : "g";
    const lab = d === "F" ? `Formelsammlung ${n}` : d === "P" ? `Prüfung S. ${n}` : `Folie ${n}`;
    return `<a class="sl sl-${doc}" data-doc="${doc}" data-p="${n}" href="#">${lab}</a>`;
  });
}
function render(el, html) { el.innerHTML = slideLinks(html); math(el); }
document.addEventListener("click", e => {
  const a = e.target.closest("a.sl, [data-slide]");
  if (!a) return;
  e.preventDefault();
  const list = a.dataset.list ? a.dataset.list.split(",").map(Number) : null;
  openSlide(a.dataset.doc || "g", +(a.dataset.p || a.dataset.slide), list);
});

// ---------- Krypto / Folien
let M = null, KEY = null; const imgCache = new Map(); let texts = {};
const b64 = { to: b => btoa(String.fromCharCode(...new Uint8Array(b))), from: s => Uint8Array.from(atob(s), c => c.charCodeAt(0)).buffer };
async function loadManifest() { if (!M) { M = await (await fetch("slides/manifest.json")).json(); M.salt = (await (await fetch("slides/salt.txt")).text()).trim(); } return M; }
async function deriveBits(pass) {
  await loadManifest();
  const raw = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass.trim()), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", iterations: M.iters, salt: Uint8Array.from(M.salt.match(/../g), x => parseInt(x, 16)) }, raw, 256);
}
const importBits = bits => crypto.subtle.importKey("raw", bits, "AES-GCM", false, ["decrypt"]);
async function openBin(url, key = KEY) {
  const r = await fetch(url); if (!r.ok) throw new Error("fetch");
  const buf = await r.arrayBuffer();
  return crypto.subtle.decrypt({ name: "AES-GCM", iv: buf.slice(0, 12) }, key, buf.slice(12));
}
async function unlock(pass) {
  const bits = await deriveBits(pass); const key = await importBits(bits);
  await openBin("slides/check.bin", key);
  KEY = key; S.key = b64.to(bits); save(); return true;
}
async function restoreKey() { if (S.key && !KEY && crypto.subtle) { try { KEY = await importBits(b64.from(S.key)); } catch { S.key = null; } } }
async function slideURL(doc, n) {
  const k = doc + n; if (imgCache.has(k)) return imgCache.get(k);
  const p = (async () => { const d = await openBin(`slides/${doc}/${String(n).padStart(3, "0")}.bin`); return URL.createObjectURL(new Blob([d], { type: "image/jpeg" })); })();
  imgCache.set(k, p); p.catch(() => imgCache.delete(k)); return p;
}
async function getTexts(doc) { if (!texts[doc]) texts[doc] = JSON.parse(new TextDecoder().decode(await openBin(`slides/${doc}/text.bin`))); return texts[doc]; }
function lockedHTML() {
  return `<div class="lock"><p><b>🔒 Folien gesperrt.</b> Die Original-Folien der LV sind verschlüsselt, weil diese Seite öffentlich ist. Mit dem Code (oder dem Link mit <code>#key=…</code>) werden sie in diesem Browser freigeschaltet.</p>
  ${window.isSecureContext ? `<form class="row" data-unlock><input name="pw" placeholder="Code" autocomplete="off" autocapitalize="off"><button class="btn">Freischalten</button></form><p class="small" data-msg></p>` : "<p>Freischalten geht nur über https.</p>"}</div>`;
}
document.addEventListener("submit", async e => {
  const f = e.target.closest("[data-unlock]"); if (!f) return; e.preventDefault();
  const msg = f.parentElement.querySelector("[data-msg]"); msg.textContent = "Prüfe …";
  try { await unlock(f.pw.value); msg.textContent = "✓ Freigeschaltet"; route(); if (!$("#ov").hidden) ovShow(); } catch { msg.textContent = "Falscher Code."; }
});

// ---------- Overlay-Viewer
let OV = { doc: "g", n: 1, list: null, zoom: false };
function openSlide(doc, n, list) {
  OV = { doc, n, list: list && list.length > 1 ? list : null, zoom: false };
  const ov = $("#ov"); if (ov.hidden) { ov.hidden = false; history.pushState({ ov: 1 }, ""); document.body.classList.add("noscroll"); }
  ovShow();
}
function ovClose() { const ov = $("#ov"); if (ov.hidden) return; ov.hidden = true; document.body.classList.remove("noscroll"); }
async function ovShow() {
  const pages = M ? M.docs[OV.doc].pages : 999;
  const name = { g: "Folie", f: "Formelsammlung S.", p: "Prüfung S." }[OV.doc];
  $("#ovTitle").textContent = `${name} ${OV.n}${OV.list ? `  (${OV.list.indexOf(OV.n) + 1}/${OV.list.length})` : ""}`;
  const body = $("#ovBody"); body.classList.toggle("zoom", OV.zoom);
  await restoreKey();
  if (!KEY) { body.innerHTML = lockedHTML(); $("#ovFoot").textContent = ""; return; }
  body.innerHTML = `<div class="spin">lädt …</div>`;
  try { const u = await slideURL(OV.doc, OV.n); body.innerHTML = `<img src="${u}" alt="${name} ${OV.n}">`; }
  catch { body.innerHTML = `<p class="lock">Folie konnte nicht geladen werden.</p>`; }
  const t = OV.doc === "g" ? TOPICS.find(x => OV.n >= x[1] && OV.n <= x[2]) : null;
  $("#ovFoot").innerHTML = (t ? `Thema: ${t[0]} · ` : "") + `<a href="#/folien/${OV.doc}/${OV.n}" data-close>im Folienbrowser öffnen</a>`;
  // Nachbarn vorladen
  [OV.n + 1, OV.n - 1].forEach(k => { if (k >= 1 && k <= pages) slideURL(OV.doc, k).catch(() => { }); });
}
function ovStep(d) {
  if (OV.list) { const i = OV.list.indexOf(OV.n) + d; if (i < 0 || i >= OV.list.length) return; OV.n = OV.list[i]; }
  else { const pages = M ? M.docs[OV.doc].pages : 999; const n = OV.n + d; if (n < 1 || n > pages) return; OV.n = n; }
  ovShow();
}
$("#ovPrev").onclick = () => ovStep(-1); $("#ovNext").onclick = () => ovStep(1);
$("#ovZoom").onclick = () => { OV.zoom = !OV.zoom; $("#ovBody").classList.toggle("zoom", OV.zoom); };
$("#ovClose").onclick = () => history.back();
$("#ovFoot").addEventListener("click", e => { if (e.target.dataset.close !== undefined) { ovClose(); } });
window.addEventListener("popstate", () => { if (!$("#ov").hidden) ovClose(); });
document.addEventListener("keydown", e => {
  if ($("#ov").hidden) return;
  if (e.key === "Escape") history.back(); if (e.key === "ArrowRight") ovStep(1); if (e.key === "ArrowLeft") ovStep(-1);
});
(function swipe() {
  let x0 = null, y0 = null; const b = $("#ovBody");
  b.addEventListener("touchstart", e => { if (OV.zoom) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  b.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) ovStep(dx < 0 ? 1 : -1); x0 = null; }, { passive: true });
})();

// Thumbnails lazy
const thumbObs = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(async en => {
  if (!en.isIntersecting) return; const el = en.target; thumbObs.unobserve(el);
  if (!KEY) return; try { el.style.backgroundImage = `url(${await slideURL(el.dataset.doc, +el.dataset.slide)})`; el.classList.add("ld"); } catch { }
}), { rootMargin: "200px" }) : null;
function observeThumbs(root) { root.querySelectorAll(".thumb").forEach(t => thumbObs ? thumbObs.observe(t) : null); }
const thumbs = (pages, doc = "g") => `<div class="thumbs">${pages.map(p => `<button class="thumb" data-doc="${doc}" data-slide="${p}" data-list="${pages.join(",")}"><span>${p}</span></button>`).join("")}</div>`;

// ---------- Router
const ROUTES = {};
function route() {
  const hsh = location.hash.replace(/^#\/?/, "");
  const parts = hsh.split("/").filter(Boolean);
  document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("on", (a.dataset.r || "") === (parts[0] || "")));
  (ROUTES[parts[0] || ""] || ROUTES[""])(parts.slice(1));
  observeThumbs(app);
}
window.addEventListener("hashchange", () => { ovClose(); route(); window.scrollTo(0, 0); });

// ---------- Start
function chapterProgress(c) { const n = c.sections.length, d = c.sections.filter(s => S.done[c.id + "/" + s.id]).length; return [d, n]; }
function mcStats(c) { const qs = MC.filter(q => !c || q.c === c); const r = qs.filter(q => (S.mc[mcId(q)] || [0, 0])[2]).length; return [r, qs.length]; }
ROUTES[""] = () => {
  const ring = (d, n) => `<span class="ring" style="--p:${n ? d / n * 100 : 0}"></span>`;
  render(app, `<section class="hero">
  <h1>Gebäudephysik I – Prüfung</h1>
  <p>Alles aus dem Folienskript, verständlich erklärt, mit Rechnern zum Ausprobieren, Übungsrechnungen mit Lösungsweg und Fragen im Prüfungsstil. Jeder Verweis wie <a class="sl" data-doc="g" data-p="23" href="#">Folie 23</a> öffnet die Originalfolie.</p>
  </section>
  <h2 class="h2">Was zur Prüfung kommt</h2>
  <div class="cards3">
  ${CHAPTERS.map(c => { const [d, n] = chapterProgress(c); return `<a class="ccard c-${c.id}" href="#/lernen/${c.id}"><div class="ci">${c.icon}</div><div><b>${c.title}</b><span>${c.exam}</span><small>${d}/${n} Abschnitte</small></div>${ring(d, n)}</a>`; }).join("")}
  <a class="ccard c-build" href="#/aufbauten"><div class="ci">▤</div><div><b>Zeichenbeispiel: Aufbauten</b><span>1 Aufbau zeichnen</span><small>${BUILDS.length} Konstruktionen</small></div></a>
  <a class="ccard c-quiz" href="#/quiz"><div class="ci">✓</div><div><b>Multiple Choice</b><span>„Welche Aussagen sind korrekt?“</span><small>${mcStats()[0]}/${mcStats()[1]} schon richtig</small></div>${ring(...mcStats())}</a>
  <a class="ccard c-exam" href="#/quiz/probe"><div class="ci">⏱</div><div><b>Probeprüfung</b><span>5+7+7 Fragen, 3 Rechnungen, 1 Zeichnung, MC</span><small>zufällig zusammengestellt</small></div></a>
  </div>
  <h2 class="h2">So lernst du damit</h2>
  <ol class="how"><li><b>Lernen</b>: Kapitel durcharbeiten, Rechner ausprobieren, Abschnitte als „verstanden“ markieren.</li>
  <li><b>Rechnen</b>: pro Thema die typischen Prüfungsrechnungen mit immer neuen Zahlen üben.</li>
  <li><b>Aufbauten</b>: Schichtfolgen lernen und die Reihenfolge selbst legen.</li>
  <li><b>Quiz</b>: Karteikarten für die offenen Fragen, MC für den Ankreuzteil, dann die Probeprüfung.</li></ol>
  <p class="small muted">Fortschritt wird nur in diesem Browser gespeichert. Formelsammlung: <a class="sl" data-doc="f" data-p="1" href="#">öffnen</a> · Altprüfung 1. Termin: <a class="sl" data-doc="p" data-p="2" href="#">öffnen</a></p>`);
};

// ---------- Lernen
ROUTES.lernen = ([cid, sid]) => {
  if (!cid) {
    render(app, `<h1 class="h1">Lernen</h1><div class="cards3">${CHAPTERS.map(c => { const [d, n] = chapterProgress(c); return `<a class="ccard c-${c.id}" href="#/lernen/${c.id}"><div class="ci">${c.icon}</div><div><b>${c.title}</b><span>${c.intro}</span><small>${d}/${n} verstanden · Prüfung: ${c.exam}</small></div></a>`; }).join("")}</div>`);
    return;
  }
  const c = CH[cid]; if (!c) return ROUTES[""]();
  if (!sid) {
    const [d, n] = chapterProgress(c);
    render(app, `<nav class="crumb"><a href="#/lernen">Lernen</a> ›</nav><h1 class="h1 c-${c.id}t">${c.icon} ${c.title}</h1><p>${c.intro}</p>
    <div class="pbar"><i style="width:${d / n * 100}%"></i></div><p class="small">${d} von ${n} Abschnitten verstanden · Prüfung: <b>${c.exam}</b></p>
    <ol class="toc">${c.sections.map((s, i) => `<li class="${S.done[c.id + "/" + s.id] ? "dn" : ""}"><a href="#/lernen/${c.id}/${s.id}"><span class="no">${i + 1}</span>${s.t}${s.w ? ` <em class="tag">interaktiv</em>` : ""}</a></li>`).join("")}</ol>
    <div class="row gap"><a class="btn" href="#/quiz/karten/${c.id}">Karteikarten ${c.short}</a><a class="btn" href="#/quiz/mc/${c.id}">Multiple Choice ${c.short}</a><a class="btn" href="#/rechnen/${c.id}">Rechnungen ${c.short}</a></div>`);
    return;
  }
  const i = c.sections.findIndex(s => s.id === sid), s = c.sections[i]; if (!s) return ROUTES.lernen([cid]);
  const key = c.id + "/" + s.id, prev = c.sections[i - 1], next = c.sections[i + 1];
  render(app, `<nav class="crumb"><a href="#/lernen">Lernen</a> › <a href="#/lernen/${c.id}">${c.short}</a> ›</nav>
  <article class="sec"><h1 class="h1">${s.t}</h1>${s.h}</article>
  ${s.w ? `<div class="widget" data-w="${s.w}"></div>` : ""}
  <h3 class="h3">Folien zu diesem Abschnitt</h3>${thumbs(s.p)}
  <label class="donebox"><input type="checkbox" data-done ${S.done[key] ? "checked" : ""}> Abschnitt verstanden</label>
  <div class="pager">${prev ? `<a class="btn ghost" href="#/lernen/${c.id}/${prev.id}">‹ ${prev.t}</a>` : "<span></span>"}${next ? `<a class="btn" href="#/lernen/${c.id}/${next.id}">${next.t} ›</a>` : `<a class="btn" href="#/quiz/karten/${c.id}">Weiter zu den Karteikarten ›</a>`}</div>`);
  if (s.w) WIDGETS[s.w]($(".widget", app));
  $("[data-done]", app).onchange = e => { S.done[key] = e.target.checked ? 1 : 0; save(); };
};

// ---------- Rechnen
ROUTES.rechnen = ([cid, did]) => {
  if (!did) {
    const groups = CHAPTERS.filter(c => !cid || c.id === cid);
    render(app, `<h1 class="h1">Rechnen</h1><p>Je Teil kommt eine Rechnung. Hier bekommst du die typischen Aufgaben mit immer neuen Zahlen. Komma oder Punkt sind egal; kleine Rundungsabweichungen werden akzeptiert.</p>
    ${groups.map(c => `<h2 class="h2 c-${c.id}t">${c.icon} ${c.title}</h2><div class="dlist">${DRILLS.filter(d => d.c === c.id).map(d => `<a class="ditem" href="#/rechnen/${c.id}/${d.id}"><b>${d.t}</b><small>${S.drills[d.id] ? `✓ ${S.drills[d.id]}× gelöst` : "noch nicht geübt"}</small></a>`).join("")}</div>`).join("")}
    ${cid ? `<p><a href="#/rechnen">Alle Themen anzeigen</a></p>` : ""}`);
    return;
  }
  const d = DRILLS.find(x => x.id === did); if (!d) return ROUTES.rechnen([]);
  const run = () => {
    const task = d.gen();
    render(app, `<nav class="crumb"><a href="#/rechnen">Rechnen</a> › <a href="#/rechnen/${d.c}">${CH[d.c].short}</a> ›</nav><h1 class="h1">${d.t}</h1>
    <div class="task"><p>${task.q}</p>
    <form class="answers" data-ans>${task.a.map((a, i) => `<label class="f"><span>${a.l} =</span><input inputmode="decimal" autocomplete="off" data-i="${i}"><span class="u">${a.u}</span><b class="res" data-res="${i}"></b></label>`).join("")}
    ${task.yn ? `<div class="f yn"><span>${task.yn.l}</span><label><input type="radio" name="yn" value="1"> ja</label><label><input type="radio" name="yn" value="0"> nein</label><b class="res" data-res="yn"></b></div>` : ""}
    <div class="row gap"><button class="btn">Prüfen</button><button type="button" class="btn ghost" data-show>Lösungsweg zeigen</button><button type="button" class="btn ghost" data-new>Neue Zahlen ↻</button></div></form>
    <ol class="steps sol" hidden>${task.s.map(x => `<li>${x}</li>`).join("")}<li class="small">Folien: ${task.p.map(p => `[[${p}]]`).join(" ")}</li></ol></div>`);
    const f = $("[data-ans]", app);
    f.onsubmit = e => {
      e.preventDefault(); let ok = true;
      task.a.forEach((a, i) => {
        const v = parseNum(f.querySelector(`[data-i="${i}"]`).value), tol = a.tol ?? 0.02;
        const good = isFinite(v) && Math.abs(v - a.v) <= Math.max(Math.abs(a.v) * tol, 0.5 * Math.pow(10, -(a.d ?? 2)));
        ok = ok && good; const r = f.querySelector(`[data-res="${i}"]`); r.className = "res " + (good ? "ok" : "bad"); r.textContent = good ? "✓" : `✗ (${num(a.v, a.d ?? 2)})`;
      });
      if (task.yn) { const sel = f.querySelector("[name=yn]:checked"); const good = sel && (sel.value === "1") === task.yn.v; ok = ok && good; const r = f.querySelector('[data-res="yn"]'); r.className = "res " + (good ? "ok" : "bad"); r.textContent = good ? "✓" : `✗ (${task.yn.v ? "ja" : "nein"})`; }
      if (ok) { S.drills[d.id] = (S.drills[d.id] || 0) + 1; save(); }
      $(".sol", app).hidden = false;
    };
    $("[data-show]", app).onclick = () => { $(".sol", app).hidden = false; };
    $("[data-new]", app).onclick = run;
    observeThumbs(app);
  };
  run();
};

// ---------- Aufbauten (SVG)
const PAT = {
  putz: { bg: "#efe6d2", s: (o) => `<circle cx="2" cy="2" r=".9" fill="#a8946c"/><circle cx="6" cy="5" r=".7" fill="#a8946c"/>`, w: 8, hh: 8 },
  mw: { bg: "#f0c4b0", s: () => `<path d="M0 8L8 0M-2 2L2-2M6 10L10 6" stroke="#b3573a" stroke-width="1"/>`, w: 8, hh: 8 },
  beton: { bg: "#d5d9de", s: () => `<path d="M3 4l3 0-1.5 2.5z" fill="#7d8792"/><circle cx="10" cy="10" r="1" fill="#7d8792"/><circle cx="12" cy="3" r=".7" fill="#7d8792"/><circle cx="5" cy="11" r=".6" fill="#7d8792"/>`, w: 14, hh: 14 },
  wd: { bg: "#fbf0c8", s: () => `<path d="M0 6C0 0 6 0 6 6S12 12 12 6" fill="none" stroke="#c0912c" stroke-width="1.1"/>`, w: 12, hh: 12 },
  hd: { bg: "#e3efd9", s: () => `<path d="M0 0L6 6M6 0L0 6" stroke="#7ea36c" stroke-width=".7"/>`, w: 6, hh: 6 },
  holz: { bg: "#e7c38a", s: () => `<path d="M0 3Q7 1 14 3T28 3M0 7Q7 9 14 7T28 7" fill="none" stroke="#a87a3c" stroke-width=".8"/>`, w: 28, hh: 10 },
  platte: { bg: "#eceae6", s: () => `<path d="M0 4L4 0" stroke="#8d8a84" stroke-width=".6"/>`, w: 4, hh: 4 },
  estrich: { bg: "#e2ded6", s: () => `<circle cx="1.5" cy="1.5" r=".8" fill="#8f8a80"/><circle cx="4.5" cy="4.5" r=".8" fill="#8f8a80"/>`, w: 6, hh: 6 },
  kies: { bg: "#ecebe7", s: () => `<circle cx="4" cy="4" r="3" fill="none" stroke="#8a8a85"/><circle cx="11" cy="9" r="2.4" fill="none" stroke="#8a8a85"/>`, w: 14, hh: 13 },
  erde: { bg: "#c9a57a", s: () => `<path d="M0 10L10 0" stroke="#8a6640"/><circle cx="7" cy="7" r="1" fill="#6e4f2e"/>`, w: 10, hh: 10 },
  belag: { bg: "#d6b07c", s: () => `<path d="M0 0V6" stroke="#8d6a3a"/>`, w: 22, hh: 6 },
  luft: { bg: "#ffffff", s: () => `<path d="M4 10h10m-3-2l3 2-3 2" fill="none" stroke="#9fc4e0" stroke-width=".9"/>`, w: 22, hh: 20 },
  latt: { bg: "#ffffff", s: () => `<rect x="0" y="0" width="7" height="40" fill="#e7c38a" stroke="#a87a3c" stroke-width=".6"/>`, w: 46, hh: 40 },
  folie: { bg: "#ffffff", s: () => ``, w: 4, hh: 4 },
  abd: { bg: "#262626", s: () => ``, w: 4, hh: 4 },
  blech: { bg: "#8b929b", s: () => ``, w: 4, hh: 4 },
  dz: { bg: "#c8694a", s: () => `<path d="M0 10Q8 0 16 10" fill="none" stroke="#8c3e25"/>`, w: 16, hh: 10 },
};
function patDefs(rot, uid) { return `<defs>${Object.entries(PAT).map(([k, p]) => `<pattern id="${uid}${k}" patternUnits="userSpaceOnUse" width="${p.w}" height="${p.hh}"${rot ? ` patternTransform="rotate(90)"` : ""}><rect width="${p.w}" height="${p.hh}" fill="${p.bg}"/>${p.s()}</pattern>`).join("")}</defs>`; }
function roleOf(name) {
  const n = name.toLowerCase();
  if (/abdichtung/.test(n)) return ["abd", "Abdichtung gegen Wasser"];
  if (/dampf|luftdicht|trennschicht/.test(n)) return ["dicht", "luftdicht / dampfbremsend"];
  if (/wind|unterdach/.test(n)) return ["wind", "winddicht, diffusionsoffen"];
  if (/lüftung|belüft/.test(n)) return ["luft", "Hinterlüftung: Feuchte kann abtrocknen"];
  if (/dämm|wdvs|wärmedämm|xps|eps/.test(n)) return ["warm", "Wärmedämmung"];
  return null;
}
let uidN = 0;
function drawBuild(b, { big = false, nums = true } = {}) {
  const uid = "p" + (uidN++) + "_", L = b.L, n = L.length;
  const minPx = big ? 6 : 4;
  if (b.o === "wall") {
    const avail = big ? 300 : 150, sum = L.reduce((a, l) => a + l[2], 0), sc = Math.min(big ? 9 : 5, avail / sum);
    const H = big ? 260 : 120, x0 = big ? 50 : 32, top = big ? 34 : 18; let x = x0, s = "";
    const lab = [];
    L.forEach((l, i) => {
      const w = Math.max(minPx, l[2] * sc), m = l[1];
      s += `<rect x="${x}" y="${top}" width="${w}" height="${H}" fill="url(#${uid}${m})" stroke="#555" stroke-width=".6"/>`;
      if (m === "folie") s += `<line x1="${x + w / 2}" y1="${top}" x2="${x + w / 2}" y2="${top + H}" stroke="#222" stroke-width="2" stroke-dasharray="6 4"/>`;
      lab.push(x + w / 2); x += w;
    });
    const W = x + (big ? 50 : 32);
    let t = "";
    if (nums) lab.forEach((lx, i) => { const ly = top - (big ? 14 : 8) - (i % 2) * (big ? 0 : 0); t += `<line x1="${lx}" y1="${top + (big ? 30 + i * 18 : 10)}" x2="${lx}" y2="${top - 3}" stroke="#333" stroke-width=".5"/>` + `<circle cx="${lx}" cy="${top - (big ? 13 : 8)}" r="${big ? 9 : 5.5}" class="nb"/><text x="${lx}" y="${top - (big ? 9 : 5.5)}" class="nbt${big ? "" : " s"}" text-anchor="middle">${i + 1}</text>`; });
    if (nums && big) t = ""; // große Ansicht: Nummern über Ebenen-Linien
    if (big) lab.forEach((lx, i) => { const yy = top + 22 + i * ((H - 40) / Math.max(1, n - 1)); t += `<line x1="${lx}" y1="${yy}" x2="${W - 32}" y2="${yy}" stroke="#333" stroke-width=".5"/><circle cx="${W - 22}" cy="${yy}" r="9" class="nb"/><text x="${W - 22}" y="${yy + 4}" class="nbt" text-anchor="middle">${i + 1}</text><circle cx="${lx}" cy="${yy}" r="1.8" fill="#333"/>`; });
    const Wt = big ? W + 0 : W;
    return `<svg viewBox="0 0 ${Wt} ${top + H + (big ? 26 : 14)}" class="bsvg">${patDefs(true, uid)}${s}${t}
     <text x="${big ? x0 - 8 : 1}" y="${top + H + (big ? 18 : 11)}" class="io warm" text-anchor="${big ? "end" : "start"}">innen</text><text x="${big ? x : Wt - 1}" y="${top + H + (big ? 18 : 11)}" class="io cold" text-anchor="${big ? "start" : "end"}">außen</text></svg>`;
  }
  // horizontal (roof: innen unten, floor: innen oben)
  const avail = big ? 300 : 120, sum = L.reduce((a, l) => a + l[2], 0), sc = Math.min(big ? 8 : 4, avail / sum);
  const W = big ? 300 : 150, x0 = big ? 48 : 10; const order = b.o === "roof" ? [...L.keys()].reverse() : [...L.keys()];
  let y = big ? 22 : 12, s = "", t = ""; const ys = {};
  order.forEach(i => { const l = L[i], hgt = Math.max(minPx, l[2] * sc); s += `<rect x="${x0}" y="${y}" width="${W}" height="${hgt}" fill="url(#${uid}${l[1]})" stroke="#555" stroke-width=".6"/>`; if (l[1] === "folie") s += `<line x1="${x0}" y1="${y + hgt / 2}" x2="${x0 + W}" y2="${y + hgt / 2}" stroke="#222" stroke-width="2" stroke-dasharray="6 4"/>`; ys[i] = y + hgt / 2; y += hgt; });
  const Ht = y + (big ? 22 : 12);
  if (big) {
    const n2 = L.length, gap = (y - 22) / n2;
    order.forEach((i, k) => { const ly = 22 + gap * (k + 0.5), lx = x0 + W - 16 - (k % 3) * 22; t += `<polyline points="${lx},${ys[i]} ${x0 + W + 14},${ly}" fill="none" stroke="#333" stroke-width=".5"/><circle cx="${lx}" cy="${ys[i]}" r="1.8" fill="#333"/><circle cx="${x0 + W + 24}" cy="${ly}" r="9" class="nb"/><text x="${x0 + W + 24}" y="${ly + 4}" class="nbt" text-anchor="middle">${i + 1}</text>`; });
  }
  const inY = b.o === "roof" ? Ht - (big ? 6 : 3) : (big ? 14 : 9), outY = b.o === "roof" ? (big ? 14 : 9) : Ht - (big ? 6 : 3);
  return `<svg viewBox="0 0 ${x0 + W + (big ? 40 : 10)} ${Ht}" class="bsvg">${patDefs(false, uid)}${s}${t}<text x="${x0}" y="${inY}" class="io warm">innen</text><text x="${x0}" y="${outY}" class="io cold">${b.id[0] === "b" || b.id === "k1" ? "Erdreich" : b.id === "o3" ? "unbeheizt" : b.id === "o1" ? "Dachboden (kalt)" : "außen"}</text></svg>`;
}
ROUTES.aufbauten = ([bid, mode]) => {
  if (!bid) {
    render(app, `<h1 class="h1">Aufbauten zeichnen</h1>
    <div class="callout"><b>So zeichnest du einen Aufbau in der Prüfung</b><ol>
    <li>Schnitt skizzieren, <b>innen / außen</b> beschriften (Dach: innen unten, Boden: innen oben).</li>
    <li>Schichten von <b>innen nach außen nummerieren</b> und benennen – mit Dicke, ggf. λ bzw. s<sub>d</sub>.</li>
    <li><b>Innen dicht, außen offen</b>: luftdichte Ebene/Dampfbremse auf der warmen Seite, außen winddicht aber diffusionsoffen (s<sub>d</sub> ≤ 0,3 m) [[206]] [[216]].</li>
    <li>Holz- und Leichtbau: <b>Hinterlüftung</b> außen, damit die Konstruktion austrocknen kann.</li>
    <li>Innendämmung / Installationsebene: max. <b>20 %</b> des Wärmedurchlasswiderstands innen [[214]].</li>
    <li>Erdberührt: <b>Abdichtung</b> + feuchteunempfindliche Dämmung (XPS). Umkehrdach: Abdichtung <i>unter</i> der XPS-Dämmung [[219]].</li></ol>
    <p class="small muted">Schraffuren in dieser App sind an die Skizzen der Folien angelehnt: Mauerwerk schräg, Beton gepunktet, weiche Dämmung als Schlaufen, harte Dämmung kreuzschraffiert, Folien gestrichelt.</p></div>
    <div class="blist">${BUILDS.map(b => `<a class="bitem" href="#/aufbauten/${b.id}">${drawBuild(b)}<b>${b.t}</b><small>${b.L.length} Schichten${b.p.length ? ` · Folie ${b.p[0]}` : " · Prüfung"}</small></a>`).join("")}</div>`);
    return;
  }
  const i = BUILDS.findIndex(b => b.id === bid), b = BUILDS[i]; if (!b) return ROUTES.aufbauten([]);
  const prev = BUILDS[i - 1], next = BUILDS[i + 1];
  const legend = `<ol class="legend">${b.L.map((l, k) => { const r = roleOf(l[0]); return `<li><span class="sw" style="background:${PAT[l[1]].bg}"></span><span>${l[0]}${l[3] ? ` <b>${l[3]}</b>` : ""}${r ? ` <em class="role r-${r[0]}">${r[1]}</em>` : ""}</span></li>`; }).join("")}</ol>`;
  render(app, `<nav class="crumb"><a href="#/aufbauten">Aufbauten</a> ›</nav><h1 class="h1">${b.t}</h1>
  <div class="tabs2"><a href="#/aufbauten/${b.id}" class="${mode ? "" : "on"}">Ansehen</a><a href="#/aufbauten/${b.id}/ordnen" class="${mode === "ordnen" ? "on" : ""}">Reihenfolge üben</a><a href="#/aufbauten/${b.id}/zeichnen" class="${mode === "zeichnen" ? "on" : ""}">Selbst zeichnen</a></div>
  <div data-body></div>
  ${b.note ? `<p class="callout">${b.note}</p>` : ""}
  ${b.p.length ? `<h3 class="h3">Originalfolie</h3>${thumbs(b.p)}` : `<p>Quelle: [[P6]]</p>`}
  <div class="pager">${prev ? `<a class="btn ghost" href="#/aufbauten/${prev.id}">‹ ${prev.t}</a>` : "<span></span>"}${next ? `<a class="btn" href="#/aufbauten/${next.id}">${next.t} ›</a>` : ""}</div>`);
  const body = $("[data-body]", app);
  if (!mode) { body.innerHTML = `<div class="bview">${drawBuild(b, { big: true })}${legend}</div>`; math(body); }
  else if (mode === "zeichnen") {
    body.innerHTML = `<div class="callout">Nimm Papier und zeichne <b>${b.t}</b>: Schnitt, innen/außen, alle Schichten nummeriert und benannt. Dann vergleichen.</div><button class="btn" data-rev>Lösung aufdecken</button><div data-sol hidden><div class="bview">${drawBuild(b, { big: true })}${legend}</div></div>`;
    $("[data-rev]", body).onclick = e => { $("[data-sol]", body).hidden = false; e.target.remove(); };
  } else {
    const order = b.L.map((l, k) => k).sort(() => Math.random() - 0.5); let got = [];
    const paint = () => {
      body.innerHTML = `<p>Tippe die Schichten in der richtigen Reihenfolge <b>von innen nach außen</b>.</p>
      <ol class="picked">${got.map(k => `<li>${b.L[k][0]}</li>`).join("")}${got.length < b.L.length ? `<li class="ph">…</li>` : ""}</ol>
      <div class="pool">${order.filter(k => !got.includes(k)).map(k => `<button class="chip" data-k="${k}">${b.L[k][0]}</button>`).join("")}</div>
      ${got.length === b.L.length ? `<p class="okbox">✓ Richtig! <a href="#/aufbauten/${b.id}">Zeichnung ansehen</a> · <a href="#/aufbauten/${b.id}/ordnen" data-again>nochmal</a></p>` : ""}`;
      body.querySelectorAll(".chip").forEach(c => c.onclick = () => {
        const k = +c.dataset.k;
        if (k === got.length || b.L[k][0] === b.L[got.length][0]) { got.push(got.length); paint(); }
        else { c.classList.add("wrong"); setTimeout(() => c.classList.remove("wrong"), 600); }
      });
      const ag = $("[data-again]", body); if (ag) ag.onclick = e => { e.preventDefault(); got = []; order.sort(() => Math.random() - 0.5); paint(); };
    };
    paint();
  }
};

// ---------- Quiz
function mcCard(q, idx, total, onNext) {
  const opts = q.o.map((o, i) => ({ o, i })).sort(() => Math.random() - 0.5);
  const L = "abcd";
  return { html: `<div class="mc"><div class="mchead"><span class="tag c-${q.c}">${CH[q.c].short}</span>${q.x ? `<span class="tag exam">Altprüfung</span>` : ""}<span class="muted small">${idx + 1}/${total}</span></div>
    <p class="mcq">${q.q}</p><div class="opts">${opts.map((x, k) => `<label class="opt"><input type="checkbox" value="${x.i}"><span class="ol">${L[k]})</span><span>${x.o[0]}</span></label>`).join("")}</div>
    <div class="row gap"><button class="btn" data-check>Prüfen</button><button class="btn ghost" data-next hidden>Weiter ›</button></div><div class="expl" hidden></div></div>`,
    bind(root) {
      const chk = $("[data-check]", root), nx = $("[data-next]", root);
      chk.onclick = () => {
        let right = true;
        root.querySelectorAll(".opt").forEach(l => { const inp = l.querySelector("input"), c = q.o[+inp.value][1]; inp.disabled = true; l.classList.add(c ? "corr" : "inc"); if (!!inp.checked !== !!c) { right = false; l.classList.add("miss"); } });
        const st = S.mc[mcId(q)] || [0, 0, 0]; st[right ? 0 : 1]++; st[2] = right ? 1 : 0; S.mc[mcId(q)] = st; save();
        const ex = $(".expl", root); ex.hidden = false;
        render(ex, `<b class="${right ? "ok" : "bad"}">${right ? "✓ Alles richtig" : "✗ Nicht ganz"}</b> – ${q.e} ${q.p.map(p => `[[${p}]]`).join(" ")}`);
        chk.hidden = true; nx.hidden = false; nx.focus();
      };
      nx.onclick = onNext;
    } };
}
function cardView(q, idx, total, onRate) {
  return { html: `<div class="kcard"><div class="mchead"><span class="tag c-${q.c}">${CH[q.c].short}</span><span class="muted small">${idx + 1}/${total}</span></div>
    <p class="mcq">${q.q}</p><p class="small muted">Antwort erst im Kopf (oder auf Papier) formulieren, dann aufdecken.</p>
    <button class="btn" data-rev>Antwort zeigen</button><div class="ans" hidden></div>
    <div class="row gap rate" hidden><button class="btn bad" data-r="0">Wusste ich nicht</button><button class="btn mid" data-r="1">Teilweise</button><button class="btn good" data-r="2">Gewusst</button></div></div>`,
    bind(root) {
      $("[data-rev]", root).onclick = e => { const a = $(".ans", root); a.hidden = false; render(a, q.a + " " + q.p.map(p => `[[${p}]]`).join(" ")); e.target.hidden = true; $(".rate", root).hidden = false; };
      root.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { S.cards[cardId(q)] = +b.dataset.r; save(); onRate(); });
    } };
}
function weighted(list, scoreFn) { // schwache zuerst, sonst zufällig
  return list.map(q => ({ q, w: scoreFn(q) + Math.random() * 0.9 })).sort((a, b) => a.w - b.w).map(x => x.q);
}
ROUTES.quiz = ([mode, cid]) => {
  if (!mode) {
    render(app, `<h1 class="h1">Quiz</h1>
    <h2 class="h2">Karteikarten – offene Fragen</h2><p class="small">Für den Frageteil (Sommer 5, Winter 7, Feuchte 7 Fragen). Schwache Karten kommen öfter.</p>
    <div class="row gap">${CHAPTERS.map(c => { const qs = CARDS.filter(q => q.c === c.id); const k = qs.filter(q => S.cards[cardId(q)] === 2).length; return `<a class="btn c-${c.id}" href="#/quiz/karten/${c.id}">${c.icon} ${c.short} <small>${k}/${qs.length}</small></a>`; }).join("")}<a class="btn" href="#/quiz/karten">Gemischt</a></div>
    <h2 class="h2">Multiple Choice</h2><p class="small">Wie in der Altprüfung: <b>mehrere Antworten können richtig sein</b>. Gewertet wird nur, wenn alle Kreuze stimmen.</p>
    <div class="row gap">${CHAPTERS.map(c => { const [r, n] = mcStats(c.id); return `<a class="btn c-${c.id}" href="#/quiz/mc/${c.id}">${c.icon} ${c.short} <small>${r}/${n}</small></a>`; }).join("")}<a class="btn" href="#/quiz/mc">Gemischt</a><a class="btn" href="#/quiz/mc/alt">Nur Altprüfung</a></div>
    <h2 class="h2">Probeprüfung</h2><p class="small">Zufällig zusammengestellt nach dem Prüfungsschema: Sommer 5 Fragen + 1 Rechnung, Winter 7 + 1, Feuchte 7 + 1, 1 Aufbau zeichnen, 10 MC.</p>
    <a class="btn big" href="#/quiz/probe">Probeprüfung starten</a>
    <p class="small muted" style="margin-top:2em"><button class="btn ghost" data-reset>Quiz-Fortschritt zurücksetzen</button></p>`);
    $("[data-reset]", app).onclick = () => { if (confirm("Quiz- und Kartenfortschritt löschen?")) { S.mc = {}; S.cards = {}; save(); route(); } };
    return;
  }
  if (mode === "mc") {
    let qs = MC.filter(q => !cid || cid === "alt" ? (cid === "alt" ? q.x : true) : q.c === cid);
    qs = weighted(qs, q => { const s = S.mc[mcId(q)]; return s ? (s[2] ? 2 : 0.5) : 1; });
    let i = 0;
    const show = () => {
      if (i >= qs.length) { render(app, `<h1 class="h1">Fertig!</h1><p>${qs.filter(q => (S.mc[mcId(q)] || [])[2]).length} von ${qs.length} Fragen zuletzt richtig.</p><a class="btn" href="#/quiz">Zurück</a> <a class="btn ghost" href="#/quiz/mc/${cid || ""}" onclick="setTimeout(route)">Nochmal</a>`); return; }
      const v = mcCard(qs[i], i, qs.length, () => { i++; show(); window.scrollTo(0, 0); });
      render(app, `<nav class="crumb"><a href="#/quiz">Quiz</a> › Multiple Choice ${cid && CH[cid] ? CH[cid].short : cid === "alt" ? "Altprüfung" : "gemischt"}</nav>` + v.html); v.bind(app);
    };
    show(); return;
  }
  if (mode === "karten") {
    let qs = weighted(CARDS.filter(q => !cid || q.c === cid), q => { const s = S.cards[cardId(q)]; return s === undefined ? 1 : s; });
    let i = 0;
    const show = () => {
      if (i >= qs.length) { render(app, `<h1 class="h1">Stapel durch!</h1><a class="btn" href="#/quiz">Zurück</a>`); return; }
      const v = cardView(qs[i], i, qs.length, () => { i++; show(); window.scrollTo(0, 0); });
      render(app, `<nav class="crumb"><a href="#/quiz">Quiz</a> › Karteikarten ${cid ? CH[cid].short : "gemischt"}</nav>` + v.html); v.bind(app);
    };
    show(); return;
  }
  if (mode === "probe") {
    const take = (arr, k) => [...arr].sort(() => Math.random() - .5).slice(0, k);
    const parts = [["sommer", 5], ["winter", 7], ["feuchte", 7]];
    let html = `<nav class="crumb"><a href="#/quiz">Quiz</a> › Probeprüfung</nav><h1 class="h1">Probeprüfung</h1><p class="small">Beantworte alles zuerst auf Papier. Dann je Aufgabe aufdecken und selbst bewerten. <a href="#/quiz/probe" onclick="setTimeout(route)">Neue Zusammenstellung ↻</a></p>`;
    let n = 0; const drillTasks = [];
    parts.forEach(([c, k]) => {
      html += `<h2 class="h2 c-${c}t">${CH[c].icon} ${CH[c].title}</h2>`;
      take(CARDS.filter(q => q.c === c), k).forEach(q => { n++; html += `<div class="pq"><p><b>${n}.</b> ${q.q}</p><details><summary>Lösung</summary><div>${q.a} ${q.p.map(p => `[[${p}]]`).join(" ")}</div></details></div>`; });
      const d = pick(DRILLS.filter(x => x.c === c)), t = d.gen(); drillTasks.push(t); n++;
      html += `<div class="pq calc"><p><b>${n}. Rechnung – ${d.t}:</b> ${t.q}</p><details><summary>Lösung</summary><ol class="steps">${t.s.map(x => `<li>${x}</li>`).join("")}</ol><p>Ergebnis: ${t.a.map(a => `${a.l} = <b>${num(a.v, a.d ?? 2)} ${a.u}</b>`).join(" · ")}${t.yn ? ` · ${t.yn.l} <b>${t.yn.v ? "ja" : "nein"}</b>` : ""}</p></details></div>`;
    });
    const b = pick(BUILDS); n++;
    html += `<h2 class="h2">▤ Zeichenbeispiel</h2><div class="pq"><p><b>${n}.</b> Zeichne den Aufbau: <b>${b.t}</b>. Nummeriere die Schichten von innen nach außen und benenne ihre Funktion.</p><details><summary>Lösung</summary><div class="bview">${drawBuild(b, { big: true })}<ol class="legend">${b.L.map(l => `<li>${l[0]}</li>`).join("")}</ol></div></details></div>`;
    html += `<h2 class="h2">✓ Multiple Choice</h2><div data-mc></div>`;
    render(app, html);
    const mcs = take(MC, 10), box = $("[data-mc]", app);
    mcs.forEach((q, k) => { const d = document.createElement("div"); box.appendChild(d); const v = mcCard(q, k, 10, () => { }); render(d, v.html); v.bind(d); $("[data-next]", d).remove(); });
    return;
  }
  ROUTES.quiz([]);
};

// ---------- Folien
ROUTES.folien = async ([doc, page]) => {
  await loadManifest(); await restoreKey();
  if (doc && page) { openSlide(doc, +page); history.replaceState(null, "", "#/folien"); }
  let html = `<h1 class="h1">Folien</h1>`;
  if (!KEY) { render(app, html + lockedHTML()); return; }
  html += `<div class="row gap"><input type="search" placeholder="In den Folien suchen … (z. B. Taupunkt, n50, Umkehrdach)" data-q class="search"></div><div data-hits></div>
  <div class="row gap"><a class="btn" href="#" data-slide="1" data-doc="f">Formelsammlung (8 S.)</a><a class="btn" href="#" data-slide="2" data-doc="p">Altprüfung 1. Termin (6 S.)</a></div>
  ${TOPICS.map(t => { const ps = []; for (let k = t[1]; k <= t[2]; k++) ps.push(k); return `<details class="topic"><summary><b>${t[0]}</b> <span class="muted small">Folien ${t[1]}–${t[2]}</span></summary>${thumbs(ps)}</details>`; }).join("")}`;
  render(app, html);
  app.querySelectorAll("details.topic").forEach(d => d.addEventListener("toggle", () => observeThumbs(d)));
  const q = $("[data-q]", app), hits = $("[data-hits]", app);
  q.oninput = async () => {
    const s = q.value.trim().toLowerCase(); if (s.length < 3) { hits.innerHTML = ""; return; }
    const tx = await getTexts("g"); const res = Object.entries(tx).filter(([, v]) => v.toLowerCase().includes(s)).slice(0, 40);
    hits.innerHTML = res.length ? `<p class="small">${res.length} Treffer${res.length === 40 ? " (erste 40)" : ""} – gescannte Folien 189–206 sind nicht durchsuchbar.</p>` + thumbs(res.map(r => +r[0])) : `<p class="small">Keine Treffer.</p>`;
    observeThumbs(hits);
  };
};

// ---------- Start
(async function init() {
  const hk = location.hash.match(/^#key=(.+)$/);
  if (hk) { try { await unlock(decodeURIComponent(hk[1])); } catch { } history.replaceState(null, "", location.pathname + "#/"); }
  await restoreKey();
  loadManifest().catch(() => { });
  route();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => { });
})();

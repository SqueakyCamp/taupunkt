// Interaktive Rechner/Visualisierungen. WIDGETS[id](el) rendert in el.
const WIDGETS = {};
const h = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); e.innerHTML = html; return e; };
function inp(label, key, val, opt = {}) {
  const step = opt.step ?? "any", unit = opt.unit ? `<span class="u">${opt.unit}</span>` : "";
  if (opt.range) return `<label class="f rng"><span>${label}</span><input type="range" data-k="${key}" min="${opt.range[0]}" max="${opt.range[1]}" step="${opt.range[2]}" value="${val}"><b data-o="${key}"></b>${unit}</label>`;
  if (opt.sel) return `<label class="f"><span>${label}</span><select data-k="${key}">${opt.sel.map(([v, t]) => `<option value="${v}"${v == val ? " selected" : ""}>${t}</option>`).join("")}</select></label>`;
  return `<label class="f"><span>${label}</span><span class="iw"><input type="text" inputmode="decimal" data-k="${key}" value="${String(val).replace(".", ",")}">${unit}</span></label>`;
}
function readVals(el) { const o = {}; el.querySelectorAll("[data-k]").forEach(i => { o[i.dataset.k] = i.tagName === "SELECT" ? i.value : parseNum(i.value); }); return o; }
function bindAll(el, fn) { el.addEventListener("input", fn); el.addEventListener("change", fn); fn(); }
function showRanges(el, fmt = {}) { el.querySelectorAll("input[type=range]").forEach(r => { const o = el.querySelector(`[data-o="${r.dataset.k}"]`); if (o) o.textContent = num(+r.value, fmt[r.dataset.k] ?? 2); }); }
const math = (el) => { if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "\\(", right: "\\)", display: false }], throwOnError: false }); };

// ---- SVG helpers
function svgLine(pts, cls) { return `<polyline class="${cls}" fill="none" points="${pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}"/>`; }
function axis(x0, y0, w, hgt, xt, yt, sx, sy, xl, yl) {
  let s = `<line class="ax" x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0}"/><line class="ax" x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - hgt}"/>`;
  xt.forEach(v => s += `<line class="gr" x1="${sx(v)}" y1="${y0}" x2="${sx(v)}" y2="${y0 - hgt}"/><text class="tk" x="${sx(v)}" y="${y0 + 14}" text-anchor="middle">${num(v, 0)}</text>`);
  yt.forEach(v => s += `<line class="gr" x1="${x0}" y1="${sy(v)}" x2="${x0 + w}" y2="${sy(v)}"/><text class="tk" x="${x0 - 5}" y="${sy(v) + 4}" text-anchor="end">${num(v, 0)}</text>`);
  if (xl) s += `<text class="al" x="${x0 + w}" y="${y0 + 28}" text-anchor="end">${xl}</text>`;
  if (yl) s += `<text class="al" x="${x0 - 30}" y="${y0 - hgt - 8}">${yl}</text>`;
  return s;
}

// ========== U-WERT ==========
const MATS = [
  ["Innenputz (Kalkzement)", 0.70, 10], ["Gipskartonplatte", 0.25, 10], ["Hochlochziegel", 0.26, 10], ["Ziegel (Folie 23)", 0.25, 10],
  ["Normalbeton bewehrt", 2.5, 100], ["Beton (Prüfung)", 2.4, 100], ["Porenbeton", 0.195, 10], ["Fichtenholz / BSP", 0.12, 50], ["OSB-Platte", 0.13, 165],
  ["EPS-Dämmung", 0.038, 60], ["XPS-Dämmung", 0.038, 150], ["Mineralwolle", 0.040, 1], ["Holzfaserdämmplatte", 0.051, 5], ["Zementestrich", 1.1, 35], ["Außenputz", 0.70, 15],
];
const UPRESETS = {
  f23: { n: "Ziegel 20 + Dämmung 20 (Folie 23)", rsi: 0.13, rse: 0.04, ti: 22, te: -5, L: [["Ziegel", 20, 0.25], ["Dämmstoff", 20, 0.04]] },
  dach: { n: "Hinterlüftetes Dach (Prüfung)", rsi: 0.10, rse: 0.10, ti: 22, te: -5, L: [["Beton", 20, 2.4], ["Wärmedämmung", 10, 0.04]] },
  hlz: { n: "Hochlochziegel 38 verputzt", rsi: 0.13, rse: 0.04, ti: 22, te: -5, L: [["Innenputz", 1.5, 0.7], ["Hochlochziegel", 38, 0.26], ["Außenputz", 2.5, 0.7]] },
  bet: { n: "Beton 20 ungedämmt", rsi: 0.13, rse: 0.04, ti: 22, te: -5, L: [["Beton", 20, 2.5]] },
  wdvs: { n: "Beton 20 + EPS 16 (WDVS)", rsi: 0.13, rse: 0.04, ti: 22, te: -5, L: [["Innenputz", 1, 0.7], ["Beton", 20, 2.5], ["EPS", 16, 0.038], ["Außenputz", 0.5, 0.7]] },
};
const LAYCOL = ["#c9b79c", "#e2a77d", "#cfd5dc", "#f1df8a", "#d9c2a0", "#b8d4c2", "#e7c6d6", "#c7c1e6"];
WIDGETS.ucalc = (el) => {
  let st = JSON.parse(JSON.stringify(UPRESETS.f23));
  const draw = () => {
    el.innerHTML = `<div class="wtitle">Rechner: U-Wert & Temperaturverlauf</div>
    <div class="row">${inp("Beispiel", "preset", "", { sel: [["", "– wählen –"], ...Object.entries(UPRESETS).map(([k, v]) => [k, v.n])] })}</div>
    <table class="lay"><thead><tr><th>#</th><th>Schicht (innen → außen)</th><th>d [cm]</th><th>λ [W/mK]</th><th>R</th><th></th></tr></thead><tbody>
    ${st.L.map((l, i) => `<tr><td>${i + 1}</td><td><input data-l="${i}" data-f="0" value="${esc(l[0])}"></td><td><input inputmode="decimal" data-l="${i}" data-f="1" value="${String(l[1]).replace(".", ",")}"></td><td><input inputmode="decimal" data-l="${i}" data-f="2" value="${String(l[2]).replace(".", ",")}"></td><td class="mono" data-r="${i}"></td><td><button class="mini" data-del="${i}" aria-label="Schicht löschen">✕</button></td></tr>`).join("")}
    </tbody></table>
    <div class="row"><button class="mini" data-add>+ Schicht</button>
    <select class="mini" data-addmat><option value="">+ Material aus Liste …</option>${MATS.map((m, i) => `<option value="${i}">${m[0]} (λ ${num(m[1], 3)})</option>`).join("")}</select></div>
    <div class="row">${inp("R<sub>si</sub>", "rsi", st.rsi, { sel: [[0.10, "0,10 aufwärts (Dach)"], [0.13, "0,13 horizontal (Wand)"], [0.17, "0,17 abwärts"], [0.25, "0,25 Feuchteschutz"]] })}
    ${inp("R<sub>se</sub>", "rse", st.rse, { sel: [[0.04, "0,04 außen"], [0.10, "0,10 belüftet, nach oben"], [0.13, "0,13 belüftet, Wand"], [0.17, "0,17 belüftet, nach unten"]] })}
    ${inp("ϑ<sub>i</sub>", "ti", st.ti, { unit: "°C" })}${inp("ϑ<sub>e</sub>", "te", st.te, { unit: "°C" })}</div>
    <div class="out" data-out></div><div class="svgwrap" data-svg></div>`;
    calc();
  };
  const calc = () => {
    const rsi = +el.querySelector('[data-k="rsi"]').value, rse = +el.querySelector('[data-k="rse"]').value;
    const ti = parseNum(el.querySelector('[data-k="ti"]').value), te = parseNum(el.querySelector('[data-k="te"]').value);
    st.rsi = rsi; st.rse = rse; st.ti = ti; st.te = te;
    const Rs = st.L.map(l => (l[1] / 100) / l[2]);
    Rs.forEach((r, i) => { const c = el.querySelector(`[data-r="${i}"]`); if (c) c.textContent = isFinite(r) ? num(r, 3) : "–"; });
    const RT = rsi + Rs.reduce((a, b) => a + b, 0) + rse, U = 1 / RT, q = U * (ti - te);
    const temps = [ti]; let t = ti - q * rsi; temps.push(t);
    Rs.forEach(r => { t -= q * r; temps.push(t); });
    const parts = Rs.map((r, i) => `\\frac{${num(st.L[i][1] / 100, 3)}}{${num(st.L[i][2], 3)}}`).join("+");
    el.querySelector("[data-out]").innerHTML = `$$U=\\frac{1}{${num(rsi, 2)}+${parts}+${num(rse, 2)}}=\\frac{1}{${num(RT, 3)}}=\\mathbf{${num(U, 3)}}\\ \\mathrm{W/m^2K}$$
     <div class="kv"><span>q = U·Δϑ</span><b>${num(q, 2)} W/m²</b><span>ϑ<sub>si</sub> (innen Oberfl.)</span><b>${num(temps[1], 1)} °C</b><span>f<sub>Rsi</sub></span><b>${num((temps[1] - te) / (ti - te), 2)}</b></div>`;
    math(el.querySelector("[data-out]"));
    // SVG Temperaturverlauf
    const W = 560, H = 230, x0 = 46, w = W - 90, y0 = 190, hh = 160;
    const tot = st.L.reduce((a, l) => a + Math.max(l[1], 0.5), 0) || 1;
    const air = 28; const sx0 = x0 + air, sw = w - 2 * air;
    const tmin = Math.min(te, ...temps) - 2, tmax = Math.max(ti, ...temps) + 2;
    const sy = v => y0 - (v - tmin) / (tmax - tmin) * hh;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart">`;
    let x = sx0; const xs = [sx0];
    st.L.forEach((l, i) => { const ww = Math.max(l[1], 0.5) / tot * sw; s += `<rect x="${x}" y="${y0 - hh}" width="${ww}" height="${hh}" fill="${LAYCOL[i % LAYCOL.length]}" opacity=".55"/><text class="tk" x="${x + ww / 2}" y="${y0 - hh - 6}" text-anchor="middle">${i + 1}</text>`; x += ww; xs.push(x); });
    s += `<text class="al" x="${x0 + 2}" y="${y0 - hh + 12}">innen</text><text class="al" x="${x0 + w - 2}" y="${y0 - hh + 12}" text-anchor="end">außen</text>`;
    const pts = [[x0, sy(ti)], [sx0, sy(temps[1])], ...xs.slice(1).map((xx, i) => [xx, sy(temps[i + 2])]), [x0 + w, sy(te)]];
    s += svgLine(pts, "tline");
    pts.forEach((p, i) => { if (i > 0 && i < pts.length - 1) s += `<circle cx="${p[0]}" cy="${p[1]}" r="3" class="tdot"/><text class="tk" x="${p[0] + 3}" y="${p[1] - 5}">${num(i === 1 ? temps[1] : temps[i], 1)}°</text>`; });
    s += `<text class="tk" x="${x0}" y="${sy(ti) - 6}">${num(ti, 0)} °C</text><text class="tk" x="${x0 + w}" y="${sy(te) + 14}" text-anchor="end">${num(te, 0)} °C</text>`;
    s += `<line class="ax" x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0}"/><text class="al" x="${W / 2}" y="${H - 8}" text-anchor="middle">Temperaturverlauf – steil in Schichten mit großem R (Dämmung)</text></svg>`;
    el.querySelector("[data-svg]").innerHTML = s;
  };
  el.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.k === "preset" && t.value) { st = JSON.parse(JSON.stringify(UPRESETS[t.value])); draw(); return; }
    if (t.dataset.addmat !== undefined && t.value !== "") { const m = MATS[+t.value]; st.L.push([m[0], 10, m[1]]); draw(); return; }
    calc();
  });
  el.addEventListener("input", e => {
    const t = e.target;
    if (t.dataset.l !== undefined) { const i = +t.dataset.l, f = +t.dataset.f; st.L[i][f] = f === 0 ? t.value : parseNum(t.value); calc(); }
    else if (t.dataset.k && t.dataset.k !== "preset") calc();
  });
  el.addEventListener("click", e => {
    const t = e.target;
    if (t.dataset.del !== undefined) { st.L.splice(+t.dataset.del, 1); draw(); }
    if (t.dataset.add !== undefined) { st.L.push(["Neue Schicht", 10, 0.04]); draw(); }
  });
  draw();
};

// ========== FENSTER U_w ==========
WIDGETS.uw = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: U<sub>w</sub> eines Fensters</div>
  <div class="row">${inp("Breite außen", "b", 150, { unit: "cm" })}${inp("Höhe außen", "hh", 130, { unit: "cm" })}${inp("Rahmenbreite", "r", 15, { unit: "cm" })}
  ${inp("Glasfelder", "n", 1, { sel: [[1, "1"], [2, "2 (Mittelsteg)"]] })}${inp("Mittelsteg", "m", 20, { unit: "cm" })}</div>
  <div class="row">${inp("U<sub>g</sub>", "ug", 0.8, { unit: "W/m²K" })}${inp("U<sub>f</sub>", "uf", 1.0, { unit: "W/m²K" })}${inp("ψ", "psi", 0.02, { unit: "W/mK" })}</div>
  <div class="flex"><div class="svgwrap" data-svg style="flex:0 0 150px"></div><div class="out" data-out style="flex:1"></div></div>`;
  bindAll(el, () => {
    const v = readVals(el); const n = +v.n;
    const B = v.b / 100, H = v.hh / 100, r = v.r / 100, m = n === 2 ? v.m / 100 : 0;
    const gw = (B - 2 * r - m) / n, gh = H - 2 * r;
    const Aw = B * H, Ag = n * gw * gh, Af = Aw - Ag, l = n * 2 * (gw + gh);
    const Uw = (Af * v.uf + Ag * v.ug + l * v.psi) / Aw;
    el.querySelector("[data-out]").innerHTML = `<div class="kv"><span>A<sub>w</sub></span><b>${num(Aw, 2)} m²</b><span>A<sub>g</sub></span><b>${num(Ag, 2)} m²</b><span>A<sub>f</sub> = A<sub>w</sub> − A<sub>g</sub></span><b>${num(Af, 2)} m²</b><span>l<sub>g</sub> (Glasumfang)</span><b>${num(l, 2)} m</b></div>
    $$U_w=\\frac{${num(Af, 2)}\\cdot${num(v.uf, 2)}+${num(Ag, 2)}\\cdot${num(v.ug, 2)}+${num(l, 2)}\\cdot${num(v.psi, 3)}}{${num(Aw, 2)}}=\\mathbf{${num(Uw, 2)}}\\ \\mathrm{W/m^2K}$$
    <p class="small">Anteil Rahmen am Verlust: ${num(Af * v.uf / (Uw * Aw) * 100, 0)} % · Randverbund: ${num(l * v.psi / (Uw * Aw) * 100, 0)} %</p>`;
    math(el.querySelector("[data-out]"));
    const sc = 130 / Math.max(B, H); const W = B * sc, HH = H * sc;
    let s = `<svg viewBox="-5 -5 ${W + 10} ${HH + 10}" class="chart"><rect x="0" y="0" width="${W}" height="${HH}" fill="#a86b2d"/>`;
    for (let i = 0; i < n; i++) s += `<rect x="${(r + i * (gw + m)) * sc}" y="${r * sc}" width="${gw * sc}" height="${gh * sc}" fill="#5ab4e6"/>`;
    el.querySelector("[data-svg]").innerHTML = s + "</svg>";
  });
};

// ========== HWB BLAUER WÜRFEL ==========
WIDGETS.hwb = (el) => {
  el.innerHTML = `<div class="wtitle">Spielwiese: Energiebilanz „blauer Würfel“ im Jänner</div>
  <p class="small">Ausgangswerte = Folienbeispiel (Q<sub>h</sub> = 702 kWh). Schieb an den Reglern und beobachte, welche Größe wie stark wirkt.</p>
  <div class="row">${inp("U Wand", "uw", 0.17, { range: [0.1, 1.5, 0.01] })}${inp("U Fenster", "uf", 0.92, { range: [0.6, 3, 0.01] })}${inp("ϑ<sub>e</sub> (°C)", "te", -1.5, { range: [-10, 10, 0.5] })}
  ${inp("Luftwechsel n", "n", 0.28, { range: [0.1, 1.5, 0.01] })}${inp("g-Wert", "g", 0.58, { range: [0.3, 0.8, 0.01] })}${inp("η", "eta", 1, { range: [0.5, 1, 0.01] })}</div>
  <div data-out></div>`;
  bindAll(el, () => {
    showRanges(el, { te: 1 });
    const v = {}; el.querySelectorAll("[data-k]").forEach(i => v[i.dataset.k] = +i.value);
    const Le = 4 * v.uf + 76 * v.uw + 25 * 0.16, LT = Le + 13.72 + 5.25, dT = 22 - v.te, t = 744;
    const QT = LT * dT * t / 1000, LV = 0.34 * v.n * 52, QV = LV * dT * t / 1000;
    const Qs = 40 * 4 * 0.7 * 0.65 * v.g * 0.9 * 0.98, Qi = 2.69 * 25 * 0.8 * t / 1000;
    const Qh = Math.max(0, QT + QV - v.eta * (Qs + Qi));
    const mx = Math.max(QT + QV, 1);
    const bar = (lab, val, cls, extra = "") => `<div class="bar"><span>${lab}</span><div><i class="${cls}" style="width:${Math.min(100, val / mx * 100)}%"></i></div><b>${num(val, 0)} kWh</b>${extra}</div>`;
    el.querySelector("[data-out]").innerHTML = `<div class="bars">${bar("Q<sub>T</sub> Transmission", QT, "loss")}${bar("Q<sub>V</sub> Lüftung", QV, "loss2")}${bar("Q<sub>s</sub> solar", Qs, "gain")}${bar("Q<sub>i</sub> innere", Qi, "gain2")}${bar("<b>Q<sub>h</sub> = HWB</b>", Qh, "res")}</div>
    <p class="small mono">L<sub>T</sub> = ${num(LT, 2)} W/K · L<sub>V</sub> = ${num(LV, 2)} W/K · Q<sub>h</sub> = (${num(QT, 0)} + ${num(QV, 0)}) − ${num(v.eta, 2)}·(${num(Qs, 0)} + ${num(Qi, 0)}) = <b>${num(Qh, 0)} kWh</b></p>`;
  });
};

// ========== CO2 / PEB ==========
const FACT = {
  "2023": [["Fossil fest (Kohle)", 1.46, 360], ["Fossil flüssig (Heizöl)", 1.20, 271], ["Fossil gasförmig (Erdgas)", 1.10, 201], ["Biogen fest (Pellets, Holz)", 1.13, 9], ["Elektrische Energie (Liefermix)", 1.76, 156], ["Fernwärme Heizwerk erneuerbar", 1.72, 59], ["Fernwärme Heizwerk nicht erneuerbar", 1.48, 193], ["Fernwärme hocheffiziente KWK", 0.59, 67], ["Abwärme", 1.00, 22]],
  "2026": [["Fossil fest (Kohle)", 1.46, 360], ["Fossil flüssig (Heizöl)", 1.20, 271], ["Fossil gasförmig (Erdgas)", 1.10, 201], ["Biogen fest (Pellets, Holz)", 1.13, 9], ["Elektrische Energie", 1.43, 74], ["Fernwärme Heizwerk erneuerbar", 1.27, 25], ["Fernwärme Heizwerk nicht erneuerbar", 1.19, 118], ["Fernwärme aus KWK", 0.71, 22], ["Abwärme", 0.30, 22]],
};
WIDGETS.co2 = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: Primärenergie & CO₂ aus dem Endenergiebedarf</div>
  <div class="row">${inp("Faktoren", "set", "2023", { sel: [["2023", "OIB RL6:2023 (Prüfung)"], ["2026", "2026 bis 2035"]] })}</div>
  <div class="row">${inp("Energieträger 1", "e1", 3, { sel: FACT["2023"].map((f, i) => [i, f[0]]) })}${inp("Menge", "q1", 7500, { unit: "kWh/a" })}</div>
  <div class="row">${inp("Energieträger 2", "e2", 4, { sel: FACT["2023"].map((f, i) => [i, f[0]]) })}${inp("Menge", "q2", 3500, { unit: "kWh/a" })}</div>
  <div class="out" data-out></div>`;
  bindAll(el, () => {
    const v = readVals(el); const F = FACT[v.set];
    const a = F[v.e1], b = F[v.e2];
    const c = v.q1 * a[2] / 1000 + v.q2 * b[2] / 1000, pe = v.q1 * a[1] + v.q2 * b[1];
    el.querySelector("[data-out]").innerHTML = `$$CO_2=${num(v.q1, 0)}\\cdot${num(a[2] / 1000, 3)}+${num(v.q2, 0)}\\cdot${num(b[2] / 1000, 3)}=\\mathbf{${num(c, 1)}}\\ \\mathrm{kg\\,CO_{2eq}/a}$$
    $$PEB=${num(v.q1, 0)}\\cdot${num(a[1], 2)}+${num(v.q2, 0)}\\cdot${num(b[1], 2)}=\\mathbf{${num(pe, 0)}}\\ \\mathrm{kWh/a}$$<p class="small">f<sub>CO₂</sub> in g/kWh → durch 1000 für kg/kWh.</p>`;
    math(el.querySelector("[data-out]"));
  });
};

// ========== KOMPAKTHEIT ==========
WIDGETS.lc = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: Kompaktheit eines Quaders</div>
  <div class="row">${inp("Länge", "l", 10, { range: [4, 60, 1] })}${inp("Breite", "b", 10, { range: [4, 40, 1] })}${inp("Geschoße (à 3 m)", "g", 1, { range: [1, 8, 1] })}</div><div class="out" data-out></div>`;
  bindAll(el, () => {
    showRanges(el, { l: 0, b: 0, g: 0 });
    const v = {}; el.querySelectorAll("[data-k]").forEach(i => v[i.dataset.k] = +i.value);
    const H = v.g * 3, V = v.l * v.b * H, A = 2 * (v.l * v.b + v.l * H + v.b * H);
    el.querySelector("[data-out]").innerHTML = `<div class="kv"><span>V</span><b>${num(V, 0)} m³</b><span>A (Hüllfläche)</span><b>${num(A, 0)} m²</b><span>A/V</span><b>${num(A / V, 2)} m⁻¹</b><span>l<sub>c</sub> = V/A</span><b>${num(V / A, 2)} m</b></div><p class="small">Größeres l<sub>c</sub> = kompakter = weniger Hülle pro Volumen.</p>`;
  });
};

// ========== SOMMER ==========
const TNAT = [["Wien – Innere Stadt", 24.9], ["Wien – Favoriten", 23.5], ["Eisenstadt", 23.5], ["St. Pölten", 22.5], ["Linz", 22.6], ["Graz Stadt", 21.8], ["Klagenfurt", 21.8], ["Salzburg", 21.7], ["Innsbruck", 21.2], ["Bregenz", 21.9]];
WIDGETS.topmax = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: T<sub>op,max</sub> nach OIB-RL 6</div>
  <div class="row">${inp("Ort (Obergrenze lt. Folie 138)", "ort", 0, { sel: TNAT.map((t, i) => [i, `${t[0]} (${num(t[1], 1)} °C)`]) })}${inp("oder T<sub>NAT,13</sub>", "t", 24.9, { unit: "°C" })}</div><div class="out" data-out></div>`;
  el.querySelector('[data-k="ort"]').addEventListener("change", e => { el.querySelector('[data-k="t"]').value = String(TNAT[+e.target.value][1]).replace(".", ","); });
  bindAll(el, () => {
    const t = parseNum(el.querySelector('[data-k="t"]').value);
    el.querySelector("[data-out]").innerHTML = `$$T_{op,max}=\\tfrac13\\cdot${num(t, 1)}+21{,}8=\\mathbf{${num(t / 3 + 21.8, 1)}\\,^\\circ C}$$`;
    math(el.querySelector("[data-out]"));
  });
};
WIDGETS.optemp = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: operative Raumtemperatur</div>
  <div class="row">${inp("Raum L", "l", 4, { unit: "m" })}${inp("B", "b", 4, { unit: "m" })}${inp("H", "hh", 3, { unit: "m" })}${inp("Fenster", "af", 0, { unit: "m²" })}</div>
  <div class="row">${inp("ϑ Luft", "tl", 22, { range: [15, 32, 0.5] })}${inp("ϑ Wände", "tw", 19, { range: [10, 35, 0.5] })}${inp("ϑ Boden", "tb", 17, { range: [10, 35, 0.5] })}${inp("ϑ Decke", "td", 17, { range: [10, 40, 0.5] })}${inp("ϑ Fenster", "tf", 14, { range: [5, 40, 0.5] })}</div>
  <div class="out" data-out></div>`;
  bindAll(el, () => {
    showRanges(el, { tl: 1, tw: 1, tb: 1, td: 1, tf: 1 });
    const v = readVals(el); el.querySelectorAll("input[type=range]").forEach(i => v[i.dataset.k] = +i.value);
    const Aw = 2 * (v.l + v.b) * v.hh - v.af, Ab = v.l * v.b;
    const A = Aw + 2 * Ab + v.af, tu = (Aw * v.tw + Ab * v.tb + Ab * v.td + v.af * v.tf) / A, top = (v.tl + tu) / 2;
    el.querySelector("[data-out]").innerHTML = `$$\\vartheta_U=\\frac{${num(Aw, 0)}\\cdot${num(v.tw, 1)}+${num(Ab, 0)}\\cdot${num(v.tb, 1)}+${num(Ab, 0)}\\cdot${num(v.td, 1)}${v.af ? `+${num(v.af, 0)}\\cdot${num(v.tf, 1)}` : ""}}{${num(A, 0)}}=${num(tu, 1)}\\,^\\circ C\\qquad \\vartheta_{op}=\\frac{${num(v.tl, 1)}+${num(tu, 1)}}{2}=\\mathbf{${num(top, 1)}\\,^\\circ C}$$
    <p class="small">${Math.abs(v.tl - tu) > 2 ? "⚠ Luft und Oberflächen unterscheiden sich um mehr als 2 K (Richtwert)." : "✓ Unterschied Luft/Oberfläche ≤ 2 K."}</p>`;
    math(el.querySelector("[data-out]"));
  });
};
const MWB = [[200, "Beton 20 cm (Linie E) – 200"], [118, "Hochlochziegel 20 cm – ca. 103–118"], [60, "Schwimmender Estrich 5 cm – 60"], [30, "Holzleichtbau + Gipskarton (Linie I) – 30"], [81, "Stampf-/Blähtonbeton 20 cm (G) – 81"], [54, "Gipskarton 2×15 mm (K) – 54"]];
const ZON = [[1.00, "S vertikal 1,00"], [1.14, "SO/SW vertikal 1,14"], [1.13, "O/W vertikal 1,13"], [0.54, "N vertikal 0,54"], [1.69, "S 30° 1,69"], [1.93, "S 45° 1,93"], [2.06, "horizontal 2,06"]];
function minMw(vls) { if (vls >= 100) return 2000; if (vls >= 75) return 4000 - (vls - 75) * (4000 - 2000) / 25; if (vls >= 50) return 8000 - (vls - 50) * (8000 - 4000) / 25; return NaN; }
WIDGETS.mwi = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: Nachweis speicherwirksame Masse (vereinfachtes Verfahren)</div>
  <div class="row">${inp("Raum L", "l", 4, { unit: "m" })}${inp("B", "b", 4, { unit: "m" })}${inp("H", "hh", 3, { unit: "m" })}${inp("n<sub>L</sub>", "n", 1.5, { unit: "1/h" })}</div>
  <div class="row">${inp("Fenster A<sub>F</sub>", "af", 4, { unit: "m²" })}${inp("f<sub>g</sub>", "fg", 0.7)}${inp("g", "g", 0.58)}${inp("Z<sub>ON</sub>", "zon", 1, { sel: ZON })}${inp("z", "z", 0.78)}</div>
  <div class="row">${inp("Wände m<sub>w,B,A</sub>", "mw", 200, { sel: MWB })}${inp("Decke/Dach", "md", 30, { sel: MWB })}${inp("Boden", "mb", 60, { sel: MWB })}</div>
  <div class="out" data-out></div>`;
  bindAll(el, () => {
    const v = readVals(el);
    const AI = v.af * v.fg * v.g * +v.zon * v.z, V = v.l * v.b * v.hh, VL = v.n * V, VLs = VL / AI, mn = minMw(VLs);
    const Awand = 2 * (v.l + v.b) * v.hh - v.af, Ab = v.l * v.b;
    const mw = Awand * v.mw + Ab * v.md + Ab * v.mb + Ab * 38, mwi = mw / AI, ok = mwi >= mn;
    el.querySelector("[data-out]").innerHTML = `<ol class="steps small">
    <li>\\(A_I=${num(v.af, 2)}\\cdot${num(v.fg, 2)}\\cdot${num(v.g, 2)}\\cdot${num(+v.zon, 2)}\\cdot${num(v.z, 2)}=${num(AI, 2)}\\ \\mathrm{m^2}\\)</li>
    <li>\\(\\dot V_L=${num(v.n, 2)}\\cdot${num(V, 1)}=${num(VL, 1)}\\ \\mathrm{m^3/h}\\quad \\dot V_{L,s}=${num(VL, 1)}/${num(AI, 2)}=${num(VLs, 1)}\\ \\mathrm{m^3/hm^2}\\)</li>
    <li>${isNaN(mn) ? "V̇<sub>L,s</sub> &lt; 50 → hohes Überwärmungsrisiko, nicht zulässig!" : `\\(\\min m_{w,I}=${num(mn, 0)}\\ \\mathrm{kg/m^2}\\)` + (Math.abs(VLs - 56.8) < 0.3 ? " <span class=\"muted\">(die Folie rundet V̇<sub>L,s</sub> vorher auf 57 → 6.880)</span>" : "")}</li>
    <li>\\(m_w=${num(Awand, 0)}\\cdot${v.mw}+${num(Ab, 0)}\\cdot${v.md}+${num(Ab, 0)}\\cdot${v.mb}+${num(Ab, 0)}\\cdot38=${num(mw, 0)}\\ \\mathrm{kg}\\)</li>
    <li>\\(m_{w,I}=${num(mw, 0)}/${num(AI, 2)}=${num(mwi, 0)}\\ \\mathrm{kg/m^2}\\) → <b class="${ok ? "ok" : "bad"}">${ok ? "Nachweis erfüllt" : "Nachweis nicht erfüllt"}</b></li></ol>`;
    math(el.querySelector("[data-out]"));
  });
};

// ========== DEHNUNG ==========
const ALPHA = [["Beton", 10], ["Ziegel", 5], ["Stahl", 12], ["Zinkblech", 28], ["Polystyrol", 70], ["Polypropylen", 170], ["Fichte längs", 5.4], ["Fichte quer", 34.1]];
WIDGETS.dehn = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: thermische Längenänderung</div>
  <div class="row">${inp("Material", "a", 10, { sel: ALPHA.map(a => [a[1], `${a[0]} (${num(a[1], 1)}·10⁻⁶)`]) })}${inp("Länge", "l", 10, { unit: "m" })}${inp("ϑ max", "t1", 80, { unit: "°C" })}${inp("ϑ min", "t2", -25, { unit: "°C" })}</div><div class="out" data-out></div>`;
  bindAll(el, () => {
    const v = readVals(el); const a = +v.a, dT = v.t1 - v.t2, dl = v.l * a * 1e-6 * dT;
    el.querySelector("[data-out]").innerHTML = `$$\\Delta l=${num(v.l, 1)}\\cdot${num(a, 1)}\\cdot10^{-6}\\cdot${num(dT, 0)}=\\mathbf{${num(dl * 1000, 1)}\\ mm}$$`;
    math(el.querySelector("[data-out]"));
  });
};

// ========== FEUCHTE: Zustand & Diagramm ==========
WIDGETS.hum = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner & Diagramm: feuchte Luft</div>
  <div class="row">${inp("Temperatur ϑ", "t", 23, { range: [-15, 35, 0.5] })}${inp("rel. Feuchte φ", "phi", 40, { range: [5, 100, 1] })}${inp("abkühlen/erwärmen auf", "t2", 20, { range: [-15, 35, 0.5] })}</div>
  <div class="flex wrap"><div class="out" data-out style="flex:1 1 260px"></div><div class="svgwrap" data-svg style="flex:1 1 320px"></div></div>`;
  bindAll(el, () => {
    showRanges(el, { t: 1, phi: 0, t2: 1 });
    const v = {}; el.querySelectorAll("[data-k]").forEach(i => v[i.dataset.k] = +i.value);
    const ps = P.ps(v.t), p = v.phi / 100 * ps, vv = P.vFromP(p, v.t) * 1000, tau = P.tauFromP(p);
    const ps2 = P.ps(v.t2), phi2 = p / ps2 * 100, phi2v = P.pFromV(vv / 1000, v.t2) / ps2 * 100;
    el.querySelector("[data-out]").innerHTML = `<div class="kv"><span>p<sub>s</sub>(${num(v.t, 1)} °C)</span><b>${num(ps, 0)} Pa</b><span>p = φ·p<sub>s</sub></span><b>${num(p, 0)} Pa</b><span>v = p/(R·T)</span><b>${num(vv, 2)} g/m³</b><span>Taupunkt ϑ<sub>Tau</sub></span><b>${num(tau, 1)} °C</b></div>
    <p class="small">Bei <b>${num(v.t2, 1)} °C</b>: p<sub>s</sub> = ${num(ps2, 0)} Pa → φ = p/p<sub>s</sub> = <b>${phi2 > 100 ? "> 100 % → Kondensat!" : num(phi2, 0) + " %"}</b> <span class="muted">(mit v = konst.: ${num(Math.min(phi2v, 999), 1)} %)</span></p>
    <p class="small muted">Taupunkt-Näherungsformel Folie 188: ${num(P.tau(v.t, v.phi), 1)} °C</p>`;
    // Diagramm v über ϑ
    const W = 360, H = 250, x0 = 40, y0 = 215, w = 300, hh = 195, tmin = -15, tmax = 35, vmax = 40;
    const sx = t => x0 + (t - tmin) / (tmax - tmin) * w, sy = g => y0 - g / vmax * hh;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart">` + axis(x0, y0, w, hh, [-10, 0, 10, 20, 30], [0, 10, 20, 30, 40], sx, sy, "ϑ in °C", "v in g/m³");
    [20, 40, 60, 80, 100].forEach(ph => {
      const pts = []; for (let t = tmin; t <= tmax; t += 1) { const g = P.vFromP(ph / 100 * P.ps(t), t) * 1000; if (g <= vmax) pts.push([sx(t), sy(g)]); }
      s += svgLine(pts, ph === 100 ? "sat" : "rh") + `<text class="tk" x="${pts[pts.length - 1][0] + 2}" y="${pts[pts.length - 1][1]}">${ph}%</text>`;
    });
    s += `<line class="arrow" x1="${sx(v.t)}" y1="${sy(vv)}" x2="${sx(tau)}" y2="${sy(vv)}"/><line class="gr2" x1="${sx(tau)}" y1="${sy(vv)}" x2="${sx(tau)}" y2="${y0}"/>`;
    s += `<circle cx="${sx(v.t)}" cy="${sy(vv)}" r="5" class="pt"/><circle cx="${sx(v.t2)}" cy="${sy(vv)}" r="4" class="pt2"/><circle cx="${sx(tau)}" cy="${sy(vv)}" r="3.5" class="ptT"/>`;
    s += `<text class="tk" x="${sx(tau)}" y="${y0 - 4}" text-anchor="middle">ϑTau</text></svg>`;
    el.querySelector("[data-svg]").innerHTML = s + `<p class="small muted">Punkt = Raumluft · Kreis = nach Temperaturänderung · Linie nach links bis 100 % = Taupunkt.</p>`;
  });
};

// ========== s_d ==========
const MU = [["Luft / Mineralwolle", 1], ["Ziegel / Gipskarton / Innenputz", 10], ["Konstruktionsholz", 50], ["EPS", 60], ["Beton", 100], ["OSB-Platte", 165], ["XPS", 150], ["PE-Folie 0,2 mm (sd ≈ 100 m)", 500000]];
function sdClass(sd) { return sd <= 0.5 ? "diffusionsoffen" : sd <= 10 ? "diffusionsbremsend" : sd <= 100 ? "diffusionshemmend" : sd < 1500 ? "diffusionssperrend" : "diffusionsdicht"; }
WIDGETS.sd = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: s<sub>d</sub>-Wert & Diffusionsstrom</div>
  <div class="row">${inp("Baustoff", "mu", 165, { sel: MU.map(m => [m[1], `${m[0]} (µ ${num(m[1], 0)})`]) })}${inp("Dicke d", "d", 2, { unit: "cm" })}</div>
  <div class="row">${inp("p innen", "p1", 1430, { unit: "Pa" })}${inp("p außen", "p2", 356, { unit: "Pa" })}</div><div class="out" data-out></div>`;
  bindAll(el, () => {
    const v = readVals(el); const sd = +v.mu * v.d / 100, g = (v.p1 - v.p2) / (1.5e6 * sd);
    el.querySelector("[data-out]").innerHTML = `$$s_d=\\mu\\cdot d=${num(+v.mu, 0)}\\cdot${num(v.d / 100, 4)}=\\mathbf{${num(sd, sd < 1 ? 3 : 1)}\\ m}\\ \\ (${sdClass(sd)})$$
    $$g'=\\frac{${num(v.p1, 0)}-${num(v.p2, 0)}}{1{,}5\\cdot10^6\\cdot${num(sd, 3)}}=${num(g * 1000, 3)}\\ \\mathrm{g/m^2h}$$<p class="small">Pro Monat (744 h): ${num(g * 744 * 1000, 0)} g/m² Dampf durch die Schicht.</p>`;
    math(el.querySelector("[data-out]"));
  });
};

// ========== f_Rsi ==========
WIDGETS.frsi = (el) => {
  el.innerHTML = `<div class="wtitle">Rechner: Temperaturfaktor f<sub>Rsi</sub></div>
  <div class="row">${inp("Nachweis", "m", "s", { sel: [["s", "Schimmel (f ≥ 0,70)"], ["k", "Oberflächenkondensat (f ≥ 0,59)"]] })}${inp("ϑ<sub>si</sub> Oberfläche", "si", 12.4, { unit: "°C" })}${inp("ϑ<sub>i</sub>", "ti", 22, { unit: "°C" })}${inp("ϑ<sub>e</sub>", "te", -1.38, { unit: "°C" })}</div>
  <div class="out" data-out></div><div class="svgwrap" data-svg></div>`;
  el.querySelector('[data-k="m"]').addEventListener("change", e => { el.querySelector('[data-k="te"]').value = e.target.value === "s" ? "-1,38" : "-16"; });
  bindAll(el, () => {
    const v = readVals(el); const fmin = v.m === "s" ? 0.70 : 0.59;
    const f = (v.si - v.te) / (v.ti - v.te), need = v.te + fmin * (v.ti - v.te), ok = f >= fmin;
    el.querySelector("[data-out]").innerHTML = `$$f_{Rsi}=\\frac{${num(v.si, 2)}-(${num(v.te, 2)})}{${num(v.ti, 1)}-(${num(v.te, 2)})}=\\mathbf{${num(f, 3)}}\\ ${ok ? "\\ge" : "<"}\\ ${num(fmin, 2)}$$
    <p><b class="${ok ? "ok" : "bad"}">${ok ? "Nachweis erfüllt" : "Nachweis nicht erfüllt"}</b> · nötige Oberflächentemperatur: ϑ<sub>si,min</sub> = ${num(v.te, 2)} + ${num(fmin, 2)}·${num(v.ti - v.te, 2)} = <b>${num(need, 1)} °C</b></p>`;
    math(el.querySelector("[data-out]"));
    const W = 520, x0 = 20, w = 480, sx = t => x0 + (t - v.te) / (v.ti - v.te) * w;
    let s = `<svg viewBox="0 0 ${W} 70" class="chart"><defs><linearGradient id="gtf"><stop offset="0" stop-color="var(--cold)"/><stop offset="1" stop-color="var(--warm)"/></linearGradient></defs><rect x="${x0}" y="20" width="${w}" height="16" rx="8" fill="url(#gtf)" opacity=".8"/>`;
    s += `<line x1="${sx(need)}" y1="12" x2="${sx(need)}" y2="44" class="lim"/><text class="tk" x="${sx(need)}" y="60" text-anchor="middle">Grenze f=${num(fmin, 2)}</text>`;
    s += `<circle cx="${Math.max(x0, Math.min(x0 + w, sx(v.si)))}" cy="28" r="7" class="${ok ? "pt" : "ptbad"}"/><text class="tk" x="${x0}" y="12">außen ${num(v.te, 1)}° (f=0)</text><text class="tk" x="${x0 + w}" y="12" text-anchor="end">innen ${num(v.ti, 0)}° (f=1)</text></svg>`;
    el.querySelector("[data-svg]").innerHTML = s;
  });
};

// ========== GLASER ==========
const GPRE = {
  ohne: { n: "Dach ohne Dampfbremse (Folie 231)", L: [["Gipskartonplatte", 1.5, 0.20, 10], ["Mineralwolle", 35, 0.040, 1], ["OSB-Platte", 2, 0.13, 165]] },
  mit: { n: "Dach mit Dampfsperre s_d ≥ 100 m", L: [["Gipskartonplatte", 1.5, 0.20, 10], ["Dampfsperre (PE)", 0.02, 0.5, 500000], ["Mineralwolle", 35, 0.040, 1], ["OSB-Platte", 2, 0.13, 165]] },
  offen: { n: "Dach diffusionsoffen außen (Holzfaser)", L: [["Gipskartonplatte", 1.5, 0.20, 10], ["Mineralwolle", 35, 0.040, 1], ["Holzfaserplatte", 2.2, 0.051, 5]] },
  wdvs: { n: "Ziegelwand + EPS-WDVS", L: [["Innenputz", 1.5, 0.70, 10], ["Hochlochziegel", 25, 0.26, 10], ["EPS", 16, 0.038, 60], ["Außenputz", 0.5, 0.70, 15]] },
};
WIDGETS.glaser = (el) => {
  let st = JSON.parse(JSON.stringify(GPRE.ohne));
  const draw = () => {
    el.innerHTML = `<div class="wtitle">Glaser-Rechner (Jänner, Klagenfurter Klima)</div>
    <div class="row">${inp("Beispiel", "pre", "", { sel: [["", "– wählen –"], ...Object.entries(GPRE).map(([k, v]) => [k, v.n])] })}</div>
    <table class="lay"><thead><tr><th>#</th><th>Schicht (innen → außen)</th><th>d [cm]</th><th>λ</th><th>µ</th><th>s<sub>d</sub> [m]</th><th></th></tr></thead><tbody>
    ${st.L.map((l, i) => `<tr><td>${i + 1}</td><td><input data-l="${i}" data-f="0" value="${esc(l[0])}"></td>${[1, 2, 3].map(f => `<td><input inputmode="decimal" data-l="${i}" data-f="${f}" value="${String(l[f]).replace(".", ",")}"></td>`).join("")}<td class="mono" data-sd="${i}"></td><td><button class="mini" data-del="${i}">✕</button></td></tr>`).join("")}
    </tbody></table><div class="row"><button class="mini" data-add>+ Schicht</button></div>
    <div class="row">${inp("ϑ<sub>i</sub>", "ti", 20, { unit: "°C" })}${inp("φ<sub>i</sub>", "fi", 61.21, { unit: "%" })}${inp("ϑ<sub>e</sub>", "te", -3.79, { unit: "°C" })}${inp("φ<sub>e</sub>", "fe", 80, { unit: "%" })}${inp("R<sub>si</sub>", "rsi", 0.25)}${inp("R<sub>se</sub>", "rse", 0.04)}</div>
    <div data-out></div>`;
    calc();
  };
  const calc = () => {
    const v = readVals(el);
    const L = st.L.map(l => ({ n: l[0], d: l[1] / 100, R: (l[1] / 100) / l[2], sd: l[3] * l[1] / 100 }));
    L.forEach((l, i) => { const c = el.querySelector(`[data-sd="${i}"]`); if (c) c.textContent = num(l.sd, l.sd < 1 ? 3 : 1); });
    const RT = v.rsi + L.reduce((a, l) => a + l.R, 0) + v.rse, q = (v.ti - v.te) / RT, SD = L.reduce((a, l) => a + l.sd, 0);
    const pi = v.fi / 100 * P.ps(v.ti), pe = v.fe / 100 * P.ps(v.te);
    // Grenzen: si, nach jeder Schicht
    const B = [{ n: "Oberfläche innen", t: v.ti - q * v.rsi, x: 0 }]; let t = B[0].t, x = 0;
    L.forEach(l => { t -= q * l.R; x += l.sd; B.push({ n: "nach " + l.n, t, x }); });
    B.forEach(b => { b.ps = P.ps(b.t); b.p = pi - (pi - pe) * (SD ? b.x / SD : 0); b.c = b.p > b.ps + 0.5; });
    const cond = B.some(b => b.c);
    // fein abgetastete ps-Kurve über s_d
    const curve = []; let tt = B[0].t, xx = 0; curve.push([0, P.ps(tt)]);
    L.forEach(l => { for (let k = 1; k <= 12; k++) curve.push([xx + l.sd * k / 12, P.ps(tt - q * l.R * k / 12)]); tt -= q * l.R; xx += l.sd; });
    // Tauebene vereinfacht: Grenze mit maximaler Differenz g'i - g'e
    let best = null;
    if (cond) B.forEach((b, i) => { if (b.x <= 0 || b.x >= SD) return; const gi = (pi - b.ps) / (1.5e6 * b.x), ge = (b.ps - pe) / (1.5e6 * (SD - b.x)); const d = gi - ge; if (!best || d > best.d) best = { i, gi, ge, d, b }; });
    let html = `<table class="lay res"><thead><tr><th>Grenze</th><th>ϑ [°C]</th><th>p<sub>s</sub> [Pa]</th><th>p [Pa]</th><th>Σs<sub>d</sub> [m]</th><th></th></tr></thead><tbody>
    <tr><td>Innenluft</td><td>${num(v.ti, 2)}</td><td>${num(P.ps(v.ti), 0)}</td><td>${num(pi, 0)}</td><td></td><td></td></tr>
    ${B.map(b => `<tr class="${b.c ? "cond" : ""}"><td>${esc(b.n)}</td><td>${num(b.t, 2)}</td><td>${num(b.ps, 0)}</td><td>${num(b.p, 0)}</td><td>${num(b.x, 2)}</td><td>${b.c ? "p &gt; p<sub>s</sub>!" : "✓"}</td></tr>`).join("")}
    <tr><td>Außenluft</td><td>${num(v.te, 2)}</td><td>${num(P.ps(v.te), 0)}</td><td>${num(pe, 0)}</td><td></td><td></td></tr></tbody></table>
    <p class="small mono">R<sub>T</sub> = ${num(RT, 3)} m²K/W · U = ${num(1 / RT, 3)} W/m²K · Σs<sub>d</sub> = ${num(SD, 2)} m · p<sub>i</sub> = φ<sub>i</sub>·p<sub>s,i</sub> = ${num(pi, 0)} Pa · p<sub>e</sub> = ${num(pe, 0)} Pa</p>`;
    if (!cond) html += `<p class="okbox">✓ Überall p &lt; p<sub>s</sub> → <b>kein Kondensat</b> im Jänner. Nachweis (Glaser) erbracht.</p>`;
    else if (best) {
      const mw = 744 * (best.gi - best.ge);
      html += `<p class="badbox">✗ Partialdruck über Sättigungsdruck → <b>Kondensat</b>. Tauebene (vereinfacht) „${esc(best.b.n)}“:<br>
      g′<sub>i</sub> = (${num(pi, 0)} − ${num(best.b.ps, 0)}) / (1,5·10⁶·${num(best.b.x, 2)}) = ${num(best.gi * 1000, 3)} g/m²h · g′<sub>e</sub> = (${num(best.b.ps, 0)} − ${num(pe, 0)}) / (1,5·10⁶·${num(SD - best.b.x, 2)}) = ${num(best.ge * 1000, 3)} g/m²h<br>
      Tauwasser im Jänner m<sub>w,T</sub> = 744 h · (g′<sub>i</sub> − g′<sub>e</sub>) ≈ <b>${num(mw, 3)} kg/m²</b> ${mw > 0.5 ? "– schon ein Monat über 0,5 kg/m²!" : "(Jahressumme muss ≤ 0,5 kg/m² bleiben)"}</p>`;
    }
    // Diagramme
    const W = 560, H = 250, x0 = 50, y0 = 210, w = 470, hh = 185;
    const pmax = Math.max(pi, P.ps(v.ti)) * 1.08;
    const sx = s => x0 + (SD ? s / SD : 0) * w, sy = p => y0 - p / pmax * hh;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart">`;
    let xa = 0; L.forEach((l, i) => { s += `<rect x="${sx(xa)}" y="${y0 - hh}" width="${Math.max(1, sx(xa + l.sd) - sx(xa))}" height="${hh}" fill="${LAYCOL[i % LAYCOL.length]}" opacity=".45"/>`; xa += l.sd; });
    const yt = []; for (let p = 0; p <= pmax; p += 500) yt.push(p);
    s += axis(x0, y0, w, hh, [], yt, sx, sy, "s_d (Glaser-Diagramm, x-Achse = äquivalente Luftschichtdicke)", "p in Pa");
    s += svgLine(curve.map(c => [sx(c[0]), sy(c[1])]), "sat") + svgLine([[sx(0), sy(pi)], [sx(SD), sy(pe)]], "pline");
    if (best) s += svgLine([[sx(0), sy(pi)], [sx(best.b.x), sy(best.b.ps)], [sx(SD), sy(pe)]], "pcorr");
    B.forEach(b => s += `<circle cx="${sx(b.x)}" cy="${sy(b.p)}" r="3" class="${b.c ? "ptbad" : "tdot"}"/>`);
    s += `<text class="tk sat-t" x="${x0 + 4}" y="${sy(P.ps(B[0].t)) - 6}">p_s (Sättigung)</text><text class="tk p-t" x="${x0 + 4}" y="${sy(pi) + 14}">p (vorhanden)</text></svg>`;
    // Temperaturverlauf über echte Dicke
    const D = L.reduce((a, l) => a + Math.max(l.d, 0.004), 0);
    const tx = d => x0 + d / D * w, tmin = v.te - 2, tmax = v.ti + 2, ty = t => y0 - (t - tmin) / (tmax - tmin) * hh;
    let s2 = `<svg viewBox="0 0 ${W} ${H}" class="chart">`; let da = 0;
    L.forEach((l, i) => { const dd = Math.max(l.d, 0.004); s2 += `<rect x="${tx(da)}" y="${y0 - hh}" width="${tx(da + dd) - tx(da)}" height="${hh}" fill="${LAYCOL[i % LAYCOL.length]}" opacity=".45"/><text class="tk" x="${(tx(da) + tx(da + dd)) / 2}" y="${y0 - hh - 4}" text-anchor="middle">${i + 1}</text>`; da += dd; });
    s2 += axis(x0, y0, w, hh, [], [Math.ceil(tmin / 5) * 5, 0, 10, 20].filter(t => t >= tmin && t <= tmax), tx, ty, "Dicke (maßstäblich)", "ϑ in °C");
    const tp = []; da = 0; tp.push([tx(0), ty(B[0].t)]); L.forEach((l, i) => { da += Math.max(l.d, 0.004); tp.push([tx(da), ty(B[i + 1].t)]); });
    s2 += svgLine(tp, "tline") + "</svg>";
    html += `<div class="svgwrap">${s}</div><div class="svgwrap">${s2}</div><p class="small muted">Blau = Sättigungsdruck p<sub>s</sub>, orange = linearer Partialdruck p. Liegt orange über blau → Kondensat. Die gestrichelte Linie zeigt den tatsächlichen Verlauf mit Tauebene. Die Tauebenen-Suche ist vereinfacht (eine Ebene an einer Schichtgrenze).</p>`;
    el.querySelector("[data-out]").innerHTML = html;
  };
  el.addEventListener("change", e => { if (e.target.dataset.k === "pre" && e.target.value) { st = JSON.parse(JSON.stringify(GPRE[e.target.value])); draw(); } });
  el.addEventListener("input", e => {
    const t = e.target;
    if (t.dataset.l !== undefined) { st.L[+t.dataset.l][+t.dataset.f] = +t.dataset.f === 0 ? t.value : parseNum(t.value); calc(); }
    else if (t.dataset.k && t.dataset.k !== "pre") calc();
  });
  el.addEventListener("click", e => {
    if (e.target.dataset.del !== undefined) { st.L.splice(+e.target.dataset.del, 1); draw(); }
    if (e.target.dataset.add !== undefined) { st.L.push(["Neue Schicht", 5, 0.04, 1]); draw(); }
  });
  draw();
};

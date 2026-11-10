// Rechenübungen mit Zufallswerten. gen() -> { q, a: [{l, v, u, tol, d}], s: [Lösungsschritte], p: [Folien] }
// tol: relative Toleranz (Default 2 %), d: Nachkommastellen für Anzeige
const DRILLS = [
// ---------------- WINTER ----------------
{ id: "u", c: "winter", t: "U-Wert einer mehrschichtigen Wand", gen() {
  const core = pick([["Hochlochziegel", 0.26, [20, 25, 30, 38]], ["Stahlbeton", 2.5, [18, 20, 25]], ["Brettsperrholz", 0.12, [10, 12, 14]], ["Porenbeton", 0.195, [20, 25, 30]]]);
  const ins = pick([["EPS", 0.038], ["Mineralwolle", 0.040], ["Holzfaser", 0.051]]);
  const d1 = pick(core[2]), d2 = rnd(8, 24, 2), ti = 22, te = pick([-5, -10, -12, -3]);
  const R1 = d1 / 100 / core[1], R2 = d2 / 100 / ins[1], RT = 0.13 + R1 + R2 + 0.04, U = 1 / RT, q = U * (ti - te);
  return { q: `Außenwand (Wärmestrom horizontal): <b>${d1} cm ${core[0]}</b> (λ = ${num(core[1], 3)} W/mK) und <b>${d2} cm ${ins[0]}</b> (λ = ${num(ins[1], 3)} W/mK). ϑ<sub>i</sub> = ${ti} °C, ϑ<sub>e</sub> = ${te} °C. Berechne den U-Wert und die Wärmestromdichte q.`,
    a: [{ l: "U", v: U, u: "W/m²K", d: 3, tol: 0.03 }, { l: "q", v: q, u: "W/m²", d: 2, tol: 0.04 }],
    s: [`R<sub>si</sub> = 0,13 und R<sub>se</sub> = 0,04 m²K/W (horizontal)`, `\\(R_1=\\frac{${num(d1 / 100, 2)}}{${num(core[1], 3)}}=${num(R1, 3)}\\quad R_2=\\frac{${num(d2 / 100, 2)}}{${num(ins[1], 3)}}=${num(R2, 3)}\\) m²K/W`,
      `\\(R_T=0{,}13+${num(R1, 3)}+${num(R2, 3)}+0{,}04=${num(RT, 3)}\\) → \\(U=1/R_T=\\mathbf{${num(U, 3)}}\\) W/m²K`, `\\(q=U\\cdot(\\vartheta_i-\\vartheta_e)=${num(U, 3)}\\cdot${ti - te}=\\mathbf{${num(q, 2)}}\\) W/m²`], p: [18, 19, 21, 23] };
}},
{ id: "uw", c: "winter", t: "U-Wert eines Fensters (U_w)", gen() {
  const B = rnd(100, 180, 10), H = rnd(110, 220, 10), r = pick([10, 12, 15]), two = B >= 150 && Math.random() < .5, m = 20;
  const ug = pick([0.5, 0.6, 0.7, 0.8, 1.1]), uf = pick([0.8, 0.9, 1.0, 1.2]), psi = pick([0.02, 0.03, 0.04, 0.05]);
  const n = two ? 2 : 1, gw = (B / 100 - 2 * r / 100 - (two ? m / 100 : 0)) / n, gh = H / 100 - 2 * r / 100;
  const Aw = B * H / 1e4, Ag = n * gw * gh, Af = Aw - Ag, l = n * 2 * (gw + gh), Uw = (Af * uf + Ag * ug + l * psi) / Aw;
  return { q: `Fenster ${B} × ${H} cm (Außenmaß), Rahmenbreite ${r} cm rundum${two ? `, <b>zwei Glasfelder</b> mit Mittelsteg ${m} cm` : ""}. U<sub>g</sub> = ${num(ug, 1)}, U<sub>f</sub> = ${num(uf, 1)} W/m²K, ψ = ${num(psi, 2)} W/mK. Berechne U<sub>w</sub>.`,
    a: [{ l: "U<sub>w</sub>", v: Uw, u: "W/m²K", d: 2, tol: 0.02 }],
    s: [`A<sub>w</sub> = ${num(B / 100, 2)}·${num(H / 100, 2)} = ${num(Aw, 3)} m²`, `Glas: ${n}× ${num(gw, 2)} × ${num(gh, 2)} → A<sub>g</sub> = ${num(Ag, 3)} m²; A<sub>f</sub> = A<sub>w</sub> − A<sub>g</sub> = ${num(Af, 3)} m²`,
      `l<sub>g</sub> = ${n}·2·(${num(gw, 2)} + ${num(gh, 2)}) = ${num(l, 2)} m`, `\\(U_w=\\frac{${num(Af, 3)}\\cdot${num(uf, 1)}+${num(Ag, 3)}\\cdot${num(ug, 1)}+${num(l, 2)}\\cdot${num(psi, 2)}}{${num(Aw, 3)}}=\\mathbf{${num(Uw, 2)}}\\) W/m²K`], p: [31, 35, 36] };
}},
{ id: "qt", c: "winter", t: "Transmissionswärmeverlust & Ersparnis durch Dämmung", gen() {
  const kind = pick([["Decke zu einem geschlossenen, unkonditionierten Dachraum", 0.9], ["Decke zu einem ungedämmten Keller", 0.7], ["Außenwand (direkt außenluftberührt)", 1.0], ["Wand zu einer geschlossenen Garage", 0.9], ["Decke zu einem gedämmten Keller", 0.5]]);
  const A = rnd(40, 160, 5), U1 = pick([1.2, 1.5, 1.8, 2.0]), U2 = pick([0.2, 0.25, 0.3, 0.35]);
  const mon = pick([["Jänner", 744, -1.5], ["Februar", 672, 0.5], ["Dezember", 744, 0.0], ["November", 720, 4.0]]);
  const L = A * (U1 - U2) * kind[1], dQ = L * (22 - mon[2]) * mon[1] / 1000;
  return { q: `${kind[0]}, Fläche ${A} m². Durch Dämmung sinkt U von ${num(U1, 1)} auf ${num(U2, 2)} W/m²K. Um wie viele kWh sinkt der Transmissionswärmeverlust im <b>${mon[0]}</b> (${mon[1]} h, ϑ<sub>e</sub> = ${num(mon[2], 1)} °C, ϑ<sub>i</sub> = 22 °C)?`,
    a: [{ l: "ΔQ<sub>T</sub>", v: dQ, u: "kWh", d: 0, tol: 0.02 }],
    s: [kind[1] < 1 ? `Bauteil grenzt an einen unkonditionierten Raum → Temperaturkorrekturfaktor <b>f<sub>i,h</sub> = ${num(kind[1], 2)}</b> (Folie 63)` : `Direkt außenluftberührt → kein Korrekturfaktor (f = 1)`,
      `ΔL = A·ΔU·f = ${A}·(${num(U1, 2)} − ${num(U2, 2)})·${num(kind[1], 2)} = ${num(L, 2)} W/K`, `\\(\\Delta Q_T=\\frac{1}{1000}\\cdot${num(L, 2)}\\cdot(22-(${num(mon[2], 1)}))\\cdot${mon[1]}=\\mathbf{${num(dQ, 0)}}\\) kWh`], p: [46, 63, 70] };
}},
{ id: "qv", c: "winter", t: "Lüftungsleitwert & Lüftungswärmeverlust", gen() {
  const L = rnd(6, 14, 1), B = rnd(6, 12, 1), g = pick([1, 2, 3]), ne = g >= 2 && Math.random() < .5 ? 3 : 1, n = ne > 2 ? 0.38 : 0.28;
  const BGF = L * B * g, VV = BGF * 0.8 * 2.6, LV = 0.34 * n * VV, te = pick([-1.5, 0.5, 3]), QV = LV * (22 - te) * 744 / 1000;
  return { q: `Wohngebäude mit ${ne > 2 ? "mehr als 2" : "1–2"} Nutzungseinheiten, BGF = ${L} × ${B} m × ${g} Geschoß(e) = ${BGF} m², Fensterlüftung. Berechne L<sub>V</sub> und Q<sub>V</sub> für einen Monat mit 744 h und ϑ<sub>e</sub> = ${num(te, 1)} °C (ϑ<sub>i</sub> = 22 °C).`,
    a: [{ l: "L<sub>V</sub>", v: LV, u: "W/K", d: 2, tol: 0.02 }, { l: "Q<sub>V</sub>", v: QV, u: "kWh", d: 0, tol: 0.03 }],
    s: [`Hygienischer Luftwechsel: n = ${num(n, 2)} h⁻¹ (${ne > 2 ? "> 2" : "≤ 2"} NE, Folie 81)`, `V<sub>V</sub> = BGF·0,8·2,6 = ${BGF}·0,8·2,6 = ${num(VV, 1)} m³`,
      `L<sub>V</sub> = 0,34·n·V<sub>V</sub> = 0,34·${num(n, 2)}·${num(VV, 1)} = <b>${num(LV, 2)} W/K</b>`, `\\(Q_V=\\frac1{1000}\\cdot${num(LV, 2)}\\cdot${num(22 - te, 1)}\\cdot744=\\mathbf{${num(QV, 0)}}\\) kWh`], p: [81, 83, 85] };
}},
{ id: "qs", c: "winter", t: "Solare Gewinne über Fenster", gen() {
  const ori = pick([["Süd", 40], ["Ost", 20], ["West", 20], ["Nord", 13]]), w = rnd(1.0, 2.4, 0.2), hgt = rnd(1.2, 2.2, 0.2), cnt = rnd(1, 4, 1);
  const g = pick([0.5, 0.55, 0.58, 0.62]), fs = pick([[0.65, "Einfamilienhaus"], [0.5, "Wohngebäude mit 6 WE"], [0.4, "Wohnanlage mit 24 WE"]]);
  const Aw = w * hgt * cnt, Qs = ori[1] * Aw * 0.7 * fs[0] * g * 0.9 * 0.98;
  return { q: `${fs[1]}, ${cnt} Fenster nach <b>${ori[0]}</b>, je ${num(w, 1)} × ${num(hgt, 1)} m (Architekturlichte), g = ${num(g, 2)}. Globalstrahlung im Jänner I<sub>s</sub> = ${ori[1]} kWh/m². Berechne die solaren Gewinne (vereinfachter Verschattungsfaktor).`,
    a: [{ l: "Q<sub>s</sub>", v: Qs, u: "kWh", d: 1, tol: 0.03 }],
    s: [`A<sub>w</sub> = ${cnt}·${num(w, 1)}·${num(hgt, 1)} = ${num(Aw, 2)} m² → A<sub>g</sub> = 0,7·A<sub>w</sub> = ${num(0.7 * Aw, 2)} m²`, `F<sub>s,h</sub> = ${num(fs[0], 2)} (${fs[1]}), g<sub>w</sub> = 0,9·0,98·${num(g, 2)} = ${num(0.882 * g, 3)}`,
      `\\(Q_s=${ori[1]}\\cdot${num(0.7 * Aw, 2)}\\cdot${num(fs[0], 2)}\\cdot${num(0.882 * g, 3)}=\\mathbf{${num(Qs, 1)}}\\) kWh`], p: [90, 91, 92, 95] };
}},
{ id: "hwb", c: "winter", t: "Monatsbilanz Heizwärmebedarf", gen() {
  const LT = rnd(25, 120, 0.5), LV = rnd(4, 30, 0.5), te = pick([-1.5, 0.5, -3, 2]), t = 744, Qs = rnd(20, 150, 1), Qi = rnd(30, 160, 1), eta = pick([1, 0.98, 0.95]);
  const QT = LT * (22 - te) * t / 1000, QV = LV * (22 - te) * t / 1000, Qh = QT + QV - eta * (Qs + Qi);
  return { q: `Gegeben: L<sub>T</sub> = ${num(LT, 1)} W/K, L<sub>V</sub> = ${num(LV, 1)} W/K, ϑ<sub>i</sub> = 22 °C, ϑ<sub>e</sub> = ${num(te, 1)} °C, t = 744 h, Q<sub>s</sub> = ${Qs} kWh, Q<sub>i</sub> = ${Qi} kWh, η = ${num(eta, 2)}. Berechne Q<sub>T</sub>, Q<sub>V</sub> und den monatlichen Heizwärmebedarf Q<sub>h</sub>.`,
    a: [{ l: "Q<sub>T</sub>", v: QT, u: "kWh", d: 0, tol: 0.02 }, { l: "Q<sub>V</sub>", v: QV, u: "kWh", d: 0, tol: 0.03 }, { l: "Q<sub>h</sub>", v: Qh, u: "kWh", d: 0, tol: 0.02 }],
    s: [`Q<sub>T</sub> = ${num(LT, 1)}·${num(22 - te, 1)}·744/1000 = ${num(QT, 0)} kWh`, `Q<sub>V</sub> = ${num(LV, 1)}·${num(22 - te, 1)}·744/1000 = ${num(QV, 0)} kWh`, `Q<sub>h</sub> = (${num(QT, 0)} + ${num(QV, 0)}) − ${num(eta, 2)}·(${Qs} + ${Qi}) = <b>${num(Qh, 0)} kWh</b>`], p: [44, 70, 85, 109] };
}},
{ id: "co2", c: "winter", t: "CO₂-Emissionen & Primärenergie", gen() {
  const A = pick([[3, "Holzpellets"], [2, "Erdgas"], [1, "Heizöl"], [5, "Fernwärme Heizwerk erneuerbar"], [7, "Fernwärme hocheffiziente KWK"]]);
  const q1 = rnd(4000, 15000, 500), q2 = rnd(1500, 5000, 250), F = FACT["2023"], a = F[A[0]], b = F[4];
  const co2 = q1 * a[2] / 1000 + q2 * b[2] / 1000, pe = q1 * a[1] + q2 * b[1];
  return { q: `Laut Energieausweis: ${num(q1, 0)} kWh/a <b>${A[1]}</b> und ${num(q2, 0)} kWh/a elektrische Energie (Liefermix). Berechne CO₂-Emissionen und Primärenergiebedarf (Faktoren OIB-RL 6:2023: ${A[1]} f<sub>PE</sub> = ${num(a[1], 2)}, f<sub>CO₂</sub> = ${a[2]} g/kWh; Strom f<sub>PE</sub> = 1,76, f<sub>CO₂</sub> = 156 g/kWh).`,
    a: [{ l: "CO₂", v: co2, u: "kg/a", d: 1, tol: 0.01 }, { l: "PEB", v: pe, u: "kWh/a", d: 0, tol: 0.01 }],
    s: [`CO₂ = ${num(q1, 0)}·${num(a[2] / 1000, 3)} + ${num(q2, 0)}·0,156 = ${num(q1 * a[2] / 1000, 1)} + ${num(q2 * 0.156, 1)} = <b>${num(co2, 1)} kg/a</b>`, `PEB = ${num(q1, 0)}·${num(a[1], 2)} + ${num(q2, 0)}·1,76 = <b>${num(pe, 0)} kWh/a</b>`], p: [128, 129, 130] };
}},
{ id: "strahl", c: "winter", t: "Wärmestrahlung (Stefan-Boltzmann)", gen() {
  const t1 = rnd(35, 70, 5), t2 = rnd(12, 20, 1), e = pick([0.85, 0.9, 0.93]);
  const q = e * 5.67e-8 * (Math.pow(t1 + 273.15, 4) - Math.pow(t2 + 273.15, 4));
  return { q: `Ein Heizkörper hat ${t1} °C, die umgebenden Wände ${t2} °C, ε = ${num(e, 2)}. Wie groß ist die Wärmestromdichte durch Strahlung?`,
    a: [{ l: "q", v: q, u: "W/m²", d: 0, tol: 0.02 }],
    s: [`In Kelvin: T<sub>1</sub> = ${num(t1 + 273.15, 2)} K, T<sub>2</sub> = ${num(t2 + 273.15, 2)} K`, `\\(q=${num(e, 2)}\\cdot5{,}67\\cdot10^{-8}\\cdot(${num(t1 + 273.15, 2)}^4-${num(t2 + 273.15, 2)}^4)=\\mathbf{${num(q, 0)}}\\) W/m²`], p: [25, 26] };
}},
// ---------------- SOMMER ----------------
{ id: "topmax", c: "sommer", t: "Zulässige operative Temperatur T_op,max", gen() {
  const c = pick(TNAT), T = c[1];
  return { q: `Am Standort ${c[0]} beträgt T<sub>NAT,13</sub> = ${num(T, 1)} °C. Wie hoch ist die maximal zulässige operative Temperatur nach OIB-RL 6?`,
    a: [{ l: "T<sub>op,max</sub>", v: T / 3 + 21.8, u: "°C", d: 1, tol: 0.003 }],
    s: [`\\(T_{op,max}=\\tfrac13\\cdot${num(T, 1)}+21{,}8=\\mathbf{${num(T / 3 + 21.8, 1)}}\\,^\\circ\\)C`], p: [136, 138] };
}},
{ id: "op", c: "sommer", t: "Operative Raumtemperatur", gen() {
  const L = rnd(3, 6, 0.5), B = rnd(3, 5, 0.5), H = pick([2.6, 2.8, 3]), fw = pick([0, 2, 3, 4]);
  const tl = rnd(22, 28, 0.5), tw = rnd(18, 30, 0.5), tb = rnd(17, 26, 0.5), td = rnd(18, 32, 0.5), tf = rnd(14, 38, 1);
  const Aw = 2 * (L + B) * H - fw, Ab = L * B, A = Aw + 2 * Ab + fw, tu = (Aw * tw + Ab * tb + Ab * td + fw * tf) / A, top = (tl + tu) / 2;
  return { q: `Raum ${num(L, 1)} × ${num(B, 1)} × ${num(H, 1)} m. Oberflächentemperaturen: Wände ${num(tw, 1)} °C${fw ? ` (davon Fenster ${fw} m² mit ${num(tf, 0)} °C)` : ""}, Boden ${num(tb, 1)} °C, Decke ${num(td, 1)} °C. Raumluft ${num(tl, 1)} °C. Berechne die mittlere Oberflächentemperatur und die operative Temperatur.`,
    a: [{ l: "ϑ<sub>U</sub>", v: tu, u: "°C", d: 1, tol: 0.006 }, { l: "ϑ<sub>op</sub>", v: top, u: "°C", d: 1, tol: 0.005 }],
    s: [`Flächen: Wände ${num(Aw, 2)} m²${fw ? `, Fenster ${fw} m²` : ""}, Boden = Decke = ${num(Ab, 2)} m², gesamt ${num(A, 2)} m²`,
      `\\(\\vartheta_U=\\frac{${num(Aw, 2)}\\cdot${num(tw, 1)}+${num(Ab, 2)}\\cdot${num(tb, 1)}+${num(Ab, 2)}\\cdot${num(td, 1)}${fw ? `+${fw}\\cdot${num(tf, 0)}` : ""}}{${num(A, 2)}}=${num(tu, 2)}\\,^\\circ\\)C`,
      `\\(\\vartheta_{op}=\\frac{${num(tl, 1)}+${num(tu, 2)}}{2}=\\mathbf{${num(top, 1)}}\\,^\\circ\\)C`], p: [139, 140, 141] };
}},
{ id: "mwi", c: "sommer", t: "Speicherwirksame Masse: Nachweis (vereinfachtes Verfahren)", gen() {
  const L = pick([4, 4.5, 5]), B = pick([3.5, 4, 4.5]), H = 3, af = pick([2, 3, 4]), fg = 0.7, g = pick([0.5, 0.58, 0.6]), z = pick([0.27, 0.5, 0.78, 1]), Z = pick([[1, "Süd"], [1.13, "West"], [1.14, "Südwest"]]), n = pick([1.5, 2, 3]);
  const wall = pick([[200, "20 cm Beton (200 kg/m²)"], [118, "Hochlochziegel (118 kg/m²)"], [30, "Holzleichtbau mit Gipskarton (30 kg/m²)"]]);
  const AI = af * fg * g * Z[0] * z, V = L * B * H, VL = n * V, VLs = VL / AI, mn = minMw(VLs);
  const Aw = 2 * (L + B) * H - af, Ab = L * B, mw = Aw * wall[0] + Ab * 30 + Ab * 60 + Ab * 38, mwi = mw / AI;
  if (isNaN(mn)) return this.gen();
  return { q: `Raum ${num(L, 1)} × ${num(B, 1)} × ${H} m, Fenster ${af} m² nach ${Z[1]} (Z<sub>ON</sub> = ${num(Z[0], 2)}), f<sub>g</sub> = 0,7, g = ${num(g, 2)}, Abschattung z = ${num(z, 2)}, Nachtlüftung n<sub>L</sub> = ${num(n, 1)} h⁻¹. Wände ${wall[1]}, Decke 30 kg/m², Boden 60 kg/m², Einrichtung 38 kg/m² Grundfläche. Ist die sommerliche Überwärmung vermieden?`,
    a: [{ l: "A<sub>I</sub>", v: AI, u: "m²", d: 2, tol: 0.02 }, { l: "min m<sub>w,I</sub>", v: mn, u: "kg/m²", d: 0, tol: 0.03 }, { l: "m<sub>w,I</sub>", v: mwi, u: "kg/m²", d: 0, tol: 0.03 }],
    yn: { l: "Nachweis erfüllt?", v: mwi >= mn },
    s: [`A<sub>I</sub> = ${af}·0,7·${num(g, 2)}·${num(Z[0], 2)}·${num(z, 2)} = ${num(AI, 3)} m²`, `V̇<sub>L</sub> = ${num(n, 1)}·${num(V, 1)} = ${num(VL, 1)} m³/h → V̇<sub>L,s</sub> = ${num(VL, 1)}/${num(AI, 3)} = ${num(VLs, 1)} m³/hm²`,
      `Interpolation (100 → 2.000; 75 → 4.000; 50 → 8.000): min m<sub>w,I</sub> = <b>${num(mn, 0)} kg/m²</b>`,
      `m<sub>w</sub> = ${num(Aw, 1)}·${wall[0]} + ${num(Ab, 2)}·30 + ${num(Ab, 2)}·60 + ${num(Ab, 2)}·38 = ${num(mw, 0)} kg`, `m<sub>w,I</sub> = ${num(mw, 0)}/${num(AI, 3)} = <b>${num(mwi, 0)} kg/m²</b> → ${mwi >= mn ? "≥ min → <b>erfüllt</b>" : "&lt; min → <b>nicht erfüllt</b>"}`], p: [156, 160, 161, 162, 165] };
}},
{ id: "vdot", c: "sommer", t: "Luftvolumenstrom bei Fensterlüftung", gen() {
  const A = rnd(0.2, 1.2, 0.1), H = rnd(1.0, 2.0, 0.1), dT = rnd(2, 8, 1), V = 0.7 * 100 * A * Math.sqrt(H) * Math.sqrt(dT);
  return { q: `Fensteröffnung A = ${num(A, 1)} m², Höhe H = ${num(H, 1)} m, Temperaturdifferenz innen/außen ${dT} K. Wie groß ist der Luftvolumenstrom? (C<sub>ref</sub> = 100)`,
    a: [{ l: "V̇", v: V, u: "m³/h", d: 0, tol: 0.02 }], s: [`\\(\\dot V=0{,}7\\cdot100\\cdot${num(A, 1)}\\cdot\\sqrt{${num(H, 1)}}\\cdot\\sqrt{${dT}}=\\mathbf{${num(V, 0)}}\\ \\mathrm{m^3/h}\\)`], p: [147] };
}},
// ---------------- FEUCHTE ----------------
{ id: "phi", c: "feuchte", t: "Relative Feuchte nach Temperaturänderung", gen() {
  const t1 = rnd(20, 26, 1), phi = rnd(35, 65, 5), t2 = rnd(12, t1 - 2, 1), ps1 = P.ps(t1), p = phi / 100 * ps1, ps2 = P.ps(t2), phi2 = p / ps2 * 100;
  return { q: `Raumluft ${t1} °C mit ${phi} % relativer Feuchte kühlt auf ${t2} °C ab (gleicher Wasserdampfgehalt). Wie hoch ist die relative Feuchte danach?`,
    a: [{ l: "φ", v: Math.min(phi2, 100), u: "%", d: 0, tol: 0.03 }],
    s: [`\\(p_s(${t1})=610{,}5\\cdot e^{\\frac{17{,}269\\cdot${t1}}{237{,}3+${t1}}}=${num(ps1, 0)}\\) Pa → p = ${num(phi / 100, 2)}·${num(ps1, 0)} = ${num(p, 0)} Pa`,
      `\\(p_s(${t2})=${num(ps2, 0)}\\) Pa`, phi2 > 100 ? `p &gt; p<sub>s</sub> → φ = 100 %, es fällt <b>Kondensat</b> aus.` : `\\(\\varphi=\\frac{${num(p, 0)}}{${num(ps2, 0)}}=\\mathbf{${num(phi2, 0)}\\,\\%}\\)`], p: [186, 187] };
}},
{ id: "tau", c: "feuchte", t: "Taupunkttemperatur", gen() {
  const t = rnd(18, 25, 1), phi = rnd(40, 75, 5), tau = P.tau(t, phi);
  return { q: `Raumluft ${t} °C, ${phi} % relative Feuchte. Bei welcher Oberflächentemperatur bildet sich Kondensat (Taupunkt)?`,
    a: [{ l: "ϑ<sub>Tau</sub>", v: tau, u: "°C", d: 1, tol: 0.03 }],
    s: [`\\(\\vartheta_{Tau}=\\left(\\frac{${phi}}{100}\\right)^{\\frac1{8{,}02}}\\cdot(109{,}8+${t})-109{,}8=\\mathbf{${num(tau, 1)}}\\,^\\circ\\)C`, `Alternativ: p = φ·p<sub>s</sub> = ${num(phi / 100 * P.ps(t), 0)} Pa und die Temperatur suchen, bei der p<sub>s</sub> diesen Wert hat (${num(P.tauFromP(phi / 100 * P.ps(t)), 1)} °C).`], p: [188] };
}},
{ id: "frsi", c: "feuchte", t: "Temperaturfaktor f_Rsi (Schimmel / Kondensat)", gen() {
  const sch = Math.random() < 0.65, te = sch ? -1.38 : -16, ti = 22, fmin = sch ? 0.70 : 0.59;
  const si = sch ? rnd(10, 19, 0.5) : rnd(3, 12, 0.5), f = (si - te) / (ti - te);
  return { q: `An einer Wärmebrücke wird eine Oberflächentemperatur von ${num(si, 1)} °C ermittelt (ϑ<sub>i</sub> = 22 °C, ϑ<sub>e</sub> = ${num(te, 2)} °C). Berechne f<sub>Rsi</sub>. Ist der Nachweis gegen <b>${sch ? "Schimmelbildung" : "Oberflächenkondensat"}</b> erfüllt?`,
    a: [{ l: "f<sub>Rsi</sub>", v: f, u: "", d: 2, tol: 0.01 }], yn: { l: "Nachweis erfüllt?", v: f >= fmin },
    s: [`\\(f_{Rsi}=\\frac{${num(si, 1)}-(${num(te, 2)})}{22-(${num(te, 2)})}=\\mathbf{${num(f, 3)}}\\)`, `Bemessungswert ${sch ? "Schimmel" : "Kondensat"}: f<sub>Rsi,min</sub> = ${num(fmin, 2)} → ${f >= fmin ? "erfüllt" : "<b>nicht erfüllt</b>"}`,
      `Nötig wäre ϑ<sub>si</sub> ≥ ${num(te, 2)} + ${num(fmin, 2)}·${num(ti - te, 2)} = ${num(te + fmin * (ti - te), 1)} °C`], p: [259, 260, 267, 270] };
}},
{ id: "vi", c: "feuchte", t: "Innenluftfeuchte aus Feuchteklasse", gen() {
  const te = pick([-16, -10, -5, 0]), phe = pick([80, 85, 87, 90]), fk = pick([2, 3, 4]), dv = fk * 2, ti = pick([20, 21, 22]);
  const pe = phe / 100 * P.ps(te), ve = P.vFromP(pe, te) * 1000, vi = ve + dv, pi = P.pFromV(vi / 1000, ti), phii = pi / P.ps(ti) * 100, tau = P.tauFromP(pi);
  return { q: `Außen ${te} °C und ${phe} % rel. Feuchte, Gebäude der Luftfeuchteklasse <b>FK ${fk}</b> (Δv bei ϑ<sub>e</sub> ≤ 0 °C), innen ${ti} °C. Berechne die absolute Feuchte außen und innen, die relative Feuchte innen und den Taupunkt innen.`,
    a: [{ l: "v<sub>e</sub>", v: ve, u: "g/m³", d: 2, tol: 0.04 }, { l: "v<sub>i</sub>", v: vi, u: "g/m³", d: 2, tol: 0.03 }, { l: "φ<sub>i</sub>", v: phii, u: "%", d: 0, tol: 0.04 }, { l: "ϑ<sub>Tau</sub>", v: tau, u: "°C", d: 1, tol: 0.06 }],
    s: [`p<sub>s</sub>(${te}) = ${num(P.ps(te), 0)} Pa → p<sub>e</sub> = ${num(pe, 0)} Pa → \\(v_e=\\frac{${num(pe, 0)}}{462\\cdot${num(te + 273.15, 2)}}=${num(ve / 1000, 5)}\\) kg/m³ = ${num(ve, 2)} g/m³`,
      `FK ${fk} → Δv = ${dv} g/m³ → v<sub>i</sub> = ${num(ve, 2)} + ${dv} = <b>${num(vi, 2)} g/m³</b>`, `p<sub>i</sub> = v·R·T = ${num(vi / 1000, 5)}·462·${num(ti + 273.15, 2)} = ${num(pi, 0)} Pa; p<sub>s</sub>(${ti}) = ${num(P.ps(ti), 0)} Pa → φ<sub>i</sub> = <b>${num(phii, 0)} %</b>`,
      `Taupunkt: p<sub>s</sub>(ϑ) = ${num(pi, 0)} Pa bei ϑ<sub>Tau</sub> ≈ <b>${num(tau, 1)} °C</b>`], p: [185, 190, 191, 192, 262] };
}},
{ id: "sd", c: "feuchte", t: "s_d-Wert & Klassifizierung", gen() {
  const L = [pick([["Gipskartonplatte", 10, 1.25], ["Gipskartonplatte", 10, 1.5]]), pick([["OSB-Platte", 165, 1.5], ["OSB-Platte", 165, 2.2], ["Konstruktionsholz", 50, 4]]), pick([["Mineralwolle", 1, 20], ["EPS", 60, 10], ["Holzfaser", 5, 6]])];
  const sds = L.map(l => l[1] * l[2] / 100), tot = sds.reduce((a, b) => a + b, 0), i = Math.floor(Math.random() * 3);
  return { q: `Aufbau von innen: ${L.map(l => `${num(l[2], 2)} cm ${l[0]} (µ = ${l[1]})`).join(", ")}. Berechne den s<sub>d</sub>-Wert der Schicht „${L[i][0]}“ und den gesamten s<sub>d</sub>-Wert. Wie ist „${L[i][0]}“ einzuordnen?`,
    a: [{ l: `s<sub>d</sub> ${L[i][0]}`, v: sds[i], u: "m", d: 3, tol: 0.02 }, { l: "Σs<sub>d</sub>", v: tot, u: "m", d: 2, tol: 0.02 }],
    s: [...L.map((l, k) => `s<sub>d</sub> = ${l[1]}·${num(l[2] / 100, 4)} = ${num(sds[k], 3)} m`), `Σ = <b>${num(tot, 2)} m</b>; „${L[i][0]}“: ${num(sds[i], 3)} m → <b>${sdClass(sds[i])}</b>`], p: [173, 195, 196] };
}},
{ id: "mwt", c: "feuchte", t: "Tauwassermenge (Glaser, ein Monat)", gen() {
  const pi = rnd(1250, 1450, 10), pe = rnd(330, 420, 5), psc = rnd(450, 650, 5), sdi = pick([0.15, 0.3, 0.5, 1.0]), sde = pick([2, 3.3, 5]), tT = pick([744, 720, 672]);
  const gi = (pi - psc) / (1.5e6 * sdi), ge = (psc - pe) / (1.5e6 * sde), mw = tT * (gi - ge);
  return { q: `Glaser: In der Tauebene herrscht p<sub>s,c</sub> = ${psc} Pa. Innen p<sub>i</sub> = ${pi} Pa, außen p<sub>e</sub> = ${pe} Pa. s<sub>d</sub> innen bis zur Tauebene ${num(sdi, 2)} m, von der Tauebene nach außen ${num(sde, 1)} m. Tauperiode ${tT} h. Wie viel Tauwasser fällt an? Wird der Grenzwert schon in diesem Monat überschritten?`,
    a: [{ l: "g′<sub>i</sub>", v: gi * 1000, u: "g/m²h", d: 3, tol: 0.02 }, { l: "g′<sub>e</sub>", v: ge * 1000, u: "g/m²h", d: 3, tol: 0.02 }, { l: "m<sub>w,T</sub>", v: mw, u: "kg/m²", d: 3, tol: 0.03 }], yn: { l: "Grenzwert 0,5 kg/m² überschritten?", v: mw > 0.5 },
    s: [`\\(g'_i=\\frac{${pi}-${psc}}{1{,}5\\cdot10^6\\cdot${num(sdi, 2)}}=${num(gi, 6)}\\ \\mathrm{kg/m^2h}\\)`, `\\(g'_e=\\frac{${psc}-${pe}}{1{,}5\\cdot10^6\\cdot${num(sde, 1)}}=${num(ge, 6)}\\ \\mathrm{kg/m^2h}\\)`,
      `\\(m_{w,T}=${tT}\\cdot(${num(gi, 6)}-${num(ge, 6)})=\\mathbf{${num(mw, 3)}}\\ \\mathrm{kg/m^2}\\)`, mw > 0.5 ? "Schon ein Monat über 0,5 kg/m² → Nachweis nicht erbracht." : "Unter 0,5 – aber die Jahressumme aller Tauwassermonate zählt."], p: [249, 250, 253] };
}},
{ id: "dehn", c: "feuchte", t: "Thermische Längenänderung", gen() {
  const m = pick(ALPHA), l = rnd(3, 20, 1), t1 = rnd(50, 80, 5), t2 = rnd(-25, -10, 5), dl = l * m[1] * 1e-6 * (t1 - t2) * 1000;
  return { q: `Ein Bauteil aus <b>${m[0]}</b> (α<sub>t</sub> = ${num(m[1], 1)}·10⁻⁶ m/mK) ist ${l} m lang. Die Oberflächentemperatur schwankt zwischen ${t2} °C und ${t1} °C. Wie groß ist die Längenänderung?`,
    a: [{ l: "Δl", v: dl, u: "mm", d: 1, tol: 0.02 }], s: [`\\(\\Delta l=${l}\\cdot${num(m[1], 1)}\\cdot10^{-6}\\cdot(${t1}-(${t2}))=${num(dl / 1000, 5)}\\ \\mathrm m=\\mathbf{${num(dl, 1)}\\ mm}\\)`], p: [167, 168, 169] };
}},
];

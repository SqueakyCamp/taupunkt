// Physik-Helfer und Zahlenformat (deutsches Komma)
const P = {
  ps(t) { // Sättigungsdampfdruck in Pa (Formelsammlung S. 7)
    return t >= 0 ? 610.5 * Math.exp(17.269 * t / (237.3 + t)) : 610.5 * Math.exp(21.875 * t / (265.5 + t));
  },
  tau(t, phi) { // Taupunkt aus Folie 188 (phi in %)
    return Math.pow(phi / 100, 1 / 8.02) * (109.8 + t) - 109.8;
  },
  tauFromP(p) { // Temperatur, bei der ps = p (Bisektion)
    let lo = -40, hi = 60;
    for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (P.ps(m) > p) hi = m; else lo = m; }
    return (lo + hi) / 2;
  },
  vFromP(p, t) { return p / (462 * (t + 273.15)); }, // kg/m³
  pFromV(v, t) { return v * 462 * (t + 273.15); },
  SIGMA: 5.67e-8,
};
const num = (x, d = 2) => {
  if (x === null || x === undefined || !isFinite(x)) return "–";
  let [i, f] = Math.abs(x).toFixed(d).split(".");
  if (+i === 0 && f && /^0*$/.test(f)) x = 0;
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (x < 0 && (+i.replace(/\./g, "") || +f) ? "−" : "") + i + (f ? "," + f : "");
};
const parseNum = s => {
  if (typeof s !== "string") return NaN;
  s = s.trim().replace(/\s/g, "");
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, "");
  return parseFloat(s.replace(",", "."));
};
const rnd = (a, b, step = 1) => { const n = Math.round((b - a) / step); return +(a + step * Math.floor(Math.random() * (n + 1))).toFixed(6); };
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

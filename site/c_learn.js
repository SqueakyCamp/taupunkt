// Lerninhalte. [[23]] = Folie (PDF-Seite) 23 im Skript, [[F5]] = Formelsammlung Seite 5, [[P4]] = Prüfung Seite 4.
// Formeln: \( ... \) inline, $$ ... $$ abgesetzt (KaTeX). Widgets: w: "id" -> app.js
const R = String.raw;
window.CHAPTERS = [
{
 id: "winter", title: "Winterlicher Wärmeschutz", short: "Winter", icon: "❄", exam: "7 Fragen + 1 Rechnung",
 intro: "Wie Wärme durch Bauteile verloren geht, wie man den U-Wert rechnet und wie die Energiebilanz (HWB → HEB → EEB → PEB/CO₂) aufgebaut ist.",
 sections: [
 { id: "ziel", t: "Worum geht's? Ziel & Hintergrund", p: [2,3,4], h: R`
<p>Die Bauphysik soll <b>ein behagliches Raumklima auch bei extremen Außenbedingungen</b> schaffen und das Gebäude vor zerstörenden Einflüssen schützen [[2]]. Teildisziplinen: Wärmeschutz (Gesamtenergieeffizienz), Dauerhaftigkeit &amp; Feuchteschutz, Akustik/Schallschutz, Brandschutz.</p>
<ul>
<li>Gebäude verursachen <b>40 %</b> des Endenergieverbrauchs der EU und <b>36 %</b> der energiebedingten Treibhausgasemissionen; ⅔ der Heiz-/Kühlenergie ist fossil [[3]].</li>
<li>Ziel EU (Green Deal): Neubauten ab <b>2028</b> Nullemissionsgebäude, Bestand bis <b>2050</b> emissionsfrei [[3]].</li>
<li><b>Effizienz = Verhältnis Nutzen zu Aufwand</b>: „optimales behagliches Raumklima“ mit minimalem Energieverbrauch [[4]].</li>
</ul>`},
 { id: "waerme", t: "Wärme, Temperatur, Wärmestrom", p: [5,6,7,8,9,10], h: R`
<p><b>Wärme</b> ist thermische Energie = Bewegungsenergie der Moleküle. Beim absoluten Nullpunkt (−273,15 °C = 0 K) steht die Bewegung still. „Kälte“ ist physikalisch nur <i>fehlende</i> Wärme [[6]].</p>
<p>Wärme fließt <b>immer von warm nach kalt</b> – und ist die einzige Energieform, die allein wegen eines Temperaturunterschieds übertragen wird [[7]].</p>
$$T\,[\mathrm K] = \vartheta\,[^\circ\mathrm C] + 273{,}15$$
<p class="tip">Im Bauwesen: Temperaturen \(\vartheta\) in °C, <b>Temperaturdifferenzen in K</b> (1 K = 1 °C Unterschied). Nur bei Strahlung und beim Partialdruck muss man in Kelvin rechnen!</p>
<div class="grid2">
<div><b>Wärmestrom</b> \(\Phi = \dfrac{Q}{t}\) in W<br><small>Wärmemenge pro Zeit</small></div>
<div><b>Wärmestromdichte</b> \(q = \dfrac{\Phi}{A}\) in W/m²<br><small>Wärmestrom pro Fläche</small></div>
</div>
<h4>Die drei Transportarten [[9]] [[10]]</h4>
<table class="t"><tr><th>Art</th><th>Wie?</th><th>Beispiel</th></tr>
<tr><td><b>Wärmeleitung</b></td><td>Schwingungsenergie wird von Teilchen zu Teilchen weitergegeben, <i>ohne</i> dass sie ihre Lage verändern – vor allem in <b>festen Stoffen</b></td><td>Wand, Dämmung</td></tr>
<tr><td><b>Konvektion</b></td><td>Wärme wird mit bewegten <b>Gasen oder Flüssigkeiten</b> mitgeführt (thermischer Auftrieb, weil warme Luft leichter ist)</td><td>Heizkörper, Heißluftballon</td></tr>
<tr><td><b>Strahlung</b></td><td>Elektromagnetische Wellen, <b>kein Trägermedium nötig</b>. Kurzwellige Strahlung wird beim Auftreffen in langwellige Wärmestrahlung umgewandelt</td><td>Sonne</td></tr></table>
<p class="warn">Prüfungsfalle: „Wärme wird durch Konvektion, <i>Wärmespeicherung</i> und Strahlung übertragen“ ist <b>falsch</b> – Speicherung ist kein Transport. Und Strahlung braucht <b>keine</b> Gasteilchen [[P3]].</p>`},
 { id: "uwert", t: "Wärmeleitfähigkeit λ, Widerstand R, U-Wert", p: [11,12,13,14,15,16,17,18,19,20], w: "ucalc", h: R`
<p>Durch ein Bauteil fließt im stationären Zustand eine Wärmestromdichte proportional zur Temperaturdifferenz [[11]]:</p>
$$q = U\cdot(\vartheta_i - \vartheta_e)$$
<p><b>U-Wert (Wärmedurchgangskoeffizient)</b> in W/(m²K): Wärmestrom durch <b>1 m²</b> Bauteil bei <b>1 K</b> Temperaturunterschied innen–außen [[12]]. <b>Kleiner U-Wert = gute Dämmung.</b></p>
<h4>Wärmeleitfähigkeit λ (Lambda) in W/(mK)</h4>
<p>Materialeigenschaft. Hängt vom Feststoff und von <b>Porengröße/-verteilung</b> ab. Faustregel: <b>je leichter (geringere Rohdichte), desto besser dämmt es</b> [[13]] [[15]].</p>
<table class="t"><tr><th>Baustoff (ÖNORM B 8110-7)</th><th>ρ kg/m³</th><th>λ W/(mK)</th></tr>
<tr><td>EPS-Dämmung (EPS-W 20)</td><td>19,5</td><td>0,038</td></tr>
<tr><td>Mineralwolle</td><td>50–80</td><td>0,035–0,039</td></tr>
<tr><td>Fichtenholz</td><td>475</td><td>0,12</td></tr>
<tr><td>OSB-Platte</td><td>650</td><td>0,13</td></tr>
<tr><td>Hochlochziegel 17–38 cm</td><td>875</td><td>0,26</td></tr>
<tr><td>Normalbeton bewehrt</td><td>2400</td><td>2,5</td></tr>
<tr><td>Stahl</td><td>7800</td><td>50</td></tr></table>
<p class="tip">Reihung nach λ aufsteigend (kam zur Prüfung): <b>EPS &lt; Holz &lt; Ziegel &lt; Beton</b> [[P3]].</p>
<h4>Vom λ zum U-Wert</h4>
<p>Jede homogene Schicht hat einen <b>Wärmedurchlasswiderstand</b> [[19]]:</p>
$$R = \frac{d}{\lambda}\quad[\mathrm{m^2K/W}]$$
<p>Dicker → größeres R. Größeres λ → kleineres R. Die Widerstände werden <b>wie bei Reihenschaltung addiert</b> – plus die beiden Wärmeübergangswiderstände an den Oberflächen [[17]] [[18]]:</p>
$$R_T = R_{si} + \sum_i \frac{d_i}{\lambda_i} + R_{se}$$
$$ U = \frac{1}{R_T}$$
<h4>Wärmeübergangswiderstände R<sub>si</sub>, R<sub>se</sub> (ÖNORM EN ISO 6946)</h4>
<p>Fassen Konvektion und Strahlung an der Oberfläche zusammen [[21]] [[22]]:</p>
<table class="t"><tr><th>Wärmestrom</th><th>aufwärts (Dach)</th><th>horizontal (Wand)</th><th>abwärts (Boden über Außenluft)</th></tr>
<tr><td>R<sub>si</sub> innen</td><td>0,10</td><td>0,13</td><td>0,17</td></tr>
<tr><td>R<sub>se</sub> außen</td><td>0,04</td><td>0,04</td><td>0,04</td></tr></table>
<p><b>Stark belüftete Luftschichten</b> (Hinterlüftung, Öffnungen &gt; 1500 mm² je m bzw. m²): Alles <i>außerhalb</i> der Luftschicht (Fassadenplatte, Blechdeckung …) wird <b>nicht</b> gerechnet. Statt R<sub>se</sub> nimmt man den inneren Wert (Dach nach oben 0,10, Wand 0,13, nach unten 0,17) [[24]].</p>
<div class="ex"><b>Beispiel [[23]]:</b> 20 cm Ziegel (λ = 0,25) + 20 cm Dämmung (λ = 0,04), Wand, ϑ<sub>i</sub> = 22 °C, ϑ<sub>e</sub> = −5 °C.
$$U=\frac{1}{0{,}13+\frac{0{,}20}{0{,}25}+\frac{0{,}20}{0{,}04}+0{,}04}=\frac{1}{5{,}97}=0{,}17\ \mathrm{W/m^2K}$$
$$q = 0{,}17\cdot(22-(-5)) = 4{,}52\ \mathrm{W/m^2}$$
$$ Q = q\cdot t = 4{,}52\ \mathrm{Wh/m^2}\ (1\,h)$$</div>
<div class="ex"><b>Prüfungsbeispiel – hinterlüftetes Dach [[P6]]:</b> Blechdeckung 3 cm | Hinterlüftung 5 cm | Winddichte Ebene | Dämmung 10 cm λ 0,04 | Beton 20 cm λ 2,4 | Spachtelung.<br>
Blech &amp; Hinterlüftung fallen weg, Wärmestrom nach oben: R<sub>si</sub> = 0,10, außen (belüftet) ebenfalls 0,10:
$$U=\frac{1}{0{,}10+\frac{0{,}10}{0{,}04}+\frac{0{,}20}{2{,}4}+0{,}10}=\frac{1}{2{,}783}=0{,}36\ \mathrm{W/m^2K}$$
Die OIB-Anforderung U &lt; 0,20 W/m²K ist damit <b>nicht</b> eingehalten.</div>`},
 { id: "strahlung", t: "Wärmestrahlung, Solarstrahlung & g-Wert", p: [25,26,27,28,29,30], h: R`
<p>Jeder Körper strahlt abhängig von seiner Temperatur Wärme ab (Stefan-Boltzmann) [[25]]:</p>
$$q = \varepsilon\cdot\sigma\cdot(T_1^4 - T_2^4)$$
$$ \sigma = 5{,}67\cdot10^{-8}\ \mathrm{W/m^2K^4}$$
<p><b>ε (Emissionsgrad)</b>: wie gut eine Oberfläche abstrahlt, verglichen mit einem idealen schwarzen Strahler (ε = 1). Blankes Metall 0,04 · Low-E-Glas 0,2 · Putz/Ziegel/Holz 0,85–0,93.</p>
<p class="warn">Achtung: T in <b>Kelvin</b> einsetzen! [[26]]</p>
<div class="ex"><b>Beispiel Heizkörper [[26]]:</b> 50 °C Heizkörper, Wände 17 °C, ε = 0,85:
$$q=0{,}85\cdot5{,}67\cdot10^{-8}\cdot(323{,}15^4-290{,}15^4)\approx184\ \mathrm{W/m^2}$$</div>
<h4>Sonnenstrahlung [[27]] [[28]]</h4>
<p>Sonnenstrahlung = 3 % UV, 39 % sichtbar, 58 % Infrarot. Trifft sie auf eine Oberfläche, wird sie anteilig <b>reflektiert (ρ), absorbiert (α) und – bei Glas – durchgelassen (τ)</b>: \(q_{ein} = q_{refl}+q_{abs}+q_{durch}\).</p>
<h4>Gesamtenergiedurchlassgrad g [[29]] [[30]]</h4>
<p>Ein Teil der Solarstrahlung geht <b>direkt</b> durchs Glas (Transmissionsgrad τ). Ein Teil wird im Glas <b>absorbiert</b>, erwärmt die Scheibe und wird als Konvektion/IR-Strahlung nach innen abgegeben = <b>sekundäre Wärmeabgabe q<sub>i</sub></b>.</p>
$$g = \tau + q_i$$
<p><b>Je größer g, desto mehr Sonnenwärme kommt in den Raum.</b> g beschreibt also, wieviel der außen auftreffenden Solarstrahlung an den Innenraum abgegeben wird – nicht, was absorbiert wird [[P4]].</p>`},
 { id: "fenster", t: "U-Wert von Fenstern (U_w)", p: [31,32,33,34,35,36], w: "uw", h: R`
<p>Das Fenster besteht aus Glas, Rahmen und dem Randverbund (Abstandhalter) – jedes mit eigenem Wärmeverlust [[31]]:</p>
$$U_w = \frac{A_f\cdot U_f + A_g\cdot U_g + l_g\cdot\psi_g}{A_w}$$
<table class="t"><tr><td>A<sub>w</sub></td><td>Fensterfläche (Außenmaß)</td><td>A<sub>g</sub></td><td>Glasfläche</td></tr>
<tr><td>A<sub>f</sub></td><td>Rahmenfläche = A<sub>w</sub> − A<sub>g</sub></td><td>l<sub>g</sub></td><td>Umfang der Glasfläche(n)</td></tr>
<tr><td>U<sub>f</sub></td><td>Rahmen, heute 0,8–1,2</td><td>U<sub>g</sub></td><td>Glas, heute 0,6–0,8</td></tr>
<tr><td>ψ</td><td colspan="3">längenbezogener Wärmedurchgangskoeffizient des Abstandhalters (W/mK), heute 0,015–0,025. Der Abstandhalter ist wegen hoher Leitfähigkeit eine <b>Wärmebrücke</b> [[34]]</td></tr></table>
<p><b>Low-E-Glas („e4“)</b>: Beschichtung mit niedrigem Emissionsgrad ε – langwellige Wärmestrahlung wird nach innen reflektiert, der Strahlungsaustausch zwischen den Scheiben sinkt [[32]].</p>
<div class="ex"><b>Beispiel [[35]]:</b> Fenster 1,50 × 1,30 m, Rahmen 15 cm rundum → Glas 1,20 × 1,00 m.
A<sub>w</sub> = 1,95 m², A<sub>g</sub> = 1,20 m², A<sub>f</sub> = 0,75 m², l = 2·(1,20+1,00) = 4,40 m
$$U_w=\frac{0{,}75\cdot1{,}0+4{,}40\cdot0{,}02+1{,}20\cdot0{,}8}{1{,}95}=0{,}92\ \mathrm{W/m^2K}$$</div>
<div class="ex"><b>Übung Fenstertür [[36]]:</b> Breite 15+80+20+80+15 = 210 cm, Höhe 15+170+15 = 200 cm, zwei Glasfelder 0,80 × 1,70.<br>
<details><summary>Lösung</summary>A<sub>w</sub> = 2,10·2,00 = 4,20 m² · A<sub>g</sub> = 2·0,80·1,70 = 2,72 m² · A<sub>f</sub> = 1,48 m² · l = 2·2·(0,80+1,70) = 10,0 m
$$U_w=\frac{1{,}48\cdot1{,}0+10{,}0\cdot0{,}02+2{,}72\cdot0{,}8}{4{,}20}=0{,}92\ \mathrm{W/m^2K}$$</details></div>`},
 { id: "bilanz", t: "Energiebilanz & Heizwärmebedarf (HWB)", p: [38,39,40,41,42,43,44,45], w: "hwb", h: R`
<p><b>Heizwärmebedarf (HWB, Q<sub>h</sub>)</b>: Wärmemenge, die im Laufe eines Jahres dem Gebäude <b>zugeführt</b> werden muss, um die Raumtemperatur (Wohnräume <b>22 °C</b>) zu halten [[39]]. Einheit kWh/a bzw. kWh/(m²a) – <b>nicht</b> W/m²K!</p>
<p><b>Kühlbedarf (KB)</b>: Wärmemenge, die <b>entzogen</b> werden muss, damit max. <b>26 °C</b> nicht überschritten werden.</p>
<p>Gerechnet wird eine <b>monatliche Energiebilanz</b> [[44]]:</p>
$$Q_h = (Q_T + Q_V) - \eta\cdot(Q_s + Q_i)$$
<div class="grid2">
<div class="box loss"><b>Verluste</b><br>Q<sub>T</sub> Transmission (durch Bauteile)<br>Q<sub>V</sub> Lüftung (Luftaustausch)</div>
<div class="box gain"><b>Gewinne</b><br>Q<sub>s</sub> solar (Fenster)<br>Q<sub>i</sub> innere (Personen, Geräte, Licht)<br>η = Ausnutzungsgrad</div></div>
<p>Wärmeübertragungsarten in der Bilanz: <b>Transmission</b> (über Bauteile), <b>Konvektion</b> (Luftströmung), <b>Strahlung</b> (Sonne, IR zwischen Oberflächen) [[40]].</p>
<p><b>Außenklima:</b> Österreich ist nach ÖNORM B 8110-5 in <b>7 Klimazonen</b> geteilt; ein höhenabhängiges <b>Dreischichten-Regressionsmodell</b> (unter 750 m, 750–1500 m, über 1500 m) liefert Monatsmitteltemperatur und Globalstrahlung [[42]] [[43]].</p>
<div class="ex"><b>Durchgehendes Beispiel „blauer Würfel“, Jänner [[45]]:</b> 5 × 5 m Grundriss, 4 m hoch, ein Fenster 2 × 2 m. Die folgenden Abschnitte rechnen Q<sub>T</sub>, Q<sub>V</sub>, Q<sub>s</sub>, Q<sub>i</sub> aus. Ergebnis [[109]]:
$$Q_h = 692 + 87 - 1\cdot(37+40) = 702\ \mathrm{kWh/Monat}$$
Mit dem Regler unten kannst du ausprobieren, was welche Größe bewirkt.</div>`},
 { id: "qt", t: "Transmissionswärmeverluste Q_T", p: [46,47,48,49,50,51,52,62,63,64,65,66,67,68,69,70], h: R`
$$Q_T = \frac{1}{1000}\cdot L_T\cdot(\vartheta_i-\vartheta_e)\cdot t\quad[\mathrm{kWh/Monat}]$$
<p>t = Stunden des Monats (Jänner: 31·24 = <b>744 h</b>), \(\frac1{1000}\) rechnet Wh in kWh um [[46]]. Der <b>Transmissionsleitwert L<sub>T</sub></b> (W/K) ist der Wärmestrom durch die ganze Hülle bei 1 K Unterschied:</p>
$$L_T = L_e + L_u + L_g + L_\psi + L_\chi$$
<table class="t"><tr><td>L<sub>e</sub></td><td>Bauteile direkt zur Außenluft: \(L_e=\sum U_i\cdot A_i\)</td></tr>
<tr><td>L<sub>u</sub></td><td>über <b>unkonditionierte</b> Räume (Dachboden, Keller, Garage, Stiegenhaus …)</td></tr>
<tr><td>L<sub>g</sub></td><td>über das <b>Erdreich</b></td></tr>
<tr><td>L<sub>ψ</sub></td><td>Zuschlag für <b>linienförmige</b> (2D) Wärmebrücken: \(L_\psi=\sum l_j\cdot\psi_j\)</td></tr>
<tr><td>L<sub>χ</sub></td><td>Zuschlag für <b>punktförmige</b> (3D) Wärmebrücken</td></tr></table>
<p><b>Systemgrenze</b> = konditionierte (beheizte/gekühlte) Zone, meist entlang der Dämmebene [[49]]. Flächen mit <b>Außenabmessungen</b>; die Dämmschicht ist die äußerste Begrenzung, Bekleidungen/Fassaden werden nicht dazugerechnet [[50]].</p>
<h4>Unkonditionierte Räume und Erdreich – Temperaturkorrekturfaktor f</h4>
<p>Vereinfacht wird der Leitwert mit einem Faktor f abgemindert, weil es dort wärmer als außen ist [[63]] [[65]]:</p>
$$L_u = L_{iu}\cdot f_{i,h}$$
$$ L_g = \sum A\cdot U\cdot f_{i,h}$$
<table class="t"><tr><th>Bauteil</th><th>f<sub>i,h</sub> (Heizfall)</th></tr>
<tr><td>Decke/Wand zu unkonditioniertem, geschlossenem <b>Dachraum</b></td><td>0,90</td></tr>
<tr><td>Wand/Decke zu geschlossener Garage</td><td>0,90</td></tr>
<tr><td>Wand/Decke zu Tiefgarage</td><td>0,80</td></tr>
<tr><td>Decke zu ungedämmtem Keller / Stiegenhaus</td><td>0,70</td></tr>
<tr><td>Decke zu gedämmtem Keller</td><td>0,50</td></tr>
<tr><td>Erdanliegende Wand / Fußboden ≤ 1,5 m unter Erdreich</td><td>0,80 / 0,70</td></tr>
<tr><td>Erdanliegende Wand / Fußboden &gt; 1,5 m unter Erdreich</td><td>0,60 / 0,50</td></tr></table>
<p class="tip">Das f-Verfahren gilt nur für Konstruktionen nach Mindestanforderungen – bei sehr gut gedämmten wird der Wärmestrom unterschätzt (genauer: ÖNORM EN ISO 13370) [[65]] [[66]].</p>
<div class="ex"><b>Blauer Würfel [[52]] [[61]] [[68]] [[70]]:</b><br>
Fenster 2·2 = 4 m² (U 0,92) · Wand 20·4 − 4 = 76 m² (U 0,17) · Dach 5·5 = 25 m² (U 0,16):
\(L_e = 4\cdot0{,}92+76\cdot0{,}17+25\cdot0{,}16 = 20{,}6\) W/K<br>
Wärmebrücken: \(L_\psi = 20\cdot0{,}6+2\cdot0{,}35+4\cdot0{,}18+2\cdot0{,}15 = 13{,}72\) W/K<br>
Bodenplatte: \(L_g = 25\cdot0{,}30\cdot0{,}7 = 5{,}25\) W/K → \(L_T = 39{,}57\) W/K
$$Q_T=\tfrac{1}{1000}\cdot39{,}57\cdot(22-(-1{,}5))\cdot744 = 692\ \mathrm{kWh}$$</div>
<div class="ex"><b>Prüfungsrechnung [[P4]]:</b> Decke 110 m² zum geschlossenen Dachraum, U von 1,5 auf 0,3 W/m²K, Jänner ϑ<sub>e</sub> = −1,5 °C. Ersparnis?
$$\Delta Q_T = \tfrac{1}{1000}\cdot110\cdot(1{,}5-0{,}3)\cdot\underbrace{0{,}9}_{f_{i,h}}\cdot(22+1{,}5)\cdot744 = 2.077\ \mathrm{kWh}$$
Falle: ohne f kommt 2.308 kWh heraus; 118,8 <b>W/K</b> ist nur der Leitwert (falsche Einheit für einen Wärmeverlust).</div>`},
 { id: "wb", t: "Wärmebrücken", p: [53,54,55,56,57,58,59,265], h: R`
<p><b>Wärmebrücken</b> sind örtlich begrenzte Bereiche der Gebäudehülle mit <b>höherer Wärmestromdichte</b> als die ungestörten Bauteile daneben – also Schwachstellen mit erhöhtem Transmissionsverlust [[53]].</p>
<p>Folge im Winter: An der <b>Innenseite</b> ist die Oberfläche <b>kälter</b> (außen dagegen wärmer) → Gefahr von <b>Kondensat und Schimmel</b> innen [[54]]. (Nicht: „höhere Oberflächentemperaturen innen“ – das ist die Prüfungsfalle [[P3]].)</p>
<table class="t"><tr><th>Art</th><th>Ursache</th><th>Beispiel</th></tr>
<tr><td><b>geometrisch</b></td><td>wärmeaufnehmende Innenfläche kleiner als wärmeabgebende Außenfläche</td><td>Gebäudeecken</td></tr>
<tr><td><b>konstruktiv</b></td><td>Materialien mit unterschiedlicher Wärmeleitfähigkeit im Anschluss</td><td>Balkonplatte, Rollladenkasten, Sockel</td></tr></table>
<p>Linienförmige (2D) Wärmebrücken (Kanten, Balkon-, Fensteranschluss) werden mit dem <b>ψ-Wert</b> (W/mK) × Länge erfasst; ψ aus Katalogen (ISO 14683) oder berechnet (ISO 10211) [[58]]. Typische Stellen: Anschluss Bodenplatte, Decke/Dach, Gebäudeecken, Attika, Fensterlaibung/-brüstung/-sturz, Balkonplatte, First, Ortgang [[57]].</p>`},
 { id: "lueftung", t: "Lüftung, Luftdichtheit & n50", p: [74,75,76,77,78,79,80,81,82,83,84,85], h: R`
<p><b>Lüftungswärmeverluste Q<sub>V</sub></b> entstehen durch Lüftung (Fenster, Anlage) und <b>Infiltration</b> (undichte Gebäudehülle) [[74]].</p>
<div class="grid2"><div><b>Luftdichtheit</b> (innen): verhindert, dass Raumluft durch Winddruck/Auftrieb <b>von innen nach außen</b> in die Konstruktion strömt.</div>
<div><b>Winddichtheit</b> (außen): verhindert, dass <b>Außenluft in die Dämmschicht</b> eindringt [[75]].</div></div>
<h4>Blower-Door-Test: n<sub>50</sub> [[76]] [[77]]</h4>
<p>Man misst, welcher Volumenstrom ins Gebäude gedrückt bzw. herausgesaugt werden muss, um <b>50 Pa</b> Druckdifferenz zu halten (Mittel aus Unter- und Überdruck): \(n_{50} = \dot V_{50}/V\). <b>Je kleiner n<sub>50</sub>, desto luftdichter.</b></p>
<table class="t"><tr><td>ohne mechanische Lüftung</td><td>≤ 3,0 h⁻¹</td></tr><tr><td>mit Lüftungsanlage</td><td>≤ 1,5 h⁻¹</td></tr><tr><td>gute Luftdichtheit</td><td>ca. 1,0 h⁻¹</td></tr><tr><td>sehr hohe Luftdichtheit</td><td>&lt; 0,6 h⁻¹</td></tr></table>
<p class="warn">n<sub>50</sub> beschreibt <b>nicht</b> den Volumenstrom „in 50 Minuten“, sondern bei 50 Pascal [[P5]].</p>
<h4>Hygienischer Luftwechsel [[78]] [[79]] [[81]]</h4>
<p>Frischluft je Person mindestens 18–30 m³/h, empfohlen <b>36 m³/h</b> (10 l/s) → ca. 1000 ppm CO₂. Die <b>Luftwechselrate n</b> (h⁻¹) sagt, wie oft pro Stunde das Raumvolumen getauscht wird. Sie legt den hygienischen Luftaustausch fest. Rechenwerte: <b>0,28 h⁻¹</b> (Wohnhaus ≤ 2 Nutzungseinheiten), <b>0,38 h⁻¹</b> (mehr als 2).</p>
<p class="warn">Je <b>höher</b> n, desto <b>größer</b> die Lüftungswärmeverluste [[P5]].</p>
<h4>Rechnung [[83]] [[85]]</h4>
$$V_V = BGF\cdot0{,}8\cdot2{,}6$$
$$ L_V = 0{,}34\cdot n_L\cdot V_V$$
$$ Q_V=\tfrac{1}{1000}\cdot L_V\cdot(\vartheta_i-\vartheta_e)\cdot t$$
<p>0,34 Wh/(m³K) = c<sub>p</sub>·ρ der Luft (0,28 Wh/kgK · 1,224 kg/m³). V<sub>V</sub> = energetisch wirksames Luftvolumen (80 % der BGF × 2,6 m).</p>
<div class="ex"><b>Blauer Würfel:</b> \(L_V = 0{,}34\cdot0{,}28\cdot(5\cdot5\cdot0{,}8\cdot2{,}6) = 4{,}95\) W/K → \(Q_V = \tfrac{1}{1000}\cdot4{,}95\cdot23{,}5\cdot744 = 87\) kWh</div>`},
 { id: "gewinne", t: "Solare & innere Gewinne", p: [87,88,89,90,91,92,93,94,95,96,97,99,100,101,102], h: R`
<h4>Solare Gewinne Q<sub>s</sub> [[90]]</h4>
$$Q_s=\sum_j I_{s,j}\cdot\sum A_{trans}$$
$$ A_{trans}=A_g\cdot F_s\cdot g_w$$
<ul><li><b>I<sub>s,j</sub></b>: Globalstrahlung auf die Fläche je Orientierung (kWh/m²·Monat). Im Winter bringt <b>Süd</b> am meisten [[89]].</li>
<li><b>A<sub>g</sub> = 0,7 · A<sub>w</sub></b>: pauschaler Glasflächenanteil 0,7 der Architekturlichte [[91]].</li>
<li><b>g<sub>w</sub> = 0,9 · 0,98 · g</b>: effektiver g-Wert; 0,98 für Verschmutzung, 0,9 für nicht senkrechten Einfall [[91]].</li>
<li><b>F<sub>s</sub></b> (Verschattungsfaktor, 0…1, dauerhafte Verschattung durch Gebäude, Gelände, Überhänge): vereinfacht 0,65 (EFH/ZFH/Reihenhaus), 0,50 (3–9 WE), 0,40 (≥ 10 WE); im Kühlfall 1,0 [[92]].</li></ul>
<p>Einflüsse auf die Einstrahlung: Jahres-/Tageszeit, Bewölkung, Standort, Nachbarbebauung, Seehöhe, auskragende Bauteile, Horizont, Fensterrücksprünge [[87]].</p>
<div class="ex"><b>Blauer Würfel (Süd, I = 40 kWh/m², g = 0,58) [[95]]:</b>
$$Q_s=40\cdot2\cdot2\cdot0{,}7\cdot0{,}65\cdot0{,}58\cdot0{,}9\cdot0{,}98 = 37\ \mathrm{kWh}$$
Das Fenster verliert gleichzeitig über Transmission (nur Glas, U<sub>g</sub> 0,8): \(\tfrac{1}{1000}\cdot0{,}8\cdot2{,}8\cdot23{,}5\cdot744=39\) kWh [[97]].</div>
<h4>Innere Gewinne Q<sub>i</sub> [[99]] [[101]]</h4>
$$Q_i = \tfrac{1}{1000}\cdot q_{i,h}\cdot BGF\cdot0{,}8\cdot t$$
<p>Personen, Geräte, Beleuchtung als genormter Durchschnittswert (Vergleichbarkeit). q<sub>i,h</sub> = 2,6875 W/m² (Wohngebäude 1–2 NE), 4,0625 W/m² (≥ 3 NE). Nichtwohngebäude: \(Q_i=\tfrac1{1000}\, q_{i,h}\cdot BF\cdot t\) [[99]].</p>
<div class="ex"><b>Blauer Würfel [[102]]:</b> \(Q_i=\tfrac{1}{1000}\cdot2{,}69\cdot25\cdot0{,}8\cdot744 = 40\) kWh</div>`},
 { id: "eta", t: "Ausnutzungsgrad η & Speichermasse", p: [72,73,104,105,106,107,108], h: R`
<p>Nicht alle Gewinne sind nutzbar: In der Übergangszeit heizt sich das Gebäude tagsüber so auf, dass man lüften oder kühlen muss – dieser Teil ist verloren [[106]].</p>
<p><b>η gibt den nutzbaren Anteil der solaren und inneren Gewinne an</b>. Er hängt ab vom <b>Verhältnis Gewinne/Verluste</b> γ und von der <b>Zeitkonstante τ</b> (Speicherfähigkeit) [[F3]]:</p>
$$\gamma=\frac{Q_s+Q_i}{Q_T+Q_V}$$
$$ \tau=\frac{C}{L_T+L_V}$$
$$ a=1+\frac{\tau}{16}$$
$$ \eta=\frac{1-\gamma^a}{1-\gamma^{a+1}}$$
<p><b>Mehr Speichermasse → größeres τ → größeres η → kleinerer HWB.</b> η ist nicht konstant, sondern wird monatlich ermittelt [[P2]].</p>
<table class="t"><tr><th>Bauweise</th><th>HWB</th></tr><tr><td>leicht (Holz ohne massive Innenwände)</td><td>7.742 kWh/a</td></tr><tr><td>mittelschwer (Mischbau)</td><td>7.406 (−4,3 %)</td></tr><tr><td>schwer (massiv, schwimmender Estrich)</td><td>7.300 (−5,7 %)</td></tr><tr><td>sehr schwer (Altbau)</td><td>7.213 (−6,8 %)</td></tr></table>
<p>Gespeicherte Wärme: \(Q=c\cdot m\cdot\Delta T\) – c = spezifische Wärmekapazität (Beton 1,00 kJ/kgK, Wasser 4,19, Stahl 0,45) [[72]] [[73]]. Flächengewicht: Beton mit Putz ≈ 475 kg/m², Holzriegelwand ≈ 60 kg/m² [[105]].</p>`},
 { id: "hwbvar", t: "HWB im Energieausweis, Kompaktheit", p: [111,112,113,114,115,116,117], w: "lc", h: R`
<table class="t"><tr><td><b>Ref</b></td><td>Referenz-Lüftung (Fensterlüftung) und Referenz-Nutzung → <b>ohne</b> Wärmerückgewinnung</td></tr>
<tr><td><b>RK</b></td><td>Referenzklima: fiktiver Standort, Klima aus ÖNORM B 8110-5</td></tr>
<tr><td><b>SK</b></td><td>Standortklima: echtes Klima des Bauplatzes</td></tr></table>
<p>Auf dem <b>Deckblatt</b> und in der Effizienzskala steht der <b>HWB<sub>Ref,SK</sub></b>; die <b>Anforderung</b> der OIB-RL 6 gilt für den <b>HWB<sub>Ref,RK</sub></b> [[113]].</p>
<p>Nachweis nach OIB-RL 6-2025 über zwei Wege; bei beiden müssen der zulässige Endenergiebedarf EEB<sub>zul,RK</sub> und der zulässige Primärenergiebedarf PEB<sub>zul,RK</sub> eingehalten werden. Weg 2 darf Kompensationsmaßnahmen (z. B. PV-Produktion) anrechnen [[115]].</p>
<h4>Kompaktheit [[116]] [[117]]</h4>
$$\text{Kompaktheit}=\frac{A}{V}$$
$$ l_c=\frac{V}{A}\ [\mathrm m]$$
<p><b>Je größer die charakteristische Länge l<sub>c</sub>, desto kompakter</b> (weniger Hüllfläche je Volumen) – und desto strenger bzw. leichter erreichbar ist der HWB: z. B. 150 m² eingeschoßig l<sub>c</sub> ≈ 0,94, 1450 m² viergeschoßig l<sub>c</sub> = 2,60.</p>
<p class="tip">Was beeinflusst die Energieeffizienz eines Gebäudes? Ausrichtung &amp; Größe der Fenster, Kompaktheit (A/V), Qualität der Wärmedämmung [[P3]].</p>`},
 { id: "heb", t: "HWW, HEB, EEB, PEB, CO₂", p: [118,119,120,121,122,123,124,125,126,127,128,129,130], w: "co2", h: R`
<div class="chain"><span>HWB</span>→<span>+ HWW + Anlagenverluste + Hilfsenergie = <b>HEB</b></span>→<span>+ HHSB = <b>EEB</b></span>→<span>× f<sub>PE</sub> = <b>PEB</b> / × f<sub>CO₂</sub> = <b>CO₂</b></span></div>
<p><b>Warmwasserwärmebedarf HWW</b>: Wärme, um Kaltwasser (ca. 8 °C) auf ca. 38 °C zu bringen; flächenbezogener Defaultwert je Nutzung (Wohnen 21–28 Wh/m²d) [[119]]: \(Q_{tw}=\tfrac1{1000}\cdot wwwb\cdot BF\cdot d_{Nutz}\). Plausibilität: 4,19·46·30 = 5.782 kJ = 1.600 Wh pro Person und Tag ≈ 28 Wh/m²d [[120]].</p>
<p><b>Heizenergiebedarf HEB</b>: HWB + HWW + <b>Verluste des gebäudetechnischen Systems</b> (Bereitstellung, Speicherung, Verteilung, Abgabe) + Hilfsenergie (Strom) [[121]]. Er wird monatlich bilanziert; Anlagenverluste in der beheizten Zone zählen als Gewinne; getrennt nach Energieträger und Strom [[123]].</p>
<p><b>Endenergiebedarf EEB</b> = HEB + <b>Haushaltsstrombedarf HHSB</b>. Das ist die Energie, die <b>eingekauft/geliefert</b> wird (Lieferenergie) [[124]]. HHSB-Ansatz im Ausweis 16,43 kWh/(m²a) – real eher ~37 → „Richtwerte zu optimistisch“ [[126]].</p>
<p><b>Primärenergiebedarf PEB</b>: inkl. <b>Vorketten</b> (Gewinnung, Umwandlung, Transport) über den Konversionsfaktor f<sub>PE</sub>. <b>CO₂</b> analog mit f<sub>CO2</sub> in g/kWh [[128]] [[129]].</p>
$$Q_{CO_2}=Q_{HEB,ET}\cdot f_{CO_2,ET}+(Q_{HEB,Strom}+Q_{HHSB})\cdot f_{CO_2,Strom}$$
<table class="t"><tr><th>Energieträger (OIB RL6:2023)</th><th>f<sub>PE</sub></th><th>f<sub>CO₂</sub> g/kWh</th></tr>
<tr><td>Fossil fest / flüssig / gasförmig</td><td>1,46 / 1,20 / 1,10</td><td>360 / 271 / 201</td></tr>
<tr><td>Biogen fest (Pellets, Holz)</td><td>1,13</td><td>9</td></tr>
<tr><td>Elektrische Energie (Liefermix)</td><td>1,76</td><td>156</td></tr>
<tr><td>Fernwärme Heizwerk erneuerbar / KWK hocheffizient</td><td>1,72 / 0,59</td><td>59 / 67</td></tr></table>
<div class="ex"><b>Prüfungsrechnung [[P6]]:</b> 7.500 kWh Pellets + 3.500 kWh Strom:
$$7500\cdot0{,}009+3500\cdot0{,}156=67{,}5+546=613{,}5\ \mathrm{kg\,CO_{2eq}/a}$$</div>
<p class="warn">Hilfsenergie (Strom für Pumpen etc.) gehört <b>zum HEB</b>, nicht zum Haushaltsstrom [[P2]].</p>`},
 ]
},
{
 id: "sommer", title: "Sommerlicher Wärmeschutz", short: "Sommer", icon: "☀", exam: "5 Fragen + 1 Rechnung",
 intro: "Überhitzung im Sommer vermeiden – ohne Klimaanlage. OIB-Anforderung, operative Temperatur, Sonnenschutz und das vereinfachte Verfahren mit speicherwirksamer Masse.",
 sections: [
 { id: "warum", t: "Warum sommerlicher Wärmeschutz?", p: [132,133,134,135], h: R`
<p>Versiegelte, künstliche Oberflächen in Städten <b>erwärmen, speichern und emittieren</b> viel mehr Wärme als unversiegelte. Durch die verzögerte Abgabe entstehen <b>städtische Wärmeinseln (Urban Heat Islands)</b>: nachts bis zu <b>6 °C</b> wärmer als das Umland [[132]] [[133]].</p>
<p><b>Ziel:</b> auch im Sommer ein behagliches Raumklima in Wohngebäuden <b>ohne außeninduzierten Kühlbedarf</b> (= ohne Klimatisierung) [[134]].</p>
<p>Die EU-Gebäuderichtlinie (EPBD) gibt <b>passiven Strategien Vorrang</b>: Sonnenschutz, ausreichende <b>Wärmekapazität</b> der Konstruktion, passive Kühlung – Klimaanlagen verursachen Spitzenlasten und höhere Stromkosten [[135]].</p>`},
 { id: "oib", t: "Anforderung OIB-RL 6 & Simulation", p: [136,137,138,142,149,150,151], w: "topmax", h: R`
<p>Die sommerliche Überwärmung bei <b>Wohngebäuden</b> gilt als vermieden, wenn die <b>operative Temperatur</b> bei einem sich täglich periodisch wiederholenden Außenklima den Maximalwert nicht überschreitet [[136]]:</p>
$$T_{op}\le T_{op,max}=\tfrac13\cdot T_{NAT,13}+21{,}8\,^\circ\mathrm C$$
<p><b>T<sub>NAT,13</sub></b> = Tagesmitteltemperatur, die im Schnitt an <b>13 Tagen pro Jahr überschritten</b> wird (abhängig von Seehöhe und Katastralgemeinde) – <i>nicht</i> die Anzahl der Hitzetage [[P5]]. Wien Innere Stadt: 24,9 °C → T<sub>op,max</sub> = 30,1 °C [[138]].</p>
<p class="tip"><b>Alternativ eingehalten</b>, wenn <b>alle Fenster außenliegenden Sonnenschutz mit g<sub>tot</sub> ≤ 0,15</b> haben; Nordfenster (± 22,5°) dürfen unberücksichtigt bleiben. Wohngebäude dürfen <b>keine aktive Kühlung</b> ansetzen [[136]].</p>
<h4>Simulationsverfahren (ÖNORM B 8110-3:2020) [[137]] [[142]]</h4>
<p>Der <b>Tagesverlauf der operativen Raumtemperatur</b> wird für ein Normaußenklima simuliert. Berücksichtigt werden: <b>Lüftung</b>, <b>innere Lasten</b> (Personen, Geräte, Beleuchtung), <b>solare Einträge</b> (Standort, Orientierung, Fenster, Sonnenschutz) und der <b>Schichtenaufbau</b> (speicherwirksame Masse). Erfüllt, wenn die Kurve die zulässige Obergrenze nicht überschreitet [[149]].</p>
<h4>Sommertauglichkeit (ÖNORM B 8110-3) [[150]]</h4>
<table class="t"><tr><td>A+</td><td>sehr gut</td><td>Außentemperatur +3 K angehoben</td></tr><tr><td>A</td><td>gut</td><td>+1,5 K</td></tr><tr><td>B</td><td>sommertauglich</td><td>genormte Außentemperatur eingehalten</td></tr><tr><td>C</td><td>bedingt</td><td></td></tr><tr><td>D</td><td>nicht</td><td></td></tr></table>
<p><b>Nicht-Wohngebäude</b> [[151]]: entweder Überwärmung vermeiden (mit tatsächlichen inneren Lasten) oder außeninduzierter Kühlbedarf <b>KB* &lt; 1 kWh/m³a</b> (Neubau) bzw. 2 kWh/m³a (größere Renovierung); max. Innentemperatur 26 °C.</p>`},
 { id: "top", t: "Operative Raumtemperatur", p: [139,140,141], w: "optemp", h: R`
<p>Die <b>operative Temperatur (Empfindungstemperatur)</b> ist das <b>arithmetische Mittel aus Raumlufttemperatur und mittlerer Oberflächentemperatur</b> der umschließenden Flächen [[139]] – nicht aus Raum- und Außentemperatur [[P5]]:</p>
$$\vartheta_{op}=\frac{\vartheta_L+\vartheta_U}{2}$$
$$ \vartheta_U=\frac{\sum\vartheta_{u,i}\cdot A_i}{\sum A_i}$$
<p>Richtwert: max. <b>2 K</b> Unterschied zwischen Luft und Oberflächen.</p>
<div class="ex"><b>Beispiel [[140]]:</b> Raum 4 × 4 × 3 m. Boden + Decke 17 °C (2·16 m²), Wände 19 °C (48 m²), Luft 22 °C.
$$\vartheta_U=\frac{48\cdot19+32\cdot17}{80}=18{,}2\,^\circ\mathrm C$$
$$\vartheta_{op}=\frac{22+18{,}2}{2}=20{,}1\,^\circ\mathrm C$$</div>
<div class="ex"><b>Übung [[141]]:</b> gleicher Raum, Fenster 2 × 2 m mit 14 °C, alle anderen Flächen 18 °C, Luft 22 °C.
<details><summary>Lösung</summary>\(\vartheta_U=\frac{76\cdot18+4\cdot14}{80}=17{,}8\,^\circ\)C → \(\vartheta_{op}=\frac{22+17{,}8}{2}=19{,}9\,^\circ\)C</details></div>`},
 { id: "sonnenschutz", t: "Fenster & Sonnenschutz (g_tot)", p: [143,144,145,146,147,148], h: R`
<p>Die Sonne strahlt bis zu <b>1.000 W/m²</b> auf Fassade und Fenster – das Fenster ist maßgeblich für die Überhitzung [[143]].</p>
<div class="grid2"><div class="box gain"><b>Außen</b> liegender Sonnenschutz: Strahlung wird <i>vor</i> dem Glas reflektiert/absorbiert. Energiedurchlass nur <b>5–15 %</b> [[144]].</div>
<div class="box loss"><b>Innen</b> liegender Sonnenschutz: Strahlung ist schon im Raum; die entstehende Wärme kann wegen der Low-E-Schicht nicht hinaus. Helle Behänge <b>30–40 %</b>. Nur sehr helle/spiegelnde Oberflächen wirken überhaupt.</div></div>
<p><b>g<sub>tot</sub></b> = Gesamtenergiedurchlassgrad des Systems <b>Verglasung + Beschattung</b> = τ + q<sub>i</sub>, am ganzen Fenster gemessen [[145]]. Fazit: In Wohngebäuden brauchen <b>alle Fenster außer Nord außenliegenden Sonnenschutz</b> [[146]].</p>
<p class="warn">Der Abminderungsfaktor z einer <b>innen</b>liegenden Verschattung ist <b>größer</b> (schlechter) als der einer außenliegenden [[P5]].</p>
<h4>Lüftung [[147]]</h4>
<p>Fensterlüftung: Öffnungsfläche (gekippt/offen) und ob <b>nachts quergelüftet</b> werden kann:</p>
$$\dot V = 0{,}7\cdot C_{ref}\cdot A\cdot\sqrt{H}\cdot\sqrt{\Delta T}\quad[\mathrm{m^3/h}],\ C_{ref}=100$$
<p>Lüftungsanlage: zeitabhängige Volumenströme und Einblastemperatur. Innere Gewinne: Tagesverlauf je Nutzungsprofil [[148]].</p>`},
 { id: "vereinfacht", t: "Vereinfachtes Verfahren: speicherwirksame Masse", p: [152,153,154,155,156,157,158,159,160,161,162,163,164,165], w: "mwi", h: R`
<p class="warn">Nach OIB-RL 6:2023 <b>nicht mehr zulässig</b> – aber gut zum Verstehen und typisch für Rechenbeispiele [[152]].</p>
<p>Nur sinnvoll wenn: <b>Wohngebäude</b>, Tagesmittel außen <b>≤ 23 °C</b>, Fenster <b>nachts offen</b>. Ziel: operative Temperatur in Haupträumen <b>unter 26 °C</b>.</p>
<p><b>Idee:</b> Viel Sonne (Immissionsfläche A<sub>I</sub>) muss durch genug <b>Speichermasse</b> und genug <b>Nachtlüftung</b> „geschluckt“ werden [[154]]. Nachweis [[153]]:</p>
$$\min m_{w,I}\ \le\ m_{w,I}=\frac{m_w}{A_I}$$
<ol class="steps">
<li><b>Immissionsfläche</b> (wie viel Sonne effektiv hereinkommt) [[156]]: $$A_I = A_{F}\cdot f_g\cdot g\cdot Z_{ON}\cdot z$$ A<sub>F</sub> Fensterfläche, f<sub>g</sub> Glasanteil 0,7–0,9, g Glas, z Abminderung durch Abschattung, <b>Z<sub>ON</sub></b> Neigungs-/Orientierungsfaktor: Einstrahlung bezogen auf eine <b>vertikale Südfläche</b> (= 1,00). Vertikal: N 0,54, O/W 1,13, SO/SW 1,14; <b>horizontal 2,06</b> → Dachflächenfenster sind kritisch [[157]].</li>
<li><b>Stündlicher Luftvolumenstrom</b> (nächtliche Dauerlüftung) [[159]]: \(\dot V_L=n_L\cdot V\) (V mit Innenmaßen), bezogen: \(\dot V_{L,s}=\dot V_L/A_I\)</li>
<li><b>Untergrenze</b> aus Tabelle (linear interpolieren) [[160]]: V<sub>L,s</sub> ≥ 100 → 2.000 kg/m² · 75 → 4.000 · 50 → 8.000 (unter 50: hohes Risiko, vermeiden)</li>
<li><b>Vorhandene speicherwirksame Masse</b> [[162]]: \(m_w=\sum m_{w,B,A}\cdot A+\underbrace{38\,\mathrm{kg/m^2}\cdot WNF}_{Einrichtung}\). m<sub>w,B,A</sub> aus Tabelle je Bauteil [[163]]: 20 cm Beton ≈ 200, Holzleichtbau mit Gipskarton ≈ 30, 5 cm Estrich ≈ 60 kg/m².</li></ol>
<p>Speicherwirksame Masse <b>steigt mit der Wanddicke</b> nur bis zu einer Grenze (danach flach) – sie sinkt nicht [[163]] [[P5]]. Beton speichert mehr als Ziegel.</p>
<div class="ex"><b>Beispiel [[158]]–[[165]]:</b> Raum 4×4×3 m, Fenster 2×2 m Süd, f<sub>g</sub> 0,7, g 0,58, Z<sub>ON</sub> 1,00, z 0,78.
$$A_I=4\cdot0{,}7\cdot0{,}58\cdot1\cdot0{,}78=1{,}27\ \mathrm{m^2}$$
$$\dot V_L=1{,}5\cdot48=72\ \mathrm{m^3/h}\quad\dot V_{L,s}=\frac{72}{1{,}27}=57\ \mathrm{m^3/hm^2}$$
$$\min m_{w,I}=8000-(57-50)\cdot\frac{8000-4000}{75-50}=6.880\ \mathrm{kg/m^2}$$
Wand 44 m² · 200 = 8.800, Dach 16 · 30 = 480, Boden 16 · 60 = 960, Einrichtung 16 · 38 = 608 → m<sub>w</sub> = 10.848 kg
$$m_{w,I}=\frac{10.848}{1{,}27}=8.541\ \mathrm{kg/m^2}\ \ge\ 6.880\ \Rightarrow\ \text{erfüllt}$$</div>`},
 ]
},
{
 id: "feuchte", title: "Feuchteschutz & Dauerhaftigkeit", short: "Feuchte", icon: "💧", exam: "7 Fragen + 1 Rechnung",
 intro: "Luftfeuchte, Taupunkt, Dampfdiffusion, Glaser-Verfahren, Schimmel & Temperaturfaktor – plus Wärmedehnung und Luft-/Winddichtheit.",
 sections: [
 { id: "dauer", t: "Dauerhaftigkeit: Dehnung, Luft- & Winddichtheit", p: [167,168,169,170,171,172,173,174,175,176,177,178], w: "dehn", h: R`
<p>Stoffe <b>dehnen sich bei Erwärmung aus</b> und ziehen sich beim Abkühlen zusammen. Wird die Dehnung behindert, entstehen Spannungen – bis zur <b>Zerstörung</b> des Baustoffs. Daher Dehnfugen und nur Stoffe mit <b>gleichem Ausdehnungskoeffizienten</b> kraftschlüssig verbinden (Stahl &amp; Beton) [[167]].</p>
$$\Delta l = l\cdot\alpha_t\cdot\Delta T$$
<p>α<sub>t</sub> in 10⁻⁶ m/(mK): Beton 10, Ziegel 5, Stahl 10–14, Zinkblech 28, Polystyrol 60–80, Fichte längs 5,4 / quer 34,1 [[168]]. <b>Größeres α → stärkere Dehnung</b> bei gleicher ΔT. (α beschreibt <i>nicht</i> die Dehnung durch Feuchte [[P6]].)</p>
<div class="ex"><b>Beispiel [[169]]:</b> Betonvorsatzschale 10 m, Sommer 80 °C, Winter −25 °C: \(\Delta l=10\cdot10\cdot10^{-6}\cdot105\approx0{,}01\) m ≈ 1 cm → Dehnfugen alle 2 m.</div>
<p><b>Hygrische Längenänderung</b>: Feuchteaufnahme in den Poren → Quellen/Schwinden: \(\Delta l=\varepsilon\cdot l\). Holz quillt tangential, radial und längs unterschiedlich stark [[170]] [[171]].</p>
<h4>Luft- und Winddichtheit [[172]]–[[178]]</h4>
<p>Beeinflusst Raumklima, Lärm, <b>Bauschadensfreiheit</b>, Luftqualität und Energiebilanz.</p>
<ul><li><b>Luftdicht</b> (innen, geschlossene Hülle, altersbeständig): verputztes Mauerwerk, Beton, Gipsplatten mit gespachtelten Fugen, Span- und OSB-Platten, PE-Folien. Nicht perforieren, Leitungen davor führen (Installationsebene), Anschlüsse/Überlappungen dicht.</li>
<li><b>Winddicht</b> (außen: Dach-/Wandbahn, Außenputz): schützt die Dämmung vor Durchströmung.</li>
<li>Folgen von Undichtheit: <b>Tauwasser in der Konstruktion</b>, weniger Wärmeschutz, kalte Oberflächen → Schäden, <b>Schimmel</b>, Zugluft, trockene Luft, höherer Energiebedarf.</li>
<li>Blower-Door-Prüfung <b>bevor</b> die luftdichte Schicht innen verkleidet ist; Leckagen bei Überdruck mit Nebel finden [[178]].</li></ul>
<h4>Dampfbremse / Dampfsperre nach s<sub>d</sub> [[173]]</h4>
<table class="t"><tr><td>s<sub>d</sub> ≤ 0,5 m</td><td>diffusionsoffen</td></tr><tr><td>0,5 – 10 m</td><td>diffusionsbremsend</td></tr><tr><td>10 – 100 m</td><td>diffusionshemmend</td></tr><tr><td>100 – 1500 m</td><td>diffusionssperrend</td></tr><tr><td>≥ 1500 m</td><td>diffusionsdicht</td></tr></table>`},
 { id: "quellen", t: "Feuchtequellen & Schäden", p: [180,181,182,183], h: R`
<p>Feuchte ist laut Fraunhofer-Statistik die <b>Schadensursache Nr. 1</b> [[180]].</p>
<table class="t"><tr><th>Belastung</th><th>Maßnahmen</th></tr>
<tr><td>Boden: Grund-, Kapillar-, Sicker-, Stauwasser</td><td>Abdichtung nach ÖNORM B 3692 (schwarze/weiße/braune Wanne), Dränage</td></tr>
<tr><td>Niederschlag, Schlagregen, Spritzwasser</td><td>Gefälle, Dachüberstand, Notüberläufe, zweite wasserführende Schicht, Außenputz, zweischalige/hinterlüftete Fassaden</td></tr>
<tr><td>Oberflächenwasser, Lawinen</td><td>bauliche Schutzmaßnahmen in roter/gelber Zone</td></tr>
<tr><td><b>Innenluft</b>: Kondensat im Bauteil und an der Oberfläche</td><td>Dampfbremsen, Lüftungsvorgaben</td></tr>
<tr><td>Baufeuchte</td><td>Wartezeiten bis zur Belegreife</td></tr></table>
<p><b>Schäden</b> [[183]]: biologisch (Schimmel innen, holzzerstörende Pilze/Insekten, Algen außen), Frost, Salzkristallisation, Quellen/Schwinden, Korrosion (Metall, Beton).</p>`},
 { id: "luft", t: "Luftfeuchte: p, p_s, φ, v, Taupunkt", p: [184,185,186,187,188], w: "hum", h: R`
<p>Luft ist ein Gasgemisch; der Gesamtdruck ist die Summe der <b>Partialdrücke</b> [[184]]. Der Anteil des Wasserdampfs heißt <b>Wasserdampfpartialdruck p</b> (Pa).</p>
<table class="t">
<tr><td><b>absolute Feuchte v</b></td><td>Wasserdampfmasse pro Volumen, kg/m³ (oft g/m³): \(v=\frac{m}{V}\)</td></tr>
<tr><td><b>Partialdruck p</b></td><td>\(p=v\cdot R_{H_2O}\cdot T\), R = 462 J/kgK, T in <b>K</b> [[185]]</td></tr>
<tr><td><b>Sättigungsdruck p<sub>s</sub></b></td><td>temperaturabhängige <b>Obergrenze</b> – mehr Dampf geht nicht, sonst Kondensation (Wasser) bzw. Deposition (Eis) [[186]]</td></tr>
<tr><td><b>relative Feuchte φ</b></td><td>\(\varphi=\frac{p}{p_s}\cdot100\,\%\) [[187]]</td></tr>
<tr><td><b>Taupunkt ϑ<sub>Tau</sub></b></td><td>Temperatur, auf die man die Luft abkühlen muss, damit Kondensat entsteht (dort ist φ = 100 %) [[188]]</td></tr></table>
$$p_s=610{,}5\cdot e^{\frac{17{,}269\,\vartheta}{237{,}3+\vartheta}}\ (\vartheta\ge0)$$
$$p_s=610{,}5\cdot e^{\frac{21{,}875\,\vartheta}{265{,}5+\vartheta}}\ (\vartheta<0)$$
$$\vartheta_{Tau}=\left(\frac{\varphi}{100}\right)^{\frac{1}{8{,}02}}\cdot(109{,}8+\vartheta)-109{,}8$$
<p class="tip"><b>Merke:</b> Warme Luft kann mehr Dampf halten. Kühlt Luft ab, bleibt p (fast) gleich, aber p<sub>s</sub> sinkt → <b>φ steigt</b>.</p>
<div class="ex"><b>Prüfungsrechnung [[P3]]:</b> 23 °C, 40 % → Abkühlung auf 20 °C. Wie hoch ist φ?
$$p=0{,}40\cdot p_s(23)=0{,}40\cdot2808=1123\ \mathrm{Pa}$$
$$\varphi_{20}=\frac{1123}{p_s(20)}=\frac{1123}{2337}=48\,\%$$</div>`},
 { id: "haushalt", t: "Feuchtehaushalt im Raum & Feuchteklassen", p: [190,191,192,258], h: R`
<p>Die Raumluftfeuchte hängt ab von <b>Außenluftfeuchte</b>, <b>Feuchteproduktion P</b> und <b>Luftwechsel</b> [[190]]:</p>
$$v_i=v_e+\frac{P}{n\cdot V}=v_e+\Delta v$$
<p>Δv = <b>Luftfeuchteüberschuss</b>. Nach ÖNORM B 8110-2:2020 hängt er von der Außentemperatur und der <b>Luftfeuchteklasse FK</b> ab [[191]] (Werte bei ϑ<sub>e</sub> ≤ 0 °C, darüber fallend):</p>
<table class="t"><tr><th>FK</th><th>Gebäude</th><th>Δv</th></tr>
<tr><td>1</td><td>unbelegt, trockene Lager</td><td>2 g/m³</td></tr>
<tr><td>2</td><td>Büros, Wohnungen normal belegt &amp; gelüftet</td><td>4 g/m³</td></tr>
<tr class="hl"><td>3</td><td><b>Wohnhäuser mit unbekannter Belegung</b> – Bemessung im Wohnbau!</td><td>6 g/m³</td></tr>
<tr><td>4</td><td>Sporthallen, Küchen, Kantinen</td><td>8 g/m³</td></tr>
<tr><td>5</td><td>Wäscherei, Brauerei, Schwimmbad</td><td>10 g/m³</td></tr></table>
<p>Feuchteproduktion [[258]]: Person leicht 30–60 g/h, Kochen 60–1500, Duschen 1500–3000, Wäschetrocknen 50–200, Topfpflanze 7–15 g/h.</p>
<div class="ex"><b>Beispiel [[192]] [[262]]:</b> außen −16 °C, 87 %; innen 22 °C, FK 3.<br>
p<sub>s</sub>(−16) = 150 Pa → p<sub>e</sub> = 0,87·150 = 131 Pa → \(v_e=\frac{131}{462\cdot257{,}15}=0{,}0011\) kg/m³ = <b>1,1 g/m³</b><br>
v<sub>i</sub> = 1,1 + 6 = <b>7,1 g/m³</b> → p<sub>i</sub> = 0,0071·462·295,15 = 968 Pa → φ<sub>i</sub> = 968 / 2642 = <b>37 %</b><br>
Taupunkt innen: p<sub>s</sub>(ϑ) = 968 Pa bei <b>ϑ<sub>Tau</sub> ≈ 6,5 °C</b>.</div>`},
 { id: "transport", t: "Feuchtetransport: Diffusion, Konvektion, Kapillar", p: [193,194,195,196,197,198,199,200,201,202,203,204,205,206], w: "sd", h: R`
<p>Drei Wege [[193]]: <b>Wasserdampfdiffusion</b>, <b>Wasserdampfkonvektion</b>, <b>Flüssigwassertransport</b>.</p>
<h4>Diffusion [[194]]–[[198]]</h4>
<p>Dampfmoleküle wandern wegen eines <b>Partialdruckgefälles</b> (von hoher zu niedriger Konzentration/Temperatur) durch das Bauteil – also von warm-feucht (innen) nach kalt-trocken (außen). Das Festkörperskelett behindert das.</p>
<p><b>µ (Wasserdampfdiffusionswiderstandszahl)</b>, dimensionslos: wie viel größer der Widerstand ist als der von ruhender Luft (µ = 1). <b>Großes µ = dampfdicht</b> [[195]].</p>
<table class="t"><tr><td>Luft, Mineralwolle</td><td>1</td><td>EPS</td><td>60</td></tr><tr><td>Ziegel, Gipskarton, Innenputz</td><td>10</td><td>Beton</td><td>100</td></tr><tr><td>Konstruktionsholz</td><td>50</td><td>Epoxidharz</td><td>10.000</td></tr><tr><td>OSB</td><td>50–300</td><td>Glas, Metall</td><td>∞</td></tr></table>
<p><b>s<sub>d</sub> (äquivalente Luftschichtdicke)</b> = Dicke einer ruhenden Luftschicht mit gleichem Widerstand [[196]] [[197]]:</p>
$$s_d=\mu\cdot d$$
$$ s_{d,ges}=\sum\mu_j d_j$$
$$ g'=\frac{p_1-p_2}{1{,}5\cdot10^6\cdot s_d}\ \mathrm{[kg/m^2h]}$$
<p>g′ = Massenstromdichte: wie viel Dampf pro Stunde durch 1 m² strömt [[198]].</p>
<h4>Konvektion [[199]] [[200]] [[201]]</h4>
<p>Dampf wird mit <b>strömender Luft</b> durch Fugen/Leckagen transportiert, getrieben vom Luftdruckunterschied; abhängig von der Luftdichtheit: \(\dot m_{Luft}=C\cdot\Delta P^b\). Schon ein Spalt von ca. 1 mm transportiert ein Vielfaches der Diffusion → <b>sorgfältige luftdichte Ebene</b> ist entscheidend.</p>
<h4>Flüssigwasser / Kapillarität [[202]]–[[205]]</h4>
<p>In porösen Stoffen durch Druckunterschiede und <b>Kapillarkräfte</b>.</p>
<div class="grid2"><div><b>Kapillaraszension</b> (Aufstieg): benetzbare/<b>hydrophile</b> Stoffe, <b>konkave</b> Oberfläche, Adhäsion &gt; Kohäsion (Glas). Ursache aufsteigender Bodenfeuchte im Mauerwerk ohne Horizontalsperre.</div>
<div><b>Kapillardepression</b>: wasserabweisende/<b>hydrophobe</b> Stoffe, <b>konvexe</b> Oberfläche, Kohäsion &gt; Adhäsion (Kunststoff).</div></div>
<h4>Konstruktionsregeln [[206]]</h4>
<p>Behaglich: 21–23 °C, 40–60 % → Taupunkt <b>7–12 °C</b>. Gegen Durchfeuchtung:</p>
<ol><li><b>Luft- und winddichte</b> Ausführung</li><li><b>Dampfbremsende Ebene innen</b></li><li>Konstruktion muss <b>nach einer Seite austrocknen</b> können (Hinterlüftung)</li><li>Organische Baustoffe (Holz, Kleber) vor <b>Baufeuchte</b> und Regen schützen, Austrocknungszeiten einhalten</li></ol>`},
 { id: "nachweis", t: "Nachweis gegen Kondensat im Bauteil", p: [207,208,209,228,229,230], h: R`
<p>Ablauf nach <b>ÖNORM B 8110-2:2020</b> [[207]] [[208]]:</p>
<ol><li><b>Nachweisfreie, bewährte Konstruktion</b> (Katalog in der Norm, siehe Tab „Aufbauten“) → kein Nachweis.</li>
<li><b>Holzriegelwand / Holzbalkendecke</b> → vereinfachter <b>stationärer</b> Nachweis nach EN ISO 13788 <i>oder</i> instationär.</li>
<li><b>Sonstige</b> → <b>instationäre hygrothermische Simulation</b> nach EN 15026 (z. B. WUFI).</li></ol>
<p>Das <b>Glaser-Verfahren</b> reicht als Nachweis nicht mehr, erklärt aber die Physik gut.</p>
<p><b>Instationäre Simulation</b> [[228]] [[229]]: rechnet zeitabhängig Temperaturen und Feuchtegehalte über mehrere Jahre mit zyklischem Klima. „Eingeschwungen“ = Wassergehalt steigt pro Jahr um &lt; 1 %. Wächst er weiter, über die Lebensdauer (≥ 30 Jahre) rechnen; Gleichgewicht sollte nach ca. 10 Jahren erreicht sein.</p>`},
 { id: "glaser", t: "Glaser-Verfahren", p: [231,232,233,234,235,237,239,240,241,242,243,244,246,247,248,249,250,251,252,253,254], w: "glaser", h: R`
<p>Stationäres Verfahren nur für <b>winterliches Tauwasser durch Diffusion</b>. Annahmen [[232]]: Bauteil luftdicht (keine Konvektion), Stoffe nicht hygroskopisch, kein Kapillartransport, trocken (keine Baufeuchte), kein Regen/aufsteigende Feuchte.</p>
<p><b>Schädlich</b> ist Tauwasser, wenn [[233]]: es nicht gespeichert werden kann (an Grenzen kapillar nicht saugfähiger Schichten <b>max. 0,5 kg/m² pro Jahr</b>), es R um ≥ 10 % verringert, Stoffe geschädigt werden (Korrosion, Pilze, Frost) oder es in der Verdunstungsperiode <b>nicht austrocknet</b>.</p>
<h4>Randbedingungen (ÖNORM B 8110-2:2003)</h4>
<ul><li>Innen <b>20 °C</b>, φ<sub>i</sub> = 65 % bei ϑ<sub>e</sub> 0…10 °C; je K darunter −1 %, je K über 10 °C +1 % [[234]]</li>
<li>Außen: Klagenfurter Klima (Beckenlandschaft Süd), φ<sub>e</sub> 80 % (Sep–Apr), 75 % (Mai–Aug); <b>Jänner −3,79 °C / φ<sub>i</sub> 61,21 %</b> = größte Druckdifferenz → damit wird zuerst geprüft [[237]] [[241]]</li>
<li><b>R<sub>si</sub> = 0,25</b> (andere raumseitige Oberflächen), 0,13 (Glas/Rahmen), <b>R<sub>se</sub> = 0,04</b> – also <b>andere</b> Übergangswiderstände als beim Wärmeschutz [[239]] [[P4]]</li></ul>
<h4>Rechenschritte</h4>
<ol class="steps">
<li><b>Temperaturen an den Schichtgrenzen</b> [[241]]: Schichten mit R &gt; 0,25 in Teilschichten ≤ 0,25 teilen [[242]].
$$\Delta T_j=(\vartheta_i-\vartheta_e)\cdot\frac{R_j}{R_T}$$
$$\vartheta_{j,j+1}=\vartheta_{j-1,j}-\Delta T_j$$</li>
<li>Zu jeder Temperatur den <b>Sättigungsdruck p<sub>s</sub></b> [[244]].</li>
<li><b>Vorhandenen Partialdruck p</b> verteilen – linear über s<sub>d</sub> [[246]]:
$$p_i=\varphi_i p_{s,i}\quad p_e=\varphi_e p_{s,e}\quad\Delta p_j=(p_i-p_e)\cdot\frac{s_{d,j}}{\sum s_d}$$</li>
<li>Liegt irgendwo <b>p &gt; p<sub>s</sub></b> → <b>Kondensat</b>; dann monatliche Berechnung nach EN ISO 13788 [[249]]:
$$m_{w,T}=t_T\cdot(g'_i-g'_e)$$
$$ g'_i=\frac{p_i-p_{s,c}}{1{,}5\cdot10^6\,s_{d,i}}\quad g'_e=\frac{p_{s,c}-p_e}{1{,}5\cdot10^6\,s_{d,e}}$$
Verdunstung: \(m_{w,V}=t_V\cdot(g'_i+g'_e)\) [[251]]. Ab dem ersten Kondensatmonat ein Jahr akkumulieren: \(M_{a,max}=\sum m_w\le0{,}5\) kg/m² [[253]].</li></ol>
<p class="tip">Im Diagramm über s<sub>d</sub> ist der Partialdruck eine <b>Gerade</b>. Berührt/schneidet sie die p<sub>s</sub>-Kurve → Tauebene. Darum gehört die <b>dichte Schicht nach innen</b> (warme Seite) und außen sollte es <b>diffusionsoffen</b> sein.</p>`},
 { id: "schimmel", t: "Schimmel & Oberflächenkondensat: f_Rsi", p: [255,256,257,259,260,261,262,263,264,265,266,267,268,269,270,271,272], w: "frsi", h: R`
<p>Schimmelsporen sind gesundheitsschädlich (Atemwege, Bronchitis, Allergien, Erschöpfung …) [[255]].</p>
<p><b>Schimmel wächst</b> bei [[256]]: Oberflächentemperatur ca. 0–50 °C, pH 3–9, <b>ab 80 % relativer Feuchte an der Oberfläche</b>, länger als ca. <b>4 h/Tag</b>, und Nährboden (Substrat). → Schimmel braucht <i>kein</i> Tauwasser, 80 % reichen!</p>
<p><b>Oberflächenkondensat</b> entsteht, sobald die Oberflächentemperatur unter den Taupunkt der Raumluft fällt: \(\vartheta_{si}&lt;\vartheta_{Tau}\) [[257]]. Hauptursache ist im Raum verdunstendes Wasser (Nutzerverhalten).</p>
<h4>Temperaturfaktor [[259]] [[264]]</h4>
$$f_{Rsi}=\frac{\vartheta_{si}-\vartheta_e}{\vartheta_i-\vartheta_e}\ \ \ge\ \ f_{Rsi,min}$$
<p>f<sub>Rsi</sub> sagt, wo die Oberflächentemperatur zwischen außen (0) und innen (1) liegt – unabhängig vom konkreten Wetter. Nachweis erfüllt, wenn f<sub>Rsi</sub> ≥ Bemessungswert:</p>
<table class="t"><tr><th></th><th>ϑ<sub>e</sub></th><th>ϑ<sub>i</sub></th><th>f<sub>Rsi,min</sub></th><th>Grenze an Oberfläche</th></tr>
<tr><td><b>Schimmel</b></td><td>−1,38 °C</td><td>22 °C</td><td><b>0,70</b></td><td>φ = 80 %</td></tr>
<tr><td><b>Kondensat</b></td><td>−16 °C</td><td>22 °C</td><td><b>0,59</b></td><td>φ = 100 %</td></tr></table>
<p>R<sub>si</sub> = <b>0,25</b> (hinter freistehenden Schränken 0,5, Einbauschränken 1,0), R<sub>se</sub> = 0,04 [[260]]. Kritisch sind <b>Wärmebrücken</b> (Ecken) [[265]]. Nachweisfreie Konstruktionen brauchen keinen Nachweis [[264]].</p>
<p>Herleitung 0,59 [[262]]: v<sub>i</sub> = 7,1 g/m³ → ϑ<sub>Tau</sub> = 6,57 °C → (6,57+16)/(22+16) = 0,59. Herleitung 0,70: ϑ<sub>si,min</sub> = 14,75 °C (80 %-Grenze im Dezember) → (14,75+1,38)/(22+1,38) = 0,69 ≈ 0,70 [[259]].</p>
<div class="ex"><b>Prüfungsrechnung [[P4]]:</b> Außenecke ϑ<sub>si</sub> = 12,5 °C, ϑ<sub>i</sub> = 22 °C, ϑ<sub>e</sub> = −1,5 °C:
$$f_{Rsi}=\frac{12{,}5+1{,}5}{22+1{,}5}=0{,}60\ &lt;\ 0{,}70\ \Rightarrow\ \text{Schimmelfreiheit nicht erfüllt}$$</div>
<div class="ex"><b>Übung [[271]]:</b> Welche Oberflächentemperatur braucht die Wärmebrücke für f<sub>Rsi,min</sub> = 0,70 (ϑ<sub>e</sub> = −1,38, ϑ<sub>i</sub> = 22)?
<details><summary>Lösung</summary>\(\vartheta_{si}=\vartheta_e+0{,}70\cdot(\vartheta_i-\vartheta_e)=-1{,}38+0{,}70\cdot23{,}38=15{,}0\,^\circ\)C. Vorhanden 12,4 °C → f = 0,59 → nicht erfüllt [[270]].</details></div>
<p><b>Isoplethen</b> [[272]]: Grenzkurven für Sporenauskeimung je Substrat – LIM 0 (idealer Nährboden), LIM BAU I (biologisch verwertbar: Holzwerkstoffe, Tapete, Gipskarton, verschmutzt), LIM BAU II (mineralisch, Kunststoff).</p>`},
 ]
}
];

// Multiple Choice im Prüfungsstil: mehrere Antworten können richtig sein.
// o: [Text, richtig?], e: Erklärung, p: Folien, x: true = aus der Altprüfung (1. Termin) sinngemäß übernommen
window.MC = [
// ---------- WINTER ----------
{ c:"winter", x:1, q:"Heizwärmebedarf: Welche Aussagen sind korrekt?", o:[
 ["Der HWB ist die Energiemenge, die einem Gebäude im Jahr zugeführt werden muss, um eine Raumtemperatur von 22 °C einzuhalten.",1],
 ["Der HWB ist die Gesamtenergie, die für die Wärmeerzeugung im Gebäude notwendig ist.",0],
 ["Die Energiebilanz des HWB berücksichtigt u. a. Lüftungs- und Transmissionswärmeverluste sowie innere und solare Gewinne.",1],
 ["Die Einheit des HWB ist W/m²K.",0]], e:"Die Gesamtenergie inkl. Anlagenverlusten wäre der HEB. W/m²K ist die Einheit des U-Werts; HWB in kWh/a bzw. kWh/m²a.", p:[39,44]},
{ c:"winter", x:1, q:"Ausnutzungsgrad η: Welche Aussagen sind korrekt?", o:[
 ["Er berücksichtigt das Verhältnis der Gewinne zu den Transmissions- und Lüftungswärmeverlusten.",1],
 ["Er nimmt mit zunehmender Speicherkapazität des Gebäudes zu.",1],
 ["Er ist in der jährlichen Heizperiode konstant.",0],
 ["Er gibt den Anteil der nutzbaren solaren und inneren Gewinne an.",1]], e:"η hängt von γ (Gewinne/Verluste) und τ (Speicherfähigkeit) ab und wird monatlich ermittelt – daher nicht konstant.", p:[104,106,107,108]},
{ c:"winter", x:1, q:"Energieausweis: Welche Aussagen sind korrekt?", o:[
 ["Anlagenverluste beinhalten Verluste der Wärmebereitstellung, -speicherung, -verteilung und -abgabe.",1],
 ["Der Endenergiebedarf ist die Summe aus Heizenergiebedarf und Haushaltsstrombedarf.",1],
 ["Der HEB berücksichtigt neben dem HWB auch den Warmwasserwärmebedarf und die Verluste des gebäudetechnischen Systems.",1],
 ["Hilfsenergie (Strom) des Heizsystems zählt zum Haushaltsstrom und gehört nicht zum HEB.",0]], e:"Hilfsenergie ist Teil des HEB (Q_HEB,Strom).", p:[121,123,124]},
{ c:"winter", x:1, q:"Wärmeschutz Grundlagen: Welche Aussagen sind korrekt?", o:[
 ["Je höher die Rohdichte, desto höher generell die Wärmeleitfähigkeit.",1],
 ["Je größer λ einer Schicht (gleiche Dicke), desto größer ihr Wärmedurchlasswiderstand.",0],
 ["Je dicker eine Schicht (gleiches λ), desto größer ihr Wärmedurchlasswiderstand.",1],
 ["Je geringer die Rohdichte, desto höher generell die Wärmeleitfähigkeit.",0]], e:"R = d/λ: wächst mit d, sinkt mit λ. Leichte Stoffe dämmen besser.", p:[13,19]},
{ c:"winter", x:1, q:"Wärmebrücken: Welche Aussagen sind korrekt?", o:[
 ["Wärmebrücken sind begrenzte Bereiche der Hülle mit erhöhter Wärmestromdichte.",1],
 ["Sie führen im Winter außen zu niedrigeren und innen zu höheren Oberflächentemperaturen.",0],
 ["Man unterscheidet geometrische und konstruktive Wärmebrücken; konstruktive entstehen durch Materialien unterschiedlicher Wärmeleitfähigkeit.",1],
 ["Durch die höheren Oberflächentemperaturen innen kann es im Winter zu Kondensat und Schimmel kommen.",0]], e:"Genau umgekehrt: innen kälter, außen wärmer. Kondensat/Schimmel entsteht wegen der niedrigeren Innenoberflächentemperatur.", p:[53,54,55]},
{ c:"winter", x:1, q:"Welche Parameter beeinflussen die Energieeffizienz von Gebäuden?", o:[
 ["Ausrichtung und Größe der Fenster",1],["Die Art des Gebäudes (Wohn-, Büro-, öffentliches Gebäude)",0],
 ["Die Kompaktheit (Verhältnis Oberfläche zu Volumen)",1],["Qualität der Wärmedämmung der Hülle",1]], e:"Laut Altprüfung: Fenster, Kompaktheit, Dämmqualität.", p:[89,116]},
{ c:"winter", x:1, q:"Wärmetransport: Welche Aussagen sind korrekt?", o:[
 ["Wärmeleitung ist die Übertragung von Schwingungsenergie von Teilchen zu Teilchen in festen Stoffen.",1],
 ["Wärme kann durch Konvektion, Wärmespeicherung und Wärmestrahlung übertragen werden.",0],
 ["Strahlungsenergie wird in Gasen durch Schwingung der Gasteilchen in elektromagnetischen Wellen übertragen.",0],
 ["Bei Konvektion wird Wärme durch die Bewegung von Flüssigkeiten oder Gasen übertragen.",1]], e:"Speicherung ist kein Transportmechanismus; Strahlung braucht kein Medium.", p:[9,10]},
{ c:"winter", x:1, q:"Baustoffe nach Wärmeleitfähigkeit aufsteigend – welche Reihenfolge stimmt?", o:[
 ["EPS, Holz, Beton, Ziegel",0],["Beton, Ziegel, Holz, EPS",0],["Holz, EPS, Beton, Ziegel",0],["EPS, Holz, Ziegel, Beton",1]], e:"EPS 0,038 < Holz 0,12 < Hochlochziegel 0,26 < Beton 2,5 W/mK.", p:[15]},
{ c:"winter", x:1, q:"Decke 110 m² zu einem geschlossenen Dachraum: U von 1,5 auf 0,3 W/m²K. Ersparnis an Transmissionswärmeverlust im Jänner (ϑe = −1,5 °C)?", o:[
 ["2.077 kWh",1],["118,8 W/K",0],["2.308 kWh",0],["2.077.000 kWh",0]], e:"110·1,2·0,9·23,5·744/1000 = 2.077 kWh. f = 0,9 für Decke zu geschlossenem Dachraum. 2.308 = ohne f; W/K ist ein Leitwert, kein Verlust.", p:[63,70]},
{ c:"winter", x:1, q:"Gesamtenergiedurchlassgrad g: Welche Aussagen sind korrekt?", o:[
 ["g ist die Summe aus Strahlungstransmissionsgrad und sekundärer Wärmeabgabe qi.",1],
 ["g beschreibt, wieviel außen auftreffende Solarstrahlung von der Verglasung an den Innenraum abgegeben wird.",1],
 ["Auftreffende Solarstrahlung wird anteilig reflektiert, absorbiert und durchgelassen.",1],
 ["g beschreibt die Solarstrahlung, die auf die Scheibe trifft und absorbiert wird.",0]], e:"g = τ + qi.", p:[28,29,30]},
{ c:"winter", x:1, q:"Luftwechsel: Welche Aussagen sind korrekt?", o:[
 ["Je höher die Luftwechselrate n, desto geringer die Lüftungswärmeverluste.",0],
 ["Der hygienische Luftaustausch wird durch die Luftwechselrate n festgelegt.",1],
 ["n50 beschreibt den Volumenstrom, der in 50 Minuten ins Gebäude gedrückt werden muss.",0],
 ["Je geringer n50 beim Blower-Door-Test, desto luftdichter die Hülle.",1]], e:"n50 = bei 50 Pa Druckdifferenz. Mehr Luftwechsel = mehr Verlust.", p:[76,81]},
{ c:"winter", x:1, q:"7.500 kWh Holzpellets und 3.500 kWh Strom pro Jahr. Wie hoch sind die CO₂-Emissionen? (f: Pellets 9, Strom 156 g/kWh)", o:[
 ["613,5 kg CO₂eq/a",1],["6,135 t CO₂eq/a",0],["1.071 kg CO₂eq/a",0],["3.246 kg CO₂eq/a",0]], e:"7500·0,009 + 3500·0,156 = 67,5 + 546 = 613,5 kg.", p:[129,130]},
{ c:"winter", x:1, q:"Hinterlüftetes Dach: Blech 3 cm | Hinterlüftung 5 cm | Winddichte Ebene | Dämmung 10 cm (λ 0,04) | Beton 20 cm (λ 2,4) | Spachtelung. Welche Aussagen sind korrekt?", o:[
 ["U = 0,36 W/m²K",1],["Die OIB-Anforderung an Dachschrägen U < 0,20 W/m²K wird eingehalten.",0],["U = 0,37 W/m²K",0],["U = 0,32 W/m²K",0]], e:"Rsi 0,10 + 2,5 + 0,083 + Rse(belüftet) 0,10 = 2,783 → U = 0,36. Schichten außerhalb der Hinterlüftung zählen nicht.", p:[21,24]},
{ c:"winter", q:"Welche Aussagen zum U-Wert sind korrekt?", o:[
 ["Er gibt den Wärmestrom durch 1 m² bei 1 K Temperaturdifferenz an.",1],["Er ist der Kehrwert des Wärmedurchgangswiderstands R_T.",1],["Seine Einheit ist m²K/W.",0],["Ein größerer U-Wert bedeutet besseren Wärmeschutz.",0]], e:"U = 1/R_T in W/m²K. Kleiner U = gute Dämmung.", p:[12,18]},
{ c:"winter", q:"Wärmeübergangswiderstände nach EN ISO 6946: Welche Aussagen sind korrekt?", o:[
 ["Rsi bei horizontalem Wärmestrom (Wand) beträgt 0,13 m²K/W.",1],["Rsi bei Wärmestrom nach oben (Dach) beträgt 0,17 m²K/W.",0],["Rse beträgt immer 0,04 m²K/W (unbelüftet).",1],["Rsi und Rse fassen Konvektion und Strahlung zusammen.",1]], e:"aufwärts 0,10, horizontal 0,13, abwärts 0,17; außen 0,04.", p:[21]},
{ c:"winter", q:"Fenster: Welche Aussagen sind korrekt?", o:[
 ["Der Abstandhalter ist wegen seiner hohen Wärmeleitfähigkeit eine Wärmebrücke (ψ-Wert).",1],["Low-E-Gläser haben einen hohen Emissionsgrad.",0],["Uw berücksichtigt Rahmen, Glas und Randverbund flächengewichtet.",1],["Heutige Gläser erreichen Ug-Werte von etwa 0,6–0,8 W/m²K.",1]], e:"Low-E = niedriger Emissionsgrad ε.", p:[31,32,34]},
{ c:"winter", q:"Transmissionsleitwert L_T: Welche Aussagen sind korrekt?", o:[
 ["L_T = Le + Lu + Lg + Lψ + Lχ",1],["Lψ erfasst punktförmige Wärmebrücken.",0],["Flächen werden mit Außenabmessungen ermittelt.",1],["Bauteile zu unkonditionierten Räumen werden mit einem Temperaturkorrekturfaktor abgemindert.",1]], e:"Lψ = linienförmig (2D), Lχ = punktförmig (3D).", p:[47,50,62,63]},
{ c:"winter", q:"Solare Gewinne: Welche Aussagen sind korrekt?", o:[
 ["Die Glasfläche wird pauschal mit 70 % der Architekturlichte angesetzt.",1],["Der effektive g-Wert ist gw = 0,9·0,98·g.",1],["Der Verschattungsfaktor Fs für ein Einfamilienhaus beträgt vereinfacht 0,65.",1],["Im Kühlfall wird Fs vereinfacht mit 0,40 angenommen.",0]], e:"Kühlfall: Fs,c = 1,00.", p:[91,92]},
{ c:"winter", q:"Indizes im Energieausweis: Welche Aussagen sind korrekt?", o:[
 ["„RK“ bedeutet Referenzklima, also ein fiktiver Standort.",1],["„Ref“ bedeutet, dass Wärmerückgewinnung nicht berücksichtigt wird.",1],["Die OIB-Anforderung wird an den HWB_Ref,SK gestellt.",0],["Auf dem Deckblatt steht der HWB_Ref,SK.",1]], e:"Anforderung: HWB_Ref,RK. Deckblatt/Skala: HWB_Ref,SK.", p:[111,113]},
{ c:"winter", q:"Kompaktheit: Welche Aussagen sind korrekt?", o:[
 ["Die charakteristische Länge ist lc = V/A.",1],["Je größer lc, desto kompakter das Gebäude.",1],["Ein kleines eingeschoßiges Haus hat ein größeres lc als ein großer viergeschoßiger Block.",0],["Kompaktere Gebäude haben bei gleicher Dämmung tendenziell geringere Wärmeverluste je m³.",1]], e:"150 m² eingeschoßig lc ≈ 0,94; 1450 m² viergeschoßig lc = 2,60.", p:[116,117]},
{ c:"winter", q:"Luft- und Winddichtheit: Welche Aussagen sind korrekt?", o:[
 ["Die Luftdichtheitsschicht liegt innen und verhindert Durchströmung von innen nach außen.",1],["Die Winddichtheit verhindert das Eindringen von Außenluft in die Dämmung.",1],["Ohne Lüftungsanlage darf n50 maximal 1,5 h⁻¹ betragen.",0],["Bei n50 < 0,6 h⁻¹ spricht man von sehr hoher Luftdichtheit.",1]], e:"Ohne Anlage ≤ 3,0, mit Anlage ≤ 1,5 h⁻¹.", p:[75,77]},
{ c:"winter", q:"Wärmestrahlung: Welche Aussagen sind korrekt?", o:[
 ["In q = ε·σ·(T1⁴−T2⁴) müssen Temperaturen in Kelvin eingesetzt werden.",1],["Blanke Metalloberflächen haben einen hohen Emissionsgrad.",0],["Baustoffe wie Putz, Ziegel und Holz haben ε ≈ 0,85–0,93.",1],["Sonnenstrahlung besteht zu rund 58 % aus Infrarotstrahlung.",1]], e:"Blankes Metall ε ≈ 0,04.", p:[25,27]},
{ c:"winter", q:"Temperaturkorrekturfaktoren f_i,h: Welche Werte stimmen?", o:[
 ["Decke zu geschlossenem, unkonditioniertem Dachraum: 0,90",1],["Decke zu ungedämmtem Keller: 0,70",1],["Erdanliegender Fußboden ≤ 1,5 m unter Erdreich: 0,70",1],["Wand zu Tiefgarage: 0,50",0]], e:"Tiefgarage 0,80; gedämmter Keller 0,50.", p:[63,65]},
{ c:"winter", q:"Innere Gewinne & Lüftung im Energieausweis: Welche Aussagen sind korrekt?", o:[
 ["Innere Gewinne werden als genormter Durchschnittswert angesetzt, damit Kennzahlen vergleichbar sind.",1],["Das energetisch wirksame Luftvolumen ist VV = BGF·0,8·2,6.",1],["LV = 0,34·n·VV in W/K.",1],["Die hygienische Luftwechselrate für ein Wohnhaus mit max. 2 Nutzungseinheiten beträgt 0,38 h⁻¹.",0]], e:"0,28 h⁻¹ (≤ 2 NE), 0,38 h⁻¹ (> 2 NE).", p:[81,83,99]},
// ---------- SOMMER ----------
{ c:"sommer", x:1, q:"Sommerlicher Wärmeschutz: Welche Aussagen sind korrekt?", o:[
 ["Eine Betonwand hat eine höhere flächenbezogene speicherwirksame Masse als eine Ziegelwand.",1],
 ["Ein horizontales Fenster nach Süden hat einen höheren Z_ON-Faktor als ein vertikales mit gleicher Orientierung.",1],
 ["Die flächenbezogene speicherwirksame Masse sinkt mit der Wanddicke.",0],
 ["Der Abminderungsfaktor z einer innenliegenden Verschattung ist kleiner als der einer außenliegenden.",0]], e:"Z_ON horizontal 2,06 vs. vertikal Süd 1,00. Die Masse steigt mit der Dicke bis zu einem Grenzwert. Innen liegender Schutz ist schlechter → größeres z.", p:[157,163,144]},
{ c:"sommer", x:1, q:"Sommerlicher Wärmeschutz nach OIB-RL 6: Welche Aussagen sind korrekt?", o:[
 ["Er ist eingehalten, wenn der Tagesverlauf der operativen Raumtemperatur T_op,max nicht überschreitet.",1],
 ["Bei der Berechnung werden innere Lasten, solare Einträge und die speicherwirksame Masse berücksichtigt.",1],
 ["T_NAT,13 ist die Anzahl der Hitzetage mit einem Tagesmittel über 30 °C.",0],
 ["Die operative Temperatur ist das Mittel aus Raum- und Außentemperatur.",0]], e:"T_NAT,13 = Tagesmitteltemperatur, die an 13 Tagen/Jahr überschritten wird. ϑop = Mittel aus Luft- und mittlerer Oberflächentemperatur.", p:[136,139,142]},
{ c:"sommer", q:"Welche Aussagen zur Anforderung der OIB-RL 6 sind korrekt?", o:[
 ["T_op,max = ⅓·T_NAT,13 + 21,8 °C",1],["Alternativ eingehalten, wenn alle Fenster außenliegenden Sonnenschutz mit g_tot ≤ 0,15 haben.",1],["Nordfenster (± 22,5°) dürfen dabei unberücksichtigt bleiben.",1],["Wohngebäude dürfen eine aktive Kühlung ansetzen.",0]], e:"Wohngebäude: keine aktive Kühlung.", p:[136]},
{ c:"sommer", q:"Sonnenschutz: Welche Aussagen sind korrekt?", o:[
 ["Außenliegender Sonnenschutz reduziert den Energiedurchlass auf etwa 5–15 %.",1],["Innenliegende helle Behänge lassen etwa 30–40 % durch.",1],["Bei innenliegendem Schutz hält die Low-E-Schicht die entstandene Wärme im Raum.",1],["g_tot gilt nur für die Verglasung ohne Beschattung.",0]], e:"g_tot = System Verglasung + Beschattung.", p:[144,145]},
{ c:"sommer", q:"Operative Temperatur: Welche Aussagen sind korrekt?", o:[
 ["Sie ist das arithmetische Mittel aus Raumlufttemperatur und mittlerer Oberflächentemperatur.",1],["Die mittlere Oberflächentemperatur wird flächengewichtet berechnet.",1],["Richtwert: max. 2 K Unterschied zwischen Luft und Oberflächen.",1],["Sie wird auch „Taupunkttemperatur“ genannt.",0]], e:"Sie heißt auch Empfindungstemperatur.", p:[139]},
{ c:"sommer", q:"Vereinfachtes Verfahren (ÖNORM B 8110-3:2012): Welche Aussagen sind korrekt?", o:[
 ["Es ist nach OIB-RL 6:2023 nicht mehr als Nachweis zulässig.",1],["Es setzt u. a. voraus, dass Fenster nachts offen gehalten werden können.",1],["Nachweis erfüllt, wenn min m_w,I ≤ vorhandene m_w,I.",1],["Ziel ist eine operative Temperatur unter 30 °C.",0]], e:"Ziel: unter 26 °C in Haupträumen.", p:[152,153]},
{ c:"sommer", q:"Immissionsfläche & Z_ON: Welche Aussagen sind korrekt?", o:[
 ["A_I = A_F · f_g · g · Z_ON · z",1],["Z_ON bezieht die Einstrahlung auf eine vertikale Südfläche.",1],["Ein vertikales Nordfenster hat Z_ON = 1,00.",0],["Je größer A_I, desto mehr Speichermasse wird benötigt.",1]], e:"Nord vertikal 0,54; Süd vertikal 1,00.", p:[156,157]},
{ c:"sommer", q:"Stündlicher Luftvolumenstrom im vereinfachten Verfahren: Welche Aussagen sind korrekt?", o:[
 ["V̇_L = n_L · V mit dem Innenvolumen des Raums",1],["Bei V̇_L,s = 75 m³/hm² ist min m_w,I = 4.000 kg/m².",1],["Je größer V̇_L,s, desto mehr Masse wird benötigt.",0],["Werte unter 50 m³/hm² sind wegen hohem Überwärmungsrisiko zu vermeiden.",1]], e:"Mehr Lüftung → weniger Masse nötig (100 → 2.000, 50 → 8.000).", p:[159,160]},
{ c:"sommer", q:"Sommertauglichkeitskategorien: Welche Aussagen sind korrekt?", o:[
 ["Kategorie B bedeutet: bei genormter Außentemperatur eingehalten.",1],["Für A wird die Außentemperatur um 1,5 K angehoben.",1],["Für A+ wird die Außentemperatur um 3 K angehoben.",1],["D bedeutet sehr gut sommertauglich.",0]], e:"D = nicht sommertauglich.", p:[150]},
{ c:"sommer", q:"Städtische Wärmeinseln: Welche Aussagen sind korrekt?", o:[
 ["Versiegelte Flächen speichern Wärme und geben sie zeitverzögert ab.",1],["Nachts kann es bis zu 6 °C wärmer sein als im Umland.",1],["Die EPBD gibt Klimaanlagen Vorrang vor passiven Maßnahmen.",0],["Ausreichende Wärmekapazität der Konstruktion ist eine empfohlene passive Maßnahme.",1]], e:"Passive Strategien haben Vorrang.", p:[133,135]},
{ c:"sommer", q:"Nicht-Wohngebäude: Welche Aussagen sind korrekt?", o:[
 ["Alternativ darf der außeninduzierte Kühlbedarf KB* im Neubau 1 kWh/m³a nicht überschreiten.",1],["Bei größeren Renovierungen gilt 2 kWh/m³a.",1],["Die maximale Innentemperatur für den Kühlbedarf beträgt 26 °C.",1],["Innere Lasten werden bei Nicht-Wohngebäuden nicht berücksichtigt.",0]], e:"Es werden die tatsächlichen inneren Lasten angesetzt.", p:[151]},
// ---------- FEUCHTE ----------
{ c:"feuchte", x:1, q:"Raum 23 °C, 40 % rel. Feuchte. Wie hoch ist die relative Luftfeuchtigkeit, wenn die Temperatur auf 20 °C sinkt?", o:[
 ["52 %",0],["Die relative Lufttemperatur beträgt dann 38 %",0],["Sie verändert sich nicht.",0],["48 %",1]], e:"p = 0,4·2808 = 1123 Pa; p_s(20) = 2337 Pa → 48 %.", p:[186,187]},
{ c:"feuchte", x:1, q:"Glaser-Verfahren: Welche Aussagen sind korrekt?", o:[
 ["Die Kondenswassermenge an Grenzflächen darf 0,5 kg/m² nicht überschreiten.",1],
 ["Das Glaser-Verfahren dient zur Abschätzung des Kondensat- und Schimmelrisikos an der Oberfläche.",0],
 ["Übersteigt an einer Grenzfläche der Partialdruck den Sättigungsdruck, kommt es zur Kondensation.",1],
 ["Es werden dieselben Übergangswiderstände wie beim Wärmeschutz verwendet.",0]], e:"Glaser = Kondensat im Bauteilinneren. Rsi = 0,25 statt 0,13.", p:[233,239,249]},
{ c:"feuchte", x:1, q:"Außenecke: ϑsi = 12,5 °C, ϑi = 22 °C, ϑe = −1,5 °C. Besteht Schimmelrisiko?", o:[
 ["Die Anforderung der Schimmelfreiheit ist nicht erfüllt.",1],["Die Anforderung ist erfüllt.",0],["Der Temperaturfaktor beträgt 0,60.",1],["Der Temperaturfaktor beträgt 0,72.",0]], e:"f = (12,5+1,5)/(22+1,5) = 0,596 ≈ 0,60 < 0,70.", p:[259,264]},
{ c:"feuchte", x:1, q:"Wasserdampfdiffusion: Welche Aussagen sind korrekt?", o:[
 ["Die äquivalente Luftschichtdicke sd ist das Produkt aus Schichtdicke und µ.",1],
 ["Diffusion ist der Feuchtetransport durch Bauteile aufgrund eines Partialdruckgefälles.",1],
 ["Je größer µ, desto diffusionsoffener der Baustoff.",0],
 ["Je größer µ, desto dampfdichter der Baustoff.",1]], e:"sd = µ·d.", p:[195,196]},
{ c:"feuchte", x:1, q:"Dauerhaftigkeit: Welche Aussagen sind korrekt?", o:[
 ["Stoffe dehnen sich mit zunehmender Temperatur aus.",1],["Behinderte Dehnung kann bei Überschreitung der Belastungsgrenzen zur Zerstörung führen.",1],
 ["Je größer αt, desto stärker dehnt sich ein Material bei gleicher Temperaturdifferenz.",1],["αt beschreibt die Ausdehnung durch Feuchtigkeitsaufnahme.",0]], e:"Feuchtedehnung = hygrische Längenänderung.", p:[167,170]},
{ c:"feuchte", q:"Relative Feuchte & Taupunkt: Welche Aussagen sind korrekt?", o:[
 ["φ = p / p_s · 100 %",1],["Kühlt Luft ohne Feuchteänderung ab, steigt die relative Feuchte.",1],["Der Sättigungsdruck sinkt mit steigender Temperatur.",0],["Am Taupunkt beträgt die relative Feuchte 100 %.",1]], e:"p_s steigt mit der Temperatur.", p:[186,187,188]},
{ c:"feuchte", q:"Luftfeuchteklassen nach ÖNORM B 8110-2: Welche Aussagen sind korrekt?", o:[
 ["Wohnhäuser mit unbekannter Belegung gehören zu FK 3.",1],["Baukonstruktionen für Wohngebäude werden so ausgelegt, dass bei FK 3 keine Feuchteschäden entstehen.",1],["Schwimmbäder gehören zu FK 1.",0],["Der Feuchteüberschuss Δv hängt von der Außentemperatur ab.",1]], e:"Schwimmbad, Wäscherei = FK 5.", p:[191]},
{ c:"feuchte", q:"Schimmel: Welche Aussagen sind korrekt?", o:[
 ["Schimmelwachstum ist ab ca. 80 % relativer Feuchte an der Oberfläche möglich.",1],["Für Schimmel muss Tauwasser an der Oberfläche vorhanden sein.",0],["Der Bemessungstemperaturfaktor für Schimmel beträgt 0,70.",1],["Wärmebrücken sind besonders gefährdet.",1]], e:"80 % reichen – kein Tauwasser nötig.", p:[256,259,265]},
{ c:"feuchte", q:"Temperaturfaktor f_Rsi: Welche Aussagen sind korrekt?", o:[
 ["f_Rsi = (ϑsi − ϑe) / (ϑi − ϑe)",1],["Für Oberflächenkondensat gilt f_Rsi,min = 0,59 (ϑe = −16 °C).",1],["Der Nachweis ist erfüllt, wenn f_Rsi kleiner als f_Rsi,min ist.",0],["Hinter Einbauschränken wird Rsi = 1,0 m²K/W angesetzt.",1]], e:"Erfüllt bei f_Rsi ≥ f_Rsi,min.", p:[259,260]},
{ c:"feuchte", q:"Feuchtetransportarten: Welche Aussagen sind korrekt?", o:[
 ["Wasserdampfkonvektion ist der Transport von Dampf durch strömende Luft.",1],["Konvektion über Leckagen kann ein Vielfaches der Diffusion transportieren.",1],["Kapillaraszension tritt bei hydrophoben Stoffen auf.",0],["Aufsteigende Bodenfeuchte im Mauerwerk beruht auf Kapillaraszension.",1]], e:"Aszension: hydrophil, konkav, Adhäsion > Kohäsion.", p:[199,201,204,205]},
{ c:"feuchte", q:"Konstruktionsregeln gegen Durchfeuchtung aus der Innenluft: Welche sind korrekt?", o:[
 ["Dampfbremsende Ebene auf der Innenseite",1],["Die Konstruktion muss nach einer Seite austrocknen können.",1],["Dampfsperre möglichst auf der Außenseite der Dämmung",0],["Luft- und winddichte Ausführung",1]], e:"Dicht innen (warme Seite), offen außen.", p:[206]},
{ c:"feuchte", q:"Glaser-Randbedingungen (ÖNORM B 8110-2:2003): Welche Aussagen sind korrekt?", o:[
 ["Innentemperatur 20 °C",1],["Für die generelle Bemessung wird das Klagenfurter Klima verwendet.",1],["Geprüft wird zuerst der Monat mit der höchsten Partialdruckdifferenz (Jänner).",1],["Die Außenluftfeuchte beträgt ganzjährig 65 %.",0]], e:"Außen 80 % (Sep–Apr) bzw. 75 % (Mai–Aug); 65 % ist innen.", p:[234,235,241]},
{ c:"feuchte", q:"Glaser-Verfahren – Annahmen: Welche Aussagen sind korrekt?", o:[
 ["Das Bauteil wird als luftdicht angenommen.",1],["Kapillarer Feuchtetransport wird berücksichtigt.",0],["Die Baustoffe gelten als trocken (keine Baufeuchte).",1],["Es betrachtet nur winterliche Tauwasserbildung durch Diffusion.",1]], e:"Kein Kapillartransport, nicht hygroskopisch.", p:[232]},
{ c:"feuchte", q:"Nachweis nach ÖNORM B 8110-2:2020: Welche Aussagen sind korrekt?", o:[
 ["Nachweisfreie, bewährte Konstruktionen benötigen keinen Nachweis.",1],["Für Holzriegelwände ist ein stationärer Nachweis nach EN ISO 13788 zulässig.",1],["Das Glaser-Verfahren ist als alleiniger Nachweis ausreichend.",0],["Sonstige Konstruktionen brauchen eine instationäre Simulation nach EN 15026.",1]], e:"Glaser ist nicht mehr ausreichend.", p:[207,208]},
{ c:"feuchte", q:"Dampfbremse nach sd-Wert: Welche Zuordnungen stimmen?", o:[
 ["sd ≤ 0,5 m: diffusionsoffen",1],["0,5 < sd ≤ 10 m: diffusionsbremsend",1],["100 < sd < 1500 m: diffusionsdicht",0],["sd ≥ 1500 m: diffusionsdicht",1]], e:"100–1500 m = diffusionssperrend.", p:[173]},
{ c:"feuchte", q:"Partialdruck: Welche Aussagen sind korrekt?", o:[
 ["p = v · R_H2O · T mit T in Kelvin",1],["Bei konstanter absoluter Feuchte steigt p proportional zur absoluten Temperatur.",1],["Der Luftdruck ist die Summe der Partialdrücke aller Gaskomponenten.",1],["R_H2O beträgt 287 J/kgK.",0]], e:"R_H2O = 462 J/kgK (287 ist trockene Luft).", p:[184,185]},
{ c:"feuchte", q:"Luftdichtheit: Was gilt als luftdicht?", o:[
 ["Verputztes Mauerwerk",1],["Gipsbauplatten mit gespachtelten Fugen",1],["Unverputztes Hochlochziegelmauerwerk",0],["OSB-Platten",1]], e:"Erst der Putz macht Mauerwerk luftdicht.", p:[173]},
];

// Offene Fragen / Karteikarten
window.CARDS = [
// SOMMER
{c:"sommer", q:"Was ist das Ziel des sommerlichen Wärmeschutzes?", a:"Behagliches Raumklima in den Sommermonaten in Wohngebäuden <b>ohne außeninduzierten Kühlbedarf</b> (Klimatisierung) – durch Sonnenschutz, Speichermasse, Lüftung.", p:[134]},
{c:"sommer", q:"Wie lautet die Anforderung der OIB-RL 6 an Wohngebäude im Sommer?", a:"Die operative Temperatur darf bei periodisch wiederholtem Außenklima T<sub>op,max</sub> = ⅓·T<sub>NAT,13</sub> + 21,8 °C nicht überschreiten. Alternativ: alle Fenster (außer Nord ±22,5°) mit außenliegendem Sonnenschutz g<sub>tot</sub> ≤ 0,15. Keine aktive Kühlung.", p:[136]},
{c:"sommer", q:"Was ist T<sub>NAT,13</sub>?", a:"Die Tagesmitteltemperatur, die im Durchschnitt an <b>13 Tagen pro Jahr überschritten</b> wird – abhängig von Seehöhe und Katastralgemeinde.", p:[136,138]},
{c:"sommer", q:"Was ist die operative Raumtemperatur und wie berechnet man sie?", a:"Empfindungstemperatur = Mittel aus Raumlufttemperatur und flächengewichteter mittlerer Oberflächentemperatur: ϑ<sub>op</sub> = (ϑ<sub>L</sub> + ϑ<sub>U</sub>)/2. Richtwert max. 2 K Unterschied.", p:[139]},
{c:"sommer", q:"Welche Einflüsse werden in der Simulation der sommerlichen Überwärmung berücksichtigt?", a:"Lüftung (Fenster, Nachtlüftung), innere Wärmegewinne (Personen, Geräte, Beleuchtung je Nutzung), solare Gewinne (Standort, Orientierung, Fenster, Sonnenschutz), Schichtenaufbau der Bauteile (Speichermasse).", p:[142]},
{c:"sommer", q:"Warum ist außenliegender Sonnenschutz wirksamer als innenliegender?", a:"Außen wird die Strahlung vor dem Glas reflektiert/absorbiert (5–15 % Durchlass). Innen ist sie schon im Raum, wird zu Wärme und kann wegen der Low-E-Schicht nicht mehr hinaus (helle Behänge 30–40 %).", p:[144]},
{c:"sommer", q:"Was beschreibt g<sub>tot</sub>?", a:"Gesamtenergiedurchlassgrad des Systems Verglasung + Beschattung: wie viel Solarenergie in den Raum gelangt (τ + q<sub>i</sub>), am ganzen Fenster gemessen.", p:[145]},
{c:"sommer", q:"Was sind städtische Wärmeinseln?", a:"Versiegelte Flächen speichern Wärme und geben sie verzögert ab → in der Nacht bis zu 6 °C wärmer als das Umland.", p:[133]},
{c:"sommer", q:"Welche Bedingungen gelten für das vereinfachte Verfahren (B 8110-3:2012) und was ist das Ziel?", a:"Wohngebäude, Tagesmittel außen ≤ 23 °C, Fenster nachts offen. Ziel: ϑ<sub>op</sub> in Haupträumen &lt; 26 °C. Nachweis min m<sub>w,I</sub> ≤ m<sub>w,I</sub>. Seit OIB 2023 nicht mehr zulässig.", p:[152,153]},
{c:"sommer", q:"Was ist die Immissionsfläche und wovon hängt sie ab?", a:"Maß für den solaren Wärmeeintrag: A<sub>I</sub> = A<sub>F</sub>·f<sub>g</sub>·g·Z<sub>ON</sub>·z (Fensterfläche, Glasanteil, g-Wert, Orientierung/Neigung, Abschattung).", p:[156]},
{c:"sommer", q:"Was ist der Z<sub>ON</sub>-Faktor?", a:"Neigungs- und Orientierungsfaktor: Einstrahlung auf eine beliebig orientierte/geneigte Fläche im Verhältnis zur vertikalen Südfläche (=1,00). Horizontal 2,06, Nord vertikal 0,54.", p:[157]},
{c:"sommer", q:"Welche Kategorien der Sommertauglichkeit gibt es?", a:"A+ (sehr gut, +3 K), A (gut, +1,5 K), B (sommertauglich, Normklima eingehalten), C (bedingt), D (nicht).", p:[150]},
{c:"sommer", q:"Welche Anforderung gilt für Nicht-Wohngebäude?", a:"Überwärmung mit tatsächlichen inneren Lasten vermeiden oder außeninduzierter Kühlbedarf KB* &lt; 1 kWh/m³a (Neubau) bzw. 2 kWh/m³a (größere Renovierung); max. 26 °C.", p:[151]},
{c:"sommer", q:"Wie wirkt Speichermasse im Sommer?", a:"Massive Bauteile nehmen tagsüber Wärme auf und dämpfen Temperaturspitzen; nachts wird über Lüftung entladen. Beton mit Putz ≈ 475 kg/m² vs. Holzriegel ≈ 60 kg/m² – der Holzraum wird spürbar wärmer.", p:[105,154]},
// WINTER
{c:"winter", q:"Was ist der U-Wert?", a:"Wärmedurchgangskoeffizient in W/m²K: Wärmestrom durch 1 m² Bauteil bei 1 K Temperaturdifferenz. U = 1/R<sub>T</sub> = 1/(R<sub>si</sub> + Σd/λ + R<sub>se</sub>).", p:[12,18]},
{c:"winter", q:"Wovon hängt die Wärmeleitfähigkeit λ ab?", a:"Vom Feststoff und von Porengröße und -verteilung → Zusammenhang mit der Rohdichte: je leichter, desto besser dämmt das Material.", p:[13]},
{c:"winter", q:"Nenne die drei Arten des Wärmetransports.", a:"Wärmeleitung (Schwingungsenergie zwischen Teilchen, v. a. Feststoffe), Konvektion (mit bewegten Gasen/Flüssigkeiten), Strahlung (elektromagnetisch, ohne Medium).", p:[9,10]},
{c:"winter", q:"Was sind R<sub>si</sub> und R<sub>se</sub>?", a:"Wärmeübergangswiderstände innen/außen; fassen Konvektion und Strahlung an der Oberfläche zusammen. R<sub>si</sub> 0,10 (aufwärts) / 0,13 (horizontal) / 0,17 (abwärts), R<sub>se</sub> 0,04 m²K/W.", p:[21]},
{c:"winter", q:"Was ist der Gesamtenergiedurchlassgrad g?", a:"g = τ + q<sub>i</sub>: Anteil der Solarstrahlung, der direkt durchgeht (τ) plus sekundäre Wärmeabgabe der erwärmten Scheibe nach innen. Je größer g, desto mehr Solarwärme im Raum.", p:[29,30]},
{c:"winter", q:"Wie berechnet man den U-Wert eines Fensters?", a:"U<sub>w</sub> = (A<sub>f</sub>·U<sub>f</sub> + A<sub>g</sub>·U<sub>g</sub> + l·ψ)/A<sub>w</sub> – Rahmen, Glas und Randverbund (Abstandhalter, Wärmebrücke) flächengewichtet.", p:[31]},
{c:"winter", q:"Definiere Heizwärmebedarf und Kühlbedarf.", a:"HWB: Wärmemenge, die einem Gebäude im Jahr zugeführt werden muss, um 22 °C zu halten. KB: Wärmemenge, die entzogen werden muss, um max. 26 °C zu halten.", p:[39]},
{c:"winter", q:"Wie lautet die Bilanzgleichung des HWB?", a:"Q<sub>h</sub> = (Q<sub>T</sub> + Q<sub>V</sub>) − η·(Q<sub>s</sub> + Q<sub>i</sub>): Transmissions- + Lüftungsverluste minus nutzbare solare + innere Gewinne, monatlich.", p:[44]},
{c:"winter", q:"Was ist der Transmissionsleitwert L<sub>T</sub> und woraus besteht er?", a:"Wärmestrom durch die Hülle bei 1 K Differenz (W/K): L<sub>T</sub> = L<sub>e</sub> (außenluftberührt) + L<sub>u</sub> (über unkonditionierte Räume) + L<sub>g</sub> (Erdreich) + L<sub>ψ</sub> (lineare WB) + L<sub>χ</sub> (punktförmige WB).", p:[46,47]},
{c:"winter", q:"Was ist eine Wärmebrücke, welche Arten gibt es und welche Folgen hat sie?", a:"Begrenzter Bereich mit erhöhter Wärmestromdichte. Geometrisch (Ecken: Außenfläche &gt; Innenfläche) und konstruktiv (Materialwechsel: Balkon, Rollladen, Sockel). Folgen: höhere Verluste, kalte Innenoberfläche → Kondensat/Schimmel.", p:[53,54,55]},
{c:"winter", q:"Was ist der Unterschied zwischen Luftdichtheit und Winddichtheit?", a:"Luftdicht (innen): keine Durchströmung von innen nach außen in die Konstruktion. Winddicht (außen): keine Außenluft in die Dämmschicht.", p:[75]},
{c:"winter", q:"Was misst der Blower-Door-Test (n<sub>50</sub>)?", a:"Volumenstrom, der nötig ist, um 50 Pa Unter-/Überdruck zu halten, bezogen aufs Volumen. ≤ 3,0 h⁻¹ ohne, ≤ 1,5 h⁻¹ mit Lüftungsanlage; kleiner = dichter.", p:[76,77]},
{c:"winter", q:"Wovon hängt der Ausnutzungsgrad η ab?", a:"Vom Verhältnis Gewinne/Verluste (γ) und von der Zeitkonstante τ = C/L (wirksame Speicherkapazität). Schwere Bauweise → größeres η → kleinerer HWB.", p:[104,107,108]},
{c:"winter", q:"Was bedeuten Ref, RK und SK beim HWB?", a:"Ref: Referenzlüftung (Fenster), keine Wärmerückgewinnung. RK: Referenzklima (fiktiver Standort). SK: Standortklima. Deckblatt: HWB<sub>Ref,SK</sub>; Anforderung: HWB<sub>Ref,RK</sub>.", p:[111,113]},
{c:"winter", q:"Erkläre den Unterschied HWB – HEB – EEB – PEB.", a:"HWB: Nutzwärme für Raumheizung. HEB: + Warmwasser + Anlagenverluste + Hilfsenergie. EEB: + Haushaltsstrom = gelieferte/eingekaufte Energie. PEB: EEB inkl. Vorketten über Konversionsfaktoren.", p:[121,124,128]},
{c:"winter", q:"Was ist die charakteristische Länge?", a:"l<sub>c</sub> = V/A (Kehrwert der Kompaktheit A/V). Je größer l<sub>c</sub>, desto kompakter und günstiger für den Wärmeschutz.", p:[116]},
{c:"winter", q:"Welche Faktoren beeinflussen die solaren Gewinne?", a:"Jahres-/Tageszeit, Bewölkung/Trübung, Standort, Nachbarbebauung, Seehöhe, auskragende Bauteile, Horizont, Fensterrücksprünge; rechnerisch I<sub>s</sub>, Glasfläche (0,7·A<sub>w</sub>), F<sub>s</sub>, g<sub>w</sub> = 0,9·0,98·g.", p:[87,90,91]},
{c:"winter", q:"Was ist der Temperaturkorrekturfaktor f<sub>i,h</sub>?", a:"Abminderung des Leitwerts für Bauteile zu unkonditionierten Räumen bzw. Erdreich, weil dort wärmer als außen (z. B. Dachraum 0,9, ungedämmter Keller 0,7, gedämmter Keller 0,5).", p:[63,65]},
{c:"winter", q:"Was versteht man unter Gesamtenergieeffizienz?", a:"Energieverbrauch für Heizung, Kühlung, Warmwasser, Lüftung, Beleuchtung und andere TGA. Effizienz = Verhältnis Nutzen (behagliches Raumklima) zu Aufwand (Energie).", p:[4]},
{c:"winter", q:"Was ist der hygienisch notwendige Luftwechsel?", a:"Frischluft je Person mind. 18–30 m³/h, empfohlen 36 m³/h (→ ca. 1000 ppm CO₂). Rechenwerte n = 0,28 h⁻¹ (≤ 2 NE) bzw. 0,38 h⁻¹.", p:[79,81]},
// FEUCHTE
{c:"feuchte", q:"Was ist der Wasserdampfsättigungsdruck?", a:"Temperaturabhängige Obergrenze des Wasserdampfpartialdrucks – maximal mögliche Dampfmenge ohne Kondensation (Wasser) bzw. Deposition (Eis). Steigt stark mit der Temperatur.", p:[186]},
{c:"feuchte", q:"Definiere relative Feuchte, absolute Feuchte und Taupunkt.", a:"φ = p/p<sub>s</sub>; v = Dampfmasse pro Volumen (kg/m³); Taupunkt = Temperatur, auf die Luft abgekühlt werden muss, damit Kondensat entsteht.", p:[184,187,188]},
{c:"feuchte", q:"Wovon hängt die Raumluftfeuchte ab?", a:"Von Außenluftfeuchte, Feuchteproduktion P und Luftwechsel: v<sub>i</sub> = v<sub>e</sub> + P/(n·V). Δv = Feuchteüberschuss.", p:[190]},
{c:"feuchte", q:"Was sind Luftfeuchteklassen und welche gilt im Wohnbau?", a:"FK 1–5 nach Nutzung, bestimmen den Feuchteüberschuss Δv (2–10 g/m³ bei ≤ 0 °C). Wohnhäuser mit unbekannter Belegung: <b>FK 3</b> – darauf werden Wohnbaukonstruktionen ausgelegt.", p:[191]},
{c:"feuchte", q:"Welche Arten des Feuchtetransports gibt es?", a:"Wasserdampfdiffusion (Partialdruckgefälle), Wasserdampfkonvektion (Luftströmung durch Leckagen), Flüssigwassertransport (Druckunterschiede, Kapillarkräfte).", p:[193,199,202]},
{c:"feuchte", q:"Was beschreiben µ und s<sub>d</sub>?", a:"µ: Diffusionswiderstand eines Stoffes im Verhältnis zu Luft (dimensionslos, ≥ 1). s<sub>d</sub> = µ·d: Dicke einer Luftschicht mit gleichem Widerstand (m). Großes µ/s<sub>d</sub> = dampfdicht.", p:[195,196]},
{c:"feuchte", q:"Erkläre Kapillaraszension und Kapillardepression.", a:"Aszension: hydrophile Stoffe, konkaver Meniskus, Adhäsion &gt; Kohäsion → Wasser steigt (Bodenfeuchte im Mauerwerk). Depression: hydrophobe Stoffe, konvex, Kohäsion &gt; Adhäsion.", p:[204,205]},
{c:"feuchte", q:"Nenne die Konstruktionsregeln gegen Durchfeuchtung aus der Innenluft.", a:"Luft- und winddicht ausführen; dampfbremsende Ebene innen; Austrocknen nach einer Seite ermöglichen (Hinterlüftung); organische Baustoffe vor Baufeuchte schützen.", p:[206]},
{c:"feuchte", q:"Wann ist Tauwasser im Bauteil schädlich (Glaser)?", a:"Wenn es nicht gespeichert werden kann (&gt; 0,5 kg/m² pro Jahr an nicht saugfähigen Schichtgrenzen), R um ≥ 10 % sinkt, Stoffe geschädigt werden oder es im Sommer nicht austrocknet.", p:[233]},
{c:"feuchte", q:"Welche Annahmen trifft das Glaser-Verfahren?", a:"Stationär; luftdichtes Bauteil (keine Konvektion), nicht hygroskopische Stoffe, kein Kapillartransport, trockene Stoffe, keine Feuchte von Regen/aufsteigend. Nur Winter-Tauwasser durch Diffusion.", p:[232]},
{c:"feuchte", q:"Beschreibe die Rechenschritte des Glaser-Verfahrens.", a:"1. Temperaturen an Schichtgrenzen (über R). 2. Sättigungsdruck p<sub>s</sub> je Grenze. 3. Partialdruck p linear über s<sub>d</sub> zwischen p<sub>i</sub> und p<sub>e</sub>. 4. Wo p &gt; p<sub>s</sub> → Kondensat, Tauwassermenge nach EN ISO 13788, Jahressumme ≤ 0,5 kg/m².", p:[241,244,246,249,253]},
{c:"feuchte", q:"Unter welchen Bedingungen wächst Schimmel?", a:"Oberflächentemperatur ca. 0–50 °C, pH 3–9, ab 80 % rel. Feuchte an der Oberfläche, &gt; ca. 4 h/Tag, Nährboden (Substrat).", p:[256]},
{c:"feuchte", q:"Was ist der Temperaturfaktor f<sub>Rsi</sub> und welche Grenzwerte gelten?", a:"f<sub>Rsi</sub> = (ϑ<sub>si</sub> − ϑ<sub>e</sub>)/(ϑ<sub>i</sub> − ϑ<sub>e</sub>) ≥ f<sub>Rsi,min</sub>. Schimmel: 0,70 (ϑ<sub>e</sub> −1,38, ϑ<sub>i</sub> 22 °C, 80 %). Kondensat: 0,59 (ϑ<sub>e</sub> −16 °C, 100 %).", p:[259,260]},
{c:"feuchte", q:"Wie läuft der Nachweis gegen Kondensat im Bauteil nach ÖNORM B 8110-2:2020 ab?", a:"Nachweisfreie Konstruktion → kein Nachweis; Holzriegelwand/Holzbalkendecke → stationär (EN ISO 13788) oder instationär; sonst instationäre Simulation (EN 15026).", p:[208]},
{c:"feuchte", q:"Welche Schäden kann Feuchte verursachen?", a:"Schimmel innen, holzzerstörende Pilze/Insekten, Algen außen, Frostschäden, Salzkristallisation, Quellen/Schwinden, Korrosion von Metall und Beton.", p:[183]},
{c:"feuchte", q:"Welche Folgen hat fehlende Luftdichtheit?", a:"Durchströmung → Tauwasser in der Konstruktion, verminderter Wärmeschutz, niedrige Oberflächentemperaturen → Bauschäden, Schimmel, Zugluft, trockene Luft, höherer Energiebedarf.", p:[175]},
{c:"feuchte", q:"Wie berechnet man die Wärmedehnung und wie begegnet man ihr?", a:"Δl = l·α<sub>t</sub>·ΔT. Dehnfugen vorsehen; nur Stoffe mit gleichem α kraftschlüssig verbinden (Stahl/Beton).", p:[167]},
{c:"feuchte", q:"Wie klassifiziert man Dampfbremsen nach s<sub>d</sub>?", a:"≤ 0,5 m offen · 0,5–10 bremsend · 10–100 hemmend · 100–1500 sperrend · ≥ 1500 m dicht.", p:[173]},
{c:"feuchte", q:"Was ist eine eingeschwungene Konstruktion bei der instationären Simulation?", a:"Der Wassergehalt am Jahresende steigt um weniger als 1 % gegenüber dem Vorjahr; sonst über die Lebensdauer (≥ 30 J.) rechnen, Gleichgewicht nach ca. 10 Jahren.", p:[229]},
];

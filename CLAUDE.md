# Taupunkt

Lernhilfe für die VO Gebäudephysik I (FH Campus Wien), gebaut für Patricia aus `~/nas-storage/other/Patricia`. Statisch auf GitHub Pages (SqueakyCamp/taupunkt), Vanilla JS, kein Build.

Prüfungsschema laut Auftrag: Sommer 5 Fragen + 1 Rechnung, Winter 7 + 1, Feuchte 7 + 1, 1 Zeichenbeispiel (Aufbauten), Multiple Choice.

- `site/c_learn.js`: Kapitel/Abschnitte (HTML + KaTeX). `[[23]]` = Folie (PDF-Seite) 23, `[[F5]]` Formelsammlung, `[[P4]]` Altprüfung. `w:` = Widget aus `widgets.js`.
- `site/c_quiz.js`: MC (mehrere richtig, `x:1` = aus der Altprüfung) und Karteikarten.
- `site/c_build.js`: nachweisfreie Konstruktionen (Folien 209–226), Schichten innen → außen, Zeichnung in `app.js` (`drawBuild`).
- `site/drills.js`: Rechenübungen mit Zufallswerten; `site/widgets.js`: Rechner (U-Wert, Uw, HWB, CO₂, mw,I, f_Rsi, Glaser …).
- `tools/build_slides.py`: rendert `source/*.pdf` AES-GCM-verschlüsselt nach `site/slides/` (Code in `.slide-passphrase`). Folien 189–206 sind gedrehte Scans und werden aufgerichtet.
- `source/` und `.slide-passphrase` bleiben außerhalb von Git (Folien gehören der LV, Repo ist öffentlich). Freischalten per Link `…/#key=<code>`.
- Bei Änderungen an Shell-Dateien `?v=` in index.html und die Cache-Namen in `sw.js` hochzählen.
- Altprüfungs-Antworten (Kreuze in der PDF) wurden nachgerechnet und stimmen mit den Folien überein.

# Chati – KI Prompt-Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.9-brightgreen.svg)
![Technologien](https://img.shields.io/badge/Technologien-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20%7C%20Bootstrap%205-blue)
![PWA](https://img.shields.io/badge/PWA-ready-purple.svg)

## Überblick

**Chati** ist ein browserbasierter KI Prompt-Generator, der Nutzer dabei unterstützt, präzise und strukturierte Prompts für KI-Anwendungen wie [Microsoft Copilot](https://copilot.microsoft.com) und [ChatGPT](https://chat.openai.com) zu erstellen. Über ein übersichtliches Formular werden alle relevanten Parameter (Texttyp, Zielgruppe, Sprachstil, Formatierung u.v.m.) ausgewählt – Chati generiert daraus automatisch einen fertig formulierten Prompt, der direkt in das gewünschte KI-Tool eingefügt werden kann.

Chati läuft vollständig im Browser – kein Backend, kein Build-Schritt, kein Server. Alle Daten bleiben lokal auf dem Gerät. Ab Version 1.2 ist Chati auch als **Progressive Web App (PWA)** installierbar.

---

## Features

### Prompt-Katalog (DE & EN)
Vorgefertigte Vorlagen für die häufigsten Anwendungsfälle – ein Klick befüllt alle Felder automatisch. Der Katalog ist vollständig zweisprachig (Deutsch / Englisch) und wechselt automatisch mit der UI-Sprache. Enthält einen **Suchfilter** zum schnellen Finden von Vorlagen.

| Kategorie | Vorlagen |
|---|---|
| Content | SEO-Blogartikel, Whitepaper, Pressemitteilung, YouTube-Beschreibung |
| Social Media | LinkedIn-Post, Instagram-Caption, Twitter/X-Post, Facebook-Beitrag |
| Marketing | Produktbeschreibung, Newsletter, Landing Page |
| E-Mail | Kalt-Akquise, Follow-Up, Angebots-E-Mail |
| Business | Executive Summary, Bericht, Stellenanzeige |
| Medizin | Patienteninfo, Gesundheitsblog |
| Recht | Rechtlicher Hinweis, Vertragstext |
| Bildung | Lernmaterial, Kursankündigung |
| E-Commerce | Produktseite, Kategoriebeschreibung |
| Copilot – Outlook/Excel/Word/PowerPoint/Teams/Chat | 21 Microsoft-Copilot-Prompts |
| GitHub Copilot | Code-Review, Pull-Request-Beschreibung |

### Formular-Einstellungen (6 Schritte)
Alle Parameter sind frei kombinierbar – wahlweise als freies Formular oder im **geführten Wizard-Modus**:

- **Aufgabe** – über 30 Texttypen in 8 Kategorien + KI-Rollendefinition
- **Kontext** – Thema, Inhalt & Zielgruppe (20+ Optionen: B2C, B2B, Interessen)
- **Format** – Textlänge, Formatierung, Emojis, SEO-Keywords, Titel & Untertitel
- **Persona** – Perspektive & Anredeform
- **Tonfall** – 19 Sprachstile (Emotional, Formell, Journalistisch, Werblich usw.)
- **Beispiel** – Stilreferenz oder Beispieltext (optional)

### Persona-Tresor
Wiederverwendbare „Ich bin ..."-Profile speichern und per Klick laden. Bis zu 10 Personas (z. B. „CFO", „Content-Manager", „Support-Agent") bleiben dauerhaft gespeichert und füllen die Rollendefinition mit einem Klick aus.

### Mini-Prompt-Coach
Jedes Formularfeld hat ein **🎓-Symbol**. Ein Klick zeigt:
- *Warum ist dieses Feld wichtig?*
- ❌ Konkretes Beispiel **ohne** das Feld (schlechter Prompt)
- ✓ Konkretes Beispiel **mit** dem Feld (guter Prompt)

Vollständig zweisprachig (DE/EN).

### Prompt-Qualitäts-Analyzer
Echtzeit-Analyse des generierten Prompts mit:
- **Fortschrittsbalken** (farbig: Basis / Gut / Ausgezeichnet)
- **6 Qualitätsdimensionen** als Status-Badges
- **Tipp der Runde** mit „Zum Feld →"-Sprunglink

### Live-Vorschau
Der fertige Prompt wird in Echtzeit aktualisiert. Zwei Ansichtsmodi:
- **Visuell** – strukturierte Kachel-Ansicht aller Bausteine; leere Felder zeigen klickbare „Klicken zum Ausfüllen"-Hinweise
- **Prompt** – fertiger Fließtext (editierbar, direkt im Feld)

Score-Punkte (0/6) zeigen, welche Felder noch fehlen.

### Prompt-Bibliothek
- **Meine Prompts** – benennen, speichern, laden, kopieren, duplizieren und löschen (localStorage); mit Kategorien-Badge
- **Beispiele** – kuratierte Community-Prompts mit Suchfilter
- **Vorlagen** – alle 12 Formularfelder als wiederverwendbare Preset-Vorlage speichern

### Zuletzt verwendet
Die 5 zuletzt geladenen Vorlagen erscheinen als Schnellzugriff-Leiste oberhalb des Katalogs.

### Prompt-Variationen
Drei alternative Formulierungen des aktuellen Prompts auf Knopfdruck – per Klick kopierbar.

### Exportieren & Teilen
- Prompt in die Zwischenablage kopieren (`Strg+Enter`)
- Als `.txt`-Datei exportieren
- Als **Markdown (`.md`)** exportieren
- **DE / EN Vergleich** – beide Prompt-Versionen nebeneinander im Modal
- **Share-Link** – URL enthält alle Felder + aktive Sprache
- **QR-Code** zum Teilen auf Mobilgeräten
- Direktzugriff auf Microsoft Copilot, ChatGPT, Gemini und weitere KI-Tools

### Tastaturkürzel
| Kürzel | Aktion |
|---|---|
| `Strg+Enter` | Prompt kopieren |
| `Strg+S` | In Bibliothek speichern |
| `Escape` | Formular zurücksetzen |
| `1` – `6` | Direkt zu Schritt 1–6 springen |
| `?` | Tastaturkürzel-Übersicht |

### Onboarding-Tour
Beim ersten Besuch startet automatisch eine 5-Schritte-Tour durch die wichtigsten Funktionen (DE/EN, überspringbar).

### Fokus-Modus
Blendet alle Formularfelder aus und zeigt nur die Live-Vorschau – für konzentriertes Arbeiten mit dem generierten Prompt.

### Design & Themes
5 Themes: **Hell · Dunkel · Ocean · Violett · Forest** — Fluent 2 Design-System (Microsoft), sofort umschaltbar.

### Sprache (DE / EN)
Die gesamte App-Oberfläche, der Prompt-Katalog und die Prompt-Ausgabe sind vollständig auf Deutsch und Englisch verfügbar.

### PWA – Installierbar
Chati kann als App auf Desktop und Mobilgeräten installiert werden (Chrome, Edge, Safari). Funktioniert auch offline dank Service Worker.

### Responsiv & Mobile-optimiert
Vollständig responsiv für Android und iOS:
- Safe-Area-Insets (iPhone-Notch/Dynamic Island)
- 44 × 44 px Touch-Ziele auf allen interaktiven Elementen
- iOS Auto-Zoom-Schutz (font-size ≥ 16 px auf Inputs)
- Landscape-Optimierungen für kleine Bildschirme
- Horizontal-Scroll für Chip-Filter

---

## Technologien

| Bereich | Technologie |
|---|---|
| Markup | HTML5 |
| Styling | CSS3, Bootstrap 5.3.3 |
| Logik | Vanilla JavaScript ES6+ |
| Icons | Font Awesome 6.5 (CDN) |
| Schrift | Inter (Google Fonts) |
| PWA | Web App Manifest + Service Worker |
| Design | Fluent 2 (Microsoft) – CSS Custom Properties |
| Versionierung | Git / GitHub |

Keine serverseitige Logik. Keine Build-Tools. Keine Abhängigkeiten außer CDN-Links.

---

## Projektstruktur

```
Chati/
├── index.html      # Haupt-HTML: Struktur, Modals, Offcanvas, Toasts
├── styles.css      # Gesamtes Styling: Custom Properties, Komponenten, Themes, Responsive
├── script.js       # Formular-Logik, Live-Vorschau, Bibliothek, i18n, Vault, Coach
├── catalog.js      # Prompt-Katalog: DE + EN Vorlagen als JS-Array
├── examples.js     # Community-Beispiel-Prompts inkl. Microsoft Copilot
├── manifest.json   # PWA Web App Manifest
├── sw.js           # Service Worker (Offline-Support)
├── icon.svg        # App-Icon (PWA)
└── README.md
```

---

## Installation & Nutzung

### Lokal starten

```bash
git clone https://github.com/ntaflosa/Chati.git
cd Chati
```

`index.html` direkt im Browser öffnen – kein Build-Schritt, kein Server erforderlich.

### Als PWA installieren

In Chrome oder Edge die Installieren-Schaltfläche in der Adressleiste klicken – Chati wird als eigenständige App hinzugefügt.

### Neue Vorlage zum Katalog hinzufügen

In `catalog.js` ein weiteres Objekt ans Array anhängen:

```js
{
  id: 'meine-vorlage',
  name: 'Meine Vorlage',
  icon: 'fa-solid fa-star',
  category: 'Content',
  descriptionHint: 'Hinweis für das Beschreibungsfeld …',
  fields: {
    'content-type':          'Blog-Post',
    'content-length':        'Mittel (300–600 Wörter)',
    'target-audience':       'Berufstätige (30–50 Jahre)',
    'language-style':        'Informell',
    'perspective':           'Ich-Perspektive',
    'emoji-option':          'wenige',
    'address-form':          'informell',
    'formatting':            'Überschriften + Fließtext',
    'seo-keyword-option':    'Nein',
    'title-subtitle-option': 'nein',
  },
},
```

Kein weiterer Code nötig – die Karte erscheint automatisch im UI.

### Community-Prompts hinzufügen

In `examples.js` ein weiteres Objekt ans `LIBRARY_EXAMPLES`-Array anhängen:

```js
{
  id: 'mein-beispiel',
  title: 'Mein Beispiel-Prompt',
  category: 'Content',   // muss einer der Kategorien entsprechen
  lang: 'de',            // 'de' oder 'en'
  text: 'Erstelle einen …',
},
```

---

## localStorage-Schlüssel

| Schlüssel | Inhalt |
|---|---|
| `chati_form` | Aktueller Formularstand |
| `chati_history` | Letzten 8 generierte Prompts |
| `chati_library` | Gespeicherte eigene Prompts |
| `chati_presets` | Formular-Vorlagen |
| `chati_favorites` | Favorisierte Katalogkarten |
| `chati_recent` | Zuletzt verwendete Vorlagen (max. 5) |
| `chati_vault` | Persona-Tresor (max. 10 Personas) |
| `chati_theme` | Gewähltes Theme |
| `chati_ui_lang` | App-Sprache (de / en) |
| `chati_onboarded` | Onboarding-Tour bereits gesehen |

---

## Changelog

### v1.9
- **Persona-Tresor**: Bis zu 10 wiederverwendbare KI-Personas speichern und per Chip-Klick laden
- **Mini-Prompt-Coach**: 🎓-Symbol an jedem Feld – zeigt „Warum wichtig?" + schlechtes/gutes Beispiel (DE/EN)
- **Mobile-Optimierungen (umfassend)**:
  - Prompt-Katalog auf Mobile jetzt einspaltig (Kartennamen voll lesbar, kein Abschneiden)
  - Header auf Mobile: `btn-toggle-all` + `btn-shortcuts` ausgeblendet (5 statt 7 Buttons), Abstand und Padding reduziert
  - Touch-Target-Bug (lang-btn wurde von 44px auf 32px überschrieben) behoben
  - iOS-Auto-Zoom-Schutz für Landscape-Phones (481–768px)
  - Coach-Popover responsive Breite auf Schmalbildschirmen
  - `pointer:coarse`-Regeln für Coach-Button, Persona-Chip-Löschen, Guided-Next-Button

### v1.8
- **Prompt-Qualitäts-Fortschrittsbalken** mit Farbstufen (Basis / Gut / Ausgezeichnet)
- **Inline-Platzhalter** in der visuellen Vorschau – leere Felder sind direkt anklickbar
- **Tastaturkürzel-Overlay** (`?`-Taste / ⌨-Button)
- **Kategorie-Badges** auf gespeicherten Prompts
- **Schwebender Kopieren-Button** bei Textauswahl im Prompt
- **Onboarding-Tour** (5 Schritte, DE/EN, beim ersten Besuch)
- **Horizontaler Chip-Scroll** für Katalog-Filter auf Mobile
- **Markdown-Export** (`.md`-Datei)
- **DE / EN Prompt-Vergleich** – beide Versionen nebeneinander im Modal
- **Katalog-Suchleiste**
- **Zuletzt verwendet**-Schnellleiste
- **Tipps-Panel** mit „Zum Feld →"-Sprunglinks
- 21 **Microsoft-Copilot-Beispiel-Prompts** (Outlook, Excel, Word, PowerPoint, Teams, Chat, GitHub Copilot)

### v1.7
- Fluent 2 Design-System (Microsoft neutral palette)
- 5 Themes: Hell, Dunkel, Ocean, Violett, Forest
- Fokus-Modus
- QR-Code-Teilen
- Platzhalter-Erkennung (`{{Variablen}}`) mit Ausfüll-Modal
- Preset-Vorlagen (alle Felder als Vorlage speichern)
- Bibliothek: Duplizieren, Import/Export (JSON), Suchfilter
- „Inspirier mich"-Zufalls-Button
- Verlauf: Suchfilter, Favoriten-System

### v1.6
- Copilot- und ChatGPT-Direktintegration (Öffnen-in-Buttons)
- Erweiterte Katalogfilterung mit Favoriten
- Undo-Toast nach Formular-Reset
- Weitere Sprachstile und Texttypen

### v1.5
- Zweisprachiger Katalog (DE/EN): vollständiger englischer Prompt-Katalog mit 38 Vorlagen
- Community-Beispiel-Prompts: neue „Beispiele"-Registerkarte in der Bibliothek
- Verbesserter Share-Link: URL enthält jetzt auch die aktive Sprache (`?lang=en`)
- Wizard-Verbesserung: Beim Klick auf „Weiter →" schließt der aktuelle Bereich automatisch

### v1.4
- Prompt-Bibliothek: Prompts benennen, speichern, laden, kopieren und löschen (localStorage)
- Geführter Wizard-Modus mit „Weiter →"-Schaltflächen
- Erweiterte Dropdowns: neue Inhaltstypen, Zielgruppen, Formate, Sprachstile

### v1.3
- TXT-Export, Prompt-Variationen, mehrsprachige UI
- Branchen-Vorlagen (Medizin, Recht, Bildung, E-Commerce)
- Bootstrap-Tooltips auf Formularfeldern

### v1.2
- PWA-Support (installierbar, Offline-Modus via Service Worker)
- Dark Mode mit Systemerkennung
- Prompt-Verlauf, Sprachtoggle, Share-Funktion, Score-Anzeige

### v1.0
- Erster öffentlicher Release: Prompt-Katalog, Live-Vorschau, KI-Integration

---

## Mitwirken

Pull Requests und Issues sind willkommen. Bitte vor größeren Änderungen zuerst ein Issue öffnen.

---

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

*ntaflos.de – Chati Prompt-Generator*

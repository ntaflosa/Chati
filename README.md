# Chati – KI Prompt-Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.4-brightgreen.svg)
![Technologien](https://img.shields.io/badge/Technologien-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20%7C%20Bootstrap%205-blue)
![PWA](https://img.shields.io/badge/PWA-ready-purple.svg)

## Überblick

**Chati** ist ein browserbasierter KI Prompt-Generator, der Nutzer dabei unterstützt, präzise und strukturierte Prompts für KI-Anwendungen wie [Microsoft Copilot](https://copilot.microsoft.com) und [ChatGPT](https://chat.openai.com) zu erstellen. Über ein übersichtliches Formular werden alle relevanten Parameter (Texttyp, Zielgruppe, Sprachstil, Formatierung u.v.m.) ausgewählt – Chati generiert daraus automatisch einen fertig formulierten Prompt, der direkt in das gewünschte KI-Tool eingefügt werden kann.

Chati läuft vollständig im Browser – kein Backend, kein Build-Schritt. Ab Version 1.2 ist Chati auch als **Progressive Web App (PWA)** installierbar.

Nach einem Jahr erfolgreicher Entwicklung und positiver Resonanz aus der Community wurde Chati im Februar 2025 als Open-Source-Projekt auf GitHub veröffentlicht.

---

## Features

### Prompt-Katalog
Vorgefertigte Vorlagen für die häufigsten Anwendungsfälle – ein Klick befüllt alle Felder automatisch mit optimalen Standardwerten.

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

### Formular-Einstellungen (6 Schritte)
Alle Parameter sind frei kombinierbar – wahlweise als freies Formular oder im **geführten Wizard-Modus** (Bereiche öffnen sich schrittweise mit „Weiter →"-Schaltflächen):

- **Aufgabe** – über 30 Texttypen in 8 Kategorien (Content, Social Media, Marketing, E-Mail, Business, Multimedia, Kreativ, Interaktiv)
- **Kontext** – Thema, Inhalt & Zielgruppe (20 Optionen: B2C, B2B, Interessen u.v.m.)
- **Format** – Textlänge, Formatierung, Emojis, SEO-Keywords, Titel & Untertitel
- **Persona** – Perspektive (Ich / Wir / Du / Er-Sie / Neutral) & Anredeform
- **Tonfall** – 19 Sprachstile (Emotional, Formell, Journalistisch, Werblich, Wissenschaftlich u.a.)
- **Beispiel** – Stilreferenz oder Beispieltext (optional)

Alle Formularfelder enthalten **Tooltips** mit Ausfüllhinweisen.

### Live-Vorschau
Der fertige Prompt wird in Echtzeit aktualisiert. Zwei Ansichtsmodi:
- **Visuell** – strukturierte Kachel-Ansicht aller Bausteine
- **Prompt** – fertiger Fließtext zum Kopieren

Fortschrittsanzeige (Score-Punkte 0/6) zeigt, welche Felder noch fehlen.

### Prompt-Bibliothek
Prompts können benannt, lokal gespeichert und jederzeit wieder geladen, kopiert oder gelöscht werden (localStorage). Zugriff über die Bibliothek-Seitenleiste.

### Prompt-Variationen
Drei alternative Formulierungen des aktuellen Prompts auf Knopfdruck – per Klick kopierbar.

### PWA – Installierbar
Chati kann als App auf Desktop und Mobilgeräten installiert werden (Chrome, Edge, Safari). Funktioniert auch offline dank Service Worker.

### Dark Mode
Vollständig unterstützter Dark/Light Mode mit automatischer Systemerkennung und manuellem Toggle.

### Prompt-Verlauf
Die letzten 8 generierten Prompts werden lokal gespeichert und sind per Seitenleiste abrufbar.

### Sprache (DE / EN)
Die gesamte App-Oberfläche sowie die Prompt-Ausgabe sind wahlweise auf Deutsch oder Englisch umschaltbar.

### Teilen & Exportieren
- Prompt per Knopfdruck in die Zwischenablage kopieren
- Als `.txt`-Datei exportieren
- Share-Link generieren (URL-Parameter)
- Vollansicht im Modal
- Direktzugriff auf Microsoft Copilot und ChatGPT

---

## Technologien

| Bereich | Technologie |
|---|---|
| Markup | HTML5 |
| Styling | CSS3, Bootstrap 5.3 |
| Logik | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 (CDN) |
| Schrift | Inter (Google Fonts) |
| PWA | Web App Manifest + Service Worker |
| Versionierung | Git / GitHub |

Keine serverseitige Logik – Chati läuft vollständig im Browser.

---

## Projektstruktur

```
Chati/
├── index.html      # Haupt-HTML mit Struktur, Modals, Offcanvas und Toasts
├── styles.css      # Gesamtes Styling (Custom Properties, Komponenten, Responsive, Dark Mode)
├── script.js       # Formular-Logik, Live-Vorschau, Verlauf, Bibliothek, i18n, Share
├── catalog.js      # Prompt-Katalog: alle Vorlagen als JS-Array (leicht erweiterbar)
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

Anschließend `index.html` direkt im Browser öffnen – kein Build-Schritt, kein Server erforderlich.

### Als PWA installieren

In Chrome oder Edge die Installieren-Schaltfläche in der Adressleiste klicken – Chati wird als eigenständige App hinzugefügt.

### Neue Vorlage zum Katalog hinzufügen

In `catalog.js` einfach ein weiteres Objekt ans Array anhängen:

```js
{
  id: 'meine-vorlage',           // eindeutige ID (kebab-case)
  name: 'Meine Vorlage',         // Anzeigename in der UI
  icon: 'fa-solid fa-star',      // Font Awesome 6 Icon-Klasse
  category: 'Content',           // Content | Social Media | Marketing | E-Mail | Business | ...
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

Kein weiterer Code notwendig – die Karte erscheint automatisch im UI.

---

## Changelog

### v1.4
- Prompt-Bibliothek: Prompts benennen, speichern, laden, kopieren und löschen (localStorage)
- Geführter Wizard-Modus: Formularbereiche öffnen sich schrittweise mit „Weiter →"
- Erweiterte Dropdowns: neue Inhaltstypen, Zielgruppen, Formate und Sprachstile
- Sicherheitsfix: `.claude/`-Verzeichnis zu `.gitignore` hinzugefügt

### v1.3
- TXT-Export: Prompt als `.txt`-Datei herunterladen
- Prompt-Variationen: 3 alternative Formulierungen per Modal
- Mehrsprachige UI: Globus-Button schaltet die gesamte Oberfläche zwischen DE und EN
- Branchen-Vorlagen: 11 neue Katalogeinträge für Medizin, Recht, Bildung, E-Commerce
- Bootstrap-Tooltips auf Formularfeldern mit Ausfüllhinweisen
- Umfassende Mobile- & iOS/Android-Optimierungen

### v1.2
- PWA-Support (installierbar, Offline-Modus via Service Worker)
- Dark Mode mit Systemerkennung
- Prompt-Verlauf (letzte 8 Prompts, lokal gespeichert)
- Sprachtoggle DE / EN für Prompt-Ausgabe
- Share-Funktion (URL-Parameter)
- Erweiterter Prompt-Katalog (Business-Kategorie)
- Score-Anzeige (Fortschritt 0/6)
- Einklappbare Abschnitte

### v1.0
- Erster öffentlicher Release
- Prompt-Katalog mit Filterung
- Live-Vorschau, Visuell- und Prompt-Tab
- Direkte KI-Integration (Copilot, ChatGPT)

---

## Mitwirken

Pull Requests und Issues sind willkommen! Bitte vor größeren Änderungen zuerst ein Issue öffnen.

---

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

*ntaflos.de – Chati Prompt-Generator*

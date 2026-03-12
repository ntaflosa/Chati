# Chati – KI Prompt-Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0-brightgreen.svg)
![Technologien](https://img.shields.io/badge/Technologien-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20%7C%20Bootstrap%205-blue)

## Überblick

**Chati** ist ein browserbasierter Prompt-Generator, der Nutzer dabei unterstützt, präzise und strukturierte Prompts für KI-Anwendungen wie [Microsoft Copilot](https://copilot.microsoft.com) und [ChatGPT](https://chat.openai.com) zu erstellen. Über ein übersichtliches Formular werden alle relevanten Parameter (Texttyp, Zielgruppe, Sprachstil, Formatierung u.v.m.) ausgewählt – Chati generiert daraus automatisch einen fertig formulierten Prompt, der direkt in das gewünschte KI-Tool eingefügt werden kann.

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

### Formular-Einstellungen
Alle Parameter sind frei kombinierbar:

- **Verwendungszweck** – über 20 Texttypen in 5 Kategorien (Content, Social Media, Marketing, Multimedia, Interaktiv)
- **Textlänge** – Kurz bis Extrem lang
- **Zielgruppe** – von Allgemein bis Akademisch
- **Sprachstil** – 11 Stile (Emotional, Formell, Journalistisch, Werblich u.a.)
- **Perspektive** – Ich / Du / Wir / Er-Sie / Neutral
- **Emojis** – Keine / Wenige / Viele
- **Anredeform** – Formal (Sie) / Informell (Du) / Neutral / Kombiniert
- **Formatierung** – Fließtext, Bullet Points, Nummerierte Liste, Tabellarisch, Zitat
- **SEO-Keywords** – optional generieren lassen
- **Titel & Untertitel** – optional generieren lassen

### Live-Vorschau
Der fertige Prompt wird in Echtzeit aktualisiert, während Parameter geändert werden. Per Knopfdruck in die Zwischenablage kopieren oder in der Vollansicht (Modal) lesen.

### Direkte KI-Integration
Schnellzugriff-Buttons öffnen Microsoft Copilot und ChatGPT direkt im Browser.

---

## Technologien

| Bereich | Technologie |
|---|---|
| Markup | HTML5 |
| Styling | CSS3, Bootstrap 5.3 (CDN) |
| Logik | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 (CDN) |
| Schrift | Inter (Google Fonts) |
| Versionierung | Git / GitHub |

Keine serverseitige Logik – Chati läuft vollständig im Browser und benötigt kein Backend.

---

## Projektstruktur

```
Chati/
├── index.html      # Haupt-HTML mit Struktur, Modal und Toast
├── styles.css      # Gesamtes Styling (Custom Properties, Komponenten, Responsive)
├── script.js       # Formular-Logik, Live-Vorschau, Katalog-Interaktion, Clipboard
├── catalog.js      # Prompt-Katalog: alle Vorlagen als JS-Array (leicht erweiterbar)
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

### Neue Vorlage zum Katalog hinzufügen

In `catalog.js` einfach ein weiteres Objekt ans Array anhängen:

```js
{
  id: 'meine-vorlage',           // eindeutige ID (kebab-case)
  name: 'Meine Vorlage',         // Anzeigename in der UI
  icon: 'fa-solid fa-star',      // Font Awesome 6 Icon-Klasse
  category: 'Content',           // Content | Social Media | Marketing | E-Mail
  descriptionHint: 'Hinweis für das Beschreibungsfeld …',
  fields: {
    'content-type':          'Blog-Post',
    'content-length':        'Kurze Absätze oder längere Sätze',
    'target-audience':       'Allgemeininteressierte Leser',
    'language-style':        'Informell',
    'perspective':           'Ich-Perspektive',
    'emoji-option':          'wenige',
    'address-form':          'informell',
    'formatting':            'Text',
    'seo-keyword-option':    'Nein',
    'title-subtitle-option': 'nein',
  },
},
```

Kein weiterer Code notwendig – die Karte erscheint automatisch im UI.

---

## Mitwirken

Pull Requests und Issues sind willkommen! Bitte vor größeren Änderungen zuerst ein Issue öffnen.

---

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

*ntaflos.de – Chati Prompt-Generator*

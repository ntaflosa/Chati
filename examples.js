'use strict';

/**
 * Chati – Beispiel-Prompt-Bibliothek
 *
 * Diese Datei ist die einzige "Datenbank" für Community-Prompts.
 * Neue Prompts einfach als Objekt ans Array anhängen – fertig.
 *
 * Felder:
 *   id       – eindeutige ID (kebab-case)
 *   title    – Anzeigename in der Bibliothek
 *   category – muss einer der Katalog-Filter-Werte sein
 *   lang     – 'de' | 'en'
 *   text     – der fertige, kopierbare Prompt
 */
const LIBRARY_EXAMPLES = [

  // ── Content ──────────────────────────────────────────────────────────────

  {
    id: 'ex-seo-blog-ki-alltag',
    title: 'SEO Blog-Post: KI-Tools im Alltag',
    category: 'Content',
    lang: 'de',
    text: `Du bist ein erfahrener Content-Marketing-Experte und SEO-Texter.

Schreibe einen SEO-optimierten Blog-Post zum Thema:
„5 KI-Tools, die Berufstätige 2025 kennen sollten"

Zielgruppe: Berufstätige (30–50 Jahre) ohne tiefen technischen Hintergrund, die KI produktiv im Büroalltag einsetzen möchten.

Rahmenbedingungen:
- Länge: ca. 800 Wörter
- Format: Einleitung → 5 Abschnitte mit H2-Überschriften → Fazit
- Sprachstil: Sachlich, leicht verständlich, ohne Fachjargon
- Perspektive: Neutral/Objektiv
- Anredeform: Du-Form
- Emojis: keine
- Integriere die SEO-Keywords „KI-Tools", „Künstliche Intelligenz im Büro", „Produktivität mit KI" organisch in den Text
- Erstelle einen ansprechenden Titel und Untertitel`,
  },

  {
    id: 'ex-howto-chatgpt',
    title: 'How-To: ChatGPT im Arbeitsalltag nutzen',
    category: 'Content',
    lang: 'de',
    text: `Du bist ein erfahrener Ratgeber-Autor für digitale Produktivität.

Schreibe eine praxisnahe Schritt-für-Schritt-Anleitung:
„Wie man ChatGPT effektiv im Arbeitsalltag einsetzt – 7 konkrete Tipps"

Zielgruppe: Bürokräfte und Selbstständige ohne KI-Vorkenntnisse, die sofort starten möchten.

Rahmenbedingungen:
- Länge: ca. 600 Wörter
- Format: Kurze Einleitung → 7 nummerierte Schritte mit je 2–3 Sätzen → kurzes Fazit
- Sprachstil: Sachlich, motivierend, alltagsnah
- Perspektive: Du-Perspektive (Leser direkt ansprechen)
- Anredeform: Du-Form
- Keine Emojis
- Erstelle einen klaren Titel mit Untertitel`,
  },

  {
    id: 'ex-case-study',
    title: 'Case Study: Erfolgsgeschichte Kunde',
    category: 'Content',
    lang: 'de',
    text: `Du bist ein erfahrener B2B-Content-Autor.

Schreibe eine überzeugende Case Study nach folgendem Schema:

Kunde: [Kundenname/Branche einfügen]
Problem: [Herausforderung des Kunden]
Lösung: [Dein Produkt/Service]
Ergebnis: [Messbare Kennzahlen]

Rahmenbedingungen:
- Länge: ca. 700 Wörter
- Struktur: Titel → Ausgangssituation → Herausforderung → Lösung → Ergebnisse & Kennzahlen → Zitat des Kunden → Fazit
- Sprachstil: Sachlich, faktenbasiert, mit narrativem Einstieg
- Perspektive: Er-/Sie-Perspektive (über den Kunden)
- Anredeform: formal
- Format: Überschriften + Fließtext
- Keine Emojis, kein SEO-Optimierungsfokus
- Erstelle Titel und Untertitel`,
  },

  // ── Social Media ─────────────────────────────────────────────────────────

  {
    id: 'ex-linkedin-remote',
    title: 'LinkedIn-Post: Learnings aus Remote-Arbeit',
    category: 'Social Media',
    lang: 'de',
    text: `Du bist ein erfahrener LinkedIn-Content-Creator.

Schreibe einen authentischen, persönlichen LinkedIn-Post:
„Was ich nach 3 Jahren Remote-Arbeit gelernt habe"

Zielgruppe: Manager, Teamleiter und Fachkräfte, die selbst remote arbeiten oder Teams führen.

Rahmenbedingungen:
- Länge: ca. 150 Wörter
- Format: Starker Eröffnungssatz (Hook) → 3–4 kurze Absätze → Abschlussfrage an die Community
- Sprachstil: Persönlich, reflektierend, ehrlich – keine Corporate-Floskeln
- Perspektive: Ich-Perspektive
- Anredeform: informell (Du)
- 2–3 Emojis gezielt einsetzen
- Kein SEO, kein Titel nötig`,
  },

  {
    id: 'ex-instagram-produkt',
    title: 'Instagram-Caption: Produktlaunch',
    category: 'Social Media',
    lang: 'de',
    text: `Du bist ein kreativer Social-Media-Manager.

Schreibe eine mitreißende Instagram-Caption für den Launch eines neuen Produkts:
[Produktname und kurze Beschreibung einfügen]

Zielgruppe: Lifestyle-affine Millennials (25–35 Jahre), die Wert auf Qualität und Ästhetik legen.

Rahmenbedingungen:
- Länge: ca. 80–100 Wörter
- Format: Emotionaler Einstiegssatz → kurze Beschreibung → Call-to-Action (Link in Bio)
- Sprachstil: Informell, einladend, leicht werblich
- Perspektive: Wir-Perspektive
- Anredeform: informell (Du)
- 5–7 passende Emojis einstreuen
- 5 relevante Hashtags am Ende (Mix aus groß und nischig)
- Kein SEO, kein Titel`,
  },

  {
    id: 'ex-tiktok-hook',
    title: 'TikTok-Skript: 60-Sekunden-Hook',
    category: 'Social Media',
    lang: 'de',
    text: `Du bist ein erfahrener TikTok-Creator und Video-Skript-Autor.

Schreibe ein kurzes, aufmerksamkeitsstarkes TikTok-Skript (60 Sek.) zu:
„3 Dinge, die ich als Freelancer am Anfang nie gewusst hätte"

Zielgruppe: Junge Erwachsene (18–30 Jahre), die über Selbstständigkeit nachdenken.

Rahmenbedingungen:
- Format: Hook (0–3 Sek., muss sofort fesseln) → Hauptinhalt in 3 Punkten → Call-to-Action am Ende
- Sprachstil: Umgangssprachlich, direkt, energiegeladen
- Perspektive: Ich-Perspektive
- Kein langer Fließtext – kurze, gesprochene Sätze
- Kennzeichne die Timecodes (0–3 Sek., 4–15 Sek., etc.)
- Füge am Ende 3 passende TikTok-Hashtags hinzu`,
  },

  // ── Marketing ────────────────────────────────────────────────────────────

  {
    id: 'ex-produktbeschreibung-shop',
    title: 'Produktbeschreibung: Ergonomischer Bürostuhl',
    category: 'Marketing',
    lang: 'de',
    text: `Du bist ein erfahrener E-Commerce-Texter.

Schreibe eine überzeugende, SEO-optimierte Produktbeschreibung für:
„Ergonomischer Bürostuhl – Modell ErgoFlex Pro"

Zielgruppe: Home-Office-Nutzer und Büroangestellte, die viele Stunden sitzen.

Rahmenbedingungen:
- Länge: ca. 200 Wörter
- Format: Kurzer Einleitungssatz (emotional/nutzenorientiert) → 5 Vorteile als Bullet Points → abschließender CTA-Satz
- Sprachstil: Werblich, aber seriös und faktenbasiert
- Perspektive: Du-Perspektive
- Anredeform: informell (Du)
- Keine Emojis
- SEO-Keywords organisch integrieren: „ergonomischer Bürostuhl", „Rückenschmerzen vermeiden", „Home-Office Stuhl"
- Erstelle auch einen kurzen, klickstarken Produkttitel`,
  },

  {
    id: 'ex-landing-page-kurs',
    title: 'Landing Page: Online-Kurs Produktivität mit KI',
    category: 'Marketing',
    lang: 'de',
    text: `Du bist ein erfahrener Copywriter und Conversion-Optimierer.

Schreibe einen überzeugenden Landing-Page-Text für:
„Online-Kurs: In 7 Tagen produktiver mit KI – für Selbstständige & KMUs"

Zielgruppe: Selbstständige und Inhaber kleiner Unternehmen, die mehr in weniger Zeit schaffen wollen.

Rahmenbedingungen:
- Länge: ca. 350 Wörter
- Struktur: Knackige Headline → Problem (Schmerzpunkt ansprechen) → Versprechen (Lösung) → 3 zentrale Vorteile als Bullet Points → Sozialer Beweis (Platzhalter für Testimonial) → CTA-Button-Text
- Sprachstil: Direkt, motivierend, ohne Fachjargon
- Perspektive: Du-Perspektive
- Anredeform: Du-Form
- Keine Emojis
- SEO-Keywords: „KI Produktivität", „Online-Kurs KI", „effizienter arbeiten mit KI"
- Erstelle Hauptüberschrift + 2 Alternativen`,
  },

  // ── E-Mail ───────────────────────────────────────────────────────────────

  {
    id: 'ex-kaltakquise-beratung',
    title: 'Kaltakquise-E-Mail: KI-Beratung B2B',
    category: 'E-Mail',
    lang: 'de',
    text: `Du bist ein erfahrener B2B-Sales-Profi.

Schreibe eine kurze, präzise Kaltakquise-E-Mail für folgendes Angebot:
„KI-Beratung & Implementierung für mittelständische Unternehmen"

Zielgruppe: Geschäftsführer und IT-Leiter in Firmen mit 50–200 Mitarbeitern.

Rahmenbedingungen:
- Länge: max. 150 Wörter (excl. Betreff und Signatur)
- Aufbau: Betreffzeile (A/B-Variante) → persönliche Ansprache → konkreter Nutzen in 2 Sätzen → kurze Referenz oder Beweis → unverbindliche CTA (z.B. 15-Min.-Call)
- Sprachstil: Professionell, direkt, auf den Nutzen fokussiert – kein Spam-Ton
- Perspektive: Ich-Perspektive
- Anredeform: formal (Sie)
- Keine Emojis
- Erstelle 2 alternative Betreffzeilen`,
  },

  {
    id: 'ex-onboarding-saas',
    title: 'Onboarding-E-Mail: SaaS-App neue Nutzer',
    category: 'E-Mail',
    lang: 'de',
    text: `Du bist ein erfahrener Customer-Success-Manager.

Schreibe eine freundliche Onboarding-E-Mail für neue Nutzer der App:
„TaskFlow – das smarte Projektmanagement-Tool für Teams"

Zielgruppe: Berufstätige, die sich gerade registriert haben und schnell starten möchten.

Rahmenbedingungen:
- Länge: ca. 130 Wörter
- Aufbau: Herzlicher Willkommensgruß → 3 erste konkrete Schritte (nummeriert) → Hinweis auf Help Center + Support → motivierender Abschluss
- Sprachstil: Persönlich, einladend, motivierend – wie von einem echten Menschen
- Perspektive: Wir-Perspektive
- Anredeform: informell (Du)
- 1–2 Emojis an passender Stelle
- Betreffzeile mitliefern
- Platzhalter für Nutzername: {{Vorname}}`,
  },

  // ── Business ─────────────────────────────────────────────────────────────

  {
    id: 'ex-stellenanzeige-ux',
    title: 'Stellenanzeige: Junior UX/UI Designer remote',
    category: 'Business',
    lang: 'de',
    text: `Du bist ein erfahrener HR-Texter für moderne Tech-Unternehmen.

Schreibe eine ansprechende Stellenanzeige für:
„Junior UX/UI Designer (m/w/d) – remote, Vollzeit"

Unternehmen: Junges SaaS-Startup, 20 Mitarbeiter, produktorientiert.
Zielgruppe: Absolventen und Berufseinsteiger mit ersten Designerfahrungen.

Rahmenbedingungen:
- Länge: ca. 350 Wörter
- Struktur: Kurze Unternehmensvorstellung (3–4 Sätze) → Aufgaben (Bullet Points) → Anforderungen (Bullet Points, „Must have" vs. „Nice to have") → Was wir bieten (Bullet Points) → CTA mit Bewerbungsinfo
- Sprachstil: Authentisch, modern, auf Augenhöhe – keine trockene Kanzleisprache
- Perspektive: Wir-Perspektive
- Anredeform: Du-Form
- 1–2 Emojis dezent einsetzen
- Erstelle einen klickstarken Jobtitel + Untertitel`,
  },

  {
    id: 'ex-proposal-website',
    title: 'Angebot/Proposal: Website-Relaunch',
    category: 'Business',
    lang: 'de',
    text: `Du bist ein erfahrener Freelancer/Agentur-Berater.

Erstelle ein professionelles Angebots-Proposal für:
„Website-Relaunch inklusive SEO-Optimierung"

Kunde: Regionaler Handwerksbetrieb (Sanitär & Heizung), 12 Mitarbeiter.
Leistungsumfang: Konzept, Design, Entwicklung (WordPress), SEO-Grundsetup, Schulung.
Preis: 8.500 € netto.
Zeitplan: 6–8 Wochen nach Auftragserteilung.

Rahmenbedingungen:
- Länge: ca. 500 Wörter
- Struktur: Einleitung & Verständnis der Aufgabe → Leistungsumfang (detailliert) → Projektphasen & Zeitplan → Investition → Nächste Schritte / CTA
- Sprachstil: Professionell, vertrauensbildend, klar und konkret
- Perspektive: Wir-Perspektive
- Anredeform: formal (Sie)
- Format: Überschriften + strukturierter Fließtext
- Keine Emojis`,
  },

  // ── Medizin ──────────────────────────────────────────────────────────────

  {
    id: 'ex-patienteninfo-diabetes',
    title: 'Patienteninformation: Typ-2-Diabetes & Ernährung',
    category: 'Medizin',
    lang: 'de',
    text: `Du bist ein erfahrener medizinischer Fachautor (kein Ersatz für ärztliche Beratung).

Schreibe eine verständliche Patienteninformation zum Thema:
„Typ-2-Diabetes: Ernährung und Lebensstil im Überblick"

Zielgruppe: Patienten (40–65 Jahre) ohne medizinischen Hintergrund, die kürzlich diagnostiziert wurden.

Rahmenbedingungen:
- Länge: ca. 400 Wörter
- Format: Einleitung → 3–4 Abschnitte mit H3-Überschriften → Abschluss mit Hinweis auf ärztliche Begleitung
- Sprachstil: Sachlich, empathisch, ohne Fachjargon – medizinische Begriffe erklären
- Perspektive: Neutral/Objektiv
- Anredeform: formal (Sie)
- Keine Diagnose- oder Therapieempfehlung, nur allgemeine Aufklärung
- Keine Emojis
- Schreibe einen Hinweis-Satz am Ende: „Dieser Text ersetzt keine ärztliche Beratung."`,
  },

  {
    id: 'ex-aufklaerung-knie',
    title: 'Aufklärungstext: Kniearthroskopie',
    category: 'Medizin',
    lang: 'de',
    text: `Du bist ein medizinischer Fachautor für Klinik-Patientenunterlagen.

Schreibe einen strukturierten Aufklärungstext für:
„Kniearthroskopie – Was Patienten vor dem Eingriff wissen sollten"

Zielgruppe: Patienten, die einen Aufklärungstermin vor der OP hatten und den Text zur Nachbereitung erhalten.

Rahmenbedingungen:
- Länge: ca. 500 Wörter
- Struktur: Kurze Einleitung → Was ist eine Kniearthroskopie? → Ablauf des Eingriffs → Risiken und mögliche Komplikationen → Vorbereitung → Nachsorge → Abschluss
- Sprachstil: Sachlich, formal, vertrauenswürdig – medizinische Begriffe kurz erklären
- Perspektive: Neutral/Objektiv
- Anredeform: formal (Sie)
- Format: Schritt-für-Schritt mit klaren Abschnittsüberschriften
- Keine Emojis
- Disclaimer am Ende: „Dieser Text dient der allgemeinen Information und ersetzt nicht das Aufklärungsgespräch mit Ihrer Ärztin / Ihrem Arzt."`,
  },

  // ── Recht ─────────────────────────────────────────────────────────────────

  {
    id: 'ex-datenschutz-website',
    title: 'Datenschutzerklärung: Einfache Firmen-Website',
    category: 'Recht',
    lang: 'de',
    text: `Du bist ein erfahrener Rechtstextautor (kein Rechtsanwalt – kein Rechtsrat).

Erstelle einen Entwurf für eine Datenschutzerklärung für:
Einfache Firmen-Website (kein Online-Shop) mit:
- Kontaktformular
- Google Analytics (oder datenschutzkonformer Alternative)
- Eingebettete Google Maps

Rahmenbedingungen:
- Länge: ca. 700 Wörter
- Struktur nach DSGVO: Verantwortlicher → Datenerfassung auf der Website → Kontaktformular → Analyse-Tools → Externe Dienste (Maps) → Rechte der Nutzer → Kontakt für Datenschutzanfragen
- Sprachstil: Formal, präzise, verständlich
- Perspektive: Wir-Perspektive
- Format: strukturierte Überschriften
- Platzhalter: [Firmenname], [Adresse], [E-Mail], [Datenschutzbeauftragter]
- Hinweis am Ende: „Dieser Entwurf ersetzt keine rechtliche Prüfung. Bitte lassen Sie die Erklärung von einem Fachanwalt prüfen."`,
  },

  {
    id: 'ex-abmahnung-mitarbeiter',
    title: 'Abmahnungs-Entwurf: Wiederholte Pflichtverletzung',
    category: 'Recht',
    lang: 'de',
    text: `Du bist ein erfahrener Rechtstextautor (kein Rechtsrat, Anwalt hinzuziehen).

Erstelle einen formalen Abmahnungs-Entwurf für folgenden Sachverhalt:
Ein Mitarbeiter hat wiederholt ohne Entschuldigung Arbeitszeiten nicht eingehalten (Verspätungen).

Rahmenbedingungen:
- Länge: ca. 200 Wörter
- Struktur: Datum & Anschrift → Betreff → Sachverhalt (konkrete Vorfälle mit Datum-Platzhaltern) → Aufforderung zur Unterlassung → Frist & Konsequenzen → Unterschrift
- Sprachstil: Sachlich, formal, ohne persönliche Wertungen
- Perspektive: Wir-Perspektive (Arbeitgeber)
- Anredeform: formal (Sie)
- Format: Formeller Geschäftsbrief
- Keine Emojis
- Disclaimer: „Dieser Entwurf ersetzt keine Rechtsberatung. Bitte vor Versand anwaltlich prüfen lassen."`,
  },

  // ── Bildung ───────────────────────────────────────────────────────────────

  {
    id: 'ex-unterrichtsplan-ki',
    title: 'Unterrichtsplan: Einführung KI (Klasse 9)',
    category: 'Bildung',
    lang: 'de',
    text: `Du bist ein erfahrener Informatiklehrer und Pädagoge.

Erstelle einen detaillierten Unterrichtsplan für:
„Einführung in Künstliche Intelligenz" – was ist KI und wie funktioniert sie?

Klasse: 9. Jahrgangsstufe, Fach Informatik / Digitale Bildung
Dauer: 45 Minuten (1 Schulstunde)

Lernziele: Die Schülerinnen und Schüler können erklären, was KI ist, und nennen 3 konkrete Alltagsbeispiele.

Rahmenbedingungen:
- Format: Tabellarischer Verlaufsplan mit Spalten: Phase / Zeit / Inhalt / Methode / Materialien
- Phasen: Einstieg (Impuls/Provokation) → Erarbeitung (Gruppenarbeit) → Sicherung (Präsentation) → Abschluss (Reflexion)
- Differenzierungshinweis für Schnell- und Langsamlernende
- Sprachstil: Sachlich, klar, praxisorientiert
- Format: strukturiert, mit klaren Abschnittsüberschriften`,
  },

  {
    id: 'ex-elternbrief-ausflug',
    title: 'Elternbrief: Schulausflug Ankündigung',
    category: 'Bildung',
    lang: 'de',
    text: `Du bist eine Klassenlehrerin einer Grundschule.

Schreibe einen freundlichen, klar strukturierten Elternbrief für:
„Schulausflug ins Naturkundemuseum"

Informationen:
- Klasse: 4a
- Datum: [Datum einfügen]
- Abfahrt: 8:00 Uhr am Schulhof, Rückkehr: ca. 15:30 Uhr
- Kosten: 8 € (Eintritt + Bus), bitte in einem Umschlag mit Namen bis [Datum] abgeben
- Mitzubringen: Lunchpaket, Getränk, wetterfeste Kleidung
- Begleitung: 2 Elternteile als Begleitung gesucht

Rahmenbedingungen:
- Länge: ca. 120 Wörter
- Format: Datum + Anschrift → Betreff → kurzer Einleitungssatz → Infos übersichtlich → Rückmeldeschnipsel am Ende
- Sprachstil: Freundlich, klar, informativ – keine Behördensprache
- Perspektive: Wir-Perspektive
- Anredeform: formal (Sehr geehrte Eltern)`,
  },

  // ── E-Commerce ────────────────────────────────────────────────────────────

  {
    id: 'ex-kategorie-laufschuhe',
    title: 'Kategoriebeschreibung: Laufschuhe & Trail-Running',
    category: 'E-Commerce',
    lang: 'de',
    text: `Du bist ein erfahrener E-Commerce-SEO-Texter.

Schreibe eine SEO-optimierte Kategoriebeschreibung für:
„Laufschuhe & Trail-Running" – Kategorie in einem Outdoor-Sport-Shop

Zielgruppe: Hobbyläufer und ambitionierte Sportler (25–45 Jahre), die Wert auf Qualität und Passform legen.

Rahmenbedingungen:
- Länge: ca. 200 Wörter
- Format: 1–2 Einleitungssätze (nutzenorientiert) → kurzer Fließtext → 3 USPs als Bullet Points → abschließender CTA-Satz
- Sprachstil: Werblich, sportlich-enthusiastisch, authentisch
- Perspektive: Wir-Perspektive
- Anredeform: Du-Form
- Keine Emojis
- SEO-Keywords organisch einbauen: „Laufschuhe kaufen", „Trailrunning-Schuhe", „Outdoor-Laufschuhe"
- Erstelle auch einen H1-Titel für die Kategorienseite`,
  },

  {
    id: 'ex-versandbestaetigung-bio',
    title: 'Versandbestätigung: Bio-Shop persönlich',
    category: 'E-Commerce',
    lang: 'de',
    text: `Du bist ein erfahrener E-Commerce-Manager eines kleinen Bio-Shops.

Schreibe eine freundliche, persönliche Versandbestätigungs-E-Mail für:
Shop: „NaturGut Bio – Direkt vom Erzeuger"

Bestellte Produkte: Bio-Gemüsekiste (wöchentlich) + Bio-Kräuteröl
Lieferzeit: 2–3 Werktage
Tracking-Link vorhanden: Ja (Platzhalter: {{TrackingLink}})
Kundenvariable: {{Vorname}}

Rahmenbedingungen:
- Länge: ca. 110 Wörter
- Aufbau: Betreff → herzliche Bestätigung → Bestelldetails (kurz) → Tracking-Hinweis → kleine persönliche Note / Dankeschön → Signatur
- Sprachstil: Persönlich, wertschätzend, als käme die E-Mail von einem echten Menschen
- Perspektive: Wir-Perspektive
- Anredeform: informell (Du)
- 1 Emoji an passender Stelle
- Erstelle auch eine Betreffzeile`,
  },

];

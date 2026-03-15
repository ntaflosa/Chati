'use strict';

/**
 * Chati – Example Prompt Library
 * Add new prompts by appending an object to the array – no backend needed.
 * Fields: id, title, category, lang ('de'|'en'), text
 */
const LIBRARY_EXAMPLES = [

  // ── Content ──────────────────────────────────────────────────────────────

  {
    id: 'ex-seo-blog-ki-alltag',
    title: 'SEO Blog-Post: KI-Tools im Alltag',
    category: 'Content',
    lang: 'de',
    text: 'Du bist ein erfahrener Content-Marketing-Experte und SEO-Texter.\n\nSchreibe einen SEO-optimierten Blog-Post zum Thema:\n\u201e5 KI-Tools, die Berufst\u00e4tige 2025 kennen sollten\u201c\n\nZielgruppe: Berufst\u00e4tige (30\u201350 Jahre) ohne tiefen technischen Hintergrund.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 800 W\u00f6rter\n- Format: Einleitung \u2192 5 Abschnitte mit H2-\u00dcberschriften \u2192 Fazit\n- Sprachstil: Sachlich, leicht verst\u00e4ndlich, ohne Fachjargon\n- Perspektive: Neutral/Objektiv \u00b7 Anredeform: Du-Form \u00b7 Keine Emojis\n- SEO-Keywords: \u201eKI-Tools\u201c, \u201eK\u00fcnstliche Intelligenz im B\u00fcro\u201c, \u201eProduktivit\u00e4t mit KI\u201c\n- Erstelle einen ansprechenden Titel und Untertitel',
  },

  {
    id: 'ex-seo-blog-ai-tools',
    title: 'SEO Blog Post: AI Tools for Professionals',
    category: 'Content',
    lang: 'en',
    text: 'You are an experienced content marketing expert and SEO copywriter.\n\nWrite an SEO-optimised blog post on the topic:\n"5 AI Tools Every Professional Should Know in 2025"\n\nTarget audience: Working professionals (30\u201350) with no deep technical background.\n\nGuidelines:\n- Length: approx. 800 words\n- Format: Introduction \u2192 5 sections with H2 headings \u2192 Conclusion\n- Style: Informative, jargon-free \u00b7 Perspective: Neutral/Objective \u00b7 No emojis\n- SEO keywords: "AI tools", "artificial intelligence at work", "productivity with AI"\n- Create an engaging title and subtitle',
  },

  {
    id: 'ex-howto-chatgpt',
    title: 'How-To: ChatGPT im Arbeitsalltag nutzen',
    category: 'Content',
    lang: 'de',
    text: 'Du bist ein erfahrener Ratgeber-Autor f\u00fcr digitale Produktivit\u00e4t.\n\nSchreibe eine praxisnahe Schritt-f\u00fcr-Schritt-Anleitung:\n\u201eWie man ChatGPT effektiv im Arbeitsalltag einsetzt \u2013 7 konkrete Tipps\u201c\n\nZielgruppe: B\u00fcrokr\u00e4fte und Selbst\u00e4ndige ohne KI-Vorkenntnisse.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 600 W\u00f6rter\n- Format: Kurze Einleitung \u2192 7 nummerierte Schritte mit je 2\u20133 S\u00e4tzen \u2192 kurzes Fazit\n- Sprachstil: Sachlich, motivierend, alltagsnah\n- Perspektive: Du-Perspektive \u00b7 Anredeform: Du-Form \u00b7 Keine Emojis\n- Erstelle einen klaren Titel mit Untertitel',
  },

  {
    id: 'ex-howto-chatgpt-en',
    title: 'How-To: Using ChatGPT at Work',
    category: 'Content',
    lang: 'en',
    text: 'You are an experienced guide author for digital productivity.\n\nWrite a practical step-by-step guide:\n"How to Use ChatGPT Effectively at Work \u2013 7 Concrete Tips"\n\nTarget audience: Office workers and freelancers with no AI experience.\n\nGuidelines:\n- Length: approx. 600 words\n- Format: Short introduction \u2192 7 numbered steps with 2\u20133 sentences each \u2192 brief conclusion\n- Style: Informative, motivating, practical\n- Perspective: Second person (you) \u00b7 Informal \u00b7 No emojis\n- Create a clear title with subtitle',
  },

  {
    id: 'ex-case-study',
    title: 'Case Study: Erfolgsgeschichte Kunde',
    category: 'Content',
    lang: 'de',
    text: 'Du bist ein erfahrener B2B-Content-Autor.\n\nSchreibe eine \u00fcberzeugende Case Study:\n- Kunde: [Kundenname/Branche]\n- Problem: [Herausforderung des Kunden]\n- L\u00f6sung: [Dein Produkt/Service]\n- Ergebnis: [Messbare Kennzahlen]\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 700 W\u00f6rter\n- Struktur: Titel \u2192 Ausgangssituation \u2192 Herausforderung \u2192 L\u00f6sung \u2192 Ergebnisse & Kennzahlen \u2192 Zitat des Kunden \u2192 Fazit\n- Sprachstil: Sachlich, faktenbasiert, mit narrativem Einstieg\n- Perspektive: Er-/Sie-Perspektive \u00b7 Anredeform: formal \u00b7 Keine Emojis\n- Erstelle Titel und Untertitel',
  },

  {
    id: 'ex-case-study-en',
    title: 'Case Study: Customer Success Story',
    category: 'Content',
    lang: 'en',
    text: 'You are an experienced B2B content author.\n\nWrite a compelling case study:\n- Client: [Client name/industry]\n- Problem: [Client\'s challenge]\n- Solution: [Your product/service]\n- Result: [Measurable metrics]\n\nGuidelines:\n- Length: approx. 700 words\n- Structure: Title \u2192 Background \u2192 Challenge \u2192 Solution \u2192 Results & Metrics \u2192 Client quote \u2192 Conclusion\n- Style: Factual, data-driven, with a narrative opening\n- Perspective: Third person \u00b7 Formal tone \u00b7 No emojis\n- Create title and subtitle',
  },

  // ── Social Media ─────────────────────────────────────────────────────────

  {
    id: 'ex-linkedin-remote',
    title: 'LinkedIn-Post: Learnings aus Remote-Arbeit',
    category: 'Social Media',
    lang: 'de',
    text: 'Du bist ein erfahrener LinkedIn-Content-Creator.\n\nSchreibe einen authentischen, pers\u00f6nlichen LinkedIn-Post:\n\u201eWas ich nach 3 Jahren Remote-Arbeit gelernt habe\u201c\n\nZielgruppe: Manager und Fachkr\u00e4fte, die remote arbeiten oder Teams f\u00fchren.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 150 W\u00f6rter\n- Format: Starker Hook \u2192 3\u20134 kurze Abs\u00e4tze \u2192 Abschlussfrage an die Community\n- Sprachstil: Pers\u00f6nlich, reflektierend, ehrlich \u2013 keine Corporate-Floskeln\n- Perspektive: Ich-Perspektive \u00b7 Anredeform: informell \u00b7 2\u20133 Emojis gezielt einsetzen',
  },

  {
    id: 'ex-linkedin-remote-en',
    title: 'LinkedIn Post: Lessons from Remote Work',
    category: 'Social Media',
    lang: 'en',
    text: 'You are an experienced LinkedIn content creator.\n\nWrite an authentic, personal LinkedIn post:\n"What 3 Years of Remote Work Taught Me"\n\nTarget audience: Managers and professionals who work remotely or lead distributed teams.\n\nGuidelines:\n- Length: approx. 150 words\n- Format: Strong hook \u2192 3\u20134 short paragraphs \u2192 closing question to the community\n- Style: Personal, reflective, honest \u2013 no corporate jargon\n- Perspective: First person (I) \u00b7 Informal \u00b7 2\u20133 emojis used deliberately',
  },

  {
    id: 'ex-instagram-produkt',
    title: 'Instagram-Caption: Produktlaunch',
    category: 'Social Media',
    lang: 'de',
    text: 'Du bist ein kreativer Social-Media-Manager.\n\nSchreibe eine mitrei\u00dfende Instagram-Caption f\u00fcr den Launch eines neuen Produkts:\n[Produktname und kurze Beschreibung einf\u00fcgen]\n\nZielgruppe: Lifestyle-affine Millennials (25\u201335 Jahre).\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 80\u2013100 W\u00f6rter\n- Format: Emotionaler Einstieg \u2192 kurze Beschreibung \u2192 CTA (Link in Bio)\n- Sprachstil: Informell, einladend, leicht werblich\n- Perspektive: Wir-Perspektive \u00b7 Anredeform: informell\n- 5\u20137 passende Emojis \u00b7 5 relevante Hashtags am Ende',
  },

  {
    id: 'ex-instagram-launch-en',
    title: 'Instagram Caption: Product Launch',
    category: 'Social Media',
    lang: 'en',
    text: 'You are a creative social media manager.\n\nWrite a compelling Instagram caption for the launch of a new product:\n[Insert product name and short description]\n\nTarget audience: Lifestyle-conscious Millennials (25\u201335).\n\nGuidelines:\n- Length: approx. 80\u2013100 words\n- Format: Emotional opening \u2192 short description \u2192 CTA (link in bio)\n- Style: Informal, inviting, slightly promotional\n- Perspective: We (brand voice) \u00b7 Informal address\n- 5\u20137 relevant emojis \u00b7 5 hashtags at the end (mix of broad and niche)',
  },

  // ── Marketing ────────────────────────────────────────────────────────────

  {
    id: 'ex-produktbeschreibung-shop',
    title: 'Produktbeschreibung: Ergonomischer B\u00fcrostuhl',
    category: 'Marketing',
    lang: 'de',
    text: 'Du bist ein erfahrener E-Commerce-Texter.\n\nSchreibe eine \u00fcberzeugende, SEO-optimierte Produktbeschreibung f\u00fcr:\n\u201eErgonomischer B\u00fcrostuhl \u2013 Modell ErgoFlex Pro\u201c\n\nZielgruppe: Home-Office-Nutzer und B\u00fcroangestellte.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 200 W\u00f6rter\n- Format: Einleitungssatz (nutzenorientiert) \u2192 5 Vorteile als Bullet Points \u2192 CTA-Satz\n- Sprachstil: Werblich, seri\u00f6s und faktenbasiert\n- Perspektive: Du-Perspektive \u00b7 Anredeform: informell \u00b7 Keine Emojis\n- SEO-Keywords: \u201eergonomischer B\u00fcrostuhl\u201c, \u201eR\u00fcckenschmerzen vermeiden\u201c, \u201eHome-Office Stuhl\u201c\n- Kurzen, klickstarken Produkttitel miterstellen',
  },

  {
    id: 'ex-product-description-en',
    title: 'Product Description: Ergonomic Office Chair',
    category: 'Marketing',
    lang: 'en',
    text: 'You are an experienced e-commerce copywriter.\n\nWrite a compelling, SEO-optimised product description for:\n"Ergonomic Office Chair \u2013 Model ErgoFlex Pro"\n\nTarget audience: Home office users and office workers who sit for long hours.\n\nGuidelines:\n- Length: approx. 200 words\n- Format: Opening sentence (benefit-focused) \u2192 5 benefits as bullet points \u2192 closing CTA\n- Style: Promotional, credible, fact-based\n- Perspective: Second person (you) \u00b7 Informal \u00b7 No emojis\n- SEO keywords: "ergonomic office chair", "back pain prevention", "home office chair"\n- Also create a short, click-worthy product title',
  },

  {
    id: 'ex-landing-page-kurs',
    title: 'Landing Page: Online-Kurs Produktivit\u00e4t mit KI',
    category: 'Marketing',
    lang: 'de',
    text: 'Du bist ein erfahrener Copywriter und Conversion-Optimierer.\n\nSchreibe einen \u00fcberzeugenden Landing-Page-Text f\u00fcr:\n\u201eOnline-Kurs: In 7 Tagen produktiver mit KI \u2013 f\u00fcr Selbst\u00e4ndige & KMUs\u201c\n\nZielgruppe: Selbst\u00e4ndige und Inhaber kleiner Unternehmen.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 350 W\u00f6rter\n- Struktur: Headline \u2192 Problem (Schmerzpunkt) \u2192 Versprechen (L\u00f6sung) \u2192 3 Vorteile als Bullet Points \u2192 Sozialer Beweis (Platzhalter) \u2192 CTA-Button-Text\n- Sprachstil: Direkt, motivierend, ohne Fachjargon\n- Perspektive: Du-Perspektive \u00b7 Anredeform: Du-Form \u00b7 Keine Emojis\n- SEO-Keywords: \u201eKI Produktivit\u00e4t\u201c, \u201eOnline-Kurs KI\u201c\n- Hauptschlagzeile + 2 Alternativen erstellen',
  },

  {
    id: 'ex-landing-page-en',
    title: 'Landing Page: Online Course \u2013 Productivity with AI',
    category: 'Marketing',
    lang: 'en',
    text: 'You are an experienced copywriter and conversion optimiser.\n\nWrite a compelling landing page for:\n"Online Course: Become More Productive with AI in 7 Days \u2013 for Freelancers & SMEs"\n\nTarget audience: Freelancers and small business owners.\n\nGuidelines:\n- Length: approx. 350 words\n- Structure: Punchy headline \u2192 Problem (pain point) \u2192 Promise (solution) \u2192 3 benefits as bullet points \u2192 Social proof (placeholder) \u2192 CTA button text\n- Style: Direct, motivating, jargon-free\n- Perspective: Second person (you) \u00b7 Informal \u00b7 No emojis\n- SEO keywords: "AI productivity", "AI online course"\n- Provide main headline + 2 alternatives',
  },

  // ── E-Mail ───────────────────────────────────────────────────────────────

  {
    id: 'ex-kaltakquise-beratung',
    title: 'Kaltakquise-E-Mail: KI-Beratung B2B',
    category: 'E-Mail',
    lang: 'de',
    text: 'Du bist ein erfahrener B2B-Sales-Profi.\n\nSchreibe eine kurze Kaltakquise-E-Mail f\u00fcr:\n\u201eKI-Beratung & Implementierung f\u00fcr mittelst\u00e4ndische Unternehmen\u201c\n\nZielgruppe: Gesch\u00e4ftsf\u00fchrer und IT-Leiter (50\u2013200 Mitarbeiter).\n\nRahmenbedingungen:\n- L\u00e4nge: max. 150 W\u00f6rter (excl. Betreff und Signatur)\n- Aufbau: Betreffzeile (A/B-Variante) \u2192 pers\u00f6nliche Ansprache \u2192 konkreter Nutzen in 2 S\u00e4tzen \u2192 CTA (15-Min.-Call)\n- Sprachstil: Professionell, direkt, nutzenorientiert \u2013 kein Spam-Ton\n- Perspektive: Ich-Perspektive \u00b7 Anredeform: formal (Sie) \u00b7 Keine Emojis\n- 2 alternative Betreffzeilen erstellen',
  },

  {
    id: 'ex-cold-email-en',
    title: 'Cold Outreach Email: AI Consulting B2B',
    category: 'E-Mail',
    lang: 'en',
    text: 'You are an experienced B2B sales professional.\n\nWrite a short cold outreach email for:\n"AI Consulting & Implementation for Mid-Sized Businesses"\n\nTarget audience: CEOs and IT directors at companies with 50\u2013200 employees.\n\nGuidelines:\n- Length: max. 150 words (excluding subject line and signature)\n- Structure: Subject line (A/B variant) \u2192 personal greeting \u2192 concrete benefit in 2 sentences \u2192 CTA (15-min call)\n- Style: Professional, direct, benefit-focused \u2013 no spammy tone\n- Perspective: First person (I) \u00b7 Formal address \u00b7 No emojis\n- Provide 2 alternative subject lines',
  },

  {
    id: 'ex-onboarding-saas',
    title: 'Onboarding-E-Mail: SaaS-App neue Nutzer',
    category: 'E-Mail',
    lang: 'de',
    text: 'Du bist ein erfahrener Customer-Success-Manager.\n\nSchreibe eine freundliche Onboarding-E-Mail f\u00fcr neue Nutzer von \u201eTaskFlow\u201c.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 130 W\u00f6rter\n- Aufbau: Herzlicher Willkommensgru\u00df \u2192 3 erste Schritte (nummeriert) \u2192 Hinweis auf Help Center \u2192 motivierender Abschluss\n- Sprachstil: Pers\u00f6nlich, einladend, wie von einem echten Menschen\n- Perspektive: Wir-Perspektive \u00b7 Anredeform: informell \u00b7 1\u20132 Emojis\n- Betreffzeile mitliefern \u00b7 Platzhalter: {{Vorname}}',
  },

  {
    id: 'ex-onboarding-saas-en',
    title: 'Onboarding Email: SaaS App New Users',
    category: 'E-Mail',
    lang: 'en',
    text: 'You are an experienced customer success manager.\n\nWrite a friendly onboarding email for new users of "TaskFlow".\n\nGuidelines:\n- Length: approx. 130 words\n- Structure: Warm welcome \u2192 3 first steps (numbered) \u2192 note about Help Center \u2192 motivating close\n- Style: Personal, inviting, as if from a real person\n- Perspective: We (brand voice) \u00b7 Informal \u00b7 1\u20132 emojis\n- Include subject line \u00b7 Placeholder: {{FirstName}}',
  },

  // ── Business ─────────────────────────────────────────────────────────────

  {
    id: 'ex-stellenanzeige-ux',
    title: 'Stellenanzeige: Junior UX/UI Designer remote',
    category: 'Business',
    lang: 'de',
    text: 'Du bist ein erfahrener HR-Texter f\u00fcr moderne Tech-Unternehmen.\n\nSchreibe eine ansprechende Stellenanzeige f\u00fcr:\n\u201eJunior UX/UI Designer (m/w/d) \u2013 remote, Vollzeit\u201c\n\nUnternehmen: Junges SaaS-Startup, 20 Mitarbeiter.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 350 W\u00f6rter\n- Struktur: Unternehmensvorstellung \u2192 Aufgaben (Bullet Points) \u2192 Anforderungen (Must have / Nice to have) \u2192 Was wir bieten \u2192 CTA\n- Sprachstil: Authentisch, modern \u2013 keine trockene Kanzleisprache\n- Perspektive: Wir-Perspektive \u00b7 Anredeform: Du-Form \u00b7 1\u20132 Emojis\n- Klickstarken Jobtitel + Untertitel erstellen',
  },

  {
    id: 'ex-job-posting-en',
    title: 'Job Posting: Junior UX/UI Designer (Remote)',
    category: 'Business',
    lang: 'en',
    text: 'You are an experienced HR copywriter for modern tech companies.\n\nWrite an engaging job posting for:\n"Junior UX/UI Designer \u2013 Remote, Full-Time"\n\nCompany: Young SaaS startup, 20 employees.\n\nGuidelines:\n- Length: approx. 350 words\n- Structure: Company intro \u2192 responsibilities (bullet points) \u2192 requirements (Must have / Nice to have) \u2192 What we offer \u2192 CTA\n- Style: Authentic, modern \u2013 no dry corporate language\n- Perspective: We (brand voice) \u00b7 Informal (you) \u00b7 1\u20132 subtle emojis\n- Create an attention-grabbing job title + subtitle',
  },

  {
    id: 'ex-proposal-website',
    title: 'Angebot/Proposal: Website-Relaunch',
    category: 'Business',
    lang: 'de',
    text: 'Du bist ein erfahrener Freelancer/Agentur-Berater.\n\nErstelle ein professionelles Proposal f\u00fcr:\n\u201eWebsite-Relaunch inklusive SEO-Optimierung\u201c\n\nKunde: Regionaler Handwerksbetrieb, 12 Mitarbeiter.\nLeistungsumfang: Konzept, Design, Entwicklung (WordPress), SEO, Schulung.\nPreis: 8.500 \u20ac netto \u00b7 Zeitplan: 6\u20138 Wochen.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 500 W\u00f6rter\n- Struktur: Einleitung \u2192 Leistungsumfang \u2192 Projektphasen & Zeitplan \u2192 Investition \u2192 N\u00e4chste Schritte\n- Sprachstil: Professionell, vertrauensbildend, klar und konkret\n- Perspektive: Wir-Perspektive \u00b7 Anredeform: formal (Sie) \u00b7 Keine Emojis',
  },

  {
    id: 'ex-proposal-website-en',
    title: 'Business Proposal: Website Relaunch',
    category: 'Business',
    lang: 'en',
    text: 'You are an experienced freelancer/agency consultant.\n\nCreate a professional proposal for:\n"Website Relaunch including SEO Optimisation"\n\nClient: Regional trades business, 12 employees.\nScope: Concept, design, development (WordPress), SEO setup, training.\nPrice: \u20ac8,500 net \u00b7 Timeline: 6\u20138 weeks.\n\nGuidelines:\n- Length: approx. 500 words\n- Structure: Introduction \u2192 Scope of work \u2192 Project phases & timeline \u2192 Investment \u2192 Next steps\n- Style: Professional, trust-building, clear and specific\n- Perspective: We (agency voice) \u00b7 Formal address \u00b7 No emojis',
  },

  // ── Medizin ──────────────────────────────────────────────────────────────

  {
    id: 'ex-patienteninfo-diabetes',
    title: 'Patienteninformation: Typ-2-Diabetes & Ern\u00e4hrung',
    category: 'Medizin',
    lang: 'de',
    text: 'Du bist ein erfahrener medizinischer Fachautor (kein Ersatz f\u00fcr \u00e4rztliche Beratung).\n\nSchreibe eine verst\u00e4ndliche Patienteninformation:\n\u201eTyp-2-Diabetes: Ern\u00e4hrung und Lebensstil im \u00dcberblick\u201c\n\nZielgruppe: Patienten (40\u201365 Jahre) ohne medizinischen Hintergrund.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 400 W\u00f6rter\n- Format: Einleitung \u2192 3\u20134 Abschnitte mit H3-\u00dcberschriften \u2192 Abschluss mit Arzt-Hinweis\n- Sprachstil: Sachlich, empathisch, ohne Fachjargon\n- Perspektive: Neutral/Objektiv \u00b7 Anredeform: formal (Sie) \u00b7 Keine Emojis\n- Disclaimer am Ende: \u201eDieser Text ersetzt keine \u00e4rztliche Beratung.\u201c',
  },

  {
    id: 'ex-patient-info-en',
    title: 'Patient Information: Type 2 Diabetes & Diet',
    category: 'Medizin',
    lang: 'en',
    text: 'You are an experienced medical content author (not a substitute for medical advice).\n\nWrite clear patient information:\n"Type 2 Diabetes: Diet and Lifestyle Overview"\n\nTarget audience: Patients (40\u201365) with no medical background who have recently been diagnosed.\n\nGuidelines:\n- Length: approx. 400 words\n- Format: Introduction \u2192 3\u20134 sections with H3 headings \u2192 closing note about medical supervision\n- Style: Informative, empathetic, jargon-free\n- Perspective: Neutral/Objective \u00b7 Formal address \u00b7 No emojis\n- Disclaimer: "This text does not replace professional medical advice."',
  },

  // ── Recht ─────────────────────────────────────────────────────────────────

  {
    id: 'ex-datenschutz-website',
    title: 'Datenschutzerkl\u00e4rung: Einfache Firmen-Website',
    category: 'Recht',
    lang: 'de',
    text: 'Du bist ein erfahrener Rechtstextautor (kein Rechtsanwalt \u2013 kein Rechtsrat).\n\nErstelle einen Entwurf f\u00fcr eine Datenschutzerkl\u00e4rung f\u00fcr:\nEinfache Firmen-Website mit Kontaktformular, Google Analytics, Google Maps.\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 700 W\u00f6rter\n- Struktur nach DSGVO: Verantwortlicher \u2192 Datenerfassung \u2192 Kontaktformular \u2192 Analyse-Tools \u2192 Externe Dienste \u2192 Rechte der Nutzer \u2192 Kontaktm\u00f6glichkeit\n- Sprachstil: Formal, pr\u00e4zise, verst\u00e4ndlich\n- Perspektive: Wir-Perspektive \u00b7 Format: strukturierte \u00dcberschriften\n- Platzhalter: [Firmenname], [Adresse], [E-Mail]\n- Hinweis am Ende: \u201eDieser Entwurf ersetzt keine rechtliche Pr\u00fcfung.\u201c',
  },

  {
    id: 'ex-privacy-policy-en',
    title: 'Privacy Policy: Simple Business Website',
    category: 'Recht',
    lang: 'en',
    text: 'You are an experienced legal content author (not a lawyer \u2013 not legal advice).\n\nCreate a draft privacy policy for:\nA simple business website with contact form, Google Analytics, and embedded Google Maps.\n\nGuidelines:\n- Length: approx. 700 words\n- GDPR-compliant structure: Data controller \u2192 Data collection \u2192 Contact form \u2192 Analytics \u2192 Third-party services \u2192 User rights \u2192 Contact for data requests\n- Style: Formal, precise, clear\n- Perspective: We (company voice) \u00b7 Structured headings\n- Placeholders: [Company Name], [Address], [Email]\n- Disclaimer: "This draft does not replace professional legal review."',
  },

  // ── Bildung ───────────────────────────────────────────────────────────────

  {
    id: 'ex-unterrichtsplan-ki',
    title: 'Unterrichtsplan: Einf\u00fchrung KI (Klasse 9)',
    category: 'Bildung',
    lang: 'de',
    text: 'Du bist ein erfahrener Informatiklehrer und P\u00e4dagoge.\n\nErstelle einen Unterrichtsplan f\u00fcr:\n\u201eEinf\u00fchrung in K\u00fcnstliche Intelligenz\u201c\n\nKlasse: 9. Jahrgangsstufe \u00b7 Dauer: 45 Minuten\n\nLernziele: Sch\u00fcler k\u00f6nnen erkl\u00e4ren, was KI ist, und nennen 3 Alltagsbeispiele.\n\nRahmenbedingungen:\n- Format: Tabellarischer Verlaufsplan (Phase / Zeit / Inhalt / Methode / Materialien)\n- Phasen: Einstieg \u2192 Erarbeitung (Gruppenarbeit) \u2192 Sicherung (Pr\u00e4sentation) \u2192 Abschluss\n- Differenzierungshinweis f\u00fcr Schnell- und Langsamlernende\n- Sprachstil: Sachlich, klar, praxisorientiert',
  },

  {
    id: 'ex-lesson-plan-ai-en',
    title: 'Lesson Plan: Introduction to AI (Grade 9)',
    category: 'Bildung',
    lang: 'en',
    text: 'You are an experienced computer science teacher and educator.\n\nCreate a lesson plan for:\n"Introduction to Artificial Intelligence"\n\nClass: Grade 9 \u00b7 Duration: 45 minutes\n\nLearning objectives: Students can explain what AI is and name 3 everyday examples.\n\nGuidelines:\n- Format: Tabular lesson plan (Phase / Time / Content / Method / Materials)\n- Phases: Introduction \u2192 Exploration (group work) \u2192 Consolidation (presentation) \u2192 Closing (reflection)\n- Differentiation note for fast and slow learners\n- Style: Clear, factual, practical',
  },

  // ── E-Commerce ────────────────────────────────────────────────────────────

  {
    id: 'ex-kategorie-laufschuhe',
    title: 'Kategoriebeschreibung: Laufschuhe & Trail-Running',
    category: 'E-Commerce',
    lang: 'de',
    text: 'Du bist ein erfahrener E-Commerce-SEO-Texter.\n\nSchreibe eine SEO-optimierte Kategoriebeschreibung f\u00fcr:\n\u201eLaufschuhe & Trail-Running\u201c \u2013 Outdoor-Sport-Shop\n\nZielgruppe: Hobbyl\u00e4ufer und Sportler (25\u201345 Jahre).\n\nRahmenbedingungen:\n- L\u00e4nge: ca. 200 W\u00f6rter\n- Format: 1\u20132 Einleitungss\u00e4tze \u2192 Flie\u00dftext \u2192 3 USPs als Bullet Points \u2192 CTA-Satz\n- Sprachstil: Werblich, sportlich-enthusiastisch, authentisch\n- Perspektive: Wir-Perspektive \u00b7 Anredeform: Du-Form \u00b7 Keine Emojis\n- SEO-Keywords: \u201eLaufschuhe kaufen\u201c, \u201eTrailrunning-Schuhe\u201c, \u201eOutdoor-Laufschuhe\u201c\n- H1-Titel f\u00fcr die Kategorienseite miterstellen',
  },

  {
    id: 'ex-category-running-en',
    title: 'Category Description: Running Shoes & Trail Running',
    category: 'E-Commerce',
    lang: 'en',
    text: 'You are an experienced e-commerce SEO copywriter.\n\nWrite an SEO-optimised category description for:\n"Running Shoes & Trail Running" \u2013 outdoor sports store\n\nTarget audience: Hobby runners and athletes (25\u201345).\n\nGuidelines:\n- Length: approx. 200 words\n- Format: 1\u20132 opening sentences \u2192 body text \u2192 3 USPs as bullet points \u2192 CTA sentence\n- Style: Promotional, sporty-enthusiastic, authentic\n- Perspective: We (store voice) \u00b7 Informal address \u00b7 No emojis\n- SEO keywords: "buy running shoes", "trail running shoes", "outdoor running shoes"\n- Also create an H1 title for the category page',
  },

];

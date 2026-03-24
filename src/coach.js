// Mini-Prompt-Coach per-field tips — no DOM, no side-effects.

export const COACH_DATA = {
  de: {
    'role-definition': {
      why: 'Die KI-Persona ist der wirksamste Prompt-Trick überhaupt: Sie gibt der KI einen konkreten Expertenstatus, eine klare Perspektive und den richtigen Ton.',
      bad: 'Schreibe einen Artikel über gesunde Ernährung.',
      good: 'Du bist ein zertifizierter Ernährungsberater mit 8 Jahren Erfahrung in der Sportmedizin. Schreibe einen Artikel über gesunde Ernährung.',
    },
    'content-type': {
      why: 'Der Texttyp definiert Format, Struktur und Länge der KI-Ausgabe. Ohne ihn liefert die KI generische Ergebnisse statt einem gezielten Format.',
      bad: 'Schreibe etwas über unser neues Produkt.',
      good: 'Erstelle eine Pressemitteilung über unser neues Produkt.',
    },
    'description': {
      why: 'Je konkreter das Thema, desto relevanter die Ausgabe. Vage Themen führen zu generischen Texten ohne echten Mehrwert.',
      bad: 'Schreibe über KI.',
      good: 'Das Thema lautet: 5 praktische KI-Tools für Marketing-Manager im B2B-Bereich – mit konkreten Anwendungsbeispielen und ROI-Tipps.',
    },
    'target-audience': {
      why: 'Die Zielgruppe steuert Vokabular, Komplexität und Relevanz. Ohne sie schreibt die KI für niemanden konkret.',
      bad: 'Erkläre was Cloud Computing ist.',
      good: 'Erkläre was Cloud Computing ist. Zielgruppe: Senioren (50+) ohne technisches Vorwissen.',
    },
    'content-length': {
      why: 'Ohne Längenvorgabe ignoriert die KI den Kontext und produziert oft zu lange oder zu kurze Texte.',
      bad: 'Schreibe eine Produktbeschreibung.',
      good: 'Schreibe eine Produktbeschreibung. Textlänge: Kurz (100–300 Wörter).',
    },
    'language-style': {
      why: 'Der Sprachstil entscheidet, ob dein Text verkauft, informiert oder überzeugt. Gleicher Inhalt – völlig andere Wirkung.',
      bad: 'Schreibe einen LinkedIn-Post über unsere neue App.',
      good: 'Schreibe einen LinkedIn-Post über unsere neue App. Sprachstil: Inspirierend.',
    },
    'beispiel': {
      why: 'Eine Stilreferenz ist wie ein Fingerabdruck für die KI – sie adaptiert deinen einzigartigen Schreibstil statt generischer Formulierungen zu verwenden.',
      bad: 'Schreibe wie ein Profi.',
      good: 'Orientiere dich an folgendem Beispiel und übernimm Tonalität und Satzstruktur: [Beispieltext hier einfügen]',
    },
  },
  en: {
    'role-definition': {
      why: 'The AI persona is the most powerful prompt technique: it gives the AI a concrete expert status, a clear perspective and the right tone.',
      bad: 'Write an article about healthy eating.',
      good: 'You are a certified nutritionist with 8 years of experience in sports medicine. Write an article about healthy eating.',
    },
    'content-type': {
      why: 'The content type fundamentally defines the format, structure, and length of the AI output. Without it, AI delivers generic results.',
      bad: 'Write something about our new product.',
      good: 'Create a press release about our new product.',
    },
    'description': {
      why: 'The more specific the topic, the more relevant the output. Vague topics lead to generic texts with no real value.',
      bad: 'Write about AI.',
      good: 'Topic: 5 practical AI tools for B2B marketing managers — with concrete use cases and ROI tips.',
    },
    'target-audience': {
      why: 'The target audience controls vocabulary, complexity and relevance. Without it, the AI writes for no one specific.',
      bad: 'Explain what cloud computing is.',
      good: 'Explain what cloud computing is. Target audience: seniors (50+) with no technical background.',
    },
    'content-length': {
      why: 'Without a length specification, the AI ignores context and often produces texts that are too long or too short.',
      bad: 'Write a product description.',
      good: 'Write a product description. Length: short (100–300 words).',
    },
    'language-style': {
      why: 'The language style decides whether your text sells, informs or persuades. Same content — completely different impact.',
      bad: 'Write a LinkedIn post about our new app.',
      good: 'Write a LinkedIn post about our new app. Style: inspiring.',
    },
    'beispiel': {
      why: 'A style reference is like a fingerprint for the AI — it adapts your unique writing style instead of using generic formulations.',
      bad: 'Write like a pro.',
      good: 'Follow this example and adopt its tone and sentence structure: [insert example text here]',
    },
  },
};


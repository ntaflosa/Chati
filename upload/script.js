'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM ───────────────────────────────────────────────────────────────────
  const livePrompt      = document.getElementById('live-prompt');
  const promptStatus    = document.getElementById('prompt-status');
  const wordCount       = document.getElementById('word-count');
  const scoreDots       = document.getElementById('score-dots');
  const scoreCounter    = document.getElementById('score-counter');
  const modalPromptText = document.getElementById('modal-prompt-text');
  const btnCopy         = document.getElementById('btn-copy');
  const btnShow         = document.getElementById('btn-show');
  const btnExport       = document.getElementById('btn-export');
  const btnVariations   = document.getElementById('btn-variations');
  const btnHelp         = document.getElementById('btn-help');
  const btnReset        = document.getElementById('btn-reset');
  const btnShare        = document.getElementById('btn-share');
  const btnUiLang       = document.getElementById('btn-ui-lang');
  const uiLangLabel     = document.getElementById('ui-lang-label');
  const btnDarkMode     = document.getElementById('btn-dark-mode');
  const darkModeIcon    = document.getElementById('dark-mode-icon');
  const btnToggleAll    = document.getElementById('btn-toggle-all');
  const toggleAllIcon   = document.getElementById('toggle-all-icon');
  const toggleAllLabel  = document.getElementById('toggle-all-label');
  const modalBtnCopy    = document.getElementById('modal-btn-copy');
  const catalogGrid     = document.getElementById('catalog-grid');
  const catalogFilters  = document.getElementById('catalog-filters');
  const catalogToggle   = document.getElementById('catalog-toggle');
  const catalogBody     = document.getElementById('catalog-body');
  const catalogChevron  = document.getElementById('catalog-chevron');
  const previewTabs     = document.getElementById('preview-tabs');
  const langToggle      = document.getElementById('lang-toggle');
  const historyList     = document.getElementById('history-list');
  const historyEmpty    = document.getElementById('history-empty');
  const btnSave         = document.getElementById('btn-save');
  const btnLibrary      = document.getElementById('btn-library');
  const libraryList     = document.getElementById('library-list');
  const libraryEmpty    = document.getElementById('library-empty');

  const promptModal      = new bootstrap.Modal(document.getElementById('promptModal'));
  const helpModal        = new bootstrap.Modal(document.getElementById('helpModal'));
  const variationsModal  = new bootstrap.Modal(document.getElementById('variationsModal'));
  const historyCanvas    = new bootstrap.Offcanvas(document.getElementById('historyOffcanvas'));
  const libraryCanvas    = new bootstrap.Offcanvas(document.getElementById('libraryOffcanvas'));
  const saveModal        = new bootstrap.Modal(document.getElementById('saveModal'));
  const copyToast      = new bootstrap.Toast(document.getElementById('copy-toast'),   { delay: 2500 });
  const shareToast     = new bootstrap.Toast(document.getElementById('share-toast'),  { delay: 2500 });
  const saveToast      = new bootstrap.Toast(document.getElementById('save-toast'),   { delay: 2500 });
  const openToast      = new bootstrap.Toast(document.getElementById('open-toast'),   { delay: 3000 });
  const importToast    = new bootstrap.Toast(document.getElementById('import-toast'), { delay: 2500 });
  const presetToast    = new bootstrap.Toast(document.getElementById('preset-toast'), { delay: 2000 });
  const undoToast      = new bootstrap.Toast(document.getElementById('undo-toast'),   { delay: 8000 });

  const qrModal          = new bootstrap.Modal(document.getElementById('qrModal'));
  const placeholderModal = new bootstrap.Modal(document.getElementById('placeholderModal'));

  // ── Constants ─────────────────────────────────────────────────────────────
  const FIELD_IDS = [
    'role-definition',
    'content-type', 'description', 'content-length', 'target-audience',
    'language-style', 'perspective', 'emoji-option', 'address-form',
    'formatting', 'seo-keyword-option', 'title-subtitle-option', 'beispiel',
  ];

  const LS_FORM_KEY      = 'chati_form';
  const LS_HISTORY_KEY   = 'chati_history';
  const LS_LIBRARY_KEY   = 'chati_library';
  const LS_PRESETS_KEY   = 'chati_presets';
  const LS_FAVORITES_KEY = 'chati_favorites';
  const LS_THEME_KEY     = 'chati_theme';
  const HISTORY_MAX     = 8;

  const val = (id) => (document.getElementById(id)?.value ?? '').trim();

  // ── Mappings ──────────────────────────────────────────────────────────────
  const LENGTH_MAP = {
    'Sehr kurz (50–100 Wörter)':  'Sehr kurz',
    'Kurz (100–300 Wörter)':      'Kurz',
    'Mittel (300–600 Wörter)':    'Mittel',
    'Lang (600–1.200 Wörter)':    'Lang',
    'Sehr lang (1.200+ Wörter)':  'Sehr lang',
  };

  const LENGTH_MAP_EN = {
    'Sehr kurz (50–100 Wörter)':  'very short (50–100 words)',
    'Kurz (100–300 Wörter)':      'short (100–300 words)',
    'Mittel (300–600 Wörter)':    'medium (300–600 words)',
    'Lang (600–1.200 Wörter)':    'long (600–1,200 words)',
    'Sehr lang (1.200+ Wörter)':  'very long (1,200+ words)',
  };

  const ADDRESS_MAP    = { formal: 'Sie-Form', informell: 'Du-Form', neutral: 'Neutral', kombiniert: 'Kombiniert' };
  const ADDRESS_MAP_EN = { formal: 'formal (Sie)', informell: 'informal (du)', neutral: 'neutral', kombiniert: 'mixed' };

  const FORMAT_MAP_EN = {
    'Fließtext':               'flowing prose',
    'Überschriften + Fließtext': 'headings with prose',
    'Bullet Points':           'bullet points',
    'Nummerierte Liste':       'numbered list',
    'Schritt-für-Schritt':     'step-by-step',
    'Tabellarisch':            'tabular layout',
    'Zitat':                   'quote format',
    'FAQ-Format (Frage & Antwort)': 'FAQ format (Q&A)',
    'Checkliste / Aufgabenliste':   'checklist / task list',
  };

  const STYLE_MAP_EN = {
    'Emotional': 'emotional', 'Empathisch': 'empathetic', 'Formell': 'formal',
    'Humorvoll': 'humorous', 'Informell': 'informal', 'Inspirierend': 'inspiring',
    'Journalistisch': 'journalistic', 'Minimalistisch': 'minimalist',
    'Motivierend': 'motivational', 'Persönlich': 'personal', 'Poetisch': 'poetic',
    'Provokativ': 'provocative', 'Sachlich': 'factual', 'Seriös': 'serious',
    'Storytelling': 'storytelling', 'Technisch': 'technical',
    'Umgangssprachlich': 'colloquial', 'Werblich': 'promotional',
    'Wissenschaftlich': 'scientific',
  };

  const AUDIENCE_MAP_EN = {
    'Jugendliche (16–25 Jahre)':        'teenagers and young adults (16–25)',
    'Junge Erwachsene (25–35 Jahre)':   'young adults (25–35)',
    'Berufstätige (30–50 Jahre)':       'working professionals (30–50)',
    'Eltern & Familien':                'parents and families',
    'Senioren (50+ Jahre)':             'seniors (50+)',
    'Gründer & Startups':               'founders and startups',
    'KMU-Inhaber & Selbstständige':     'SME owners and freelancers',
    'Manager & Führungskräfte':         'managers and executives',
    'B2B-Entscheider':                  'B2B decision-makers',
    'IT-Professionals':                 'IT professionals',
    'Technik & Digitales':              'tech enthusiasts',
    'Fitness & Gesundheit':             'fitness and health community',
    'Mode & Lifestyle':                 'fashion and lifestyle audience',
    'Finanzen & Investment':            'finance and investment community',
    'Bildung & Weiterbildung':          'education and learning community',
    'Schüler & Auszubildende (15–22 Jahre)': 'students and trainees (15–22)',
    'Kreative & Designer':              'creatives and designers',
    'Lehrkräfte & Pädagogen':           'teachers and educators',
    'Sport & Outdoor':                  'sports and outdoor enthusiasts',
    'Nachhaltigkeit & Umwelt':          'sustainability and environmental community',
  };

  const PERSPECTIVE_MAP_EN = {
    'Du-Perspektive': 'second person (you)',
    'Er-/Sie-Perspektive': 'third person',
    'Ich-Perspektive': 'first person (I)',
    'Neutral/Objektiv': 'neutral/objective',
    'Wir-Perspektive': 'first person plural (we)',
  };

  const ARTICLE_MAP = {
    'Artikel': 'einen ', 'Blog-Post': 'einen ', 'How-to-Anleitung': 'eine ', 'Listicle (Top-X-Artikel)': 'einen ',
    'Interview': 'ein ', 'Whitepaper': 'ein ', 'Case-Study': 'eine ',
    'Pressemitteilung': 'eine ', 'E-Book': 'ein ', 'Buchrezension': 'eine ', 'Zusammenfassung': 'eine ',
    'Facebook-Beitrag': 'einen ', 'Instagram-Beitrag': 'einen ',
    'Story-Skript (Instagram / Facebook)': 'ein ', 'Carousel-Post': 'einen ',
    'LinkedIn-Beitrag': 'einen ', 'Twitter-Beitrag': 'einen ',
    'TikTok-Skript': 'ein ', 'Reels-Skript': 'ein ',
    'Threads-Beitrag': 'einen ', 'Xing-Beitrag': 'einen ',
    'Produktbeschreibung': 'eine ', 'Verkaufstext / Sales Page': 'einen ', 'Produktvergleich': 'einen ',
    'FAQ-Seite': 'eine ', 'Anzeige': 'eine ', 'SEO-Text': 'einen ',
    'Newsletter': 'einen ', 'Landing Page': 'eine ',
    'E-Mail': 'eine ', 'Kaltakquise-E-Mail': 'eine ', 'Follow-up-E-Mail': 'eine ',
    'Onboarding-E-Mail': 'eine ', 'Kundenservice-Antwort': 'eine ',
    'Präsentation': 'eine ', 'Executive Summary': 'ein ', 'Bericht / Report': 'einen ',
    'Angebot / Proposal': 'ein ', 'Meeting-Protokoll': 'ein ',
    'Stellenanzeige': 'eine ', 'Bewerbungsschreiben': 'ein ',
    'YouTube-Video': 'ein ', 'YouTube-Short-Skript': 'ein ',
    'Podcast-Episode': 'eine ', 'Infografik': 'eine ',
    'Webinar': 'ein ', 'Live-Stream': 'einen ',
    'Slogan / Claim': 'einen ', 'Kurzgeschichte': 'eine ',
    'Gedicht / Lyrik': 'ein ', 'Drehbuch / Skript': 'ein ',
    'Online-Quiz': 'ein ', 'Chatbot': 'einen ', 'Online-Kurs': 'einen ',
    'Erfahrungsbericht': 'einen ', 'Checkliste': 'eine ', 'Glossar / Lexikon': 'ein ',
    'Produkttest / Review': 'einen ', 'Meta-Description (SEO)': 'eine ',
    'Einladungsschreiben': 'ein ', 'Dankes-E-Mail': 'eine ',
    'Unternehmensvorstellung': 'eine ', 'Vision & Mission Statement': 'ein ',
    'Produktname / Naming': 'ein ',
  };

  // ── Option label translations (value stays German key, display text translates) ──
  const OPTION_LABELS = {
    de: {
      'content-type': {
        '': 'Bitte wählen',
        'Artikel': 'Artikel', 'Blog-Post': 'Blog-Post', 'How-to-Anleitung': 'How-to-Anleitung',
        'Listicle (Top-X-Artikel)': 'Listicle (Top-X-Artikel)', 'Interview': 'Interview',
        'Whitepaper': 'Whitepaper', 'Case-Study': 'Case-Study', 'Pressemitteilung': 'Pressemitteilung',
        'E-Book': 'E-Book', 'Buchrezension': 'Buchrezension', 'Zusammenfassung': 'Zusammenfassung',
        'Erfahrungsbericht': 'Erfahrungsbericht / Testimonial', 'Checkliste': 'Checkliste',
        'Glossar / Lexikon': 'Glossar / Lexikon', 'Facebook-Beitrag': 'Facebook-Beitrag',
        'Instagram-Beitrag': 'Instagram-Beitrag',
        'Story-Skript (Instagram / Facebook)': 'Story-Skript (Instagram / Facebook)',
        'Carousel-Post': 'Carousel-Post', 'LinkedIn-Beitrag': 'LinkedIn-Beitrag',
        'Twitter-Beitrag': 'Twitter / X-Beitrag', 'TikTok-Skript': 'TikTok-Skript',
        'Reels-Skript': 'Reels-Skript', 'Threads-Beitrag': 'Threads-Beitrag',
        'Xing-Beitrag': 'Xing-Beitrag', 'Produktbeschreibung': 'Produktbeschreibung',
        'Verkaufstext / Sales Page': 'Verkaufstext / Sales Page',
        'Produktvergleich': 'Produktvergleich', 'FAQ-Seite': 'FAQ-Seite',
        'Anzeige': 'Anzeige', 'SEO-Text': 'SEO-Text', 'Newsletter': 'Newsletter',
        'Landing Page': 'Landing Page', 'Produkttest / Review': 'Produkttest / Review',
        'Meta-Description (SEO)': 'Meta-Description (SEO)', 'E-Mail': 'E-Mail (allgemein)',
        'Kaltakquise-E-Mail': 'Kaltakquise-E-Mail', 'Follow-up-E-Mail': 'Follow-up-E-Mail',
        'Onboarding-E-Mail': 'Onboarding-E-Mail', 'Kundenservice-Antwort': 'Kundenservice-Antwort',
        'Einladungsschreiben': 'Einladungsschreiben', 'Dankes-E-Mail': 'Dankes-E-Mail',
        'Präsentation': 'Präsentation', 'Executive Summary': 'Executive Summary',
        'Bericht / Report': 'Bericht / Report', 'Angebot / Proposal': 'Angebot / Proposal',
        'Meeting-Protokoll': 'Meeting-Protokoll', 'Stellenanzeige': 'Stellenanzeige',
        'Bewerbungsschreiben': 'Bewerbungsschreiben',
        'Unternehmensvorstellung': 'Unternehmensvorstellung / About Us',
        'Vision & Mission Statement': 'Vision & Mission Statement',
        'YouTube-Video': 'YouTube-Video', 'YouTube-Short-Skript': 'YouTube-Short-Skript',
        'Podcast-Episode': 'Podcast-Episode', 'Infografik': 'Infografik',
        'Webinar': 'Webinar', 'Live-Stream': 'Live-Stream',
        'Slogan / Claim': 'Slogan / Claim', 'Produktname / Naming': 'Produktname / Naming',
        'Kurzgeschichte': 'Kurzgeschichte', 'Gedicht / Lyrik': 'Gedicht / Lyrik',
        'Drehbuch / Skript': 'Drehbuch / Skript', 'Online-Quiz': 'Online-Quiz',
        'Chatbot': 'Chatbot', 'Online-Kurs': 'Online-Kurs',
      },
      'target-audience': {
        '': 'Bitte wählen',
        'Schüler & Auszubildende (15–22 Jahre)': 'Schüler & Auszubildende (15–22 Jahre)',
        'Jugendliche (16–25 Jahre)': 'Jugendliche (16–25 Jahre)',
        'Junge Erwachsene (25–35 Jahre)': 'Junge Erwachsene (25–35 Jahre)',
        'Berufstätige (30–50 Jahre)': 'Berufstätige (30–50 Jahre)',
        'Eltern & Familien': 'Eltern & Familien', 'Senioren (50+ Jahre)': 'Senioren (50+ Jahre)',
        'Gründer & Startups': 'Gründer & Startups',
        'KMU-Inhaber & Selbstständige': 'KMU-Inhaber & Selbstständige',
        'Manager & Führungskräfte': 'Manager & Führungskräfte',
        'B2B-Entscheider': 'B2B-Entscheider', 'IT-Professionals': 'IT-Professionals',
        'Kreative & Designer': 'Kreative & Designer',
        'Lehrkräfte & Pädagogen': 'Lehrkräfte & Pädagogen',
        'Technik & Digitales': 'Technik & Digitales',
        'Fitness & Gesundheit': 'Fitness & Gesundheit', 'Mode & Lifestyle': 'Mode & Lifestyle',
        'Finanzen & Investment': 'Finanzen & Investment',
        'Bildung & Weiterbildung': 'Bildung & Weiterbildung',
        'Sport & Outdoor': 'Sport & Outdoor', 'Nachhaltigkeit & Umwelt': 'Nachhaltigkeit & Umwelt',
      },
      'content-length': {
        '': 'Bitte wählen',
        'Sehr kurz (50–100 Wörter)': 'Sehr kurz (50–100 Wörter)',
        'Kurz (100–300 Wörter)': 'Kurz (100–300 Wörter)',
        'Mittel (300–600 Wörter)': 'Mittel (300–600 Wörter)',
        'Lang (600–1.200 Wörter)': 'Lang (600–1.200 Wörter)',
        'Sehr lang (1.200+ Wörter)': 'Sehr lang (1.200+ Wörter)',
      },
      'formatting': {
        '': 'Bitte wählen', 'Fließtext': 'Fließtext',
        'Überschriften + Fließtext': 'Überschriften + Fließtext',
        'Bullet Points': 'Bullet Points', 'Nummerierte Liste': 'Nummerierte Liste',
        'Schritt-für-Schritt': 'Schritt-für-Schritt', 'Tabellarisch': 'Tabellarisch',
        'Zitat': 'Zitat', 'FAQ-Format (Frage & Antwort)': 'FAQ-Format (Frage & Antwort)',
        'Checkliste / Aufgabenliste': 'Checkliste / Aufgabenliste',
      },
      'emoji-option': { '': 'Bitte wählen', 'keine': 'Keine Emojis', 'wenige': 'Wenige Emojis', 'viele': 'Viele Emojis' },
      'seo-keyword-option': { '': 'Bitte wählen', 'Ja': 'Ja, generieren', 'Nein': 'Nein' },
      'title-subtitle-option': { '': 'Bitte wählen', 'ja': 'Ja, generieren', 'nein': 'Nein' },
      'perspective': {
        '': 'Bitte wählen',
        'Ich-Perspektive': 'Ich – persönlich, aus eigener Sicht',
        'Wir-Perspektive': 'Wir – Marke, Team oder Unternehmen',
        'Du-Perspektive': 'Du/Sie – Leser direkt ansprechen',
        'Er-/Sie-Perspektive': 'Er/Sie – beschreibend, über Dritte',
        'Neutral/Objektiv': 'Neutral – sachlich, ohne Perspektive',
      },
      'address-form': {
        '': 'Bitte wählen', 'formal': 'Formal (Sie-Form)',
        'informell': 'Informell (Du-Form)', 'neutral': 'Neutral', 'kombiniert': 'Kombiniert',
      },
      'language-style': {
        '': 'Bitte wählen',
        'Emotional': 'Emotional (bewegt, berührt)',
        'Empathisch': 'Empathisch (einfühlsam, verständnisvoll)',
        'Formell': 'Formell (professionell, distanziert)',
        'Humorvoll': 'Humorvoll (locker, mit Witz)',
        'Informell': 'Informell (entspannt, ungezwungen)',
        'Inspirierend': 'Inspirierend (motiviert zum Handeln)',
        'Journalistisch': 'Journalistisch (objektiv, nachrichtlich)',
        'Minimalistisch': 'Minimalistisch (knapp, auf den Punkt)',
        'Motivierend': 'Motivierend (antreibend, ermutigend)',
        'Persönlich': 'Persönlich (nahbar, authentisch)',
        'Poetisch': 'Poetisch (bildreich, kreativ)',
        'Provokativ': 'Provokativ (mutig, gegen den Strom)',
        'Sachlich': 'Sachlich (nüchtern, faktenbasiert)',
        'Seriös': 'Seriös (vertrauenswürdig, solid)',
        'Storytelling': 'Storytelling (erzählend, narrativ)',
        'Technisch': 'Technisch (präzise, fachspezifisch)',
        'Umgangssprachlich': 'Umgangssprachlich (alltagsnah, locker)',
        'Werblich': 'Werblich (überzeugend, verkaufsfördernd)',
        'Wissenschaftlich': 'Wissenschaftlich (analytisch, belegt)',
      },
    },
    en: {
      'content-type': {
        '': 'Please select',
        'Artikel': 'Article', 'Blog-Post': 'Blog Post', 'How-to-Anleitung': 'How-to Guide',
        'Listicle (Top-X-Artikel)': 'Listicle (Top-X Article)', 'Interview': 'Interview',
        'Whitepaper': 'Whitepaper', 'Case-Study': 'Case Study', 'Pressemitteilung': 'Press Release',
        'E-Book': 'E-Book', 'Buchrezension': 'Book Review', 'Zusammenfassung': 'Summary',
        'Erfahrungsbericht': 'Experience Report / Testimonial', 'Checkliste': 'Checklist',
        'Glossar / Lexikon': 'Glossary', 'Facebook-Beitrag': 'Facebook Post',
        'Instagram-Beitrag': 'Instagram Caption',
        'Story-Skript (Instagram / Facebook)': 'Story Script (Instagram / Facebook)',
        'Carousel-Post': 'Carousel Post', 'LinkedIn-Beitrag': 'LinkedIn Post',
        'Twitter-Beitrag': 'Twitter / X Post', 'TikTok-Skript': 'TikTok Script',
        'Reels-Skript': 'Reels Script', 'Threads-Beitrag': 'Threads Post',
        'Xing-Beitrag': 'Xing Post', 'Produktbeschreibung': 'Product Description',
        'Verkaufstext / Sales Page': 'Sales Copy / Sales Page',
        'Produktvergleich': 'Product Comparison', 'FAQ-Seite': 'FAQ Page',
        'Anzeige': 'Advertisement', 'SEO-Text': 'SEO Article', 'Newsletter': 'Newsletter',
        'Landing Page': 'Landing Page', 'Produkttest / Review': 'Product Test / Review',
        'Meta-Description (SEO)': 'Meta Description (SEO)', 'E-Mail': 'Email (general)',
        'Kaltakquise-E-Mail': 'Cold Outreach Email', 'Follow-up-E-Mail': 'Follow-up Email',
        'Onboarding-E-Mail': 'Onboarding Email',
        'Kundenservice-Antwort': 'Customer Service Response',
        'Einladungsschreiben': 'Invitation Letter', 'Dankes-E-Mail': 'Thank-You Email',
        'Präsentation': 'Presentation', 'Executive Summary': 'Executive Summary',
        'Bericht / Report': 'Report', 'Angebot / Proposal': 'Proposal',
        'Meeting-Protokoll': 'Meeting Minutes', 'Stellenanzeige': 'Job Posting',
        'Bewerbungsschreiben': 'Cover Letter',
        'Unternehmensvorstellung': 'Company Introduction / About Us',
        'Vision & Mission Statement': 'Vision & Mission Statement',
        'YouTube-Video': 'YouTube Video Description',
        'YouTube-Short-Skript': 'YouTube Shorts Script',
        'Podcast-Episode': 'Podcast Episode Outline', 'Infografik': 'Infographic',
        'Webinar': 'Webinar', 'Live-Stream': 'Live Stream',
        'Slogan / Claim': 'Slogan / Tagline', 'Produktname / Naming': 'Product Name / Naming',
        'Kurzgeschichte': 'Short Story', 'Gedicht / Lyrik': 'Poem / Lyrics',
        'Drehbuch / Skript': 'Screenplay / Script', 'Online-Quiz': 'Online Quiz',
        'Chatbot': 'Chatbot Script', 'Online-Kurs': 'Online Course Outline',
      },
      'target-audience': {
        '': 'Please select',
        'Schüler & Auszubildende (15–22 Jahre)': 'Students & Apprentices (15–22)',
        'Jugendliche (16–25 Jahre)': 'Teenagers (16–25)',
        'Junge Erwachsene (25–35 Jahre)': 'Young Adults (25–35)',
        'Berufstätige (30–50 Jahre)': 'Working Professionals (30–50)',
        'Eltern & Familien': 'Parents & Families', 'Senioren (50+ Jahre)': 'Seniors (50+)',
        'Gründer & Startups': 'Founders & Startups',
        'KMU-Inhaber & Selbstständige': 'SME Owners & Freelancers',
        'Manager & Führungskräfte': 'Managers & Executives',
        'B2B-Entscheider': 'B2B Decision-Makers', 'IT-Professionals': 'IT Professionals',
        'Kreative & Designer': 'Creatives & Designers',
        'Lehrkräfte & Pädagogen': 'Teachers & Educators',
        'Technik & Digitales': 'Tech & Digital', 'Fitness & Gesundheit': 'Fitness & Health',
        'Mode & Lifestyle': 'Fashion & Lifestyle', 'Finanzen & Investment': 'Finance & Investment',
        'Bildung & Weiterbildung': 'Education & Learning',
        'Sport & Outdoor': 'Sports & Outdoor', 'Nachhaltigkeit & Umwelt': 'Sustainability & Environment',
      },
      'content-length': {
        '': 'Please select',
        'Sehr kurz (50–100 Wörter)': 'Very Short (50–100 Words)',
        'Kurz (100–300 Wörter)': 'Short (100–300 Words)',
        'Mittel (300–600 Wörter)': 'Medium (300–600 Words)',
        'Lang (600–1.200 Wörter)': 'Long (600–1,200 Words)',
        'Sehr lang (1.200+ Wörter)': 'Very Long (1,200+ Words)',
      },
      'formatting': {
        '': 'Please select', 'Fließtext': 'Flowing Prose',
        'Überschriften + Fließtext': 'Headings + Prose',
        'Bullet Points': 'Bullet Points', 'Nummerierte Liste': 'Numbered List',
        'Schritt-für-Schritt': 'Step-by-Step', 'Tabellarisch': 'Tabular',
        'Zitat': 'Quote Format', 'FAQ-Format (Frage & Antwort)': 'FAQ Format (Q&A)',
        'Checkliste / Aufgabenliste': 'Checklist / Task List',
      },
      'emoji-option': { '': 'Please select', 'keine': 'No Emojis', 'wenige': 'Few Emojis', 'viele': 'Many Emojis' },
      'seo-keyword-option': { '': 'Please select', 'Ja': 'Yes, include', 'Nein': 'No' },
      'title-subtitle-option': { '': 'Please select', 'ja': 'Yes, include', 'nein': 'No' },
      'perspective': {
        '': 'Please select',
        'Ich-Perspektive': 'I – personal, first person',
        'Wir-Perspektive': 'We – brand, team or company',
        'Du-Perspektive': 'You – addressing the reader directly',
        'Er-/Sie-Perspektive': 'He/She – descriptive, about third parties',
        'Neutral/Objektiv': 'Neutral – objective, no perspective',
      },
      'address-form': {
        '': 'Please select', 'formal': 'Formal',
        'informell': 'Informal', 'neutral': 'Neutral', 'kombiniert': 'Combined',
      },
      'language-style': {
        '': 'Please select',
        'Emotional': 'Emotional (moving, touching)',
        'Empathisch': 'Empathetic (understanding, caring)',
        'Formell': 'Formal (professional, distant)',
        'Humorvoll': 'Humorous (relaxed, witty)',
        'Informell': 'Informal (relaxed, casual)',
        'Inspirierend': 'Inspiring (drives to action)',
        'Journalistisch': 'Journalistic (objective, news-style)',
        'Minimalistisch': 'Minimalist (concise, to the point)',
        'Motivierend': 'Motivational (driving, encouraging)',
        'Persönlich': 'Personal (approachable, authentic)',
        'Poetisch': 'Poetic (vivid, creative)',
        'Provokativ': 'Provocative (bold, against the grain)',
        'Sachlich': 'Factual (sober, evidence-based)',
        'Seriös': 'Serious (trustworthy, solid)',
        'Storytelling': 'Storytelling (narrative style)',
        'Technisch': 'Technical (precise, domain-specific)',
        'Umgangssprachlich': 'Colloquial (everyday, casual)',
        'Werblich': 'Promotional (persuasive, sales-focused)',
        'Wissenschaftlich': 'Academic (analytical, evidence-based)',
      },
    },
  };

  const ARTICLE_MAP_EN = {
    'Artikel': 'an article', 'Blog-Post': 'a blog post',
    'How-to-Anleitung': 'a how-to guide', 'Listicle (Top-X-Artikel)': 'a listicle',
    'Interview': 'an interview', 'Whitepaper': 'a whitepaper',
    'Case-Study': 'a case study', 'Pressemitteilung': 'a press release', 'E-Book': 'an e-book',
    'Buchrezension': 'a book review', 'Zusammenfassung': 'a summary',
    'Facebook-Beitrag': 'a Facebook post', 'Instagram-Beitrag': 'an Instagram caption',
    'Story-Skript (Instagram / Facebook)': 'a story script', 'Carousel-Post': 'a carousel post',
    'LinkedIn-Beitrag': 'a LinkedIn post', 'Twitter-Beitrag': 'a tweet',
    'TikTok-Skript': 'a TikTok script', 'Reels-Skript': 'a Reels script',
    'Threads-Beitrag': 'a Threads post', 'Xing-Beitrag': 'a Xing post',
    'Produktbeschreibung': 'a product description', 'Verkaufstext / Sales Page': 'a sales page',
    'Produktvergleich': 'a product comparison', 'FAQ-Seite': 'an FAQ page',
    'Anzeige': 'an advertisement', 'SEO-Text': 'an SEO article',
    'Newsletter': 'a newsletter', 'Landing Page': 'a landing page',
    'E-Mail': 'an email', 'Kaltakquise-E-Mail': 'a cold outreach email',
    'Follow-up-E-Mail': 'a follow-up email', 'Onboarding-E-Mail': 'an onboarding email',
    'Kundenservice-Antwort': 'a customer service response',
    'Präsentation': 'a presentation', 'Executive Summary': 'an executive summary',
    'Bericht / Report': 'a report', 'Angebot / Proposal': 'a business proposal',
    'Meeting-Protokoll': 'a meeting minutes document',
    'Stellenanzeige': 'a job posting', 'Bewerbungsschreiben': 'a cover letter',
    'YouTube-Video': 'a YouTube video description', 'YouTube-Short-Skript': 'a YouTube Shorts script',
    'Podcast-Episode': 'a podcast episode outline',
    'Infografik': 'an infographic', 'Webinar': 'a webinar', 'Live-Stream': 'a live stream script',
    'Slogan / Claim': 'a slogan', 'Kurzgeschichte': 'a short story',
    'Gedicht / Lyrik': 'a poem', 'Drehbuch / Skript': 'a script',
    'Online-Quiz': 'an online quiz', 'Chatbot': 'a chatbot script', 'Online-Kurs': 'an online course outline',
    'Erfahrungsbericht': 'a testimonial / experience report', 'Checkliste': 'a checklist',
    'Glossar / Lexikon': 'a glossary', 'Produkttest / Review': 'a product review',
    'Meta-Description (SEO)': 'a meta description', 'Einladungsschreiben': 'an invitation letter',
    'Dankes-E-Mail': 'a thank-you email', 'Unternehmensvorstellung': 'a company introduction',
    'Vision & Mission Statement': 'a vision & mission statement', 'Produktname / Naming': 'a product name concept',
  };

  // ── Preview groups ────────────────────────────────────────────────────────
  const PREVIEW_GROUPS = [
    { key: 'aufgabe', icon: 'fa-bullseye',
      getValue: () => [val('role-definition'), val('content-type')].filter(Boolean).join(' · ') },
    { key: 'kontext', icon: 'fa-circle-info',
      getValue: () => [val('description'), val('target-audience')].filter(Boolean).join(' · ') },
    { key: 'format',  icon: 'fa-sliders',
      getValue: () => {
        const parts = [];
        const len = val('content-length');
        if (len) parts.push(LENGTH_MAP[len] || len);
        const fmt = val('formatting');
        if (fmt) parts.push(fmt);
        const emoji = val('emoji-option');
        if (emoji === 'keine') parts.push('Keine Emojis');
        else if (emoji) parts.push(emoji + ' Emojis');
        if (val('seo-keyword-option') === 'Ja') parts.push('SEO ✓');
        if (val('title-subtitle-option') === 'ja') parts.push('Mit Titel');
        return parts.join(' · ');
      },
    },
    { key: 'persona', icon: 'fa-user-pen',
      getValue: () => {
        const parts = [];
        if (val('perspective')) parts.push(val('perspective'));
        const addr = val('address-form');
        if (addr) parts.push(ADDRESS_MAP[addr] || addr);
        return parts.join(' · ');
      },
    },
    { key: 'tonfall',  icon: 'fa-masks-theater', getValue: () => val('language-style') },
    { key: 'beispiel', icon: 'fa-lightbulb',     getValue: () => val('beispiel') },
  ];

  // ── Build prompts ─────────────────────────────────────────────────────────
  const buildFlowPrompt = () => {
    const role = val('role-definition'),
          type = val('content-type'), description = val('description'),
          audience = val('target-audience'), length = val('content-length'),
          formatting = val('formatting'), seo = val('seo-keyword-option'),
          titleSub = val('title-subtitle-option'), perspective = val('perspective'),
          addressForm = val('address-form'), style = val('language-style'),
          emojis = val('emoji-option'), beispiel = val('beispiel');

    if (!role && !type && !description) return '';
    const s = [];

    if (role) s.push(role.endsWith('.') || role.endsWith('!') || role.endsWith('?') ? role : role + '.');
    if (type) s.push(`Erstelle ${(ARTICLE_MAP[type] ?? 'einen ')}${type}.`);
    if (description && audience) s.push(`Das Thema lautet: ${description}. Die Zielgruppe sind ${audience}.`);
    else if (description) s.push(`Das Thema lautet: ${description}.`);
    else if (audience) s.push(`Die Zielgruppe sind ${audience}.`);

    const fp = [];
    if (length) fp.push(`Textlänge ${LENGTH_MAP[length] || length}`);
    if (formatting) fp.push(`Formatierung als ${formatting}`);
    if (seo === 'Ja') fp.push('inklusive SEO-Keywords');
    if (titleSub === 'ja') fp.push('mit Titel und Untertitel');
    if (emojis === 'keine') fp.push('ohne Emojis');
    else if (emojis === 'wenige') fp.push('mit wenigen Emojis');
    else if (emojis === 'viele') fp.push('mit vielen Emojis');
    if (fp.length) s.push(`Verwende ${fp.join(', ')}.`);

    const pp = [];
    if (perspective) pp.push(perspective);
    if (addressForm) pp.push(ADDRESS_MAP[addressForm] || addressForm);
    if (pp.length) s.push(`Schreibe aus der ${pp.join(', in der ')}.`);
    if (style) s.push(`Der Sprachstil soll ${style.toLowerCase()} sein.`);
    if (beispiel) s.push(`Orientiere dich stilistisch an folgendem Beispiel: ${beispiel}`);

    return s.join(' ');
  };

  const buildFlowPromptEN = () => {
    const role = val('role-definition'),
          type = val('content-type'), description = val('description'),
          audience = val('target-audience'), length = val('content-length'),
          formatting = val('formatting'), seo = val('seo-keyword-option'),
          titleSub = val('title-subtitle-option'), perspective = val('perspective'),
          addressForm = val('address-form'), style = val('language-style'),
          emojis = val('emoji-option'), beispiel = val('beispiel');

    if (!role && !type && !description) return '';
    const s = [];

    if (role) s.push(role.endsWith('.') || role.endsWith('!') || role.endsWith('?') ? role : role + '.');
    if (type) s.push(`Create ${ARTICLE_MAP_EN[type] ?? 'a ' + type}.`);
    if (description && audience)
      s.push(`The topic is: ${description}. The target audience is ${AUDIENCE_MAP_EN[audience] || audience}.`);
    else if (description) s.push(`The topic is: ${description}.`);
    else if (audience) s.push(`The target audience is ${AUDIENCE_MAP_EN[audience] || audience}.`);

    const fp = [];
    if (length) fp.push(`text length: ${LENGTH_MAP_EN[length] || length}`);
    if (formatting) fp.push(`format: ${FORMAT_MAP_EN[formatting] || formatting}`);
    if (seo === 'Ja') fp.push('include SEO keywords');
    if (titleSub === 'ja') fp.push('include title and subtitle');
    if (emojis === 'keine') fp.push('no emojis');
    else if (emojis === 'wenige') fp.push('few emojis');
    else if (emojis === 'viele') fp.push('many emojis');
    if (fp.length) s.push(`Use the following: ${fp.join(', ')}.`);

    const pp = [];
    if (perspective) pp.push(PERSPECTIVE_MAP_EN[perspective] || perspective);
    if (addressForm) pp.push(ADDRESS_MAP_EN[addressForm] || addressForm);
    if (pp.length) s.push(`Write from a ${pp.join(', ')} perspective.`);
    if (style) s.push(`The tone should be ${STYLE_MAP_EN[style] || style.toLowerCase()}.`);
    if (beispiel) s.push(`Stylistically, follow this example: ${beispiel}`);

    return s.join(' ');
  };

  // ── Language state ────────────────────────────────────────────────────────
  let activeLang = 'de';

  const getCurrentPrompt = () => activeLang === 'en' ? buildFlowPromptEN() : buildFlowPrompt();

  if (langToggle) {
    langToggle.addEventListener('click', e => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      activeLang = btn.dataset.lang;
      langToggle.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === activeLang));
      refreshPreview();
    });
  }

  // ── Render helpers ────────────────────────────────────────────────────────
  const esc = (str) => str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const emptyState = () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    return `<div class="pv-empty">
      <div class="pv-empty__icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="pv-empty__title">${t['preview.empty.title']}</div>
      <div class="pv-empty__sub">${t['preview.empty.sub']}</div>
    </div>`;
  };

  const renderVisual = () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const filled = PREVIEW_GROUPS.filter(g => g.getValue());
    if (filled.length === 0) return emptyState();
    const rows = filled.map(g => `
      <div class="pv-row">
        <span class="pv-label pv-label--${g.key}"><i class="fa-solid ${g.icon}"></i>${t['step.' + g.key] || g.key}</span>
        <span class="pv-value">${esc(g.getValue())}</span>
      </div>`).join('');
    return `<div class="pv-intro">${t['preview.intro']}</div>
      <div class="pv-rows">${rows}</div>`;
  };

  const renderFlow = () => {
    const text = editedPromptText !== null ? editedPromptText : getCurrentPrompt();
    if (!text) return emptyState();
    return `<div class="pv-flow pv-flow--editable" contenteditable="true" spellcheck="false" data-gramm="false">${esc(text)}</div>`;
  };

  // ── Score dots ────────────────────────────────────────────────────────────
  const refreshScore = () => {
    if (!scoreDots) return;
    let count = 0;
    PREVIEW_GROUPS.forEach(g => {
      const dot = scoreDots.querySelector(`[data-step="${g.key}"]`);
      if (!dot) return;
      const has = Boolean(g.getValue());
      dot.className = 'score-dot' + (has ? ` filled--${g.key}` : '');
      if (has) count++;
    });
    if (scoreCounter) {
      scoreCounter.textContent = `${count}/6`;
      scoreCounter.className = 'score-counter' +
        (count >= 5 ? ' score-counter--ready' : count >= 3 ? ' score-counter--partial' : '');
    }
  };

  // ── Editable prompt state ─────────────────────────────────────────────────
  let editedPromptText = null;

  // ── Library search state ──────────────────────────────────────────────────
  let libSearch = '';
  let histSearch = '';

  // ── Focus mode state ──────────────────────────────────────────────────────
  let focusMode = false;

  // ── Active tab state ──────────────────────────────────────────────────────
  let activeTab = 'visual';

  const setTab = (tab) => {
    activeTab = tab;
    previewTabs.querySelectorAll('.preview-tab').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.tab === tab));
    refreshPreview();
  };

  // ── Update preview ────────────────────────────────────────────────────────
  const hasContent = () => FIELD_IDS.some(id => val(id) !== '');

  const refreshPreview = () => {
    livePrompt.innerHTML = activeTab === 'visual' ? renderVisual() : renderFlow();
    const filled = hasContent();
    livePrompt.classList.toggle('has-content', filled);

    if (filled) {
      const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
      promptStatus.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i>${t['status.ready']}`;
      promptStatus.classList.add('ready');
      const text = getCurrentPrompt();
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      wordCount.textContent = `${words} ${t['status.words']} · ${text.length} ${t['status.chars']}`;
    } else {
      const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
      promptStatus.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin me-1"></i>${t['status.waiting']}`;
      promptStatus.classList.remove('ready');
      wordCount.textContent = '';
    }

    refreshScore();
    renderAnalyzer();
    saveForm();
  };

  // ── localStorage persistence ──────────────────────────────────────────────
  const saveForm = () => {
    try {
      const data = {};
      FIELD_IDS.forEach(id => { const v = val(id); if (v) data[id] = v; });
      localStorage.setItem(LS_FORM_KEY, JSON.stringify(data));
    } catch {}
  };

  const restoreForm = () => {
    try {
      const data = JSON.parse(localStorage.getItem(LS_FORM_KEY) || '{}');
      FIELD_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && data[id] !== undefined) el.value = data[id];
      });
    } catch {}
  };

  // ── URL sharing ───────────────────────────────────────────────────────────
  const restoreFromUrl = () => {
    const params = new URLSearchParams(location.search);
    if (![...params.keys()].some(k => FIELD_IDS.includes(k) || k === 'lang')) return;
    const urlLang = params.get('lang');
    if (urlLang === 'en') applyUILang('en');
    FIELD_IDS.forEach(id => {
      const v = params.get(id);
      if (v !== null) { const el = document.getElementById(id); if (el) el.value = v; }
    });
    history.replaceState(null, '', location.pathname);
  };

  const shareUrl = async () => {
    const params = new URLSearchParams();
    FIELD_IDS.forEach(id => { const v = val(id); if (v) params.set(id, v); });
    if (![...params.keys()].length) return;
    if (uiLang && uiLang !== 'de') params.set('lang', uiLang);
    const url = `${location.origin}${location.pathname}?${params.toString()}`;
    try { await navigator.clipboard.writeText(url); }
    catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: url, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    shareToast.show();
  };

  // ── Prompt history ────────────────────────────────────────────────────────
  const loadHistory = () => {
    try { return JSON.parse(localStorage.getItem(LS_HISTORY_KEY)) || []; } catch { return []; }
  };

  const addToHistory = (text) => {
    const items = loadHistory();
    if (items[0]?.text === text) return;
    const now = new Date();
    items.unshift({
      text,
      lang: activeLang,
      time: now.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    });
    try { localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(items.slice(0, HISTORY_MAX))); } catch {}
  };

  const renderHistory = () => {
    if (!historyList) return;
    const allItems = loadHistory();
    const q = histSearch.trim().toLowerCase();
    const items = q ? allItems.filter(e => e.text.toLowerCase().includes(q)) : allItems;
    if (historyEmpty) historyEmpty.style.display = allItems.length ? 'none' : '';
    historyList.querySelectorAll('.history-item, .history-no-results').forEach(n => n.remove());
    if (allItems.length && !items.length) {
      const p = document.createElement('p');
      p.className = 'history-no-results text-center text-muted py-3';
      p.style.fontSize = '.875rem';
      p.innerHTML = `<i class="fa-solid fa-magnifying-glass me-1"></i>${(UI_STRINGS[uiLang] || UI_STRINGS.de)['lib.search.empty'] || 'Keine Treffer'}`;
      historyList.appendChild(p);
      return;
    }
    items.forEach((entry, i) => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-item__meta">
          <span class="history-item__lang ${entry.lang === 'en' ? 'history-item__lang--en' : ''}">${(entry.lang || 'de').toUpperCase()}</span>
          <span class="history-item__time">${entry.time}</span>
        </div>
        <div class="history-item__text">${esc(entry.text)}</div>
        <button class="action-btn action-btn--outline history-item__copy" style="font-size:0.75rem;padding:.3rem .75rem;" data-index="${i}">
          <i class="fa-solid fa-copy me-1"></i>${(UI_STRINGS[uiLang] || UI_STRINGS.de)['lib.btn.copy']}
        </button>`;
      historyList.appendChild(div);
    });
  };

  historyList?.addEventListener('click', async e => {
    const btn = e.target.closest('.history-item__copy');
    if (!btn) return;
    const text = loadHistory()[Number(btn.dataset.index)]?.text;
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: text, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    copyToast.show();
  });

  // ── Prompt Library ────────────────────────────────────────────────────────
  const loadLibrary = () => {
    try { return JSON.parse(localStorage.getItem(LS_LIBRARY_KEY)) || []; } catch { return []; }
  };

  const saveToLibrary = (title, text) => {
    const items = loadLibrary();
    const fields = Object.fromEntries(FIELD_IDS.map(id => [id, val(id)]).filter(([, v]) => v));
    const now = new Date();
    items.unshift({
      id: Date.now(),
      title,
      text,
      lang: activeLang,
      fields,
      time: now.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    });
    try { localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(items)); } catch {}
  };

  const renderLibrary = () => {
    if (!libraryList) return;
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const allItems = loadLibrary();
    const q = libSearch.trim().toLowerCase();
    const items = q
      ? allItems.filter(e => e.title.toLowerCase().includes(q) || e.text.toLowerCase().includes(q))
      : allItems;
    if (libraryEmpty) libraryEmpty.style.display = allItems.length ? 'none' : '';
    libraryList.innerHTML = '';
    if (allItems.length && !items.length) {
      libraryList.innerHTML = `<p class="text-center text-muted py-3" style="font-size:.875rem;"><i class="fa-solid fa-magnifying-glass me-1"></i>${t['lib.search.empty'] || 'Keine Treffer'}</p>`;
      return;
    }
    items.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'library-item';
      div.innerHTML = `
        <div class="library-item__header">
          <span class="library-item__title">${esc(entry.title)}</span>
          <div class="library-item__meta">
            <span class="history-item__lang ${entry.lang === 'en' ? 'history-item__lang--en' : ''}">${(entry.lang || 'de').toUpperCase()}</span>
            <span class="history-item__time">${entry.time}</span>
          </div>
        </div>
        <div class="library-item__text">${esc(entry.text)}</div>
        <div class="library-item__btns">
          <button class="action-btn action-btn--primary lib-btn-load" data-id="${entry.id}">
            <i class="fa-solid fa-arrow-up-from-bracket me-1"></i>${t['lib.btn.load']}
          </button>
          <button class="action-btn action-btn--outline lib-btn-copy" data-id="${entry.id}">
            <i class="fa-solid fa-copy me-1"></i>${t['lib.btn.copy']}
          </button>
          <button class="action-btn action-btn--outline lib-btn-duplicate" data-id="${entry.id}">
            <i class="fa-solid fa-clone me-1"></i>${t['lib.btn.duplicate']}
          </button>
          <button class="action-btn action-btn--ghost lib-btn-delete" data-id="${entry.id}">
            <i class="fa-solid fa-trash me-1"></i>${t['lib.btn.delete']}
          </button>
        </div>`;
      libraryList.appendChild(div);
    });
  };

  libraryList?.addEventListener('click', async e => {
    const idNum = Number(e.target.closest('[data-id]')?.dataset.id);
    if (!idNum) return;
    const items  = loadLibrary();
    const entry  = items.find(i => i.id === idNum);
    if (!entry) return;

    if (e.target.closest('.lib-btn-copy')) {
      try { await navigator.clipboard.writeText(entry.text); }
      catch {
        const ta = Object.assign(document.createElement('textarea'),
          { value: entry.text, style: 'position:fixed;opacity:0;' });
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      copyToast.show();
    }

    if (e.target.closest('.lib-btn-load')) {
      const doLoad = (fields) => {
        FIELD_IDS.forEach(fid => {
          const el = document.getElementById(fid);
          if (el) el.value = fields?.[fid] || '';
        });
        activeCardId = null;
        renderCatalog(activeFilter);
        refreshPreview();
        autoExpandFilled();
        libraryCanvas.hide();
      };
      const phs = getPlaceholders(entry.fields || {});
      if (phs.size) { openPlaceholderModal(entry.fields, phs, doLoad); return; }
      doLoad(entry.fields);
    }

    if (e.target.closest('.lib-btn-duplicate')) {
      const copy = { ...entry, id: Date.now(), title: entry.title + ' (Kopie)' };
      const updated = [copy, ...items];
      try { localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(updated)); } catch {}
      renderLibrary();
    }

    if (e.target.closest('.lib-btn-delete')) {
      const updated = items.filter(i => i.id !== idNum);
      try { localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(updated)); } catch {}
      renderLibrary();
    }
  });

  // ── Get final prompt text (respects manual edits) ─────────────────────────
  const getFinalPromptText = () =>
    (editedPromptText !== null && activeTab === 'flow')
      ? editedPromptText.trim()
      : getCurrentPrompt().trim();

  // ── Clipboard ─────────────────────────────────────────────────────────────
  const copyPrompt = async () => {
    const text = getFinalPromptText();
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    addToHistory(text);
    copyToast.show();
  };

  // ── Reset with Undo ───────────────────────────────────────────────────────
  let lastFormState = null;

  const resetForm = () => {
    lastFormState = Object.fromEntries(FIELD_IDS.map(id => [id, val(id)]));
    FIELD_IDS.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    activeCardId = null;
    renderCatalog(activeFilter);
    try { localStorage.removeItem(LS_FORM_KEY); } catch {}
    refreshPreview();
    // Show undo toast with translated label
    const resetSpan = document.querySelector('#undo-toast [data-i18n="toast.reset"]');
    const undoBtn   = document.getElementById('btn-undo-reset');
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    if (resetSpan) resetSpan.textContent = t['toast.reset'];
    if (undoBtn)   undoBtn.textContent   = t['btn.undo'];
    undoToast.show();
  };

  document.getElementById('btn-undo-reset')?.addEventListener('click', () => {
    if (!lastFormState) return;
    FIELD_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = lastFormState[id] || '';
    });
    lastFormState = null;
    undoToast.hide();
    refreshPreview();
    autoExpandFilled();
  });

  document.getElementById('undo-toast')?.addEventListener('hidden.bs.toast', () => {
    lastFormState = null;
  });

  // ── Dark mode ─────────────────────────────────────────────────────────────
  const applyTheme = (dark) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (darkModeIcon) darkModeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    try { localStorage.setItem(LS_THEME_KEY, dark ? 'dark' : 'light'); } catch {}
  };

  btnDarkMode?.addEventListener('click', () =>
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'));

  // ── Catalog ───────────────────────────────────────────────────────────────
  let activeFilter = 'alle';
  let activeCardId = null;

  const CATEGORY_LABELS = { Medizin: { de: 'Medizin', en: 'Medicine' }, Recht: { de: 'Recht', en: 'Law' }, Bildung: { de: 'Bildung', en: 'Education' } };
  const categoryDisplay = (cat) => CATEGORY_LABELS[cat]?.[uiLang] || cat;
  const getActiveCatalog = () => (uiLang === 'en' && typeof PROMPT_CATALOG_EN !== 'undefined') ? PROMPT_CATALOG_EN : PROMPT_CATALOG;

  // ── Favorites ─────────────────────────────────────────────────────────────
  const loadFavorites = () => {
    try { return JSON.parse(localStorage.getItem(LS_FAVORITES_KEY)) || []; } catch { return []; }
  };

  const toggleFavorite = (id) => {
    const favs = loadFavorites();
    const idx = favs.indexOf(id);
    if (idx === -1) favs.push(id); else favs.splice(idx, 1);
    try { localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(favs)); } catch {}
    renderCatalog(activeFilter);
  };

  const renderCatalog = (filter = 'alle') => {
    const catalog = getActiveCatalog();
    const favs = loadFavorites();
    let items;
    if (filter === 'favoriten') {
      items = catalog.filter(t => favs.includes(t.id));
    } else {
      items = filter === 'alle' ? [...catalog] : catalog.filter(t => t.category === filter);
      items.sort((a, b) => (favs.includes(b.id) ? 1 : 0) - (favs.includes(a.id) ? 1 : 0));
    }
    catalogGrid.innerHTML = items.map(t => `
      <div class="catalog-card${activeCardId === t.id ? ' active' : ''}"
        data-id="${t.id}" role="button" tabindex="0" aria-label="Template: ${t.name}">
        <div class="catalog-card__icon"><i class="${t.icon}"></i></div>
        <div class="catalog-card__body">
          <div class="catalog-card__name">${t.name}</div>
          <span class="catalog-card__badge">${categoryDisplay(t.category)}</span>
        </div>
        <button class="catalog-fav${favs.includes(t.id) ? ' is-fav' : ''}" data-fav-id="${t.id}"
          aria-label="Favorit" title="${uiLang === 'en' ? 'Toggle Favourite' : 'Favorit umschalten'}">
          <i class="fa-${favs.includes(t.id) ? 'solid' : 'regular'} fa-star"></i>
        </button>
      </div>`).join('');
  };

  const applyTemplate = (id) => {
    const tpl = PROMPT_CATALOG.find(t => t.id === id);
    if (!tpl) return;
    Object.entries(tpl.fields).forEach(([fieldId, value]) => {
      const el = document.getElementById(fieldId);
      if (el) el.value = value;
    });
    const descEl = document.getElementById('description');
    const tplDisplay = getActiveCatalog().find(t => t.id === id) || tpl;
    if (descEl && !descEl.value.trim()) descEl.placeholder = tplDisplay.descriptionHint;
    activeCardId = id;
    renderCatalog(activeFilter);
    refreshPreview();
    autoExpandFilled();
    openSection('body-aufgabe');
    document.getElementById('description')?.focus();
  };

  catalogFilters.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    catalogFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderCatalog(activeFilter);
  });

  catalogGrid.addEventListener('click', e => {
    const favBtn = e.target.closest('.catalog-fav');
    if (favBtn) { e.stopPropagation(); toggleFavorite(favBtn.dataset.favId); return; }
    const card = e.target.closest('.catalog-card');
    if (card) applyTemplate(card.dataset.id);
  });

  catalogGrid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target.closest('.catalog-fav')) return;
    const card = e.target.closest('.catalog-card');
    if (card) { e.preventDefault(); applyTemplate(card.dataset.id); }
  });

  // ── Catalog collapse ──────────────────────────────────────────────────────
  let catalogOpen = true;

  const toggleCatalog = () => {
    catalogOpen = !catalogOpen;
    if (catalogOpen) {
      catalogBody.style.maxHeight = catalogBody.scrollHeight + 'px';
      catalogBody.classList.remove('collapsed');
      catalogChevron.classList.remove('collapsed');
      catalogBody.addEventListener('transitionend', () => { catalogBody.style.maxHeight = 'none'; }, { once: true });
    } else {
      catalogBody.style.maxHeight = catalogBody.scrollHeight + 'px';
      requestAnimationFrame(() => {
        catalogBody.style.maxHeight = '0';
        catalogBody.classList.add('collapsed');
        catalogChevron.classList.add('collapsed');
      });
    }
  };

  catalogToggle.addEventListener('click', toggleCatalog);
  catalogToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCatalog(); }
  });

  // ── Guided "Weiter"-Button ────────────────────────────────────────────────
  document.querySelector('.main-content')?.addEventListener('click', e => {
    const btn = e.target.closest('.guided-btn-next');
    if (!btn) return;
    const nextId = btn.dataset.next;
    // Close the current section first
    const currentBody = btn.closest('.section-body');
    if (currentBody) {
      const currentHeader = document.querySelector(`[data-target="${currentBody.id}"]`);
      collapseBody(currentBody, currentHeader?.querySelector('.section-chevron'));
    }
    if (nextId === 'body-preview') {
      setTimeout(() => {
        document.getElementById('body-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      setTimeout(() => openSection(nextId), 300);
    }
  });

  // ── Generic collapsible sections ──────────────────────────────────────────
  const expandBody = (body, chevron) => {
    body.style.maxHeight = body.scrollHeight + 'px';
    body.classList.remove('collapsed');
    if (chevron) chevron.classList.remove('collapsed');
    body.addEventListener('transitionend', () => { body.style.maxHeight = 'none'; }, { once: true });
  };

  const collapseBody = (body, chevron) => {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => {
      body.style.maxHeight = '0';
      body.classList.add('collapsed');
      if (chevron) chevron.classList.add('collapsed');
    });
  };

  const toggleSection = (header) => {
    const body = document.getElementById(header.dataset.target);
    if (!body) return;
    const chevron = header.querySelector('.section-chevron');
    body.classList.contains('collapsed') ? expandBody(body, chevron) : collapseBody(body, chevron);
  };

  // ── Guided mode helpers ────────────────────────────────────────────────────
  const STEP_BODIES = ['body-aufgabe', 'body-kontext', 'body-format', 'body-persona', 'body-tonfall', 'body-beispiel'];

  const openSection = (id) => {
    const body = document.getElementById(id);
    if (!body) return;
    const header = document.querySelector(`[data-target="${id}"]`);
    const chevron = header?.querySelector('.section-chevron');
    if (body.classList.contains('collapsed')) expandBody(body, chevron);
    setTimeout(() => {
      (header || body).scrollIntoView({ behavior: 'smooth', block: 'start' });
      updateToggleAllBtn();
    }, 150);
  };

  const autoExpandFilled = () => {
    const stepFields = {
      'body-aufgabe': ['content-type'],
      'body-kontext': ['description', 'target-audience'],
      'body-format':  ['content-length', 'formatting', 'emoji-option', 'seo-keyword-option', 'title-subtitle-option'],
      'body-persona': ['perspective', 'address-form'],
      'body-tonfall': ['language-style'],
      'body-beispiel': ['beispiel'],
    };
    Object.entries(stepFields).forEach(([bodyId, fields]) => {
      if (fields.some(f => val(f))) openSection(bodyId);
    });
  };

  document.querySelectorAll('.section-collapsible[data-target]').forEach(header => {
    header.addEventListener('click', e => {
      if (e.target.closest('.preview-tabs') || e.target.closest('.lang-toggle')) return;
      toggleSection(header);
      updateToggleAllBtn();
    });
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(header); updateToggleAllBtn(); }
    });
  });

  // ── Toggle-all button ─────────────────────────────────────────────────────
  let allCollapsed = false;

  const updateToggleAllBtn = () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const anyOpen = !catalogBody.classList.contains('collapsed') ||
      [...document.querySelectorAll('[id^="body-"]')].some(b => !b.classList.contains('collapsed'));
    allCollapsed = !anyOpen;
    toggleAllIcon.className  = allCollapsed ? 'fa-solid fa-angles-down' : 'fa-solid fa-angles-up';
    toggleAllLabel.textContent = allCollapsed ? t['btn.toggleAll.open'] : t['btn.toggleAll.close'];
  };

  const toggleAllSections = () => {
    const shouldCollapse = !allCollapsed;
    if (shouldCollapse && catalogOpen) toggleCatalog();
    else if (!shouldCollapse && !catalogOpen) toggleCatalog();
    document.querySelectorAll('.section-collapsible[data-target]').forEach(header => {
      const body = document.getElementById(header.dataset.target);
      if (!body) return;
      const chevron = header.querySelector('.section-chevron');
      const isCollapsed = body.classList.contains('collapsed');
      if (shouldCollapse && !isCollapsed) collapseBody(body, chevron);
      else if (!shouldCollapse && isCollapsed) expandBody(body, chevron);
    });
    allCollapsed = shouldCollapse;
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    toggleAllIcon.className  = allCollapsed ? 'fa-solid fa-angles-down' : 'fa-solid fa-angles-up';
    toggleAllLabel.textContent = allCollapsed ? t['btn.toggleAll.open'] : t['btn.toggleAll.close'];
  };

  btnToggleAll.addEventListener('click', toggleAllSections);

  // ── Event listeners ───────────────────────────────────────────────────────
  document.addEventListener('input', (e) => {
    // Intercept edits in the contenteditable prompt – don't re-render, just capture
    if (e.target.closest?.('.pv-flow')) {
      editedPromptText = e.target.closest('.pv-flow').textContent;
      return;
    }
    editedPromptText = null;
    refreshPreview();
  });
  document.addEventListener('change', (e) => {
    editedPromptText = null;
    refreshPreview();
  });

  previewTabs.addEventListener('click', e => {
    const tab = e.target.closest('.preview-tab');
    if (tab) setTab(tab.dataset.tab);
  });

  btnCopy.addEventListener('click', copyPrompt);
  modalBtnCopy.addEventListener('click', copyPrompt);

  btnShow.addEventListener('click', () => {
    modalPromptText.textContent = getFinalPromptText();
    promptModal.show();
  });

  btnHelp?.addEventListener('click', () => helpModal.show());
  btnReset?.addEventListener('click', resetForm);
  btnShare?.addEventListener('click', shareUrl);
  btnExport?.addEventListener('click', () => downloadPrompt());
  btnVariations?.addEventListener('click', () => showVariations());

  document.getElementById('btn-history')?.addEventListener('click', () => {
    renderHistory();
    historyCanvas.show();
  });

  // ── Library tabs ──────────────────────────────────────────────────────────
  let activeLibTab = 'mine';
  let activeExampleFilter = 'alle';

  const CATEGORY_LABELS_FULL = {
    alle:         { de: 'Alle', en: 'All' },
    Content:      { de: 'Content', en: 'Content' },
    'Social Media': { de: 'Social Media', en: 'Social Media' },
    Marketing:    { de: 'Marketing', en: 'Marketing' },
    'E-Mail':     { de: 'E-Mail', en: 'E-Mail' },
    Business:     { de: 'Business', en: 'Business' },
    Medizin:      { de: 'Medizin', en: 'Medicine' },
    Recht:        { de: 'Recht', en: 'Law' },
    Bildung:      { de: 'Bildung', en: 'Education' },
    'E-Commerce': { de: 'E-Commerce', en: 'E-Commerce' },
  };

  const renderExamples = () => {
    const examplesFilter = document.getElementById('examples-filter');
    const examplesList   = document.getElementById('examples-list');
    if (!examplesFilter || !examplesList) return;

    const examples = typeof LIBRARY_EXAMPLES !== 'undefined' ? LIBRARY_EXAMPLES : [];
    const cats = ['alle', ...new Set(examples.map(e => e.category))];

    examplesFilter.innerHTML = cats.map(c => `
      <button class="filter-chip${activeExampleFilter === c ? ' active' : ''}" data-excat="${c}">
        ${CATEGORY_LABELS_FULL[c]?.[uiLang] || c}
      </button>`).join('');

    const filtered = activeExampleFilter === 'alle'
      ? examples
      : examples.filter(e => e.category === activeExampleFilter);

    examplesList.innerHTML = '';
    filtered.forEach(ex => {
      const div = document.createElement('div');
      div.className = 'library-item';
      div.innerHTML = `
        <div class="library-item__header">
          <span class="library-item__title">${esc(ex.title)}</span>
          <div class="library-item__meta">
            <span class="history-item__lang">${ex.lang.toUpperCase()}</span>
            <span class="catalog-card__badge">${CATEGORY_LABELS_FULL[ex.category]?.[uiLang] || ex.category}</span>
          </div>
        </div>
        <div class="library-item__text">${esc(ex.text.slice(0, 120))}…</div>
        <div class="library-item__btns">
          <button class="action-btn action-btn--outline ex-btn-copy" data-exid="${esc(ex.id)}">
            <i class="fa-solid fa-copy me-1"></i>${uiLang === 'en' ? 'Copy' : 'Kopieren'}
          </button>
        </div>`;
      examplesList.appendChild(div);
    });
  };

  document.getElementById('examples-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-excat]');
    if (!btn) return;
    activeExampleFilter = btn.dataset.excat;
    renderExamples();
  });

  document.getElementById('examples-list')?.addEventListener('click', async e => {
    const btn = e.target.closest('.ex-btn-copy');
    if (!btn) return;
    const examples = typeof LIBRARY_EXAMPLES !== 'undefined' ? LIBRARY_EXAMPLES : [];
    const ex = examples.find(x => x.id === btn.dataset.exid);
    if (!ex) return;
    try { await navigator.clipboard.writeText(ex.text); }
    catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: ex.text, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    copyToast.show();
  });

  document.getElementById('library-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('[data-libtab]');
    if (!tab) return;
    activeLibTab = tab.dataset.libtab;
    document.querySelectorAll('#library-tabs .library-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.libtab === activeLibTab));
    document.getElementById('library-panel-mine')?.classList.toggle('d-none', activeLibTab !== 'mine');
    document.getElementById('library-panel-presets')?.classList.toggle('d-none', activeLibTab !== 'presets');
    document.getElementById('library-panel-examples')?.classList.toggle('d-none', activeLibTab !== 'examples');
    if (activeLibTab === 'examples') renderExamples();
    if (activeLibTab === 'presets') renderPresets();
  });

  btnLibrary?.addEventListener('click', () => {
    renderLibrary();
    renderPresets();
    libraryCanvas.show();
  });

  btnSave?.addEventListener('click', () => {
    const text = getCurrentPrompt().trim();
    if (!text) return;
    const titleInput = document.getElementById('library-title-input');
    if (titleInput) titleInput.value = '';
    saveModal.show();
    setTimeout(() => titleInput?.focus(), 350);
  });

  document.getElementById('btn-save-confirm')?.addEventListener('click', () => {
    const titleInput = document.getElementById('library-title-input');
    const title = titleInput?.value.trim() || 'Ohne Titel';
    const text  = getCurrentPrompt().trim();
    if (!text) { saveModal.hide(); return; }
    saveToLibrary(title, text);
    saveModal.hide();
    saveToast.show();
  });

  document.getElementById('library-title-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-save-confirm')?.click();
  });

  // ── TXT Export ────────────────────────────────────────────────────────────
  const downloadPrompt = () => {
    const text = getFinalPromptText();
    if (!text) return;
    const date = new Date().toISOString().slice(0, 10);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `chati-prompt-${date}.txt`,
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  // ── Prompt Variationen ────────────────────────────────────────────────────
  const buildVariations = () => {
    const type = val('content-type'), description = val('description'),
          audience = val('target-audience'), length = val('content-length'),
          formatting = val('formatting'), seo = val('seo-keyword-option'),
          titleSub = val('title-subtitle-option'), perspective = val('perspective'),
          addressForm = val('address-form'), style = val('language-style'),
          emojis = val('emoji-option'), beispiel = val('beispiel');

    if (!type && !description) return [];

    if (uiLang === 'en') {
      const art = ARTICLE_MAP_EN[type] ?? 'a ' + (type || '');
      const fp = [];
      if (length)   fp.push(LENGTH_MAP_EN[length] || length);
      if (formatting) fp.push(FORMAT_MAP_EN[formatting] || formatting);
      if (seo === 'Ja') fp.push('SEO keywords');
      if (titleSub === 'ja') fp.push('title');
      if (emojis === 'keine') fp.push('no emojis');
      else if (emojis === 'wenige') fp.push('few emojis');
      else if (emojis === 'viele') fp.push('many emojis');
      const fmt = fp.join(', ');
      const aud = AUDIENCE_MAP_EN[audience] || audience;
      const sty = STYLE_MAP_EN[style] || style;

      const v1 = [];
      if (type) v1.push(`Write ${art}.`);
      if (description) v1.push(`Topic: ${description}.`);
      if (audience)    v1.push(`Audience: ${aud}.`);
      if (fmt)         v1.push(`Format: ${fmt}.`);
      if (style)       v1.push(`Style: ${sty}.`);
      if (beispiel)    v1.push(`Reference: ${beispiel}`);

      const v2 = [];
      if (description) v2.push(`About "${description}": `);
      if (type)        v2.push(`Write ${art}${audience ? ` for ${aud}` : ''}.`);
      const det = [];
      if (fmt)   det.push(fmt);
      if (style) det.push(`${sty} tone`);
      if (perspective) det.push(PERSPECTIVE_MAP_EN[perspective] || perspective);
      if (det.length) v2.push(`Consider: ${det.join(', ')}.`);
      if (beispiel) v2.push(`Base your style on: ${beispiel}`);

      const v3 = [];
      v3.push(style ? `You are a ${sty} copywriter.` : 'You are an experienced copywriter.');
      if (type && description) v3.push(`Create ${art} about: ${description}.`);
      else if (type)            v3.push(`Create ${art}.`);
      if (audience) v3.push(`Target audience: ${aud}.`);
      if (fmt)      v3.push(`Format: ${fmt}.`);
      if (addressForm) v3.push(`Use ${ADDRESS_MAP_EN[addressForm] || addressForm} address form.`);
      if (beispiel) v3.push(`Style reference: ${beispiel}`);

      return [v1.join(' '), v2.join(''), v3.join(' ')].filter(v => v.trim().length > 5);
    }

    const art = ARTICLE_MAP[type] ?? 'einen ';
    const fp = [];
    if (length)   fp.push(LENGTH_MAP[length] || length);
    if (formatting) fp.push(formatting);
    if (seo === 'Ja') fp.push('SEO-Keywords');
    if (titleSub === 'ja') fp.push('Titel');
    if (emojis === 'keine') fp.push('keine Emojis');
    else if (emojis === 'wenige') fp.push('wenige Emojis');
    else if (emojis === 'viele') fp.push('viele Emojis');
    const fmt = fp.join(', ');

    const v1 = [];
    if (type) v1.push(`Verfasse ${art}${type}.`);
    if (description) v1.push(`Thema: ${description}.`);
    if (audience)    v1.push(`Zielgruppe: ${audience}.`);
    if (fmt)         v1.push(`Format: ${fmt}.`);
    if (style)       v1.push(`Stil: ${style}.`);
    if (beispiel)    v1.push(`Referenz: ${beispiel}`);

    const v2 = [];
    if (description) v2.push(`Zum Thema „${description}": `);
    if (type)        v2.push(`Schreibe ${art}${type}${audience ? ` für ${audience}` : ''}.`);
    const det = [];
    if (fmt)   det.push(fmt);
    if (style) det.push(`${style.toLowerCase()} Stil`);
    if (perspective) det.push(perspective);
    if (det.length) v2.push(`Berücksichtige: ${det.join(', ')}.`);
    if (beispiel) v2.push(`Orientiere dich an: ${beispiel}`);

    const v3 = [];
    v3.push(style ? `Du bist ein ${style.toLowerCase()} schreibender Texter.` : 'Du bist ein erfahrener Texter.');
    if (type && description) v3.push(`Erstelle ${art}${type} über: ${description}.`);
    else if (type)            v3.push(`Erstelle ${art}${type}.`);
    if (audience) v3.push(`Zielgruppe: ${audience}.`);
    if (fmt)      v3.push(`Format: ${fmt}.`);
    if (addressForm) v3.push(`Schreibe in der ${ADDRESS_MAP[addressForm] || addressForm}.`);
    if (beispiel) v3.push(`Stilreferenz: ${beispiel}`);

    return [v1.join(' '), v2.join(''), v3.join(' ')].filter(v => v.trim().length > 5);
  };

  const showVariations = () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const vars = buildVariations();
    const list = document.getElementById('variations-list');
    if (!list) return;
    if (!vars.length) {
      list.innerHTML = `<p class="text-muted text-center py-3">${t['variations.empty']}</p>`;
    } else {
      list.innerHTML = vars.map((v, i) => `
        <div class="variation-item" data-text="${v.replace(/"/g, '&quot;')}">
          <div class="variation-num">Variation ${i + 1}</div>
          <div class="variation-text">${esc(v)}</div>
          <button type="button" class="action-btn action-btn--outline variation-copy-btn mt-2">
            <i class="fa-solid fa-copy me-1"></i>${t['lib.btn.copy']}
          </button>
        </div>`).join('');
    }
    variationsModal.show();
  };

  document.getElementById('variations-list')?.addEventListener('click', async e => {
    const btn = e.target.closest('.variation-copy-btn');
    if (!btn) return;
    const text = btn.closest('.variation-item')?.dataset.text;
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    copyToast.show();
  });

  // ── UI Sprache (Mehrsprachige UI) ─────────────────────────────────────────
  const UI_STRINGS = {
    de: {
      'header.subtitle': 'KI Prompt-Generator',
      'btn.toggleAll.close': 'Alle schließen', 'btn.toggleAll.open': 'Alle aufklappen',
      'btn.history': 'Verlauf', 'btn.help': 'Hilfe',
      'catalog.title': 'Prompt-Katalog',
      'catalog.subtitle': '– Vorlage wählen und alle Felder automatisch befüllen',
      'filter.all': 'Alle', 'filter.medizin': 'Medizin', 'filter.recht': 'Recht', 'filter.bildung': 'Bildung',
      'step.aufgabe': 'Aufgabe', 'step.kontext': 'Kontext', 'step.format': 'Format',
      'step.persona': 'Persona', 'step.tonfall': 'Tonfall', 'step.beispiel': 'Beispiel',
      'badge.essential': 'Essenziell', 'badge.important': 'Wichtig', 'badge.optional': 'Optional',
      'hint.aufgabe': 'Was genau willst du erreichen?',
      'hint.kontext': 'Um was geht\'s? Was ist der Hintergrund?',
      'hint.format': 'Wie soll die Ausgabe strukturiert sein?',
      'hint.persona': 'Wer schreibt – und wie spricht er die Leser an?',
      'hint.tonfall': 'Welche Stimmung soll der Text vermitteln?',
      'hint.beispiel': 'Ctrl+C → Ctrl+V: Gib einen Referenztext oder Stilhinweis an',
      'lbl.contenttype': 'Texttyp / Verwendungszweck', 'lbl.topic': 'Thema & Inhalt',
      'lbl.audience': 'Zielgruppe', 'lbl.length': 'Textlänge', 'lbl.formatting': 'Formatierung',
      'lbl.emojis': 'Emojis', 'lbl.seo': 'SEO-Keywords', 'lbl.titlesubtitle': 'Titel & Untertitel',
      'lbl.perspective': 'Perspektive', 'lbl.addressform': 'Anredeform', 'lbl.style': 'Sprachstil',
      'lbl.example': 'Stilreferenz oder Beispieltext',
      'preview.title': 'Live-Vorschau', 'tab.visual': 'Visuell', 'tab.flow': 'Prompt',
      'btn.copy': 'Kopieren', 'btn.share': 'Teilen', 'btn.fullscreen': 'Vollansicht',
      'btn.export': 'Exportieren', 'btn.variations': 'Variationen',
      'lbl.openin': 'Öffnen in', 'btn.reset': 'Zurücksetzen',
      'modal.title': 'Generierter Prompt', 'btn.close': 'Schließen',
      'history.title': 'Prompt-Verlauf', 'history.empty': 'Noch keine Prompts generiert.',
      'variations.title': 'Prompt-Variationen',
      'variations.subtitle': '3 alternative Formulierungen deines Prompts – klicke auf eine, um sie zu kopieren.',
      'variations.empty': 'Bitte zuerst mindestens Texttyp oder Thema ausfüllen.',
      'library.tab.mine': 'Meine Prompts', 'library.tab.examples': 'Beispiele',
      'btn.library': 'Bibliothek', 'btn.save': 'Speichern', 'btn.saveConfirm': 'Speichern',
      'save.title': 'In Bibliothek speichern', 'save.label': 'Name / Titel',
      'save.hint': 'Gib dem Prompt einen aussagekräftigen Namen.',
      'save.placeholder': 'z.B. LinkedIn-Post Tech-Startup',
      'library.title': 'Prompt-Bibliothek',
      'library.empty': 'Noch keine Prompts gespeichert.',
      'library.emptyhint': 'Generiere einen Prompt und klicke auf „Speichern".',
      'lib.btn.load': 'Laden', 'lib.btn.copy': 'Kopieren', 'lib.btn.delete': 'Löschen',
      'toast.saved': 'In Bibliothek gespeichert!',
      'toast.copy': 'Prompt in Zwischenspeicher kopiert!',
      'toast.share': 'Link in Zwischenspeicher kopiert!',
      'btn.next': 'Weiter', 'btn.toPreview': 'Zur Vorschau',
      'ph.description': 'Beschreibe das Thema, den Inhalt oder das Ziel deines Textes …',
      'ph.beispiel': 'z.B. „Schreibe wie Tim Ferriss" oder füge einen Beispieltext ein …',
      'tooltip.contenttype': 'Wähle den Typ des Textes, z.B. Blog-Post, LinkedIn-Beitrag oder Newsletter.',
      'tooltip.topic': 'Beschreibe das Thema so konkret wie möglich, z.B. \'5 KI-Tools für Einsteiger im Büroalltag\'.',
      'tooltip.audience': 'Für wen schreibst du? Je genauer die Zielgruppe, desto passender der generierte Text.',
      'tooltip.style': 'z.B. \'Journalistisch\' für Artikel, \'Werblich\' für Sales-Texte, \'Persönlich\' für Social Media.',
      'status.ready': 'Bereit zum Kopieren', 'status.waiting': 'Warte auf Eingaben …',
      'status.words': 'Wörter', 'status.chars': 'Zeichen',
      'preview.empty.title': 'Noch keine Eingaben',
      'preview.empty.sub': 'Wähle eine Vorlage aus dem Katalog<br>oder fülle die Felder Schritt für Schritt aus',
      'preview.intro': 'Generiere einen personalisierten Text unter Berücksichtigung folgender Details:',
      'grp.article_blog': 'Artikel & Blog', 'grp.social_media': 'Social Media',
      'grp.marketing_seo': 'Marketing & SEO', 'grp.email_komm': 'E-Mail & Kommunikation',
      'grp.business_karriere': 'Business & Karriere', 'grp.multimedia': 'Multimedia',
      'grp.kreativ': 'Kreativ', 'grp.interaktiv': 'Interaktiv',
      'grp.b2c_privat': 'B2C – Privat', 'grp.b2b_business': 'B2B – Business',
      'grp.interests': 'Interessen & Community',
      'toast.openin': 'Prompt kopiert – mit Ctrl+V einfügen',
      'toast.imported': 'Prompts importiert!',
      'toast.presetSaved': 'Vorlage gespeichert!',
      'lib.export': 'Export', 'lib.import': 'Import',
      'library.tab.presets': 'Vorlagen',
      'presets.save.label': 'Aktuelle Einstellungen speichern als:',
      'presets.save.placeholder': 'z.B. Blog-Post Vorlage',
      'presets.save.btn': 'Speichern',
      'presets.save.hint': 'Speichert alle 12 Formularfelder als wiederverwendbare Vorlage.',
      'presets.empty': 'Noch keine Vorlagen gespeichert.',
      'presets.emptyhint': 'Fülle das Formular aus und speichere deine Einstellungen als Vorlage.',
      'presets.btn.load': 'Laden', 'presets.btn.delete': 'Löschen',
      'analyzer.title': 'Prompt-Qualität',
      'analyzer.tip.prefix': 'Tipp:',
      'analyzer.tip.type': 'Wähle einen Texttyp, um die Aufgabe klar zu definieren.',
      'analyzer.tip.topic': 'Beschreibe das Thema konkret – je mehr Details, desto besser das Ergebnis.',
      'analyzer.tip.audience': 'Gib eine Zielgruppe an für passgenauere Ergebnisse.',
      'analyzer.tip.length': 'Lege eine Textlänge fest, damit die KI die Ausgabe anpassen kann.',
      'analyzer.tip.style': 'Wähle einen Sprachstil, um den Ton des Textes zu steuern.',
      'analyzer.tip.example': 'Füge eine Stilreferenz hinzu (z.B. „Schreibe wie ...") für authentischere Ausgaben.',
      'analyzer.quality.basic': 'Basis', 'analyzer.quality.good': 'Gut', 'analyzer.quality.excellent': 'Ausgezeichnet',
      'lbl.role': 'Rolle / KI-Persona',
      'ph.role': 'z.B. Du bist ein erfahrener Marketing-Experte mit 10 Jahren B2B-Erfahrung …',
      'hint.role': 'Optional aber wirkungsvoll – definiert die Perspektive der KI.',
      'filter.favorites': '⭐ Favoriten',
      'toast.reset': 'Formular zurückgesetzt',
      'btn.undo': 'Rückgängig',
      'qr.title': 'Prompt teilen via QR-Code',
      'qr.hint': 'Scanne den Code, um den Prompt auf einem anderen Gerät zu öffnen.',
      'btn.qrdownload': 'PNG herunterladen',
      'placeholder.title': 'Platzhalter ausfüllen',
      'placeholder.hint': 'Ersetze die {{Platzhalter}} in doppelten Klammern mit deinen eigenen Werten.',
      'btn.placeholderConfirm': 'Übernehmen',
      'analyzer.tip.role': 'Füge eine Rollendefinition hinzu (z.B. „Du bist ein erfahrener Marketing-Experte") – der wirksamste Prompt-Trick überhaupt.',
      'presets.save.hint': 'Speichert alle 13 Formularfelder als wiederverwendbare Vorlage.',
      'lib.btn.duplicate': 'Duplizieren',
      'btn.inspire': 'Inspirier mich',
      'btn.focus': 'Fokus-Modus',
      'btn.focusExit': 'Fokus beenden',
      'lib.search.placeholder': 'Suchen …',
      'lib.search.empty': 'Keine Treffer',
    },
    en: {
      'header.subtitle': 'AI Prompt Generator',
      'btn.toggleAll.close': 'Collapse all', 'btn.toggleAll.open': 'Expand all',
      'btn.history': 'History', 'btn.help': 'Help',
      'catalog.title': 'Prompt Catalog',
      'catalog.subtitle': '– Choose a template and auto-fill all fields',
      'filter.all': 'All', 'filter.medizin': 'Medicine', 'filter.recht': 'Law', 'filter.bildung': 'Education',
      'step.aufgabe': 'Task', 'step.kontext': 'Context', 'step.format': 'Format',
      'step.persona': 'Persona', 'step.tonfall': 'Tone', 'step.beispiel': 'Example',
      'badge.essential': 'Essential', 'badge.important': 'Important', 'badge.optional': 'Optional',
      'hint.aufgabe': 'What exactly do you want to achieve?',
      'hint.kontext': 'What\'s it about? What\'s the background?',
      'hint.format': 'How should the output be structured?',
      'hint.persona': 'Who is writing – and how do they address readers?',
      'hint.tonfall': 'What mood should the text convey?',
      'hint.beispiel': 'Ctrl+C → Ctrl+V: Provide a reference text or style hint',
      'lbl.contenttype': 'Content Type / Purpose', 'lbl.topic': 'Topic & Content',
      'lbl.audience': 'Target Audience', 'lbl.length': 'Text Length', 'lbl.formatting': 'Formatting',
      'lbl.emojis': 'Emojis', 'lbl.seo': 'SEO Keywords', 'lbl.titlesubtitle': 'Title & Subtitle',
      'lbl.perspective': 'Perspective', 'lbl.addressform': 'Form of Address', 'lbl.style': 'Writing Style',
      'lbl.example': 'Style Reference or Example Text',
      'preview.title': 'Live Preview', 'tab.visual': 'Visual', 'tab.flow': 'Prompt',
      'btn.copy': 'Copy', 'btn.share': 'Share', 'btn.fullscreen': 'Full View',
      'btn.export': 'Export', 'btn.variations': 'Variations',
      'lbl.openin': 'Open in', 'btn.reset': 'Reset',
      'modal.title': 'Generated Prompt', 'btn.close': 'Close',
      'history.title': 'Prompt History', 'history.empty': 'No prompts generated yet.',
      'variations.title': 'Prompt Variations',
      'variations.subtitle': '3 alternative formulations of your prompt – click one to copy.',
      'variations.empty': 'Please fill in at least a content type or topic first.',
      'library.tab.mine': 'My Prompts', 'library.tab.examples': 'Examples',
      'btn.library': 'Library', 'btn.save': 'Save', 'btn.saveConfirm': 'Save',
      'save.title': 'Save to Library', 'save.label': 'Name / Title',
      'save.hint': 'Give the prompt a descriptive name.',
      'save.placeholder': 'e.g. LinkedIn Post Tech Startup',
      'library.title': 'Prompt Library',
      'library.empty': 'No prompts saved yet.',
      'library.emptyhint': 'Generate a prompt and click "Save".',
      'lib.btn.load': 'Load', 'lib.btn.copy': 'Copy', 'lib.btn.delete': 'Delete',
      'toast.saved': 'Saved to library!',
      'toast.copy': 'Prompt copied to clipboard!',
      'toast.share': 'Link copied to clipboard!',
      'btn.next': 'Next', 'btn.toPreview': 'To Preview',
      'ph.description': 'Describe the topic, content or goal of your text …',
      'ph.beispiel': 'e.g. "Write like Tim Ferriss" or paste a sample text to match the style …',
      'tooltip.contenttype': 'Choose the type of text, e.g. Blog Post, LinkedIn Post or Newsletter.',
      'tooltip.topic': 'Describe the topic as specifically as possible, e.g. \'5 AI Tools for Beginners\'.',
      'tooltip.audience': 'Who are you writing for? The more specific the audience, the better the result.',
      'tooltip.style': 'e.g. \'Journalistic\' for articles, \'Promotional\' for sales copy, \'Personal\' for social media.',
      'status.ready': 'Ready to copy', 'status.waiting': 'Waiting for input …',
      'status.words': 'words', 'status.chars': 'characters',
      'preview.empty.title': 'No input yet',
      'preview.empty.sub': 'Choose a template from the catalog<br>or fill in the fields step by step',
      'preview.intro': 'Generate a personalised text based on the following details:',
      'grp.article_blog': 'Article & Blog', 'grp.social_media': 'Social Media',
      'grp.marketing_seo': 'Marketing & SEO', 'grp.email_komm': 'Email & Communication',
      'grp.business_karriere': 'Business & Career', 'grp.multimedia': 'Multimedia',
      'grp.kreativ': 'Creative', 'grp.interaktiv': 'Interactive',
      'grp.b2c_privat': 'B2C – Private', 'grp.b2b_business': 'B2B – Business',
      'grp.interests': 'Interests & Community',
      'toast.openin': 'Prompt copied – paste with Ctrl+V',
      'toast.imported': 'Prompts imported!',
      'toast.presetSaved': 'Template saved!',
      'lib.export': 'Export', 'lib.import': 'Import',
      'library.tab.presets': 'Templates',
      'presets.save.label': 'Save current settings as:',
      'presets.save.placeholder': 'e.g. Blog Post Template',
      'presets.save.btn': 'Save',
      'presets.save.hint': 'Saves all 12 form fields as a reusable template.',
      'presets.empty': 'No templates saved yet.',
      'presets.emptyhint': 'Fill in the form and save your settings as a template.',
      'presets.btn.load': 'Load', 'presets.btn.delete': 'Delete',
      'analyzer.title': 'Prompt Quality',
      'analyzer.tip.prefix': 'Tip:',
      'analyzer.tip.type': 'Choose a content type to clearly define the task.',
      'analyzer.tip.topic': 'Describe the topic in detail – more specifics lead to better results.',
      'analyzer.tip.audience': 'Specify a target audience for more relevant output.',
      'analyzer.tip.length': 'Set a text length so the AI can calibrate the output.',
      'analyzer.tip.style': 'Choose a writing style to control the tone of the text.',
      'analyzer.tip.example': 'Add a style reference (e.g. "Write like ...") for more authentic output.',
      'analyzer.quality.basic': 'Basic', 'analyzer.quality.good': 'Good', 'analyzer.quality.excellent': 'Excellent',
      'lbl.role': 'Role / AI Persona',
      'ph.role': 'e.g. You are an experienced marketing expert with 10 years of B2B experience …',
      'hint.role': 'Optional but powerful – defines the perspective of the AI.',
      'filter.favorites': '⭐ Favourites',
      'toast.reset': 'Form reset',
      'btn.undo': 'Undo',
      'qr.title': 'Share Prompt via QR Code',
      'qr.hint': 'Scan the code to open the prompt on another device.',
      'btn.qrdownload': 'Download PNG',
      'placeholder.title': 'Fill in Placeholders',
      'placeholder.hint': 'Replace the {{placeholders}} in double brackets with your own values.',
      'btn.placeholderConfirm': 'Apply',
      'analyzer.tip.role': 'Add a role definition (e.g. "You are an experienced marketing expert") – the single most powerful prompt technique.',
      'presets.save.hint': 'Saves all 13 form fields as a reusable template.',
      'lib.btn.duplicate': 'Duplicate',
      'btn.inspire': 'Inspire me',
      'btn.focus': 'Focus Mode',
      'btn.focusExit': 'Exit Focus',
      'lib.search.placeholder': 'Search …',
      'lib.search.empty': 'No results',
    },
  };

  let uiLang = 'de';

  const applyUILang = (lang) => {
    uiLang = lang;
    const t = UI_STRINGS[lang] || UI_STRINGS.de;

    // text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });
    // placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (t[key]) el.placeholder = t[key];
    });
    // optgroup labels
    document.querySelectorAll('[data-i18n-grp]').forEach(grp => {
      const key = grp.dataset.i18nGrp;
      if (t[key]) grp.label = t[key];
    });
    // dropdown option labels (value stays as German internal key)
    const optLabels = OPTION_LABELS[lang] || OPTION_LABELS.de;
    Object.entries(optLabels).forEach(([selectId, labels]) => {
      const sel = document.getElementById(selectId);
      if (!sel) return;
      sel.querySelectorAll('option').forEach(opt => {
        if (labels[opt.value] !== undefined) opt.textContent = labels[opt.value];
      });
    });
    // tooltips
    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
      const key = el.dataset.i18nTooltip;
      if (!t[key]) return;
      el.setAttribute('data-bs-title', t[key]);
      const tip = bootstrap.Tooltip.getInstance(el);
      if (tip) tip.setContent({ '.tooltip-inner': t[key] });
    });

    // translate favorites filter chip
    const favChip = document.querySelector('[data-filter="favoriten"]');
    if (favChip && t['filter.favorites']) favChip.textContent = t['filter.favorites'];

    // update focus mode label (if focus mode is active, show exit label)
    const fmLabel = document.getElementById('focus-mode-label');
    if (fmLabel) fmLabel.textContent = focusMode ? t['btn.focusExit'] : t['btn.focus'];

    if (uiLangLabel) uiLangLabel.textContent = lang === 'de' ? 'EN' : 'DE';
    try { localStorage.setItem('chati_ui_lang', lang); } catch {}
    renderCatalog(activeFilter);
    renderLibrary();
    renderPresets();
    if (activeLibTab === 'examples') renderExamples();
    refreshPreview();
  };

  btnUiLang?.addEventListener('click', () => applyUILang(uiLang === 'de' ? 'en' : 'de'));

  // ── Open in AI tool ───────────────────────────────────────────────────────
  const openInTool = async (url) => {
    const text = getCurrentPrompt().trim();
    if (!text) { window.open(url, '_blank', 'noopener'); return; }
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: text, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    const toastText = document.querySelector('#open-toast [data-i18n="toast.openin"]');
    if (toastText) toastText.textContent = (UI_STRINGS[uiLang] || UI_STRINGS.de)['toast.openin'];
    openToast.show();
    setTimeout(() => window.open(url, '_blank', 'noopener'), 400);
  };

  document.getElementById('btn-open-copilot')?.addEventListener('click', () =>
    openInTool('https://copilot.microsoft.com'));
  document.getElementById('btn-open-chatgpt')?.addEventListener('click', () =>
    openInTool('https://chatgpt.com/'));
  document.getElementById('btn-open-claude')?.addEventListener('click', () =>
    openInTool('https://claude.ai/new'));

  // ── Library Export / Import JSON ──────────────────────────────────────────
  const exportLibrary = () => {
    const items = loadLibrary();
    if (!items.length) return;
    const date = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `chati-library-${date}.json`,
    });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  const importLibrary = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) return;
        const existing = loadLibrary();
        const existingIds = new Set(existing.map(i => i.id));
        const newItems = imported.filter(i => i.id && i.title && i.text && !existingIds.has(i.id));
        const merged = [...newItems, ...existing];
        try { localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(merged)); } catch {}
        renderLibrary();
        const span = document.getElementById('import-toast-text');
        const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
        if (span) span.textContent = `${newItems.length} ${t['toast.imported']}`;
        importToast.show();
      } catch {}
    };
    reader.readAsText(file);
  };

  document.getElementById('btn-lib-export')?.addEventListener('click', exportLibrary);
  document.getElementById('lib-import-input')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) { importLibrary(file); e.target.value = ''; }
  });

  // ── Personal Presets (Field-Presets) ──────────────────────────────────────
  const loadPresets = () => {
    try { return JSON.parse(localStorage.getItem(LS_PRESETS_KEY)) || []; } catch { return []; }
  };

  const savePreset = (name) => {
    const fields = Object.fromEntries(FIELD_IDS.map(id => [id, val(id)]).filter(([, v]) => v));
    if (!Object.keys(fields).length) return false;
    const presets = loadPresets();
    presets.unshift({ id: Date.now(), name, fields });
    try { localStorage.setItem(LS_PRESETS_KEY, JSON.stringify(presets)); return true; } catch { return false; }
  };

  const renderPresets = () => {
    const list = document.getElementById('presets-list');
    const empty = document.getElementById('presets-empty');
    if (!list) return;
    const presets = loadPresets();
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    if (empty) empty.style.display = presets.length ? 'none' : '';
    list.innerHTML = '';
    presets.forEach(preset => {
      const div = document.createElement('div');
      div.className = 'library-item';
      const fieldCount = Object.keys(preset.fields).length;
      div.innerHTML = `
        <div class="library-item__header">
          <span class="library-item__title">${esc(preset.name)}</span>
          <span class="catalog-card__badge" style="font-size:.7rem;">${fieldCount}/12 ${uiLang === 'en' ? 'fields' : 'Felder'}</span>
        </div>
        <div class="library-item__btns">
          <button class="action-btn action-btn--primary preset-btn-load" data-pid="${preset.id}">
            <i class="fa-solid fa-arrow-up-from-bracket me-1"></i>${t['presets.btn.load']}
          </button>
          <button class="action-btn action-btn--ghost preset-btn-delete" data-pid="${preset.id}">
            <i class="fa-solid fa-trash me-1"></i>${t['presets.btn.delete']}
          </button>
        </div>`;
      list.appendChild(div);
    });
  };

  document.getElementById('presets-list')?.addEventListener('click', e => {
    const pid = Number(e.target.closest('[data-pid]')?.dataset.pid);
    if (!pid) return;
    const presets = loadPresets();
    const preset = presets.find(p => p.id === pid);
    if (!preset) return;

    if (e.target.closest('.preset-btn-load')) {
      const doLoad = (fields) => {
        FIELD_IDS.forEach(fid => {
          const el = document.getElementById(fid);
          if (el) el.value = fields?.[fid] || '';
        });
        activeCardId = null;
        renderCatalog(activeFilter);
        refreshPreview();
        autoExpandFilled();
        libraryCanvas.hide();
      };
      const phs = getPlaceholders(preset.fields || {});
      if (phs.size) { openPlaceholderModal(preset.fields, phs, doLoad); return; }
      doLoad(preset.fields);
    }
    if (e.target.closest('.preset-btn-delete')) {
      const updated = presets.filter(p => p.id !== pid);
      try { localStorage.setItem(LS_PRESETS_KEY, JSON.stringify(updated)); } catch {}
      renderPresets();
    }
  });

  document.getElementById('btn-preset-save')?.addEventListener('click', () => {
    const nameInput = document.getElementById('preset-name-input');
    const name = nameInput?.value.trim();
    if (!name) { nameInput?.focus(); return; }
    if (savePreset(name)) {
      if (nameInput) nameInput.value = '';
      renderPresets();
      const span = document.querySelector('#preset-toast [data-i18n="toast.presetSaved"]');
      if (span) span.textContent = (UI_STRINGS[uiLang] || UI_STRINGS.de)['toast.presetSaved'];
      presetToast.show();
    }
  });

  document.getElementById('preset-name-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-preset-save')?.click();
  });

  // ── Smart Prompt Analyzer ─────────────────────────────────────────────────
  const renderAnalyzer = () => {
    const panel = document.getElementById('analyzer-panel');
    if (!panel) return;
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;

    const checks = [
      { id: 'content-type',   label: t['step.aufgabe'],  tip: t['analyzer.tip.type'],     ok: !!val('content-type') },
      { id: 'description',    label: t['step.kontext'],   tip: t['analyzer.tip.topic'],    ok: val('description').length > 10 },
      { id: 'target-audience',label: t['lbl.audience'],   tip: t['analyzer.tip.audience'], ok: !!val('target-audience') },
      { id: 'content-length', label: t['lbl.length'],     tip: t['analyzer.tip.length'],   ok: !!val('content-length') },
      { id: 'language-style', label: t['lbl.style'],      tip: t['analyzer.tip.style'],    ok: !!val('language-style') },
      { id: 'beispiel',       label: t['step.beispiel'],  tip: t['analyzer.tip.example'],  ok: !!val('beispiel') },
    ];

    const score = checks.filter(c => c.ok).length;
    if (score === 0) { panel.innerHTML = ''; return; }

    const qualityKey = score >= 5 ? 'analyzer.quality.excellent' : score >= 3 ? 'analyzer.quality.good' : 'analyzer.quality.basic';
    const qualityClass = score >= 5 ? 'excellent' : score >= 3 ? 'good' : 'basic';
    // Role tip has highest priority; fall back to first missing dimension tip
    const roleEmpty    = !val('role-definition');
    const firstMissing = checks.find(c => !c.ok);
    const activeTip    = roleEmpty
      ? { icon: 'fa-user-tie', text: t['analyzer.tip.role'] }
      : firstMissing
        ? { icon: 'fa-lightbulb', text: firstMissing.tip }
        : null;
    const tipHtml = activeTip
      ? `<div class="analyzer-tip"><i class="fa-solid ${activeTip.icon} me-1"></i><strong>${t['analyzer.tip.prefix']}</strong> ${activeTip.text}</div>`
      : '';

    const badges = checks.map(c =>
      `<span class="analyzer-badge analyzer-badge--${c.ok ? 'ok' : 'miss'}">
        <i class="fa-solid fa-${c.ok ? 'check' : 'xmark'} me-1"></i>${c.label}
      </span>`).join('');

    panel.innerHTML = `
      <div class="analyzer-header">
        <span class="analyzer-title"><i class="fa-solid fa-chart-bar me-1"></i>${t['analyzer.title']}</span>
        <span class="analyzer-score analyzer-score--${qualityClass}">${t[qualityKey]} · ${score}/6</span>
      </div>
      <div class="analyzer-badges">${badges}</div>
      ${tipHtml}`;
  };

  // ── Prompt-Schablonen: Platzhalter-Erkennung ─────────────────────────────
  const PLACEHOLDER_RE = /\{\{([^}]+)\}\}/g;

  const getPlaceholders = (fields) => {
    const found = new Map();
    Object.values(fields).forEach(v => {
      if (typeof v !== 'string') return;
      const re = new RegExp(PLACEHOLDER_RE.source, 'g');
      let m;
      while ((m = re.exec(v)) !== null) {
        if (!found.has(m[1])) found.set(m[1], '');
      }
    });
    return found;
  };

  const fillPlaceholders = (fields, values) => {
    const result = {};
    Object.entries(fields).forEach(([k, v]) => {
      result[k] = typeof v === 'string'
        ? v.replace(/\{\{([^}]+)\}\}/g, (_, name) => values[name] ?? `{{${name}}}`)
        : v;
    });
    return result;
  };

  let _phCallback = null;
  let _phFields   = null;

  const openPlaceholderModal = (fields, placeholders, callback) => {
    _phCallback = callback;
    _phFields   = fields;
    const container = document.getElementById('placeholder-fields');
    if (!container) return;
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    container.innerHTML = '';
    placeholders.forEach((_, name) => {
      const div = document.createElement('div');
      div.className = 'mb-3';
      div.innerHTML = `
        <label class="form-label fw-semibold" style="font-family:monospace;color:var(--color-primary);">{{${esc(name)}}}</label>
        <input type="text" class="form-control placeholder-input" data-phname="${esc(name)}" placeholder="${esc(name)}">`;
      container.appendChild(div);
    });
    // update modal title
    const titleEl = document.querySelector('#placeholderModal [data-i18n="placeholder.title"]');
    if (titleEl) titleEl.textContent = t['placeholder.title'];
    const hintEl = document.querySelector('#placeholderModal [data-i18n="placeholder.hint"]');
    if (hintEl) hintEl.textContent = t['placeholder.hint'];
    const confirmBtn = document.querySelector('#btn-placeholder-confirm [data-i18n="btn.placeholderConfirm"]');
    if (confirmBtn) confirmBtn.textContent = t['btn.placeholderConfirm'];
    placeholderModal.show();
    setTimeout(() => container.querySelector('.placeholder-input')?.focus(), 350);
  };

  document.getElementById('btn-placeholder-confirm')?.addEventListener('click', () => {
    const values = {};
    document.querySelectorAll('#placeholder-fields .placeholder-input').forEach(inp => {
      values[inp.dataset.phname] = inp.value;
    });
    const filledFields = fillPlaceholders(_phFields || {}, values);
    _phCallback?.(filledFields);
    placeholderModal.hide();
    _phCallback = null;
    _phFields   = null;
  });

  document.getElementById('placeholder-fields')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-placeholder-confirm')?.click();
  });

  // ── QR-Code ───────────────────────────────────────────────────────────────
  const showQR = () => {
    if (typeof QRCode === 'undefined') return;
    const params = new URLSearchParams();
    FIELD_IDS.forEach(id => { const v = val(id); if (v) params.set(id, v); });
    if (![...params.keys()].length) return;
    if (uiLang && uiLang !== 'de') params.set('lang', uiLang);
    const url = `${location.origin}${location.pathname}?${params.toString()}`;
    const container = document.getElementById('qr-code-container');
    if (!container) return;
    container.innerHTML = '';
    new QRCode(container, {
      text: url,
      width: 180,
      height: 180,
      colorDark: '#7c3aed',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
    // update modal labels
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const titleEl = document.querySelector('#qrModal [data-i18n="qr.title"]');
    if (titleEl) titleEl.textContent = t['qr.title'];
    const hintEl = document.querySelector('#qrModal [data-i18n="qr.hint"]');
    if (hintEl) hintEl.textContent = t['qr.hint'];
    qrModal.show();
  };

  document.getElementById('btn-qr')?.addEventListener('click', showQR);

  document.getElementById('btn-qr-download')?.addEventListener('click', () => {
    const canvas = document.querySelector('#qr-code-container canvas');
    const img    = document.querySelector('#qr-code-container img');
    const src    = canvas ? canvas.toDataURL('image/png') : img?.src;
    if (!src) return;
    const a = Object.assign(document.createElement('a'), { href: src, download: 'chati-qr.png' });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  });

  // ── Library & History Search ──────────────────────────────────────────────
  document.getElementById('library-search')?.addEventListener('input', (e) => {
    libSearch = e.target.value;
    renderLibrary();
  });

  document.getElementById('history-search')?.addEventListener('input', (e) => {
    histSearch = e.target.value;
    renderHistory();
  });

  // ── Inspirier mich ────────────────────────────────────────────────────────
  const INSPIRE_TOPICS = [
    'Die 5 wichtigsten KI-Tools für den Büroalltag',
    'Nachhaltige Ernährung: Wie du mit kleinen Änderungen viel bewirkst',
    'Remote Work erfolgreich gestalten: Tipps für mehr Produktivität',
    'Personal Branding auf LinkedIn: So baust du dein Netzwerk auf',
    'E-Commerce-Trends 2025: Was Online-Händler jetzt wissen müssen',
    'Mentale Gesundheit am Arbeitsplatz: Warum sie wichtiger ist denn je',
    'Zeitmanagement im Vergleich: Welche Methode wirklich funktioniert',
    'Startup-Kultur vs. Konzern: Vor- und Nachteile im direkten Vergleich',
    'Social Media Detox: Was passiert, wenn du eine Woche offline gehst',
    'Finanzen mit 30: Wie du jetzt mit der Altersvorsorge anfängst',
    'Kreativität fördern: 10 einfache Übungen für den Alltag',
    'Digital Nomads: Freiheit oder Illusion? Ein ehrlicher Erfahrungsbericht',
    'Kundengewinnung ohne Budget: Growth Hacks für Startups',
    'Work-Life-Balance: Ein Mythos oder wirklich erreichbares Ziel?',
    'Die Psychologie hinter viralen Social-Media-Posts',
    'Agile Methoden in kleinen Teams: Was wirklich funktioniert',
    'E-Mail-Marketing 2025: Noch relevant oder schon überholt?',
    'Gesunde Routinen für Gründer: Morgen, Tag und Abend strukturieren',
    'Kundenbindung im digitalen Zeitalter: Strategien und Praxisbeispiele',
    'Storytelling im Marketing: Wie du mit Geschichten verkaufst',
    'Produktivitäts-Apps im Vergleich: Was hilft wirklich?',
    'Community Building: Wie du eine treue Follower-Gemeinschaft aufbaust',
  ];

  const INSPIRE_ROLES = [
    'Du bist ein erfahrener Marketing-Experte mit Fokus auf digitale Kanäle.',
    'Du bist ein kreativer Texter mit 10 Jahren Agenturerfahrung.',
    'Du bist ein Business-Coach für Selbstständige und Unternehmer.',
    'Du bist ein SEO-Spezialist mit tiefem technischen Know-how.',
    'Du bist ein Social-Media-Manager mit Expertise in Engagement-Strategien.',
    'Du bist ein empathischer Berater für persönliche Entwicklung.',
    '', '', // no role (weighted more common)
  ];

  const inspireRandom = () => {
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randSelect = (id) => {
      const opts = Array.from(document.getElementById(id)?.options || [])
        .filter(o => o.value).map(o => o.value);
      return opts.length ? rand(opts) : '';
    };
    const el = (id) => document.getElementById(id);
    if (el('content-type'))    el('content-type').value    = randSelect('content-type');
    if (el('description'))     el('description').value     = rand(INSPIRE_TOPICS);
    if (el('target-audience')) el('target-audience').value = randSelect('target-audience');
    if (el('content-length'))  el('content-length').value  = randSelect('content-length');
    if (el('formatting'))      el('formatting').value      = randSelect('formatting');
    if (el('language-style'))  el('language-style').value  = randSelect('language-style');
    if (el('perspective'))     el('perspective').value     = randSelect('perspective');
    if (el('address-form'))    el('address-form').value    = randSelect('address-form');
    const emojiChoice = rand(['keine', 'keine', 'wenige', 'wenige', 'viele']);
    if (el('emoji-option'))          el('emoji-option').value          = emojiChoice;
    if (el('seo-keyword-option'))    el('seo-keyword-option').value    = rand(['Ja', 'Nein']);
    if (el('title-subtitle-option')) el('title-subtitle-option').value = rand(['ja', 'nein']);
    if (el('role-definition'))       el('role-definition').value       = rand(INSPIRE_ROLES);
    if (el('beispiel'))              el('beispiel').value              = '';
    editedPromptText = null;
    activeCardId = null;
    renderCatalog(activeFilter);
    refreshPreview();
    autoExpandFilled();
  };

  document.getElementById('btn-inspire')?.addEventListener('click', inspireRandom);

  // ── Fokus-Modus ───────────────────────────────────────────────────────────
  const toggleFocusMode = () => {
    focusMode = !focusMode;
    const toToggle = [
      document.getElementById('catalog-body')?.closest('.section-card'),
      ...STEP_BODIES.map(id => document.getElementById(id)?.closest('.section-card')),
    ].filter(Boolean);
    toToggle.forEach(card => { card.style.display = focusMode ? 'none' : ''; });

    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const label = document.getElementById('focus-mode-label');
    const icon  = document.getElementById('focus-mode-icon');
    if (label) label.textContent = focusMode ? t['btn.focusExit'] : t['btn.focus'];
    if (icon)  icon.className    = `fa-solid ${focusMode ? 'fa-eye-slash' : 'fa-eye'} me-2`;

    // Scroll to preview
    if (focusMode) {
      setTimeout(() => {
        document.querySelector('[data-target="body-preview"]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  document.getElementById('btn-focus')?.addEventListener('click', toggleFocusMode);

  // ── Keyboard Shortcuts ────────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select';

    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      copyPrompt();
      return;
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      const text = getCurrentPrompt().trim();
      if (!text) return;
      const titleInput = document.getElementById('library-title-input');
      if (titleInput) titleInput.value = '';
      saveModal.show();
      setTimeout(() => titleInput?.focus(), 350);
      return;
    }
    if (e.key === 'Escape' && !isTyping) {
      const anyModalOpen = document.querySelector('.modal.show');
      const anyOffcanvasOpen = document.querySelector('.offcanvas.show');
      if (!anyModalOpen && !anyOffcanvasOpen) resetForm();
      return;
    }
    if (!isTyping && !e.ctrlKey && !e.altKey && !e.metaKey && e.key >= '1' && e.key <= '6') {
      const steps = ['body-aufgabe', 'body-kontext', 'body-format', 'body-persona', 'body-tonfall', 'body-beispiel'];
      const idx = parseInt(e.key) - 1;
      e.preventDefault();
      openSection(steps[idx]);
    }
  });

  // ── Init ──────────────────────────────────────────────────────────────────

  // Theme first (before paint)
  try {
    const t = localStorage.getItem(LS_THEME_KEY);
    if (t === 'dark') applyTheme(true);
  } catch {}

  // Bootstrap Tooltips initialisieren
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el =>
    new bootstrap.Tooltip(el, { trigger: 'hover focus' })
  );

  // UI-Sprache aus localStorage laden
  try {
    const savedUiLang = localStorage.getItem('chati_ui_lang');
    if (savedUiLang && savedUiLang !== 'de') applyUILang(savedUiLang);
  } catch {}

  renderCatalog();
  catalogBody.style.maxHeight = 'none';

  // Guided mode: collapse all step sections on load
  STEP_BODIES.forEach(id => {
    const body = document.getElementById(id);
    if (!body) return;
    body.style.maxHeight = '0';
    body.classList.add('collapsed');
    const header = document.querySelector(`[data-target="${id}"]`);
    header?.querySelector('.section-chevron')?.classList.add('collapsed');
  });

  restoreFromUrl();      // URL params take priority
  restoreForm();         // then localStorage
  refreshPreview();
  autoExpandFilled();    // re-open steps that have saved data
  // If nothing was restored, open the first section so the user knows where to start
  const anyStepOpen = STEP_BODIES.some(id => !document.getElementById(id)?.classList.contains('collapsed'));
  if (!anyStepOpen) openSection('body-aufgabe');
  renderHistory();

  // PWA service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

});

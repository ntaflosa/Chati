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
  const btnTheme        = document.getElementById('btn-theme');
  const themeIcon       = document.getElementById('theme-icon');
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
  const ctxToast       = new bootstrap.Toast(document.getElementById('ctx-toast'),    { delay: 2500 });

  const qrModal          = new bootstrap.Modal(document.getElementById('qrModal'));
  const placeholderModal = new bootstrap.Modal(document.getElementById('placeholderModal'));
  const reverseModal     = new bootstrap.Modal(document.getElementById('reverseModal'));
  const projectCtxCanvas = new bootstrap.Offcanvas(document.getElementById('projectCtxOffcanvas'));

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
  const LS_FAVORITES_KEY  = 'chati_favorites';
  const LS_THEME_KEY      = 'chati_theme';
  const LS_PROJECT_CTX    = 'chati_project_ctx';
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

    const _ctxDE = buildCtxPreviewText(loadProjectCtx());
    if (_ctxDE) s.push(_ctxDE);
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

    const _ctxEN = buildCtxPreviewText(loadProjectCtx());
    if (_ctxEN) s.push(_ctxEN);
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

  // ── Prompt Reverse-Engineer (Feature: Analysieren) ───────────────────────
  const analyzePrompt = (text) => {
    const result = {};

    // Role / Persona
    const rolePatterns = [
      /(?:du bist|sie sind|agiere als|handele als)\s+([^.!?\n]{5,120})/i,
      /(?:act as|you are|you're)\s+([^.!?\n]{5,120})/i,
    ];
    for (const p of rolePatterns) {
      const m = text.match(p);
      if (m) { result['role-definition'] = m[0].trim().replace(/[,.]$/, ''); break; }
    }

    // Content type
    const typePatterns = [
      { p: /pressemitteilung|press.?release/i,             v: 'Pressemitteilung' },
      { p: /whitepaper/i,                                  v: 'Whitepaper' },
      { p: /case.?stud/i,                                  v: 'Case-Study' },
      { p: /newsletter/i,                                  v: 'Newsletter' },
      { p: /landing.?page/i,                               v: 'Landing Page' },
      { p: /linkedin/i,                                    v: 'LinkedIn-Beitrag' },
      { p: /instagram/i,                                   v: 'Instagram-Beitrag' },
      { p: /facebook/i,                                    v: 'Facebook-Beitrag' },
      { p: /tweet|twitter/i,                               v: 'Twitter-Beitrag' },
      { p: /tiktok/i,                                      v: 'TikTok-Skript' },
      { p: /youtube/i,                                     v: 'YouTube-Video' },
      { p: /podcast/i,                                     v: 'Podcast-Episode' },
      { p: /executive.?summary/i,                          v: 'Executive Summary' },
      { p: /bericht|report(?!\w)/i,                        v: 'Bericht / Report' },
      { p: /stellenanzeige|job.?posting/i,                 v: 'Stellenanzeige' },
      { p: /produktbeschreibung|product.?description/i,    v: 'Produktbeschreibung' },
      { p: /seo.?text|seo.?artikel|seo.?article/i,        v: 'SEO-Text' },
      { p: /how.?to|schritt.?für.?schritt|step.?by.?step/i, v: 'How-to-Anleitung' },
      { p: /kaltakquise|cold.?outreach|cold.?email/i,     v: 'Kaltakquise-E-Mail' },
      { p: /follow.?up/i,                                  v: 'Follow-up-E-Mail' },
      { p: /e.?mail|email/i,                               v: 'E-Mail' },
      { p: /präsentation|presentation/i,                   v: 'Präsentation' },
      { p: /blog.?post|blogartikel/i,                      v: 'Blog-Post' },
      { p: /artikel|article/i,                             v: 'Artikel' },
    ];
    for (const { p, v } of typePatterns) {
      if (p.test(text)) { result['content-type'] = v; break; }
    }

    // Length
    const wordMatch = text.match(/(\d+)\s*(?:wörter|wörtern|words)/i);
    if (wordMatch) {
      const n = parseInt(wordMatch[1]);
      if (n <= 100)       result['content-length'] = 'Sehr kurz (50–100 Wörter)';
      else if (n <= 300)  result['content-length'] = 'Kurz (100–300 Wörter)';
      else if (n <= 600)  result['content-length'] = 'Mittel (300–600 Wörter)';
      else if (n <= 1200) result['content-length'] = 'Lang (600–1.200 Wörter)';
      else                result['content-length'] = 'Sehr lang (1.200+ Wörter)';
    } else if (/\bkurz\b|brief|concise/i.test(text)) {
      result['content-length'] = 'Kurz (100–300 Wörter)';
    } else if (/ausführlich|detailliert|detailed|comprehensive|lang\b/i.test(text)) {
      result['content-length'] = 'Lang (600–1.200 Wörter)';
    }

    // Style
    const stylePatterns = [
      { p: /wissenschaftlich|academic|scholarly/i,   v: 'Wissenschaftlich' },
      { p: /journalistisch|journalistic/i,            v: 'Journalistisch' },
      { p: /werblich|promotional/i,                   v: 'Werblich' },
      { p: /technisch|technical/i,                    v: 'Technisch' },
      { p: /humorvoll|humor|witzig|funny/i,           v: 'Humorvoll' },
      { p: /inspir/i,                                 v: 'Inspirierend' },
      { p: /emotiona/i,                               v: 'Emotional' },
      { p: /motivier|motivat/i,                       v: 'Motivierend' },
      { p: /sachlich|factual|neutral/i,               v: 'Sachlich' },
      { p: /persönlich|personal/i,                    v: 'Persönlich' },
      { p: /storytelling/i,                           v: 'Storytelling' },
      { p: /formell|formal|professionell|professional/i, v: 'Formell' },
      { p: /informell|locker|casual|informal/i,       v: 'Informell' },
    ];
    for (const { p, v } of stylePatterns) {
      if (p.test(text)) { result['language-style'] = v; break; }
    }

    // Audience
    const audiencePatterns = [
      { p: /b2b.{0,20}entscheider|b2b.{0,20}decision/i, v: 'B2B-Entscheider' },
      { p: /manager|führungskraft|executive|c-?level/i,  v: 'Manager & Führungskräfte' },
      { p: /startup|gründer|founder/i,                   v: 'Gründer & Startups' },
      { p: /it.?profes|entwickler|developer|programmer/i,v: 'IT-Professionals' },
      { p: /senior|50\+|ältere/i,                        v: 'Senioren (50+ Jahre)' },
      { p: /jugend|teenager|16.{0,3}25/i,                v: 'Jugendliche (16–25 Jahre)' },
      { p: /schüler|student|auszubildend/i,              v: 'Schüler & Auszubildende (15–22 Jahre)' },
      { p: /eltern|famili|parent|family/i,               v: 'Eltern & Familien' },
      { p: /kreativ|designer|creative/i,                 v: 'Kreative & Designer' },
      { p: /b2b|unternehmen|geschäftskund/i,             v: 'Manager & Führungskräfte' },
    ];
    for (const { p, v } of audiencePatterns) {
      if (p.test(text)) { result['target-audience'] = v; break; }
    }

    // Formatting
    if (/bullet.?point|aufzählung|stichpunkt/i.test(text))              result['formatting'] = 'Bullet Points';
    else if (/tabelle|tabellarisch|table/i.test(text))                  result['formatting'] = 'Tabellarisch';
    else if (/faq/i.test(text))                                         result['formatting'] = 'FAQ-Format (Frage & Antwort)';
    else if (/checkliste|checklist/i.test(text))                        result['formatting'] = 'Checkliste / Aufgabenliste';
    else if (/überschrift|heading|mit abschnitt/i.test(text))           result['formatting'] = 'Überschriften + Fließtext';

    // SEO
    if (/seo.?keyword|keyword|schlüsselwort/i.test(text))              result['seo-keyword-option'] = 'Ja';

    // Emojis
    if (/ohne emoji|no emoji/i.test(text))                             result['emoji-option'] = 'keine';
    else if (/mit emoji|emojis|use emoji/i.test(text))                 result['emoji-option'] = 'wenige';

    // Topic / Description — find the core sentence
    const topicPatterns = [
      /(?:zum thema|über das thema|thema\s*[:\-])\s*([^.!?\n]{10,200})/i,
      /(?:topic\s*[:\-]|about\s*[:\-]?|über\s*[:\-]?)\s*([^.!?\n]{10,200})/i,
    ];
    for (const p of topicPatterns) {
      const m = text.match(p);
      if (m) { result['description'] = m[1].trim(); break; }
    }
    if (!result['description']) {
      // Fall back: first non-command sentence of reasonable length
      const sentences = text.split(/[.!?]/).map(s => s.trim())
        .filter(s => s.length > 25 && !/^(?:du bist|you are|act as|erstelle|create|write|schreibe|erzeuge|generate)/i.test(s));
      if (sentences[0]) {
        const s = sentences[0];
        result['description'] = s.length > 160 ? s.substring(0, 160) + '…' : s;
      }
    }

    return result;
  };

  // ── Projekt-Kontext ───────────────────────────────────────────────────────
  const loadProjectCtx = () => {
    try { return JSON.parse(localStorage.getItem(LS_PROJECT_CTX)) || {}; } catch { return {}; }
  };
  const saveProjectCtxData = (data) => {
    try { localStorage.setItem(LS_PROJECT_CTX, JSON.stringify(data)); } catch {}
  };

  const renderProjectCtxDot = () => {
    const dot = document.getElementById('project-ctx-dot');
    if (!dot) return;
    const ctx = loadProjectCtx();
    const hasContent = ctx.active && (ctx.company || ctx.industry || ctx.extra);
    dot.classList.toggle('d-none', !hasContent);
  };

  const buildCtxPreviewText = (ctx) => {
    if (!ctx.active) return '';
    const parts = [];
    if (ctx.company)  parts.push(`Firma/Projekt: ${ctx.company}`);
    if (ctx.industry) parts.push(`Branche: ${ctx.industry}`);
    if (ctx.extra)    parts.push(ctx.extra);
    return parts.length ? `[Projekt-Kontext: ${parts.join(' · ')}]` : '';
  };

  const renderCtxPreview = () => {
    const box  = document.getElementById('ctx-preview-box');
    const text = document.getElementById('ctx-preview-text');
    const company  = (document.getElementById('ctx-company')?.value  || '').trim();
    const industry = (document.getElementById('ctx-industry')?.value || '').trim();
    const extra    = (document.getElementById('ctx-extra')?.value    || '').trim();
    const active   = document.getElementById('ctx-toggle')?.checked;
    if (box && text) {
      const hasAny = company || industry || extra;
      box.classList.toggle('d-none', !hasAny || !active);
      if (hasAny && active) {
        const parts = [];
        if (company)  parts.push(`Firma/Projekt: ${company}`);
        if (industry) parts.push(`Branche: ${industry}`);
        if (extra)    parts.push(extra);
        text.textContent = `[Projekt-Kontext: ${parts.join(' · ')}]`;
      }
    }
  };

  const openProjectCtx = () => {
    const ctx = loadProjectCtx();
    const toggle  = document.getElementById('ctx-toggle');
    const company = document.getElementById('ctx-company');
    const industry= document.getElementById('ctx-industry');
    const extra   = document.getElementById('ctx-extra');
    if (toggle)   toggle.checked   = !!ctx.active;
    if (company)  company.value    = ctx.company  || '';
    if (industry) industry.value   = ctx.industry || '';
    if (extra)    extra.value      = ctx.extra    || '';
    renderCtxPreview();
    projectCtxCanvas.show();
  };

  const emptyState = () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    return `<div class="pv-empty">
      <div class="pv-empty__icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="pv-empty__title">${t['preview.empty.title']}</div>
      <div class="pv-empty__sub">${t['preview.empty.sub']}</div>
    </div>`;
  };

  // Feature 2: Inline field hints mapping per group
  const PREVIEW_HINT_FIELDS = {
    aufgabe:  { id: 'content-type',   section: 'body-aufgabe' },
    kontext:  { id: 'description',    section: 'body-kontext' },
    format:   { id: 'content-length', section: 'body-format' },
    persona:  { id: 'perspective',    section: 'body-persona' },
    tonfall:  { id: 'language-style', section: 'body-tonfall' },
    beispiel: { id: 'beispiel',       section: 'body-beispiel' },
  };

  // ── Mini-Prompt-Coach data (Feature 20) ──────────────────────────────────
  const COACH_DATA = {
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

  const renderVisual = () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const anyFilled = PREVIEW_GROUPS.some(g => g.getValue());
    if (!anyFilled) return emptyState();

    const hintLabel = uiLang === 'en' ? 'Click to fill' : 'Klicken zum Ausfüllen';

    const rows = PREVIEW_GROUPS.map(g => {
      const value = g.getValue();
      if (value) {
        return `<div class="pv-row">
          <span class="pv-label pv-label--${g.key}"><i class="fa-solid ${g.icon}"></i>${t['step.' + g.key] || g.key}</span>
          <span class="pv-value">${esc(value)}</span>
        </div>`;
      }
      // Feature 2: show clickable empty hint
      const hint = PREVIEW_HINT_FIELDS[g.key];
      if (!hint) return '';
      return `<div class="pv-row pv-row--empty">
        <span class="pv-label pv-label--${g.key}"><i class="fa-solid ${g.icon}"></i>${t['step.' + g.key] || g.key}</span>
        <span class="pv-value">
          <button class="pv-empty-hint" data-jump-section="${hint.section}" data-jump-field="${hint.id}">
            <i class="fa-solid fa-plus-circle"></i>${hintLabel}
          </button>
        </span>
      </div>`;
    }).join('');

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
    // Feature 2: wire empty-hint jump buttons (re-injected on every render)
    livePrompt.querySelectorAll('.pv-empty-hint').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec   = btn.dataset.jumpSection;
        const field = btn.dataset.jumpField;
        if (sec) openSection(sec);
        setTimeout(() => {
          const el = document.getElementById(field);
          if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        }, 280);
      });
    });
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
      category: val('content-type') || '', // Feature 4: store category
      time: now.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    });
    try { localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(items)); } catch {}
  };

  // Feature 11: Recently used templates
  const LS_RECENT_KEY = 'chati_recent';
  const loadRecent = () => { try { return JSON.parse(localStorage.getItem(LS_RECENT_KEY)) || []; } catch { return []; } };
  const saveRecent = (id, name, category) => {
    const items = loadRecent().filter(r => r.id !== id);
    items.unshift({ id, name, category });
    try { localStorage.setItem(LS_RECENT_KEY, JSON.stringify(items.slice(0, 5))); } catch {}
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

    // Feature 11: Recently Used section (only when no search and at top)
    if (!q) {
      const recent = loadRecent();
      if (recent.length) {
        const recentDiv = document.createElement('div');
        recentDiv.className = 'recently-used-section';
        recentDiv.innerHTML = `
          <div class="recently-used-header"><i class="fa-solid fa-clock-rotate-left me-1"></i>${uiLang === 'en' ? 'Recently Used Templates' : 'Zuletzt verwendete Vorlagen'}</div>
          ${recent.map(r => `
            <div class="recently-used-item" data-recent-id="${esc(String(r.id))}">
              <i class="fa-solid fa-bolt recently-used-item__icon"></i>
              <span class="recently-used-item__name">${esc(r.name)}</span>
              <span class="recently-used-item__cat">${esc(r.category || '')}</span>
            </div>`).join('')}`;
        recentDiv.addEventListener('click', e => {
          const item = e.target.closest('.recently-used-item');
          if (item) { applyTemplate(item.dataset.recentId); libraryCanvas.hide(); }
        });
        libraryList.appendChild(recentDiv);
      }
    }

    if (allItems.length && !items.length) {
      const p = document.createElement('p');
      p.className = 'text-center text-muted py-3';
      p.style.fontSize = '.875rem';
      p.innerHTML = `<i class="fa-solid fa-magnifying-glass me-1"></i>${t['lib.search.empty'] || 'Keine Treffer'}`;
      libraryList.appendChild(p);
      return;
    }
    items.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'library-item';
      // Feature 4: category badge
      const catBadge = entry.category
        ? `<span class="lib-category-badge ms-1">${esc(entry.category)}</span>`
        : '';
      div.innerHTML = `
        <div class="library-item__header">
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:.25rem;min-width:0;">
            <span class="library-item__title">${esc(entry.title)}</span>
            ${catBadge}
          </div>
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

  // ── Theme system ──────────────────────────────────────────────────────────
  const THEMES = ['light', 'dark', 'ocean', 'violet', 'forest'];
  const THEME_ICONS = {
    light: 'fa-solid fa-sun', dark: 'fa-solid fa-moon',
    ocean: 'fa-solid fa-water', violet: 'fa-solid fa-star',
    forest: 'fa-solid fa-leaf',
  };

  const applyTheme = (name) => {
    if (!THEMES.includes(name)) name = 'light';
    document.documentElement.setAttribute('data-theme', name);
    if (themeIcon) themeIcon.className = THEME_ICONS[name] || 'fa-solid fa-palette';
    document.querySelectorAll('.theme-swatch').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.themeValue === name)
    );
    try { localStorage.setItem(LS_THEME_KEY, name); } catch {}
  };

  document.querySelectorAll('.theme-swatch').forEach(btn =>
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeValue))
  );

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

  let catalogSearchQuery = '';

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
    // Feature 10: filter by search
    if (catalogSearchQuery) {
      const q = catalogSearchQuery.toLowerCase();
      items = items.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
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
    saveRecent(id, tplDisplay.name, tplDisplay.category); // Feature 11
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

  // Feature 10: Catalog search
  document.getElementById('catalog-search')?.addEventListener('input', e => {
    catalogSearchQuery = e.target.value.trim();
    renderCatalog(activeFilter);
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

  // ── Feature 8: Markdown Export ────────────────────────────────────────────
  const downloadMarkdown = () => {
    const text = getFinalPromptText();
    if (!text) return;
    const date = new Date().toISOString().slice(0, 10);
    const type  = val('content-type');
    const topic = val('description');
    const titleLine = type ? `## ${type}${topic ? ' – ' + topic : ''}` : '## Prompt';
    const metaParts = [];
    if (val('target-audience')) metaParts.push(`**Zielgruppe:** ${val('target-audience')}`);
    if (val('content-length'))  metaParts.push(`**Länge:** ${val('content-length')}`);
    if (val('language-style'))  metaParts.push(`**Stil:** ${val('language-style')}`);
    const meta = metaParts.length ? '\n\n' + metaParts.join('  \n') : '';
    const md = `# Chati Prompt (${date})\n\n${titleLine}${meta}\n\n---\n\n${text}\n\n---\n*Erstellt mit [Chati Prompt-Generator](https://ntaflos.de)*\n`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `chati-prompt-${date}.md`,
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  document.getElementById('btn-export-md')?.addEventListener('click', downloadMarkdown);

  // ── Feature 9: Prompt Compare Modal (DE / EN) ─────────────────────────────
  const compareModal = new bootstrap.Modal(document.getElementById('compareModal'));

  document.getElementById('btn-compare')?.addEventListener('click', () => {
    document.getElementById('compare-text-de').textContent = buildFlowPrompt()   || '–';
    document.getElementById('compare-text-en').textContent = buildFlowPromptEN() || '–';
    compareModal.show();
  });

  document.getElementById('compareModal')?.addEventListener('click', async e => {
    const btn = e.target.closest('.compare-copy-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    const text = lang === 'en' ? buildFlowPromptEN() : buildFlowPrompt();
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: text, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    copyToast.show();
  });

  // ── Feature 3: Keyboard Shortcuts Modal ───────────────────────────────────
  const shortcutsModal = new bootstrap.Modal(document.getElementById('shortcutsModal'));

  document.getElementById('btn-shortcuts')?.addEventListener('click', () => shortcutsModal.show());

  // ── Feature 5: Floating Copy Button on Selection ──────────────────────────
  const floatCopyBtn = document.getElementById('float-copy-btn');

  const hideFloatCopy = () => floatCopyBtn?.classList.add('d-none');

  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) { hideFloatCopy(); return; }
    const range = sel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const inPrompt = livePrompt?.contains(container instanceof Text ? container.parentNode : container);
    if (!inPrompt || sel.toString().trim().length < 3) { hideFloatCopy(); return; }
    const rect = range.getBoundingClientRect();
    if (floatCopyBtn) {
      floatCopyBtn.classList.remove('d-none');
      floatCopyBtn.style.top  = (rect.top + window.scrollY - 40) + 'px';
      floatCopyBtn.style.left = (rect.left + window.scrollX + rect.width / 2 - 50) + 'px';
    }
  });

  floatCopyBtn?.addEventListener('mousedown', async e => {
    e.preventDefault();
    const text = window.getSelection()?.toString() || '';
    if (!text) return;
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = Object.assign(document.createElement('textarea'),
        { value: text, style: 'position:fixed;opacity:0;' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    hideFloatCopy();
    copyToast.show();
  });

  document.addEventListener('click', e => {
    if (!livePrompt?.contains(e.target)) hideFloatCopy();
  });

  // ── Feature 6: Onboarding Tour ────────────────────────────────────────────
  const LS_ONBOARDED_KEY = 'chati_onboarded';

  const ONBOARDING_STEPS = [
    {
      icon: 'fa-wand-magic-sparkles',
      title: { de: 'Willkommen bei Chati!', en: 'Welcome to Chati!' },
      text:  { de: 'Chati hilft dir, perfekte KI-Prompts in wenigen Schritten zu erstellen – strukturiert, professionell und wiederverwendbar.', en: 'Chati helps you build perfect AI prompts in a few steps – structured, professional and reusable.' },
    },
    {
      icon: 'fa-book-open',
      title: { de: 'Prompt-Katalog', en: 'Prompt Catalog' },
      text:  { de: 'Starte mit einer Vorlage aus dem Katalog – alle Felder werden automatisch befüllt. Du kannst alles danach anpassen.', en: 'Start with a template from the catalog – all fields are filled automatically. You can customize everything afterwards.' },
    },
    {
      icon: 'fa-list-ol',
      title: { de: '6 Schritte zum perfekten Prompt', en: '6 Steps to the Perfect Prompt' },
      text:  { de: 'Fülle die 6 Schritte aus: Aufgabe, Kontext, Format, Persona, Tonfall und Beispiel. Die ersten zwei sind Pflicht – der Rest macht den Unterschied.', en: 'Fill in 6 steps: Task, Context, Format, Persona, Tone and Example. The first two are required – the rest make the difference.' },
    },
    {
      icon: 'fa-eye',
      title: { de: 'Live-Vorschau', en: 'Live Preview' },
      text:  { de: 'Die Vorschau aktualisiert sich in Echtzeit. Sieh dir den Prompt visuell oder als Fließtext an – und wechsle zwischen Deutsch und Englisch.', en: 'The preview updates in real time. View the prompt visually or as flowing text – and switch between German and English.' },
    },
    {
      icon: 'fa-copy',
      title: { de: 'Kopieren & Loslegen', en: 'Copy & Go' },
      text:  { de: 'Klicke auf „Kopieren" oder drücke Ctrl+Enter – dann in ChatGPT, Copilot oder Claude einfügen. Tipp: „Speichern" sichert deine Prompts in der Bibliothek.', en: 'Click "Copy" or press Ctrl+Enter – then paste into ChatGPT, Copilot or Claude. Tip: "Save" stores your prompts in the library.' },
    },
  ];

  let onboardingStep = 0;

  const renderOnboardingStep = () => {
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;
    const step = ONBOARDING_STEPS[onboardingStep];
    const lang = uiLang || 'de';
    document.getElementById('onboarding-icon').innerHTML = `<i class="fa-solid ${step.icon}"></i>`;
    document.getElementById('onboarding-title').textContent = step.title[lang] || step.title.de;
    document.getElementById('onboarding-text').textContent  = step.text[lang]  || step.text.de;
    document.getElementById('onboarding-step-label').textContent =
      `${onboardingStep + 1} / ${ONBOARDING_STEPS.length}`;
    // Dots
    const dotsEl = document.getElementById('onboarding-dots');
    if (dotsEl) {
      dotsEl.innerHTML = ONBOARDING_STEPS.map((_, i) =>
        `<div class="onboarding-dot${i === onboardingStep ? ' active' : ''}"></div>`).join('');
    }
    // Next button label
    const isLast = onboardingStep === ONBOARDING_STEPS.length - 1;
    const nextLabel = document.getElementById('onboarding-next-label');
    if (nextLabel) {
      nextLabel.textContent = isLast
        ? (lang === 'en' ? 'Get started!' : 'Loslegen!')
        : (lang === 'en' ? 'Next' : 'Weiter');
    }
  };

  const startOnboarding = () => {
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;
    onboardingStep = 0;
    renderOnboardingStep();
    overlay.classList.remove('d-none');
  };

  const closeOnboarding = () => {
    const overlay = document.getElementById('onboarding-overlay');
    overlay?.classList.add('d-none');
    try { localStorage.setItem(LS_ONBOARDED_KEY, '1'); } catch {}
  };

  document.getElementById('btn-onboarding-next')?.addEventListener('click', () => {
    if (onboardingStep < ONBOARDING_STEPS.length - 1) {
      onboardingStep++;
      renderOnboardingStep();
    } else {
      closeOnboarding();
    }
  });

  document.getElementById('btn-onboarding-skip')?.addEventListener('click', closeOnboarding);
  document.getElementById('onboarding-overlay')?.addEventListener('click', e => {
    if (e.target.classList.contains('onboarding-backdrop')) closeOnboarding();
  });

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
      'hint.persona': 'Lege fest, aus wessen Sicht geschrieben wird und wie der Text die Leser anspricht.',
      'hint.tonfall': 'Welche Stimmung soll der Text vermitteln?',
      'hint.beispiel': 'Ctrl+C → Ctrl+V: Gib einen Referenztext oder Stilhinweis an',
      'lbl.contenttype': 'Texttyp / Verwendungszweck', 'lbl.topic': 'Thema & Inhalt',
      'lbl.audience': 'Zielgruppe', 'lbl.length': 'Textlänge', 'lbl.formatting': 'Formatierung',
      'lbl.emojis': 'Emojis', 'lbl.seo': 'SEO-Keywords', 'lbl.titlesubtitle': 'Titel & Untertitel',
      'lbl.perspective': 'Schreibperspektive', 'lbl.addressform': 'Leser ansprechen', 'lbl.style': 'Sprachstil',
      'hint.perspective': 'z. B. „Ich" für persönliche Blogs, „Wir" für Unternehmenstexte',
      'hint.addressform': 'z. B. „Du" für Social Media, „Sie" für B2B-Texte',
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
      'theme.choose': 'Design wählen',
      'theme.light': 'Hell', 'theme.dark': 'Dunkel', 'theme.violet': 'Violett',
      // v1.8 new
      'btn.export': 'Exportieren (.txt)',
      'btn.export.md': 'Als Markdown (.md)',
      'btn.compare': 'DE / EN vergleichen',
      'compare.title': 'Prompt-Vergleich: DE / EN',
      'shortcuts.title': 'Tastaturkürzel',
      'shortcuts.copy': 'Prompt kopieren',
      'shortcuts.save': 'In Bibliothek speichern',
      'shortcuts.reset': 'Formular zurücksetzen',
      'shortcuts.steps': 'Zum Schritt 1–6 springen',
      'shortcuts.this': 'Diese Übersicht öffnen',
      'shortcuts.hint': 'Kürzel 1–6 funktionieren nur außerhalb von Textfeldern.',
      'onboarding.skip': 'Überspringen',
      'onboarding.next': 'Weiter',
      'catalog.search.placeholder': 'Katalog durchsuchen …',
      // v1.9 vault
      'vault.title': 'Persona-Tresor',
      'vault.add': 'Speichern',
      'vault.nameph': 'Kurzname, z.B. CFO …',
      'vault.confirm': 'OK',
      'vault.empty': 'Noch leer – Rolle eingeben und speichern',
      'vault.hint.empty': 'Bitte zuerst eine Rolle / KI-Persona eingeben.',
      'vault.max': 'Maximal 10 Personas gespeichert.',
      // v2.0 Reverse-Engineer
      'btn.reverse': 'Analysieren',
      'reverse.title': 'Prompt analysieren & importieren',
      'reverse.hint': 'Füge einen beliebigen bestehenden Prompt ein – Chati erkennt automatisch Texttyp, Zielgruppe, Tonfall und mehr.',
      'reverse.placeholder': 'Prompt hier einfügen …',
      'reverse.btn.analyze': 'Analysieren',
      'reverse.btn.apply': 'In Formular übernehmen',
      'reverse.results.title': 'Erkannte Felder:',
      'reverse.empty': 'Keine Felder erkannt. Versuche einen längeren, detaillierteren Prompt.',
      'reverse.field.role-definition': 'Rolle / KI-Persona',
      'reverse.field.content-type': 'Texttyp',
      'reverse.field.content-length': 'Textlänge',
      'reverse.field.language-style': 'Sprachstil',
      'reverse.field.target-audience': 'Zielgruppe',
      'reverse.field.formatting': 'Formatierung',
      'reverse.field.seo-keyword-option': 'SEO-Keywords',
      'reverse.field.emoji-option': 'Emojis',
      'reverse.field.description': 'Thema / Inhalt',
      // v2.0 Projekt-Kontext
      'btn.projectCtx': 'Kontext',
      'ctx.title': 'Projekt-Kontext',
      'ctx.hint': 'Speichere Infos zu deinem Projekt – sie werden automatisch in jeden generierten Prompt eingebaut.',
      'ctx.active': 'Kontext aktivieren',
      'ctx.lbl.company': 'Firma / Projekt',
      'ctx.lbl.industry': 'Branche',
      'ctx.lbl.extra': 'Weiterer Kontext',
      'ctx.ph.company': 'z.B. TechStartup Berlin GmbH',
      'ctx.ph.industry': 'z.B. SaaS / B2B-Software',
      'ctx.ph.extra': 'z.B. Ton immer professionell, Zielgruppe sind CFOs im Mittelstand.',
      'ctx.hint.extra': 'Max. 300 Zeichen – dieser Text wird direkt in jeden Prompt eingefügt.',
      'ctx.preview.label': 'Prompt-Vorschau des Kontexts:',
      'ctx.btn.save': 'Speichern',
      'ctx.btn.clear': 'Löschen',
      'ctx.toast.saved': 'Projekt-Kontext gespeichert!',
      'ctx.toast.cleared': 'Projekt-Kontext gelöscht.',
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
      'hint.persona': 'Define from whose perspective the text is written and how it addresses the reader.',
      'hint.tonfall': 'What mood should the text convey?',
      'hint.beispiel': 'Ctrl+C → Ctrl+V: Provide a reference text or style hint',
      'lbl.contenttype': 'Content Type / Purpose', 'lbl.topic': 'Topic & Content',
      'lbl.audience': 'Target Audience', 'lbl.length': 'Text Length', 'lbl.formatting': 'Formatting',
      'lbl.emojis': 'Emojis', 'lbl.seo': 'SEO Keywords', 'lbl.titlesubtitle': 'Title & Subtitle',
      'lbl.perspective': 'Writing Perspective', 'lbl.addressform': 'Address the Reader', 'lbl.style': 'Writing Style',
      'hint.perspective': 'e.g. "I" for personal blogs, "We" for company content',
      'hint.addressform': 'e.g. "You" for social media, formal "You" for B2B texts',
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
      'theme.choose': 'Choose theme',
      'theme.light': 'Light', 'theme.dark': 'Dark', 'theme.violet': 'Violet',
      // v1.8 new
      'btn.export': 'Export (.txt)',
      'btn.export.md': 'Export as Markdown (.md)',
      'btn.compare': 'Compare DE / EN',
      'compare.title': 'Prompt Comparison: DE / EN',
      'shortcuts.title': 'Keyboard Shortcuts',
      'shortcuts.copy': 'Copy prompt',
      'shortcuts.save': 'Save to library',
      'shortcuts.reset': 'Reset form',
      'shortcuts.steps': 'Jump to step 1–6',
      'shortcuts.this': 'Open this overview',
      'shortcuts.hint': 'Keys 1–6 only work outside text fields.',
      'onboarding.skip': 'Skip',
      'onboarding.next': 'Next',
      'catalog.search.placeholder': 'Search catalog …',
      // v1.9 vault
      'vault.title': 'Persona Vault',
      'vault.add': 'Save',
      'vault.nameph': 'Short name, e.g. CFO …',
      'vault.confirm': 'OK',
      'vault.empty': 'Empty – type a role above and save it',
      'vault.hint.empty': 'Please enter a role / AI persona first.',
      'vault.max': 'Maximum of 10 personas reached.',
      // v2.0 Reverse-Engineer
      'btn.reverse': 'Analyze',
      'reverse.title': 'Analyze & import prompt',
      'reverse.hint': 'Paste any existing prompt – Chati automatically detects content type, audience, tone and more.',
      'reverse.placeholder': 'Paste prompt here …',
      'reverse.btn.analyze': 'Analyze',
      'reverse.btn.apply': 'Apply to form',
      'reverse.results.title': 'Detected fields:',
      'reverse.empty': 'No fields detected. Try a longer, more detailed prompt.',
      'reverse.field.role-definition': 'Role / AI Persona',
      'reverse.field.content-type': 'Content Type',
      'reverse.field.content-length': 'Text Length',
      'reverse.field.language-style': 'Writing Style',
      'reverse.field.target-audience': 'Target Audience',
      'reverse.field.formatting': 'Formatting',
      'reverse.field.seo-keyword-option': 'SEO Keywords',
      'reverse.field.emoji-option': 'Emojis',
      'reverse.field.description': 'Topic / Content',
      // v2.0 Projekt-Kontext
      'btn.projectCtx': 'Context',
      'ctx.title': 'Project Context',
      'ctx.hint': 'Save info about your project – it will be automatically injected into every generated prompt.',
      'ctx.active': 'Activate context',
      'ctx.lbl.company': 'Company / Project',
      'ctx.lbl.industry': 'Industry',
      'ctx.lbl.extra': 'Additional Context',
      'ctx.ph.company': 'e.g. TechStartup Berlin GmbH',
      'ctx.ph.industry': 'e.g. SaaS / B2B Software',
      'ctx.ph.extra': 'e.g. Always professional tone, targeting CFOs in mid-size companies.',
      'ctx.hint.extra': 'Max. 300 characters – this text is injected directly into every prompt.',
      'ctx.preview.label': 'Prompt preview of context:',
      'ctx.btn.save': 'Save',
      'ctx.btn.clear': 'Clear',
      'ctx.toast.saved': 'Project context saved!',
      'ctx.toast.cleared': 'Project context cleared.',
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
    renderVault();
    initCoachPopovers();
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

  // ── Smart Prompt Analyzer (v1.8: progress bar + clickable tips) ───────────
  const renderAnalyzer = () => {
    const panel = document.getElementById('analyzer-panel');
    if (!panel) return;
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;

    // Field→section mappings for jump links (Feature 12)
    const FIELD_SECTIONS = {
      'content-type':    'body-aufgabe',
      'description':     'body-kontext',
      'target-audience': 'body-kontext',
      'content-length':  'body-format',
      'language-style':  'body-tonfall',
      'beispiel':        'body-beispiel',
      'role-definition': 'body-aufgabe',
    };

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

    const qualityClass = score >= 5 ? 'excellent' : score >= 3 ? 'good' : 'basic';
    const qualityKey   = score >= 5 ? 'analyzer.quality.excellent' : score >= 3 ? 'analyzer.quality.good' : 'analyzer.quality.basic';
    const pct = Math.round((score / 6) * 100);

    // Role tip has highest priority; fall back to first missing dimension tip
    const roleEmpty    = !val('role-definition');
    const firstMissing = checks.find(c => !c.ok);
    let tipHtml = '';
    if (roleEmpty || firstMissing) {
      const tipId   = roleEmpty ? 'role-definition' : firstMissing.id;
      const tipIcon = roleEmpty ? 'fa-user-tie' : 'fa-lightbulb';
      const tipText = roleEmpty ? t['analyzer.tip.role'] : firstMissing.tip;
      const section = FIELD_SECTIONS[tipId] || '';
      const jumpLabel = uiLang === 'en' ? 'Go to field →' : 'Zum Feld →';
      tipHtml = `<div class="analyzer-tip">
        <i class="fa-solid ${tipIcon} me-1"></i><strong>${t['analyzer.tip.prefix']}</strong> ${esc(tipText)}
        ${section ? `<button class="analyzer-tip-link ms-1" data-jump-section="${section}" data-jump-field="${tipId}">${jumpLabel}</button>` : ''}
      </div>`;
    }

    const badges = checks.map(c =>
      `<span class="analyzer-badge analyzer-badge--${c.ok ? 'ok' : 'miss'}">
        <i class="fa-solid fa-${c.ok ? 'check' : 'xmark'} me-1"></i>${c.label}
      </span>`).join('');

    panel.innerHTML = `
      <div class="analyzer-header">
        <span class="analyzer-title"><i class="fa-solid fa-chart-bar me-1"></i>${t['analyzer.title']}</span>
        <span class="quality-bar-score quality-bar-score--${qualityClass}">${t[qualityKey]} · ${score}/6</span>
      </div>
      <div class="quality-bar-wrap">
        <div class="quality-bar-track">
          <div class="quality-bar-fill quality-bar-fill--${qualityClass}" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="analyzer-badges">${badges}</div>
      ${tipHtml}`;

    // Wire jump links (Feature 12)
    panel.querySelectorAll('.analyzer-tip-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec   = btn.dataset.jumpSection;
        const field = btn.dataset.jumpField;
        if (sec) openSection(sec);
        setTimeout(() => {
          const el = document.getElementById(field);
          if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        }, 280);
      });
    });
  };

  // ── Mini-Prompt-Coach: Popovers (Feature 20) ─────────────────────────────
  const initCoachPopovers = () => {
    const cd = COACH_DATA[uiLang] || COACH_DATA.de;
    const titleLabel = uiLang === 'en' ? 'Why does this matter?' : 'Warum ist das wichtig?';
    const badLabel   = uiLang === 'en' ? '✗ Without' : '✗ Ohne';
    const goodLabel  = uiLang === 'en' ? '✓ With' : '✓ Mit';

    document.querySelectorAll('.coach-btn').forEach(btn => {
      const existing = bootstrap.Popover.getInstance(btn);
      if (existing) existing.dispose();

      const fieldId = btn.dataset.coachId;
      const data = cd[fieldId];
      if (!data) return;

      const content = `<div class="coach-pop">
        <p class="coach-pop__why">${esc(data.why)}</p>
        <div class="coach-pop__example coach-pop__example--bad">
          <span class="coach-pop__lbl">${badLabel}</span>
          <span class="coach-pop__text">${esc(data.bad)}</span>
        </div>
        <div class="coach-pop__example coach-pop__example--good">
          <span class="coach-pop__lbl">${goodLabel}</span>
          <span class="coach-pop__text">${esc(data.good)}</span>
        </div>
      </div>`;

      new bootstrap.Popover(btn, {
        html: true,
        title: `<i class="fa-solid fa-graduation-cap me-1"></i>${titleLabel}`,
        content,
        trigger: 'click',
        placement: 'auto',
        customClass: 'coach-popover',
        sanitize: false,
      });
    });
  };

  // Close coach popovers on outside click (registered once)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.coach-btn') && !e.target.closest('.coach-popover')) {
      document.querySelectorAll('.coach-btn').forEach(btn => {
        bootstrap.Popover.getInstance(btn)?.hide();
      });
    }
  });

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

  // ── Persona-Vault (Feature: Persona-Vault v1.9) ───────────────────────────
  const LS_VAULT_KEY = 'chati_vault';
  const VAULT_MAX    = 10;

  const loadVault = () => {
    try { return JSON.parse(localStorage.getItem(LS_VAULT_KEY)) || []; } catch { return []; }
  };

  const saveVaultData = (items) => {
    try { localStorage.setItem(LS_VAULT_KEY, JSON.stringify(items)); } catch {}
  };

  const renderVault = () => {
    const chips = document.getElementById('persona-chips');
    if (!chips) return;
    const items = loadVault();
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;

    if (items.length === 0) {
      chips.innerHTML = `<span class="persona-vault__empty">${t['vault.empty']}</span>`;
    } else {
      chips.innerHTML = items.map(p =>
        `<button class="persona-chip" data-vault-id="${esc(p.id)}" type="button" title="${esc(p.text)}">
          <i class="fa-solid fa-user-tie persona-chip__icon"></i>
          <span class="persona-chip__name">${esc(p.name)}</span>
          <span class="persona-chip__del" data-del-id="${esc(p.id)}" aria-label="Löschen">×</span>
        </button>`
      ).join('');
    }

    // Wire chip clicks
    chips.querySelectorAll('.persona-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        if (e.target.closest('.persona-chip__del')) return;
        const persona = loadVault().find(p => p.id === chip.dataset.vaultId);
        if (!persona) return;
        const field = document.getElementById('role-definition');
        if (field) {
          field.value = persona.text;
          refreshPreview();
          chip.classList.add('persona-chip--active');
          setTimeout(() => chip.classList.remove('persona-chip--active'), 1400);
        }
      });
    });

    // Wire delete buttons
    chips.querySelectorAll('.persona-chip__del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        saveVaultData(loadVault().filter(p => p.id !== btn.dataset.delId));
        renderVault();
      });
    });

    // Update add button state
    const addBtn = document.getElementById('persona-vault-add');
    if (addBtn) {
      const full = items.length >= VAULT_MAX;
      addBtn.disabled = full;
      if (full) addBtn.title = (UI_STRINGS[uiLang] || UI_STRINGS.de)['vault.max'];
    }
  };

  // Show inline form on "+ Speichern" click
  document.getElementById('persona-vault-add')?.addEventListener('click', () => {
    const text = val('role-definition');
    if (!text) {
      const field = document.getElementById('role-definition');
      if (field) {
        field.classList.add('field-flash');
        field.focus();
        setTimeout(() => field.classList.remove('field-flash'), 800);
      }
      return;
    }
    if (loadVault().length >= VAULT_MAX) return;
    const form = document.getElementById('persona-vault-form');
    if (form) {
      form.classList.remove('d-none');
      document.getElementById('persona-vault-name')?.focus();
    }
  });

  // Cancel: hide form
  document.getElementById('persona-vault-cancel')?.addEventListener('click', () => {
    const form = document.getElementById('persona-vault-form');
    const nameIn = document.getElementById('persona-vault-name');
    if (form) form.classList.add('d-none');
    if (nameIn) nameIn.value = '';
  });

  // Confirm: save persona
  const vaultConfirmSave = () => {
    const text = val('role-definition');
    if (!text) return;
    const nameIn = document.getElementById('persona-vault-name');
    const rawName = nameIn?.value.trim() || '';
    const name = rawName || (text.length > 22 ? text.slice(0, 22) + '…' : text);
    const items = loadVault();
    if (items.length >= VAULT_MAX) return;
    items.push({ id: Date.now().toString(), name, text });
    saveVaultData(items);
    renderVault();
    const form = document.getElementById('persona-vault-form');
    if (form) form.classList.add('d-none');
    if (nameIn) nameIn.value = '';
  };

  document.getElementById('persona-vault-confirm')?.addEventListener('click', vaultConfirmSave);
  document.getElementById('persona-vault-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); vaultConfirmSave(); }
    if (e.key === 'Escape') { document.getElementById('persona-vault-cancel')?.click(); }
  });

  // ── Prompt Reverse-Engineer ───────────────────────────────────────────────
  let lastAnalyzed = {};

  document.getElementById('btn-reverse')?.addEventListener('click', () => {
    const inp = document.getElementById('reverse-input');
    const results = document.getElementById('reverse-results');
    const empty   = document.getElementById('reverse-empty');
    const applyBtn = document.getElementById('reverse-apply-btn');
    if (inp) inp.value = '';
    if (results) results.classList.add('d-none');
    if (empty) empty.classList.add('d-none');
    if (applyBtn) applyBtn.classList.add('d-none');
    lastAnalyzed = {};
    reverseModal.show();
    setTimeout(() => inp?.focus(), 350);
  });

  document.getElementById('reverse-input')?.addEventListener('input', () => {
    const inp = document.getElementById('reverse-input');
    const counter = document.getElementById('reverse-char-count');
    if (counter && inp) counter.textContent = inp.value.length > 0 ? `${inp.value.length} Zeichen` : '';
  });

  document.getElementById('reverse-analyze-btn')?.addEventListener('click', () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const inp     = document.getElementById('reverse-input');
    const list    = document.getElementById('reverse-results-list');
    const results = document.getElementById('reverse-results');
    const empty   = document.getElementById('reverse-empty');
    const applyBtn= document.getElementById('reverse-apply-btn');
    const text = inp?.value.trim() || '';
    if (!text) return;

    lastAnalyzed = analyzePrompt(text);
    const keys = Object.keys(lastAnalyzed);

    results.classList.add('d-none');
    empty.classList.add('d-none');
    applyBtn.classList.add('d-none');

    if (!keys.length) {
      empty.classList.remove('d-none');
      return;
    }

    const fieldNameKey = (k) => t[`reverse.field.${k}`] || k;
    list.innerHTML = keys.map(k => {
      const label = esc(fieldNameKey(k));
      const value = esc(String(lastAnalyzed[k]));
      return `<div class="reverse-result-row">
        <span class="reverse-result-row__label">${label}</span>
        <span class="reverse-result-row__value">${value}</span>
      </div>`;
    }).join('');

    results.classList.remove('d-none');
    applyBtn.classList.remove('d-none');
  });

  document.getElementById('reverse-apply-btn')?.addEventListener('click', () => {
    const fields = lastAnalyzed;
    Object.entries(fields).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = value;
      // Flash the field briefly
      el.classList.add('field-flash');
      setTimeout(() => el.classList.remove('field-flash'), 800);
    });
    // Open any section that got filled
    const sectionMap = {
      'role-definition': 'body-aufgabe', 'content-type': 'body-aufgabe',
      'description': 'body-kontext', 'target-audience': 'body-kontext',
      'content-length': 'body-format', 'formatting': 'body-format',
      'seo-keyword-option': 'body-format', 'emoji-option': 'body-format',
      'language-style': 'body-tonfall',
    };
    const sectionsToOpen = new Set(Object.keys(fields).map(k => sectionMap[k]).filter(Boolean));
    sectionsToOpen.forEach(id => openSection(id));
    refreshPreview();
    lastAnalyzed = {};
  });

  // ── Projekt-Kontext ───────────────────────────────────────────────────────
  document.getElementById('btn-project-ctx')?.addEventListener('click', openProjectCtx);

  ['ctx-company', 'ctx-industry', 'ctx-extra'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', renderCtxPreview);
  });
  document.getElementById('ctx-toggle')?.addEventListener('change', renderCtxPreview);

  document.getElementById('ctx-save-btn')?.addEventListener('click', () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    const ctx = {
      active:   document.getElementById('ctx-toggle')?.checked || false,
      company:  (document.getElementById('ctx-company')?.value  || '').trim(),
      industry: (document.getElementById('ctx-industry')?.value || '').trim(),
      extra:    (document.getElementById('ctx-extra')?.value    || '').trim(),
    };
    saveProjectCtxData(ctx);
    renderProjectCtxDot();
    refreshPreview();
    const toastText = document.getElementById('ctx-toast-text');
    if (toastText) toastText.textContent = t['ctx.toast.saved'] || 'Projekt-Kontext gespeichert!';
    ctxToast.show();
    projectCtxCanvas.hide();
  });

  document.getElementById('ctx-clear-btn')?.addEventListener('click', () => {
    const t = UI_STRINGS[uiLang] || UI_STRINGS.de;
    saveProjectCtxData({});
    const toggle  = document.getElementById('ctx-toggle');
    const company = document.getElementById('ctx-company');
    const industry= document.getElementById('ctx-industry');
    const extra   = document.getElementById('ctx-extra');
    if (toggle)   toggle.checked  = false;
    if (company)  company.value   = '';
    if (industry) industry.value  = '';
    if (extra)    extra.value     = '';
    renderCtxPreview();
    renderProjectCtxDot();
    refreshPreview();
    const toastText = document.getElementById('ctx-toast-text');
    if (toastText) toastText.textContent = t['ctx.toast.cleared'] || 'Projekt-Kontext gelöscht.';
    ctxToast.show();
  });

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
    applyTheme(THEMES.includes(t) ? t : 'light');
  } catch { applyTheme('light'); }

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

  // Feature 6: Start onboarding on first visit
  try {
    if (!localStorage.getItem(LS_ONBOARDED_KEY)) {
      setTimeout(startOnboarding, 800);
    }
  } catch { /* private mode */ }

  // Persona-Vault
  renderVault();

  // Feature 20: Mini-Prompt-Coach popovers
  initCoachPopovers();

  // v2.0: Projekt-Kontext dot indicator
  renderProjectCtxDot();

  // Feature 3: '?' key opens shortcuts modal
  document.addEventListener('keydown', e => {
    const isTyping = document.activeElement?.matches('input,textarea,[contenteditable]');
    if (!isTyping && e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      shortcutsModal.show();
    }
  });

});

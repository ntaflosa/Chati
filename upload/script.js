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
  const copyToast      = new bootstrap.Toast(document.getElementById('copy-toast'),  { delay: 2500 });
  const shareToast     = new bootstrap.Toast(document.getElementById('share-toast'), { delay: 2500 });
  const saveToast      = new bootstrap.Toast(document.getElementById('save-toast'),  { delay: 2500 });

  // ── Constants ─────────────────────────────────────────────────────────────
  const FIELD_IDS = [
    'content-type', 'description', 'content-length', 'target-audience',
    'language-style', 'perspective', 'emoji-option', 'address-form',
    'formatting', 'seo-keyword-option', 'title-subtitle-option', 'beispiel',
  ];

  const LS_FORM_KEY    = 'chati_form';
  const LS_HISTORY_KEY = 'chati_history';
  const LS_LIBRARY_KEY = 'chati_library';
  const LS_THEME_KEY   = 'chati_theme';
  const HISTORY_MAX    = 8;

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
    { key: 'aufgabe', label: 'Aufgabe', icon: 'fa-bullseye',     getValue: () => val('content-type') },
    { key: 'kontext', label: 'Kontext', icon: 'fa-circle-info',
      getValue: () => [val('description'), val('target-audience')].filter(Boolean).join(' · ') },
    { key: 'format',  label: 'Format',  icon: 'fa-sliders',
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
    { key: 'persona', label: 'Persona', icon: 'fa-user-pen',
      getValue: () => {
        const parts = [];
        if (val('perspective')) parts.push(val('perspective'));
        const addr = val('address-form');
        if (addr) parts.push(ADDRESS_MAP[addr] || addr);
        return parts.join(' · ');
      },
    },
    { key: 'tonfall',  label: 'Tonfall',  icon: 'fa-masks-theater', getValue: () => val('language-style') },
    { key: 'beispiel', label: 'Beispiel', icon: 'fa-lightbulb',     getValue: () => val('beispiel') },
  ];

  // ── Build prompts ─────────────────────────────────────────────────────────
  const buildFlowPrompt = () => {
    const type = val('content-type'), description = val('description'),
          audience = val('target-audience'), length = val('content-length'),
          formatting = val('formatting'), seo = val('seo-keyword-option'),
          titleSub = val('title-subtitle-option'), perspective = val('perspective'),
          addressForm = val('address-form'), style = val('language-style'),
          emojis = val('emoji-option'), beispiel = val('beispiel');

    if (!type && !description) return '';
    const s = [];

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
    const type = val('content-type'), description = val('description'),
          audience = val('target-audience'), length = val('content-length'),
          formatting = val('formatting'), seo = val('seo-keyword-option'),
          titleSub = val('title-subtitle-option'), perspective = val('perspective'),
          addressForm = val('address-form'), style = val('language-style'),
          emojis = val('emoji-option'), beispiel = val('beispiel');

    if (!type && !description) return '';
    const s = [];

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

  const EMPTY_STATE = `
    <div class="pv-empty">
      <div class="pv-empty__icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="pv-empty__title">Noch keine Eingaben</div>
      <div class="pv-empty__sub">Wähle eine Vorlage aus dem Katalog<br>oder fülle die Felder Schritt für Schritt aus</div>
    </div>`;

  const renderVisual = () => {
    const filled = PREVIEW_GROUPS.filter(g => g.getValue());
    if (filled.length === 0) return EMPTY_STATE;
    const rows = filled.map(g => `
      <div class="pv-row">
        <span class="pv-label pv-label--${g.key}"><i class="fa-solid ${g.icon}"></i>${g.label}</span>
        <span class="pv-value">${esc(g.getValue())}</span>
      </div>`).join('');
    return `<div class="pv-intro">Generiere einen personalisierten Text unter Berücksichtigung folgender Details:</div>
      <div class="pv-rows">${rows}</div>`;
  };

  const renderFlow = () => {
    const text = getCurrentPrompt();
    if (!text) return EMPTY_STATE;
    return `<div class="pv-flow">${esc(text)}</div>`;
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
      promptStatus.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i>Bereit zum Kopieren';
      promptStatus.classList.add('ready');
      const text = getCurrentPrompt();
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      wordCount.textContent = `${words} Wörter · ${text.length} Zeichen`;
    } else {
      promptStatus.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-1"></i>Warte auf Eingaben …';
      promptStatus.classList.remove('ready');
      wordCount.textContent = '';
    }

    refreshScore();
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
    const items = loadHistory();
    if (historyEmpty) historyEmpty.style.display = items.length ? 'none' : '';
    historyList.querySelectorAll('.history-item').forEach(n => n.remove());
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
          <i class="fa-solid fa-copy me-1"></i>Kopieren
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
    const items = loadLibrary();
    if (libraryEmpty) libraryEmpty.style.display = items.length ? 'none' : '';
    libraryList.innerHTML = '';
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
            <i class="fa-solid fa-arrow-up-from-bracket me-1"></i>Laden
          </button>
          <button class="action-btn action-btn--outline lib-btn-copy" data-id="${entry.id}">
            <i class="fa-solid fa-copy me-1"></i>Kopieren
          </button>
          <button class="action-btn action-btn--ghost lib-btn-delete" data-id="${entry.id}">
            <i class="fa-solid fa-trash me-1"></i>Löschen
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
      FIELD_IDS.forEach(fid => {
        const el = document.getElementById(fid);
        if (el) el.value = entry.fields?.[fid] || '';
      });
      activeCardId = null;
      renderCatalog(activeFilter);
      refreshPreview();
      libraryCanvas.hide();
    }

    if (e.target.closest('.lib-btn-delete')) {
      const updated = items.filter(i => i.id !== idNum);
      try { localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(updated)); } catch {}
      renderLibrary();
    }
  });

  // ── Clipboard ─────────────────────────────────────────────────────────────
  const copyPrompt = async () => {
    const text = getCurrentPrompt().trim();
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

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetForm = () => {
    FIELD_IDS.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    activeCardId = null;
    renderCatalog(activeFilter);
    try { localStorage.removeItem(LS_FORM_KEY); } catch {}
    refreshPreview();
  };

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

  const renderCatalog = (filter = 'alle') => {
    const catalog = getActiveCatalog();
    const items = filter === 'alle' ? catalog : catalog.filter(t => t.category === filter);
    catalogGrid.innerHTML = items.map(t => `
      <div class="catalog-card${activeCardId === t.id ? ' active' : ''}"
        data-id="${t.id}" role="button" tabindex="0" aria-label="Template: ${t.name}">
        <div class="catalog-card__icon"><i class="${t.icon}"></i></div>
        <div class="catalog-card__body">
          <div class="catalog-card__name">${t.name}</div>
          <span class="catalog-card__badge">${categoryDisplay(t.category)}</span>
        </div>
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
    const card = e.target.closest('.catalog-card');
    if (card) applyTemplate(card.dataset.id);
  });

  catalogGrid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
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
    const anyOpen = !catalogBody.classList.contains('collapsed') ||
      [...document.querySelectorAll('[id^="body-"]')].some(b => !b.classList.contains('collapsed'));
    allCollapsed = !anyOpen;
    toggleAllIcon.className  = allCollapsed ? 'fa-solid fa-angles-down' : 'fa-solid fa-angles-up';
    toggleAllLabel.textContent = allCollapsed ? 'Alle aufklappen' : 'Alle schließen';
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
    toggleAllIcon.className  = allCollapsed ? 'fa-solid fa-angles-down' : 'fa-solid fa-angles-up';
    toggleAllLabel.textContent = allCollapsed ? 'Alle aufklappen' : 'Alle schließen';
  };

  btnToggleAll.addEventListener('click', toggleAllSections);

  // ── Event listeners ───────────────────────────────────────────────────────
  document.addEventListener('input',  refreshPreview);
  document.addEventListener('change', refreshPreview);

  previewTabs.addEventListener('click', e => {
    const tab = e.target.closest('.preview-tab');
    if (tab) setTab(tab.dataset.tab);
  });

  btnCopy.addEventListener('click', copyPrompt);
  modalBtnCopy.addEventListener('click', copyPrompt);

  btnShow.addEventListener('click', () => {
    modalPromptText.textContent = getCurrentPrompt();
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

  btnLibrary?.addEventListener('click', () => {
    renderLibrary();
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
    const text = getCurrentPrompt().trim();
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
    const type        = val('content-type'),
          description = val('description'),
          audience    = val('target-audience'),
          length      = val('content-length'),
          formatting  = val('formatting'),
          seo         = val('seo-keyword-option'),
          titleSub    = val('title-subtitle-option'),
          perspective = val('perspective'),
          addressForm = val('address-form'),
          style       = val('language-style'),
          emojis      = val('emoji-option'),
          beispiel    = val('beispiel');

    if (!type && !description) return [];

    const art = ARTICLE_MAP[type] ?? 'einen ';
    const fp = [];
    if (length)   fp.push(LENGTH_MAP[length] || length);
    if (formatting) fp.push(formatting);
    if (seo === 'Ja') fp.push('SEO-Keywords');
    if (titleSub === 'ja') fp.push('Titel');
    if (emojis === 'keine') fp.push('keine Emojis');
    else if (emojis) fp.push(emojis + ' Emojis');
    const fmt = fp.join(', ');

    // Variation 1 – Kompakt (Stichpunkte)
    const v1 = [];
    if (type) v1.push(`Verfasse ${art}${type}.`);
    if (description) v1.push(`Thema: ${description}.`);
    if (audience)    v1.push(`Zielgruppe: ${audience}.`);
    if (fmt)         v1.push(`Format: ${fmt}.`);
    if (style)       v1.push(`Stil: ${style}.`);
    if (beispiel)    v1.push(`Referenz: ${beispiel}`);

    // Variation 2 – Thema zuerst
    const v2 = [];
    if (description) v2.push(`Zum Thema „${description}": `);
    if (type)        v2.push(`Schreibe ${art}${type}${audience ? ` für ${audience}` : ''}.`);
    const details = [];
    if (fmt)   details.push(fmt);
    if (style) details.push(`${style.toLowerCase()} Stil`);
    if (perspective) details.push(perspective);
    if (details.length) v2.push(`Berücksichtige: ${details.join(', ')}.`);
    if (beispiel) v2.push(`Orientiere dich an: ${beispiel}`);

    // Variation 3 – Rollen-Ansatz
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
    const vars = buildVariations();
    const list = document.getElementById('variations-list');
    if (!list) return;
    if (!vars.length) {
      list.innerHTML = '<p class="text-muted text-center py-3">Bitte zuerst mindestens Texttyp oder Thema ausfüllen.</p>';
    } else {
      list.innerHTML = vars.map((v, i) => `
        <div class="variation-item" data-text="${v.replace(/"/g, '&quot;')}">
          <div class="variation-num">Variation ${i + 1}</div>
          <div class="variation-text">${esc(v)}</div>
          <button type="button" class="action-btn action-btn--outline variation-copy-btn mt-2">
            <i class="fa-solid fa-copy me-1"></i>Kopieren
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
      'lbl.openin': 'Öffnen in:', 'btn.reset': 'Zurücksetzen',
      'modal.title': 'Generierter Prompt', 'btn.close': 'Schließen',
      'history.title': 'Prompt-Verlauf', 'history.empty': 'Noch keine Prompts generiert.',
      'variations.title': 'Prompt-Variationen',
      'variations.subtitle': '3 alternative Formulierungen deines Prompts – klicke auf eine, um sie zu kopieren.',
      'btn.library': 'Bibliothek', 'btn.save': 'Speichern', 'btn.saveConfirm': 'Speichern',
      'save.title': 'In Bibliothek speichern', 'save.label': 'Name / Titel',
      'save.hint': 'Gib dem Prompt einen aussagekräftigen Namen.',
      'save.placeholder': 'z.B. LinkedIn-Post Tech-Startup',
      'library.title': 'Prompt-Bibliothek',
      'library.empty': 'Noch keine Prompts gespeichert.',
      'library.emptyhint': 'Generiere einen Prompt und klicke auf „Speichern".',
      'toast.saved': 'In Bibliothek gespeichert!',
      'btn.next': 'Weiter', 'btn.toPreview': 'Zur Vorschau',
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
      'lbl.openin': 'Open in:', 'btn.reset': 'Reset',
      'modal.title': 'Generated Prompt', 'btn.close': 'Close',
      'history.title': 'Prompt History', 'history.empty': 'No prompts generated yet.',
      'variations.title': 'Prompt Variations',
      'variations.subtitle': '3 alternative formulations of your prompt – click one to copy.',
      'btn.library': 'Library', 'btn.save': 'Save', 'btn.saveConfirm': 'Save',
      'save.title': 'Save to Library', 'save.label': 'Name / Title',
      'save.hint': 'Give the prompt a descriptive name.',
      'save.placeholder': 'e.g. LinkedIn Post Tech Startup',
      'library.title': 'Prompt Library',
      'library.empty': 'No prompts saved yet.',
      'library.emptyhint': 'Generate a prompt and click "Save".',
      'toast.saved': 'Saved to library!',
      'btn.next': 'Next', 'btn.toPreview': 'To Preview',
    },
  };

  let uiLang = 'de';

  const applyUILang = (lang) => {
    uiLang = lang;
    const t = UI_STRINGS[lang] || UI_STRINGS.de;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (t[key]) el.placeholder = t[key];
    });
    if (uiLangLabel) uiLangLabel.textContent = lang === 'de' ? 'EN' : 'DE';
    try { localStorage.setItem('chati_ui_lang', lang); } catch {}
    renderCatalog(activeFilter);
  };

  btnUiLang?.addEventListener('click', () => applyUILang(uiLang === 'de' ? 'en' : 'de'));

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

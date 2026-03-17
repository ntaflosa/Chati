// All translation/mapping tables extracted from script.js
// These are pure data objects — no DOM dependencies.

export const LENGTH_MAP = {
  'Sehr kurz (50–100 Wörter)':  'Sehr kurz',
  'Kurz (100–300 Wörter)':      'Kurz',
  'Mittel (300–600 Wörter)':    'Mittel',
  'Lang (600–1.200 Wörter)':    'Lang',
  'Sehr lang (1.200+ Wörter)':  'Sehr lang',
};

export const LENGTH_MAP_EN = {
  'Sehr kurz (50–100 Wörter)':  'very short (50–100 words)',
  'Kurz (100–300 Wörter)':      'short (100–300 words)',
  'Mittel (300–600 Wörter)':    'medium (300–600 words)',
  'Lang (600–1.200 Wörter)':    'long (600–1,200 words)',
  'Sehr lang (1.200+ Wörter)':  'very long (1,200+ words)',
};

export const ADDRESS_MAP    = { formal: 'Sie-Form', informell: 'Du-Form', neutral: 'Neutral', kombiniert: 'Kombiniert' };
export const ADDRESS_MAP_EN = { formal: 'formal (Sie)', informell: 'informal (du)', neutral: 'neutral', kombiniert: 'mixed' };

export const FORMAT_MAP_EN = {
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

export const STYLE_MAP_EN = {
  'Emotional': 'emotional', 'Empathisch': 'empathetic', 'Formell': 'formal',
  'Humorvoll': 'humorous', 'Informell': 'informal', 'Inspirierend': 'inspiring',
  'Journalistisch': 'journalistic', 'Minimalistisch': 'minimalist',
  'Motivierend': 'motivational', 'Persönlich': 'personal', 'Poetisch': 'poetic',
  'Provokativ': 'provocative', 'Sachlich': 'factual', 'Seriös': 'serious',
  'Storytelling': 'storytelling', 'Technisch': 'technical',
  'Umgangssprachlich': 'colloquial', 'Werblich': 'promotional',
  'Wissenschaftlich': 'scientific',
};

export const AUDIENCE_MAP_EN = {
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

export const PERSPECTIVE_MAP_EN = {
  'Du-Perspektive': 'second person (you)',
  'Er-/Sie-Perspektive': 'third person',
  'Ich-Perspektive': 'first person (I)',
  'Neutral/Objektiv': 'neutral/objective',
  'Wir-Perspektive': 'first person plural (we)',
};

export const ARTICLE_MAP = {
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

export const ARTICLE_MAP_EN = {
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

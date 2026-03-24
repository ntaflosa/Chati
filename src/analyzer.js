// Pure prompt reverse-engineer — no DOM, no side-effects.
// analyzePrompt(text) → partial fields object (keys from FIELD_IDS)

/**
 * Analyse a free-text prompt and extract recognised field values.
 * Returns a partial object; callers should treat missing keys as unset.
 */
export function analyzePrompt(text) {
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

  // Topic / Description
  const topicPatterns = [
    /(?:zum thema|über das thema|thema\s*[:\-])\s*([^.!?\n]{10,200})/i,
    /(?:topic\s*[:\-]|about\s*[:\-]?|über\s*[:\-]?)\s*([^.!?\n]{10,200})/i,
  ];
  for (const p of topicPatterns) {
    const m = text.match(p);
    if (m) { result['description'] = m[1].trim(); break; }
  }
  if (!result['description']) {
    const sentences = text.split(/[.!?]/).map(s => s.trim())
      .filter(s => s.length > 25 && !/^(?:du bist|you are|act as|erstelle|create|write|schreibe|erzeuge|generate)/i.test(s));
    if (sentences[0]) {
      const s = sentences[0];
      result['description'] = s.length > 160 ? s.substring(0, 160) + '…' : s;
    }
  }

  return result;
}

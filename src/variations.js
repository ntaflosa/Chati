// Pure prompt variations builder — no DOM, no side-effects.

import {
  ARTICLE_MAP, ARTICLE_MAP_EN,
  LENGTH_MAP, LENGTH_MAP_EN,
  FORMAT_MAP_EN, STYLE_MAP_EN,
  AUDIENCE_MAP_EN, PERSPECTIVE_MAP_EN,
  ADDRESS_MAP, ADDRESS_MAP_EN,
} from './mappings.js';

/**
 * Build 3 alternative phrasings of a prompt.
 *
 * @param {Object} fields  Plain object with FIELD_IDS keys
 * @param {string} lang    'de' | 'en'
 * @returns {string[]}     Array of 0–3 variation strings
 */
export function buildVariations(fields, lang = 'de') {
  const type        = fields['content-type']          || '';
  const description = fields['description']           || '';
  const audience    = fields['target-audience']       || '';
  const length      = fields['content-length']        || '';
  const formatting  = fields['formatting']            || '';
  const seo         = fields['seo-keyword-option']    || '';
  const titleSub    = fields['title-subtitle-option'] || '';
  const perspective = fields['perspective']           || '';
  const addressForm = fields['address-form']          || '';
  const style       = fields['language-style']        || '';
  const emojis      = fields['emoji-option']          || '';
  const beispiel    = fields['beispiel']              || '';

  if (!type && !description) return [];

  if (lang === 'en') {
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

  // German
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
}

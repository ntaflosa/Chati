// Pure prompt-building functions — no DOM reads, no side-effects.
// fields = plain object with FIELD_IDS keys
// ctx    = { active: bool, company: string, industry: string, extra: string } | null

import {
  ARTICLE_MAP, ARTICLE_MAP_EN,
  LENGTH_MAP, LENGTH_MAP_EN,
  FORMAT_MAP_EN, STYLE_MAP_EN,
  AUDIENCE_MAP_EN, PERSPECTIVE_MAP_EN,
  ADDRESS_MAP, ADDRESS_MAP_EN,
} from './mappings.js';

/**
 * Build the project-context prefix line for DE and EN prompts.
 * Returns empty string when context is inactive or empty.
 */
export function buildCtxPreviewText(ctx) {
  if (!ctx?.active) return '';
  const parts = [];
  if (ctx.company)  parts.push(`Firma/Projekt: ${ctx.company}`);
  if (ctx.industry) parts.push(`Branche: ${ctx.industry}`);
  if (ctx.extra)    parts.push(ctx.extra);
  return parts.length ? `[Projekt-Kontext: ${parts.join(' · ')}]` : '';
}

/**
 * Build the German prompt string from a fields object.
 */
export function buildFlowPrompt(fields, ctx = null) {
  const role        = fields['role-definition']      || '';
  const type        = fields['content-type']         || '';
  const description = fields['description']          || '';
  const audience    = fields['target-audience']      || '';
  const length      = fields['content-length']       || '';
  const formatting  = fields['formatting']           || '';
  const seo         = fields['seo-keyword-option']   || '';
  const titleSub    = fields['title-subtitle-option'] || '';
  const perspective = fields['perspective']          || '';
  const addressForm = fields['address-form']         || '';
  const style       = fields['language-style']       || '';
  const emojis      = fields['emoji-option']         || '';
  const beispiel    = fields['beispiel']             || '';

  if (!role && !type && !description) return '';
  const s = [];

  const ctxText = buildCtxPreviewText(ctx);
  if (ctxText) s.push(ctxText);
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
}

/**
 * Build the English prompt string from a fields object.
 */
export function buildFlowPromptEN(fields, ctx = null) {
  const role        = fields['role-definition']      || '';
  const type        = fields['content-type']         || '';
  const description = fields['description']          || '';
  const audience    = fields['target-audience']      || '';
  const length      = fields['content-length']       || '';
  const formatting  = fields['formatting']           || '';
  const seo         = fields['seo-keyword-option']   || '';
  const titleSub    = fields['title-subtitle-option'] || '';
  const perspective = fields['perspective']          || '';
  const addressForm = fields['address-form']         || '';
  const style       = fields['language-style']       || '';
  const emojis      = fields['emoji-option']         || '';
  const beispiel    = fields['beispiel']             || '';

  if (!role && !type && !description) return '';
  const s = [];

  const ctxText = buildCtxPreviewText(ctx);
  if (ctxText) s.push(ctxText);
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
}

/**
 * Select the appropriate builder based on language.
 */
export function getCurrentPrompt(fields, ctx, lang) {
  return lang === 'en' ? buildFlowPromptEN(fields, ctx) : buildFlowPrompt(fields, ctx);
}

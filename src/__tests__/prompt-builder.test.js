import { describe, it, expect } from 'vitest';
import {
  buildFlowPrompt,
  buildFlowPromptEN,
  getCurrentPrompt,
  buildCtxPreviewText,
} from '../prompt-builder.js';

describe('buildFlowPrompt (DE)', () => {
  it('returns empty string when no role, type, or description', () => {
    expect(buildFlowPrompt({})).toBe('');
    expect(buildFlowPrompt({ 'language-style': 'Sachlich' })).toBe('');
  });

  it('includes role with trailing period when missing punctuation', () => {
    const result = buildFlowPrompt({ 'role-definition': 'Du bist ein Marketing-Experte' });
    expect(result).toContain('Du bist ein Marketing-Experte.');
  });

  it('does not double-punctuate role that already ends with period', () => {
    const result = buildFlowPrompt({ 'role-definition': 'Du bist ein Experte.' });
    expect(result).not.toContain('..');
  });

  it('includes content type with correct article', () => {
    const result = buildFlowPrompt({ 'content-type': 'Blog-Post' });
    expect(result).toContain('Erstelle einen Blog-Post.');
  });

  it('includes content type with correct article for feminine nouns', () => {
    const result = buildFlowPrompt({ 'content-type': 'Pressemitteilung' });
    expect(result).toContain('Erstelle eine Pressemitteilung.');
  });

  it('combines description and audience', () => {
    const result = buildFlowPrompt({
      'role-definition': 'Du bist Texter',
      'description': 'KI-Tools',
      'target-audience': 'Manager & Führungskräfte',
    });
    expect(result).toContain('Das Thema lautet: KI-Tools.');
    expect(result).toContain('Die Zielgruppe sind Manager & Führungskräfte.');
  });

  it('includes length mapping', () => {
    const result = buildFlowPrompt({
      'role-definition': 'Texter',
      'content-length': 'Kurz (100–300 Wörter)',
    });
    expect(result).toContain('Textlänge Kurz');
  });

  it('includes SEO keywords flag', () => {
    const result = buildFlowPrompt({ 'role-definition': 'x', 'seo-keyword-option': 'Ja' });
    expect(result).toContain('inklusive SEO-Keywords');
  });

  it('includes title/subtitle flag', () => {
    const result = buildFlowPrompt({ 'role-definition': 'x', 'title-subtitle-option': 'ja' });
    expect(result).toContain('mit Titel und Untertitel');
  });

  it('handles emoji variants', () => {
    expect(buildFlowPrompt({ 'role-definition': 'x', 'emoji-option': 'keine' })).toContain('ohne Emojis');
    expect(buildFlowPrompt({ 'role-definition': 'x', 'emoji-option': 'wenige' })).toContain('mit wenigen Emojis');
    expect(buildFlowPrompt({ 'role-definition': 'x', 'emoji-option': 'viele' })).toContain('mit vielen Emojis');
  });

  it('includes language style', () => {
    const result = buildFlowPrompt({ 'role-definition': 'x', 'language-style': 'Inspirierend' });
    expect(result).toContain('inspirierend sein');
  });

  it('includes example reference', () => {
    const result = buildFlowPrompt({ 'role-definition': 'x', 'beispiel': 'Beispieltext hier' });
    expect(result).toContain('Orientiere dich stilistisch an folgendem Beispiel: Beispieltext hier');
  });

  it('prepends active project context', () => {
    const ctx = { active: true, company: 'Acme GmbH', industry: 'Tech', extra: '' };
    const result = buildFlowPrompt({ 'role-definition': 'Texter' }, ctx);
    expect(result).toContain('[Projekt-Kontext: Firma/Projekt: Acme GmbH · Branche: Tech]');
  });

  it('omits project context when inactive', () => {
    const ctx = { active: false, company: 'Acme GmbH' };
    const result = buildFlowPrompt({ 'role-definition': 'Texter' }, ctx);
    expect(result).not.toContain('Projekt-Kontext');
  });
});

describe('buildFlowPromptEN', () => {
  it('returns empty string for empty fields', () => {
    expect(buildFlowPromptEN({})).toBe('');
  });

  it('produces English output for content type', () => {
    const result = buildFlowPromptEN({ 'content-type': 'Blog-Post' });
    expect(result).toContain('Create a blog post.');
  });

  it('produces different string than DE for same fields', () => {
    const fields = {
      'role-definition': 'Du bist ein Experte',
      'content-type': 'Newsletter',
      'description': 'KI im Marketing',
    };
    expect(buildFlowPrompt(fields)).not.toBe(buildFlowPromptEN(fields));
  });

  it('uses English audience label', () => {
    const result = buildFlowPromptEN({
      'role-definition': 'x',
      'target-audience': 'Manager & Führungskräfte',
    });
    expect(result).toContain('managers and executives');
  });

  it('uses English style label', () => {
    const result = buildFlowPromptEN({ 'role-definition': 'x', 'language-style': 'Formell' });
    expect(result).toContain('formal');
  });

  it('prepends active project context in EN prompt', () => {
    const ctx = { active: true, company: 'Acme', industry: '', extra: '' };
    const result = buildFlowPromptEN({ 'role-definition': 'x' }, ctx);
    expect(result).toContain('[Projekt-Kontext:');
  });
});

describe('getCurrentPrompt', () => {
  it('delegates to DE builder when lang is de', () => {
    const fields = { 'content-type': 'Blog-Post' };
    expect(getCurrentPrompt(fields, null, 'de')).toBe(buildFlowPrompt(fields));
  });

  it('delegates to EN builder when lang is en', () => {
    const fields = { 'content-type': 'Blog-Post' };
    expect(getCurrentPrompt(fields, null, 'en')).toBe(buildFlowPromptEN(fields));
  });
});

describe('buildCtxPreviewText', () => {
  it('returns empty string for null ctx', () => {
    expect(buildCtxPreviewText(null)).toBe('');
  });

  it('returns empty string when inactive', () => {
    expect(buildCtxPreviewText({ active: false, company: 'X' })).toBe('');
  });

  it('returns empty string when active but no fields', () => {
    expect(buildCtxPreviewText({ active: true })).toBe('');
  });

  it('builds prefix from company and industry', () => {
    const result = buildCtxPreviewText({ active: true, company: 'Acme', industry: 'SaaS', extra: '' });
    expect(result).toBe('[Projekt-Kontext: Firma/Projekt: Acme · Branche: SaaS]');
  });

  it('includes extra briefing text', () => {
    const result = buildCtxPreviewText({ active: true, company: '', industry: '', extra: 'B2B Fokus' });
    expect(result).toContain('B2B Fokus');
  });
});

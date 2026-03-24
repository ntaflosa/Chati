import { describe, it, expect } from 'vitest';
import { buildVariations } from '../variations.js';

describe('buildVariations', () => {
  it('returns empty array when both type and description are missing', () => {
    expect(buildVariations({})).toEqual([]);
    expect(buildVariations({ 'language-style': 'Sachlich' })).toEqual([]);
  });

  it('returns up to 3 non-empty strings for DE', () => {
    const vars = buildVariations({
      'content-type': 'Blog-Post',
      'description': 'KI-Tools im Alltag',
      'target-audience': 'Berufstätige (30–50 Jahre)',
    }, 'de');
    expect(vars.length).toBeGreaterThanOrEqual(1);
    expect(vars.length).toBeLessThanOrEqual(3);
    vars.forEach(v => expect(v.trim().length).toBeGreaterThan(5));
  });

  it('returns up to 3 non-empty strings for EN', () => {
    const vars = buildVariations({
      'content-type': 'Blog-Post',
      'description': 'AI tools in daily life',
      'target-audience': 'Berufstätige (30–50 Jahre)',
    }, 'en');
    expect(vars.length).toBeGreaterThanOrEqual(1);
    vars.forEach(v => expect(v.trim().length).toBeGreaterThan(5));
  });

  it('DE variations contain German keywords', () => {
    const vars = buildVariations({ 'content-type': 'Newsletter', 'description': 'Digitalisierung' }, 'de');
    const combined = vars.join(' ');
    expect(combined).toMatch(/newsletter|verfasse|erstelle/i);
  });

  it('EN variations contain English keywords', () => {
    const vars = buildVariations({ 'content-type': 'Newsletter', 'description': 'Digitalisation' }, 'en');
    const combined = vars.join(' ');
    expect(combined).toMatch(/write|create|newsletter/i);
  });

  it('includes format info when content-length is set', () => {
    const vars = buildVariations({
      'content-type': 'Artikel',
      'description': 'Thema',
      'content-length': 'Kurz (100–300 Wörter)',
    }, 'de');
    expect(vars.join(' ')).toContain('Kurz');
  });

  it('includes SEO info when seo option is Ja (DE)', () => {
    const vars = buildVariations({
      'content-type': 'SEO-Text',
      'description': 'Keyword-Recherche',
      'seo-keyword-option': 'Ja',
    }, 'de');
    expect(vars.join(' ')).toContain('SEO-Keywords');
  });

  it('defaults to DE when lang is omitted', () => {
    const varsDefault = buildVariations({ 'content-type': 'Blog-Post', 'description': 'x' });
    const varsDe = buildVariations({ 'content-type': 'Blog-Post', 'description': 'x' }, 'de');
    expect(varsDefault).toEqual(varsDe);
  });
});

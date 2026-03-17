import { describe, it, expect } from 'vitest';
import { analyzePrompt } from '../analyzer.js';
import { buildFlowPrompt } from '../prompt-builder.js';

describe('analyzePrompt — role detection', () => {
  it('extracts German role pattern', () => {
    const result = analyzePrompt('Du bist ein erfahrener Marketing-Experte mit 10 Jahren Erfahrung.');
    expect(result['role-definition']).toBeTruthy();
    expect(result['role-definition']).toContain('Marketing-Experte');
  });

  it('extracts English role pattern', () => {
    const result = analyzePrompt('You are an experienced copywriter. Write a blog post.');
    expect(result['role-definition']).toContain('experienced copywriter');
  });

  it('returns empty object for plain text without patterns', () => {
    const result = analyzePrompt('The sky is blue.');
    expect(result['role-definition']).toBeUndefined();
  });
});

describe('analyzePrompt — content type detection', () => {
  it('detects Blog-Post', () => {
    const r = analyzePrompt('Schreibe einen Blogartikel über KI.');
    expect(r['content-type']).toBe('Blog-Post');
  });

  it('detects Pressemitteilung', () => {
    const r = analyzePrompt('Erstelle eine Pressemitteilung für unser neues Produkt.');
    expect(r['content-type']).toBe('Pressemitteilung');
  });

  it('detects Newsletter', () => {
    const r = analyzePrompt('Schreibe einen Newsletter für unsere Kunden.');
    expect(r['content-type']).toBe('Newsletter');
  });

  it('detects LinkedIn post', () => {
    const r = analyzePrompt('Erstelle einen LinkedIn-Post über unser Event.');
    expect(r['content-type']).toBe('LinkedIn-Beitrag');
  });

  it('detects E-Mail', () => {
    const r = analyzePrompt('Schreibe eine E-Mail an unsere Partner.');
    expect(r['content-type']).toBe('E-Mail');
  });
});

describe('analyzePrompt — length detection', () => {
  it('maps 200 words to Kurz', () => {
    const r = analyzePrompt('Schreibe einen Text mit 200 Wörtern.');
    expect(r['content-length']).toBe('Kurz (100–300 Wörter)');
  });

  it('maps 800 words to Lang', () => {
    const r = analyzePrompt('Write a text with 800 words about technology.');
    expect(r['content-length']).toBe('Lang (600–1.200 Wörter)');
  });

  it('maps "kurz" keyword to Kurz', () => {
    // The regex uses \bkurz\b — "kurz" must appear as a full word, not inflected
    const r = analyzePrompt('Halte es kurz und prägnant.');
    expect(r['content-length']).toBe('Kurz (100–300 Wörter)');
  });
});

describe('analyzePrompt — style detection', () => {
  it('detects journalistisch', () => {
    const r = analyzePrompt('Schreibe in einem journalistischen Stil.');
    expect(r['language-style']).toBe('Journalistisch');
  });

  it('detects formell/professional', () => {
    const r = analyzePrompt('The tone should be professional and formal.');
    expect(r['language-style']).toBe('Formell');
  });

  it('detects humorvoll', () => {
    const r = analyzePrompt('Schreibe humorvoll und witzig.');
    expect(r['language-style']).toBe('Humorvoll');
  });
});

describe('analyzePrompt — formatting', () => {
  it('detects Bullet Points', () => {
    const r = analyzePrompt('Erstelle eine Aufzählung mit Bullet Points.');
    expect(r['formatting']).toBe('Bullet Points');
  });

  it('detects FAQ format', () => {
    const r = analyzePrompt('Schreibe im FAQ-Format mit Fragen und Antworten.');
    expect(r['formatting']).toBe('FAQ-Format (Frage & Antwort)');
  });
});

describe('analyzePrompt — SEO & emojis', () => {
  it('detects SEO keywords request', () => {
    const r = analyzePrompt('Inklusive SEO-Keywords für bessere Sichtbarkeit.');
    expect(r['seo-keyword-option']).toBe('Ja');
  });

  it('detects no-emoji request', () => {
    const r = analyzePrompt('Schreibe ohne Emojis und sachlich.');
    expect(r['emoji-option']).toBe('keine');
  });
});

describe('analyzePrompt — round-trip consistency', () => {
  it('key fields survive a build → analyze round-trip', () => {
    const original = {
      'role-definition': 'Du bist ein erfahrener Marketing-Experte',
      'content-type': 'Blog-Post',
      'description': 'KI-Tools im Alltag',
      'content-length': 'Kurz (100–300 Wörter)',
    };
    const prompt = buildFlowPrompt(original);
    const analyzed = analyzePrompt(prompt);

    expect(analyzed['role-definition']).toBeTruthy();
    expect(analyzed['content-type']).toBe('Blog-Post');
    expect(analyzed['content-length']).toBe('Kurz (100–300 Wörter)');
  });
});

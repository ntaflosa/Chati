import { describe, it, expect } from 'vitest';
import { calculateScore } from '../score.js';

describe('calculateScore', () => {
  it('returns count=0 and label=basis for empty fields', () => {
    const { count, label } = calculateScore({});
    expect(count).toBe(0);
    expect(label).toBe('basis');
  });

  it('counts aufgabe when role-definition is set', () => {
    const { count } = calculateScore({ 'role-definition': 'Experte' });
    expect(count).toBe(1);
  });

  it('counts aufgabe when content-type is set', () => {
    const { count } = calculateScore({ 'content-type': 'Blog-Post' });
    expect(count).toBe(1);
  });

  it('counts aufgabe only once even when both role and type are set', () => {
    const { count } = calculateScore({ 'role-definition': 'x', 'content-type': 'Blog-Post' });
    expect(count).toBe(1);
  });

  it('counts kontext when description is set', () => {
    const { count } = calculateScore({ 'role-definition': 'x', 'description': 'Topic' });
    expect(count).toBe(2);
  });

  it('counts format when content-length is set', () => {
    const { count } = calculateScore({
      'role-definition': 'x',
      'description': 'y',
      'content-length': 'Kurz (100–300 Wörter)',
    });
    expect(count).toBe(3);
    expect(calculateScore({ 'role-definition': 'x', 'description': 'y', 'content-length': 'Kurz (100–300 Wörter)' }).label).toBe('gut');
  });

  it('counts format when seo option is Ja', () => {
    const { count } = calculateScore({ 'role-definition': 'x', 'seo-keyword-option': 'Ja' });
    expect(count).toBe(2);
  });

  it('counts persona when perspective is set', () => {
    const { count } = calculateScore({
      'role-definition': 'x',
      'description': 'y',
      'content-length': 'z',
      'perspective': 'Ich-Perspektive',
    });
    expect(count).toBe(4);
  });

  it('returns label=ausgezeichnet for 5+ filled groups', () => {
    const fields = {
      'role-definition': 'Experte',
      'description': 'KI-Tools',
      'content-length': 'Kurz (100–300 Wörter)',
      'perspective': 'Ich-Perspektive',
      'language-style': 'Sachlich',
    };
    const { count, label } = calculateScore(fields);
    expect(count).toBe(5);
    expect(label).toBe('ausgezeichnet');
  });

  it('returns count=6 when all 6 groups filled', () => {
    const fields = {
      'role-definition': 'Experte',
      'description': 'KI-Tools',
      'content-length': 'Kurz (100–300 Wörter)',
      'perspective': 'Ich-Perspektive',
      'language-style': 'Sachlich',
      'beispiel': 'Stilreferenz',
    };
    const { count, label } = calculateScore(fields);
    expect(count).toBe(6);
    expect(label).toBe('ausgezeichnet');
  });

  it('returns filled map with per-group booleans', () => {
    const { filled } = calculateScore({
      'content-type': 'Blog-Post',
      'description': 'KI-Tools',
      'language-style': 'Sachlich',
    });
    expect(filled.aufgabe).toBe(true);
    expect(filled.kontext).toBe(true);
    expect(filled.format).toBe(false);
    expect(filled.persona).toBe(false);
    expect(filled.tonfall).toBe(true);
    expect(filled.beispiel).toBe(false);
  });

  it('returns all-false filled map for empty fields', () => {
    const { filled } = calculateScore({});
    expect(Object.values(filled).every(v => v === false)).toBe(true);
    expect(Object.keys(filled)).toEqual(['aufgabe', 'kontext', 'format', 'persona', 'tonfall', 'beispiel']);
  });
});

import { describe, it, expect } from 'vitest';
import { UI_STRINGS, OPTION_LABELS } from '../i18n.js';

describe('UI_STRINGS key integrity', () => {
  it('de and en have identical key sets', () => {
    const deKeys = Object.keys(UI_STRINGS.de).sort();
    const enKeys = Object.keys(UI_STRINGS.en).sort();
    expect(deKeys).toEqual(enKeys);
  });

  it('neither de nor en has empty-string values', () => {
    for (const [key, val] of Object.entries(UI_STRINGS.de)) {
      expect(val, `UI_STRINGS.de['${key}'] is empty`).not.toBe('');
    }
    for (const [key, val] of Object.entries(UI_STRINGS.en)) {
      expect(val, `UI_STRINGS.en['${key}'] is empty`).not.toBe('');
    }
  });
});

describe('OPTION_LABELS key integrity', () => {
  it('de and en have identical category sets', () => {
    expect(Object.keys(OPTION_LABELS.de).sort())
      .toEqual(Object.keys(OPTION_LABELS.en).sort());
  });

  it('each category has matching option keys across de and en', () => {
    for (const category of Object.keys(OPTION_LABELS.de)) {
      const deKeys = Object.keys(OPTION_LABELS.de[category]).sort();
      const enKeys = Object.keys(OPTION_LABELS.en[category]).sort();
      expect(deKeys, `OPTION_LABELS['${category}'] keys mismatch`).toEqual(enKeys);
    }
  });
});

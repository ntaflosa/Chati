// Pure score calculation — no DOM, no side-effects.

/**
 * Calculate how many of the 6 prompt sections are filled.
 * Mirrors the PREVIEW_GROUPS logic from script.js without DOM reads.
 *
 * @param {Object} fields  Plain object with FIELD_IDS keys
 * @returns {{ count: number, label: 'basis'|'gut'|'ausgezeichnet' }}
 */
export function calculateScore(fields) {
  const groups = [
    // aufgabe: role-definition or content-type
    Boolean(fields['role-definition'] || fields['content-type']),
    // kontext: description or target-audience
    Boolean(fields['description'] || fields['target-audience']),
    // format: any format-related field
    Boolean(
      fields['content-length'] ||
      fields['formatting'] ||
      (fields['emoji-option'] && fields['emoji-option'] !== '') ||
      fields['seo-keyword-option'] === 'Ja' ||
      fields['title-subtitle-option'] === 'ja'
    ),
    // persona: perspective or address-form
    Boolean(fields['perspective'] || fields['address-form']),
    // tonfall: language-style
    Boolean(fields['language-style']),
    // beispiel
    Boolean(fields['beispiel']),
  ];

  const count = groups.filter(Boolean).length;
  const label = count >= 5 ? 'ausgezeichnet' : count >= 3 ? 'gut' : 'basis';
  return { count, label };
}

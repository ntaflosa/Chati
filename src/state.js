import { FIELD_IDS } from './constants.js';

// Centralised mutable state — replaces scattered `let` variables from the closure.
export const state = {
  activeLang: 'de',
  uiLang: 'de',
  activeTab: 'visual',
  editedPromptText: null,
  focusMode: false,
  activeCardId: null,
  activeFilter: 'alle',
  catalogSearchQuery: '',
  libSearch: '',
  histSearch: '',
  allCollapsed: false,
  activeLibTab: 'mine',
  activeExampleFilter: 'alle',
  onboardingStep: 0,
  lastFormState: null,
};

/**
 * Read all form fields from the DOM and return a plain object.
 * Keys match FIELD_IDS; only non-empty values are included.
 */
export function getFormState() {
  const data = {};
  for (const id of FIELD_IDS) {
    const el = document.getElementById(id);
    const v = (el?.value ?? '').trim();
    if (v) data[id] = v;
  }
  return data;
}

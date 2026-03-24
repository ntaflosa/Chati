// All application constants — no DOM, no side-effects.

export const FIELD_IDS = [
  'role-definition',
  'content-type', 'description', 'content-length', 'target-audience',
  'language-style', 'perspective', 'emoji-option', 'address-form',
  'formatting', 'seo-keyword-option', 'title-subtitle-option', 'beispiel',
];

export const LS_FORM_KEY      = 'chati_form';
export const LS_HISTORY_KEY   = 'chati_history';
export const LS_LIBRARY_KEY   = 'chati_library';
export const LS_PRESETS_KEY   = 'chati_presets';
export const LS_FAVORITES_KEY = 'chati_favorites';
export const LS_THEME_KEY     = 'chati_theme';
export const LS_PROJECT_CTX   = 'chati_project_ctx';
export const LS_RECENT_KEY    = 'chati_recent';
export const LS_ONBOARDED_KEY = 'chati_onboarded';
export const LS_VAULT_KEY     = 'chati_vault';
export const LS_UI_LANG_KEY   = 'chati_ui_lang';

export const HISTORY_MAX = 8;
export const VAULT_MAX   = 10;

export const THEMES = ['light', 'dark', 'ocean', 'violet', 'forest'];

export const STEP_BODIES = [
  'body-aufgabe',
  'body-kontext',
  'body-format',
  'body-persona',
  'body-tonfall',
  'body-beispiel',
];

export const THEME_ICONS = {
  light: 'fa-solid fa-sun', dark: 'fa-solid fa-moon',
  ocean: 'fa-solid fa-water', violet: 'fa-solid fa-star',
  forest: 'fa-solid fa-leaf',
};

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM references ────────────────────────────────────────────────────────
  const livePrompt      = document.getElementById('live-prompt');
  const promptStatus    = document.getElementById('prompt-status');
  const modalPromptText = document.getElementById('modal-prompt-text');
  const btnCopy         = document.getElementById('btn-copy');
  const btnShow         = document.getElementById('btn-show');
  const modalBtnCopy    = document.getElementById('modal-btn-copy');
  const catalogGrid     = document.getElementById('catalog-grid');
  const catalogFilters  = document.getElementById('catalog-filters');
  const catalogToggle   = document.getElementById('catalog-toggle');
  const catalogBody     = document.getElementById('catalog-body');
  const catalogChevron  = document.getElementById('catalog-chevron');

  // Bootstrap instances
  const promptModal = new bootstrap.Modal(document.getElementById('promptModal'));
  const copyToast   = new bootstrap.Toast(document.getElementById('copy-toast'), { delay: 2500 });

  // ── Field IDs used in the prompt ─────────────────────────────────────────
  const FIELD_IDS = [
    'content-type',
    'description',
    'content-length',
    'target-audience',
    'language-style',
    'perspective',
    'emoji-option',
    'address-form',
    'formatting',
    'seo-keyword-option',
    'title-subtitle-option',
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** Returns the current value of a field by ID, or an empty string. */
  const val = (id) => document.getElementById(id)?.value ?? '';

  /** Builds the full prompt string from current form state. */
  const buildPrompt = () => {
    const titleSubtitle = val('title-subtitle-option') === 'ja'
      ? '- Titel & Untertitel generieren: [Ja]\n'
      : '';

    return (
      'Generiere einen personalisierten Text unter Berücksichtigung folgender Details:\n' +
      titleSubtitle +
      `- Verwendungszweck: [${val('content-type')}]\n` +
      `- Thema: [${val('description')}]\n` +
      `- Textlänge: [${val('content-length')}]\n` +
      `- Zielgruppe: [${val('target-audience')}]\n` +
      `- Sprachstil: [${val('language-style')}]\n` +
      `- Perspektive: [${val('perspective')}]\n` +
      `- Emojis: [${val('emoji-option')}]\n` +
      `- Anredeform: [${val('address-form')}]\n` +
      `- Formatierung: [${val('formatting')}]\n` +
      `- SEO-Keywords: [${val('seo-keyword-option')}]`
    );
  };

  /** Returns true when at least one field has a non-empty value. */
  const hasContent = () => FIELD_IDS.some((id) => val(id) !== '');

  // ── Live Preview ──────────────────────────────────────────────────────────

  /** Updates the live preview box and status indicator. */
  const updatePreview = () => {
    livePrompt.textContent = buildPrompt();

    if (hasContent()) {
      livePrompt.classList.add('has-content');
      promptStatus.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i>Bereit zum Kopieren';
      promptStatus.classList.add('ready');
    } else {
      livePrompt.classList.remove('has-content');
      promptStatus.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-1"></i>Warte auf Eingaben …';
      promptStatus.classList.remove('ready');
    }
  };

  // ── Clipboard ─────────────────────────────────────────────────────────────

  /** Copies the current prompt text to the clipboard and shows a toast. */
  const copyPrompt = async () => {
    const text = livePrompt.textContent?.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for non-HTTPS / older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    copyToast.show();
  };

  // ── Prompt Catalog ────────────────────────────────────────────────────────

  let activeFilter  = 'alle';
  let activeCardId  = null;

  /** Renders catalog cards filtered by category. */
  const renderCatalog = (filter = 'alle') => {
    const items = filter === 'alle'
      ? PROMPT_CATALOG
      : PROMPT_CATALOG.filter((t) => t.category === filter);

    catalogGrid.innerHTML = items.map((t) => `
      <div
        class="catalog-card${activeCardId === t.id ? ' active' : ''}"
        data-id="${t.id}"
        role="button"
        tabindex="0"
        aria-label="Vorlage: ${t.name}">
        <div class="catalog-card__icon">
          <i class="${t.icon}"></i>
        </div>
        <div class="catalog-card__body">
          <div class="catalog-card__name">${t.name}</div>
          <span class="catalog-card__badge">${t.category}</span>
        </div>
      </div>
    `).join('');
  };

  /** Applies a catalog template: fills all form fields and updates preview. */
  const applyTemplate = (id) => {
    const template = PROMPT_CATALOG.find((t) => t.id === id);
    if (!template) return;

    // Fill dropdowns
    Object.entries(template.fields).forEach(([fieldId, value]) => {
      const el = document.getElementById(fieldId);
      if (el) el.value = value;
    });

    // Update description placeholder as a hint (don't overwrite user input)
    const descEl = document.getElementById('description');
    if (descEl && !descEl.value.trim()) {
      descEl.placeholder = template.descriptionHint;
    }

    activeCardId = id;
    renderCatalog(activeFilter);
    updatePreview();

    // Scroll to description field so user can start typing immediately
    descEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    descEl?.focus();
  };

  // Filter chip click
  catalogFilters.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    catalogFilters.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderCatalog(activeFilter);
  });

  // Card click / keyboard
  catalogGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.catalog-card');
    if (!card) return;
    applyTemplate(card.dataset.id);
  });

  catalogGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.catalog-card');
    if (!card) return;
    e.preventDefault();
    applyTemplate(card.dataset.id);
  });

  // ── Catalog Collapse ──────────────────────────────────────────────────────

  let catalogOpen = true;

  const toggleCatalog = () => {
    catalogOpen = !catalogOpen;
    if (catalogOpen) {
      catalogBody.style.maxHeight = catalogBody.scrollHeight + 'px';
      catalogBody.classList.remove('collapsed');
      catalogChevron.classList.remove('collapsed');
    } else {
      catalogBody.style.maxHeight = catalogBody.scrollHeight + 'px'; // set explicit before transitioning
      requestAnimationFrame(() => {
        catalogBody.style.maxHeight = '0';
        catalogBody.classList.add('collapsed');
        catalogChevron.classList.add('collapsed');
      });
    }
  };

  catalogToggle.addEventListener('click', toggleCatalog);
  catalogToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCatalog(); }
  });

  // ── Global event listeners ────────────────────────────────────────────────

  document.addEventListener('input',  updatePreview);
  document.addEventListener('change', updatePreview);

  btnCopy.addEventListener('click', copyPrompt);
  modalBtnCopy.addEventListener('click', copyPrompt);

  btnShow.addEventListener('click', () => {
    modalPromptText.textContent = livePrompt.textContent;
    promptModal.show();
  });

  // ── Init ──────────────────────────────────────────────────────────────────

  renderCatalog();

  // Set initial max-height for smooth collapse animation
  catalogBody.style.maxHeight = 'none';

  updatePreview();

});

// Thin localStorage wrapper — replaces ~15 identical try/catch blocks in script.js.

export const Storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw) ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },

  getString(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },

  setString(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  },

  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  },
};

import { describe, it, expect, beforeEach } from 'vitest';
import { Storage } from '../storage.js';

// Minimal localStorage mock for Node.js environment
const store = {};
global.localStorage = {
  _store: store,
  getItem(k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
  setItem(k, v) { store[k] = String(v); },
  removeItem(k) { delete store[k]; },
  clear() { Object.keys(store).forEach(k => delete store[k]); },
};

beforeEach(() => {
  localStorage.clear();
});

describe('Storage.get', () => {
  it('returns fallback for missing key', () => {
    expect(Storage.get('nonexistent')).toBeNull();
    expect(Storage.get('nonexistent', [])).toEqual([]);
  });

  it('returns parsed JSON value', () => {
    localStorage.setItem('test', JSON.stringify({ a: 1 }));
    expect(Storage.get('test')).toEqual({ a: 1 });
  });

  it('returns fallback for corrupt JSON', () => {
    localStorage.setItem('corrupt', '{not valid json');
    expect(Storage.get('corrupt', 'fallback')).toBe('fallback');
  });

  it('returns fallback when stored value is JSON null', () => {
    localStorage.setItem('nullval', 'null');
    expect(Storage.get('nullval', 'default')).toBe('default');
  });
});

describe('Storage.set / Storage.get round-trip', () => {
  it('stores and retrieves an array', () => {
    const items = [{ id: 1, name: 'Test' }, { id: 2, name: 'Other' }];
    Storage.set('items', items);
    expect(Storage.get('items')).toEqual(items);
  });

  it('stores and retrieves an object', () => {
    const obj = { activeLang: 'en', theme: 'dark' };
    Storage.set('config', obj);
    expect(Storage.get('config')).toEqual(obj);
  });

  it('stores and retrieves a boolean', () => {
    Storage.set('flag', true);
    expect(Storage.get('flag')).toBe(true);
  });
});

describe('Storage.getString / Storage.setString', () => {
  it('round-trips a raw string', () => {
    Storage.setString('lang', 'de');
    expect(Storage.getString('lang')).toBe('de');
  });

  it('returns null for missing key', () => {
    expect(Storage.getString('missing')).toBeNull();
  });
});

describe('Storage.remove', () => {
  it('removes an existing key', () => {
    Storage.set('key', 42);
    Storage.remove('key');
    expect(Storage.get('key')).toBeNull();
  });

  it('does not throw when removing non-existent key', () => {
    expect(() => Storage.remove('nope')).not.toThrow();
  });
});

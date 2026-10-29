import type {
  LocalStorageItems,
  SessionStorageItems,
} from "@src/models/local-storage-items";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getLocalStorageRaw(key: LocalStorageItems | string): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(key);
}

export function setLocalStorageRaw(key: LocalStorageItems | string, value: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key: LocalStorageItems | string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export function getLocalStorageJson<T>(key: LocalStorageItems | string): T | null {
  const raw = getLocalStorageRaw(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setLocalStorageJson<T>(key: LocalStorageItems | string, value: T): void {
  setLocalStorageRaw(key, JSON.stringify(value));
}

export function getSessionStorageRaw(key: SessionStorageItems | string): string | null {
  if (!isBrowser()) return null;
  return window.sessionStorage.getItem(key);
}

export function setSessionStorageRaw(key: SessionStorageItems | string, value: string): void {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(key, value);
}

export function removeSessionStorageItem(key: SessionStorageItems | string): void {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(key);
}

export function getSessionStorageJson<T>(key: SessionStorageItems | string): T | null {
  const raw = getSessionStorageRaw(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setSessionStorageJson<T>(key: SessionStorageItems | string, value: T): void {
  setSessionStorageRaw(key, JSON.stringify(value));
}

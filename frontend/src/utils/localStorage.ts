export function getItem<T>(key: string): T | null {
  const stored = localStorage.getItem(key);
  if (stored === null) {
    return null;
  }

  try {
    return JSON.parse(stored) as T;
  } catch {
    localStorage.removeItem(key);

    return null;
  }
}

export function setItem<T>(key: string, value: T | null): void {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

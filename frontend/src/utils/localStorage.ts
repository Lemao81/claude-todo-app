export function setItem<T>(key: string, value: T): void {
  if (value === undefined) {
    localStorage.removeItem(key);

    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key);

  if (value === null || value === 'undefined') {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage value for key "${key}":`, value, error);

    return null;
  }
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  return JSON.parse(value) as T;
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

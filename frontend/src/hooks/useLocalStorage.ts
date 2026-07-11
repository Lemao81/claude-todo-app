import { useCallback } from 'react';

export function useLocalStorage() {
  const getItem = useCallback(<T>(key: string): T | null => {
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
  }, []);

  const setItem = useCallback(<T>(key: string, value: T | null): void => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return { getItem, setItem };
}

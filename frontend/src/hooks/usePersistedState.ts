import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react';
import { getItem, removeItem, setItem } from '#/utils/localStorage';

export function usePersistedState<T>(
  key: string,
  initialValue?: T,
): { value: T | undefined; setValue: Dispatch<SetStateAction<T | undefined>>; clear: () => void } {
  const [value, setValue] = useState<T | undefined>(() => getItem<T>(key) ?? initialValue);

  useEffect(() => setItem(key, value), [key, value]);

  const clear = useCallback(() => {
    removeItem(key);
    setValue(undefined);
  }, [key]);

  return { value, setValue, clear };
}

import { useCallback, useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const readValue = useCallback(() => {
    const value =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (!isBrowser) {
      return value;
    }

    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
      return value;
    } catch (error) {
      console.warn(`useLocalStorage parse error for key: ${key}`, error);
      return value;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`useLocalStorage setItem error for key: ${key}`, error);
    }
  }, [key, value]);

  useEffect(() => {
    if (!isBrowser) return;
    const handler = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(event.newValue ? JSON.parse(event.newValue) : readValue());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, readValue]);

  return [value, setValue] as const;
}

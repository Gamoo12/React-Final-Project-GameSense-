import { useState, useEffect } from 'react';

/**
 * useState synced with sessionStorage (cleared when the tab closes).
 * @param {string} key   sessionStorage key
 * @param {*} initialValue  fallback value when nothing is stored
 */
function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.sessionStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable — fail silently
    }
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;

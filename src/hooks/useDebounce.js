import { useState, useEffect } from 'react';

/**
 * Returns a debounced copy of a value — it only updates
 * after `delay` ms have passed without the value changing.
 * @param {*} value
 * @param {number} delay milliseconds
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

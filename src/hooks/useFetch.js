import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data-fetching hook.
 * @param {Function} fetcher  async function that returns data
 * @param {Array} deps        dependency list that re-triggers the fetch
 */
function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (isActive = () => true) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (isActive()) setData(result);
    } catch (err) {
      if (isActive()) setError(err.message || 'Something went wrong');
    } finally {
      if (isActive()) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    let active = true;
    load(() => active);
    return () => {
      active = false;
    };
  }, [load]);

  return { data, loading, error, refetch: load };
}

export default useFetch;

import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';

const STORAGE_KEY = 'gamesense-backlog';

const BacklogContext = createContext(null);

function backlogReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (state.some((game) => game.id === action.payload.id)) return state;
      return [...state, action.payload];
    }
    case 'REMOVE':
      return state.filter((game) => game.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function initBacklog() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function BacklogProvider({ children }) {
  const [backlog, dispatch] = useReducer(backlogReducer, null, initBacklog);

  // Persist the backlog to localStorage on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(backlog));
    } catch {
      // storage unavailable — fail silently
    }
  }, [backlog]);

  const addToBacklog = useCallback((game) => {
    dispatch({ type: 'ADD', payload: game });
  }, []);

  const removeFromBacklog = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: id });
  }, []);

  const clearBacklog = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const isInBacklog = useCallback(
    (id) => backlog.some((game) => game.id === id),
    [backlog]
  );

  const toggleBacklog = useCallback(
    (game) => {
      if (backlog.some((item) => item.id === game.id)) {
        removeFromBacklog(game.id);
      } else {
        addToBacklog(game);
      }
    },
    [backlog, addToBacklog, removeFromBacklog]
  );

  const value = useMemo(
    () => ({
      backlog,
      addToBacklog,
      removeFromBacklog,
      clearBacklog,
      isInBacklog,
      toggleBacklog,
    }),
    [backlog, addToBacklog, removeFromBacklog, clearBacklog, isInBacklog, toggleBacklog]
  );

  return <BacklogContext.Provider value={value}>{children}</BacklogContext.Provider>;
}

export function useBacklog() {
  const context = useContext(BacklogContext);
  if (!context) {
    throw new Error('useBacklog must be used inside a <BacklogProvider>');
  }
  return context;
}

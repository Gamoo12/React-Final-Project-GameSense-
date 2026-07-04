import { createContext, useContext, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('gamesense-language', 'en');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'ka' : 'en'));
  }, [setLanguage]);

  // t('nav.home') -> translated string for the active language
  const t = useCallback(
    (key) => {
      const parts = key.split('.');
      let node = translations[language];
      for (const part of parts) {
        node = node?.[part];
      }
      return node ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>');
  }
  return context;
}

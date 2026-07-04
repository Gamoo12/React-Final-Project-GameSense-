import { useLanguage } from '../../context/LanguageContext';

function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="lang-switcher"
      onClick={toggleLanguage}
      aria-label="Switch language"
      title={language === 'en' ? 'ქართულად გადართვა' : 'Switch to English'}
    >
      {language === 'en' ? 'ქარ' : 'ENG'}
    </button>
  );
}

export default LanguageSwitcher;

import { useLanguage } from '../../context/LanguageContext';

function Loader({ fullScreen = false }) {
  const { t } = useLanguage();

  return (
    <div className={`loader ${fullScreen ? 'loader--fullscreen' : ''}`} role="status">
      <span className="loader__spinner" />
      <span className="loader__text">{t('loader.loading')}</span>
    </div>
  );
}

export default Loader;

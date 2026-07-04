import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="not-found page-enter">
      <div className="container not-found__inner">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">{t('notFound.title')}</h1>
        <p className="not-found__text">{t('notFound.text')}</p>
        <Link to="/" className="btn btn--primary">
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

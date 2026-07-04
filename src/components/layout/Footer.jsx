import { useLanguage } from '../../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__copy">
          © {year} Game Sense. {t('footer.rights')}
        </p>
        <p className="footer__credits">
          {t('footer.dataBy')}{' '}
          <a
            href="https://www.freetogame.com/api-doc"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            FreeToGame API
          </a>{' '}
          · {t('footer.madeWith')} ⚛
        </p>
      </div>
    </footer>
  );
}

export default Footer;

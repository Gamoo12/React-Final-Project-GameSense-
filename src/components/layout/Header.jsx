import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBacklog } from '../../context/BacklogContext';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSwitcher from '../ui/LanguageSwitcher';

function Header() {
  const { t } = useLanguage();
  const { backlog } = useBacklog();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinkClass = ({ isActive }) =>
    isActive ? 'header__link header__link--active' : 'header__link';

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label="Game Sense home">
          Game<span className="header__logo-accent">Sense</span>
        </Link>

        <nav
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" className={navLinkClass} end>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/games" className={navLinkClass}>
            {t('nav.games')}
          </NavLink>
          <NavLink to="/backlog" className={navLinkClass}>
            {t('nav.backlog')}
            {backlog.length > 0 && (
              <span className="header__badge">{backlog.length}</span>
            )}
          </NavLink>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

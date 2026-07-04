import { useTheme } from '../../context/ThemeContext';
import { IconSun, IconMoon } from './icons';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-toggle__icon ${isDark ? 'theme-toggle__icon--spin' : ''}`}>
        {isDark ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
      </span>
    </button>
  );
}

export default ThemeToggle;

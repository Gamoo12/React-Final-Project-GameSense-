import { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { IconSearch, IconClose } from '../ui/icons';

function SearchBar({ value, onChange, onClear }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar" role="search">
      <IconSearch className="search-bar__icon" aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder={t('games.searchPlaceholder')}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t('games.searchPlaceholder')}
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label={t('games.clearSearch')}
        >
          <IconClose width={14} height={14} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

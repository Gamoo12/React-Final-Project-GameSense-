import { useState, useEffect, useMemo } from 'react';
import { getGames } from '../api/gamesApi';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import useSessionStorage from '../hooks/useSessionStorage';
import { useLanguage } from '../context/LanguageContext';
import GameGrid from '../components/games/GameGrid';
import SearchBar from '../components/games/SearchBar';
import QuickViewModal from '../components/games/QuickViewModal';
import Loader from '../components/ui/Loader';
import { IconDice } from '../components/ui/icons';

const PAGE_SIZE = 24;

function GamesPage() {
  const { t } = useLanguage();

  const { data: allGames, loading, error, refetch } = useFetch(() => getGames(), []);
  const [genre, setGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [quickViewGame, setQuickViewGame] = useState(null);

  // Last search query survives page refreshes within the tab (sessionStorage)
  const [query, setQuery] = useSessionStorage('gamesense-last-search', '');
  const debouncedQuery = useDebounce(query, 500);

  // Reset pagination whenever the active filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedQuery, genre, sortBy]);

  const genres = useMemo(() => {
    if (!allGames) return [];
    const set = new Set(allGames.map((game) => game.genre?.trim()).filter(Boolean));
    return [...set].sort();
  }, [allGames]);

  const filteredGames = useMemo(() => {
    if (!allGames) return [];
    let result = allGames;

    if (genre !== 'all') {
      result = result.filter((game) => game.genre?.trim() === genre);
    }

    const search = debouncedQuery.trim().toLowerCase();
    if (search) {
      result = result.filter((game) => game.title.toLowerCase().includes(search));
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'released') return new Date(b.release_date) - new Date(a.release_date);
      return 0; // 'popularity' — keep FreeToGame's own ordering
    });

    return result;
  }, [allGames, genre, debouncedQuery, sortBy]);

  const visibleGames = filteredGames.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGames.length;

  const surpriseMe = () => {
    if (filteredGames.length === 0) return;
    const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
    setQuickViewGame(randomGame);
  };

  return (
    <div className="games page-enter">
      <div className="container">
        <h1 className="page-title">{t('games.title')}</h1>

        <div className="games__controls">
          <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />

          <div className="games__filters">
            <select
              className="select"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              aria-label={t('games.allGenres')}
            >
              <option value="all">{t('games.allGenres')}</option>
              {genres.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort"
            >
              <option value="popularity">{t('games.sortPopularity')}</option>
              <option value="name">{t('games.sortName')}</option>
              <option value="released">{t('games.sortReleased')}</option>
            </select>

            <button type="button" className="btn btn--outline" onClick={surpriseMe}>
              <IconDice width={16} height={16} />
              {t('games.surpriseMe')}
            </button>
          </div>
        </div>

        {debouncedQuery.trim() && !loading && (
          <p className="games__results-info">
            {t('games.resultsFor')} “{debouncedQuery}” — {filteredGames.length}
          </p>
        )}

        {loading && <Loader />}

        {error && !loading && (
          <div className="error-box">
            <p>{t('error.title')}</p>
            <button type="button" className="btn btn--outline" onClick={() => refetch()}>
              {t('error.retry')}
            </button>
          </div>
        )}

        {!loading && !error && filteredGames.length === 0 && (
          <p className="games__empty">{t('games.noResults')}</p>
        )}

        {!loading && !error && (
          <>
            <GameGrid games={visibleGames} onQuickView={setQuickViewGame} />
            {hasMore && (
              <div className="games__more">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  {t('games.loadMore')}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <QuickViewModal game={quickViewGame} onClose={() => setQuickViewGame(null)} />
    </div>
  );
}

export default GamesPage;

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api/gamesApi';
import useFetch from '../hooks/useFetch';
import { useLanguage } from '../context/LanguageContext';
import GameGrid from '../components/games/GameGrid';
import QuickViewModal from '../components/games/QuickViewModal';
import Loader from '../components/ui/Loader';
import { IconSearch, IconController, IconContrast } from '../components/ui/icons';

function HomePage() {
  const { t } = useLanguage();
  const [quickViewGame, setQuickViewGame] = useState(null);

  const { data: games, loading, error, refetch } = useFetch(() => getGames(), []);

  // FreeToGame returns games already ordered by popularity
  const topGames = useMemo(() => (games || []).slice(0, 8), [games]);

  const stats = useMemo(() => {
    if (!games || games.length === 0) return { games: 0, genres: 0, publishers: 0 };
    return {
      games: games.length,
      genres: new Set(games.map((game) => game.genre?.trim()).filter(Boolean)).size,
      publishers: new Set(games.map((game) => game.publisher).filter(Boolean)).size,
    };
  }, [games]);

  return (
    <div className="home page-enter">
      <section className="hero">
        <div className="hero__content container">
          <h1 className="hero__title">{t('home.heroTitle')}</h1>
          <p className="hero__subtitle">{t('home.heroSubtitle')}</p>
          <Link to="/games" className="btn btn--primary btn--large">
            {t('home.exploreBtn')}
          </Link>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">{stats.games}+</span>
              <span className="hero__stat-label">{t('home.statsGames')}</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">{stats.genres}</span>
              <span className="hero__stat-label">{t('home.statsGenres')}</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">{stats.publishers}</span>
              <span className="hero__stat-label">{t('home.statsPublishers')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home__features container">
        <div className="feature-card">
          <IconSearch className="feature-card__icon" />
          <h3 className="feature-card__title">{t('home.featureSearchTitle')}</h3>
          <p className="feature-card__text">{t('home.featureSearchText')}</p>
        </div>
        <div className="feature-card">
          <IconController className="feature-card__icon" />
          <h3 className="feature-card__title">{t('home.featureBacklogTitle')}</h3>
          <p className="feature-card__text">{t('home.featureBacklogText')}</p>
        </div>
        <div className="feature-card">
          <IconContrast className="feature-card__icon" />
          <h3 className="feature-card__title">{t('home.featureThemeTitle')}</h3>
          <p className="feature-card__text">{t('home.featureThemeText')}</p>
        </div>
      </section>

      <section className="home__trending container">
        <div className="section-head">
          <h2 className="section-head__title">{t('home.trendingTitle')}</h2>
          <Link to="/games" className="section-head__link">
            {t('home.viewAll')} →
          </Link>
        </div>

        {loading && <Loader />}
        {error && (
          <div className="error-box">
            <p>{t('error.title')}</p>
            <button type="button" className="btn btn--outline" onClick={() => refetch()}>
              {t('error.retry')}
            </button>
          </div>
        )}
        {!loading && !error && <GameGrid games={topGames} onQuickView={setQuickViewGame} />}
      </section>

      <QuickViewModal game={quickViewGame} onClose={() => setQuickViewGame(null)} />
    </div>
  );
}

export default HomePage;

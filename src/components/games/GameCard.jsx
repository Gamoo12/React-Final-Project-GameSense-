import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useBacklog } from '../../context/BacklogContext';
import { useLanguage } from '../../context/LanguageContext';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%25" height="100%25" fill="%23201f2e"/><text x="50%25" y="50%25" fill="%237c7c94" font-size="16" text-anchor="middle" font-family="sans-serif">No Image</text></svg>';

/**
 * A single game card. Clicking the cover opens the quick-view modal;
 * the title links to the full details page.
 */
const GameCard = memo(function GameCard({ game, onQuickView }) {
  const { isInBacklog, toggleBacklog } = useBacklog();
  const { t } = useLanguage();
  const inBacklog = isInBacklog(game.id);

  const year = game.release_date?.slice(0, 4);

  return (
    <article className="game-card">
      <div className="game-card__cover-wrap">
        <img
          className="game-card__cover"
          src={game.thumbnail || FALLBACK_IMAGE}
          alt={game.title}
          loading="lazy"
        />
        <div className="game-card__overlay">
          <button
            type="button"
            className="btn btn--small"
            onClick={() => onQuickView(game)}
          >
            {t('modal.quickView')}
          </button>
        </div>
        {year && <span className="game-card__year">{year}</span>}
        <button
          type="button"
          className={`game-card__backlog ${inBacklog ? 'game-card__backlog--active' : ''}`}
          onClick={() => toggleBacklog(game)}
          aria-label={inBacklog ? t('details.removeBacklog') : t('details.addBacklog')}
          aria-pressed={inBacklog}
        >
          {inBacklog ? '✓' : '+'}
        </button>
      </div>
      <div className="game-card__body">
        <h3 className="game-card__title">
          <Link to={`/games/${game.id}`}>{game.title}</Link>
        </h3>
        <p className="game-card__genres">{game.genre?.trim() || '—'}</p>
      </div>
    </article>
  );
});

export default GameCard;

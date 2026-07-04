import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import { useLanguage } from '../../context/LanguageContext';
import { useBacklog } from '../../context/BacklogContext';

function QuickViewModal({ game, onClose }) {
  const { t } = useLanguage();
  const { isInBacklog, toggleBacklog } = useBacklog();

  if (!game) return null;

  const inBacklog = isInBacklog(game.id);
  const year = game.release_date?.slice(0, 4);

  return (
    <Modal isOpen={Boolean(game)} onClose={onClose} labelledBy="quick-view-title">
      <div className="quick-view">
        {game.thumbnail && (
          <img
            className="quick-view__cover"
            src={game.thumbnail}
            alt={game.title}
          />
        )}
        <div className="quick-view__info">
          <h2 id="quick-view-title" className="quick-view__title">
            {game.title}
          </h2>
          <p className="quick-view__meta">
            {year || t('details.unknown')}
            {game.genre ? ` · ${game.genre.trim()}` : ''}
            {game.platform ? ` · ${game.platform}` : ''}
          </p>
          {game.short_description && (
            <p className="quick-view__summary">{game.short_description}</p>
          )}

          <div className="quick-view__actions">
            <Link to={`/games/${game.id}`} className="btn btn--primary" onClick={onClose}>
              {t('modal.fullDetails')}
            </Link>
            <button
              type="button"
              className={`btn ${inBacklog ? 'btn--danger' : 'btn--outline'}`}
              onClick={() => toggleBacklog(game)}
            >
              {inBacklog ? `✓ ${t('details.removeBacklog')}` : `+ ${t('details.addBacklog')}`}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default QuickViewModal;

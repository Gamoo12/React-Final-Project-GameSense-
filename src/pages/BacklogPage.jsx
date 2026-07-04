import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBacklog } from '../context/BacklogContext';
import { useLanguage } from '../context/LanguageContext';
import GameGrid from '../components/games/GameGrid';
import QuickViewModal from '../components/games/QuickViewModal';
import GenreBreakdownChart from '../components/charts/GenreBreakdownChart';
import Modal from '../components/ui/Modal';
import { IconController } from '../components/ui/icons';

function BacklogPage() {
  const { backlog, clearBacklog } = useBacklog();
  const { t } = useLanguage();
  const [quickViewGame, setQuickViewGame] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClearAll = () => {
    clearBacklog();
    setConfirmOpen(false);
  };

  return (
    <div className="backlog page-enter">
      <div className="container">
        <div className="backlog__head">
          <h1 className="page-title">
            {t('backlog.title')}
            {backlog.length > 0 && (
              <span className="backlog__count">
                {backlog.length} {t('backlog.count')}
              </span>
            )}
          </h1>
          {backlog.length > 0 && (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => setConfirmOpen(true)}
            >
              {t('backlog.clearAll')}
            </button>
          )}
        </div>

        {backlog.length === 0 ? (
          <div className="backlog__empty">
            <IconController className="backlog__empty-icon" />
            <p className="backlog__empty-title">{t('backlog.empty')}</p>
            <p className="backlog__empty-hint">{t('backlog.emptyHint')}</p>
            <Link to="/games" className="btn btn--primary">
              {t('backlog.browseBtn')}
            </Link>
          </div>
        ) : (
          <>
            <GenreBreakdownChart games={backlog} />
            <GameGrid games={backlog} onQuickView={setQuickViewGame} />
          </>
        )}
      </div>

      <QuickViewModal game={quickViewGame} onClose={() => setQuickViewGame(null)} />

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        labelledBy="confirm-title"
      >
        <div className="confirm">
          <h2 id="confirm-title" className="confirm__title">
            {t('backlog.confirmTitle')}
          </h2>
          <p className="confirm__text">{t('backlog.confirmText')}</p>
          <div className="confirm__actions">
            <button type="button" className="btn btn--danger" onClick={handleClearAll}>
              {t('backlog.confirmYes')}
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setConfirmOpen(false)}
            >
              {t('backlog.confirmNo')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BacklogPage;

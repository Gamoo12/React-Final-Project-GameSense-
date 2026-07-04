import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGameById } from '../api/gamesApi';
import useFetch from '../hooks/useFetch';
import { useLanguage } from '../context/LanguageContext';
import { useBacklog } from '../context/BacklogContext';
import Loader from '../components/ui/Loader';

function GameDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isInBacklog, toggleBacklog } = useBacklog();

  const { data: game, loading, error } = useFetch(() => getGameById(id), [id]);

  if (loading) return <Loader fullScreen />;

  if (error || !game) {
    return (
      <div className="details page-enter">
        <div className="container">
          <div className="error-box">
            <p>{t('details.notFound')}</p>
            <Link to="/games" className="btn btn--primary">
              ← {t('nav.games')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inBacklog = isInBacklog(game.id);
  const requirements = game.minimum_system_requirements;

  return (
    <div className="details page-enter">
      <div className="container">
        <button type="button" className="btn btn--ghost details__back" onClick={() => navigate(-1)}>
          ← {t('details.back')}
        </button>

        <div className="details__layout">
          <div className="details__poster-col">
            {game.thumbnail ? (
              <img
                className="details__poster"
                src={game.thumbnail}
                alt={game.title}
              />
            ) : (
              <div className="details__poster details__poster--empty">🎮</div>
            )}
          </div>

          <div className="details__info">
            <h1 className="details__title">{game.title}</h1>

            {game.genre && (
              <div className="details__genres">
                <span className="tag">{game.genre.trim()}</span>
              </div>
            )}

            <dl className="details__meta">
              <div className="details__meta-item">
                <dt>{t('details.released')}</dt>
                <dd>{game.release_date || t('details.unknown')}</dd>
              </div>
              <div className="details__meta-item">
                <dt>{t('details.platforms')}</dt>
                <dd>{game.platform || t('details.unknown')}</dd>
              </div>
              <div className="details__meta-item">
                <dt>{t('details.developer')}</dt>
                <dd>{game.developer || t('details.unknown')}</dd>
              </div>
              <div className="details__meta-item">
                <dt>{t('details.publisher')}</dt>
                <dd>{game.publisher || t('details.unknown')}</dd>
              </div>
              <div className="details__meta-item">
                <dt>{t('details.status')}</dt>
                <dd>{game.status || t('details.unknown')}</dd>
              </div>
            </dl>

            <div className="details__actions">
              <button
                type="button"
                className={`btn ${inBacklog ? 'btn--danger' : 'btn--primary'}`}
                onClick={() => toggleBacklog(game)}
              >
                {inBacklog
                  ? `✓ ${t('details.removeBacklog')}`
                  : `+ ${t('details.addBacklog')}`}
              </button>
              {game.game_url && (
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  {t('details.playNow')} ↗
                </a>
              )}
            </div>

            {game.description && (
              <section className="details__summary">
                <h2>{t('details.summary')}</h2>
                <p>{game.description}</p>
              </section>
            )}

            {requirements && (
              <section className="details__requirements">
                <h2>{t('details.reqTitle')}</h2>
                <dl className="requirements-list">
                  {requirements.os && (
                    <div className="requirements-list__item">
                      <dt>{t('details.reqOs')}</dt>
                      <dd>{requirements.os}</dd>
                    </div>
                  )}
                  {requirements.processor && (
                    <div className="requirements-list__item">
                      <dt>{t('details.reqProcessor')}</dt>
                      <dd>{requirements.processor}</dd>
                    </div>
                  )}
                  {requirements.memory && (
                    <div className="requirements-list__item">
                      <dt>{t('details.reqMemory')}</dt>
                      <dd>{requirements.memory}</dd>
                    </div>
                  )}
                  {requirements.graphics && (
                    <div className="requirements-list__item">
                      <dt>{t('details.reqGraphics')}</dt>
                      <dd>{requirements.graphics}</dd>
                    </div>
                  )}
                  {requirements.storage && (
                    <div className="requirements-list__item">
                      <dt>{t('details.reqStorage')}</dt>
                      <dd>{requirements.storage}</dd>
                    </div>
                  )}
                </dl>
              </section>
            )}
          </div>
        </div>

        {game.screenshots?.length > 0 && (
          <section className="details__screenshots">
            <h2>{t('details.screenshots')}</h2>
            <div className="screenshot-grid">
              {game.screenshots.slice(0, 8).map((shot) => (
                <img
                  key={shot.id}
                  className="screenshot-grid__img"
                  src={shot.image}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default GameDetailsPage;

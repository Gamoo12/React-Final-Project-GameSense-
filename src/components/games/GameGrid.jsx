import GameCard from './GameCard';

function GameGrid({ games, onQuickView }) {
  return (
    <div className="game-grid">
      {games.map((game, index) => (
        <div
          key={game.id}
          className="game-grid__item"
          style={{ animationDelay: `${Math.min(index, 20) * 40}ms` }}
        >
          <GameCard game={game} onQuickView={onQuickView} />
        </div>
      ))}
    </div>
  );
}

export default GameGrid;

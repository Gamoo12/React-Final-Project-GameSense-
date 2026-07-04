import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

const COLORS = ['#7b5cff', '#17d9c4', '#ff6b9d', '#ffb84d', '#4dd6ff', '#a3ff6b', '#ff7b7b'];

/**
 * Pie chart showing how the saved backlog breaks down by genre.
 * @param {Array} games  backlog games, each with a `genre` string
 */
function GenreBreakdownChart({ games }) {
  const { t } = useLanguage();

  const data = useMemo(() => {
    const counts = new Map();
    games.forEach((game) => {
      const name = game.genre?.trim();
      if (!name) return;
      counts.set(name, (counts.get(name) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [games]);

  if (data.length === 0) return null;

  return (
    <div className="genre-chart">
      <h2 className="genre-chart__title">{t('backlog.genreChartTitle')}</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text)',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenreBreakdownChart;

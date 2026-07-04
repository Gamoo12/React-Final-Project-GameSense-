import axios from 'axios';

// FreeToGame — a free, keyless catalog of free-to-play PC & browser games.
const BASE_URL = 'https://www.freetogame.com/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Fetch the full game catalog, ordered by FreeToGame's own popularity ranking.
 * The catalog is small (a few hundred titles) so we pull it once and filter
 * client-side rather than paginating.
 */
export const getGames = async () => {
  const { data } = await apiClient.get('/games', {
    params: { 'sort-by': 'popularity' },
  });
  return data;
};

/**
 * Fetch a single game's full details — description, system requirements,
 * screenshots and a link to play it.
 * @param {number|string} id
 */
export const getGameById = async (id) => {
  const { data } = await apiClient.get('/game', { params: { id } });
  return data;
};

export default apiClient;

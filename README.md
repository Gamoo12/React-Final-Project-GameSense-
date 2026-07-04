# 🎮 Game Sense

**Game Sense** is a responsive React app for discovering free-to-play video games and building a personal backlog. Browse hundreds of PC & browser titles from the FreeToGame catalog, filter by genre, dig into full details, system requirements and screenshots, and queue up what to play next — with a genre breakdown chart of your saved backlog.

> Final exam project — React.

🔗 **Live site:** _[link will be added after deployment]_

---

## ✨ Features

- 🏠 **5 pages** — Home, Games, Game Details, Backlog, 404 (React Router)
- 🔍 **Live search** with debounce (500ms), combined with genre filtering and sorting (popularity / name / release date)
- 🎲 **Surprise Me** — pulls a random game from the current results into the quick-view modal
- 🎮 **Backlog** — save games to play later, persisted in `localStorage`
- 📊 **Genre breakdown chart** of your backlog, built with Recharts
- 🖥️ **Minimum system requirements & screenshots** on the details page
- 🕘 **Last search query** — persisted in `sessionStorage`
- 🪟 **Modal windows** — quick-view modal on cards + confirmation modal (rendered with React Portals)
- 🌓 **Dark / Light theme** — saved in `localStorage`, applied via CSS custom properties
- 🌐 **Two languages** — English / ქართული (custom i18n with Context API)
- 📱 **Fully responsive** — works on every device preset in Chrome DevTools (320px and up)
- 🎞️ **Animations** — page transitions, staggered card entrances, hover effects, animated modals, spinner (+ respects `prefers-reduced-motion`)
- ⚡ **Route-level code splitting** — `React.lazy` + `Suspense`

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI library (functional components only) |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client for API requests |
| [Recharts](https://recharts.org/) | Genre breakdown chart on the Backlog page |
| [SASS (SCSS)](https://sass-lang.com/) | CSS preprocessor, 7-1 inspired architecture |
| [FreeToGame API](https://www.freetogame.com/api-doc) | Free-to-play game catalog, details & screenshots — no API key required |

### React features used

- **Hooks:** `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback`, `useRef`
- **Custom hooks:** `useLocalStorage`, `useSessionStorage`, `useDebounce`, `useFetch`
- **Context API:** `ThemeContext`, `LanguageContext`, `BacklogContext`
- **React Portals** for modal windows, **`React.lazy` / `Suspense`** for code splitting, **`memo`** for render optimization

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd game-sense

# 2. Install dependencies
npm install

# 3. Start the dev server (no API key needed)
npm run dev
# → open http://localhost:5173

# 4. Production build (output in /dist)
npm run build
```

## 📁 Project Structure

```
game-sense/
├── public/                  # static assets (favicon, _redirects)
├── src/
│   ├── api/                 # axios instance + FreeToGame API functions
│   │   └── gamesApi.js
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── games/           # GameCard, GameGrid, SearchBar, QuickViewModal
│   │   ├── charts/          # GenreBreakdownChart (Recharts)
│   │   └── ui/               # Modal, Loader, ThemeToggle, LanguageSwitcher, ScrollToTop
│   ├── context/               # Theme, Language, Backlog providers
│   ├── hooks/                 # useLocalStorage, useSessionStorage, useDebounce, useFetch
│   ├── i18n/                   # EN / KA translations
│   ├── pages/                  # HomePage, GamesPage, GameDetailsPage, BacklogPage, NotFoundPage
│   ├── styles/                  # SCSS: abstracts / base / components / pages
│   ├── App.jsx                   # routes
│   └── main.jsx                    # entry, providers
├── index.html
├── package.json
└── vite.config.js
```

## 📸 Screenshots

| Home (dark) | Home (light) |
|---|---|
| ![Home dark](./screenshots/home-dark.png) | ![Home light](./screenshots/home-light.png) |

| Games + search | Game details |
|---|---|
| ![Games](./screenshots/games.png) | ![Details](./screenshots/details.png) |

| Quick-view modal | Backlog + chart | Mobile |
|---|---|---|
| ![Modal](./screenshots/modal.png) | ![Backlog](./screenshots/backlog.png) | ![Mobile](./screenshots/mobile.png) |

## 🌐 API

Data comes from the free, keyless [FreeToGame API](https://www.freetogame.com/api-doc):

- `GET /api/games?sort-by=popularity` — full game catalog (genre, platform, publisher, release date, thumbnail, short description)
- `GET /api/game?id=` — full game details: description, screenshots, minimum system requirements, and a link to play

Genre filtering, search, and sorting are all done client-side over the fetched catalog.

## 📄 License

Educational project. Game data © [FreeToGame](https://www.freetogame.com/).

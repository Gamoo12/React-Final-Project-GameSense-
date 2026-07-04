import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Loader from './components/ui/Loader';

// Route-level code splitting (React.lazy + Suspense)
const HomePage = lazy(() => import('./pages/HomePage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage'));
const BacklogPage = lazy(() => import('./pages/BacklogPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="app__main">
        <Suspense fallback={<Loader fullScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:id" element={<GameDetailsPage />} />
            <Route path="/backlog" element={<BacklogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import { useLenis } from './lib/useLenis';
import { ScrollProgress } from './components/ScrollProgress';
import { ToastProvider } from './components/Toast';

import { Landing } from './pages/Landing';
import { Chapter } from './pages/Chapter';
import { Arc } from './pages/Arc';
import { Journeys } from './pages/Journeys';
import { TierPage } from './pages/TierPage';
import { Hand } from './pages/Hand';
import { Guestbook } from './pages/Guestbook';
import { Letter } from './pages/Letter';
import { Apply } from './pages/Apply';
import { Hold } from './pages/Hold';

/** Scroll-to-top on route change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();
  const location = useLocation();

  return (
    <ToastProvider>
      <ScrollToTop />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/arc" element={<Arc />} />
          <Route path="/journeys" element={<Journeys />} />
          <Route path="/journeys/:slug" element={<TierPage />} />
          <Route path="/hand" element={<Hand />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/hold" element={<Hold />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </ToastProvider>
  );
}

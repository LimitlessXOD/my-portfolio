import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Loader from './components/Loader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import ProjectsHub from './pages/ProjectsHub';
import BlogPost from './pages/BlogPost';
import ChessLanding from './pages/ChessLanding';
import MugenLanding from './pages/MugenLanding';
import useReveal from './hooks/useReveal';
import useScrollRestoration from './hooks/useScrollRestoration';

// ── Page transition wrapper ───────────────────────────────────
function PageTransition({ children }) {
  const location = useLocation();
  const navType = useNavigationType();
  const [phase, setPhase] = useState('idle'); // 'idle' | 'enter'
  const prevKey = useRef(location.key);

  useEffect(() => {
    if (location.key !== prevKey.current) {
      prevKey.current = location.key;
      setPhase('enter');
      const t = setTimeout(() => setPhase('idle'), 500);
      return () => clearTimeout(t);
    }
  }, [location.key]);

  // Choose animation direction: POP = slide in from left, PUSH = slide in from right
  const dir = navType === 'POP' ? 'slideFromLeft' : 'slideFromRight';

  return (
    <div
      key={location.key}
      style={{
        animation: phase === 'enter' ? `${dir} 0.38s cubic-bezier(0.22,1,0.36,1) both` : 'none',
      }}
    >
      {children}
    </div>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useScrollRestoration();
  useReveal(!loading, location.pathname);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <PageTransition>
        <Routes location={location}>
          <Route path="/"                    element={<Home />} />
          <Route path="/projects"            element={<ProjectsHub />} />
          <Route path="/projects/:slug"      element={<ProjectPage />} />
          <Route path="/blog/:slug"          element={<BlogPost />} />
          <Route path="/products/chess"      element={<ChessLanding />} />
          <Route path="/products/mugen"      element={<MugenLanding />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

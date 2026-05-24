import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Loader from './components/Loader';
import RouteFallback from './components/RouteFallback';
import Home from './pages/Home';
import useReveal from './hooks/useReveal';
import useScrollRestoration from './hooks/useScrollRestoration';

const ProjectsHub = lazy(() => import('./pages/ProjectsHub'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ChessLanding = lazy(() => import('./pages/ChessLanding'));
const MugenLanding = lazy(() => import('./pages/MugenLanding'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navType = useNavigationType();
  const isPop = navType === 'POP';

  useScrollRestoration();
  useReveal(!loading, location.pathname, isPop);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Suspense fallback={<RouteFallback />}>
        <div key={location.pathname} className="page-route-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsHub />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/products/chess" element={<ChessLanding />} />
            <Route path="/products/mugen" element={<MugenLanding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
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

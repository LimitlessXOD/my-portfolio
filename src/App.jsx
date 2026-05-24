import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Loader from './components/Loader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import ProjectsHub from './pages/ProjectsHub';
import BlogPost from './pages/BlogPost';
import ChessLanding from './pages/ChessLanding';
import MugenLanding from './pages/MugenLanding';
import useReveal from './hooks/useReveal';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Trigger reveal after initial load AND on every route change
  useReveal(!loading, location.pathname);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsHub />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/products/chess" element={<ChessLanding />} />
        <Route path="/products/mugen" element={<MugenLanding />} />
      </Routes>
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

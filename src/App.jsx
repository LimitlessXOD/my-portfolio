import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Loader from './components/Loader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import useReveal from './hooks/useReveal';

function AppContent() {
  const [loading, setLoading] = useState(true);
  useReveal(!loading);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
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

import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(isDark) {
  const theme = isDark ? 'dark' : 'light';
  // Apply to BOTH html and body so every element on the page gets the variables
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('mugensoft-theme');
    return saved ? saved === 'dark' : true;
  });

  // Apply theme on first render and whenever dark changes
  useEffect(() => {
    applyTheme(dark);
  }, [dark]);

  const toggle = () => {
    setDark(d => {
      const next = !d;
      localStorage.setItem('mugensoft-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

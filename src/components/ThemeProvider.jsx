import React, { useState, createContext, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Read localStorage synchronously on first render — no flash
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('mugensoft-theme');
    return saved ? saved === 'dark' : true;
  });

  const toggle = () => {
    setDark(d => {
      const next = !d;
      localStorage.setItem('mugensoft-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div data-theme={dark ? 'dark' : 'light'}>{children}</div>
    </ThemeContext.Provider>
  );
}

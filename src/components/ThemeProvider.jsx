import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('mugensoft-theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  const toggle = () => {
    setDark(d => {
      localStorage.setItem('mugensoft-theme', !d ? 'dark' : 'light');
      return !d;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div data-theme={dark ? 'dark' : 'light'}>{children}</div>
    </ThemeContext.Provider>
  );
}

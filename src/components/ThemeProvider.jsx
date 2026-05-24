import { useState } from 'react';
import { ThemeContext } from '../context/themeContext';

export function ThemeProvider({ children }) {
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

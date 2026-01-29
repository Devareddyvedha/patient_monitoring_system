import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const theme = {
    dark,
    toggle: () => setDark(!dark),
    bg: dark ? "#121212" : "#f4f6f8",
    card: dark ? "#1e1e1e" : "#ffffff",
    text: dark ? "#ffffff" : "#000000"
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

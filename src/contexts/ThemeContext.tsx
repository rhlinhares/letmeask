import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  // var toggle = document.getElementById("theme-toggle");

  // var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  // if (storedTheme)
  //     document.documentElement.setAttribute('data-theme', storedTheme)

  // toggle.onclick = function() {
  //     var currentTheme = document.documentElement.getAttribute("data-theme");
  //     var targetTheme = "light";

  //     if (currentTheme === "light") {
  //         targetTheme = "dark";
  //     }

  //     document.documentElement.setAttribute('data-theme', targetTheme)
  //     localStorage.setItem('theme', targetTheme);
  // };

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme');

    return (storagedTheme ?? 'light') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>{props.children}</ThemeContext.Provider>;
}

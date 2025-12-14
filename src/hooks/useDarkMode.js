import { useEffect, useState } from "react";


export default function useDarkMode(key = "collab_dark") {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) return saved === "true";
      // default to match system
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, isDark ? "true" : "false");
    } catch (e) {}
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark, key]);

  return [isDark, setIsDark];
}

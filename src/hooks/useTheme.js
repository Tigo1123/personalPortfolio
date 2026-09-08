import { useEffect, useState } from "react";
export default function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#0E1715" : "#F7F7F2";
  }, [theme]);
  useEffect(() => {
    const preference = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      try {
        if (["light", "dark"].includes(localStorage.getItem("theme"))) return;
      } catch {
        /* Storage may be unavailable. */
      }
      setTheme(preference.matches ? "dark" : "light");
    };
    const sync = (event) => {
      if (event.key === "theme") {
        if (["light", "dark"].includes(event.newValue))
          setTheme(event.newValue);
        else update();
      }
    };
    preference.addEventListener("change", update);
    window.addEventListener("storage", sync);
    return () => {
      preference.removeEventListener("change", update);
      window.removeEventListener("storage", sync);
    };
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Toggle still works without storage. */
    }
    setTheme(next);
  }
  return { theme, toggleTheme };
}

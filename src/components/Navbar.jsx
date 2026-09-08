import { useEffect, useRef, useState } from "react";
import { navigation } from "../data/profile";
import useActiveSection from "../hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import Icon from "./Icon";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const active = useActiveSection();
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outside = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);
  function selectSection(event) {
    setOpen(false);
    document
      .querySelector(event.currentTarget.hash)
      ?.focus({ preventScroll: true });
  }
  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="Tageldin Gasmalla, home">
          <span className="brand-mark">
            TG<span>.</span>
          </span>
          <span className="brand-name">Tageldin Gasmalla</span>
        </a>
        <nav className="desktop-nav" aria-label="Main">
          {navigation.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              aria-current={
                active === label.toLowerCase() ? "location" : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <MobileMenu open={open} active={active} onClose={selectSection} />
    </header>
  );
}

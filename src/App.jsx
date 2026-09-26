import React, { useEffect, useState } from "react";
import Icon from "./components/Icon";
import Projects from "./sections/Projects";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import { About } from "./sections/About";

const links = [["About", "about"], ["Projects", "projects"], ["Stack", "skills"], ["Certificates", "certificates"], ["Contact", "contact"]];

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header"><a className="wordmark" href="#home" aria-label="Tageldin Gasmalla, home"><img className="wordmark-photo" src="/assets/profile/tageldin-gasmalla.webp" alt=""/><span>TAGELDIN<br/>GASMALLA</span></a>
    <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Main navigation">{links.map(([name, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>
    <div className="header-actions"><a className="header-cta" href="#contact">Let’s talk <Icon name="arrow" size={14}/></a><button className="icon-button theme-button" onClick={onThemeToggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}><Icon name={theme === "dark" ? "sun" : "moon"} size={17}/></button><button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}><Icon name={menuOpen ? "close" : "menu"}/></button></div>
  </header>;
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-content">
    <div className="hero-copy">
      <div className="hero-kicker"><span className="live-dot"/> SOFTWARE ENGINEERING STUDENT</div>
      <p className="hero-identity"><strong>Tageldin Gasmalla</strong><span>Full Stack Developer</span></p>
      <h1><span>Building things</span><span>for the <em>everyday.</em></span></h1>
      <p className="hero-intro">I build practical web applications and thoughtful digital products, working across interfaces, APIs and data.</p>
      <div className="hero-actions"><a className="button button--lime" href="#projects">Explore my work <Icon name="arrow" size={16}/></a><a className="button button--outline" href="#contact">Get in touch <span>↗</span></a></div>
      <a className="book-call-pill" href="mailto:al.taj.gsm@gmail.com?subject=Arrange%20a%20call" aria-label="Book a call with me by email">
        <img src="/assets/profile/tageldin-gasmalla.webp" alt="" />
        <span>Book a call with me</span>
        <Icon name="arrow" size={15}/>
      </a>
    </div>
    <div className="hero-photo-wrap"><span className="photo-ring photo-ring--one"/><span className="photo-ring photo-ring--two"/><img className="hero-photo" src="/assets/profile/tageldin-gasmalla.webp" alt="Portrait of Tageldin Gasmalla" fetchPriority="high"/><span className="photo-caption"><span>FOCUSED ON</span><b>USEFUL SOFTWARE</b></span><span className="hero-spark" aria-hidden="true">✳</span></div>
    <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><Icon name="chevron" size={15}/></a>
    <div className="hero-side-note">SELECTED WORK<br/>AND A FEW THOUGHTS</div>
  </div><div className="hero-bottom"><span>INDEPENDENT DEVELOPER</span><span>OPEN TO WHAT’S NEXT <i>↘</i></span><span>2026 — PORTFOLIO</span></div></section>;
}

function Footer() {
  return <footer className="site-footer"><a className="footer-name" href="#home">Tageldin Gasmalla<span>Full Stack Developer</span></a><span className="copyright">© {new Date().getFullYear()} Tageldin Gasmalla</span><div className="footer-social"><a href="https://github.com/Tigo1123" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github"/></a><a href="https://www.linkedin.com/in/tageldin-gasmalla-6685a2202/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin"/></a><a href="mailto:al.taj.gsm@gmail.com" aria-label="Email"><Icon name="mail"/></a><a className="back-top" href="#home">BACK TO TOP ↑</a></div></footer>;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("tageldin-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"); } catch { return "dark"; }
  });
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem("tageldin-theme", theme); } catch {} }, [theme]);
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { targets.forEach(el => el.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <><Header theme={theme} onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}/><main><Hero/><About/><Projects/><Certificates/><Contact/></main><Footer/></>;
}

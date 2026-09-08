import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certificates from "./sections/Certificates";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";
import useScrollReveal from "./hooks/useScrollReveal";
export default function App() {
  useScrollReveal();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex="-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

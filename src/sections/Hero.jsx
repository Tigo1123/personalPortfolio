import { assetUrl, resumeUrl } from "../data/profile";
import SocialLinks from "../components/SocialLinks";
import Icon from "../components/Icon";
export default function Hero() {
  return (
    <section
      className="container hero"
      id="home"
      tabIndex="-1"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow availability">
          <span className="status-dot" /> Open to opportunities
        </p>
        <p className="hero-hello">Hello, I’m</p>
        <h1 id="hero-title">
          Tageldin
          <br />
          Gasmalla<span>.</span>
        </h1>
        <p className="hero-role">
          Software Engineering Student
          <br />
          &amp; Full-Stack Developer
        </p>
        <p className="hero-description">
          I build thoughtful web applications that turn everyday problems into
          practical solutions — from responsive interfaces to the backend behind
          them.
        </p>
        <p className="hero-stack">
          React <span>/</span> JavaScript <span>/</span> Node.js <span>/</span>{" "}
          SQL
        </p>
        <div className="button-row">
          <a className="button primary" href="#projects">
            View Projects <Icon name="arrow" />
          </a>
          <a
            className="button"
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume<span className="sr-only"> (opens in a new tab)</span>
            <Icon name="external" />
          </a>
        </div>
        <SocialLinks />
      </div>
      <figure className="hero-portrait">
        <img
          src={assetUrl("images/2.jpeg")}
          alt="Tageldin Gasmalla seated in a collaborative workspace"
          width="750"
          height="1000"
          fetchPriority="high"
        />
        <figcaption>
          <span>Based in Kigali, Rwanda</span>
          <span className="mono">LEARN. BUILD. IMPROVE.</span>
        </figcaption>
      </figure>
      <div className="hero-bottom">
        <span>Curious by nature. Engineer in the making.</span>
        <a href="#about">Get to know me ↓</a>
      </div>
    </section>
  );
}

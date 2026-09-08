import SectionHeading from "../components/SectionHeading";
import { assetUrl } from "../data/profile";
export default function About() {
  return (
    <section className="section container" id="about" tabIndex="-1" data-reveal>
      <SectionHeading
        number="01"
        label="About me"
        title="A thoughtful approach to building software."
      />
      <div className="about-layout">
        <img
          className="about-photo"
          src={assetUrl("images/1.jpeg")}
          alt="Portrait of Tageldin Gasmalla"
          width="750"
          height="1000"
          loading="lazy"
        />
        <div className="about-copy">
          <p>
            I’m a Software Engineering student at UNILAK in Kigali, Rwanda,
            developing my skills across frontend and backend development. I
            enjoy turning real-world problems into useful applications, with
            equal care for how they work and how people use them.
          </p>
          <p>
            Through self-directed projects, I’m learning to build with clean
            code, thoughtful database design, and maintainable architecture. I
            value collaboration and continuous learning, and I’m working toward
            becoming a software engineer who builds reliable, meaningful
            software. Outside my projects, I explore AI, coding challenges, and
            open-source ideas.
          </p>
          <dl className="info-grid">
            <div>
              <dt>Education</dt>
              <dd>
                Software Engineering · UNILAK
                <br />
                2024 – Present
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Full-stack development &amp; AI</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Kigali, Rwanda</dd>
            </div>
            <div>
              <dt>Current goal</dt>
              <dd>Grow through practical work and collaboration</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

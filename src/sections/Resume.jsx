import SectionHeading from "../components/SectionHeading";
import { resumeUrl } from "../data/profile";
import Icon from "../components/Icon";
export default function Resume() {
  return (
    <section
      className="section container resume"
      id="resume"
      tabIndex="-1"
      data-reveal
    >
      <SectionHeading number="05" label="Resume" title="The journey so far.">
        Software Engineering studies, self-directed development, and a
        commitment to improving with every project.
      </SectionHeading>
      <div className="resume-panel">
        <div>
          <p className="eyebrow">2024 — Present</p>
          <h3>Building a foundation in software engineering</h3>
          <p>
            Bachelor of Software Engineering studies at UNILAK, alongside
            hands-on full-stack projects. Explore my education, skills, and
            project experience in the full resume.
          </p>
          <span className="muted mono">PDF · 2 pages</span>
        </div>
        <div className="resume-actions">
          <a
            className="button primary"
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume<span className="sr-only"> (opens in a new tab)</span>
            <Icon name="external" />
          </a>
          <a className="button" href={resumeUrl} download>
            Download Resume
            <Icon name="download" />
          </a>
        </div>
      </div>
    </section>
  );
}

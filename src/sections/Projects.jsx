import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
export default function Projects() {
  return (
    <section
      className="section container"
      id="projects"
      tabIndex="-1"
      data-reveal
    >
      <SectionHeading
        number="03"
        label="Selected work"
        title="Practical software. Growing ambition."
      >
        From connected clinic workflows to student productivity and interactive
        games. My strongest work comes first.
      </SectionHeading>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

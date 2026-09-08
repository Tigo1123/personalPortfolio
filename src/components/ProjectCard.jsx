import Icon from "./Icon";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project, index }) {
  return (
    <article
      className={`project-card ${project.featured ? "featured" : ""}`}
      aria-labelledby={`project-${project.id}`}
      data-project-id={project.id}
    >
      <ProjectVisual project={project} index={index} />
      <div className="card-body">
        <div className="card-meta">
          <span>
            {project.category}
            {project.year && <> · {project.year}</>}
          </span>
          <span className="status">{project.status}</span>
        </div>
        {project.featured && (
          <p className="project-featured-label">Featured project</p>
        )}
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        <p>{project.description}</p>
        {project.featured && project.highlights?.length > 0 && (
          <ul
            className="project-highlights"
            aria-label={`${project.title} highlights`}
          >
            {project.highlights.slice(0, 4).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
        <ul className="tags" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.liveUrl && (
            <a
              className="project-demo-link"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo (opens in a new tab)`}
            >
              Live Demo <Icon name="external" width="16" height="16" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub (opens in a new tab)`}
            >
              GitHub <Icon name="external" width="16" height="16" />
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="muted">Project links not yet available</span>
          )}
        </div>
      </div>
    </article>
  );
}

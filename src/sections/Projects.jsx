import React from "react";
import { projects } from "../data/projects";
import Icon from "../components/Icon";
import SectionHeading from "../components/SectionHeading";

function ProjectCard({ project, index }) {
  const developing = project.status !== "Live";
  return <article className={`project-card ${index === 0 ? "project-card--feature" : ""} ${developing ? "project-card--developing" : ""} reveal`} style={{ "--delay": `${index * 70}ms` }}>
    <div className="project-card__visual">
      {project.image ? <img src={project.image} alt={project.alt} loading="lazy" /> : <div className="project-concept" aria-hidden="true"><span className="concept-orbit"/><span className="concept-name">{project.name.split(" ").map(word => word[0]).join("")}</span><span className="concept-note">IN PROGRESS</span></div>}
      <span className={`status ${developing ? "status--dev" : ""}`}><i />{project.status}</span>
    </div>
    <div className="project-card__content">
      <div className="project-card__top"><span className="project-number">{project.number} / {project.category}</span>{project.demo && <a className="round-link" href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live demo`}><Icon name="arrow" /></a>}</div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {project.technologies && <ul className="tag-list" aria-label="Technologies">{project.technologies.map(tag => <li key={tag}>{tag}</li>)}</ul>}
      <div className="project-card__links">
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">View Live <Icon name="arrow" size={15}/></a>}
        {project.repo && <a className="project-github" href={project.repo} target="_blank" rel="noreferrer"><Icon name="github" size={15}/> GitHub <Icon name="arrow" size={13}/></a>}
        {developing && <span className="developing-label">Currently in development</span>}
      </div>
    </div>
  </article>;
}

export default function Projects() {
  return <section className="section projects-section" id="projects">
    <SectionHeading index="02" eyebrow="SELECTED WORK" title={<>Made to be <em>useful.</em></>} intro="A selection of live applications and ideas taking shape." />
    <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index}/>)}</div>
  </section>;
}

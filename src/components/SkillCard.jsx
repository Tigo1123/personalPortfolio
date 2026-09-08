export default function SkillCard({ skill, index }) {
  return (
    <article className="skill-card">
      <span className="card-index">0{index + 1}</span>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <ul className="tags">
        {skill.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </article>
  );
}

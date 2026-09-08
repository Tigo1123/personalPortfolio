import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";
import { skills } from "../data/skills";
export default function Skills() {
  return (
    <section className="section tinted" id="skills" tabIndex="-1" data-reveal>
      <div className="container">
        <SectionHeading
          number="02"
          label="My toolkit"
          title="From interface to database."
        >
          Technologies I use and continue to develop through coursework and
          hands-on projects.
        </SectionHeading>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import SectionHeading from "../components/SectionHeading";
import { skillGroups } from "../data/skills";

export function About() {
  return <section className="section about-section" id="about">
    <SectionHeading index="01" eyebrow="A LITTLE ABOUT ME" title={<>Thoughtful code.<br/><em>Useful outcomes.</em></>} />
    <div className="about-grid"><p className="about-lead reveal">I’m a Software Engineering student and Full Stack Developer interested in making practical web applications and digital products.</p><div className="about-copy reveal"><p>I enjoy working across modern web interfaces, APIs, and databases. Each project is a chance to sharpen my engineering skills and make something useful for real people.</p><a href="#contact" className="text-link">A little more about working together <span>↗</span></a></div></div>
    <div className="skills-wrap" id="skills"><div className="skills-intro"><span className="section-index"><i>03</i> / TOOLS I USE</span><p>A growing toolkit for ideas, interfaces and the systems behind them.</p></div><div className="skills-groups">{skillGroups.map(group => <div className="skill-group reveal" key={group.name}><h3>{group.name}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></div>
  </section>;
}

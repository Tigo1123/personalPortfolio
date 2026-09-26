import React from "react";

export default function SectionHeading({ index, eyebrow, title, intro }) {
  return <div className="section-heading reveal">
    <span className="section-index"><i>{index}</i> / {eyebrow}</span>
    <div className="section-heading__body"><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
  </div>;
}

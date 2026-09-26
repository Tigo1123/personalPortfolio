import React, { useEffect, useState } from "react";
import { certificates } from "../data/certificates";
import Icon from "../components/Icon";
import SectionHeading from "../components/SectionHeading";

export default function Certificates() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = event => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);
  return <section className="section certificates-section" id="certificates">
    <SectionHeading index="04" eyebrow="LEARNING" title={<>Built on <em>curiosity.</em></>} intro="Courses and programs I’ve completed along the way." />
    <div className="certificate-list">{certificates.map((cert, i) => <button className="certificate-row reveal" style={{ "--delay": `${i * 60}ms` }} key={cert.title} onClick={() => setActive(cert)}>
      <span className="certificate-preview"><img src={cert.image} alt={cert.alt} loading="lazy" /></span>
      <span className="certificate-info"><span className="certificate-issuer">{cert.issuer} <i>·</i> {cert.date}</span><span className="certificate-title">{cert.title}</span>{cert.detail && <span className="certificate-detail">{cert.detail}</span>}</span>
      <span className="certificate-action">View certificate <Icon name="arrow" size={15}/></span>
    </button>)}</div>
    {active && <div className="certificate-modal" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setActive(null); }}>
      <div className="certificate-modal__panel" role="dialog" aria-modal="true" aria-label={active.title}>
        <div className="certificate-modal__head"><div><span>{active.issuer} · {active.date}</span><h3>{active.title}</h3></div><button className="icon-button" onClick={() => setActive(null)} aria-label="Close certificate"><Icon name="close"/></button></div>
        <img src={active.image} alt={active.alt}/>
      </div>
    </div>}
  </section>;
}

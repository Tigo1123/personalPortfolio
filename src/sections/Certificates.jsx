import SectionHeading from "../components/SectionHeading";
import CertificateCard from "../components/CertificateCard";
import { certificates } from "../data/certificates";
export default function Certificates() {
  return (
    <section
      className="section tinted"
      id="certificates"
      tabIndex="-1"
      data-reveal
    >
      <div className="container">
        <SectionHeading
          number="04"
          label="Continuous learning"
          title="Investing in the fundamentals."
        >
          Learning that supports my technical growth and the way I work with
          others.
        </SectionHeading>
        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </div>
    </section>
  );
}

import Icon from "./Icon";
export default function CertificateCard({ certificate }) {
  return (
    <article className="certificate-card">
      <a
        className="certificate-preview"
        href={certificate.image}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${certificate.title} certificate, opens in a new tab`}
      >
        <img
          src={certificate.image}
          alt={`${certificate.title} certificate awarded to Tageldin Gasmalla by ${certificate.issuer}`}
          width={certificate.width}
          height={certificate.height}
          loading="lazy"
        />
      </a>
      <div className="card-body">
        <p className="eyebrow">{certificate.category}</p>
        <h3>{certificate.title}</h3>
        <p className="issuer">{certificate.issuer}</p>
        <p>{certificate.description}</p>
        <div className="project-links">
          <a href={certificate.image} target="_blank" rel="noopener noreferrer">
            View certificate
            <span className="sr-only"> (opens in a new tab)</span>
            <Icon name="external" width="16" height="16" />
          </a>
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Credential <Icon name="external" width="16" height="16" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

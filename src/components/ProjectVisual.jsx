import { useState } from "react";
import { assetUrl } from "../data/profile";

export default function ProjectVisual({ project, index }) {
  const [failedImage, setFailedImage] = useState(null);
  const imageUrl = project.image
    ? /^https?:\/\//.test(project.image)
      ? project.image
      : assetUrl(project.image.replace(/^\//, ""))
    : null;
  const showImage = imageUrl && failedImage !== imageUrl;

  return (
    <div className="project-preview">
      <div className="project-window-bar" aria-hidden="true">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{project.shortTitle || project.title}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      {showImage ? (
        <img
          className="project-image"
          src={imageUrl}
          alt={`${project.title} application screenshot`}
          width="1600"
          height="900"
          loading="lazy"
          decoding="async"
          onError={() => setFailedImage(imageUrl)}
        />
      ) : (
        <div className="project-visual" aria-hidden="true">
          <span className="visual-label">{project.category}</span>
          <span className="visual-title">
            {project.shortTitle || project.title}
            <span>.</span>
          </span>
          <span className="visual-line">
            Project overview · Preview coming soon
          </span>
        </div>
      )}
    </div>
  );
}

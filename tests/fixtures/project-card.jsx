// Isolated test content; not an entry in the production portfolio build.
import { createRoot } from "react-dom/client";
import ProjectCard from "../../src/components/ProjectCard";
import "../../src/styles/global.css";
import "../../src/styles/components.css";

const mode = new URLSearchParams(location.search).get("mode");
const project = {
  id: "fixture",
  title: "Component fixture",
  category: "Test fixture",
  description: "Isolated rendering and optional-field checks.",
  technologies: ["A deliberately long technology badge for layout validation"],
  status: "In Development",
  featured: true,
  // Existing portrait is only a geometry fixture, never a project screenshot.
  image:
    mode === "image"
      ? "/images/2.jpeg"
      : mode === "broken-image"
        ? "/projects/missing-test-image.webp"
        : null,
  githubUrl: mode === "github" ? "https://example.com/repository" : null,
  liveUrl: mode === "live" ? "https://example.com/demo" : null,
};
createRoot(document.getElementById("root")).render(
  <div className="container projects-grid">
    <ProjectCard project={project} index={0} />
  </div>,
);

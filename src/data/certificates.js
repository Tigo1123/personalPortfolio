import { assetUrl } from "./profile";
export const certificates = [
  {
    id: "javascript",
    title: "The Complete JavaScript Course 2025: From Zero to Expert!",
    issuer: "Udemy · Jonas Schmedtmann",
    description:
      "JavaScript fundamentals, modern web development, and interactive applications.",
    image: assetUrl("my_certification/js.png"),
    width: 1600,
    height: 1190,
    credentialUrl:
      "https://www.udemy.com/certificate/UC-bfdb23eb-8adb-4915-ac95-77f42ed85140/",
    category: "JavaScript",
  },
  {
    id: "frontend",
    title: "Frontend Development using React",
    issuer: "Board Infinity · Coursera",
    description:
      "Frontend development, web technologies, and building React user interfaces.",
    image: assetUrl("my_certification/frontend.png"),
    width: 917,
    height: 710,
    credentialUrl: null,
    category: "Web development",
  },
  {
    id: "python",
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan · Coursera",
    description:
      "Programming concepts, Python fundamentals, and problem solving.",
    image: assetUrl("my_certification/python.png"),
    width: 917,
    height: 710,
    credentialUrl: null,
    category: "Python",
  },
  {
    id: "foundations",
    title: "Professional Foundations",
    issuer: "ALX",
    description: "Professional skills, collaboration, and workplace readiness.",
    image: assetUrl("my_certification/profissonal.png"),
    width: 1280,
    height: 720,
    credentialUrl: null,
    category: "Professional development",
  },
];

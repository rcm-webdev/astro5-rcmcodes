import type { Props as ProjectProp } from "../components/projects/props";

export const PROJECTS: ProjectProp[] = [
  {
    title: "Purestyle",
    type: "Front-End",
    projectUrl: "https://purestylesalon.netlify.app/",
    description:
      "I worked as a front-end developer on this project. It is a salon website with features like viewing services and contact form.",
    tags: ["HTML/CSS", "Bootstrap", "Netlify"],
    logo: "/logos/purestyle.webp",
  },
  {
    title: "qrDev",
    type: "Full-Stack",
    projectUrl: "/",
    description:
      " A full-stack web app for developers to create and share their portfolio using QR codes. It has features like authentication, image upload and QR code generation.",
    tags: ["MongoDB", "Express", "Cloudinary", "Node", "Tailwind", "EJS"],
    logo: "/logos/coming_soon.webp",
  },
  {
    title: "qrBuddy",
    type: "Full-Stack",
    projectUrl: "https://github.com/rcm-webdev/qr-buddy",
    description:
      "A full-stack inventory management system that helps you organize storage boxes with QR codes.",
    tags: ["MongoDB", "Express", "Node", "EJS", "API"],
    logo: "/logos/coming_soon.webp",
  },
];

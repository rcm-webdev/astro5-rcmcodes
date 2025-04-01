import type { Props as ProjectProp } from "../components/projects/props";

export const PROJECTS: ProjectProp[] = [
  {
    title: "TransposeRx",
    type: "Front-End",
    projectUrl: "https://transposerx.netlify.app/",
    description:
      "Designed and developed a lightweight web application to help ophthalmic technicians instantly transpose patients' glasses prescriptions.",
    tags: ["React", "DaisyUI"],
    logo: "/logos/transposerx.gif",
  },
  {
    title: "Technician's Bootcamp",
    type: "Full-Stack",
    projectUrl: "https://github.com/rcm-webdev/",
    description:
      "Building a full-stack LMS for ophthalmic technicians. Features include authentication, image upload and note taking. Future updates: AI notes and quiz functionality.",
    tags: ["Next.js", "MongoDB", "Cloudinary", "Auth.js"],
    logo: "/logos/coming_soon.webp",
  },
  {
    title: "IntelFlow",
    type: "Full-Stack",
    projectUrl: "https://github.com/rcm-webdev/",
    description:
      "A no-code visual interface that lets users create a pipeline of AI tasks (like image input → object detection → alert) using a drag-and-drop interface. Workflows can be saved, tested, and edited.",
    tags: ["React", "MongoDB", "Express", "Cloudinary", "HuggingFace API"],
    logo: "/logos/coming_soon.webp",
  },
];

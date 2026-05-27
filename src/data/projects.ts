import type { Props as ProjectProp } from "../components/projects/props";

export const PROJECTS: ProjectProp[] = [
  {
    title: "Kit Tracker",
    type: "Full-Stack",
    projectUrl: "https://kittracker-production.up.railway.app/",
    description:
      "Production inventory tool for ophthalmic procedure supplies with QR-labeled bins, camera scanning, and full-text search replacing tribal knowledge and repeated staff interruptions.",
    tags: ["Next.js", "TypeScript", "Railway", "Clinical Ops"],
    logo: "/logos/sec.webp",
  },
  {
    title: "TransposeRx",
    type: "Full-Stack",
    projectUrl: "https://transposerx-production.up.railway.app/",
    description:
      "Production LMS for ophthalmic technician onboarding with structured lessons, quizzes, progress tracking, and MDX-based curriculum that scales without schema migrations.",
    tags: ["React", "MDX", "Railway"],
    logo: "/logos/transposerx.gif",
  },
  {
    title: "Built by NIB",
    type: "Full-Stack",
    projectUrl: "https://builtbynib.com/",
    description:
      "First digital platform for Northwestern Integrity Builders: online lead generation for a word-of-mouth construction business, with a quoting system in development for automated PDF estimates.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    logo: "/logos/twin_rocks-1.webp",
  },
  {
    title: "MMC Communications",
    type: "Front-End",
    projectUrl: "https://mmccommunications.netlify.app/",
    description:
      "Production marketing site built for trust, discoverability, and inbound inquiries; digital on-site security audit tool in development to replace paper clipboard checklists.",
    tags: ["Astro", "TypeScript", "Tailwind CSS"],
    logo: "/logos/twin_rocks-1.webp",
  },
];

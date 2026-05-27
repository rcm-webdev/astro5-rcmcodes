import type { Props as ExperienceProp } from "../components/experience/props";

export const EXPERIENCE: ExperienceProp[] = [
  {
    dates: "September 2022 to Present",
    title: "Full Stack Software Engineer, Technical Lead",
    company: "Twin Rocks Software Studio",
    companyUrl: "https://rcmcodes.com/partner",
    description:
      "Reduce client dependency on fragmented manual workflows by building centralized operational tooling, automation systems, and custom web platforms tailored to day-to-day business operations.",
    highlights: [
      "Northwestern Integrity Builders (builtbynib.com): launched the company's first digital platform, turning a word-of-mouth construction business into an online lead-generation pipeline; building a full-stack quoting platform that calculates estimates from material, labor, and time inputs and outputs formatted PDF quotes.",
      "MMC Communications: designed and deployed a production website optimized for trust, discoverability, and inbound inquiries; replacing paper clipboard checklists with a digital on-site audit tool for multi-building security inspections (in development).",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Railway",
      "Remote",
    ],
    logo: "/logos/twin_rocks-1.webp",
  },
  {
    dates: "August 2022 to Present",
    title: "Clinical Operations, Internal Tooling Builder",
    company: "Spokane Eye Clinic",
    companyUrl: "https://www.spokaneeye.com/",
    description:
      "Build production internal tools that streamline clinical onboarding, training, and ophthalmic supply workflows.",
    highlights: [
      "TransposeRx: replaced inconsistent verbal training with a production LMS featuring structured lessons, quizzes, and progress tracking; designed MDX-based lesson architecture so new modules ship without schema migrations.",
      "Kit Tracker: centralized procedure supply tracking with QR-labeled bins, camera scanning, and full-text search, deployed and actively used in clinical operations.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "MDX",
      "Netlify",
    ],
    logo: "/logos/sec.webp",
  },
  {
    dates: "August 2018 to August 2022",
    title: "Medical Scribe",
    company: "Idaho Urology Institute",
    companyUrl: "https://www.idurology.com/",
    description:
      "Replaced inconsistent verbal-only onboarding with the clinic's first structured scribe training system, creating a repeatable process that remained after departure.",
    highlights: [
      "Documented workflows, expectations, and operational standards that improved onboarding consistency and long-term knowledge transfer.",
    ],
    technologies: [
      "Clinical Operations",
      "Training Systems",
      "Documentation",
    ],
  },
];

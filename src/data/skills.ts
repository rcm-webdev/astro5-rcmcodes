export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    category: "Front-End",
    items: ["React", "Next.js", "Astro", "Vite", "Tailwind CSS", "TanStack Query"],
  },
  {
    category: "Back-End",
    items: ["Node.js", "Express", "Hono", "FastAPI"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Docker", "Railway", "Vercel", "Netlify", "Render", "GitHub Actions"],
  },
  {
    category: "AI-Augmented Engineering",
    items: ["Cursor", "Claude Code", "OpenAI API"],
  },
  {
    category: "Other",
    items: [
      "Workflow Automation",
      "Auth Flows",
      "Schema Design",
      "API Design",
      "Internal Tooling",
    ],
  },
];

export interface Skill {
  name: string;
  /** Simple Icons slug — https://simpleicons.org */
  simpleIconSlug?: string;
}

export interface SkillGroup {
  category: string;
  items: Skill[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", simpleIconSlug: "typescript" },
      { name: "JavaScript", simpleIconSlug: "javascript" },
      { name: "Python", simpleIconSlug: "python" },
    ],
  },
  {
    category: "Front-End",
    items: [
      { name: "React", simpleIconSlug: "react" },
      { name: "Next.js", simpleIconSlug: "nextdotjs" },
      { name: "Astro", simpleIconSlug: "astro" },
      { name: "Vite", simpleIconSlug: "vite" },
      { name: "Tailwind CSS", simpleIconSlug: "tailwindcss" },
      { name: "TanStack Query", simpleIconSlug: "tanstack" },
    ],
  },
  {
    category: "Back-End",
    items: [
      { name: "Node.js", simpleIconSlug: "nodedotjs" },
      { name: "Express", simpleIconSlug: "express" },
      { name: "Hono", simpleIconSlug: "hono" },
      { name: "FastAPI", simpleIconSlug: "fastapi" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", simpleIconSlug: "postgresql" },
      { name: "MySQL", simpleIconSlug: "mysql" },
      { name: "MongoDB", simpleIconSlug: "mongodb" },
      { name: "Prisma", simpleIconSlug: "prisma" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Docker", simpleIconSlug: "docker" },
      { name: "Railway", simpleIconSlug: "railway" },
      { name: "Vercel", simpleIconSlug: "vercel" },
      { name: "Netlify", simpleIconSlug: "netlify" },
      { name: "Render", simpleIconSlug: "render" },
      { name: "GitHub Actions", simpleIconSlug: "githubactions" },
    ],
  },
  {
    category: "AI-Augmented Engineering",
    items: [
      { name: "Cursor", simpleIconSlug: "cursor" },
      { name: "Claude Code", simpleIconSlug: "claude" },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Workflow Automation" },
      { name: "Auth Flows" },
      { name: "Schema Design" },
      { name: "API Design" },
      { name: "Internal Tooling" },
    ],
  },
];

/** Flat list for the skill hub carousel — only skills with a Simple Icons slug. */
export const CAROUSEL_SKILLS: Skill[] = SKILLS.flatMap((group) => group.items).filter(
  (s) => s.simpleIconSlug != null,
);

function simpleIconUrl(slug: string, color = "737373"): string {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export function getSkillIconUrl(skill: Skill, color = "737373"): string | undefined {
  return skill.simpleIconSlug ? simpleIconUrl(skill.simpleIconSlug, color) : undefined;
}

import { BRAND } from "./brand";
import { PROFILE } from "./profile";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imagePath?: string;
  imageAlt?: string;
};

/** Sidebar and marketing surfaces — SMB-focused copy, separate from portfolio PROFILE.intro */
export const TEAM: TeamMember[] = [
  {
    name: PROFILE.displayName,
    role: `Founder · Full Stack Engineer · Technical Lead at ${BRAND.studioName}`,
    bio: "Roberto brings full-stack engineering and operational context from shipping tools owners and staff use every day, not demos that never launch.",
    imagePath: PROFILE.imagePath,
    imageAlt: PROFILE.imageAlt,
  },
];

export const PARTNER_EXPECTATIONS = [
  "Free initial scope conversation",
  "Written proposal with timeline and pricing",
  "Regular progress updates during build",
  "Documented code and post-launch handoff",
] as const;

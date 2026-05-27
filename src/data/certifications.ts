export interface CertificationEntry {
  dates: string;
  name: string;
  issuer: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    dates: "May 2026",
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    credentialUrl: "https://www.anthropic.com/",
  },
  {
    dates: "May 2026",
    name: "AI Fluency for Small Businesses",
    issuer: "Anthropic",
    credentialUrl: "https://www.anthropic.com/",
  },
];

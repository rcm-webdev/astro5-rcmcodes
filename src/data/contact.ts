export const CONTACT = {
  email: "rcmcodes@gmail.com",
  mailtoSubject: "Hello from rcmcodes.com",
  emailCtaLabel: "Email me",
  coffeeChatLabel: "Book a coffee chat",
  coffeeChatAriaLabel: "Book a 30-minute coffee chat",
} as const;

/** Link hub row labels (/links) — keep concise for mobile */
export const LINK_LABELS = {
  portfolio: "View my work",
  partner: "Software & websites",
  linkedIn: "Connect on LinkedIn",
  backHome: "Back to home",
} as const;

/** Homepage and light cross-link copy */
export const NAV_COPY = {
  allLinks: "All links",
  workWithStudio: "Work with Twin Rocks",
} as const;

/** Subtle in-content text links (no emerald) */
export const TEXT_LINK_CLASS =
  "text-neutral-400 hover:text-neutral-100 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500/50";

export const HERO_CTA_CLASS =
  "group inline-flex items-center gap-2 rounded-md border border-neutral-700/60 bg-neutral-400/10 px-3.5 py-2.5 text-sm font-semibold text-neutral-100 shadow backdrop-blur-xl transition-all hover:border-neutral-500/60 hover:bg-neutral-400/15 hover:text-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500/50";

/** Full-width glass row for /links and similar hub pages */
export const LINK_ROW_CLASS =
  "group relative z-30 flex w-full items-center gap-4 rounded-xl border border-neutral-700/60 bg-neutral-400/10 p-4 text-left font-medium text-neutral-100 shadow backdrop-blur-xl transition-all hover:border-neutral-500/60 hover:bg-neutral-400/15 hover:text-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500/50";

export const LINK_ICON_CLASS =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-700/60 bg-neutral-400/10 text-neutral-400 transition-colors group-hover:border-neutral-500/60 group-hover:text-neutral-200";

/** Glass surfaces for /partner and similar pages */
export const GLASS_CARD_CLASS =
  "rounded-xl border border-neutral-700/60 bg-neutral-400/10 shadow backdrop-blur-xl";

export const GLASS_INPUT_CLASS =
  "w-full rounded-xl border border-neutral-700/60 bg-neutral-400/10 p-4 text-neutral-100 placeholder-neutral-500 shadow backdrop-blur-xl transition-all focus:border-neutral-500/60 focus:outline-none focus:ring-2 focus:ring-neutral-500/30";

export const GLASS_BTN_CLASS =
  "inline-flex items-center justify-center rounded-xl border border-neutral-700/60 bg-neutral-400/10 px-8 py-4 text-sm font-semibold text-neutral-100 shadow backdrop-blur-xl transition-all hover:border-neutral-500/60 hover:bg-neutral-400/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500/50";

export const GLASS_BTN_PRIMARY_CLASS =
  "inline-flex items-center justify-center rounded-xl border border-neutral-600/80 bg-neutral-200/90 px-8 py-4 text-sm font-semibold text-neutral-900 shadow backdrop-blur-xl transition-all hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400/50";

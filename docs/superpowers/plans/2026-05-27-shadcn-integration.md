# shadcn Integration — Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize shadcn on the Astro 5 + Tailwind v4 portfolio site and replace the experience section's native `<dialog>` and `<details>` accordion with shadcn Dialog + Accordion React components, with zero visual changes.

**Architecture:** A single React island (`ExperienceSection.tsx`) owns both the shadcn Accordion (one item per experience) and the shadcn Dialog (one shared instance controlled by `useState`). The island receives typed data from `index.astro` via props and fully replaces the current inline Astro template, native `<dialog>`, and vanilla JS `<script is:inline>`.

**Tech Stack:** shadcn 4.8.2 (already in devDependencies), @radix-ui/react-accordion, @radix-ui/react-dialog, Astro 5, React 19, Tailwind CSS v4

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `tsconfig.json` | Modify | Add `@/*` path alias required by shadcn imports |
| `astro.config.mjs` | Modify | Add Vite `resolve.alias` so `@/` resolves at bundle time |
| `components.json` | Create (CLI) | shadcn project configuration |
| `src/styles/global.css` | Modify | Replace shadcn's light-mode CSS variable defaults with the site's dark palette |
| `src/components/ui/accordion.tsx` | Create (CLI) | shadcn Accordion primitives |
| `src/components/ui/dialog.tsx` | Create (CLI), then modify | shadcn Dialog primitives; strip hardcoded close button + match overlay opacity |
| `src/components/experience/ExperienceSection.tsx` | Create | React island: shadcn Accordion + Dialog for the experience section |
| `src/pages/index.astro` | Modify | Remove native `<dialog>` + `<script is:inline>`; mount `<ExperienceSection client:load>` |

---

## Task 1: Add Path Alias

shadcn-generated UI files import from `@/components/ui/...` and `@/utils`. Both TypeScript (type checking) and Vite (bundling) must resolve `@` → `./src`.

**Files:**
- Modify: `tsconfig.json`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update `tsconfig.json`**

Replace the file contents with:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 2: Update `astro.config.mjs`**

Replace the file contents with:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "url";
import { resolve } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  site: "https://rcmcodes.com",
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
});
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:4321`, page renders normally, no console errors.

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json astro.config.mjs
git commit -m "feat: add @/* path alias for shadcn"
```

---

## Task 2: Initialize shadcn

Run the shadcn initializer. It generates `components.json` and inserts CSS variable tokens into `global.css`. After it runs, manually override the default light-mode tokens with the site's dark palette.

**Files:**
- Create: `components.json`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init
```

When the CLI prompts you, answer:

| Prompt | Answer |
|--------|--------|
| Which style? | `Default` |
| Base color? | `Neutral` |
| Global CSS file? | `src/styles/global.css` |
| Use CSS variables for theming? | `Yes` |
| Tailwind config location? | *(press Enter — leave blank, Tailwind v4 has no config file)* |
| Import alias for components? | `@/components` |
| Import alias for utils? | `@/utils` |
| Using React Server Components? | `No` |

- [ ] **Step 2: Verify `components.json` was created**

```bash
cat components.json
```

The file should exist and reference `src/styles/global.css` as the CSS file and `@/utils` as the utils alias. The exact content varies by shadcn version — it's fine as long as those two values are correct.

- [ ] **Step 3: Override CSS variables in `global.css` for the dark palette**

shadcn init adds a `@layer base { :root { ... } }` block with light-mode defaults. The site is always dark (no `.dark` class toggle), so replace the entire `:root` block with the following dark values. If shadcn also added a `.dark { ... }` block, delete it entirely.

Open `src/styles/global.css`. Find the `@layer base` block and replace the `:root` contents so the file reads:

```css
@import "tailwindcss";
@import "./geist.css";

.pixelated {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

@theme {
  --color-background: #000000;
  --color-white-icon: #e5e5e5;
}

@source "../**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}";

@layer base {
  :root {
    --background: oklch(0.04 0 0);
    --foreground: oklch(0.9 0 0);
    --card: oklch(0.07 0 0);
    --card-foreground: oklch(0.9 0 0);
    --popover: oklch(0.07 0 0);
    --popover-foreground: oklch(0.9 0 0);
    --primary: oklch(0.9 0 0);
    --primary-foreground: oklch(0.07 0 0);
    --secondary: oklch(0.14 0 0);
    --secondary-foreground: oklch(0.9 0 0);
    --muted: oklch(0.14 0 0);
    --muted-foreground: oklch(0.6 0 0);
    --accent: oklch(0.14 0 0);
    --accent-foreground: oklch(0.9 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.25 0 0);
    --input: oklch(0.25 0 0);
    --ring: oklch(0.5 0 0);
    --radius: 0.75rem;
  }
}
```

- [ ] **Step 4: Verify dev server still starts and page looks unchanged**

```bash
npm run dev
```

Open `http://localhost:4321`. The page must look exactly the same as before — no color shifts, no layout changes.

- [ ] **Step 5: Commit**

```bash
git add components.json src/styles/global.css
git commit -m "feat: initialize shadcn with dark palette CSS variables"
```

---

## Task 3: Add Dialog and Accordion Primitives

Install the two shadcn component primitives. The CLI installs the required Radix UI packages and writes the component files.

**Files:**
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/dialog.tsx`

- [ ] **Step 1: Add the components**

```bash
npx shadcn@latest add dialog accordion
```

Expected: CLI confirms it wrote `src/components/ui/accordion.tsx` and `src/components/ui/dialog.tsx`.

- [ ] **Step 2: Verify the files exist**

```bash
ls src/components/ui/
```

Expected: `accordion.tsx` and `dialog.tsx` are present (possibly also `utils.ts` — that's fine).

- [ ] **Step 3: Commit the generated files**

```bash
git add src/components/ui/
git commit -m "feat: add shadcn dialog and accordion primitives"
```

---

## Task 4: Patch `dialog.tsx` — Remove Close Button, Match Overlay Opacity

The generated `DialogContent` hardcodes a close X button and the `DialogOverlay` defaults to `bg-black/80`. Neither matches the current native dialog's design (custom "Close" button, `backdrop:bg-black/70` overlay). Patch both.

**Files:**
- Modify: `src/components/ui/dialog.tsx`

- [ ] **Step 1: Open `src/components/ui/dialog.tsx` and locate `DialogContent`**

The `DialogContent` component will look roughly like this (exact class names may vary):

```tsx
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
));
```

- [ ] **Step 2: Remove the `<DialogClose>` block from `DialogContent`**

Delete the entire `<DialogClose className="...">...</DialogClose>` block inside `DialogContent`. Keep `{children}` in place. Result:

```tsx
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
```

Also remove the `X` import from `lucide-react` at the top of the file — it is no longer used. The import line looks like:

```tsx
import { X } from "lucide-react"
```

Delete that line.

- [ ] **Step 3: Update `DialogOverlay` opacity to match the original `backdrop:bg-black/70`**

Find the `DialogOverlay` component. It will look like:

```tsx
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 ...",
      className
    )}
    {...props}
  />
));
```

Change `bg-black/80` to `bg-black/70` in the `DialogOverlay` base className string. Do not change any other part of the className.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/dialog.tsx
git commit -m "feat: patch DialogContent (remove X button) and DialogOverlay (bg-black/70)"
```

---

## Task 5: Create `ExperienceSection.tsx`

The single React island that owns the Accordion and Dialog. All markup is ported verbatim from `index.astro` — only the container elements change from native HTML (`<details>`, `<dialog>`) to shadcn components.

**Files:**
- Create: `src/components/experience/ExperienceSection.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Props as ExperienceProp } from "./props";
import type { Props as ProjectProp } from "@/components/projects/props";
import { TEXT_LINK_CLASS } from "@/data/contact";

interface SectionProps {
  experiences: ExperienceProp[];
  projects: ProjectProp[];
}

export function ExperienceSection({ experiences, projects }: SectionProps) {
  const [demoProject, setDemoProject] = useState<ProjectProp | null>(null);

  const getProjectsForCompany = (company: string) =>
    projects.filter((p) => p.forCompany === company);

  return (
    <>
      <Accordion type="single" collapsible className="group/list space-y-4 lg:space-y-6">
        {experiences.map((exp) => {
          const expProjects = getProjectsForCompany(exp.company);
          const isInternalCompanyLink = exp.companyUrl.startsWith("/");

          return (
            <AccordionItem
              key={exp.company}
              value={exp.company}
              className="group rounded-xl border border-neutral-800/70 bg-neutral-950/30 px-5 py-4 transition-[box-shadow,border-color] lg:px-6 lg:py-5 lg:border-neutral-700/70 lg:shadow-lg lg:shadow-black/30 border-b-0"
            >
              <AccordionTrigger className="w-full cursor-pointer text-left hover:no-underline [&>svg]:hidden">
                <div className="flex w-full items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {exp.dates}
                    </p>
                    <h3 className="mt-1 text-base font-medium text-neutral-200">
                      {exp.title} &middot;{" "}
                      <a
                        href={exp.companyUrl}
                        className={`${TEXT_LINK_CLASS} text-neutral-300 hover:text-neutral-100`}
                        {...(isInternalCompanyLink
                          ? {}
                          : { target: "_blank", rel: "noreferrer" })}
                        aria-label={`${exp.title} at ${exp.company}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {exp.company}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      <span className="font-semibold text-neutral-200">TL;DR:</span>{" "}
                      {exp.tldr}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 rounded-full border border-neutral-800/70 bg-neutral-900/40 px-3 py-1 text-xs font-medium text-neutral-300 transition">
                    Expand
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="mt-5 space-y-4 lg:mt-6 lg:space-y-5 pb-0">
                <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/20 p-4 lg:p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Details
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {exp.description}
                  </p>
                  {exp.highlights?.length ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-400">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {exp.technologies?.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                        Stack
                      </p>
                      <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                        {exp.technologies.map((t) => (
                          <li key={t} className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full border border-neutral-800/70 bg-neutral-950/30 px-3 py-1 text-xs font-medium leading-5 text-neutral-300">
                              {t}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/20 p-4 lg:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Built
                    </p>
                    <p className="text-xs text-neutral-600">click a card for demo</p>
                  </div>
                  <div className="mt-3 grid gap-3">
                    {expProjects.length ? (
                      expProjects.map((p) => (
                        <button
                          key={p.title}
                          type="button"
                          className="w-full rounded-xl border border-neutral-800/70 bg-neutral-950/30 p-4 text-left transition hover:border-neutral-700/80 hover:bg-neutral-900/40"
                          onClick={() => setDemoProject(p)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-neutral-100">
                                {p.title}
                              </p>
                              <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                                {p.description}
                              </p>
                            </div>
                            <span className="shrink-0 rounded-full border border-neutral-800/70 bg-neutral-900/40 px-2.5 py-1 text-[11px] font-semibold text-neutral-200">
                              Watch demo
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-neutral-800/70 bg-neutral-900/30 px-2 py-0.5 text-[11px] font-medium text-neutral-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="mt-2 text-sm text-neutral-600">
                        No linked projects yet.
                      </p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Dialog
        open={demoProject !== null}
        onOpenChange={(open) => {
          if (!open) setDemoProject(null);
        }}
      >
        <DialogContent className="max-w-none w-[min(52rem,calc(100vw-2rem))] rounded-2xl sm:rounded-2xl border-neutral-800/80 bg-neutral-950 p-0 text-neutral-100 shadow-none gap-0">
          <div className="border-b border-neutral-800/70 px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Project demo
                </p>
                <h3 className="mt-1 text-lg font-semibold">{demoProject?.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {demoProject?.description}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-neutral-800/70 bg-neutral-900/40 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-900/60"
                aria-label="Close modal"
                onClick={() => setDemoProject(null)}
              >
                Close
              </button>
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="aspect-video w-full rounded-xl border border-neutral-800/70 bg-neutral-900/20 p-4">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700/70 bg-neutral-900/50 text-neutral-200">
                  ▶
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-200">
                  Mux demo video (coming soon)
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  When you upload, we'll drop in the Mux playback id and render the player here.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={demoProject?.projectUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-700/60 bg-neutral-400/10 px-3.5 py-2.5 text-sm font-semibold text-neutral-100 transition hover:border-neutral-500/60 hover:bg-neutral-400/15"
              >
                Visit project →
              </a>
              <p className="text-xs text-neutral-600">
                (Demo modal replaces direct navigation so you can show video first.)
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx astro check 2>&1 | head -30
```

Expected: No errors in `ExperienceSection.tsx`. (Errors in `index.astro` are expected at this stage since it still references the old pattern — fix in Task 6.)

- [ ] **Step 3: Commit**

```bash
git add src/components/experience/ExperienceSection.tsx
git commit -m "feat: create ExperienceSection React island with shadcn Accordion + Dialog"
```

---

## Task 6: Update `index.astro`

Wire `ExperienceSection` into the page and remove the now-redundant native elements and vanilla JS.

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add the import in the frontmatter**

In `index.astro`, inside the `---` frontmatter fence, add this import alongside the existing ones:

```ts
import ExperienceSection from "../components/experience/ExperienceSection";
```

- [ ] **Step 2: Remove the `getProjectsForCompany` helper from the frontmatter**

Delete these two lines from the frontmatter (they move into `ExperienceSection.tsx`):

```ts
const getProjectsForCompany = (company: string) =>
  PROJECTS.filter((p) => p.forCompany === company);
```

- [ ] **Step 3: Replace the experience `<ol>` with `<ExperienceSection>`**

Find the experience `<ol>` block inside the experience section's card wrapper div. It starts with:

```astro
<ol class="group/list space-y-4 lg:space-y-6">
```

And ends with:

```astro
              </ol>
```

Replace that entire `<ol>...</ol>` block with:

```astro
<ExperienceSection client:load experiences={EXPERIENCE} projects={PROJECTS} />
```

- [ ] **Step 4: Remove the native `<dialog>` block**

Find and delete the entire `<dialog id="project-demo-modal">...</dialog>` block. It begins with:

```html
<dialog
  id="project-demo-modal"
  class="backdrop:bg-black/70 ...
```

And ends with `</dialog>`.

- [ ] **Step 5: Remove the vanilla JS `<script is:inline>` block**

Find and delete the entire `<script is:inline>...</script>` block. It begins with:

```html
<script is:inline>
  const modal = document.getElementById("project-demo-modal");
```

And ends with `</script>`.

- [ ] **Step 6: Run type check**

```bash
npx astro check
```

Expected: Zero errors or warnings.

- [ ] **Step 7: Start dev server and verify manually**

```bash
npm run dev
```

Open `http://localhost:4321` and verify:

1. Three experience entries are visible in the experience section
2. Clicking an accordion item expands it (shows Details card and Built card)
3. Clicking an already-open item closes it; clicking another opens it instead
4. Clicking a "Watch demo" project card opens the Dialog with the correct project title and description
5. Clicking the "Close" button inside the Dialog closes it
6. Clicking anywhere on the dark overlay closes the Dialog
7. Pressing `ESC` closes the Dialog
8. The "Visit project →" link inside the Dialog points to the correct project URL
9. No unstyled white backgrounds or unexpected color shifts anywhere on the page

- [ ] **Step 8: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: mount ExperienceSection, remove native dialog and inline script"
```

---

## Task 7: Final Build Verification

Confirm the production build passes and the experience section is correct end-to-end.

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected: Build completes with zero errors. Output written to `dist/`.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Open `http://localhost:4321` and repeat the verification checklist from Task 6 Step 7.

- [ ] **Step 3: Commit any fixes**

If any visual adjustments were needed during verification, commit them:

```bash
git add -A
git commit -m "fix: adjust ExperienceSection after production build verification"
```

Only run this step if adjustments were made.

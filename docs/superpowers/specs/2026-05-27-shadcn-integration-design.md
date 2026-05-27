# shadcn Integration — Experience Section & Site Audit

**Date:** 2026-05-27
**Status:** Approved

## Overview

Install and initialize shadcn on an Astro 5 + React 19 + Tailwind CSS v4 portfolio site. Replace the experience section's native `<dialog>` (project demo modal) and native `<details>`/`<summary>` (accordion) with shadcn Dialog and Accordion components. No visual changes — all existing Tailwind classes and styling are preserved.

## Constraints

- **DO NOT change any styling.** All existing Tailwind utility classes stay exactly as written.
- Tailwind CSS v4 (not v3) — shadcn CSS variable tokens must be set to match the existing dark palette.
- Astro 5 + React 19 — shadcn components are React; they require `client:` directives when used in `.astro` files.
- `shadcn` is already in `devDependencies`; no new package installs needed beyond running `init` and `add`.

---

## Phase 1: Installation & CSS Variable Alignment

### shadcn Init

Run the shadcn initializer to generate `components.json` and scaffold `src/components/ui/`:

```bash
npx shadcn@latest init
npx shadcn@latest add dialog accordion
```

During `init`, select:
- Framework: **Other** (Astro)
- Tailwind CSS: **v4 / CSS variables**
- Base color: **Neutral** (closest to existing palette)
- Components dir: `src/components/ui`

### CSS Variables

shadcn injects an `@layer base` block into `global.css` with CSS variable tokens. Override them to match the existing dark neutral palette so shadcn's default classes never conflict:

```css
@layer base {
  :root {
    --background: 0 0% 0%;           /* #000000 */
    --foreground: 0 0% 90%;          /* ~neutral-100 */
    --card: 0 0% 4%;                 /* ~neutral-950 */
    --card-foreground: 0 0% 90%;
    --border: 0 0% 15%;              /* ~neutral-800 */
    --input: 0 0% 15%;
    --ring: 0 0% 40%;
    --muted: 0 0% 9%;                /* ~neutral-900 */
    --muted-foreground: 0 0% 60%;    /* ~neutral-400 */
    --radius: 0.75rem;
  }
}
```

Tailwind v4 uses **OKLCH** color format, not HSL — the actual values above are illustrative. The implementation plan will derive the exact OKLCH equivalents. These tokens are the fallback layer. All components still use the explicit Tailwind classes from the existing implementation — the tokens just prevent any shadcn default from bleeding through.

---

## Phase 2: ExperienceSection React Component

### New File

`src/components/experience/ExperienceSection.tsx`

### Props

```ts
import type { Props as ExperienceProp } from "./props";
import type { Props as ProjectProp } from "../projects/props";

interface SectionProps {
  experiences: ExperienceProp[];
  projects: ProjectProp[];
}
```

### Component Structure

```tsx
export function ExperienceSection({ experiences, projects }: SectionProps) {
  const [demoProject, setDemoProject] = useState<ProjectProp | null>(null);

  const getProjectsForCompany = (company: string) =>
    projects.filter((p) => p.forCompany === company);

  return (
    <>
      <Accordion type="single" collapsible className="group/list space-y-4 lg:space-y-6">
        {experiences.map((exp) => {
          const expProjects = getProjectsForCompany(exp.company);
          return (
            <AccordionItem key={exp.company} value={exp.company} className="...existing classes...">
              <AccordionTrigger className="...existing summary classes...">
                {/* dates, title, company link, TL;DR, Expand badge — identical to current <summary> content */}
              </AccordionTrigger>
              <AccordionContent className="...">
                {/* Details card + Built card — identical markup to current expanded content */}
                {expProjects.map((p) => (
                  <button onClick={() => setDemoProject(p)} ...>
                    {/* project card — identical to current .js-demo-open button */}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Dialog open={demoProject !== null} onOpenChange={(open) => !open && setDemoProject(null)}>
        <DialogContent className="...existing dialog classes...">
          {/* identical markup to current <dialog id="project-demo-modal"> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

**Key principle:** The shadcn components provide the behavior primitives (open/close state, keyboard navigation, focus trapping, ARIA roles). All visual classes are copied verbatim from the current implementation.

### Accordion trigger styling note

shadcn `AccordionTrigger` renders a `<button>` with a default chevron icon and `flex justify-between` styles. Override these:
- Pass `className` to remove the default icon or hide it
- Apply `list-none cursor-pointer` to match the current `<summary>` appearance
- Keep the "Expand" badge as a `<span>` inside the trigger (no change)

### Dialog styling note

shadcn `DialogContent` renders with a default close `X` button (a `DialogClose` inside `DialogContent`). Replace the default composition by building the dialog manually with `DialogPortal` + `DialogOverlay` + `DialogContent` primitives, then placing the existing "Close" button inside — matching the current markup exactly. Do not use the convenience `DialogContent` wrapper if it forces the X button.

---

## Phase 3: index.astro Updates

### Remove

- The entire `<dialog id="project-demo-modal">` block (~50 lines)
- The entire `<script is:inline>` vanilla JS block (~45 lines)
- The `<ol class="group/list ...">` experience loop

### Add

```astro
import ExperienceSection from "../components/experience/ExperienceSection";

<ExperienceSection client:load experiences={EXPERIENCE} projects={PROJECTS} />
```

Place inside the existing section wrapper div (the rounded card with `lg:rounded-2xl lg:border ...`).

---

## Site-wide Replacement Candidates (Future Phases)

| Priority | Current Implementation | shadcn Component | Location |
|----------|----------------------|------------------|----------|
| Phase 1 | Native `<dialog>` + vanilla JS | **Dialog** | `index.astro` — project demo modal |
| Phase 1 | Native `<details>`/`<summary>` | **Accordion** | `index.astro` — experience section |
| Phase 2 | Custom `<div class="rounded-full border ...">` | **Badge** | Tech stack tags in experience + project components |
| Phase 3 | `<button class="rounded-full border ...">` CTAs | **Button** | Expand, Close, Watch demo, Visit project buttons |
| Phase 3 | `CalButton.tsx` anchor tag | **Button** | Already a React component — easy swap |
| Phase 4 | Section wrapper `<div class="rounded-2xl border ...">` | **Card** | Intro, About, Experience, Certifications sections |

All future replacements follow the same rule: shadcn handles behavior/semantics, existing Tailwind classes are preserved verbatim.

---

## Success Criteria

- [ ] `components.json` present at repo root
- [ ] `src/components/ui/dialog.tsx` and `src/components/ui/accordion.tsx` exist
- [ ] `ExperienceSection.tsx` renders with shadcn Accordion and Dialog
- [ ] Experience accordion opens/closes identically to the current `<details>` version
- [ ] Clicking a project card opens the Dialog with the correct project data
- [ ] Clicking "Close" or clicking outside dismisses the dialog
- [ ] ESC key closes the dialog (native behavior from Radix)
- [ ] No visual changes anywhere on the page
- [ ] No TypeScript errors (`astro check` passes)
- [ ] Native `<dialog>` and vanilla JS `<script is:inline>` removed from `index.astro`

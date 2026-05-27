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

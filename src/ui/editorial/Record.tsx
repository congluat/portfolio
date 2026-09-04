import { profile } from '../../data/profile'
import CompanyLogo from '../../components/CompanyLogo'
import Reveal, { SectionHead } from './Reveal'

export default function Record() {
  return (
    <section id="record" className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="02 / Record"
          title="Professional record"
          aside={`${profile.experience.length} positions · 132 months`}
        />

        {profile.experience.map((job, i) => (
          <article
            key={job.company}
            className="group grid gap-6 border-t border-graphite/25 py-10 first:border-t-0 first:pt-0 lg:grid-cols-[190px_1fr] lg:gap-12"
          >
            {/* Margin column, sticky so the dates track the entry on desktop */}
            <div className="self-start lg:sticky lg:top-24">
              <p className="font-mono text-2xs tracking-[0.2em] text-vermilion">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-2 font-mono text-2xs uppercase leading-relaxed tracking-[0.14em] text-graphite-dim">
                {job.period}
              </p>
              <p className="font-mono text-2xs text-graphite-faint">{job.duration}</p>
              <p className="mt-1 font-mono text-2xs text-graphite-faint">{job.location}</p>

              <CompanyLogo
                src={job.logo}
                company={job.company}
                className="mt-4 h-11 w-11 border-2 border-graphite bg-white"
                fallbackClassName="text-graphite"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-sans text-[clamp(1.9rem,5.5vw,3.6rem)] font-extrabold uppercase leading-[0.9] tracking-brutal">
                <Reveal>{job.company}</Reveal>
              </h3>

              <p className="mt-2 font-sans text-lg font-medium tracking-tight sm:text-xl">
                {job.role}
                {job.featured && (
                  <span className="ml-3 align-middle font-mono text-2xs uppercase tracking-[0.16em] text-vermilion">
                    — current
                  </span>
                )}
              </p>

              <p className="mt-5 max-w-3xl border-l-2 border-vermilion pl-5 text-base leading-relaxed text-graphite-dim">
                {job.description}
              </p>

              {job.projects && job.projects.length > 0 && (
                <div className="mt-8">
                  <p className="mb-4 font-mono text-2xs uppercase tracking-[0.18em] text-graphite-faint">
                    Selected work
                  </p>
                  <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    {job.projects.map((project) => (
                      <div key={project.name} className="border-t border-graphite/20 pt-3">
                        <h4 className="font-sans text-base font-bold tracking-tight">
                          {project.name}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-graphite-dim">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <p className="mb-4 font-mono text-2xs uppercase tracking-[0.18em] text-graphite-faint">
                  Responsibilities
                </p>
                <ul className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                  {job.highlights.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed text-graphite-dim">
                      <span className="mt-1 h-1 w-3 shrink-0 bg-vermilion" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 font-mono text-2xs uppercase leading-relaxed tracking-[0.14em] text-graphite-faint">
                {job.tech.join('  ·  ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

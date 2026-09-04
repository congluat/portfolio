import { profile } from '../../data/profile'
import CompanyLogo from '../../components/CompanyLogo'
import { companyCode } from './sheets'

export type Job = (typeof profile.experience)[number]

interface JobDetailProps {
  job: Job
}

export default function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start gap-x-4 gap-y-3 border-b border-bp-line pb-4">
        <CompanyLogo
          src={job.logo}
          company={job.company}
          className="h-9 w-9 border border-bp-line bg-white"
          fallbackClassName="text-bp-bg"
        />

        <div className="min-w-0 flex-1">
          <p className="text-2xs uppercase tracking-[0.22em] text-draft-mark">
            {companyCode(job.company)}
            {job.featured && <span className="ml-2 text-draft-faint">· in service</span>}
          </p>
          <p className="mt-1 truncate text-sm text-draft">{job.company}</p>
          <p className="truncate text-xs text-draft-dim">{job.role}</p>
        </div>

        <dl className="space-y-1 text-2xs text-draft-faint sm:text-right">
          <div>
            <dt className="sr-only">period</dt>
            <dd className="text-draft-dim">{job.period}</dd>
          </div>
          <div>
            <dt className="sr-only">duration</dt>
            <dd>
              {job.duration} · {job.months} mo
            </dd>
          </div>
          <div>
            <dt className="sr-only">location</dt>
            <dd>{job.location}</dd>
          </div>
        </dl>
      </header>

      <p className="border-l border-draft-mark/50 pl-4 text-xs leading-relaxed text-draft-dim sm:text-sm">
        {job.description}
      </p>

      {job.projects && job.projects.length > 0 && (
        <section>
          <h4 className="mb-2.5 text-2xs uppercase tracking-[0.22em] text-draft-faint">
            sub-assemblies
          </h4>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {job.projects.map((project) => (
              <article key={project.name} className="border border-bp-line bg-bp-deep p-3.5">
                <h5 className="text-xs text-draft">{project.name}</h5>
                <p className="mt-1.5 text-2xs leading-relaxed text-draft-faint">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section>
        <h4 className="mb-2.5 text-2xs uppercase tracking-[0.22em] text-draft-faint">
          specification notes
        </h4>
        <ul className="space-y-2">
          {job.highlights.map((line, i) => (
            <li key={line} className="flex gap-3 text-2xs leading-relaxed text-draft-dim sm:text-xs">
              <span className="shrink-0 text-draft-mark/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-1.5 border-t border-bp-line pt-4">
        {job.tech.map((tech) => (
          <span key={tech} className="border border-bp-line px-2 py-0.5 text-2xs text-draft-faint">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

import { profile } from '../../data/profile'
import Reveal, { SectionHead } from './Reveal'

const FOCUS = [
  'Fraud & Financial Crime',
  'Real-time Decisioning',
  'Event-Driven Architecture',
  'Cloud-Native Platforms',
  'Team Leadership',
]

export default function Brief() {
  return (
    <section id="brief" className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead index="01 / Brief" title="The brief" aside="Who you are hiring" />

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Lead paragraph, set as a magazine standfirst */}
          <p className="font-sans text-2xl font-medium leading-[1.25] tracking-tight sm:text-3xl">
            <Reveal>{profile.summary.split('. ')[0] + '.'}</Reveal>
          </p>

          <div className="space-y-8">
            <p className="text-base leading-relaxed text-graphite-dim">
              {profile.summary.split('. ').slice(1).join('. ')}
            </p>

            <div>
              <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-graphite-faint">
                Focus
              </p>
              <ul className="border-t border-graphite/20">
                {FOCUS.map((item) => (
                  <li
                    key={item}
                    className="border-b border-graphite/20 py-2 font-sans text-sm font-medium tracking-tight"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-graphite/25 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-vermilion">
              Certifications
            </p>
            <ul className="space-y-1.5 text-sm text-graphite-dim">
              {profile.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-vermilion">
              Awards
            </p>
            <ul className="space-y-1.5 text-sm text-graphite-dim">
              {profile.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-vermilion">
              Languages
            </p>
            <ul className="space-y-1.5 text-sm text-graphite-dim">
              {profile.languages.map((lang) => (
                <li key={lang.name}>
                  {lang.name} — {lang.level}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-vermilion">
              Based in
            </p>
            <p className="text-sm text-graphite-dim">{profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import Reveal, { Rule } from './Reveal'

const STATS = [
  { value: '11+', label: 'Years in practice' },
  { value: '07', label: 'Companies shipped with' },
  { value: '04', label: 'Industry domains' },
]

export default function Masthead() {
  return (
    <section id="masthead" className="px-5 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pb-5 font-mono text-2xs uppercase tracking-[0.2em] text-graphite-dim">
          <span className="flex items-center gap-2 text-vermilion">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-vermilion" />
            Available for work
          </span>
          <span>{profile.location}</span>
          <span className="hidden sm:inline">Est. 2014</span>
        </div>

        <Rule className="h-[3px] bg-graphite" />

        {/* The masthead itself — deliberately oversized and tightly tracked */}
        <h1 className="pt-4 font-sans font-extrabold uppercase leading-[0.82] tracking-brutal">
          <Reveal className="text-[clamp(3.2rem,15vw,13rem)]">Nguyen</Reveal>
          <Reveal delay={0.09} className="text-[clamp(3.2rem,15vw,13rem)]">
            <span className="text-vermilion">Luat</span>
          </Reveal>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-graphite/25 pt-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="max-w-2xl font-sans text-2xl font-medium leading-tight tracking-tight sm:text-4xl">
              <Reveal delay={0.12}>{profile.title}</Reveal>
            </p>
            <p className="mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.14em] text-graphite-dim sm:text-sm">
              {profile.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#record"
                className="group relative overflow-hidden border-2 border-graphite bg-graphite px-7 py-3 font-mono text-2xs uppercase tracking-[0.16em] text-paper transition-colors hover:bg-vermilion hover:border-vermilion"
              >
                Read the record
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-graphite px-7 py-3 font-mono text-2xs uppercase tracking-[0.16em] transition-colors hover:bg-graphite hover:text-paper"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Stats set as a masthead sidebar */}
          <dl className="grid grid-cols-3 gap-4 self-end lg:border-l lg:border-graphite/25 lg:pl-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.09, duration: 0.6 }}
              >
                <dd className="font-sans text-4xl font-extrabold tracking-brutal sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-1.5 font-mono text-2xs uppercase leading-snug tracking-[0.14em] text-graphite-faint">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

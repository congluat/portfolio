import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHead } from './Reveal'

export default function Schooling() {
  return (
    <section id="schooling" className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead index="04 / Schooling" title="Education" />

        {profile.education.map((edu, i) => (
          <motion.div
            key={edu.school}
            className="grid gap-3 border-t border-graphite/25 py-7 lg:grid-cols-[190px_1fr] lg:gap-12"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-2xs uppercase tracking-[0.14em] text-graphite-dim">
              {edu.period}
            </p>
            <div>
              <h3 className="font-sans text-2xl font-extrabold uppercase tracking-brutal sm:text-3xl">
                {edu.school}
              </h3>
              <p className="mt-1 text-base text-graphite-dim">{edu.degree}</p>
              {edu.note && (
                <p className="mt-2 inline-block border border-graphite px-2 py-0.5 font-mono text-2xs uppercase tracking-[0.14em]">
                  {edu.note}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

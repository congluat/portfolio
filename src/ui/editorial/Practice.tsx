import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHead } from './Reveal'

export default function Practice() {
  const categories = [...new Set(profile.skills.map((skill) => skill.category))]

  return (
    <section id="practice" className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="03 / Practice"
          title="Tools of the trade"
          aside={`${profile.skills.length} entries`}
        />

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="border-t-2 border-graphite pt-2.5 font-mono text-2xs uppercase tracking-[0.18em] text-vermilion">
                {category}
              </p>
              <ul className="mt-3">
                {profile.skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <li
                      key={skill.name}
                      className="border-b border-graphite/20 py-2 font-sans text-base font-bold tracking-tight"
                    >
                      {skill.name}
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee — the one loud, printerly flourish */}
        <div className="mt-14 overflow-hidden border-y-2 border-graphite py-3">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-sans text-xl font-extrabold uppercase tracking-brutal sm:text-3xl">
            {[...profile.skills, ...profile.skills].map((skill, i) => (
              <span key={i} className={i % 3 === 1 ? 'text-vermilion' : 'text-graphite'}>
                {skill.name} <span className="text-graphite-faint">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

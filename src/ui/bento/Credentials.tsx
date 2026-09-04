import { motion } from 'framer-motion'
import {
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineSparkles,
  HiOutlineTranslate,
} from 'react-icons/hi'
import { profile } from '../../data/profile'
import Board from './Board'
import Tile, { TileLabel } from './Tile'

export default function Credentials() {
  return (
    <Board
      id="credentials"
      eyebrow="Credentials"
      title="Learning & recognition"
      meta={`${profile.certifications.length} certifications · ${profile.education.length} schools`}
    >
      {/* Education — the tall tile of this board */}
      <Tile
        span="sm:col-span-2 lg:col-span-2 lg:row-span-2"
        className="flex flex-col p-6 sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <TileLabel>Education</TileLabel>
          <HiOutlineAcademicCap size={20} className="text-pop-blue" />
        </div>

        <div className="mt-auto pt-8">
          {profile.education.map((school, i) => (
            <motion.div
              key={school.school}
              className="border-t border-bento-line py-5 first:border-t-0 first:pt-0 last:pb-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + i * 0.1, duration: 0.5 }}
            >
              <p className="font-mono text-2xs uppercase tracking-[0.16em] text-pop-blue">
                {school.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                {school.school}
              </h3>
              <p className="mt-1.5 text-sm text-bento-dim">{school.degree}</p>
              {school.note && (
                <p className="mt-2 font-mono text-2xs uppercase tracking-[0.14em] text-bento-faint">
                  {school.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Tile>

      {/* Certifications */}
      <Tile delay={0.06} span="sm:col-span-2 lg:col-span-2" className="flex flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <TileLabel>Certifications</TileLabel>
          <HiOutlineBadgeCheck size={20} className="text-pop-teal" />
        </div>

        <ul className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
          {profile.certifications.map((cert, i) => (
            <motion.li
              key={cert}
              className="flex items-start gap-2.5 rounded-2xl border border-bento-line bg-bento-sunk/45 px-3.5 py-3 text-sm font-medium leading-snug tracking-tight"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 + i * 0.07 }}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pop-teal" />
              {cert}
            </motion.li>
          ))}
        </ul>
      </Tile>

      {/* Awards */}
      <Tile delay={0.12} className="flex flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-3">
          <TileLabel>Awards</TileLabel>
          <HiOutlineSparkles size={20} className="text-pop-sun" />
        </div>

        <div>
          {profile.awards.map((award) => (
            <p
              key={award}
              className="text-sm font-semibold leading-snug tracking-tight text-bento-ink"
            >
              {award}
            </p>
          ))}
        </div>
      </Tile>

      {/* Languages */}
      <Tile delay={0.18} className="flex flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-3">
          <TileLabel>Languages</TileLabel>
          <HiOutlineTranslate size={20} className="text-pop-coral" />
        </div>

        <dl className="space-y-3">
          {profile.languages.map((language) => (
            <div key={language.name}>
              <dt className="text-sm font-semibold tracking-tight">{language.name}</dt>
              <dd className="font-mono text-2xs text-bento-faint">{language.level}</dd>
            </div>
          ))}
        </dl>
      </Tile>
    </Board>
  )
}

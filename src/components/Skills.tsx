import { useRef, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiGooglecloud,
  SiKubernetes,
  SiSpringboot,
  SiDocker,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  'Java / Spring Boot': FaJava,
  AWS: FaAws,
  Kubernetes: SiKubernetes,
  'Google Cloud Platform': SiGooglecloud,
  'Docker / CI-CD': SiDocker,
  'MongoDB / SQL': SiMongodb,
  Redis: SiRedis,
  'RabbitMQ / Kafka': SiRabbitmq,
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const categories = [...new Set(profile.skills.map((s) => s.category))]

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <SectionHeading
          tag="Expertise"
          title="Technical"
          highlight="arsenal"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16">
          {profile.skills.map((skill, i) => {
            const Icon = iconMap[skill.name] ?? SiSpringboot
            return (
              <motion.div
                key={skill.name}
                className="glass rounded-2xl p-5 sm:p-6 group hover:glow-purple transition-all duration-500"
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="p-2.5 rounded-xl bg-white/5 text-accent-cyan group-hover:text-accent-purple transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">{skill.name}</h3>
                    <span className="text-xs text-white/30 font-mono">{skill.category}</span>
                  </div>
                </div>

                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
                <p className="text-right text-xs text-white/30 mt-1 font-mono">{skill.level}%</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-16 grid sm:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Languages</h3>
            <div className="space-y-3">
              {profile.languages.map((lang) => (
                <div key={lang.name} className="flex justify-between items-center">
                  <span className="text-white/70">{lang.name}</span>
                  <span className="text-xs font-mono text-accent-cyan">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 text-sm text-white/60 border border-white/5"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { profile } from '../../data/profile'
import Nav from './Nav'
import Hero from './Hero'
import Work from './Work'
import Skills from './Skills'
import Credentials from './Credentials'
import Contact from './Contact'
import { TOTAL_MONTHS } from './stats'

export default function BentoUi() {
  return (
    <>
      {/* Ambient wash — keeps the light canvas from reading as flat grey */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(60rem 40rem at 12% -10%, rgba(47,107,255,0.10), transparent 60%), radial-gradient(50rem 36rem at 92% 8%, rgba(124,92,255,0.09), transparent 60%), radial-gradient(46rem 34rem at 70% 108%, rgba(0,184,169,0.08), transparent 60%)',
        }}
      />

      <Nav />

      <main className="relative z-10 pt-24 sm:pt-28">
        <Hero />
        <Work />
        <Skills />
        <Credentials />
        <Contact />
      </main>

      <footer className="relative z-10 px-4 pb-10 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-2 rounded-3xl border border-bento-line bg-bento-tile/70 px-6 py-5 font-mono text-2xs uppercase tracking-[0.16em] text-bento-faint">
          <span className="font-sans text-sm font-semibold normal-case tracking-tight text-bento-ink">
            {profile.name}
          </span>
          <span>{profile.title}</span>
          <span className="hidden sm:inline">
            {profile.experience.length} roles · {TOTAL_MONTHS} months
          </span>
          <span className="sm:ml-auto">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  )
}

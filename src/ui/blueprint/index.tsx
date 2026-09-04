import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import Nav from './Nav'
import Cover from './Cover'
import GeneralNotes from './GeneralNotes'
import CareerGraph from './CareerGraph'
import DurationDimensions from './DurationDimensions'
import SkillLegend from './SkillLegend'
import RevisionTable from './RevisionTable'
import Contact from './Contact'
import { SHEETS } from './sheets'

const TOTAL_MONTHS = profile.experience.reduce((sum, job) => sum + job.months, 0)

export default function BlueprintUi() {
  const [activeId, setActiveId] = useState(SHEETS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] },
    )

    SHEETS.forEach((sheet) => {
      const element = document.getElementById(sheet.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="bp-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 15% 0%, rgba(255,207,92,0.07), transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(143,178,209,0.06), transparent 50%)',
        }}
      />

      <Nav activeId={activeId} />

      <main className="relative">
        <Cover />
        <GeneralNotes />
        <CareerGraph />
        <DurationDimensions />
        <SkillLegend />
        <RevisionTable />
        <Contact />
      </main>

      <footer className="border-t border-bp-line px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 text-2xs uppercase tracking-[0.18em] text-draft-faint">
          <span className="text-draft-mark">dwg no. nl-cv-2026</span>
          <span>
            sheets a-00 → a-0{SHEETS.length - 1}
          </span>
          <span>all dimensions in months · {TOTAL_MONTHS} mo total</span>
          <span className="sm:ml-auto">© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </footer>
    </>
  )
}

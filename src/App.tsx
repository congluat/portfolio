import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleField from './components/ParticleField'
import CursorGlow from './components/CursorGlow'
import Preloader from './components/Preloader'
import ScrollHint from './components/ScrollHint'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [onHero, setOnHero] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setOnHero(y < window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollPastHero = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <div className="relative min-h-screen">
        <ParticleField />
        <CursorGlow />

        <Navbar scrolled={scrolled} />

        <ScrollHint show={!loading && onHero} onClick={scrollPastHero} />

        <main>
          <section id="hero" className="min-h-dvh">
            <Hero />
          </section>
          <About />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}

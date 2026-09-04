import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { VscAccount, VscBriefcase, VscFiles, VscMail, VscSearch } from 'react-icons/vsc'
import { profile } from '../../data/profile'
import { ALL_FILES, DEFAULT_OPEN, FEATURED_FILE_ID, WORKSPACE_NAME } from './files'
import type { VirtualFile } from './files'
import CommandPalette from './CommandPalette'
import Editor from './Editor'
import Sidebar from './Sidebar'
import StatusBar from './StatusBar'
import TabBar from './TabBar'

const byId = (id: string | null): VirtualFile | null =>
  ALL_FILES.find((file) => file.id === id) ?? null

interface ActivityButtonProps {
  label: string
  active?: boolean
  onClick: () => void
  children: ReactNode
}

function ActivityButton({ label, active = false, onClick, children }: ActivityButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`relative flex h-11 w-full items-center justify-center transition-colors ${
        active ? 'text-syntax-text' : 'text-syntax-faint hover:text-syntax-dim'
      }`}
    >
      {active && <span className="absolute inset-y-2 left-0 w-0.5 bg-syntax-blue" />}
      {children}
    </button>
  )
}

export default function IdeUi() {
  const [openIds, setOpenIds] = useState<string[]>(DEFAULT_OPEN)
  const [activeId, setActiveId] = useState<string | null>(DEFAULT_OPEN[0])
  const [cursor, setCursor] = useState({ line: 1, col: 1 })
  const [explorerOpen, setExplorerOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const restoreFocus = useRef<HTMLElement | null>(null)

  const activeFile = byId(activeId)

  const openFile = useCallback((id: string) => {
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    setActiveId(id)
    setCursor({ line: 1, col: 1 })
    setDrawerOpen(false)
  }, [])

  const selectTab = useCallback((id: string) => {
    setActiveId(id)
    setCursor({ line: 1, col: 1 })
  }, [])

  const closeFile = useCallback(
    (id: string) => {
      const index = openIds.indexOf(id)
      const next = openIds.filter((openId) => openId !== id)
      setOpenIds(next)

      if (activeId === id) {
        setActiveId(next[index] ?? next[next.length - 1] ?? null)
        setCursor({ line: 1, col: 1 })
      }
    },
    [openIds, activeId],
  )

  const openPalette = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null
    setPaletteOpen(true)
  }, [])

  const closePalette = useCallback(() => {
    setPaletteOpen(false)
    restoreFocus.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if ((event.metaKey || event.ctrlKey) && (key === 'k' || key === 'p')) {
        event.preventDefault()
        if (paletteOpen) closePalette()
        else openPalette()
        return
      }

      if (event.key === 'Escape') {
        if (paletteOpen) closePalette()
        setDrawerOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [paletteOpen, openPalette, closePalette])

  const tabs = openIds.map(byId).filter((file): file is VirtualFile => file !== null)

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-dvh flex-col overflow-hidden bg-ide-bg">
        {/* title bar */}
        <header className="flex h-9 shrink-0 items-center gap-3 border-b border-ide-line/70 bg-ide-crust px-3">
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-syntax-red/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-syntax-yellow/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-syntax-green/80" />
          </span>

          <button
            type="button"
            onClick={openPalette}
            className="mx-auto flex h-6 w-full max-w-sm items-center gap-2 rounded-sm border border-ide-line/70 bg-ide-side px-2 text-2xs text-syntax-faint transition-colors hover:border-syntax-blue/50 hover:text-syntax-dim"
          >
            <VscSearch className="h-3 w-3 shrink-0" aria-hidden />
            <span className="truncate">
              {activeFile ? activeFile.path : WORKSPACE_NAME} — {profile.name}
            </span>
            <kbd className="ml-auto hidden shrink-0 rounded-sm bg-ide-raised px-1 py-px sm:block">
              Ctrl K
            </kbd>
          </button>

          <span className="hidden shrink-0 text-2xs text-syntax-faint lg:block">
            {profile.title}
          </span>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* activity bar */}
          <nav
            aria-label="Activity"
            className="hidden w-11 shrink-0 flex-col items-center border-r border-ide-line/70 bg-ide-crust py-1 md:flex"
          >
            <ActivityButton
              label="Toggle file explorer"
              active={explorerOpen}
              onClick={() => setExplorerOpen((value) => !value)}
            >
              <VscFiles className="h-5 w-5" />
            </ActivityButton>

            <ActivityButton label="Open command palette" onClick={openPalette}>
              <VscSearch className="h-5 w-5" />
            </ActivityButton>

            <ActivityButton label="Open current role" onClick={() => openFile(FEATURED_FILE_ID)}>
              <VscBriefcase className="h-5 w-5" />
            </ActivityButton>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="mt-auto flex h-11 w-full items-center justify-center text-syntax-faint transition-colors hover:text-syntax-dim"
            >
              <VscAccount className="h-5 w-5" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              className="flex h-11 w-full items-center justify-center text-syntax-faint transition-colors hover:text-syntax-dim"
            >
              <VscMail className="h-5 w-5" />
            </a>
          </nav>

          {/* explorer — desktop */}
          <AnimatePresence initial={false}>
            {explorerOpen && (
              <motion.aside
                key="explorer"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 236, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="hidden shrink-0 overflow-hidden border-r border-ide-line/70 md:block"
              >
                <div className="h-full w-[236px]">
                  <Sidebar
                    activeId={activeId}
                    openIds={openIds}
                    onOpen={openFile}
                    onOpenPalette={openPalette}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <main className="flex min-h-0 min-w-0 flex-1 flex-col">
            <TabBar
              tabs={tabs}
              activeId={activeId}
              onSelect={selectTab}
              onClose={closeFile}
              onToggleDrawer={() => setDrawerOpen((value) => !value)}
            />

            <Editor
              file={activeFile}
              cursorLine={cursor.line}
              onCursorChange={(line, col) => setCursor({ line, col })}
              onOpenPalette={openPalette}
            />
          </main>
        </div>

        <StatusBar file={activeFile} cursorLine={cursor.line} cursorCol={cursor.col} />

        {/* explorer — mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              key="drawer"
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                aria-label="Close file explorer"
                onClick={() => setDrawerOpen(false)}
                className="absolute inset-0 cursor-default bg-ide-crust/70"
              />
              <motion.aside
                className="absolute inset-y-0 left-0 w-[16rem] max-w-[80vw] border-r border-ide-line/70 shadow-xl shadow-black/40"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <Sidebar
                  activeId={activeId}
                  openIds={openIds}
                  onOpen={openFile}
                  onOpenPalette={() => {
                    setDrawerOpen(false)
                    openPalette()
                  }}
                />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <CommandPalette open={paletteOpen} onClose={closePalette} onOpenFile={openFile} />
      </div>
    </MotionConfig>
  )
}

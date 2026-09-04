import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VscSearch } from 'react-icons/vsc'
import { ALL_FILES, LANGUAGE_LABEL } from './files'
import type { VirtualFile } from './files'
import FileIcon from './FileIcon'
import { fuzzyMatch } from './fuzzy'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onOpenFile: (id: string) => void
}

interface Hit {
  file: VirtualFile
  positions: number[]
}

interface HighlightProps {
  text: string
  positions: number[]
}

function Highlight({ text, positions }: HighlightProps) {
  const marked = new Set(positions)

  return (
    <>
      {[...text].map((char, i) => (
        <span key={i} className={marked.has(i) ? 'text-syntax-yellow' : undefined}>
          {char}
        </span>
      ))}
    </>
  )
}

export default function CommandPalette({ open, onClose, onOpenFile }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const hits = useMemo<Hit[]>(() => {
    const scored: (Hit & { score: number })[] = []

    for (const file of ALL_FILES) {
      const match = fuzzyMatch(query, file.path)
      if (match) scored.push({ file, positions: match.positions, score: match.score })
    }

    return scored.sort((a, b) => b.score - a.score)
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setSelected(0)
    inputRef.current?.focus()
  }, [open])

  useEffect(() => setSelected(0), [query])

  useEffect(() => {
    listRef.current?.children[selected]?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const choose = (id: string) => {
    onOpenFile(id)
    onClose()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((i) => (hits.length ? (i + 1) % hits.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((i) => (hits.length ? (i - 1 + hits.length) % hits.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (hits[selected]) choose(hits[selected].file.id)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ide-crust/70 backdrop-blur-[1px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Go to file"
            initial={{ opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-md border border-ide-line bg-ide-side shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-2 border-b border-ide-line/70 px-3 py-2.5">
              <VscSearch className="h-4 w-4 shrink-0 text-syntax-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Go to file…"
                aria-label="Search files"
                aria-controls="ide-palette-list"
                aria-activedescendant={hits[selected] ? `ide-hit-${hits[selected].file.id}` : undefined}
                className="w-full bg-transparent text-sm text-syntax-text placeholder:text-syntax-faint focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded-sm bg-ide-raised px-1.5 py-0.5 text-2xs text-syntax-faint sm:block">
                Esc
              </kbd>
            </div>

            <ul id="ide-palette-list" ref={listRef} role="listbox" aria-label="Files" className="min-h-0 overflow-y-auto py-1">
              {hits.map((hit, i) => (
                <li key={hit.file.id} id={`ide-hit-${hit.file.id}`} role="option" aria-selected={i === selected}>
                  <button
                    type="button"
                    onClick={() => choose(hit.file.id)}
                    onMouseEnter={() => setSelected(i)}
                    className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-colors ${
                      i === selected ? 'bg-ide-raised text-syntax-text' : 'text-syntax-dim'
                    }`}
                  >
                    <FileIcon file={hit.file} className="h-4 w-4" />
                    <span className="truncate">
                      <Highlight text={hit.file.path} positions={hit.positions} />
                    </span>
                    <span className="ml-auto shrink-0 text-2xs text-syntax-faint">
                      {LANGUAGE_LABEL[hit.file.language]}
                    </span>
                  </button>
                </li>
              ))}

              {hits.length === 0 && (
                <li className="px-3 py-4 text-center text-xs text-syntax-faint">No matching files</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

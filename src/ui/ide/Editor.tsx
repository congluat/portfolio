import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { VscChevronRight } from 'react-icons/vsc'
import type { VirtualFile } from './files'
import FileIcon from './FileIcon'
import { lineLength, renderLine } from './tokens'

interface EditorProps {
  file: VirtualFile | null
  cursorLine: number
  onCursorChange: (line: number, col: number) => void
  onOpenPalette: () => void
}

/** Long files still finish revealing inside this budget. */
const MAX_REVEAL = 0.45

interface BreadcrumbsProps {
  file: VirtualFile
}

function Breadcrumbs({ file }: BreadcrumbsProps) {
  const parts = file.path.split('/')

  return (
    <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-ide-line/40 px-3 py-1.5 text-2xs text-syntax-faint">
      {parts.map((part, i) => (
        <span key={part} className="flex shrink-0 items-center gap-1">
          {i > 0 && <VscChevronRight className="h-3 w-3" />}
          {i === parts.length - 1 && <FileIcon file={file} className="h-3 w-3" />}
          <span className={i === parts.length - 1 ? 'text-syntax-dim' : ''}>{part}</span>
        </span>
      ))}
    </div>
  )
}

interface EmptyStateProps {
  onOpenPalette: () => void
}

function EmptyState({ onOpenPalette }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm text-syntax-faint">No file open</p>
      <button
        type="button"
        onClick={onOpenPalette}
        className="rounded-sm border border-ide-line px-3 py-1.5 text-xs text-syntax-dim transition-colors hover:border-syntax-blue/60 hover:text-syntax-text"
      >
        Open a file
        <span className="ml-2 rounded-sm bg-ide-raised px-1.5 py-0.5 text-2xs text-syntax-faint">
          Ctrl K
        </span>
      </button>
    </div>
  )
}

export default function Editor({ file, cursorLine, onCursorChange, onOpenPalette }: EditorProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [file?.id])

  if (!file) return <EmptyState onOpenPalette={onOpenPalette} />

  const gutterWidth = `${String(file.lines.length).length + 1}ch`
  const step = Math.min(0.016, MAX_REVEAL / Math.max(file.lines.length, 1))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Breadcrumbs file={file} />

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto">
        <div key={file.id} className="py-3 text-xs leading-[1.65] sm:text-[13px]">
          {file.lines.map((line, i) => {
            const number = i + 1
            const active = number === cursorLine

            return (
              <motion.div
                key={`${file.id}-${i}`}
                initial={reduced ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * step, MAX_REVEAL), duration: 0.2 }}
                className={`flex gap-3 px-2 sm:px-4 ${active ? 'bg-ide-raised/35' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => onCursorChange(number, lineLength(line) + 1)}
                  aria-label={`Go to line ${number}`}
                  className={`shrink-0 select-none text-right tabular transition-colors hover:text-syntax-text ${
                    active ? 'text-syntax-peach' : 'text-syntax-faint/60'
                  }`}
                  style={{ width: gutterWidth }}
                >
                  {number}
                </button>

                <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
                  {line.length === 0 ? '\u00a0' : renderLine(line)}
                  {active && (
                    <span
                      aria-hidden
                      className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-blink bg-syntax-blue"
                    />
                  )}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

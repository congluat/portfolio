import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VscChevronDown, VscChevronRight, VscSearch } from 'react-icons/vsc'
import { FOLDERS, ROOT_FILES, WORKSPACE_META, WORKSPACE_NAME } from './files'
import type { VirtualFile } from './files'
import FileIcon from './FileIcon'

interface SidebarProps {
  activeId: string | null
  openIds: string[]
  onOpen: (id: string) => void
  onOpenPalette: () => void
}

interface FileRowProps {
  file: VirtualFile
  depth: number
  active: boolean
  open: boolean
  onOpen: (id: string) => void
}

function FileRow({ file, depth, active, open, onOpen }: FileRowProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(file.id)}
      aria-current={active ? 'true' : undefined}
      className={`group flex w-full items-center gap-2 py-1 pr-2 text-left text-xs transition-colors ${
        active
          ? 'bg-ide-raised text-syntax-text'
          : open
            ? 'text-syntax-dim hover:bg-ide-raised/50'
            : 'text-syntax-faint hover:bg-ide-raised/50 hover:text-syntax-dim'
      }`}
      style={{ paddingLeft: `${depth * 14 + 12}px` }}
    >
      <FileIcon file={file} className="h-3.5 w-3.5" />
      <span className="truncate">{file.name}</span>
      {active && <span className="ml-auto h-1 w-1 shrink-0 rounded-full bg-syntax-blue" />}
    </button>
  )
}

export default function Sidebar({ activeId, openIds, onOpen, onOpenPalette }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<string[]>([])

  const toggle = (name: string) =>
    setCollapsed((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  return (
    <div className="flex h-full w-full flex-col bg-ide-side">
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-2xs uppercase tracking-[0.18em] text-syntax-faint">Explorer</span>
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open command palette"
          className="rounded-sm p-1 text-syntax-faint transition-colors hover:bg-ide-raised hover:text-syntax-text"
        >
          <VscSearch className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 px-3 pb-1 text-2xs font-semibold uppercase tracking-wider text-syntax-dim">
        <VscChevronDown className="h-3.5 w-3.5 shrink-0" />
        {WORKSPACE_NAME}
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto pb-3" aria-label="Files">
        {FOLDERS.map((folder) => {
          const isCollapsed = collapsed.includes(folder.name)
          return (
            <div key={folder.name}>
              <button
                type="button"
                onClick={() => toggle(folder.name)}
                aria-expanded={!isCollapsed}
                className="flex w-full items-center gap-1 py-1 pl-3 pr-2 text-left text-xs text-syntax-dim transition-colors hover:bg-ide-raised/50"
              >
                {isCollapsed ? (
                  <VscChevronRight className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <VscChevronDown className="h-3.5 w-3.5 shrink-0" />
                )}
                <span className="text-syntax-yellow/90">{folder.name}</span>
                <span className="ml-auto text-2xs text-syntax-faint">{folder.files.length}</span>
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {folder.files.map((file) => (
                      <FileRow
                        key={file.id}
                        file={file}
                        depth={1}
                        active={activeId === file.id}
                        open={openIds.includes(file.id)}
                        onOpen={onOpen}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {ROOT_FILES.map((file) => (
          <FileRow
            key={file.id}
            file={file}
            depth={0}
            active={activeId === file.id}
            open={openIds.includes(file.id)}
            onOpen={onOpen}
          />
        ))}
      </nav>

      <div className="border-t border-ide-line/60 px-3 py-2 text-2xs text-syntax-faint">
        {WORKSPACE_META}
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { VscClose, VscMenu } from 'react-icons/vsc'
import type { VirtualFile } from './files'
import FileIcon from './FileIcon'

interface TabBarProps {
  tabs: VirtualFile[]
  activeId: string | null
  onSelect: (id: string) => void
  onClose: (id: string) => void
  onToggleDrawer: () => void
}

export default function TabBar({ tabs, activeId, onSelect, onClose, onToggleDrawer }: TabBarProps) {
  return (
    <div className="flex shrink-0 items-stretch border-b border-ide-line/70 bg-ide-crust">
      <button
        type="button"
        onClick={onToggleDrawer}
        aria-label="Toggle file explorer"
        className="flex w-10 shrink-0 items-center justify-center border-r border-ide-line/70 text-syntax-dim transition-colors hover:bg-ide-raised hover:text-syntax-text md:hidden"
      >
        <VscMenu className="h-4 w-4" />
      </button>

      <div className="flex min-w-0 flex-1 overflow-x-auto">
        {tabs.map((file) => {
          const active = file.id === activeId
          return (
            <div
              key={file.id}
              className={`group relative flex shrink-0 items-center border-r border-ide-line/70 transition-colors ${
                active ? 'bg-ide-bg' : 'bg-ide-crust hover:bg-ide-side'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="ide-tab-active"
                  className="absolute inset-x-0 top-0 h-px bg-syntax-blue"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              <button
                type="button"
                onClick={() => onSelect(file.id)}
                className={`flex items-center gap-2 py-2 pl-3 pr-1 text-xs transition-colors ${
                  active ? 'text-syntax-text' : 'text-syntax-faint group-hover:text-syntax-dim'
                }`}
              >
                <FileIcon file={file} className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{file.name}</span>
              </button>

              <button
                type="button"
                onClick={() => onClose(file.id)}
                aria-label={`Close ${file.name}`}
                className={`mr-1.5 rounded-sm p-0.5 transition-colors hover:bg-ide-raised hover:text-syntax-text ${
                  active ? 'text-syntax-dim' : 'text-transparent group-hover:text-syntax-faint'
                }`}
              >
                <VscClose className="h-3.5 w-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

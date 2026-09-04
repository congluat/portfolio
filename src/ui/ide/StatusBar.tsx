import { VscBell, VscCheck, VscError, VscSourceControl, VscWarning } from 'react-icons/vsc'
import { LANGUAGE_LABEL } from './files'
import type { VirtualFile } from './files'

interface StatusBarProps {
  file: VirtualFile | null
  cursorLine: number
  cursorCol: number
}

export default function StatusBar({ file, cursorLine, cursorCol }: StatusBarProps) {
  return (
    <footer className="flex h-6 shrink-0 items-center gap-3 border-t border-ide-line/70 bg-ide-crust px-2 text-2xs text-syntax-dim sm:px-3">
      <span className="flex items-center gap-1 text-syntax-blue">
        <VscSourceControl className="h-3 w-3" />
        main
      </span>

      <span className="hidden items-center gap-2 sm:flex">
        <span className="flex items-center gap-1">
          <VscError className="h-3 w-3" />0
        </span>
        <span className="flex items-center gap-1">
          <VscWarning className="h-3 w-3" />0
        </span>
      </span>

      <span className="hidden items-center gap-1 text-syntax-green md:flex">
        <VscCheck className="h-3 w-3" />
        build passing
      </span>

      <span className="ml-auto flex items-center gap-3">
        <span className="tabular">
          Ln {cursorLine}, Col {cursorCol}
        </span>
        <span className="hidden sm:inline">Spaces: 2</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <span className="text-syntax-mauve">{file ? LANGUAGE_LABEL[file.language] : 'Plain Text'}</span>
        <span aria-hidden className="inline-block h-3 w-[6px] animate-blink bg-syntax-text/70" />
        <VscBell className="hidden h-3 w-3 sm:block" aria-hidden />
      </span>
    </footer>
  )
}

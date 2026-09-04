import { VscJson, VscMarkdown, VscSymbolNamespace } from 'react-icons/vsc'
import CompanyLogo from '../../components/CompanyLogo'
import type { VirtualFile } from './files'

interface FileIconProps {
  file: VirtualFile
  className?: string
}

export default function FileIcon({ file, className = 'h-4 w-4' }: FileIconProps) {
  if (file.logo && file.company) {
    return (
      <CompanyLogo
        src={file.logo}
        company={file.company}
        className={`${className} rounded-sm bg-white p-px`}
        fallbackClassName="text-ide-bg"
      />
    )
  }

  if (file.language === 'json') return <VscJson className={`${className} shrink-0 text-syntax-yellow`} />
  if (file.language === 'typescript')
    return <VscSymbolNamespace className={`${className} shrink-0 text-syntax-blue`} />

  return <VscMarkdown className={`${className} shrink-0 text-syntax-mauve`} />
}

import { useEffect, useState } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'

/**
 * Every virtual file is stored as arrays of tokens rather than raw strings, so
 * highlighting is a lookup instead of a parse — no highlighter dependency.
 */
export type TokenKind =
  | 'text'
  | 'dim'
  | 'faint'
  | 'punct'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bold'
  | 'quote'
  | 'bullet'
  | 'code'
  | 'key'
  | 'string'
  | 'number'
  | 'keyword'
  | 'comment'
  | 'link'

export interface Token {
  text: string
  kind?: TokenKind
  /** Renders the token as an anchor. */
  href?: string
  /** Renders the token as a button that writes this value to the clipboard. */
  copy?: string
}

export type Line = Token[]

const KIND_CLASS: Record<TokenKind, string> = {
  text: 'text-syntax-text',
  dim: 'text-syntax-dim',
  faint: 'text-syntax-faint',
  punct: 'text-syntax-faint',
  h1: 'font-bold text-syntax-blue',
  h2: 'font-semibold text-syntax-mauve',
  h3: 'font-semibold text-syntax-yellow',
  bold: 'font-semibold text-syntax-peach',
  quote: 'italic text-syntax-dim',
  bullet: 'text-syntax-yellow',
  code: 'text-syntax-green',
  key: 'text-syntax-blue',
  string: 'text-syntax-green',
  number: 'text-syntax-peach',
  keyword: 'text-syntax-mauve',
  comment: 'italic text-syntax-faint',
  link: 'text-syntax-blue underline decoration-syntax-blue/40 underline-offset-2 transition-colors hover:text-syntax-green hover:decoration-syntax-green/60',
}

function classFor(kind: TokenKind | undefined) {
  return KIND_CLASS[kind ?? 'text']
}

export function lineLength(line: Line) {
  return line.reduce((total, token) => total + token.text.length, 0)
}

interface CopyTokenProps {
  token: Token
  value: string
}

function CopyToken({ token, value }: CopyTokenProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(id)
  }, [copied])

  const write = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={write}
      aria-label={`Copy ${value} to clipboard`}
      className={`inline-flex items-baseline gap-1 rounded-sm bg-syntax-green/10 px-1 transition-colors hover:bg-syntax-green/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-syntax-blue ${classFor(
        token.kind,
      )}`}
    >
      {token.text}
      <span className="translate-y-px text-syntax-faint" aria-hidden>
        {copied ? <VscCheck className="h-3 w-3 text-syntax-green" /> : <VscCopy className="h-3 w-3" />}
      </span>
      <span className="sr-only">{copied ? 'copied' : ''}</span>
    </button>
  )
}

interface TokenSpanProps {
  token: Token
}

export function TokenSpan({ token }: TokenSpanProps) {
  if (token.copy) return <CopyToken token={token} value={token.copy} />

  if (token.href) {
    const external = token.href.startsWith('http')
    return (
      <a
        href={token.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={`rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-syntax-blue ${classFor(token.kind)}`}
      >
        {token.text}
      </a>
    )
  }

  return <span className={classFor(token.kind)}>{token.text}</span>
}

export function renderLine(line: Line) {
  return line.map((token, i) => <TokenSpan key={i} token={token} />)
}

import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#§$%&'

const scramble = (text: string, revealed: number) =>
  text
    .split('')
    .map((ch, i) => {
      if (ch === ' ') return ' '
      if (i < revealed) return ch
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    .join('')

interface ScrambleTextProps {
  text: string
  /** Delay before the reveal starts, in ms */
  delay?: number
  /** Characters resolved per frame */
  speed?: number
  className?: string
}

export default function ScrambleText({
  text,
  delay = 0,
  speed = 0.4,
  className,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(() => scramble(text, 0))
  const frame = useRef(0)

  useEffect(() => {
    let raf = 0
    frame.current = 0

    const tick = () => {
      const revealed = frame.current * speed
      setDisplay(scramble(text, revealed))
      frame.current += 1

      if (revealed <= text.length) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, delay, speed])

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  )
}

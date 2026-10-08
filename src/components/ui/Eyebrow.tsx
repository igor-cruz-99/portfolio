import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = { children: ReactNode; tone?: 'dark' | 'paper'; className?: string }

export function Eyebrow({ children, tone = 'dark', className }: Props) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-mono text-xs leading-none font-medium tracking-[.18em] uppercase',
        tone === 'dark' ? 'text-fg-dim' : 'text-[#6b645c]',
        className,
      )}
    >
      <span aria-hidden="true" className="bg-sunset h-px w-7" />
      {children}
    </p>
  )
}

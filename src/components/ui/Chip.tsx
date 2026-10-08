import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Chip({ children, strong }: { children: ReactNode; strong?: boolean }) {
  return (
    <li
      className={cn(
        'rounded-full border px-3 py-[9px] text-[13px] leading-none font-medium transition duration-250 hover:-translate-y-0.5 hover:border-sun-3',
        strong ? 'border-ink bg-ink text-paper' : 'border-[#cfc8bf] bg-white text-ink',
      )}
    >
      {children}
    </li>
  )
}

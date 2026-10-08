import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

type Props = { eyebrow: string; title?: ReactNode; tone?: 'dark' | 'paper' }

export function SectionHeader({ eyebrow, title, tone = 'dark' }: Props) {
  return (
    <div className="mb-[clamp(40px,6vw,72px)] grid gap-[22px]">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      {title && (
        <h2
          className={cn(
            'font-title min-w-0 text-[clamp(40px,11vw,120px)] leading-[.92] font-extrabold tracking-[.01em] hyphens-auto [overflow-wrap:break-word]',
            tone === 'paper' ? 'text-ink' : 'text-fg',
          )}
        >
          {title}
        </h2>
      )}
    </div>
  )
}

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type Props = { icon: LucideIcon; size?: 'md' | 'lg'; className?: string }

// Quadrado preto com ícone em laranja — marcador das colunas e cartões.
export function IconTile({ icon: Icon, size = 'lg', className }: Props) {
  return (
    <div
      className={cn(
        'grid place-items-center rounded-[14px] bg-ink text-sun-2',
        size === 'lg' ? 'size-12' : 'size-11',
        className,
      )}
    >
      <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden="true" />
    </div>
  )
}

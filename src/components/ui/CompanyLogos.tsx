import { cn } from '@/lib/cn'

type Props = {
  logos: { src: string; alt: string }[]
  /** emprego atual: colorido e com a borda girando sempre */
  live?: boolean
  size?: 'md' | 'sm'
}

// Logo(s) da empresa numa moldura com borda sunset (efeito em globals.css, classe .logo-ring).
// Mais de uma logo = moldurinhas sobrepostas.
export function CompanyLogos({ logos, live, size = 'md' }: Props) {
  const box = size === 'md' ? 'size-[52px]' : 'size-11'
  return (
    <div className="flex flex-none items-center">
      {logos.map((l, i) => (
        <span
          key={l.src + i}
          className={cn('logo-ring', box, live && 'is-live', i > 0 && '-ml-4 ring-2 ring-ink')}
          style={{ zIndex: logos.length - i }}
        >
          <img src={l.src} alt={l.alt} width={80} height={80} loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  )
}

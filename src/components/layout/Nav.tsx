import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { person } from '@/data/resume'
import { cn } from '@/lib/cn'
import { SignatureMark } from '@/components/ui/SignatureMark'

const links = [
  { href: '#perfil', label: 'Perfil' },
  { href: '#competencias', label: 'Competências' },
  { href: '#fluxos', label: 'Fluxos' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#formacao', label: 'Formação' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background,backdrop-filter] duration-400',
        scrolled && 'border-b border-line bg-ink/70 backdrop-blur-md',
      )}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex-none pt-2 no-underline" aria-label={`${person.shortName}, início`}>
          <SignatureMark className="text-[34px]">{person.shortName}</SignatureMark>
        </a>
        <ul className="m-0 hidden list-none gap-7 p-0 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs font-medium tracking-[.14em] text-fg-dim uppercase no-underline transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contato"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 font-mono text-xs font-medium tracking-[.12em] uppercase no-underline transition-colors hover:border-sun-2"
        >
          <Send className="size-4" strokeWidth={1.6} aria-hidden="true" />
          Contato
        </a>
      </div>
    </nav>
  )
}

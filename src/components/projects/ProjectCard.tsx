import { ArrowUpRight, Layers, ScrollText } from 'lucide-react'
import { projectPages, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

type Props = { project: Project; onOpen: () => void }

export function ProjectCard({ project, onOpen }: Props) {
  const pages = projectPages(project)
  const multi = pages.length > 1
  const fullpage = project.kind === 'fullpage'

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Abrir ${project.title}${multi ? `, ${pages.length} páginas` : fullpage ? ', página completa' : ''}`}
      className={cn(
        'group relative flex w-full cursor-pointer flex-col text-left transition duration-350 hover:-translate-y-1',
        // folhas empilhadas atrás do cartão indicam que há mais de uma tela
        multi && 'mt-3',
      )}
    >
      {multi && (
        <>
          <span aria-hidden="true" className="absolute inset-x-6 -top-3 h-6 rounded-t-[18px] border border-b-0 border-line bg-ink-3/60 transition-transform duration-350 group-hover:-translate-y-1" />
          <span aria-hidden="true" className="absolute inset-x-3 -top-1.5 h-6 rounded-t-[20px] border border-b-0 border-line bg-ink-3 transition-transform duration-350 group-hover:-translate-y-0.5" />
        </>
      )}

      <div className="relative flex w-full flex-col overflow-hidden rounded-[22px] border border-line bg-ink-2 transition duration-350 group-hover:border-sun-2/60 group-hover:shadow-[0_24px_60px_-30px_rgb(255_106_26/.55)]">
        {/* Moldura de navegador; num print de página inteira, o hover rola até o rodapé */}
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden="true">
          <i className="size-2 rounded-full bg-sun-3" />
          <i className="size-2 rounded-full bg-ink-3" />
          <i className="size-2 rounded-full bg-ink-3" />
          {multi && (
            <span className="ml-auto flex gap-1">
              {pages.map((pg, i) => (
                <span
                  key={pg.label}
                  className={cn(
                    'rounded-md px-2 py-0.5 font-mono text-[10px] tracking-[.06em]',
                    i === 0 ? 'bg-sun-2/15 text-sun-2' : 'text-fg-mute',
                  )}
                >
                  {pg.label}
                </span>
              ))}
            </span>
          )}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-paper">
          <img
            src={project.image}
            alt=""
            width={project.width}
            height={project.height}
            loading="lazy"
            decoding="async"
            className={cn(
              'h-full w-full object-cover',
              fullpage && 'object-top transition-[object-position] duration-[6s] ease-in-out group-hover:object-bottom group-focus-visible:object-bottom',
            )}
          />
          {(multi || fullpage) && (
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[11px] tracking-[.08em] text-fg uppercase backdrop-blur-sm">
              {multi ? <Layers className="size-3.5" aria-hidden="true" /> : <ScrollText className="size-3.5" aria-hidden="true" />}
              {multi ? `${pages.length} páginas` : 'Página completa'}
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4 p-5">
          <div className="min-w-0">
            <h3 className="font-title tracking-[.03em] text-[26px] leading-tight font-bold">{project.title}</h3>
            <p className="mt-1.5 text-sm text-fg-dim">{project.subtitle}</p>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0">
              {project.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-dim">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <span className="grid size-10 flex-none place-items-center rounded-full border border-line transition-colors group-hover:bg-sunset group-hover:border-transparent group-hover:text-ink">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </button>
  )
}

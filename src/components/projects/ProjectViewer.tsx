import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import { projectPages, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

type Props = {
  projects: Project[]
  index: number | null
  onIndexChange: (i: number | null) => void
}

const iconBtn =
  'grid size-11 flex-none cursor-pointer place-items-center rounded-xl border border-line bg-ink-2 text-fg transition-colors hover:border-sun-2 disabled:cursor-not-allowed disabled:opacity-35'

// Visualizador em tela cheia (<dialog> nativo: Esc fecha, foco fica preso dentro).
// Prints de página inteira aparecem ampliados e rolam até o rodapé do site.
export function ProjectViewer({ projects, index, onIndexChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const open = index !== null
  const project = open ? projects[index] : undefined
  const pages = project ? projectPages(project) : []
  // página escolhida vale só para o projeto aberto: trocar de projeto volta à primeira
  const [pageSel, setPageSel] = useState({ index: -1, page: 0 })
  const page = pageSel.index === index ? pageSel.page : 0
  const current = pages[page]
  const multi = pages.length > 1
  // chave da tela aberta: progresso e zoom valem só para ela, sem efeito extra para zerar
  const view = open ? `${index}:${page}` : ''
  const [scrolled, setScrolled] = useState({ view: '', value: 0 })
  const [zoomFor, setZoomFor] = useState<string | null>(null)
  const progress = scrolled.view === view ? scrolled.value : 0
  const zoomed = open && zoomFor === view

  // abre/fecha o dialog e trava a rolagem da página por trás
  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  // arrastar com o mouse para navegar pela imagem ampliada (no toque a rolagem já é nativa)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const dragToPan = {
    onPointerDown: (e: ReactPointerEvent) => {
      const el = scroller.current
      if (e.pointerType !== 'mouse' || e.button !== 0 || !el) return
      drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop }
    },
    onPointerMove: (e: ReactPointerEvent) => {
      const el = scroller.current
      if (!drag.current || !el) return
      el.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
      el.scrollTop = drag.current.top - (e.clientY - drag.current.y)
    },
    onPointerUp: () => { drag.current = null },
    onPointerLeave: () => { drag.current = null },
  }

  const onScroll = () => {
    const el = scroller.current
    if (!el || index === null) return
    const max = el.scrollHeight - el.clientHeight
    setScrolled({ view, value: max > 0 ? el.scrollTop / max : 1 })
  }

  const close = () => {
    setZoomFor(null)
    setPageSel({ index: -1, page: 0 })
    onIndexChange(null)
  }

  const goPage = (p: number) => {
    if (index === null || p < 0 || p >= pages.length) return
    setPageSel({ index, page: p })
  }

  const go = (delta: number) => {
    if (index === null) return
    const next = index + delta
    if (next >= 0 && next < projects.length) onIndexChange(next)
  }

  return (
    <dialog
      ref={dialog}
      onClose={close}
      onCancel={(e) => {
        // Esc: fecha pelo estado do React, sem depender do evento 'close'
        e.preventDefault()
        close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      aria-label={project ? `${project.title}: visualização ampliada` : 'Visualização do projeto'}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-fg backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="flex h-full flex-col">
          <header className="relative flex flex-wrap items-center gap-3 border-b border-line bg-ink px-[clamp(16px,3vw,32px)] pt-[calc(12px+env(safe-area-inset-top,0px))] pb-3">
            <div className="min-w-0 flex-1 basis-full sm:basis-0">
              <p className="font-mono text-[11px] tracking-[.14em] text-sun-2 uppercase">
                {projects.length > 1 && `${index! + 1} / ${projects.length}`}
                {projects.length > 1 && multi && ' · '}
                {multi && <span className={projects.length > 1 ? 'text-fg-dim' : undefined}>Página {page + 1} de {pages.length}</span>}
              </p>
              <h3 className="font-title tracking-[.03em] truncate text-[26px] leading-tight font-bold">{project.title}</h3>
            </div>
            {multi && (
              // telas do mesmo projeto (ex.: páginas do dashboard)
              <div role="tablist" aria-label="Páginas do projeto" className="order-last flex basis-full gap-1.5 overflow-x-auto">
                {pages.map((pg, i) => (
                  <button
                    key={pg.label}
                    type="button"
                    role="tab"
                    aria-selected={i === page}
                    onClick={() => goPage(i)}
                    className={cn(
                      'inline-flex min-h-10 flex-none cursor-pointer items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors sm:px-4',
                      i === page ? 'bg-sunset border-transparent text-ink' : 'border-line text-fg-dim hover:border-sun-2 hover:text-fg',
                    )}
                  >
                    <span className="hidden font-mono text-[11px] opacity-70 sm:inline">{i + 1}</span>
                    {pg.label}
                  </button>
                ))}
              </div>
            )}
{projects.length > 1 && (
              <>
            <button type="button" className={iconBtn} onClick={() => go(-1)} disabled={index === 0} aria-label="Projeto anterior">
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={iconBtn}
              onClick={() => go(1)}
              disabled={index === projects.length - 1}
              aria-label="Próximo projeto"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
              </>
            )}
            <button
              type="button"
              className={iconBtn}
              onClick={() => setZoomFor(zoomed ? null : view)}
              aria-label={zoomed ? 'Ajustar à tela' : 'Ver em tamanho real'}
              aria-pressed={zoomed}
            >
              {zoomed ? <ZoomOut className="size-4" aria-hidden="true" /> : <ZoomIn className="size-4" aria-hidden="true" />}
            </button>
            <button type="button" className={iconBtn} onClick={close} aria-label="Fechar">
              <X className="size-4" aria-hidden="true" />
            </button>
            {/* quanto do site já foi percorrido */}
            <span
              aria-hidden="true"
              className="bg-sunset absolute bottom-0 left-0 h-0.5 origin-left"
              style={{ width: '100%', transform: `scaleX(${progress})` }}
            />
          </header>

          {/* key: cada projeto remonta o rolador e começa do topo */}
          <div
            key={view}
            ref={scroller}
            onScroll={onScroll}
            {...(zoomed ? dragToPan : {})}
            className={cn('relative min-h-0 flex-1 overflow-auto overscroll-contain', zoomed && 'cursor-grab active:cursor-grabbing select-none')}
            tabIndex={0}
          >
            <div
              className="mx-auto px-[clamp(0px,3vw,32px)] py-[clamp(0px,3vw,32px)]"
              // ajustado: cabe na largura da tela; tamanho real: largura original, com rolagem nos dois sentidos
              style={zoomed ? { width: 'max-content' } : { maxWidth: current.kind === 'fullpage' ? 1180 : 1600 }}
            >
              <img
                src={current.image}
                alt={multi ? `${project.title}, página ${current.label}` : `${project.title}: ${project.subtitle}`}
                width={current.width}
                height={current.height}
                draggable={false}
                style={zoomed ? { width: current.width, maxWidth: 'none' } : undefined}
                className="mx-auto block h-auto w-full rounded-none shadow-[0_40px_120px_-40px_rgb(0_0_0/.8)] sm:rounded-xl"
              />
              {multi && page < pages.length - 1 ? (
                <div className="grid place-items-center py-8">
                  <button
                    type="button"
                    onClick={() => goPage(page + 1)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-sun-2"
                  >
                    Próxima página: {pages[page + 1].label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                current.kind === 'fullpage' && (
                  <p className="py-8 text-center font-mono text-xs tracking-[.14em] text-fg-mute uppercase">Fim da página</p>
                )
              )}
            </div>

            {current.kind === 'fullpage' && progress > 0.08 && (
              <button
                type="button"
                onClick={() => scroller.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Voltar ao topo do site"
                className={cn(
                  iconBtn,
                  'sticky bottom-[calc(20px+env(safe-area-inset-bottom,0px))] left-full mr-5 -mt-11 rounded-full bg-sunset border-transparent text-ink hover:border-transparent',
                )}
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}

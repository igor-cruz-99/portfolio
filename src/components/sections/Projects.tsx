import { useState } from 'react'
import { ChartColumn, Globe, ImagePlus, Workflow, type LucideIcon } from 'lucide-react'
import { projectCategories, type ProjectCategoryId } from '@/data/projects'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectViewer } from '@/components/projects/ProjectViewer'
import { cn } from '@/lib/cn'

const icons: Record<ProjectCategoryId, LucideIcon> = {
  dashboards: ChartColumn,
  automations: Workflow,
  sites: Globe,
}

export function Projects() {
  // abre na primeira categoria que já tem trabalhos
  const [active, setActive] = useState<ProjectCategoryId>(
    () => projectCategories.find((c) => c.items.length)?.id ?? projectCategories[0].id,
  )
  const [viewing, setViewing] = useState<number | null>(null)
  const category = projectCategories.find((c) => c.id === active)!

  return (
    <section id="projetos" className="pb-[clamp(80px,11vw,150px)]">
      <div className="wrap">
        <SectionHeader
          eyebrow="Projetos"
          title={
            <>
              Trabalhos <span className="text-sunset">entregues</span>.
            </>
          }
        />

        <div role="tablist" aria-label="Categorias de projetos" className="flex flex-wrap gap-2.5">
          {projectCategories.map((c) => {
            const Icon = icons[c.id]
            const selected = c.id === active
            return (
              <button
                key={c.id}
                id={`tab-${c.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                onClick={() => setActive(c.id)}
                className={cn(
                  'inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-5 text-sm font-semibold transition duration-250',
                  selected
                    ? 'bg-sunset border-transparent text-ink shadow-[0_12px_30px_-12px_rgb(255_106_26/.7)]'
                    : 'border-line text-fg hover:border-sun-2',
                )}
              >
                <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                {c.label}
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums',
                    selected ? 'bg-ink/15' : 'bg-ink-3 text-fg-dim',
                  )}
                >
                  {c.items.length}
                </span>
              </button>
            )
          })}
        </div>

        <div id={`panel-${category.id}`} role="tabpanel" aria-labelledby={`tab-${category.id}`} className="mt-8">
          <p className="mb-7 max-w-[60ch] text-fg-dim">{category.blurb}</p>

          {category.items.length ? (
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
              {category.items.map((p, i) => (
                <ProjectCard key={p.id} project={p} onOpen={() => setViewing(i)} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center gap-3 rounded-[22px] border border-dashed border-line px-6 py-16 text-center">
              <ImagePlus className="size-7 text-sun-2" strokeWidth={1.5} aria-hidden="true" />
              <p className="font-disp text-lg font-bold">Galeria em preparação</p>
              <p className="max-w-[42ch] text-sm text-fg-dim">
                Os prints de {category.label.toLowerCase()} estão sendo selecionados e aparecem aqui em breve.
              </p>
            </div>
          )}
        </div>
      </div>

      <ProjectViewer key={active} projects={category.items} index={viewing} onIndexChange={setViewing} />
    </section>
  )
}

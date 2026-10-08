import {
  BellRing, CalendarCheck, ChartColumn, Database, Download, FileInput, GitBranch, Layers,
  MousePointerClick, Shuffle, type LucideIcon,
} from 'lucide-react'
import { flows, type FlowNode, type FlowNodeIcon } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/cn'

const icons: Record<FlowNodeIcon, LucideIcon> = {
  layers: Layers, download: Download, shuffle: Shuffle, database: Database, chart: ChartColumn,
  click: MousePointerClick, form: FileInput, branch: GitBranch, calendar: CalendarCheck, bell: BellRing,
}

function PipelineNode({ node }: { node: FlowNode }) {
  const Icon = icons[node.icon]
  return (
    <li className="group relative flex min-w-0 items-center gap-3 px-1.5 text-left md:flex-col md:text-center">
      <div
        className={cn(
          'relative z-10 grid size-[54px] flex-none place-items-center rounded-2xl border transition duration-350 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_-10px_rgb(255_106_26/.5)]',
          node.hot ? 'bg-sunset border-transparent text-ink' : 'border-line bg-ink-3 text-fg group-hover:border-sun-2',
        )}
      >
        <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <div>
        <strong className="font-disp block text-sm leading-tight font-semibold">{node.title}</strong>
        <span className="font-mono text-xs leading-snug text-fg-mute">{node.sub}</span>
      </div>
    </li>
  )
}

export function Flows() {
  return (
    <section id="fluxos" className="py-[clamp(80px,11vw,150px)]">
      <div className="wrap">
        <SectionHeader
          eyebrow="Como eu trabalho"
          title={
            <>
              Fluxos que eu <span className="text-sunset">construo</span>.
            </>
          }
        />
        <div className="grid gap-[26px]">
          {flows.map((f) => (
            <article
              key={f.title}
              className="relative overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(180deg,var(--color-ink-2),var(--color-ink))] p-[clamp(22px,3vw,36px)]"
            >
              <div className="mb-[26px] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5">
                <div>
                  <p className="font-mono text-[11px] leading-none font-medium tracking-[.16em] text-sun-2 uppercase">{f.tag}</p>
                  <h3 className="font-title tracking-[.03em] mt-2.5 text-[28px] font-bold">{f.title}</h3>
                </div>
                <p className="max-w-[52ch] text-[14.5px] text-fg-dim">{f.desc}</p>
              </div>
              <ol className="relative m-0 grid list-none gap-3.5 p-0 md:grid-cols-5 md:gap-0">
                {/* linha tracejada animada que liga as etapas */}
                <span
                  aria-hidden="true"
                  className="dash-v absolute top-[27px] bottom-[27px] left-[33px] w-px md:hidden"
                />
                <span
                  aria-hidden="true"
                  className="dash-h animate-flowdash absolute top-[27px] right-[10%] left-[10%] hidden h-px md:block"
                />
                {f.nodes.map((n) => (
                  <PipelineNode key={n.title} node={n} />
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

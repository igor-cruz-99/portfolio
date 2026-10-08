import { Database, LayoutTemplate, Workflow, type LucideIcon } from 'lucide-react'
import { skillGroups, type SkillGroup } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IconTile } from '@/components/ui/IconTile'
import { Chip } from '@/components/ui/Chip'
import { SqlCard } from './SqlCard'

const icons: Record<SkillGroup['id'], LucideIcon> = {
  data: Database,
  automation: Workflow,
  web: LayoutTemplate,
}

export function Skills() {
  return (
    <section id="competencias" className="bg-paper py-[clamp(80px,11vw,150px)] text-ink">
      <div className="wrap">
        <SectionHeader
          tone="paper"
          eyebrow="Competências técnicas"
          title={
            <>
              Da base de dados
              <br />
              ao dashboard.
            </>
          }
        />

        <div className="grid gap-px overflow-hidden rounded-[22px] border border-paper-line bg-paper-line lg:grid-cols-3">
          {skillGroups.map((g) => (
            <article
              key={g.id}
              className="group relative flex flex-col gap-[22px] bg-paper p-[clamp(24px,3vw,38px)] transition-colors duration-350 hover:bg-[#fffdfa]"
            >
              <span
                aria-hidden="true"
                className="bg-sunset absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-x-100"
              />
              <IconTile icon={icons[g.id]} />
              <h3 className="font-title tracking-[.03em] text-[28px] font-bold">{g.title}</h3>
              <p className="text-[14.5px] text-paper-dim">{g.desc}</p>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {g.key.map((s) => (
                  <Chip key={s} strong>
                    {s}
                  </Chip>
                ))}
                {g.rest.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <SqlCard />
      </div>
    </section>
  )
}

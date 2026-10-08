import { Building2, GraduationCap, Languages, type LucideIcon } from 'lucide-react'
import { education, type EduItem } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IconTile } from '@/components/ui/IconTile'
import { cn } from '@/lib/cn'

const icons: Record<EduItem['icon'], LucideIcon> = {
  graduation: GraduationCap,
  building: Building2,
  languages: Languages,
}

export function Education() {
  return (
    <section id="formacao" className="bg-paper py-[clamp(80px,11vw,150px)] text-ink">
      <div className="wrap">
        <SectionHeader
          tone="paper"
          eyebrow="Formação acadêmica & idiomas"
          title={
            <>
              Base de gestão,
              <br />
              especialização em dados.
            </>
          }
        />
        <div className="grid gap-[18px] lg:grid-cols-3">
          {education.map((e) => (
            <article key={e.title} className="flex flex-col gap-3.5 rounded-[20px] border border-paper-line bg-white p-7">
              <IconTile icon={icons[e.icon]} size="md" />
              <h3 className="font-title tracking-[.03em] text-[26px] leading-tight font-bold">{e.title}</h3>
              {e.meters && (
                <div className="mt-1 grid gap-2.5">
                  {e.meters.map((m) => (
                    <div key={m.label} className="grid grid-cols-[92px_1fr] items-center gap-3 font-mono text-xs text-paper-dim">
                      {m.label}
                      <span className="relative h-1.5 overflow-hidden rounded-full bg-paper-2">
                        <span className="bg-sunset absolute inset-y-0 left-0 rounded-full" style={{ width: `${m.value}%` }} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-[14.5px] text-paper-dim">{e.text}</p>
              <p
                className={cn(
                  'mt-auto font-mono text-[11px] leading-none font-medium tracking-[.14em] uppercase',
                  e.ok ? 'text-sun-4' : 'text-[#8a8279]',
                )}
              >
                {e.ok && '● '}
                {e.status}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { traits } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Traits() {
  return (
    <section id="pessoal" className="py-[clamp(80px,11vw,150px)]">
      <div className="wrap">
        <SectionHeader eyebrow="Competências pessoais" title="Como eu penso." />
        <div className="grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((t) => (
            <div key={t.tag} className="grid content-start gap-3 bg-ink px-6 py-7 transition-colors duration-350 hover:bg-ink-2">
              <p className="font-mono text-[11px] leading-none font-medium tracking-[.16em] text-sun-2 uppercase">{t.tag}</p>
              <h3 className="font-title tracking-[.03em] text-[28px] font-bold">{t.title}</h3>
              <p className="text-[14.5px] text-fg-dim">{t.text}</p>
            </div>
          ))}
        </div>
        <p className="font-disp mt-[clamp(40px,6vw,70px)] max-w-[30ch] text-[clamp(22px,3vw,40px)] leading-tight font-medium tracking-[-.015em]">
          Soluções técnicas só importam quando viram <span className="text-sunset">resultado de negócio</span>.
        </p>
      </div>
    </section>
  )
}

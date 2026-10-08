import { facts, profileParagraphs } from '@/data/resume'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CountUp } from '@/components/ui/CountUp'

export function Profile() {
  return (
    <section id="perfil" className="py-[clamp(80px,11vw,150px)]">
      <div className="wrap">
        <SectionHeader eyebrow="Perfil profissional" />
        <div className="grid items-start gap-[clamp(32px,6vw,90px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <p className="font-disp max-w-[34ch] text-[clamp(22px,2.6vw,34px)] leading-[1.35] font-medium tracking-[-.01em]">
              Transformo dados dispersos em <em className="text-sunset not-italic">decisões</em> e processos manuais em{' '}
              <em className="text-sunset not-italic">fluxos que rodam sozinhos</em>.
            </p>
            <div className="mt-7 grid max-w-[62ch] gap-4 text-fg-dim">
              {profileParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          <dl className="m-0 border-t border-line">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[auto_1fr] items-baseline gap-[18px] border-b border-line py-[22px]">
                <dt className="font-disp text-[clamp(34px,3.6vw,46px)] leading-none font-bold tracking-[-.02em] tabular-nums">
                  {f.accent ? (
                    <span className="text-sunset">{f.value}</span>
                  ) : f.count ? (
                    <CountUp to={f.count} />
                  ) : (
                    f.value
                  )}
                  {f.unit && <span className="text-[.5em]"> {f.unit}</span>}
                </dt>
                <dd className="m-0 text-sm leading-[1.45] text-fg-dim">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

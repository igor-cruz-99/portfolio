import { MapPin } from 'lucide-react'
import { person } from '@/data/resume'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CopyButton } from '@/components/ui/CopyButton'
import { SignatureMark } from '@/components/ui/SignatureMark'
import { HalftoneBloom } from '@/components/effects/HalftoneBloom'
import { WhatsappCta } from './WhatsappCta'

function ContactLine({ label, value, id, copy }: { label: string; value: string; id: string; copy?: boolean }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-[18px] border border-line bg-ink/55 px-[22px] py-5 backdrop-blur-sm">
      <div className="min-w-0">
        <small className="mb-2 block font-mono text-[11px] leading-none font-medium tracking-[.16em] text-fg-mute uppercase">{label}</small>
        <strong id={id} className="text-[15px] leading-snug font-semibold [overflow-wrap:anywhere] select-all">
          {value}
        </strong>
      </div>
      {copy ? (
        <CopyButton value={value} targetId={id} label={`Copiar ${label.toLowerCase()}`} />
      ) : (
        <span className="grid size-11 flex-none place-items-center rounded-xl border border-line" aria-hidden="true">
          <MapPin className="size-4" />
        </span>
      )}
    </div>
  )
}

export function Contact() {
  return (
    <section
      id="contato"
      className="relative isolate flex min-h-[min(100svh,880px)] flex-col overflow-hidden pt-[clamp(72px,9vw,120px)] pb-10"
    >
      {/* fundo animado: retícula em degradê sunset que reage ao cursor */}
      <HalftoneBloom className="absolute inset-0 -z-20" background="#0b0a09" color1="#ff6a1a" color2="#704300" />
      {/* emenda com a seção de cima e escurece a base para o texto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-ink)_0%,rgb(11_10_9/0)_28%,rgb(11_10_9/0)_55%,rgb(11_10_9/.78)_100%)]"
      />
      {/* área livre sobre o efeito: chamada principal para o WhatsApp */}
      <WhatsappCta className="wrap flex-1 content-center py-[clamp(48px,8vw,96px)]" />

      <div className="wrap">
        <Eyebrow>Contato</Eyebrow>
        <h2 className="sr-only">Contato</h2>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          <ContactLine label="E-mail" value={person.email} id="c-mail" copy />
          <ContactLine label="Telefone · WhatsApp" value={person.phone} id="c-tel" copy />
          <ContactLine label="Localização" value={person.city} id="c-city" />
        </div>

        <footer className="mt-[clamp(56px,8vw,96px)] flex flex-wrap items-end justify-between gap-5 border-t border-line pt-7">
          <SignatureMark className="text-[54px]">{person.shortName}</SignatureMark>
          <p className="font-mono text-xs leading-normal text-fg [text-shadow:0_1px_12px_rgb(11_10_9/.6)]">
            {person.fullName} · {person.role}
            <br />
            {person.focus}
          </p>
        </footer>
      </div>
    </section>
  )
}

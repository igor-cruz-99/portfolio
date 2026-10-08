import { useEffect, useRef } from 'react'
import { Briefcase, MapPin } from 'lucide-react'
import portrait from '@/assets/igor.webp'
import { person } from '@/data/resume'
import { useFilmGrain } from '@/hooks/useFilmGrain'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/gsap'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const grain = useFilmGrain()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      const swoosh = root.current!.querySelector<SVGPathElement>('[data-swoosh]')!
      const len = swoosh.getTotalLength()
      gsap.set(swoosh, { strokeDasharray: len, strokeDashoffset: len })

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-photo]', { scale: 1.05, duration: 2.2, ease: 'power2.out' }, 0)
        // assinatura "escrita" da esquerda para a direita; o recorte é maior que a caixa para não cortar as hastes da cursiva
        .fromTo(
          '[data-sign]',
          { clipPath: 'inset(-40% 100% -40% -20%)' },
          { clipPath: 'inset(-40% -20% -40% -20%)', duration: 1.4, stagger: 0.45, ease: 'power2.inOut', clearProps: 'clipPath' },
          0.3,
        )
        .to(swoosh, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 1.6)
        .from('[data-in]', { y: 18, duration: 0.9, stagger: 0.08 }, 1.2)

      gsap.to('[data-photo]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <header
      id="top"
      ref={root}
      className="relative isolate flex flex-col overflow-hidden lg:grid lg:min-h-[min(100svh,980px)] lg:items-end"
    >
      {/* Foto */}
      <div className="relative -z-20 h-[62vw] min-h-[280px] lg:absolute lg:inset-0 lg:h-auto">
        <img
          data-photo
          src={portrait}
          alt="Igor Cruz de colete e gravata, ajustando o punho da camisa, em retrato preto e branco"
          width={1672}
          height={941}
          className="h-full w-full object-cover object-[20%_25%] brightness-[.92] contrast-[1.08] grayscale lg:h-[108%] lg:object-[18%_30%]"
        />
      </div>

      {/* Luz do pôr do sol + escurecimento para leitura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,var(--color-ink)_0%,var(--color-ink)_40%,transparent_70%),radial-gradient(80%_40%_at_60%_55%,rgb(255_106_26/.2),transparent_70%)] lg:bg-[radial-gradient(60%_55%_at_78%_58%,rgb(255_106_26/.22),transparent_70%),linear-gradient(90deg,transparent_25%,rgb(11_10_9/.55)_55%,rgb(11_10_9/.9)_100%),linear-gradient(0deg,var(--color-ink)_0%,transparent_38%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-repeat opacity-5 mix-blend-overlay"
        style={{ backgroundImage: grain ? `url(${grain})` : undefined, backgroundSize: '180px 180px' }}
      />

      <div className="wrap -mt-16 grid pb-16 lg:mt-0 lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:pt-[120px] lg:pb-[72px]">
        <div className="min-w-0 lg:col-start-2">
          <Eyebrow className="mb-2.5" >
            <span data-in>Currículo · Portfólio 2026</span>
          </Eyebrow>

          <h1 className="font-sign relative m-0 pt-[.12em] pl-[.25em] leading-[1.05] font-normal" aria-label={`Prazer, ${person.shortName}`}>
            <span data-sign className="block px-[.15em] text-[clamp(52px,7vw,100px)] text-fg">
              Prazer,
            </span>
            <span
              data-sign
              className="text-sunset -mt-[.25em] -ml-[.25em] block px-[.4em] pt-[.3em] pb-[.15em] text-[clamp(68px,9.5vw,140px)] drop-shadow-[0_8px_40px_rgb(255_106_26/.28)]"
            >
              {person.shortName}
            </span>
          </h1>

          <svg className="-mt-1.5 block h-auto w-[min(560px,90%)] overflow-visible" viewBox="0 0 560 40" aria-hidden="true">
            <defs>
              <linearGradient id="sunsetStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="var(--color-sun-1)" />
                <stop offset=".35" stopColor="var(--color-sun-2)" />
                <stop offset=".7" stopColor="var(--color-sun-3)" />
                <stop offset="1" stopColor="var(--color-sun-4)" stopOpacity=".2" />
              </linearGradient>
            </defs>
            <path
              data-swoosh
              d="M4 28 C 90 10, 180 36, 280 22 S 470 6, 556 18"
              fill="none"
              stroke="url(#sunsetStroke)"
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </svg>

          <p data-in className="font-disp mt-6 max-w-[30ch] text-[clamp(18px,1.8vw,22px)] leading-[1.35] font-semibold">
            {person.role} <span className="font-medium text-fg-dim">· {person.focus}</span>
          </p>
          <div data-in className="mt-5 flex flex-wrap gap-x-[22px] gap-y-2.5 font-mono text-[13px] text-fg-dim">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
              {person.city}
            </span>
            <span className="inline-flex items-center gap-2">
              <Briefcase className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
              {person.contract}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-[clamp(16px,5vw,72px)] hidden items-center gap-2.5 font-mono text-[11px] tracking-[.2em] text-fg-mute uppercase lg:flex">
        <i className="animate-drip block h-[42px] w-px bg-[linear-gradient(var(--color-sun-2),transparent)]" />
        Role
      </div>
    </header>
  )
}

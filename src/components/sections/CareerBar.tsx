import { useEffect, useRef } from 'react'
import { jobs, phaseLabels, type Phase } from '@/data/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/cn'

const phaseFill: Record<Phase, string> = {
  commercial: 'bg-ink-3',
  bridge: 'bg-bridge',
  data: 'bg-sunset',
}
const legendOrder: Phase[] = ['commercial', 'bridge', 'data']

// Barra da trajetória na escala real de meses, do mais antigo ao atual.
export function CareerBar() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const chronological = [...jobs].reverse()
  const totals = legendOrder.map((p) => ({
    phase: p,
    months: jobs.filter((j) => j.phase === p).reduce((s, j) => s + j.months, 0),
  }))

  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-seg]', {
        scaleX: 0.2,
        transformOrigin: 'left',
        duration: 1,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={ref} className="mb-[clamp(40px,6vw,70px)]" aria-label="Trajetória em meses, na escala real de cada função" role="img">
      <div className="flex h-3.5 gap-[3px] overflow-hidden rounded-full">
        {chronological.map((j) => (
          <div
            key={j.title}
            data-seg
            title={`${j.title} · ${j.months} meses`}
            className={cn('h-full rounded-[2px]', phaseFill[j.phase])}
            style={{ flex: j.months }}
          />
        ))}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-x-[22px] gap-y-2 font-mono text-xs text-fg-dim">
        {totals.map((t) => (
          <span key={t.phase} className="inline-flex items-center gap-2">
            <i className={cn('inline-block size-2.5 rounded-[3px]', phaseFill[t.phase])} />
            {phaseLabels[t.phase]} · {t.months} meses
          </span>
        ))}
      </div>
    </div>
  )
}

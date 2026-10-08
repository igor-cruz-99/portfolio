import { Fragment, useEffect, useRef } from 'react'
import { jobs, phaseLabels } from '@/data/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap } from '@/lib/gsap'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CareerBar } from './CareerBar'
import { JobItem } from './JobItem'

export function Experience() {
  const timeline = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !timeline.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-progress]',
        { height: 0 },
        {
          height: 'calc(100% - 16px)',
          ease: 'none',
          scrollTrigger: { trigger: timeline.current, start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      )
    }, timeline)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experiencia" className="pb-[clamp(80px,11vw,150px)]">
      <div className="wrap">
        <SectionHeader
          eyebrow="Experiência profissional"
          title={
            <>
              Do balcão
              <br />
              ao banco de dados.
            </>
          }
        />
        <CareerBar />

        <div ref={timeline} className="relative">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[170px]" />
          <span
            data-progress
            aria-hidden="true"
            className="absolute top-2 left-[5px] w-px bg-[linear-gradient(var(--color-sun-1),var(--color-sun-4))] md:left-[170px]"
          />
          {jobs.map((job, i) => (
            <Fragment key={job.title}>
              {job.phase !== jobs[i - 1]?.phase && (
                <p className="pt-[34px] pb-1.5 pl-[30px] font-mono text-[11px] leading-none font-medium tracking-[.2em] text-fg-mute uppercase md:pl-[214px]">
                  {phaseLabels[job.phase]}
                </p>
              )}
              <JobItem job={job} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Job } from '@/data/resume'
import { cn } from '@/lib/cn'
import { CompanyLogos } from '@/components/ui/CompanyLogos'

export function JobItem({ job }: { job: Job }) {
  return (
    <article className="group/job relative grid gap-2 py-7 pl-[30px] md:grid-cols-[170px_minmax(0,1fr)] md:gap-x-11 md:gap-y-0 md:pl-0">
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-8 left-0 z-10 size-[11px] rounded-full border md:top-9 md:left-[165px]',
          job.current ? 'border-sun-2 bg-sun-3 shadow-[0_0_0_6px_rgb(255_106_26/.15)]' : 'border-fg-mute bg-ink',
        )}
      />
      <p className="pt-1 font-mono text-xs leading-normal font-medium tracking-[.06em] text-fg-dim uppercase md:pr-6">
        <b className="block font-medium text-fg">{job.when}</b>
        {job.whenSub}
      </p>
      <div className="grid min-w-0 gap-3">
        <div className="flex items-center gap-4">
          {job.logos && <CompanyLogos logos={job.logos} live={job.current} size={job.compact ? 'sm' : 'md'} />}
          <div className="grid min-w-0 gap-2">
            <p
              className={cn(
                'font-mono text-[13px] leading-none font-medium tracking-[.08em] uppercase',
                job.compact ? 'text-fg-dim' : 'text-sun-2',
              )}
            >
              {job.org}
            </p>
            <h3
              className={cn(
                'font-title tracking-[.03em] leading-tight font-bold',
                job.compact ? 'text-[22px] text-fg-dim' : 'text-[clamp(26px,2.8vw,34px)]',
              )}
            >
              {job.title}
            </h3>
          </div>
        </div>
        {job.roles && (
          <p className="font-mono text-xs leading-relaxed text-fg-dim">
            {job.roles.map((r, i) => (
              <span key={r}>
                {i > 0 && <span className="px-2 text-fg-mute" aria-hidden="true">→</span>}
                {r}
              </span>
            ))}
          </p>
        )}
        <ul
          className={cn(
            'm-0 mt-1.5 grid max-w-[70ch] list-none gap-2 p-0',
            job.compact ? 'text-sm text-fg-mute' : 'text-fg-dim',
          )}
        >
          {job.items.map((item) => (
            <li key={item} className="relative pl-[22px]">
              <span
                aria-hidden="true"
                className={cn('absolute top-[.8em] left-0 h-px w-2.5', job.current ? 'bg-sun-2' : 'bg-fg-mute')}
              />
              {item}
            </li>
          ))}
        </ul>
        {job.also && (
          <p className="mt-1.5 text-sm text-fg-mute">
            <b className="mr-2 font-mono text-[11px] font-medium tracking-[.14em] text-fg-dim">TAMBÉM APOIOU</b>
            {job.also}
          </p>
        )}
      </div>
    </article>
  )
}

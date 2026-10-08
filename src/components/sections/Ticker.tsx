import { tools } from '@/data/resume'

export function Ticker() {
  const loop = [...tools, ...tools]
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-[18px]" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-11">
        {loop.map((t, i) => (
          <span
            key={i}
            className="font-disp inline-flex items-center gap-11 text-[clamp(18px,2.2vw,26px)] leading-none font-medium whitespace-nowrap text-fg-dim"
          >
            {t}
            <span className="bg-sunset size-2 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  )
}

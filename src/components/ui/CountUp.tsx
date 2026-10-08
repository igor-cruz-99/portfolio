import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Mostra o valor final em repouso; anima de 0 só quando entra na tela.
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const o = { v: 0 }
        gsap.to(o, { v: to, duration: 1.4, ease: 'power2.out', onUpdate: () => setValue(Math.round(o.v)) })
      },
    })
    return () => st.kill()
  }, [to, reduced])

  return <span ref={ref}>{value}</span>
}

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/cn'

type Props = { value: string; label: string; targetId: string }

export function CopyButton({ value, label, targetId }: Props) {
  const toast = useToast()
  const [done, setDone] = useState(false)

  const selectFallback = () => {
    const el = document.getElementById(targetId)
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    toast('Texto selecionado. Use Ctrl+C para copiar')
  }

  const onClick = () => {
    try {
      navigator.clipboard.writeText(value).then(() => {
        setDone(true)
        toast(`Copiado: ${value}`)
        window.setTimeout(() => setDone(false), 1600)
      }, selectFallback)
    } catch {
      selectFallback()
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'grid size-11 flex-none cursor-pointer place-items-center rounded-xl border transition-colors duration-250',
        done ? 'bg-sunset border-transparent text-ink' : 'border-line text-fg hover:border-sun-2 hover:bg-sun-2/10',
      )}
    >
      {done ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
    </button>
  )
}

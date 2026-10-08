import { useCallback, useRef, useState, type ReactNode } from 'react'
import { ToastContext, type ToastFn } from '@/hooks/useToast'
import { cn } from '@/lib/cn'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback<ToastFn>((text) => {
    setMessage(text)
    setVisible(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVisible(false), 1800)
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'pointer-events-none fixed left-1/2 z-60 -translate-x-1/2 rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink transition-all duration-300',
          'bottom-[calc(24px+env(safe-area-inset-bottom,0px))]',
          visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        {message}
      </div>
    </ToastContext.Provider>
  )
}

import { cn } from '@/lib/cn'

type Props = { children: string; className?: string }

// Assinatura cursiva em degradê. O degradê (background-clip: text) só pinta dentro da caixa,
// e as hastes da fonte cursiva passam dela; o padding amplia a caixa e a margem negativa
// devolve o texto à posição original, para nada ser cortado.
export function SignatureMark({ children, className }: Props) {
  return (
    <span className={cn('text-sunset font-sign -mx-[.35em] -my-[.2em] inline-block px-[.35em] py-[.2em] leading-none whitespace-nowrap', className)}>
      {children}
    </span>
  )
}

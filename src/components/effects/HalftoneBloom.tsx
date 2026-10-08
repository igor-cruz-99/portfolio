// Halftone Bloom — Originkit, adaptado: preenche o elemento pai (sem tamanho mínimo fixo),
// pausa fora da tela e fica parado para quem prefere menos movimento.
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { clampN, color, fieldTarget, link, locations, trackPointer } from '@/lib/halftone-bloom/gl'
import { FIELD_SRC, FINISH_SRC } from '@/lib/halftone-bloom/shaders'
import { cn } from '@/lib/cn'

const MAX_DPR = 2

type Props = {
  className?: string
  background?: string
  color1?: string
  color2?: string
  /** 0–100 (50 = velocidade original) */
  speed?: number
  /** 50–200 */
  size?: number
  /** -180–180 graus */
  angle?: number
  /** tamanho da célula da retícula, 3–24 px */
  dotSize?: number
  /** força do efeito no cursor, 0–200 */
  hover?: number
  /** alcance do efeito no cursor, em px */
  reach?: number
}

export function HalftoneBloom({
  className,
  background = '#000000',
  color1 = '#FF4F4F',
  color2 = '#704300',
  speed = 50,
  size = 200,
  angle = 180,
  dotSize = 6,
  hover = 200,
  reach = 429,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  // valores lidos a cada quadro, sem reiniciar o WebGL quando as props mudam
  const vRef = useRef({ background, color1, color2, speed: 1, size: 1, angle: 0, dot: 6, hover: 1, reach: 200 })
  useEffect(() => {
    vRef.current = {
      background,
      color1,
      color2,
      speed: clampN(speed, 0, 100) / 50,
      size: clampN(size, 50, 200) / 100,
      angle: (clampN(angle, -180, 180) * Math.PI) / 180,
      dot: clampN(dotSize, 3, 24),
      hover: clampN(hover, 0, 200) / 100,
      reach: clampN(reach, 10, 800),
    }
  }, [background, color1, color2, speed, size, angle, dotSize, hover, reach])

  useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    if (!canvas || !root) return
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false, stencil: false })
    if (!gl) return // sem WebGL2: fica só a cor de fundo
    const field = link(gl, FIELD_SRC, 'field')
    const finish = link(gl, FINISH_SRC, 'finish')
    if (!field || !finish) return
    const uf = locations(gl, field, ['uRes', 'uTime', 'uC1', 'uC2', 'uSize', 'uAngle'])
    const un = locations(gl, finish, ['uField', 'uRes', 'uTime', 'uBg', 'uPaper', 'uMouse', 'uOn', 'uReach', 'uCell', 'uPR'])
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const target = fieldTarget(gl)
    const pointer = trackPointer(root)
    const ptr = pointer.p

    let mx = 0
    let my = 0
    let on = 0
    let raf = 0
    let last = -1
    // começa num ponto já desenvolvido do ciclo: o quadro parado (movimento reduzido) também fica bonito
    let clock = 12
    let visible = true

    const draw = (dt: number) => {
      const v = vRef.current
      clock = (clock + dt * v.speed) % 3600

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const cw = canvas.clientWidth || 1
      const ch = canvas.clientHeight || 1
      const bw = Math.max(1, Math.round(cw * dpr))
      const bh = Math.max(1, Math.round(ch * dpr))
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
      }
      target.resize(Math.max(1, Math.round(bw / 2)), Math.max(1, Math.round(bh / 2)))

      const present = ptr.inside ? 1 : 0
      if (present && on < 0.02) {
        mx = ptr.tx
        my = ptr.ty
      }
      on += (present - on) * (1 - Math.exp(-dt * 5))
      const k = 1 - Math.exp(-dt * 16)
      mx += (ptr.tx - mx) * k
      my += (ptr.ty - my) * k

      const c1 = color(v.color1, '#FF4F4F')
      const c2 = color(v.color2, '#704300')
      const bg = color(v.background, '#000000')
      const bgLum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]

      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
      gl.viewport(0, 0, target.width(), target.height())
      gl.useProgram(field)
      gl.uniform2f(uf.uRes, target.width(), target.height())
      gl.uniform1f(uf.uTime, clock)
      gl.uniform3f(uf.uC1, c1[0], c1[1], c1[2])
      gl.uniform3f(uf.uC2, c2[0], c2[1], c2[2])
      gl.uniform1f(uf.uSize, v.size)
      gl.uniform1f(uf.uAngle, v.angle)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      const pr = bw / cw
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, bw, bh)
      gl.useProgram(finish)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, target.texture())
      gl.uniform1i(un.uField, 0)
      gl.uniform2f(un.uRes, bw, bh)
      gl.uniform1f(un.uTime, clock)
      gl.uniform3f(un.uBg, bg[0], bg[1], bg[2])
      gl.uniform1f(un.uPaper, clampN((bgLum - 0.35) / 0.3, 0, 1))
      gl.uniform2f(un.uMouse, mx * pr, (ch - my) * pr)
      gl.uniform1f(un.uOn, on * v.hover)
      gl.uniform1f(un.uReach, v.reach * pr)
      gl.uniform1f(un.uCell, v.dot * pr)
      gl.uniform1f(un.uPR, pr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      const dt = last < 0 ? 0 : clampN((now - last) / 1000, 0, 0.05)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reduced) {
        draw(0) // movimento reduzido: um quadro parado
        return
      }
      if (!raf) {
        last = -1
        raf = requestAnimationFrame(loop)
      }
    }

    // pausa quando a seção sai da tela, para não gastar GPU à toa
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(root)
    // redesenha o quadro parado se o tamanho mudar
    const ro = new ResizeObserver(() => {
      if (reduced) draw(0)
    })
    ro.observe(root)
    start()

    return () => {
      io.disconnect()
      ro.disconnect()
      cancelAnimationFrame(raf)
      pointer.dispose()
      target.dispose()
      gl.deleteVertexArray(vao)
      gl.deleteProgram(field)
      gl.deleteProgram(finish)
    }
  }, [reduced])

  return (
    <div ref={rootRef} aria-hidden="true" className={cn('overflow-hidden', className)} style={{ background }}>
      <canvas ref={canvasRef} className="absolute inset-0 block size-full" />
    </div>
  )
}

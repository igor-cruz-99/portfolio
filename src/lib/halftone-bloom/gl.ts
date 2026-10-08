// Utilitários WebGL2 do Halftone Bloom (Originkit): cores, programas, alvo de render e cursor.
import { VERT_SRC } from './shaders'

export type RGB = [number, number, number]

const NAME = 'HalftoneBloom'
const colorCache = new Map<string, RGB | null>()

export function clampN(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}

function parseColor(input: string | undefined): RGB | null {
  if (!input) return null
  const key = String(input)
  if (colorCache.has(key)) return colorCache.get(key) ?? null
  let s = key.trim()
  const v = s.match(/^var\(\s*--[^,]+,\s*(.+)\)$/)
  if (v) s = v[1].trim()
  let out: RGB | null = null
  if (s.charAt(0) === '#') {
    let h = s.slice(1)
    if (h.length === 3 || h.length === 4) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    if (h.length >= 6) {
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) out = [r / 255, g / 255, b / 255]
    }
  } else {
    const m = s.match(/^(rgba?|hsla?)\(([^)]*)\)/i)
    if (m) {
      const parts = m[2].split(/[\s,/]+/).filter(Boolean)
      const f = (i: number) => parseFloat(parts[i])
      if (parts.length >= 3 && [0, 1, 2].every((i) => Number.isFinite(f(i)))) {
        if (m[1].toLowerCase().startsWith('rgb')) {
          const ch = (i: number) => (parts[i].endsWith('%') ? f(i) / 100 : f(i) / 255)
          out = [ch(0), ch(1), ch(2)]
        } else {
          const hh = (((f(0) % 360) + 360) % 360) / 360
          const ss = f(1) / 100
          const ll = f(2) / 100
          const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss
          const p = 2 * ll - q
          const hue = (t: number) => {
            t = t < 0 ? t + 1 : t > 1 ? t - 1 : t
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
          }
          out = [hue(hh + 1 / 3), hue(hh), hue(hh - 1 / 3)]
        }
        out = out.map((c) => Math.min(1, Math.max(0, c))) as RGB
      }
    }
  }
  colorCache.set(key, out)
  return out
}

export function color(input: string | undefined, fallback: string): RGB {
  return parseColor(input) ?? (parseColor(fallback) as RGB)
}

export function link(gl: WebGL2RenderingContext, frag: string, label: string): WebGLProgram | null {
  const shader = (type: number, src: string) => {
    const sh = gl.createShader(type)
    if (!sh) return null
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(`${NAME} ${label} shader:`, gl.getShaderInfoLog(sh))
      gl.deleteShader(sh)
      return null
    }
    return sh
  }
  const vs = shader(gl.VERTEX_SHADER, VERT_SRC)
  const fs = shader(gl.FRAGMENT_SHADER, frag)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(`${NAME} ${label} link:`, gl.getProgramInfoLog(prog))
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

export function locations(gl: WebGL2RenderingContext, prog: WebGLProgram, names: string[]) {
  const out: Record<string, WebGLUniformLocation | null> = {}
  for (const n of names) out[n] = gl.getUniformLocation(prog, n)
  return out
}

export function fieldTarget(gl: WebGL2RenderingContext) {
  const fbo = gl.createFramebuffer()
  let tex: WebGLTexture | null = null
  let w = 0
  let h = 0
  let half = !!gl.getExtension('EXT_color_buffer_float')
  return {
    fbo,
    texture: () => tex,
    width: () => w,
    height: () => h,
    resize(nw: number, nh: number) {
      if (nw === w && nh === h && tex) return
      for (let attempt = 0; attempt < 2; attempt++) {
        if (tex) gl.deleteTexture(tex)
        tex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texImage2D(
          gl.TEXTURE_2D, 0, half ? gl.RGBA16F : gl.RGBA8, nw, nh, 0, gl.RGBA,
          half ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null,
        )
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        if (ok || !half) break
        half = false
      }
      w = nw
      h = nh
    },
    dispose() {
      if (tex) gl.deleteTexture(tex)
      gl.deleteFramebuffer(fbo)
    },
  }
}

export function trackPointer(root: HTMLElement) {
  const p = { tx: 0, ty: 0, inside: false }
  const read = (e: PointerEvent) => {
    const r = root.getBoundingClientRect()
    const sx = root.offsetWidth / (r.width || 1)
    const sy = root.offsetHeight / (r.height || 1)
    p.tx = (e.clientX - r.left) * sx
    p.ty = (e.clientY - r.top) * sy
    p.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
  }
  const out = (e: PointerEvent) => {
    if (!e.relatedTarget) p.inside = false
  }
  window.addEventListener('pointermove', read, { passive: true })
  window.addEventListener('pointerdown', read, { passive: true })
  document.addEventListener('pointerout', out)
  return {
    p,
    dispose() {
      window.removeEventListener('pointermove', read)
      window.removeEventListener('pointerdown', read)
      document.removeEventListener('pointerout', out)
    },
  }
}

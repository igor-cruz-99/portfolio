import { useState } from 'react'

function makeGrain(size: number) {
  try {
    const cv = document.createElement('canvas')
    cv.width = cv.height = size
    const ctx = cv.getContext('2d')
    if (!ctx) return undefined
    const img = ctx.createImageData(size, size)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
    return cv.toDataURL()
  } catch {
    return undefined
  }
}

// Textura de grão fina (180px) para repetir no tamanho real, sem esticar.
export function useFilmGrain(size = 180) {
  const [url] = useState(() => makeGrain(size))
  return url
}

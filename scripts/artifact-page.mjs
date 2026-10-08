// Gera dist/artifact.html: o mesmo build, sem <!doctype>/<html>/<head>/<body>,
// porque o Artifact do Claude envolve a página no próprio esqueleto ao publicar.
// Gera também dist/artifact-preview.html: a página já dentro desse esqueleto,
// para testar localmente (npm run preview) exatamente o que vai ao ar. Não publicar este.
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('dist/index.html', 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? ''
const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? ''

const keep = head
  .split('\n')
  .filter((l) => !/<meta charset|<meta name="viewport"/i.test(l))
  .join('\n')

const page = `${keep.trim()}\n${body.trim()}\n`
writeFileSync('dist/artifact.html', page)

// Esqueleto do Artifact (copiado da versão publicada em 2026-09-29).
const skeleton = `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>\n`
writeFileSync('dist/artifact-preview.html', `${skeleton}${page}</body></html>\n`)

console.log('dist/artifact.html e dist/artifact-preview.html gerados')

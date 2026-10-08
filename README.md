# Prazer, Igor Cruz

Página de apresentação e currículo de Igor Sousa Cruz, Analista de Dados.
Preto e branco com detalhes em degradê "sunset".

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (tokens em `src/styles/globals.css`, bloco `@theme`)
- GSAP + ScrollTrigger (animações), Lucide (ícones)
- Fontes do Google Fonts: Mrs Saint Delafield (assinatura), Bebas Neue (títulos), Unbounded (destaques), Manrope (texto), JetBrains Mono (detalhes)

## Rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build            # gera dist/ (base './', funciona em subpasta/cPanel)
npm run build:artifact   # build + dist/artifact.html para publicar como Artifact do Claude
```

## Publicação

- **GitHub Pages:** cada push na branch `main` roda `.github/workflows/deploy.yml`, que faz o build e publica `dist/`.
- O `base: './'` do Vite deixa o site funcionar em qualquer subpasta (Pages, cPanel).

## Privacidade

Os prints em `src/assets/projects/` tiveram nomes, e-mails e telefones de terceiros borrados antes de entrar no repositório.

## Estrutura

```
src/
├── assets/            foto da capa
├── components/
│   ├── layout/        Nav
│   ├── sections/      uma seção por arquivo (Hero, Skills, Experience, Contact...)
│   ├── ui/            peças reutilizáveis (Chip, Eyebrow, SectionHeader, CopyButton, Toast...)
│   └── wordmark/      VectorWordmark (controles React)
├── data/resume.ts     todo o conteúdo do currículo — edite aqui
├── hooks/             useReducedMotion, useToast, useFilmGrain
├── lib/               cn, gsap, vectorWordmark (motor do canvas)
└── styles/            globals.css (Tailwind + tokens)
```

Para mudar texto, experiência ou competências, edite só `src/data/resume.ts`.

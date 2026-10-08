// Galeria de projetos. Para adicionar um trabalho: coloque a imagem em src/assets/projects/
// e acrescente um item na categoria certa.
import teacherMarina from '@/assets/projects/teacher-marina.webp'
import n8nBitrixCalendly from '@/assets/projects/n8n-bitrix-calendly.webp'
import makeFluxoAgendamentos from '@/assets/projects/make-fluxo-agendamentos.webp'
import mariaEduarda from '@/assets/projects/maria-eduarda.webp'
// telefones borrados de propósito: dados de terceiros
import painelApiWhatsapp from '@/assets/projects/painel-api-whatsapp.webp'
import ipac from '@/assets/projects/ipac.webp'
// nomes e e-mails de compradores borrados de propósito: dados de clientes
import wepPadrao from '@/assets/projects/wep-padrao.webp'
import wepPaginas from '@/assets/projects/wep-paginas.webp'
import wepAnuncios from '@/assets/projects/wep-anuncios.webp'
import aplPharus from '@/assets/projects/apl-pharus.webp'
// nomes de leads borrados de propósito: dados de clientes
import sessaoEstrategica from '@/assets/projects/sessao-estrategica.webp'
import tecseguros from '@/assets/projects/tecseguros.webp'

const wepPages: ProjectPage[] = [
  { label: 'Padrão', image: wepPadrao, width: 1665, height: 4064, kind: 'fullpage' },
  { label: 'Páginas', image: wepPaginas, width: 1665, height: 1653, kind: 'image' },
  { label: 'Anúncios', image: wepAnuncios, width: 1665, height: 4579, kind: 'fullpage' },
]

export type ProjectCategoryId = 'dashboards' | 'automations' | 'sites'

/** Uma tela do projeto. 'fullpage' = print da página inteira: abre ampliado com rolagem até o fim */
export type ProjectPage = {
  label: string
  image: string
  width: number
  height: number
  kind: 'fullpage' | 'image'
}

export type Project = {
  id: string
  title: string
  subtitle: string
  /** capa do cartão (normalmente a primeira página) */
  image: string
  width: number
  height: number
  kind: ProjectPage['kind']
  tags: string[]
  /** várias telas do mesmo projeto (ex.: páginas de um dashboard); sem isso, o projeto tem uma tela só */
  pages?: ProjectPage[]
}

export function projectPages(p: Project): ProjectPage[] {
  return p.pages ?? [{ label: p.title, image: p.image, width: p.width, height: p.height, kind: p.kind }]
}

export type ProjectCategory = {
  id: ProjectCategoryId
  label: string
  blurb: string
  items: Project[]
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    blurb: 'Painéis em Power BI, Looker Studio e sob medida para acompanhar métricas e apoiar decisões.',
    items: [
      {
        id: 'wep-dashboard',
        title: 'Workshop Estrategista Patrimonial',
        subtitle: 'Dashboard de lançamento com dados ao vivo do Supabase: funil, tráfego por campanha, páginas de venda e criativos',
        ...wepPages[0],
        tags: ['Supabase', 'Meta Ads', 'Funil de vendas'],
        pages: wepPages,
      },
      {
        id: 'apl-pharus',
        title: 'APL · Pharus',
        subtitle: 'Dashboard de performance: funil de aquisição, tráfego por campanha, ciclo de vendas, perfil do lead e matriz mês a mês',
        image: aplPharus,
        width: 1600,
        height: 3839,
        kind: 'fullpage',
        tags: ['Performance', 'Meta Ads', 'Funil de aquisição'],
      },
      {
        id: 'sessao-estrategica',
        title: 'Sessão Estratégica',
        subtitle: 'Dashboard de performance com origem dos leads, renda, profissão e matriz mês a mês',
        image: sessaoEstrategica,
        width: 1665,
        height: 4870,
        kind: 'fullpage',
        tags: ['Performance', 'Forms nativo', 'Perfil do lead'],
      },
    ],
  },
  {
    id: 'automations',
    label: 'Automações',
    blurb: 'Cenários em Make, N8N e Zapier que conectam formulários, CRM, WhatsApp e e-mail.',
    items: [
      {
        id: 'painel-api-whatsapp',
        title: 'Controle de API WhatsApp',
        subtitle: 'Painel da Quarta Via que acompanha a qualidade e o consumo dos números da API do WhatsApp Business',
        image: painelApiWhatsapp,
        width: 1425,
        height: 3312,
        kind: 'fullpage',
        tags: ['Painel', 'WhatsApp Business API', 'Qualidade e consumo'],
      },
      {
        id: 'n8n-bitrix-calendly',
        title: 'Agendamentos Calendly → Bitrix24',
        subtitle: 'Workflow no n8n que leva data e horário das reuniões agendadas no Calendly para o CRM Bitrix24',
        image: n8nBitrixCalendly,
        width: 1919,
        height: 908,
        kind: 'image',
        tags: ['n8n', 'Bitrix24', 'Calendly'],
      },
      {
        id: 'make-fluxo-agendamentos',
        title: 'Fluxo Geral de Agendamentos',
        subtitle: 'Cenário no Make que distribui cada agendamento em ramos de registro e notificação',
        image: makeFluxoAgendamentos,
        width: 1917,
        height: 912,
        kind: 'image',
        tags: ['Make', 'Agendamentos', 'Notificações'],
      },
    ],
  },
  {
    id: 'sites',
    label: 'Sites',
    blurb: 'Landing pages que captam o lead e alimentam os fluxos de automação.',
    items: [
      {
        id: 'teacher-marina',
        title: 'Teacher Marina',
        subtitle: 'Landing page de aulas de inglês individuais para mães',
        image: teacherMarina,
        width: 1425,
        height: 7435,
        kind: 'fullpage',
        tags: ['Landing page', 'Página completa'],
      },
      {
        id: 'maria-eduarda',
        title: 'Maria Eduarda',
        subtitle: 'Site de portfólio de uma estudante de Publicidade e Propaganda',
        image: mariaEduarda,
        width: 1425,
        height: 7674,
        kind: 'fullpage',
        tags: ['Portfólio', 'Página completa'],
      },
      {
        id: 'ipac',
        title: '1ª Igreja Presbiteriana de Águas Claras',
        subtitle: 'Site institucional com programação semanal, projetos, galeria e campanha de construção',
        image: ipac,
        width: 1440,
        height: 7644,
        kind: 'fullpage',
        tags: ['Institucional', 'Página completa'],
      },
      {
        id: 'tecseguros',
        title: 'TecSeguros',
        subtitle: 'Conceito de landing page para uma central de monitoramento 24h (empresa fictícia)',
        image: tecseguros,
        width: 1440,
        height: 2225,
        kind: 'fullpage',
        tags: ['Conceito', 'Landing page'],
      },
    ],
  },
]

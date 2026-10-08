import logoQuartaVia from '@/assets/logos/quartavia.webp'
import logoIgd from '@/assets/logos/igd.webp'
import logoLancer from '@/assets/logos/lancer.webp'
import logoVe from '@/assets/logos/ve.webp'
import logoPolo from '@/assets/logos/polo.webp'
import logoBlueOcean from '@/assets/logos/blue-ocean.webp'

// Conteúdo do currículo, separado da apresentação.
// Fonte: "Igor Sousa Cruz — Currículo htm.pdf".

export const person = {
  fullName: 'Igor Sousa Cruz',
  shortName: 'Igor Cruz',
  role: 'Analista de Dados',
  focus: 'Arquitetura, ETL & Automação de Processos',
  city: 'Brasília · DF',
  contract: 'CLT / PJ + projetos pontuais',
  email: 'igorsousacruz99@gmail.com',
  phone: '+55 61 98452-5692',
}

// link do WhatsApp com mensagem pronta (só dígitos do número)
export const whatsappUrl = `https://wa.me/${person.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Olá, Igor! Vi seu portfólio e gostaria de conversar.',
)}`

export const tools = [
  'SQL', 'Power BI', 'Looker Studio', 'Python · Pandas', 'Make', 'N8N', 'Zapier',
  'ActiveCampaign', 'ManyChat', 'WordPress + Elementor', 'Excel avançado',
]

export const profileParagraphs = [
  'Analista de dados com atuação prática em modelagem e arquitetura de bancos de dados, processos de ETL e construção de dashboards para apoio à tomada de decisão.',
  'Desenvolvo automações de alta complexidade, como auto-agendamento de reuniões, rastreamento do caminho do lead até o CRM e sistemas de notificação via API. O resultado é menos trabalho manual e fontes de dados conectadas entre si.',
  'Formado em Administração de Empresas, com pós-graduação concluída em Análise de Dados e Business Intelligence. Busco posição fixa como Analista de Dados ou Engenheiro de Automação, com abertura para projetos freelance complementares.',
]

export type Fact = { value: string; count?: number; unit?: string; label: string; accent?: boolean }
export const facts: Fact[] = [
  { value: 'BI', label: 'Pós-graduação concluída em Análise de Dados e Business Intelligence', accent: true },
  { value: '27', count: 27, unit: 'meses', label: 'Gerenciando automações de marketing digital na Agência Lancer' },
  { value: '5', count: 5, unit: 'anos', label: 'De varejo na Polo Collections, de vendedor a coordenador de equipes' },
  { value: '3', label: 'Frentes: engenharia de dados, automação de processos e área comercial' },
]

export type SkillGroup = { id: 'data' | 'automation' | 'web'; title: string; desc: string; key: string[]; rest: string[] }
export const skillGroups: SkillGroup[] = [
  {
    id: 'data',
    title: 'Dados & Engenharia',
    desc: 'Modelo o banco, integro as fontes, trato os dados e entrego a leitura pronta para decisão.',
    key: ['SQL avançado', 'Modelagem e arquitetura de banco de dados'],
    rest: ['ETL e integração de fontes', 'Python (Pandas)', 'Power BI', 'Looker Studio', 'Excel avançado'],
  },
  {
    id: 'automation',
    title: 'Automação de Processos',
    desc: 'Conecto sistemas por API e desenho fluxos que agendam, notificam e rastreiam sem intervenção manual.',
    key: ['Make', 'N8N'],
    rest: ['Zapier', 'Integrações via API: WhatsApp, CRM, e-mail', 'Fluxos de auto-agendamento', 'Notificações automatizadas', 'Rastreamento de lead → CRM'],
  },
  {
    id: 'web',
    title: 'Web & Complementares',
    desc: 'Construo as páginas e formulários que alimentam os fluxos, e cuido da comunicação com o lead.',
    key: ['React + Tailwind CSS', 'WordPress + Elementor'],
    rest: ['HTML · CSS · JavaScript', 'ActiveCampaign', 'ManyChat', 'Pacote Office avançado', 'Photoshop'],
  },
]

export type FlowNodeIcon =
  | 'layers' | 'download' | 'shuffle' | 'database' | 'chart'
  | 'click' | 'form' | 'branch' | 'calendar' | 'bell'
export type FlowNode = { icon: FlowNodeIcon; title: string; sub: string; hot?: boolean }
export type Flow = { tag: string; title: string; desc: string; nodes: FlowNode[] }
export const flows: Flow[] = [
  {
    tag: 'Pipeline de dados',
    title: 'ETL até a tomada de decisão',
    desc: 'Consolidação e tratamento de dados de diferentes fontes para múltiplos projetos internos.',
    nodes: [
      { icon: 'layers', title: 'Fontes', sub: 'CRM · planilhas · APIs' },
      { icon: 'download', title: 'Extract', sub: 'coleta e integração' },
      { icon: 'shuffle', title: 'Transform', sub: 'SQL · Python/Pandas' },
      { icon: 'database', title: 'Load', sub: 'banco modelado' },
      { icon: 'chart', title: 'Dashboard', sub: 'Power BI · Looker', hot: true },
    ],
  },
  {
    tag: 'Automação',
    title: 'Caminho do lead até o CRM',
    desc: 'Rastreamento da origem, auto-agendamento de reuniões e notificações via API, sem etapa manual.',
    nodes: [
      { icon: 'click', title: 'Landing page', sub: 'React + Tailwind CSS' },
      { icon: 'form', title: 'Formulário', sub: 'captura + origem' },
      { icon: 'branch', title: 'Cenário', sub: 'Make · N8N' },
      { icon: 'calendar', title: 'Agendamento', sub: 'reunião automática' },
      { icon: 'bell', title: 'CRM + aviso', sub: 'WhatsApp · e-mail', hot: true },
    ],
  },
]

export type Phase = 'data' | 'bridge' | 'commercial'
export type Job = {
  org: string
  title: string
  when: string
  whenSub?: string
  months: number
  phase: Phase
  current?: boolean
  items: string[]
  also?: string
  /** cargos ocupados na mesma empresa, do primeiro ao último */
  roles?: string[]
  /** entrada secundária: título e texto menores */
  compact?: boolean
  /** logos das empresas (mais de uma = experiência compartilhada) */
  logos?: { src: string; alt: string }[]
}

// Ordem do mais recente para o mais antigo (ordem assumida — o PDF não traz datas exceto na Quarta Via).
export const jobs: Job[] = [
  {
    logos: [{ src: logoQuartaVia, alt: 'Grupo Quarta Via' }],
    org: 'Quarta Via', title: 'Analista de Dados e Gestor de Automações', when: 'Nov 2025', whenSub: 'Atual',
    months: 11, phase: 'data', current: true,
    items: [
      'Modelagem e arquitetura de bancos de dados para múltiplos projetos internos',
      'Processos de ETL para consolidação e tratamento de dados de diferentes fontes',
      'Construção de dashboards (Power BI / Looker Studio) para apoio à tomada de decisão',
      'Fluxos de automação de alta complexidade: auto-agendamento de reuniões, rastreamento do caminho do lead até o CRM e notificações automatizadas via API',
    ],
    also: 'Fluxos de atendimento e integrações pontuais de CRM',
  },
  {
    logos: [{ src: logoIgd, alt: 'Grupo IGD' }],
    org: 'Grupo IGD · Érico Rocha', title: 'Dados e Automações de Marketing', when: '8 meses', months: 8, phase: 'data',
    items: [
      'Tratamento e análise de dados (SQL, Metabase, Excel, Power BI)',
      'Automações diversas para marketing (Make, N8N)',
      'Configuração de CRM (Clint, API Meta)',
      'E-mail marketing (ActiveCampaign)',
    ],
  },
  {
    logos: [{ src: logoLancer, alt: 'Lancer Design' }],
    org: 'Agência Lancer', title: 'Gerente de Automações para Marketing Digital', when: '2 anos e 3 meses',
    months: 27, phase: 'data',
    items: [
      'Gestão de fluxos de automação para APIs e sistemas de e-mail marketing (ActiveCampaign)',
      'Automação de canais Instagram e WhatsApp com ManyChat, BotConversa, WATI-API e Zapier',
      'Criação de métricas de desempenho e dashboards (Looker Studio) para acompanhamento de campanhas',
      'Gerenciamento da stack de marketing: Devzapp, Nifty Image, Clint-CRM, SendFlow, Letalk, Make',
    ],
  },
  {
    logos: [{ src: logoBlueOcean, alt: 'Blue Ocean' }],
    org: 'Blue Ocean', title: 'Construtor de Páginas Web', when: '10 meses', months: 10, phase: 'bridge',
    items: [
      'Implementação de landing pages via WordPress + Elementor',
      'Criação de cenários de automação no Make e N8N integrados a formulários',
    ],
  },
  {
    logos: [{ src: logoVe, alt: 'Agência Vê' }, { src: logoLancer, alt: 'Lancer Design' }],
    org: 'Agência Vê / Agência Lancer', title: 'Inside Sales', when: '1 ano', months: 12, phase: 'bridge',
    items: [
      'Vendas consultivas de produtos digitais e gestão de funil via CRM',
      'Controle de planilhas de desempenho em Excel e rotina de e-mail marketing',
    ],
  },
  {
    // três cargos na mesma empresa, agrupados e com menos destaque
    logos: [{ src: logoPolo, alt: 'Polo Collection' }],
    org: 'Polo Collections', title: 'Comercial', when: '5 anos', months: 60, phase: 'commercial', compact: true,
    roles: ['Vendedor', 'Gerente Comercial', 'Coordenador de Vendas'],
    items: [
      'Vendas no varejo de vestuário, gestão de loja, estoque e desempenho entre lojas',
      'Contratação, treinamento e liderança de equipes de vendas',
    ],
  },
]

export const phaseLabels: Record<Phase, string> = {
  data: 'Dados & automação',
  bridge: 'Transição digital',
  commercial: 'Comercial & liderança',
}

export type EduItem = { icon: 'graduation' | 'building' | 'languages'; title: string; text: string; status: string; ok?: boolean; meters?: { label: string; value: number }[] }
export const education: EduItem[] = [
  { icon: 'graduation', title: 'Pós-graduação em Análise de Dados e Business Intelligence', text: 'Especialização em tratamento, modelagem e visualização de dados para decisão.', status: 'Concluída', ok: true },
  { icon: 'building', title: 'Administração de Empresas', text: 'Ensino superior que sustenta a leitura de negócio por trás de cada métrica e automação.', status: 'Ensino superior completo', ok: true },
  {
    icon: 'languages', title: 'Inglês · Wise Up', text: 'Leitura avançada e conversação intermediária.', status: 'Idioma',
    meters: [{ label: 'Leitura', value: 80 }, { label: 'Conversação', value: 55 }],
  },
]

export const traits = [
  { tag: 'Racional', title: 'Perfil reflexivo', text: 'Analiso antes de agir e tomo decisões com base no que os dados mostram.' },
  { tag: 'Disciplina', title: 'Constância', text: 'Processos bem documentados e rotina que se mantém depois da entrega.' },
  { tag: 'Liderança', title: 'Equipes formadas', text: 'Liderança comprovada na formação, contratação e gestão de times de vendas.' },
  { tag: 'Tradução', title: 'Técnico → negócio', text: 'Trânsito entre engenharia de dados, automação e áreas comerciais.' },
]

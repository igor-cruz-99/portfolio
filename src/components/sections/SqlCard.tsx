const K = ({ children }: { children: string }) => <span className="text-sun-2">{children}</span>
const S = ({ children }: { children: string }) => <span className="text-sun-1">{children}</span>
const N = ({ children }: { children: string }) => <span className="text-white">{children}</span>
const C = ({ children }: { children: string }) => <span className="text-[#6f6961]">{children}</span>

export function SqlCard() {
  return (
    <div className="mt-[clamp(32px,4vw,52px)] grid items-center gap-[clamp(20px,3vw,40px)] lg:grid-cols-2">
      <div
        role="img"
        aria-label="Consulta SQL ilustrativa que resume o perfil de Igor Cruz"
        className="min-w-0 overflow-x-auto rounded-[18px] bg-ink px-6 py-[22px] font-mono text-[13.5px] leading-[1.75] text-[#d8d3cc] shadow-[0_30px_60px_-30px_rgb(11_10_9/.45)]"
      >
        <div className="mb-3.5 flex gap-[7px]" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-sun-3" />
          <i className="size-2.5 rounded-full bg-[#3a3632]" />
          <i className="size-2.5 rounded-full bg-[#3a3632]" />
        </div>
        <pre className="m-0 whitespace-pre">
          <C>-- perfil.sql</C>
          {'\n'}<K>SELECT</K> <N>nome</N>, <N>cargo</N>, <N>stack</N>
          {'\n'}<K>FROM</K>{'   '}<N>profissionais</N>
          {'\n'}<K>WHERE</K>{'  '}<N>cidade</N>{'       '}= <S>'Brasília-DF'</S>
          {'\n  '}<K>AND</K>{'  '}<N>formacao</N>{'     '}<K>LIKE</K> <S>'%Dados e BI%'</S>
          {'\n  '}<K>AND</K>{'  '}<N>automacao</N>{'    '}<K>IN</K> (<S>'Make'</S>, <S>'N8N'</S>, <S>'Zapier'</S>)
          {'\n  '}<K>AND</K>{'  '}<N>disponivel</N>{'   '}= <K>TRUE</K>;
          {'\n\n'}<C>-- 1 row returned: Igor Sousa Cruz</C>
        </pre>
      </div>
      <p className="font-disp max-w-[24ch] text-[clamp(20px,2.2vw,28px)] leading-[1.3] font-medium text-ink">
        A consulta que retorna o perfil certo.
        <small className="font-body mt-3.5 block max-w-[44ch] text-[15px] leading-[1.6] font-normal text-paper-dim">
          SQL é a base de tudo o que faço: modelagem, consolidação de fontes e as métricas que chegam ao dashboard.
        </small>
      </p>
    </div>
  )
}

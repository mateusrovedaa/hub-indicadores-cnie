# Inventário do Sistema Aurora

> **Fase Inicial**
> Objetivo: registrar o que o Aurora já resolve (stack, arquitetura visual, componentes e padrões) para que o Hub de Indicadores do CNIE reaproveite o máximo possível e mantenha a mesma identidade.

## 1. Visão geral

O Aurora é um sistema do **Ministério da Saúde / CNIE** para **monitoramento de sinais de laboratórios de saúde pública**. A interface principal é um **painel** (dashboard epidemiológico) com filtros, indicadores-chave, mapas, séries temporais, gráficos demográficos e tabela de alertas.

**Relevância para o hub:** o Aurora é a referência mais próxima do que o Hub de Indicadores precisa ser. A estratégia recomendada é **herdar a arquitetura visual e os primitivos**, e criar apenas os componentes de domínio que forem novos.

---

## 2. Stack técnica

| Camada | Tecnologia no Aurora | Status | Recomendação para o hub |
|---|---|---|---|
| Framework | Next.js (App Router) + React + TypeScript | ✅ | **Avaliar** |
| Estilo | Tailwind CSS | ✅ | Reutilizar |
| Primitivos de UI | shadcn/ui, adaptado localmente em `src/components/ui` | ✅ | Reutilizar (copiar os primitivos já adaptados) |
| Comportamento e acessibilidade | Radix UI | ✅ | Reutilizar (vem junto com o shadcn) |
| Ícones | Lucide | ✅ | Reutilizar |
| Gráficos | ECharts | ✅ | **Reutilizar** |
| Mapas | MapLibre GL (`maplibre-gl`) | ✅ | Reutilizar, se o hub tiver mapas |
| Tipografia | Rawline, via CDN do DS GovBR | ✅ | Reutilizar |
| Backend / API | Não descrito | ✏️ | Hub usará FastAPI + FastCRUD |
| Autenticação | Não descrito (há "ações de usuário" no header) | 🔍 |

---

## 3. Arquitetura visual em camadas

O Aurora organiza o visual em camadas bem separadas. Essa separação é o principal ativo a ser copiado.

```text
┌─────────────────────────────────────────────────────────────┐
│ 6. Componentes de domínio   src/components/home, ...        │  FilterBar, KpiRow, RiskMap...
├─────────────────────────────────────────────────────────────┤
│ 5. Layout institucional     src/components/layout           │  GovBrHeader, AppFooter
├─────────────────────────────────────────────────────────────┤
│ 4. Primitivos shadcn        src/components/ui               │  Button, Card, Dialog, Tabs...
├─────────────────────────────────────────────────────────────┤
│ 3. Ajustes globais          src/app/components.css          │  h1–h6, botões, cards, mapa   
├─────────────────────────────────────────────────────────────┤
│ 2. Integração               src/app/index.css               │  Rawline + Tailwind + shadcn + tema
├─────────────────────────────────────────────────────────────┤
│ 1. Tokens                   src/app/tokens.css              │  --aurora-*, --primary, ...
└─────────────────────────────────────────────────────────────┘
```

### 3.1 Tokens (`src/app/tokens.css`) ✅

Duas famílias de variáveis:

| Tipo | Padrão de nome | Exemplos conhecidos | Uso |
|---|---|---|---|
| Institucionais (paleta GovBR) | `--aurora-{cor}-{nível}` | `--aurora-blue-70`, `--aurora-gray-20`, `--aurora-green-50` | Uso pontual, quando não há token semântico |
| Semânticos (tema shadcn) | nome da função | `--primary`, `--background`, `--foreground`, `--border`, `--success`, `--warning` | **Uso padrão** nos componentes |
| Sombras | `--surface-shadow-*` | `--surface-shadow-sm` | Superfícies e cards |
| Tipografia | `--font-family-*` | `--font-family-base` | Fonte Rawline |
| Espaçamento | `--spacing-scale-*` | `--spacing-scale-base` | Escala de espaçamentos |

Regra de uso adotada pelo Aurora (e que o hub deve seguir):

```tsx
// padrão: token semântico
className="bg-primary text-primary-foreground"

// exceção: token institucional direto
className="text-[var(--aurora-blue-70)]"
```

Comparação feita sobre o commit `5ccf8ab`: o hub adotou a camada semântica do Aurora. Detalhes e exceções em `design-system-mapeamento.md`, seção 2.2.

### 3.2 Integração (`src/app/index.css`) ✅

Ordem de composição:

1. Fonte Rawline
2. Tailwind
3. Animações do shadcn
4. Estilos-base do shadcn
5. Tokens do Aurora
6. Mapeamento dos tokens para o tema do Tailwind

Itens mapeados para o Tailwind: cores semânticas, escala tipográfica, espaçamentos, raios, sombras, superfícies, **cores de gráficos**, **cores da sidebar** e estados de foco.

> Observação: o mapeamento de "cores de gráficos" é importante para o hub, porque indicadores dependem de paletas consistentes entre gráficos, mapas e legendas.

### 3.3 Ajustes globais (`src/app/components.css`) ✅

Em vez de reescrever cada componente shadcn, o Aurora aplica regras globais sobre os atributos `data-slot`, `data-variant` e `data-size`. Isso cobre:

- tipografia global e hierarquia `h1`–`h6`;
- estilo do `body`;
- altura, raio e estados (hover, active, focus) dos botões;
- padding e sombra dos cards;
- superfícies Aurora;
- ajustes do mapa (MapLibre).

**Vantagem:** os primitivos continuam com a API original do shadcn, o que facilita atualizar e copiar componentes.
**Cuidado:** estilos globais por atributo podem gerar efeitos colaterais difíceis de rastrear. Vale documentar cada regra no próprio CSS.

---

## 4. Inventário de componentes

### 4.1 Primitivos (`src/components/ui`) ✅

Lista conferida no código (commit `5ccf8ab`): `Badge`, `Button`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`, `Input`, `Popover`, `Select`, `Separator`, `Skeleton`, `Table`, `Tabs`, `Tooltip`.

### 4.2 Layout institucional (`src/components/layout`) ✅

| Componente | Responsabilidades | Reuso no hub |
|---|---|---|
| `GovBrHeader` | Identificação do Ministério da Saúde e CNIE, navegação principal, rota ativa, ações de usuário, preferências | **Adaptar** — trocar itens de navegação, manter a estrutura |
| `AppFooter` | Rodapé institucional | **Reutilizar** |

### 4.3 Componentes de domínio (`src/components/home`) ✅

| Componente | Função provável | Tecnologia | Reuso no hub |
|---|---|---|---|
| `FilterBar` | Filtros globais do painel (período, território, agravo) 🔍 | shadcn | **Adaptar** — base para os filtros do hub |
| `KpiRow` | Linha de cards com indicadores-chave | shadcn + tokens | **Reutilizar / generalizar** |
| `RiskMap` | Mapa de risco por território | MapLibre GL | Adaptar para mapas de indicadores |
| `TimeSeriesChart` | Série temporal | ECharts | **Reutilizar / generalizar** |
| `HeatmapAge` | Mapa de calor por faixa etária | ECharts | Avaliar |
| `PyramidChart` | Pirâmide etária (sexo × idade) | ECharts | Avaliar |
| `RadarChart` | Comparação multidimensional | ECharts | Avaliar |
| `AlertsTable` | Tabela de alertas/sinais | shadcn `Table` | Avaliar |
| `MethodologyDialog` | Explicação da metodologia em modal | shadcn `Dialog` | **Reutilizar** — base para a "ficha técnica" de cada indicador |
| `EpiWeekCalendar` | Seletor de semana epidemiológica | shadcn + regra própria | **Reutilizar** |
| `AsyncPanel` | Estados de loading, erro e vazio | shadcn | **Reutilizar** — padrão obrigatório no hub |

Outras pastas de domínio citadas: `src/components/management` e `src/components/auth` 🔍 (conteúdo não descrito).

---

## 5. Organização de pastas ✅

```text
src/components/ui          → primitivos visuais (shadcn adaptado)
src/components/layout      → layout institucional
src/components/home        → componentes de domínio do painel
src/components/management  → componentes de gestão
src/components/auth        → componentes de autenticação
src/domain                 → regras e tipos
src/lib                    → acesso a dados
```

**Recomendação:** o hub deve seguir exatamente essa convenção, trocando `home` por pastas por domínio do hub (ex.: `src/components/indicators`, `src/components/catalog`).

---

## 6. Telas ✏️

> Preencher navegando pelo Aurora. Um print por tela, salvo em `docs/assets/aurora/`.

| Rota | Nome | Objetivo | Componentes principais | Filtros | Print |
|---|---|---|---|---|---|
| `/` | Painel | Monitoramento de sinais laboratoriais | `FilterBar`, `KpiRow`, `RiskMap`, `TimeSeriesChart`, `AlertsTable` 🔍 | 🔍 | ✏️ |
| ✏️ | Gestão 🔍 | ✏️ | `components/management` | ✏️ | ✏️ |
| ✏️ | Login 🔍 | ✏️ | `components/auth` | — | ✏️ |

Para cada tela, anotar também:

- **Hierarquia da página**: o que aparece primeiro, o que fica abaixo da dobra.
- **Comportamento dos filtros**: afetam a página inteira ou só um bloco? Ficam na URL?
- **Responsividade**: como a tela se comporta no celular.
- **Pontos de dor**: o que parece confuso ou lento.

---

## 7. Padrões de interação a herdar

| Padrão | Onde aparece | Por que importa para o hub |
|---|---|---|
| Filtros globais no topo | `FilterBar` | Indicadores são quase sempre filtrados por período e território |
| Tempo em semana epidemiológica | `EpiWeekCalendar` | Padrão da vigilância em saúde; o hub deve usar a mesma lógica |
| KPIs em destaque antes dos gráficos | `KpiRow` | Leitura rápida antes do detalhe |
| Metodologia acessível pela interface | `MethodologyDialog` | Cada indicador do hub precisa de ficha técnica visível |
| Estados assíncronos padronizados | `AsyncPanel` | Consistência em loading, erro e ausência de dados |
| Identidade concentrada em poucos componentes | `GovBrHeader`, `AppFooter` | Facilita manter o padrão institucional |

---

## 8. Análise: reaproveitar, adaptar, criar

**Reaproveitar sem mudanças:** tokens (`tokens.css`), integração (`index.css`), ajustes globais (`components.css`), primitivos de `src/components/ui`, `AppFooter`, `AsyncPanel`, `EpiWeekCalendar`, `MethodologyDialog`.

**Adaptar:** `GovBrHeader` (navegação do hub), `FilterBar` (dimensões dos indicadores), `KpiRow` e `TimeSeriesChart` (generalizar para receber qualquer indicador do catálogo), `RiskMap` (mapa genérico de indicador por território).

**Criar (novos no hub):**

- `IndicatorCatalog` — listagem/busca de indicadores por tema.
- `IndicatorCard` — card de resumo do indicador no catálogo.
- `IndicatorDetail` — página com KPI, série, mapa, tabela e ficha técnica.
- `IndicatorSheet` — ficha técnica (baseada no `MethodologyDialog`).
- `ExportMenu` 🔍 — exportação de dados/gráficos, se for requisito.

---

## 9. Decisões em aberto (viram ADRs em `docs/adr/`)

**D1 — Next.js ou Vite?**
O Aurora usa Next.js com App Router. Usar a mesma base no hub permite copiar componentes e CSS sem adaptação e facilita uma futura integração entre os dois sistemas. O FastAPI continua como backend; o Next.js seria usado como frontend (consumindo a API). Vite é mais simples se o hub for uma SPA pura sem necessidade de SSR.
*Recomendação preliminar:* **Next.js**, pelo alinhamento com o Aurora.

**D2 — ECharts ou Recharts?**
O plano inicial citava o `chart` do shadcn (Recharts), mas o Aurora usa ECharts.
*Recomendação preliminar:* **ECharts**, para reaproveitar `TimeSeriesChart` e manter a mesma linguagem visual dos gráficos.

**D3 — Como compartilhar tokens e componentes com o Aurora?**
Opções: (a) copiar os arquivos no início; (b) criar um pacote compartilhado (ex.: `@cnie/ui`) usado pelos dois sistemas.
*Recomendação preliminar:* começar com **(a)** e migrar para **(b)** se os dois sistemas continuarem evoluindo juntos.

**D4 — Hub separado ou módulo do Aurora?**
Afeta autenticação, navegação e deploy. Precisa ser decidido com a equipe do Aurora.

**D5 — Fonte de verdade dos tokens: Figma ou `tokens.css`?**
Quando o `figma-extracao.md` estiver pronto, comparar com o `tokens.css`. Divergências devem ser resolvidas definindo uma fonte única (idealmente o Figma, com o CSS gerado a partir dele).

---

## 10. Pendências

- [ ] Prints das telas do Aurora (seção 6)
- [x] Arquivo `tokens.css` completo
- [x] Lista completa de primitivos em `src/components/ui`
- [ ] Conteúdo de `components/management` e `components/auth`
- [ ] Como o Aurora consome dados (`src/lib`): REST? Qual backend?
- [ ] Como funciona a autenticação
- [x] Comparar tokens do Aurora com os do hub (ver `design-system-mapeamento.md`)
- [ ] Levar decisões D1 a D5 para a equipe

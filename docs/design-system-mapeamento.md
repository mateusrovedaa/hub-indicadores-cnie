# Mapeamento do Design System → Código

> **Fase 0 — Análise antes de codar** (terceiro documento)
> Como o DS GovBR do Figma (`Aurora-Designs-08-2026`, kit GOV.BR 3.6.3) foi traduzido para tokens CSS, tema do Tailwind e componentes shadcn no hub.

| Campo | Valor |
|---|---|
| Status | v0.2 — camada semântica alinhada ao Aurora (`aurora_cnie`, commit `5ccf8ab`) |
| Fonte | `docs/figma-extracao.md` (extração via MCP do Figma em 2026-09-25) |
| Pendência principal | Decidir a API dos componentes: cva do hub ou variantes shadcn + `data-slot` do Aurora (decisão D3) |

---

## 1. Resumo das decisões

1. **O Figma não tem variáveis, só estilos.** Os 463 estilos de cor viraram CSS variables (`--ds-*`) geradas automaticamente pelo script `scripts/figma_to_palette.py`.
2. **Não existe camada semântica no Figma.** O hub adota a do Aurora em `apps/web/src/app/tokens.css` (tabela 2.2), para que os dois sistemas tenham a mesma aparência e os mesmos nomes.
3. **Nomes padrão do Tailwind apontam para as mesmas escalas do Aurora.** `text-sm` = 14px (base e texto do `body`), `text-base` = 16.8px, `shadow-sm` = Elevação/Camada 1, `rounded-lg` = 8px, `rounded-full` = pílula.
4. **Estilos de cada componente ficam no próprio componente (cva)**, e não em regras globais por `data-slot` como no Aurora. Motivo: é mais fácil de rastrear. Os atributos `data-slot`/`data-variant` foram mantidos, então a abordagem do Aurora continua possível se o time preferir padronizar.
5. **Sem tema escuro.** O Figma não tem modos; o escuro aparece só como variante (ex.: `footer type=dark`).

---

## 2. Tokens

### 2.1 Arquitetura

```text
docs/figma-extracao.md
        │  python scripts/figma_to_palette.py
        ▼
palette.css   --ds-blue-warm-vivid-70: #1351B4;  (463 cores, NÃO editar à mão)
        ▼
tokens.css    --primary: var(--ds-blue-warm-vivid-70);  (semântico do Aurora + escalas)
        ▼
index.css     @theme inline { --color-primary: var(--primary); }
        ▼
componentes   className="bg-primary text-primary-foreground"
```

### 2.2 Camada semântica (cores)

A camada semântica usa **os mesmos nomes e valores do `tokens.css` do Aurora** (`apps/painel`, commit `5ccf8ab`). Só muda a origem: o hub aponta para a paleta `--ds-*` gerada do Figma; o Aurora, para `--aurora-*`. Os hex são idênticos (`--aurora-blue-70` = `--ds-blue-warm-vivid-70`, `--aurora-green-50` = `--ds-green-cool-vivid-50`, e assim por diante).

| Token | Paleta | Valor | Observação |
|---|---|---|---|
| `--primary` | blue-warm-vivid-70 | `#1351B4` | |
| `--foreground` | gray-90 | `#1B1B1B` | Era gray-80 antes do alinhamento |
| `--muted` / `--muted-foreground` | gray-02 / gray-60 | `#F8F8F8` / `#636363` | |
| `--secondary` / `--secondary-foreground` | gray-05 / gray-90 | `#F0F0F0` | Fundo neutro. O botão secundário não usa este token: é `bg-background` com borda e texto `primary` |
| `--accent` / `--accent-foreground` | blue-warm-vivid-05 / -80 | `#EDF5FF` | |
| `--surface` | pure-0 | `#FFFFFF` | O cinza de seção é `--surface-subtle` (gray-02) e `--surface-muted` (gray-05) |
| `--surface-inverse` | blue-warm-vivid-90 | `#071D41` | Rodapé (substitui o antigo `--footer`) |
| `--border` / `--input` | gray-20 | `#CCCCCC` | `--input` era gray-40. Contraste da borda do campo abaixo de 3:1: levar ao time do Aurora |
| `--ring` | gold-vivid-40 | `#C2850C` | Foco tracejado dourado |
| `--success` / `--destructive` / `--warning` / `--info` | green-cool-vivid-50, red-vivid-50, yellow-vivid-20, blue-warm-vivid-60 | | Texto sobre warning: gray-90 |
| `--*-muted` | green-cool-vivid-05, yellow-vivid-05, blue-warm-vivid-10 | | Fundos claros de feedback (antes `--*-subtle`) |
| `--chart-1…5` | blue-warm-vivid-70, green-cool-vivid-50, yellow-vivid-50, red-vivid-60, gray-70 | | Paleta de dados do Aurora |

**Extensões do hub** (não existem com esse nome no Aurora):

| Token | Motivo |
|---|---|
| `--primary-hover`, `--primary-pressed`, `--state-hover`, `--state-pressed`, `--disabled-opacity` | Estados dos componentes em cva. O Aurora resolve o mesmo por regra global em `components.css` |
| `--destructive-muted` (red-vivid-05) | Fundo do `message` de erro e da tag de perigo. O Aurora usa `--aurora-red-5` direto |
| `--chart-grid`, `--chart-axis` | Grade e eixos do ECharts |
| `--surface-shadow-xl` | Elevação/Camada 4 do Figma |

**Cores da paleta usadas direto** (`var(--ds-*)`, regra do CLAUDE.md): `ui/badge.tsx` usa `--ds-green-cool-vivid-70`, `--ds-yellow-vivid-80` e `--ds-red-vivid-60` como texto das tags de status, iguais ao `ToneBadge` do Aurora.

**Não trazido do Aurora:**

- Tema escuro (`.dark`) e tokens `sidebar-*`: o hub não tem tema escuro nem sidebar.
- Escala de severidade `--sev-1…5`: o hub ainda não tem conceito de severidade, e os tons laranja e roxo não existem na paleta do Figma (o `palette.css` é gerado).
- `--spacing-5` = 1,5rem e `--spacing-6` = 2rem: no Aurora o degrau 6 (32px) fica maior que o 7 (28px). O hub mantém a escala padrão do Tailwind; ao copiar componente do Aurora, trocar `*-5` por `*-6` e `*-6` por `*-8`.
- Títulos fora de `@layer`: no Aurora, utilitárias de tamanho não têm efeito em `h1`–`h6`. O hub mantém os títulos em `@layer base` porque usa `text-xl` em títulos de seção.
- Raleway pelo Google Fonts: fica só como nome de fallback.

### 2.3 Tipografia

- Família: `Rawline` (CDN do DS GovBR), fallback `Raleway`, `system-ui`.
- Escala: `--font-size-scale-*`, razão 1.2, base 14px, em `rem`.
- Hierarquia `h1`–`h6` em `components.css` com os tamanhos e pesos do Aurora (h5 SemiBold, h6 Bold). As variantes 4col (mobile) vêm do componente `font-type` do Figma e só existem no hub.
- Texto do `body`: 14px (base), como no Aurora.
- **Correção aplicada:** `h3` usa 29.03px (degrau `up-04`), não 29.3px como no Figma.
- **Line-height:** o Figma usa `auto`. Adotados os valores do GOV.BR DS: 1.15 (títulos) e 1.45 (texto). Cada classe `text-*` já carrega a sua altura de linha: 1.45 até `text-lg`, 1.15 de `text-xl` em diante.

| Classe Tailwind | Token | px |
|---|---|---|
| `text-xs` | down-01 | 11.67 |
| `text-sm` | base | 14 |
| `text-base` | up-01 | 16.8 |
| `text-lg` | up-02 | 20.16 |
| `text-xl` | up-03 | 24.19 |
| `text-2xl` | up-04 | 29.03 |
| `text-3xl` | up-05 | 34.84 |
| `text-4xl` | up-06 | 41.8 |
| `text-5xl` | up-07 | 50.16 |

### 2.4 Espaçamento, raio, sombra e breakpoints

| Categoria | Decisão |
|---|---|
| Espaçamento | Escala padrão do Tailwind (múltiplos de 4px) coincide com `4·8·12·16·24·32·40·48` do Figma. Nenhum token extra |
| Raio | Escala do Aurora a partir de `--radius` 8px: `rounded-sm` 4,8px (campos), `rounded-md` 6,4px, `rounded-lg` 8px, `rounded-xl` 11,2px, `rounded-full` pílula (botão, tag). Card: `--card-radius` 4px |
| Sombra | `shadow-sm/md/lg/xl` = Elevação/Camada 1–4 (`0 {1,3,6,9}px 6px` preto a 16%, como no Aurora) |
| Breakpoints | `md` 768px (8col), `lg` 1280px (12col), `xl` 1600px (TV). Margens do contêiner: 16px mobile, 40px a partir de 768px (`.page-container`) |
| Foco | `outline: 4px dashed var(--ring)` global em `:focus-visible` |

---

## 3. Componentes

Legenda: ✅ implementado · 🟡 parcial · ⏳ pendente · ➖ fora do escopo inicial

| Figma (id) | Código | Base | Status | Observações |
|---|---|---|---|---|
| button (15:17) | `ui/button.tsx` | shadcn Button | 🟡 | `secundary`→`secondary`; `circle`→`size="icon"`; tamanhos sm/md/lg do GOV.BR. Falta `state=progress` |
| magicbutton (20:32) | — | — | ➖ | |
| sign-in (126:2013) | — | — | ⏳ | Depende da decisão de autenticação (D4) |
| skiplink (152:2533) | `layout/SkipLink.tsx` | próprio | ✅ | |
| input (20:1025) | `ui/input.tsx` | shadcn Input | 🟡 | `danger` via `aria-invalid`. Falta `input small` e estados success/info/warning |
| input-highlight (67:2) | — | — | ⏳ | Busca do header |
| textarea (72:9) | — | shadcn Textarea | ⏳ | |
| select (24:393) | `ui/select.tsx` | shadcn/Radix Select | 🟡 | Falta `multiselect` |
| checkbox / radio / switch | — | shadcn | ⏳ | |
| datetimerpicker (80:1032) | — | shadcn Calendar | ⏳ | Reaproveitar `EpiWeekCalendar` do Aurora |
| upload, slider | — | — | ➖ | |
| message (74:634) | `ui/message.tsx` | próprio (≈ Alert) | ✅ | `sucess`→`success` |
| message-feedback (20:886) | — | próprio | ⏳ | Mensagem sob campos |
| tooltip (75:673) | — | shadcn Tooltip | ⏳ | |
| loading (75:819) | `ui/skeleton.tsx` | shadcn Skeleton | 🟡 | Skeleton cobre carregamento de página; falta o spinner |
| tag (75:1228) | `ui/badge.tsx` | shadcn Badge | 🟡 | `type=status/text`, tons do `ToneBadge` do Aurora. Falta `interactive` (filtro removível) e `score` |
| notification, avatar | — | — | ➖ | |
| header (118:480) | `layout/GovBrHeader.tsx` | próprio | 🟡 | Falta logo oficial, menu-button, sign-in |
| footer (120:410) | `layout/AppFooter.tsx` | próprio | 🟡 | `type=dark`. Faltam listas e logos |
| menu (118:100) | — | shadcn Sheet | ⏳ | Drawer mobile |
| breadcrumb (80:983) | `layout/PageHeader.tsx` | próprio | 🟡 | Sem truncamento |
| tab / tab-item | `ui/tabs.tsx` | shadcn/Radix Tabs | ✅ | Falta contador (`show number`) |
| pagination (75:1399) | — | shadcn Pagination | ⏳ | |
| wizard, step, cookiebar | — | — | ➖ | Cookiebar pode ser exigido (LGPD) |
| card + card-area (191:*) | `ui/card.tsx` | shadcn Card | ✅ | Raio 4px e rodapé sem borda, como no Aurora |
| table + table-header | `ui/table.tsx` | shadcn Table | 🟡 | Falta ordenação no cabeçalho |
| modal (78:1355) | — | shadcn Dialog | ⏳ | |
| list, item, carousel | — | — | ➖ | |

**Componentes de domínio (não existem no Figma):** `IndicatorCard`, `KpiRow`, `Variacao`, `TimeSeriesChart` (ECharts), `TerritoryFilter`, `TerritoryTable`, `IndicatorSheet`, `CatalogList`, `EmptyState`.

---

## 4. Lacunas do Figma que afetam o hub

1. **Sem paleta de dados para gráficos e mapas.** O hub usa a `--chart-1…5` do Aurora; falta paleta sequencial para mapas coropléticos (sugestão: blue-warm-vivid 10→90).
2. **Sem componente de card de KPI** nem de gráfico. O hub usa `card` + tipografia.
3. **Sem padrão de estado vazio.**
4. **`table` sem densidade e sem estado de linha.** Foi adotado `data-selected` com `--accent`.

---

## 5. Correções sugeridas ao time de design (priorizadas)

**Alta prioridade (afetam o código):**

1. Criar coleção de **variáveis** com camada semântica (primary, danger, surface…) espelhando a tabela 2.2.
2. Corrigir grafias de variantes: `secundary`, `sucess`, `actived`, `inderteminate`, `standart`, `intermediate`, `datetimerpicker`.
3. Aplicar os estilos de texto nos componentes e incluir família/peso neles (hoje 0 de 1.427 textos usam estilo).
4. Corrigir `h3` para 29.03px.

**Média prioridade:**

5. Padronizar nomes de propriedades (`state`, `size`/`density`, `orientation`) e idioma.
6. Renomear os dois `control-option` para `checkbox-option` e `radio-option`.
7. Substituir cores soltas por estilos (`#1351B4`, `#071D41`, `#DBE8FB`, `#168821`, `#C4C4C4`, `#707070`).
8. Unificar sombras nos estilos `Elevação/Camada 1–4`.

**Baixa prioridade:**

9. Remover espaços em nomes de variantes e padronizar caixa (`Default` × `default`).
10. Adicionar texto de uso no `description` dos componentes.

---

## 6. Pendências

- [x] Comparar `tokens.css` do hub com o do Aurora e alinhar a camada semântica (feito sobre o commit `5ccf8ab`; a paleta crua segue `--ds-*`)
- [x] Confirmar a URL do CDN da Rawline usada pelo Aurora (é a mesma)
- [ ] Decidir a API dos componentes (cva do hub × variantes shadcn + `data-slot` do Aurora) e, se for a do Aurora, copiar os primitivos que faltam: checkbox, dialog, dropdown-menu, popover, separator, tooltip
- [ ] Levar ao time do Aurora: `--spacing-5/6` fora de ordem e contraste da borda de campo (`--input` gray-20)
- [ ] Levar a lista da seção 5 ao time de design

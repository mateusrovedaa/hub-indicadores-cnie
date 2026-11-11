# Catálogo de Indicadores — Hub CNIE

> **Fase inicial**
> Objetivo: definir quais indicadores o hub vai exibir e como cada um é calculado. Este catálogo é a base do modelo de dados do backend (FastAPI + FastCRUD) e das telas do frontend.

| Campo | Valor |
|---|---|
| Status | Rascunho v0.1 — **estrutura pronta, conteúdo a validar com a área técnica** |
| Responsável pela validação | ✏️ |
| Última revisão | ✏️ |

⚠️ **Importante:** os indicadores da seção 4 são **hipóteses** montadas a partir das visualizações que o Aurora já possui. Eles servem para ilustrar o formato e iniciar a conversa com a área técnica, **não são definições oficiais**.

---

## 1. Visão geral

Tabela-resumo. Cada linha tem uma ficha completa na seção 4.

| ID | Nome | Tema | Fonte | Periodicidade | Menor nível territorial | Status |
|---|---|---|---|---|---|---|
| IND-001 | Positividade laboratorial | Vigilância laboratorial | 🔍 | Semanal (SE) | 🔍 | Hipótese |
| IND-002 | Volume de exames realizados | Vigilância laboratorial | 🔍 | Semanal (SE) | 🔍 | Hipótese |
| IND-003 | Distribuição de casos por sexo e faixa etária | Perfil demográfico | 🔍 | Semanal (SE) | 🔍 | Hipótese |
| IND-004 | Sinais/alertas ativos | Detecção de sinais | 🔍 | Semanal (SE) | 🔍 | Hipótese |
| IND-005 | Nível de risco territorial | Avaliação de risco | 🔍 | Semanal (SE) | 🔍 | Hipótese |

**Status possíveis:** `Hipótese` → `Em validação` → `Validado` → `Implementado`.

---

## 2. Modelo de ficha técnica

Copie este bloco para cada novo indicador. Os campos seguem a estrutura usual de fichas de qualificação de indicadores em saúde.

```markdown
### IND-XXX — Nome do indicador

| Campo | Descrição |
|---|---|
| **Nome** | Nome oficial |
| **Nome curto** | Até ~30 caracteres, para cards e legendas |
| **Tema** | Agrupamento no catálogo |
| **Conceituação** | O que o indicador mede, em uma ou duas frases |
| **Interpretação** | O que valores altos ou baixos significam |
| **Usos** | Para que decisões o indicador serve |
| **Método de cálculo** | Fórmula (numerador / denominador × fator) |
| **Unidade de medida** | %, taxa por 100 mil, contagem, índice... |
| **Polaridade** | Maior é melhor / Menor é melhor / Neutro |
| **Fonte dos dados** | Sistema de origem (numerador e denominador separadamente, se diferentes) |
| **Periodicidade** | Diária, semanal (SE), mensal, anual |
| **Defasagem** | Tempo entre o fato e a disponibilidade do dado |
| **Desagregações** | Dimensões disponíveis (ver seção 3) |
| **Limitações** | Subnotificação, atraso de digitação, mudanças de método... |
| **Regras de exibição** | Supressão de valores pequenos, arredondamento, casas decimais |
| **Parâmetros de alerta** | Limiares ou método de detecção, se houver |
| **Visualizações** | KPI, série temporal, mapa, tabela... (ver seção 5) |
| **Responsável técnico** | Área/pessoa que responde pelo indicador |
```

> No hub, esses campos alimentam a **ficha técnica** exibida na interface (componente baseado no `MethodologyDialog` do Aurora).

---

## 3. Dimensões padronizadas

Todos os indicadores devem usar o mesmo vocabulário de dimensões. Isso permite que os filtros do hub (`FilterBar`) funcionem de forma uniforme.

### 3.1 Tempo

| Nível | Formato | Observação |
|---|---|---|
| Semana epidemiológica (SE) | `AAAA-SS` (ex.: `2026-38`) | Padrão da vigilância; reutilizar a lógica do `EpiWeekCalendar` do Aurora |
| Mês | `AAAA-MM` | |
| Ano | `AAAA` | |

### 3.2 Território

| Nível | Código de referência |
|---|---|
| Brasil | — |
| Região geográfica | Código IBGE |
| UF | Código IBGE (2 dígitos) |
| Região de saúde | Código da região de saúde 🔍 |
| Município | Código IBGE (6 ou 7 dígitos — **definir qual**) |

### 3.3 População

| Dimensão | Categorias |
|---|---|
| Sexo | Feminino, Masculino, Ignorado |
| Faixa etária | ✏️ Definir faixas padrão (ex.: 0–4, 5–9, ..., 80+) — precisa coincidir com o `PyramidChart` e o `HeatmapAge` |

### 3.4 Dimensões específicas

| Dimensão | Exemplos | Status |
|---|---|---|
| Agravo / patógeno | ✏️ | Definir lista e código |
| Laboratório | ✏️ | Definir se é dimensão pública ou restrita |
| Tipo de exame | ✏️ | Definir |

---

## 4. Fichas preliminares (hipóteses)

### IND-001 — Positividade laboratorial

| Campo | Descrição |
|---|---|
| **Nome curto** | Positividade |
| **Tema** | Vigilância laboratorial |
| **Conceituação** | Proporção de exames com resultado positivo entre os exames realizados |
| **Interpretação** | Aumento sustentado pode indicar maior circulação do agente |
| **Método de cálculo** | (exames positivos ÷ exames com resultado) × 100 |
| **Unidade de medida** | % |
| **Polaridade** | Menor é melhor |
| **Fonte dos dados** | ✏️ |
| **Periodicidade** | Semanal (SE) |
| **Desagregações** | Tempo, território, agravo/patógeno, tipo de exame 🔍 |
| **Limitações** | Sensível ao volume testado; semanas com poucos exames geram oscilações |
| **Regras de exibição** | ✏️ Definir volume mínimo de exames para exibir o valor |
| **Visualizações** | KPI, série temporal, mapa |

### IND-002 — Volume de exames realizados

| Campo | Descrição |
|---|---|
| **Nome curto** | Exames realizados |
| **Tema** | Vigilância laboratorial |
| **Conceituação** | Número de exames com resultado liberado no período |
| **Interpretação** | Contexto para a positividade; quedas bruscas podem indicar problema de envio de dados |
| **Método de cálculo** | Contagem de exames com resultado |
| **Unidade de medida** | Contagem |
| **Polaridade** | Neutro |
| **Fonte dos dados** | ✏️ |
| **Periodicidade** | Semanal (SE) |
| **Desagregações** | Tempo, território, agravo/patógeno, laboratório 🔍 |
| **Limitações** | Atraso na liberação de resultados afeta as semanas mais recentes |
| **Visualizações** | KPI, série temporal (barras), tabela |

### IND-003 — Distribuição por sexo e faixa etária

| Campo | Descrição |
|---|---|
| **Nome curto** | Perfil demográfico |
| **Tema** | Perfil demográfico |
| **Conceituação** | Distribuição dos casos positivos por sexo e faixa etária |
| **Interpretação** | Identifica grupos mais afetados |
| **Método de cálculo** | Contagem (ou %) de positivos por sexo × faixa etária |
| **Unidade de medida** | Contagem ou % |
| **Polaridade** | Neutro |
| **Fonte dos dados** | ✏️ |
| **Periodicidade** | Semanal (SE) |
| **Desagregações** | Tempo, território, agravo/patógeno |
| **Limitações** | Registros com sexo ou idade ignorados |
| **Visualizações** | Pirâmide etária, mapa de calor (faixa etária × semana) |

### IND-004 — Sinais/alertas ativos

| Campo | Descrição |
|---|---|
| **Nome curto** | Alertas ativos |
| **Tema** | Detecção de sinais |
| **Conceituação** | Número de sinais que ultrapassaram o limiar de detecção e estão em aberto |
| **Interpretação** | Aponta onde há necessidade de investigação |
| **Método de cálculo** | ✏️ Depende do método de detecção usado no Aurora |
| **Unidade de medida** | Contagem |
| **Polaridade** | Menor é melhor |
| **Fonte dos dados** | ✏️ |
| **Periodicidade** | Semanal (SE) |
| **Desagregações** | Tempo, território, agravo/patógeno |
| **Parâmetros de alerta** | ✏️ Documentar o método (limiar fixo, média móvel, canal endêmico, outro) |
| **Visualizações** | KPI, tabela de alertas |

### IND-005 — Nível de risco territorial

| Campo | Descrição |
|---|---|
| **Nome curto** | Risco |
| **Tema** | Avaliação de risco |
| **Conceituação** | Classificação do território em níveis de risco |
| **Interpretação** | Prioriza territórios para ação |
| **Método de cálculo** | ✏️ Método composto — documentar variáveis e pesos |
| **Unidade de medida** | Categoria ordinal (ex.: baixo, moderado, alto) 🔍 |
| **Polaridade** | Menor é melhor |
| **Fonte dos dados** | ✏️ |
| **Periodicidade** | Semanal (SE) |
| **Desagregações** | Tempo, território |
| **Limitações** | ✏️ |
| **Visualizações** | Mapa coroplético, KPI por categoria |

---

## 5. Tipos de visualização

Mapeamento entre o tipo de indicador e o componente do hub (com base nos componentes do Aurora).

| Tipo de dado | Visualização | Componente base no Aurora |
|---|---|---|
| Valor atual + variação | Card de KPI | `KpiRow` |
| Evolução no tempo | Série temporal | `TimeSeriesChart` (ECharts) |
| Comparação entre territórios | Mapa coroplético | `RiskMap` (MapLibre GL) |
| Sexo × faixa etária | Pirâmide | `PyramidChart` (ECharts) |
| Faixa etária × tempo | Mapa de calor | `HeatmapAge` (ECharts) |
| Várias dimensões de um território | Radar | `RadarChart` (ECharts) |
| Lista de eventos | Tabela | `AlertsTable` |
| Metodologia | Modal de ficha técnica | `MethodologyDialog` |

---

## 6. Implicações para o modelo de dados (rascunho)

Primeira proposta de entidades para o backend. Será refinada na Fase 4.

```text
Tema
  id, nome, descricao, ordem

Indicador
  id (IND-XXX), tema_id, nome, nome_curto, conceituacao, interpretacao,
  metodo_calculo, unidade, polaridade, fonte, periodicidade, defasagem,
  limitacoes, regras_exibicao, responsavel, status

Dimensao
  id, codigo (tempo | territorio | sexo | faixa_etaria | agravo | ...), nome

IndicadorDimensao            # quais dimensões cada indicador aceita
  indicador_id, dimensao_id

Territorio
  codigo_ibge, nome, nivel (brasil | regiao | uf | regiao_saude | municipio), pai_codigo

ValorIndicador               # fato: um valor por combinação de dimensões
  indicador_id, periodo (ex.: 2026-38), nivel_periodo (se | mes | ano),
  territorio_codigo, recorte (JSON: sexo, faixa_etaria, agravo...),
  valor, numerador, denominador, atualizado_em
```

Pontos de decisão:

- **`recorte` em JSON ou colunas fixas?** JSON é flexível; colunas fixas são mais rápidas para consultar e indexar. Decidir depois de fechar a lista de dimensões (seção 3).
- **Guardar numerador e denominador** permite recalcular agregações (ex.: somar municípios para obter a UF) corretamente, em vez de fazer média de percentuais.
- O CRUD de `Tema`, `Indicador` e `Dimensao` sai direto do FastCRUD. As consultas de `ValorIndicador` (séries, rankings, mapas) serão endpoints próprios.

---

## 7. Perguntas para a área técnica

1. Quais indicadores entram na **primeira versão** do hub? (Sugestão: 3 a 5.)
2. Quais são as **fontes de dados** e como os dados chegam (banco, API, arquivos)?
3. Os indicadores do Aurora (positividade, alertas, risco) **fazem parte do hub** ou o hub é para outro conjunto?
4. Qual o **menor nível territorial** permitido para exibição pública?
5. Há regra de **supressão de valores pequenos** por questão de sigilo?
6. Qual a **faixa etária padrão**?
7. Quem é o **responsável técnico** por cada indicador?
8. O hub será **público** ou restrito a usuários autenticados?
9. É necessário **exportar dados** (CSV, planilha) ou gráficos?

---

## 8. Pendências

- [ ] Validar ou substituir os indicadores da seção 4
- [ ] Preencher fontes de dados e responsáveis
- [ ] Fechar faixas etárias e níveis territoriais
- [ ] Documentar o método de detecção de sinais e de risco (IND-004 e IND-005)
- [ ] Responder às perguntas da seção 7

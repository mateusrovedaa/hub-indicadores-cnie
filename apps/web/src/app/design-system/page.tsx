import type { Metadata } from "next";
import { Download, Plus } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/components/ui/message";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = { title: "Design system" };

/**
 * Vitrine do design system: critério de aceite visual.
 * Compare cada seção com o frame indicado do Figma (Aurora-Designs-08-2026).
 */

function Secao({ titulo, figma, children }: { titulo: string; figma: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">{titulo}</h2>
        <span className="text-xs text-muted-foreground">Figma: {figma}</span>
      </div>
      {children}
    </section>
  );
}

const CORES: [string, string, string][] = [
  ["primary", "--primary", "blue-warm-vivid-70"],
  ["primary-hover", "--primary-hover", "blue-warm-vivid-80"],
  ["foreground", "--foreground", "gray-90"],
  ["muted-foreground", "--muted-foreground", "gray-60"],
  ["surface-subtle", "--surface-subtle", "gray-02"],
  ["secondary", "--secondary", "gray-05"],
  ["accent", "--accent", "blue-warm-vivid-05"],
  ["border", "--border", "gray-20"],
  ["input", "--input", "gray-20"],
  ["ring (foco)", "--ring", "gold-vivid-40"],
  ["success", "--success", "green-cool-vivid-50"],
  ["destructive", "--destructive", "red-vivid-50"],
  ["warning", "--warning", "yellow-vivid-20"],
  ["info", "--info", "blue-warm-vivid-60"],
  ["surface-inverse", "--surface-inverse", "blue-warm-vivid-90"],
];

const TIPOGRAFIA: [string, string][] = [
  ["h1", "Light 41.8"],
  ["h2", "Regular 34.84"],
  ["h3", "Medium 29.03"],
  ["h4", "SemiBold 24.19"],
  ["h5", "SemiBold 20.16"],
  ["h6", "Bold 16.8"],
];

export default function DesignSystemPage() {
  return (
    <>
      <PageHeader
        titulo="Design system"
        descricao="Tokens e componentes do DS GovBR aplicados ao hub, com a mesma camada semântica do Aurora. Use esta página para conferir a implementação contra o Figma."
      />

      <Secao titulo="Cores semânticas" figma="estilos de cor (463), camada semântica em tokens.css">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {CORES.map(([nome, token, origem]) => (
            <li key={token} className="flex flex-col gap-2">
              <span className="h-16 rounded-lg border" style={{ background: `var(${token})` }} />
              <span className="text-sm font-semibold">{nome}</span>
              <span className="text-xs text-muted-foreground">{origem}</span>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao titulo="Paleta de gráficos" figma="não existe no Figma; paleta do Aurora">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="flex items-center gap-2 text-sm">
              <span className="size-6 rounded-sm" style={{ background: `var(--chart-${n})` }} />
              chart-{n}
            </span>
          ))}
        </div>
      </Secao>

      <Secao titulo="Tipografia" figma="font-type (20:824), Rawline, escala 1.2 base 14">
        <div className="flex flex-col gap-4">
          {TIPOGRAFIA.map(([Tag, especificacao]) => {
            const H = Tag as "h1";
            return (
              <div key={Tag} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="w-32 text-xs text-muted-foreground">
                  {Tag}, {especificacao}
                </span>
                <H>Positividade laboratorial</H>
              </div>
            );
          })}
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="w-32 text-xs text-muted-foreground">paragraph, Regular 14</span>
            <p className="max-w-2xl">
              Proporção de exames com resultado positivo entre os exames com resultado liberado na semana.
            </p>
          </div>
        </div>
      </Secao>

      <Secao titulo="Botões" figma="button (15:17)">
        <div className="flex flex-col gap-4">
          {(["primary", "secondary", "tertiary"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-xs text-muted-foreground">{v}</span>
              <Button variant={v} size="sm">Pequeno</Button>
              <Button variant={v}>Médio</Button>
              <Button variant={v} size="lg">Grande</Button>
              <Button variant={v}>
                <Download /> Com ícone
              </Button>
              <Button variant={v} disabled>Desabilitado</Button>
              <Button variant={v} size="icon" aria-label="Adicionar">
                <Plus />
              </Button>
            </div>
          ))}
        </div>
      </Secao>

      <Secao titulo="Tags" figma="tag (75:1228), type=status">
        <div className="flex flex-wrap gap-2">
          <Badge>Neutra</Badge>
          <Badge variant="primary">Primária</Badge>
          <Badge variant="success">Sucesso</Badge>
          <Badge variant="warning">Atenção</Badge>
          <Badge variant="danger">Perigo</Badge>
          <Badge variant="info">Informação</Badge>
        </div>
      </Secao>

      <Secao titulo="Campos" figma="input (20:1025), select (24:393)">
        <div className="grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-input">Rótulo</Label>
            <Input id="ds-input" placeholder="Texto de exemplo" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-input-erro">Com erro</Label>
            <Input id="ds-input-erro" defaultValue="Valor inválido" aria-invalid />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-input-off">Desabilitado</Label>
            <Input id="ds-input-off" placeholder="Indisponível" disabled />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-select">Seleção</Label>
            <Select defaultValue="br">
              <SelectTrigger id="ds-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="br">Brasil</SelectItem>
                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Secao>

      <Secao titulo="Mensagens" figma="message (74:634)">
        <div className="grid gap-3 md:grid-cols-2">
          <Message state="success" title="Sucesso">Dados carregados.</Message>
          <Message state="danger" title="Erro">Não foi possível conectar à API.</Message>
          <Message state="info" title="Informação">Dados atualizados semanalmente.</Message>
          <Message state="warning" title="Atenção">Semana com dados incompletos.</Message>
        </div>
      </Secao>

      <Secao titulo="Elevação" figma="estilos ⛅ Elevação/Camada 1–4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {(["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"] as const).map((s, i) => (
            <div key={s} className={`rounded-lg bg-card p-6 text-sm ${s}`}>
              Camada {i + 1}
              <span className="block text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </Secao>

      <Secao titulo="Card" figma="card (191:6752) + card-area">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Título do card</CardTitle>
            <CardDescription>Área header</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">Área content.</CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary">Ação</Button>
          </CardFooter>
        </Card>
      </Secao>

      <Secao titulo="Abas" figma="tab (78:888), tab-item (78:852)">
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Visão geral</TabsTrigger>
            <TabsTrigger value="b">Ficha técnica</TabsTrigger>
            <TabsTrigger value="c">Dados</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="text-sm">Conteúdo da primeira aba.</TabsContent>
          <TabsContent value="b" className="text-sm">Conteúdo da segunda aba.</TabsContent>
          <TabsContent value="c" className="text-sm">Conteúdo da terceira aba.</TabsContent>
        </Tabs>
      </Secao>

      <Secao titulo="Tabela" figma="table (106:767), table-header (91:218)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UF</TableHead>
              <TableHead className="text-right">Positividade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>RS</TableCell>
              <TableCell className="text-right tabular-nums">11,2%</TableCell>
            </TableRow>
            <TableRow data-selected="true">
              <TableCell>SC (selecionada)</TableCell>
              <TableCell className="text-right tabular-nums">9,8%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PR</TableCell>
              <TableCell className="text-right tabular-nums">8,4%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Secao>
    </>
  );
}

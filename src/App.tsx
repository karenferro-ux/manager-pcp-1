import React, { useState } from "react";
import "./styles.css";
import {
  LayoutDashboard,
  FileText,
  Network,
  CalendarDays,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Loader2,
} from "lucide-react";

// --- ESTADO VAZIO (Como o app começa) ---
const projetoVazio = {
  nome: "",
  justificativa: "",
  objetivo: "",
  beneficios: "",
  produto: "",
  produtoMvp: "",
  requisitos: "",
  premissas: "",
  stakeholders: "",
  equipe: "",
  entregaveis: "",
  riscos: "",
  restricoes: "",
  kpis: "",
  orcamentoTotal: "",
  orcamentoAnalise: "",
  orcamentoItens: "",
  orcamentoRodaPe: "",
  prazoTotal: "",
  statusAtual: "",
  marcos: [] as Array<{
    id: string;
    label: string;
    start: number;
    end: number;
  }>,
  eap: null as any,
};

// --- DADOS REAIS EXTRAÍDOS DO PDF ---
const projetoAnalisado = {
  nome: "PROJETO: TESTE DE CRONOGRAMA",
  justificativa:
    "• Estruturar planejamento e execução de forma clara\n• Garantir entregas alinhadas aos objetivos\n• Controlar a qualidade e o lançamento oficial",
  objetivo:
    "E: Concluir as 4 fases do projeto conforme cronograma\nM: 100% dos pacotes validados e aprovados\nA: Escopo, equipe e recursos definidos\nR: Entrega formalizada e documentada\nT: Execução distribuída em 15 semanas (4 fases)",
  beneficios:
    "• Visão clara das etapas (do planejamento ao encerramento)\n• Controle de qualidade integrado na execução\n• Documentação técnica e lições aprendidas registradas",
  produto: "Projeto estruturado em 4 fases principais",
  produtoMvp:
    "• Documentação de Escopo e Recursos\n• Componentes e conteúdos desenvolvidos\n• Ambiente final validado (go-live)\n• Arquivamento formal de materiais",
  requisitos:
    "• Checkpoints e revisões de progresso\n• Testes e validações de qualidade\n• Treinamento da equipe de operação e suporte",
  premissas:
    "• Equipe de execução devidamente alocada\n• Orçamento e ferramentas disponíveis\n• Partes interessadas mapeadas no início",
  stakeholders:
    "• Patrocinador do Projeto\n• Equipe de Execução\n• Equipe de Operação e Suporte\n• Público Final",
  equipe:
    "Gerenciamento e Execução:\nEquipe responsável pelo Planejamento, Desenvolvimento, Controle de Qualidade, Operação e Suporte.",
  entregaveis:
    "1. Matriz de responsabilidades\n2. Componentes desenvolvidos\n3. Pré-aprovação dos responsáveis\n4. Documentação técnica e de usuário\n5. Relatório de lições aprendidas",
  riscos:
    "Falhas na execução → Testes e validações na etapa 2.2\nProblemas no go-live → Validação do ambiente na etapa 3.1\nDesalinhamento → Checkpoints periódicos na etapa 2.1",
  restricoes:
    "• Entregas condicionadas à pré-aprovação formal\n• Lançamento oficial apenas após treinamento da equipe\n• Encerramento vinculado à coleta de feedbacks",
  kpis: "• % de componentes desenvolvidos no prazo\n• Quantidade de falhas corrigidas antes do go-live\n• Métricas e desempenho imediato pós-lançamento\n• Índice de satisfação nos feedbacks finais",
  orcamentoTotal: "R$ 20.000",
  orcamentoAnalise:
    "Distribuição:\n• 40% Execução\n• 25% Planejamento\n• 20% Lançamento\n• 15% Encerramento",
  orcamentoItens:
    "• Planejamento e Recursos — R$ 5.000\n• Criação e Qualidade — R$ 8.000\n• Preparação e Go-Live — R$ 4.000\n• Avaliação e Fechamento — R$ 3.000",
  orcamentoRodaPe: "Detalhado na etapa 1.2 (Alocação de Recursos)",
  prazoTotal: "15 Semanas",
  statusAtual: "Em Planejamento",
  marcos: [
    { id: "M1", label: "S1–S3 (Planejamento)", start: 1, end: 3 },
    { id: "M2", label: "S4–S9 (Execução)", start: 4, end: 9 },
    { id: "M3", label: "S10–S12 (Lançamento)", start: 10, end: 12 },
    { id: "M4", label: "S13–S15 (Encerramento)", start: 13, end: 15 },
  ],
  eap: {
    raiz: {
      titulo: "PROJETO — TESTE DE CRONOGRAMA",
      subtitulo: "Estrutura Analítica do Projeto (4 Fases Principais)",
    },
    fases: [
      {
        id: "1",
        nome: "Planejamento do Projeto",
        prazo: "Semanas 1–3",
        pacotes: [
          {
            id: "1.1",
            desc: "Definição de Escopo:\n• Alinhar objetivos e metas\n• Mapear stakeholders\n• Definir entregáveis e critérios de aceite",
          },
          {
            id: "1.2",
            desc: "Alocação de Recursos:\n• Montar equipe de execução\n• Definir orçamento e ferramentas\n• Elaborar matriz de responsabilidades",
          },
        ],
      },
      {
        id: "2",
        nome: "Execução",
        prazo: "Semanas 4–9",
        pacotes: [
          {
            id: "2.1",
            desc: "Criação e Desenvolvimento:\n• Estruturar modelo base/arquitetura\n• Desenvolver componentes e conteúdos\n• Realizar checkpoints e revisões",
          },
          {
            id: "2.2",
            desc: "Controle de Qualidade:\n• Executar testes e validações\n• Corrigir falhas e aplicar ajustes\n• Obter pré-aprovação dos responsáveis",
          },
        ],
      },
      {
        id: "3",
        nome: "Lançamento",
        prazo: "Semanas 10–12",
        pacotes: [
          {
            id: "3.1",
            desc: "Preparação Final:\n• Finalizar documentação técnica/usuário\n• Treinar equipe de operação e suporte\n• Validar ambiente final (go-live)",
          },
          {
            id: "3.2",
            desc: "Entrega Oficial:\n• Liberar projeto para o público final\n• Acompanhar métricas e desempenho imediato",
          },
        ],
      },
      {
        id: "4",
        nome: "Encerramento",
        prazo: "Semanas 13–15",
        pacotes: [
          {
            id: "4.1",
            desc: "Avaliação e Fechamento:\n• Coletar feedbacks dos usuários e equipe\n• Documentar lições aprendidas\n• Formalizar entrega e arquivar materiais",
          },
        ],
      },
    ],
    rastreabilidade: [
      {
        id: "a",
        nome: "Objetivos, Metas e Stakeholders",
        ref: "1.1.1 a 1.1.3",
      },
      {
        id: "b",
        nome: "Equipe, Orçamento e Matriz RACI",
        ref: "1.2.1 a 1.2.3",
      },
      {
        id: "c",
        nome: "Arquitetura, Componentes e Checkpoints",
        ref: "2.1.1 a 2.1.3",
      },
      {
        id: "d",
        nome: "Testes, Correções e Pré-aprovação",
        ref: "2.2.1 a 2.2.3",
      },
      {
        id: "e",
        nome: "Documentação, Treinamento e Go-live",
        ref: "3.1.1 a 3.1.3",
      },
      {
        id: "f",
        nome: "Liberação Oficial e Métricas Iniciais",
        ref: "3.2.1 a 3.2.2",
      },
      {
        id: "g",
        nome: "Feedbacks, Lições Aprendidas e Arquivamento",
        ref: "4.1.1 a 4.1.3",
      },
    ],
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("canvas");
  const [canvasData, setCanvasData] = useState(projetoVazio);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isProjectEmpty = canvasData.nome === "";

  const handleCanvasChange = (campo: string, valor: string) => {
    setCanvasData({ ...canvasData, [campo]: valor });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setCanvasData(projetoAnalisado);
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const handlePacoteChange = (
    faseIndex: number,
    pacoteIndex: number,
    novoValor: string
  ) => {
    if (!canvasData.eap) return;
    const novoEap = { ...canvasData.eap };
    novoEap.fases[faseIndex].pacotes[pacoteIndex].desc = novoValor;
    setCanvasData({ ...canvasData, eap: novoEap });
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 font-sans overflow-hidden">
      {/* CSS PARA IMPRESSÃO EM PAISAGEM */}
      <style>
        {`
          @media print {
            @page {
              size: landscape;
              margin: 8mm;
            }
          }
        `}
      </style>

      {/* MENU LATERAL */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10 print:hidden">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard size={24} className="text-blue-500" />
            Project Manager
          </h1>
          <p className="text-xs text-gray-400 mt-1">Planejamento e Controle</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <MenuButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon={<LayoutDashboard />}
            label="Painel Inicial"
          />
          <MenuButton
            active={activeTab === "canvas"}
            onClick={() => setActiveTab("canvas")}
            icon={<FileText />}
            label="Canvas Project"
          />
          <MenuButton
            active={activeTab === "eap"}
            onClick={() => setActiveTab("eap")}
            icon={<Network />}
            label="EAP (WBS)"
          />
          <MenuButton
            active={activeTab === "gantt"}
            onClick={() => setActiveTab("gantt")}
            icon={<CalendarDays />}
            label="Cronograma"
          />
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm print:hidden">
          <h2 className="text-lg font-semibold text-slate-800">
            {activeTab === "dashboard" && "Visão Geral do Projeto"}
            {activeTab === "canvas" && "PROJECT MODEL CANVAS"}
            {activeTab === "eap" && "Estrutura Analítica do Projeto"}
            {activeTab === "gantt" && "Cronograma de Marcos"}
          </h2>

          <div className="flex gap-3">
            <label
              className={`flex items-center gap-2 text-white px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors shadow-sm ${
                isAnalyzing
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Analisando
                  Documento...
                </>
              ) : (
                <>
                  <Upload size={16} /> Analisar Documento
                </>
              )}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfUpload}
                disabled={isAnalyzing}
              />
            </label>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
            >
              <Printer size={16} /> Exportar / Imprimir
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 print:p-0 print:bg-white print:overflow-visible">
          {/* 1. DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="max-w-5xl mx-auto space-y-6">
              {isProjectEmpty ? (
                <EstadoVazio />
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <input
                    className="w-full text-3xl font-bold mb-2 text-slate-800 bg-transparent outline-none"
                    value={canvasData.nome}
                    onChange={(e) => handleCanvasChange("nome", e.target.value)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <StatusCard
                      label="Orçamento"
                      value="R$ 20.000"
                      icon={
                        <AlertCircle size={24} className="text-yellow-500" />
                      }
                    />
                    <StatusCard
                      label="Prazo Total"
                      value="15 Semanas"
                      icon={<Clock size={24} className="text-blue-500" />}
                    />
                    <StatusCard
                      label="Status Atual"
                      value="Em Planejamento"
                      icon={
                        <CheckCircle size={24} className="text-green-500" />
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. CANVAS PROJECT (Fontes ampliadas e preenchimento equilibrado) */}
          {activeTab === "canvas" && (
            <div className="max-w-[1440px] mx-auto bg-white p-6 print:p-2 border border-gray-200 shadow-sm flex flex-col gap-5 print:gap-3 relative">
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded">
                  <Loader2
                    size={48}
                    className="animate-spin text-indigo-600 mb-4"
                  />
                  <p className="text-lg font-bold text-slate-800">
                    Processando PDF...
                  </p>
                  <p className="text-sm text-gray-500">
                    Extraindo informações e estruturas do documento
                  </p>
                </div>
              )}

              <div className="flex flex-col border-b border-gray-200 pb-2">
                <h1 className="text-2xl md:text-3xl print:text-xl font-extrabold text-gray-800 uppercase tracking-tight">
                  PROJECT MODEL CANVAS: {canvasData.nome}
                </h1>
              </div>

              {/* LINHA 1 */}
              <div className="flex flex-col">
                <h2 className="text-lg print:text-sm font-extrabold text-gray-800 mb-2">
                  1. POR QUÊ?
                </h2>
                <div className="grid grid-cols-12 gap-4 items-stretch min-h-[175px] print:min-h-[130px]">
                  <div className="col-span-3 flex flex-col h-full">
                    <CanvasBlockHeader
                      cor="bg-[#5B63BC]"
                      titulo="JUSTIFICATIVA DO PROJETO"
                    />
                    <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                      <textarea
                        placeholder="Aguardando..."
                        className="w-full flex-1 resize-none outline-none text-sm print:text-xs leading-relaxed text-gray-800 bg-transparent"
                        value={canvasData.justificativa}
                        onChange={(e) =>
                          handleCanvasChange("justificativa", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-6 relative border border-[#52B6B9] rounded-t flex flex-col h-full">
                    <div className="bg-[#52B6B9] text-white font-bold text-sm print:text-xs py-2 px-3 uppercase rounded-t">
                      OBJETIVO SMART
                    </div>
                    <div className="p-3 flex gap-3 flex-1 bg-white">
                      <textarea
                        placeholder="Aguardando..."
                        className="w-2/3 flex-1 resize-none outline-none text-sm print:text-xs leading-relaxed text-gray-800 bg-transparent"
                        value={canvasData.objetivo}
                        onChange={(e) =>
                          handleCanvasChange("objetivo", e.target.value)
                        }
                      />
                      <div className="w-1/3 flex flex-col items-center justify-end border-l border-gray-200 pl-3">
                        <div className="text-center w-full text-sm font-extrabold text-gray-800 mb-2">
                          100%
                        </div>
                        <div className="flex items-end justify-center gap-5 h-20 w-full border-b-2 border-gray-400 pb-1">
                          <div className="flex flex-col items-center">
                            <div className="h-12 w-11 border-2 border-dashed border-blue-500 bg-blue-50/40 flex items-center justify-center text-[10px] text-blue-700 font-bold text-center leading-tight">
                              a medir
                            </div>
                            <span className="text-[11px] font-bold mt-1 text-gray-700">
                              Baseline
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-16 w-11 bg-[#E88636] rounded-t-sm"></div>
                            <span className="text-[11px] font-bold mt-1 text-gray-700">
                              Meta
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 flex flex-col h-full">
                    <CanvasBlockHeader cor="bg-[#52B6B9]" titulo="BENEFÍCIOS" />
                    <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                      <textarea
                        placeholder="Aguardando..."
                        className="w-full flex-1 resize-none outline-none text-sm print:text-xs leading-relaxed text-gray-800 bg-transparent"
                        value={canvasData.beneficios}
                        onChange={(e) =>
                          handleCanvasChange("beneficios", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* LINHA 2 */}
              <div className="grid grid-cols-12 gap-4 items-stretch min-h-[210px] print:min-h-[160px]">
                <div className="col-span-7 flex flex-col h-full">
                  <div className="flex items-center mb-2 gap-3">
                    <h2 className="text-lg print:text-sm font-extrabold text-gray-800 whitespace-nowrap">
                      2. O QUÊ?
                    </h2>
                    <div className="bg-[#44A047] text-white text-sm print:text-xs font-bold px-3 py-1.5 rounded-t-lg flex-1 flex items-center">
                      PRODUTO:{" "}
                      <input
                        className="bg-transparent outline-none ml-2 w-full text-white placeholder-green-200"
                        value={canvasData.produto}
                        onChange={(e) =>
                          handleCanvasChange("produto", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 flex-1 items-stretch">
                    <div className="flex flex-col h-full">
                      <CanvasBlockHeader
                        cor="bg-[#5374C9]"
                        titulo="PRODUTO (MVP)"
                      />
                      <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                        <textarea
                          className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                          value={canvasData.produtoMvp}
                          onChange={(e) =>
                            handleCanvasChange("produtoMvp", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <CanvasBlockHeader
                        cor="bg-[#44A047]"
                        titulo="REQUISITOS CHAVE"
                      />
                      <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                        <textarea
                          className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                          value={canvasData.requisitos}
                          onChange={(e) =>
                            handleCanvasChange("requisitos", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <CanvasBlockHeader
                        cor="bg-[#E49136]"
                        titulo="PREMISSAS"
                      />
                      <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                        <textarea
                          className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                          value={canvasData.premissas}
                          onChange={(e) =>
                            handleCanvasChange("premissas", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 flex flex-col h-full">
                  <h2 className="text-lg print:text-sm font-extrabold text-gray-800 mb-2">
                    3. QUEM?
                  </h2>
                  <div className="grid grid-cols-2 gap-3 flex-1 items-stretch">
                    <div className="flex flex-col h-full">
                      <CanvasBlockHeader
                        cor="bg-[#E49136]"
                        titulo="STAKEHOLDERS"
                      />
                      <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                        <textarea
                          className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                          value={canvasData.stakeholders}
                          onChange={(e) =>
                            handleCanvasChange("stakeholders", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="border border-[#C93F72] rounded-t flex flex-col h-full">
                      <div className="bg-[#C93F72] text-white font-bold text-sm print:text-xs py-2 px-3 uppercase rounded-t">
                        EQUIPE DO PROJETO
                      </div>
                      <div className="p-3 bg-white flex flex-col gap-2 flex-1">
                        <div className="flex gap-2">
                          <div className="w-9 h-9 rounded-full bg-[#C93F72] text-white flex items-center justify-center font-bold text-xs">
                            GP
                          </div>
                          <div className="w-9 h-9 rounded-full bg-[#C93F72]/80 text-white flex items-center justify-center font-bold text-xs">
                            EQ
                          </div>
                        </div>
                        <textarea
                          className="w-full flex-1 resize-none outline-none mt-1 text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                          value={canvasData.equipe}
                          onChange={(e) =>
                            handleCanvasChange("equipe", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LINHA 3 */}
              <div className="grid grid-cols-12 gap-4 items-stretch min-h-[360px] print:min-h-[280px]">
                <div className="col-span-7 flex flex-col h-full">
                  <h2 className="text-lg print:text-sm font-extrabold text-gray-800 mb-2">
                    4. COMO?
                  </h2>
                  <div className="grid grid-cols-2 gap-3 flex-1 items-stretch">
                    <div className="flex flex-col gap-3 flex-1">
                      <div className="flex flex-col flex-1">
                        <CanvasBlockHeader
                          cor="bg-[#8E53C9]"
                          titulo="GRUPO DE ENTREGAS"
                        />
                        <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                          <textarea
                            className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                            value={canvasData.entregaveis}
                            onChange={(e) =>
                              handleCanvasChange("entregaveis", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <CanvasBlockHeader
                          cor="bg-[#52B6B9]"
                          titulo="MITIGAÇÃO DE RISCOS"
                        />
                        <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                          <textarea
                            className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                            value={canvasData.riscos}
                            onChange={(e) =>
                              handleCanvasChange("riscos", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <div className="flex flex-col flex-1">
                        <CanvasBlockHeader
                          cor="bg-[#52B6B9]"
                          titulo="RESTRIÇÕES"
                        />
                        <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                          <textarea
                            className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                            value={canvasData.restricoes}
                            onChange={(e) =>
                              handleCanvasChange("restricoes", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <CanvasBlockHeader
                          cor="bg-[#E49136]"
                          titulo="MÉTRICAS (KPIs)"
                        />
                        <div className="border border-gray-200 p-3 flex-1 bg-white flex flex-col">
                          <textarea
                            className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed text-gray-800 bg-transparent"
                            value={canvasData.kpis}
                            onChange={(e) =>
                              handleCanvasChange("kpis", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 flex flex-col h-full">
                  <h2 className="text-lg print:text-sm font-extrabold text-gray-800 mb-2">
                    5. QUANDO & QUANTO?
                  </h2>
                  <div className="flex flex-col gap-3 flex-1 items-stretch">
                    {/* CRONOGRAMA & MARCOS */}
                    <div className="border border-[#8E53C9] rounded-t flex flex-col">
                      <div className="bg-[#8E53C9] text-white font-bold text-sm print:text-xs py-2 px-3 uppercase rounded-t">
                        CRONOGRAMA & MARCOS
                      </div>
                      <div className="p-3 bg-white min-h-[155px] flex flex-col justify-center">
                        {isProjectEmpty ? (
                          <div className="text-gray-400 italic text-center text-sm w-full">
                            O gráfico será gerado após análise do documento.
                          </div>
                        ) : (
                          <>
                            <div className="relative w-full h-[115px] border-b-2 border-gray-800">
                              {canvasData.marcos.map((m, i) => {
                                const topPx = 6 + i * 26;
                                const leftPx = 32 + (m.start - 1) * 18;
                                const widthPx = (m.end - m.start + 1) * 18;
                                return (
                                  <React.Fragment key={m.id}>
                                    <div
                                      className="absolute left-0 font-extrabold text-xs text-gray-800"
                                      style={{ top: `${topPx}px` }}
                                    >
                                      {m.id}
                                    </div>
                                    <div
                                      className="absolute bg-[#8E53C9] h-3 rounded"
                                      style={{
                                        top: `${topPx + 2}px`,
                                        left: `${leftPx}px`,
                                        width: `${widthPx}px`,
                                      }}
                                    ></div>
                                    <span
                                      className="absolute font-bold text-xs text-gray-700 whitespace-nowrap"
                                      style={{
                                        top: `${topPx}px`,
                                        left: `${leftPx + widthPx + 8}px`,
                                      }}
                                    >
                                      {m.label}
                                    </span>
                                  </React.Fragment>
                                );
                              })}
                            </div>
                            <div className="flex justify-between font-bold text-xs text-gray-700 mt-1.5 px-8">
                              <span>S1</span>
                              <span>S5</span>
                              <span>S10</span>
                              <span>S15</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ORÇAMENTO */}
                    <div className="border border-[#A8347D] rounded-t flex flex-col flex-1 h-full">
                      <div className="bg-[#A8347D] text-white font-bold text-sm print:text-xs py-2 px-3 uppercase rounded-t flex justify-between items-center">
                        <span>ORÇAMENTO</span>
                        <div className="flex items-center gap-1 font-bold">
                          Total:{" "}
                          <input
                            className="bg-transparent text-right outline-none w-24 font-bold text-white placeholder-pink-200"
                            value={canvasData.orcamentoTotal}
                            onChange={(e) =>
                              handleCanvasChange(
                                "orcamentoTotal",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-white flex items-stretch gap-3 flex-1 h-full">
                        <div className="relative w-24 h-24 flex-shrink-0 self-center">
                          {isProjectEmpty ? (
                            <svg
                              viewBox="0 0 32 32"
                              className="w-full h-full transform -rotate-90 rounded-full opacity-30"
                            >
                              <circle
                                r="16"
                                cx="16"
                                cy="16"
                                fill="transparent"
                                stroke="#128373"
                                strokeWidth="32"
                                strokeDasharray="100 100"
                              ></circle>
                              <circle
                                r="8"
                                cx="16"
                                cy="16"
                                fill="white"
                              ></circle>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 32 32"
                              className="w-full h-full transform -rotate-90 rounded-full"
                            >
                              <circle
                                r="16"
                                cx="16"
                                cy="16"
                                fill="transparent"
                                stroke="#128373"
                                strokeWidth="32"
                                strokeDasharray="40 100"
                              ></circle>
                              <circle
                                r="16"
                                cx="16"
                                cy="16"
                                fill="transparent"
                                stroke="#E68A2E"
                                strokeWidth="32"
                                strokeDasharray="25 100"
                                strokeDashoffset="-40"
                              ></circle>
                              <circle
                                r="16"
                                cx="16"
                                cy="16"
                                fill="transparent"
                                stroke="#5C74CD"
                                strokeWidth="32"
                                strokeDasharray="20 100"
                                strokeDashoffset="-65"
                              ></circle>
                              <circle
                                r="16"
                                cx="16"
                                cy="16"
                                fill="transparent"
                                stroke="#B12B7C"
                                strokeWidth="32"
                                strokeDasharray="15 100"
                                strokeDashoffset="-85"
                              ></circle>
                              <circle
                                r="8"
                                cx="16"
                                cy="16"
                                fill="white"
                              ></circle>
                            </svg>
                          )}
                          {!isProjectEmpty && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-[10px] font-bold text-gray-500 leading-none">
                                Total
                              </span>
                              <span className="text-xs font-extrabold text-gray-800 leading-tight">
                                20k
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="w-36 flex flex-col border-r border-gray-200 pr-3">
                          <span className="text-xs font-bold text-gray-800 mb-1 border-b border-gray-100 pb-1">
                            Análise de Custos
                          </span>
                          <textarea
                            className="w-full flex-1 resize-none outline-none text-xs leading-snug text-gray-600 bg-transparent"
                            value={canvasData.orcamentoAnalise}
                            onChange={(e) =>
                              handleCanvasChange(
                                "orcamentoAnalise",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex-1 flex flex-col pl-1 h-full">
                          <textarea
                            className="w-full flex-1 resize-none outline-none text-[13px] print:text-xs leading-relaxed font-medium text-gray-800 bg-transparent"
                            value={canvasData.orcamentoItens}
                            onChange={(e) =>
                              handleCanvasChange(
                                "orcamentoItens",
                                e.target.value
                              )
                            }
                          />
                          <input
                            className="text-[11px] text-gray-500 italic outline-none w-full mt-2 font-semibold bg-transparent"
                            value={canvasData.orcamentoRodaPe}
                            onChange={(e) =>
                              handleCanvasChange(
                                "orcamentoRodaPe",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. EAP HIERÁRQUICA (Fontes e cartões ampliados) */}
          {activeTab === "eap" && (
            <div className="w-full max-w-none mx-auto bg-white p-8 print:p-2 rounded shadow-sm border border-gray-200 overflow-x-auto min-h-screen">
              {isProjectEmpty || !canvasData.eap ? (
                <EstadoVazio />
              ) : (
                <div className="min-w-[1200px] pb-10">
                  {/* CABEÇALHO EAP */}
                  <div className="mb-8 border-b border-gray-200 pb-3">
                    <h1 className="text-2xl font-extrabold text-[#1e3a8a]">
                      Estrutura Analítica do Projeto (EAP)
                    </h1>
                  </div>

                  {/* ESTRUTURA EM ÁRVORE */}
                  <div className="flex flex-col items-center">
                    {/* Nível 0 (Raiz) */}
                    <div className="bg-[#243A73] text-white px-10 py-4 rounded-md text-center shadow-md relative z-10 min-w-[400px]">
                      <h2 className="font-extrabold text-base uppercase tracking-wide">
                        {canvasData.eap.raiz.titulo}
                      </h2>
                      <p className="text-xs text-blue-200 mt-1">
                        {canvasData.eap.raiz.subtitulo}
                      </p>
                    </div>

                    {/* Linha Central Descendo */}
                    <div className="w-[2px] h-7 bg-[#243A73]"></div>

                    {/* Linha Horizontal (Conecta as Fases) */}
                    <div className="w-[78%] h-[2px] bg-[#243A73] relative">
                      <div className="absolute top-0 left-0 w-[2px] h-7 bg-[#243A73]"></div>
                      <div className="absolute top-0 left-[33.33%] w-[2px] h-7 bg-[#243A73] -translate-x-1/2"></div>
                      <div className="absolute top-0 left-[66.66%] w-[2px] h-7 bg-[#243A73] -translate-x-1/2"></div>
                      <div className="absolute top-0 right-0 w-[2px] h-7 bg-[#243A73]"></div>
                    </div>

                    {/* Nível 1 e 2 (Grade com 4 colunas) */}
                    <div className="w-full mt-7 grid grid-cols-4 gap-5 px-8">
                      {canvasData.eap.fases.map((fase: any, fIndex: number) => (
                        <div
                          key={fase.id}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-[#243A73] text-white w-full rounded-md p-4 shadow-md min-h-[105px] flex flex-col justify-between">
                            <div>
                              <span className="font-extrabold text-xl leading-none text-blue-200">
                                {fase.id}
                              </span>
                              <h3 className="font-bold text-sm leading-snug mt-1.5">
                                {fase.nome}
                              </h3>
                            </div>
                            <span className="text-xs text-blue-200 mt-2 font-medium">
                              {fase.prazo}
                            </span>
                          </div>

                          {fase.pacotes.length > 0 && (
                            <div className="w-[2px] h-5 bg-gray-300"></div>
                          )}

                          <div className="w-full flex flex-col gap-3">
                            {fase.pacotes.map((pacote: any, pIndex: number) => (
                              <div
                                key={pacote.id}
                                className="bg-[#f8faff] border border-[#a5b4fc] w-full p-4 rounded-md shadow-sm flex flex-col hover:border-blue-500 transition-colors"
                              >
                                <span className="text-[#1e3a8a] font-extrabold text-xs mb-1.5">
                                  {pacote.id}
                                </span>
                                <textarea
                                  className="w-full bg-transparent resize-none outline-none text-[13px] leading-relaxed text-gray-800 font-medium"
                                  style={{ minHeight: "105px" }}
                                  value={pacote.desc}
                                  onChange={(e) =>
                                    handlePacoteChange(
                                      fIndex,
                                      pIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TABELA DE RASTREABILIDADE */}
                  <div className="mt-14 pt-6 border-t border-gray-300 px-8">
                    <h3 className="font-extrabold text-[#1e3a8a] text-base mb-4">
                      Rastreabilidade de Entregas
                    </h3>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-3">
                      {canvasData.eap.rastreabilidade.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center text-sm border-b border-gray-100 pb-1.5"
                        >
                          <span className="text-gray-800 font-medium">
                            {item.id}) {item.nome}
                          </span>
                          <span className="font-bold text-[#1e3a8a] whitespace-nowrap">
                            {item.ref}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. GANTT */}
          {activeTab === "gantt" && (
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              {isProjectEmpty ? (
                <EstadoVazio />
              ) : (
                <>
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-6">
                    Cronograma de Execução (15 Semanas)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="border-b-2 border-gray-300 bg-gray-50">
                          <th className="p-3 font-bold text-sm w-48 text-slate-800">
                            Marco / Fase
                          </th>
                          {Array.from({ length: 15 }).map((_, i) => (
                            <th
                              key={i}
                              className="p-2.5 text-center text-xs text-gray-600 font-bold w-12 border-l border-gray-200"
                            >
                              S{i + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {canvasData.marcos.map((marco, i) => (
                          <GanttRow
                            key={i}
                            marco={marco.id}
                            label={marco.label}
                            start={marco.start}
                            end={marco.end}
                            color="bg-[#243A73]"
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function EstadoVazio() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Upload size={64} className="text-gray-300 mb-4" />
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        Nenhum Projeto Carregado
      </h3>
      <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
        Faça o upload do arquivo PDF clicando em "Analisar Documento".
        <br />
        <br />O sistema irá preencher todas as estruturas automaticamente.
      </p>
    </div>
  );
}

function MenuButton({ active, icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-md transition-all ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon} <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function StatusCard({ label, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase mb-1">
          {label}
        </p>
        <p className="text-2xl font-extrabold text-slate-800">{value}</p>
      </div>
      <div className="bg-gray-50 p-3.5 rounded-full">{icon}</div>
    </div>
  );
}

function CanvasBlockHeader({ cor, titulo }: { cor: string; titulo: string }) {
  return (
    <div
      className={`${cor} text-white font-bold text-sm print:text-xs py-2 px-3 uppercase rounded-t`}
    >
      {titulo}
    </div>
  );
}

function GanttRow({ marco, label, start, end, color }: any) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60">
      <td className="p-3 font-bold text-sm text-gray-800">
        {marco} — {label}
      </td>
      {Array.from({ length: 15 }).map((_, i) => {
        const week = i + 1;
        const isActive = week >= start && week <= end;
        return (
          <td key={i} className="p-1.5 border-l border-gray-100 relative h-11">
            {isActive && (
              <div
                className={`absolute inset-y-2 ${
                  week === start ? "left-1.5 rounded-l-md" : "left-0"
                } ${
                  week === end ? "right-1.5 rounded-r-md" : "right-0"
                } ${color} opacity-85 flex items-center justify-end pr-1`}
              ></div>
            )}
          </td>
        );
      })}
    </tr>
  );
}

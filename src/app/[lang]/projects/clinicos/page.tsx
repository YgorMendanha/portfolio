import React from "react";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Database,
  MessageSquare,
  Stethoscope,
  Users,
  Wallet,
  CalendarClock,
  FileWarning,
  Smile,
  TrendingUp,
  BrainCircuit,
  Lock,
  ShieldCheck,
  LineChart,
  Mail,
  Phone,
  User,
  ArrowRight,
  Code2,
  Target,
  Briefcase,
  Building2,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const diasRestantes = 43;
  const inscritosIniciais = 3;
  const incrementoPorDiaPassado = 1;
  const totalInscritos =
    inscritosIniciais + (55 - diasRestantes) * incrementoPorDiaPassado;

  const especialidades = [
    "Odontologia",
    "Clínica Geral",
    "Medicina Veterinária",
    "Dermatologia",
    "Cardiologia",
    "Fisioterapia",
    "Psicologia",
    "Nutrição",
  ];

  return (
    <div className="bg-black-purple text-white font-sans selection:bg-cyan-light selection:text-black-purple">
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black-purple/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer select-none">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-purple-bright to-black-purple border border-white/10 group-hover:border-cyan-light/50 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,194,255,0.25)] transition-all duration-500">
              <Activity
                className="text-cyan-light transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                size={22}
              />
            </div>
            <div className="flex flex-col justify-center h-full">
              <span className="text-xl font-bold tracking-tighter text-white leading-none group-hover:text-cyan-light transition-colors duration-300">
                CLINIC OS
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-light-gray/40 uppercase leading-none mt-1 group-hover:text-white transition-colors duration-300">
                System
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <a
              href="#publico-alvo"
              className="text-sm font-medium text-light-gray/70 hover:text-white transition-all relative py-2 group"
            >
              Para quem?
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-light transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00c2ff]"></span>
            </a>
            <a
              href="#funcionalidades"
              className="text-sm font-medium text-light-gray/70 hover:text-white transition-all relative py-2 group"
            >
              Funcionalidades
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-light transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00c2ff]"></span>
            </a>
            <a
              href="#economia"
              className="text-sm font-medium text-light-gray/70 hover:text-white transition-all relative py-2 group"
            >
              Economia
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-light transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00c2ff]"></span>
            </a>
          </nav>

          <a
            href="#cadastro"
            className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 hover:border-cyan-light/40 px-6 py-3 rounded-full text-xs font-bold text-white transition-all duration-300 hover:bg-cyan-light/10 hover:shadow-[0_0_30px_rgba(0,194,255,0.15)] group"
          >
            <span className="tracking-wide">LISTA DE ESPERA</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-light"></span>
            </span>
          </a>
        </div>
      </header>

      <section className="pt-40 pb-10 px-6 relative overflow-hidden bg-black-purple">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-bright/10 blur-[100px] -z-10 rounded-full" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-yellow mb-8 cursor-default select-none hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,204,0,0.1)]">
            <TrendingUp size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Sua clínica no piloto automático
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-white">
            Organize sua clínica e <br className="hidden md:block" />
            <span className="text-cyan-light drop-shadow-[0_0_20px_rgba(0,194,255,0.4)]">
              pare de perder dinheiro.
            </span>
          </h1>

          <div className="text-lg md:text-xl text-light-gray mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            <p className="mb-10 text-light-gray/80">
              Abandone os softwares isolados. Centralize agenda, prontuário,
              financeiro e estoque em um sistema que pensa junto com você.
            </p>

            <div className="bg-black-purple/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-bright/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              <p className="text-sm uppercase tracking-widest text-light-gray/40 font-bold mb-6 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-cyan-light rounded-full animate-pulse"></span>
                Potencializado por Inteligência Artificial
                <span className="w-2 h-2 bg-cyan-light rounded-full animate-pulse"></span>
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="flex items-center gap-4 text-left min-w-[200px]">
                  <div className="bg-purple-bright/20 p-3 rounded-xl text-yellow shadow-[0_0_10px_rgba(63,32,186,0.2)]">
                    <Stethoscope size={28} />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg">
                      Para o Médico
                    </span>
                    <span className="text-xs text-light-gray/60 block leading-tight mt-1">
                      Segunda opinião clínica e<br />
                      diagnóstica em segundos.
                    </span>
                  </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="flex items-center gap-4 text-left min-w-[200px]">
                  <div className="bg-purple-bright/20 p-3 rounded-xl text-cyan-light shadow-[0_0_10px_rgba(63,32,186,0.2)]">
                    <LineChart size={28} />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg">
                      Para o Gestor
                    </span>
                    <span className="text-xs text-light-gray/60 block leading-tight mt-1">
                      Relatórios precisos e ajuda
                      <br />
                      nas tarefas do dia a dia.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <a
              href="#cadastro"
              className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-xl bg-yellow px-12 font-black text-black-purple transition-all duration-300 hover:bg-[#ffdb4d] hover:scale-105 shadow-[0_0_30px_rgba(255,204,0,0.3)] hover:shadow-[0_0_50px_rgba(255,204,0,0.5)]"
            >
              <span className="mr-2 text-lg uppercase tracking-wide">
                Quero Acesso Antecipado
              </span>
              <ChevronRight
                className="transition-transform group-hover:translate-x-1"
                size={20}
              />
            </a>
            <p className="text-xs text-light-gray/40">
              Junte-se a{" "}
              <strong className="text-white">+{totalInscritos} clínicas</strong>{" "}
              na lista de espera.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <p className="text-center text-[10px] tracking-[0.4em] text-cyan-light font-black uppercase mb-10 opacity-80">
      Ecossistema Versátil
    </p>
    
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {especialidades.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-cyan-light/50 hover:bg-cyan-light/5 transition-all duration-300 group shadow-sm hover:shadow-[0_0_20px_rgba(0,194,255,0.15)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-light shadow-[0_0_8px_#00c2ff] group-hover:scale-125 transition-transform"></div>
          <span className="text-xs md:text-sm font-semibold text-white/90 group-hover:text-white">
            {item}
          </span>
        </div>
      ))}

      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-bright/20 to-cyan-light/20 border border-cyan-light/30 px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300 cursor-default">
        <Plus size={16} className="text-cyan-light animate-pulse" />
        <span className="text-xs md:text-sm font-black text-white tracking-tight">
          em breve
        </span>
      </div>
    </div>
  </div>
  
  {/* Detalhe de luz de fundo para tirar o aspecto escuro */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-cyan-light/5 blur-[100px] -z-10"></div>
</section>

      <section id="publico-alvo" className="py-20 relative bg-black-purple">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Feito para quem quer{" "}
              <span className="text-cyan-light">Crescer</span>
            </h2>
            <p className="text-light-gray/60 max-w-2xl mx-auto">
              O Clinic OS não é apenas para agendar consultas. É uma ferramenta
              de gestão estratégica para administradores que querem dominar os
              números da clínica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative bg-black-purple border border-white/5 p-8 rounded-3xl hover:border-cyan-light/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,194,255,0.1)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-6 -right-6 text-white opacity-5 rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <Target size={180} />
              </div>
              <div className="w-14 h-14 bg-cyan-light/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-light group-hover:bg-cyan-light group-hover:text-black-purple transition-colors duration-500 relative z-10">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white relative z-10">
                Domínio Financeiro e Retenção
              </h3>
              <p className="text-light-gray/60 text-sm leading-relaxed mb-6 relative z-10">
                Transforme sua clínica em um negócio previsível. Saiba
                exatamente de onde vem cada real, quem são seus pacientes mais
                lucrativos e como reativar clientes antigos para garantir agenda
                cheia e caixa positivo todos os meses.
              </p>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-xs font-medium text-light-gray/80">
                  <CheckCircle2 size={14} className="text-cyan-light" />
                  Fluxo de Caixa e DRE Automatizados
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-light-gray/80">
                  <CheckCircle2 size={14} className="text-cyan-light" />
                  Gestão de LTV e Fidelização de Clientes
                </li>
              </ul>
            </div>

            <div className="group relative bg-black-purple border border-white/5 p-8 rounded-3xl hover:border-yellow/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,204,0,0.1)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-6 -right-6 text-white opacity-5 rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <Building2 size={180} />
              </div>
              <div className="w-14 h-14 bg-yellow/10 rounded-2xl flex items-center justify-center mb-6 text-yellow group-hover:bg-yellow group-hover:text-black-purple transition-colors duration-500 relative z-10">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white relative z-10">
                Clínicas em Expansão
              </h3>
              <p className="text-light-gray/60 text-sm leading-relaxed mb-6 relative z-10">
                Escalar o corpo clínico não precisa significar escalar o caos.
                Automatize o complexo cálculo de repasses médicos (split de
                pagamentos) e gerencie múltiplas agendas com precisão cirúrgica.
              </p>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-xs font-medium text-light-gray/80">
                  <CheckCircle2 size={14} className="text-yellow" /> Split de
                  Pagamentos Automático
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-light-gray/80">
                  <CheckCircle2 size={14} className="text-yellow" /> Controle de
                  Acesso Hierárquico
                </li>
              </ul>
            </div>

            <div className="group relative bg-black-purple border border-white/5 p-8 rounded-3xl hover:border-purple-bright/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(63,32,186,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-bright to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-6 -right-6 text-white opacity-5 rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <Briefcase size={180} />
              </div>
              <div className="w-14 h-14 bg-purple-bright/10 rounded-2xl flex items-center justify-center mb-6 text-purple-bright group-hover:bg-purple-bright group-hover:text-white transition-colors duration-500 relative z-10">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white relative z-10">
                Médico Empreendedor
              </h3>
              <p className="text-light-gray/60 text-sm leading-relaxed mb-6 relative z-10">
                Você cuida do paciente, o sistema cuida do business. Tenha a
                tranquilidade de saber que sua clínica continua faturando,
                agendando e operando perfeitamente enquanto você está em
                atendimento.
              </p>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-center gap-2 text-xs font-medium text-light-gray/80">
                  <CheckCircle2 size={14} className="text-purple-bright" />
                  Prontuário com IA Generativa
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-light-gray/80">
                  <CheckCircle2 size={14} className="text-purple-bright" />
                  Gestão 100% Mobile
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="py-20 bg-dark/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Tudo o que você precisa no dia a dia
            </h2>
            <p className="text-light-gray/60 max-w-2xl mx-auto text-lg">
              Sua recepção não precisa viver no passado. Automatize o repetitivo
              e libere sua equipe para o que realmente importa: o paciente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black-purple border border-white/10 p-8 rounded-3xl hover:border-purple-bright transition-all group relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-white opacity-5 rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <LineChart size={180} />
              </div>
              <div className="w-12 h-12 bg-purple-bright/20 rounded-lg flex items-center justify-center mb-6 text-yellow relative z-10">
                <Wallet size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">
                Financeiro Controlado
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <FileWarning size={18} className="text-yellow shrink-0" />
                  <span>
                    <strong>Controle de Glosas:</strong> O sistema avisa se algo
                    está errado na conta do convênio antes de você enviar.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <CheckCircle2
                    size={18}
                    className="text-cyan-light shrink-0"
                  />
                  <span>
                    <strong>Pagamento dos Médicos:</strong> O sistema calcula
                    sozinho quanto cada médico deve receber e já separa o valor.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <CheckCircle2
                    size={18}
                    className="text-cyan-light shrink-0"
                  />
                  <span>
                    <strong>Estoque Automático:</strong> Usou uma seringa na
                    consulta? O sistema já dá baixa no estoque.
                  </span>
                </li>
              </ul>
            </div>

            <div
              id="ia"
              className="bg-black-purple border border-white/10 p-8 rounded-3xl hover:border-purple-bright transition-all group relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 text-white opacity-5 rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <BrainCircuit size={180} />
              </div>
              <div className="w-12 h-12 bg-purple-bright/20 rounded-lg flex items-center justify-center mb-6 text-cyan-light relative z-10">
                <Stethoscope size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">
                Assistente Inteligente
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <CheckCircle2 size={18} className="text-yellow shrink-0" />
                  <span>
                    <strong>Ajuda no Diagnóstico:</strong> O sistema lê os
                    exames e sugere caminhos para o médico analisar.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <CheckCircle2 size={18} className="text-yellow shrink-0" />
                  <span>
                    <strong>Escreva falando:</strong> O médico pode ditar o que
                    aconteceu na consulta e o sistema escreve tudo.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <CheckCircle2 size={18} className="text-yellow shrink-0" />
                  <span>
                    <strong>Segurança:</strong> Avisa se o remédio receitado tem
                    conflito com alergias do paciente.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-black-purple border border-white/10 p-8 rounded-3xl hover:border-purple-bright transition-all group relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-white opacity-5 rotate-12 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <MessageSquare size={180} />
              </div>
              <div className="w-12 h-12 bg-purple-bright/20 rounded-lg flex items-center justify-center mb-6 text-cyan-light relative z-10">
                <CalendarClock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">
                Agenda Inteligente
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <CheckCircle2
                    size={18}
                    className="text-cyan-light shrink-0"
                  />
                  <span>
                    <strong>Preenchendo "Buracos":</strong> Se alguém desmarcar,
                    o sistema avisa outros pacientes da lista de espera.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <MessageSquare
                    size={18}
                    className="text-cyan-light shrink-0"
                  />
                  <span>
                    <strong>Lembretes no WhatsApp:</strong> Envia mensagem
                    automática confirmando a consulta.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-light-gray/80">
                  <Smile size={18} className="text-cyan-light shrink-0" />
                  <span>
                    <strong>Pesquisa de Satisfação:</strong> Pergunta
                    automaticamente no WhatsApp o que o paciente achou.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="migracao"
        className="py-16 bg-white/5 border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4 text-yellow">
              <Lock size={20} />
              <span className="font-bold uppercase text-sm tracking-wide">
                Troca sem dor de cabeça
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Trazemos seus dados de graça.
            </h2>
            <p className="text-light-gray/80 mb-6 leading-relaxed">
              Sabemos que mudar de sistema dá medo de perder informações. Por
              isso, nossa equipe faz esse serviço técnico para você. Pegamos
              seus dados antigos (pacientes, histórico) e colocamos no Clinic
              OS.
            </p>
            <div className="flex flex-col gap-2 text-sm text-light-gray/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-light" /> Sem custo
                adicional.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-light" /> Feito por
                nossa equipe técnica.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-light" /> Seus
                dados ficam seguros.
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-black-purple p-6 rounded-2xl border border-white/10 opacity-80">
            <p className="text-center italic text-light-gray/70">
              "A migração é apenas uma etapa técnica. Nós cuidamos dela para
              você focar no atendimento."
            </p>
          </div>
        </div>
      </section>

      <section id="economia" className="py-24 bg-black-purple">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A conta que você paga (e não percebe)
            </h2>
            <p className="text-light-gray/60 max-w-2xl mx-auto">
              Manter vários sistemas custa caro, gera erros e fragmenta a
              atenção da sua equipe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-dark p-8 rounded-3xl border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                CUSTO ATUAL MENSAL
              </div>
              <h3 className="text-red-400 font-bold text-2xl mb-2 flex items-center gap-2">
                <FileWarning /> Fragmentado
              </h3>
              <p className="text-sm text-light-gray/50 mb-8">
                Soma das assinaturas e prejuízos médios de uma clínica pequena.
              </p>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-light-gray">Prontuário Eletrônico</span>
                  <span className="font-bold text-white">R$ 450,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-light-gray">
                    Sistema Financeiro (Gestão)
                  </span>
                  <span className="font-bold text-white">R$ 290,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-light-gray">
                    Automação WhatsApp (Bot)
                  </span>
                  <span className="font-bold text-white">R$ 350,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-light-gray">
                    Sistema de Agendamento
                  </span>
                  <span className="font-bold text-white">R$ 100,00</span>
                </div>
                <div className="pt-4 mt-4 border-t border-dashed border-white/20">
                  <p className="text-xs text-red-400 uppercase font-bold mb-2 tracking-widest">
                    Prejuízos Invisíveis
                  </p>
                  <div className="flex justify-between items-center pb-2 text-red-300">
                    <span>Perda com Glosas (Convênios)</span>
                    <span className="font-bold">+ R$ 1.000,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 text-red-300">
                    <span>Faltas e Encaixes não feitos</span>
                    <span className="font-bold">+ R$ 600,00</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex justify-between items-center">
                <span className="text-red-200 font-bold">Total Estimado:</span>
                <span className="text-2xl font-black text-red-400">
                  R$ 2.790,00
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-bright/20 to-black-purple p-8 rounded-3xl border border-cyan-light/40 shadow-[0_0_40px_rgba(0,194,255,0.15)] relative">
              <div className="absolute top-0 right-0 bg-cyan-light text-black-purple text-xs font-bold px-4 py-1 rounded-bl-xl">
                ESCOLHA INTELIGENTE
              </div>
              <h3 className="text-cyan-light font-bold text-2xl mb-2 flex items-center gap-2">
                <CheckCircle2 /> Centralizado
              </h3>
              <p className="text-sm text-light-gray/50 mb-8">
                Uma única assinatura que cobre toda a operação e elimina perdas.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-purple-bright/30 p-2 rounded-lg h-fit text-cyan-light">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      Prontuário + IA + Exames
                    </h4>
                    <p className="text-xs text-light-gray/60">
                      Substitui prontuário comum e armazenamento físico.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-purple-bright/30 p-2 rounded-lg h-fit text-cyan-light">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      Financeiro + Glosas + Estoque
                    </h4>
                    <p className="text-xs text-light-gray/60">
                      Substitui sistema de gestão e planilhas manuais.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-purple-bright/30 p-2 rounded-lg h-fit text-cyan-light">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      Agenda + Bot WhatsApp + Fidelização
                    </h4>
                    <p className="text-xs text-light-gray/60">
                      Substitui ferramentas de automação e agenda avulsa.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-light-gray font-medium">
                    Investimento Único
                  </span>
                  <span className="text-yellow font-black text-2xl">
                    Mais barato
                  </span>
                </div>
                <p className="text-xs text-light-gray/50 text-right mb-6">
                  E sem os prejuízos das glosas e faltas.
                </p>
                <button className="w-full bg-cyan-light text-black-purple font-bold py-3 rounded-xl hover:bg-[#33d1ff] transition-colors shadow-lg hover:shadow-cyan-light/30">
                  QUERO ECONOMIZAR AGORA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cadastro" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-bright/20 blur-[120px] -z-10 rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto bg-black-purple/80 backdrop-blur-xl rounded-[30px] p-8 md:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-light/50 to-transparent opacity-50"></div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-bright/20 text-cyan-light text-xs font-bold tracking-widest mb-6 border border-purple-bright/30">
            <Users size={14} />
            <span>VAGAS LIMITADAS PARA BETA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
            Sua clínica no <span className="text-cyan-light">futuro.</span>
          </h2>
          <p className="text-lg mb-10 text-light-gray/70 max-w-2xl mx-auto leading-relaxed">
            Não é apenas um software, é o sistema operacional do seu sucesso.
            Preencha abaixo para garantir sua posição prioritária no lançamento.
          </p>
          <form className="max-w-md mx-auto space-y-4">
            <div className="relative group text-left">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray/40 group-focus-within:text-cyan-light transition-colors">
                <User size={20} className="text-cyan-light" />
              </div>
              <input
                type="text"
                placeholder="Nome do responsável"
                className="w-full bg-black-purple border border-white/10 px-5 py-4 pl-12 rounded-xl focus:outline-none focus:border-cyan-light focus:shadow-[0_0_20px_rgba(0,194,255,0.1)] transition-all text-white placeholder:text-light-gray/20"
              />
            </div>
            <div className="relative group text-left">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray/40 group-focus-within:text-cyan-light transition-colors">
                <Phone size={20} className="text-cyan-light" />
              </div>
              <input
                type="text"
                placeholder="WhatsApp da clínica (DDD)"
                className="w-full bg-black-purple border border-white/10 px-5 py-4 pl-12 rounded-xl focus:outline-none focus:border-cyan-light focus:shadow-[0_0_20px_rgba(0,194,255,0.1)] transition-all text-white placeholder:text-light-gray/20"
              />
            </div>
            <div className="relative group text-left">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray/40 group-focus-within:text-cyan-light transition-colors">
                <Mail size={20} className="text-cyan-light" />
              </div>
              <input
                type="email"
                placeholder="Melhor e-mail corporativo"
                className="w-full bg-black-purple border border-white/10 px-5 py-4 pl-12 rounded-xl focus:outline-none focus:border-cyan-light focus:shadow-[0_0_20px_rgba(0,194,255,0.1)] transition-all text-white placeholder:text-light-gray/20"
              />
            </div>
            <button className="w-full bg-yellow text-black-purple font-black py-4 rounded-xl text-lg hover:bg-[#ffdb4d] hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,204,0,0.2)] hover:shadow-[0_0_50px_rgba(255,204,0,0.4)] flex items-center justify-center gap-3 mt-6 group">
              GARANTIR MINHA VAGA
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 opacity-60 text-xs text-light-gray">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-cyan-light" />
              <span>
                Mais de <strong>{totalInscritos}</strong> interessados.
              </span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-light-gray/30 rounded-full"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-cyan-light" />
              <span>Seus dados estão protegidos. Zero Spam.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t absolute w-full border-purple-bright/20 bg-black-purple text-white/50 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-white mb-1">CLINIC OS</p>
              <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
            </div>
            <Link
              href={"/"}
              className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-purple-bright/30 hover:border-cyan-light/50 transition-colors  group cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-cyan-light" />
              <span className="text-white/80 text-xs">
                Desenvolvido por{" "}
                <strong className="text-white group-hover:text-cyan-light transition-colors">
                  YM Desenvolvimento
                </strong>
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

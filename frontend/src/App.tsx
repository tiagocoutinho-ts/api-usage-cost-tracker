import "./App.css";
import { useProjectForm } from "./hooks/useProjectForm";
import { TableProject } from "./components/TableProjects";
import { useCurrencyInput } from "./hooks/useCurrencyInput";

function App() {
  const { handleSubmit, isLoading, refreshKey } = useProjectForm();
  const budgetInput = useCurrencyInput();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500 selection:text-white flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <main className="w-full max-w-5xl space-y-8">
        
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                Internal Tool v1.0
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              API Usage & Cost Tracker
            </h1>
          </div>
          <p className="text-xs text-zinc-400 max-w-xs font-mono">
            Monitoramento em tempo real de consumo de tokens e limites orçamentários.
          </p>
        </header>

        <section className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-2xl backdrop-blur-md">
          <div className="mb-5">
            <h2 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
              <span className="text-emerald-400">+</span> Registrar Novo Projeto
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Defina o teto orçamentário para controle de custos de infraestrutura de IA.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            
            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Nome do projeto</label>
              <input
                type="text"
                name="name"
                placeholder="Ex: Chatbot OpenAI Customer Success"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-inner"
                required
              />
            </div>

            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Orçamento Limite (R$)</label>
              <input
                type="text"
                name="budget"
                value={budgetInput.value}
                onChange={budgetInput.onChange}
                placeholder="0,00"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-inner"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-all duration-150 shadow-md shadow-emerald-950/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer h-[42px]"
              >
                {isLoading ? (
                  <span className="inline-block animate-pulse">Salvando...</span>
                ) : (
                  "Cadastrar Projeto"
                )}
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Projetos Ativos & Métricas de Consumo
            </h2>
            <span className="text-xs font-mono text-zinc-500">Atualizado em tempo real</span>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
            <TableProject refreshTrigger={refreshKey} />
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
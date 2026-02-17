import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReceitas } from '../context/ReceitasContext';
import { UNIDADES, type Ingrediente, type Unidade } from '../types/receita';
import { Plus, Trash2, ArrowRight, ChefHat } from 'lucide-react';

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const UNIDADES_OPCOES: Unidade[] = [...UNIDADES];

export function CadastroReceita() {
  const navigate = useNavigate();
  const { adicionarReceita } = useReceitas();

  const [titulo, setTitulo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { id: generateId(), nome: '', quantidade: '', unidade: 'g' },
  ]);
  const [passos, setPassos] = useState<string[]>(['']);
  const [passoAtualInput, setPassoAtualInput] = useState('');

  const adicionarIngrediente = () => {
    setIngredientes((prev) => [
      ...prev,
      { id: generateId(), nome: '', quantidade: '', unidade: 'g' },
    ]);
  };

  const removerIngrediente = (id: string) => {
    if (ingredientes.length <= 1) return;
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
  };

  const atualizarIngrediente = (id: string, campo: keyof Ingrediente, valor: string) => {
    setIngredientes((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [campo]: valor } : i))
    );
  };

  const adicionarPasso = () => {
    if (passoAtualInput.trim()) {
      setPassos((prev) => [...prev, passoAtualInput.trim()]);
      setPassoAtualInput('');
    } else {
      setPassos((prev) => [...prev, '']);
    }
  };

  const removerPasso = (index: number) => {
    if (passos.length <= 1) return;
    setPassos((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarPasso = (index: number, valor: string) => {
    setPassos((prev) => prev.map((p, i) => (i === index ? valor : p)));
  };

  const finalizar = () => {
    const tituloOk = titulo.trim();
    if (!tituloOk) return;

    const ingOk = ingredientes
      .filter((i) => i.nome.trim())
      .map((i) => ({ ...i, id: generateId() }));
    const passosOk = passos.filter((p) => p.trim());

    adicionarReceita({
      titulo: tituloOk,
      tempoPreparo: tempoPreparo.trim() || 'A definir',
      ingredientes: ingOk,
      passos: passosOk.length ? passosOk : ['Sem passos cadastrados.'],
    });
    navigate('/livro');
  };

  const podeFinalizar = titulo.trim().length > 0;

  const containerPadding = {
    paddingLeft: 'max(1rem, env(safe-area-inset-left))',
    paddingRight: 'max(1rem, env(safe-area-inset-right))',
    paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
  };

  return (
    <div className="relative min-h-full overflow-hidden">
      <div
        className="relative z-10 p-4 pb-8 sm:p-6 md:p-8 lg:p-12"
        style={containerPadding}
      >
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/30 shrink-0">
              <ChefHat className="text-orange-400 w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100 truncate">
              Nova Receita
            </h1>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 p-4 sm:p-6">
              <h2 className="text-sm font-semibold text-orange-400 mb-4">
                Informações básicas
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Nome da receita
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Bolo de chocolate"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none min-h-[48px] touch-manipulation"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Tempo de preparo
                  </label>
                  <input
                    type="text"
                    value={tempoPreparo}
                    onChange={(e) => setTempoPreparo(e.target.value)}
                    placeholder="Ex: 45 min"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none min-h-[48px] touch-manipulation"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-sm font-semibold text-orange-400">Ingredientes</h2>
                <button
                  type="button"
                  onClick={adicionarIngrediente}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500/20 text-orange-400 text-sm font-medium hover:bg-orange-500/30 active:bg-orange-500/40 transition-colors min-h-[44px] touch-manipulation w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
              <ul className="space-y-3">
                {ingredientes.map((ing) => (
                  <li
                    key={ing.id}
                    className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5"
                  >
                    <input
                      type="text"
                      value={ing.nome}
                      onChange={(e) => atualizarIngrediente(ing.id, 'nome', e.target.value)}
                      placeholder="Nome (ex: Farinha)"
                      className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none min-h-[44px]"
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={ing.quantidade}
                        onChange={(e) =>
                          atualizarIngrediente(ing.id, 'quantidade', e.target.value)
                        }
                        placeholder="Qtd"
                        className="w-16 sm:w-20 px-3 py-2.5 rounded-lg bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none min-h-[44px]"
                      />
                      <select
                        value={ing.unidade}
                        onChange={(e) =>
                          atualizarIngrediente(ing.id, 'unidade', e.target.value)
                        }
                        className="flex-1 min-w-[100px] px-3 py-2.5 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-orange-500/50 focus:outline-none min-h-[44px]"
                      >
                        {UNIDADES_OPCOES.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removerIngrediente(ing.id)}
                        disabled={ingredientes.length <= 1}
                        className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 active:bg-red-500/20 disabled:opacity-30 disabled:pointer-events-none transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                        aria-label="Remover ingrediente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 p-4 sm:p-6">
              <h2 className="text-sm font-semibold text-orange-400 mb-4">
                Passos do modo de preparo
              </h2>
              <div className="space-y-3">
                {passos.map((passo, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="text-xs font-mono text-orange-400 mt-3.5 shrink-0 w-6">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      value={passo}
                      onChange={(e) => atualizarPasso(index, e.target.value)}
                      placeholder={`Passo ${index + 1}`}
                      className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none min-h-[48px]"
                    />
                    <button
                      type="button"
                      onClick={() => removerPasso(index)}
                      disabled={passos.length <= 1}
                      className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:pointer-events-none transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation mt-1"
                      aria-label="Remover passo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center pt-2">
                  <input
                    type="text"
                    value={passoAtualInput}
                    onChange={(e) => setPassoAtualInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), adicionarPasso())
                    }
                    placeholder="Digite e pressione Enter ou o botão para adicionar passo"
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none min-h-[48px]"
                  />
                  <button
                    type="button"
                    onClick={adicionarPasso}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500/20 text-orange-400 font-medium hover:bg-orange-500/30 active:bg-orange-500/40 transition-colors min-h-[48px] touch-manipulation"
                  >
                    <Plus className="w-4 h-4" />
                    Passo
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={finalizar}
                disabled={!podeFinalizar}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-slate-900 font-bold hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:active:scale-100 transition-all min-h-[52px] touch-manipulation"
              >
                Finalizar e salvar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

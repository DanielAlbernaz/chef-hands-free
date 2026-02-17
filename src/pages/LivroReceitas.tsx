import { Link } from 'react-router-dom';
import { useReceitas } from '../context/ReceitasContext';
import { BookOpen, Clock, ChefHat } from 'lucide-react';

export function LivroReceitas() {
  const { receitas } = useReceitas();

  return (
    <div className="relative min-h-full overflow-hidden">
      <div
        className="relative z-10 p-4 pb-8 sm:p-6 md:p-8 lg:p-12"
        style={{
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/30 shrink-0">
              <BookOpen className="text-orange-400 w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100 truncate">
              Livro de Receitas
            </h1>
          </div>

          {receitas.length === 0 ? (
            <div className="rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 p-8 sm:p-12 text-center">
              <ChefHat className="w-14 h-14 sm:w-16 sm:h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-base sm:text-lg mb-2">
                Nenhuma receita cadastrada ainda.
              </p>
              <p className="text-slate-500 text-sm mb-6">
                Cadastre sua primeira receita para ver aqui.
              </p>
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orange-500 text-slate-900 font-semibold hover:bg-orange-400 active:bg-orange-600 transition-colors min-h-[48px] touch-manipulation"
              >
                Nova Receita
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {receitas.map((r) => (
                <li key={r.id}>
                  <Link
                    to={`/receita/${r.id}`}
                    className="block p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 active:border-orange-500/40 hover:bg-slate-800/80 active:bg-slate-800/80 transition-all duration-300 min-h-[72px] sm:min-h-0 touch-manipulation"
                  >
                    <h2 className="font-semibold text-gray-100 group-hover:text-orange-400 transition-colors line-clamp-2 text-base sm:text-inherit">
                      {r.titulo}
                    </h2>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {r.tempoPreparo}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {r.ingredientes.length} ingredientes · {r.passos.length} passos
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

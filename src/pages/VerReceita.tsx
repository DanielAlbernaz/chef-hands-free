import { useParams, Link } from 'react-router-dom';
import { useReceitas } from '../context/ReceitasContext';
import { Clock, ChefHat, List, Flame } from 'lucide-react';

export function VerReceita() {
  const { id } = useParams<{ id: string }>();
  const { getReceita } = useReceitas();
  const receita = id ? getReceita(id) : undefined;

  if (!receita) {
    return (
      <div
        className="p-6 sm:p-8 text-center"
        style={{
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        }}
      >
        <p className="text-slate-400">Receita não encontrada.</p>
        <Link
          to="/livro"
          className="text-orange-400 hover:underline mt-2 inline-block py-2 touch-manipulation"
        >
          Voltar ao livro
        </Link>
      </div>
    );
  }

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
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-5 sm:p-8 md:p-10 border-b border-white/10">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl border border-orange-500/30 shrink-0">
                  <ChefHat className="text-orange-400 w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 tracking-tight break-words">
                    {receita.titulo}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-400 mt-2 text-sm sm:text-base">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{receita.tempoPreparo}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8 md:p-10 space-y-8 sm:space-y-10">
              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-orange-400 mb-4">
                  <List className="w-4 h-4 shrink-0" />
                  Ingredientes
                </h2>
                <ul className="space-y-2">
                  {receita.ingredientes.map((ing) => (
                    <li
                      key={ing.id}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 text-slate-300 py-2 sm:py-1 border-b border-white/5 last:border-0 break-words"
                    >
                      <span className="font-medium text-gray-100">{ing.nome}</span>
                      {(ing.quantidade || ing.unidade) && (
                        <span className="text-slate-400 text-sm">
                          — {ing.quantidade} {ing.unidade}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-orange-400 mb-4">
                  <Flame className="w-4 h-4 shrink-0" />
                  Modo de preparo
                </h2>
                <ol className="space-y-4">
                  {receita.passos.map((passo, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex shrink-0 w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-slate-300 leading-relaxed pt-0.5 text-sm sm:text-base break-words">
                        {passo}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div
              className="p-4 sm:p-6 border-t border-white/10 bg-slate-900/50"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <Link
                to={`/cozinha/${receita.id}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-slate-900 font-bold hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-[0.98] transition-all min-h-[48px] touch-manipulation"
              >
                Cozinhar com voz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ChefHat, BookOpen, PlusCircle, Mic } from 'lucide-react';

export function Dashboard() {
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
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            <div className="p-3 sm:p-4 bg-orange-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-orange-500/30 shrink-0">
              <ChefHat className="text-orange-400 w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 tracking-tight truncate">
                Chef Hands-Free
              </h1>
              <p className="text-slate-400 mt-0.5 text-sm sm:text-base">
                Suas receitas na ponta da voz
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-10 leading-relaxed">
            Acesse o <strong className="text-orange-400">Livro de Receitas</strong> para ver e
            cozinhar com os passos em voz alta, ou cadastre uma nova receita com ingredientes e
            instruções.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link
              to="/livro"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 active:border-orange-500/40 hover:bg-slate-800/80 active:bg-slate-800/80 transition-all duration-300 min-h-[56px] sm:min-h-0 touch-manipulation"
            >
              <div className="p-2.5 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl group-hover:bg-orange-500/30 transition-colors shrink-0">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-100 text-base sm:text-lg">
                  Livro de Receitas
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 truncate">
                  Ver e cozinhar suas receitas
                </p>
              </div>
            </Link>

            <Link
              to="/cadastro"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 active:border-orange-500/40 hover:bg-slate-800/80 active:bg-slate-800/80 transition-all duration-300 min-h-[56px] sm:min-h-0 touch-manipulation"
            >
              <div className="p-2.5 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl group-hover:bg-orange-500/30 transition-colors shrink-0">
                <PlusCircle className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-100 text-base sm:text-lg">
                  Nova Receita
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 truncate">
                  Cadastrar receita passo a passo
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-6 sm:mt-10 p-3 sm:p-4 rounded-xl bg-slate-800/30 border border-white/5 flex items-start sm:items-center gap-3">
            <Mic className="w-5 h-5 text-orange-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Na tela da receita você pode ativar o microfone e dizer{' '}
              <strong className="text-slate-300">"Próximo"</strong> ou{' '}
              <strong className="text-slate-300">"Voltar"</strong> para navegar nos passos com as
              mãos livres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

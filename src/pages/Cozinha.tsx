import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReceitas } from '../context/ReceitasContext';
import { useVoiceControl } from '../hooks/useVoiceControl';
import {
  Mic,
  MicOff,
  ChevronLeft,
  ChevronRight,
  Timer,
  ChefHat,
  Volume2,
  ArrowLeft,
} from 'lucide-react';

export function Cozinha() {
  const { id } = useParams<{ id: string }>();
  const { getReceita } = useReceitas();
  const receita = id ? getReceita(id) : undefined;

  const [passoAtual, setPassoAtual] = useState(0);
  const [animacao, setAnimacao] = useState(false);

  const proximo = () => {
    if (receita && passoAtual < receita.passos.length - 1)
      setPassoAtual((prev) => prev + 1);
  };

  const anterior = () => {
    if (passoAtual > 0) setPassoAtual((prev) => prev - 1);
  };

  const comandosBasicos = {
    próximo: proximo,
    avançar: proximo,
    voltar: anterior,
    anterior: anterior,
  };

  const { isListening, toggleListening, lastCommand, falarTexto, isVoiceSupported } =
    useVoiceControl({
      ...comandosBasicos,
      repetir: () => receita && falarTexto(receita.passos[passoAtual]),
    });

  useEffect(() => {
    if (isListening && receita) {
      const timeoutId = setTimeout(() => {
        falarTexto(receita.passos[passoAtual]);
      }, 600);
      return () => clearTimeout(timeoutId);
    }
  }, [passoAtual, isListening, receita]);

  useEffect(() => {
    setAnimacao(true);
    const timer = setTimeout(() => setAnimacao(false), 500);
    return () => clearTimeout(timer);
  }, [passoAtual]);

  if (!receita) {
    return (
      <div
        className="p-6 sm:p-8 text-center text-slate-400"
        style={{
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
        }}
      >
        Receita não encontrada.{' '}
        <Link to="/livro" className="text-orange-400 hover:underline py-2 inline-block touch-manipulation">
          Voltar ao livro
        </Link>
      </div>
    );
  }

  const progresso = ((passoAtual + 1) / receita.passos.length) * 100;

  const safePadding = {
    paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
    paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
    paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
    paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
  };

  return (
    <div className="relative flex flex-col h-screen min-h-[100dvh] overflow-hidden bg-slate-900 text-white font-sans selection:bg-orange-500 selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <header
        className="z-10 flex justify-between items-center gap-2 min-h-[56px] shrink-0"
        style={safePadding}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link
            to={`/receita/${receita.id}`}
            className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 active:bg-slate-700 transition-colors touch-manipulation shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar para a receita"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-2 bg-orange-500/20 rounded-lg backdrop-blur-sm border border-orange-500/30 shrink-0 hidden sm:flex">
            <ChefHat className="text-orange-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-bold text-gray-100 tracking-tight leading-tight truncate">
              {receita.titulo}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <Timer className="w-3 h-3 shrink-0" />
              <span>{receita.tempoPreparo}</span>
            </div>
          </div>
        </div>

        {isVoiceSupported ? (
          <button
            onClick={toggleListening}
            className={`
              shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full font-semibold transition-all duration-300 border min-h-[44px] touch-manipulation
              ${
                isListening
                  ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 active:bg-slate-600'
              }
            `}
          >
            {isListening ? (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <span className="text-xs sm:text-sm hidden sm:inline">Ouvindo</span>
              </>
            ) : (
              <>
                <MicOff className="w-4 h-4 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm hidden sm:inline">Voz Off</span>
              </>
            )}
          </button>
        ) : (
          <div
            className="shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs sm:text-sm max-w-[180px] sm:max-w-none"
            title="No iPhone/iPad o reconhecimento de voz não funciona. Use os botões Próximo e Voltar."
          >
            <span className="truncate">Use os botões abaixo</span>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-3 sm:px-6 relative z-10 min-h-0">
        <div className="w-full max-w-2xl mb-4 sm:mb-8 flex items-center gap-2 sm:gap-4">
          <span className="text-xs font-mono text-orange-400 shrink-0">
            0{passoAtual + 1}
          </span>
          <div className="h-1.5 sm:h-1 flex-1 bg-slate-800 rounded-full overflow-hidden min-w-0">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <span className="text-xs font-mono text-slate-500 shrink-0">
            0{receita.passos.length}
          </span>
        </div>

        <div className="relative w-full max-w-3xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl min-h-[220px] sm:min-h-[300px] flex flex-col justify-center items-center">
            <p
              className={`
                text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 leading-tight text-center transition-all duration-500 ease-in-out break-words max-w-full
                ${
                  animacao
                    ? 'opacity-0 blur-sm translate-y-4'
                    : 'opacity-100 blur-0 translate-y-0'
                }
              `}
            >
              {receita.passos[passoAtual]}
            </p>
            {isListening && !animacao && (
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 animate-pulse">
                <Volume2 className="text-orange-500/50 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
          </div>
        </div>

        {isVoiceSupported && (
          <div
            className={`mt-4 sm:mt-8 h-6 transition-opacity duration-500 flex-shrink-0 ${
              lastCommand ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/5 max-w-full overflow-hidden">
              <Mic className="w-3 h-3 text-orange-400 shrink-0" />
              <span className="truncate">
                Entendi: <span className="text-slate-300 italic">"{lastCommand}"</span>
              </span>
            </p>
          </div>
        )}

        {!isVoiceSupported && (
          <p className="mt-4 sm:mt-6 text-center text-slate-500 text-xs sm:text-sm px-4">
            No iPhone e iPad o comando por voz não está disponível. Use os botões <strong className="text-slate-400">Voltar</strong> e <strong className="text-slate-400">Próximo</strong> para navegar.
          </p>
        )}
      </main>

      <footer
        className="p-4 sm:p-6 md:p-10 flex justify-center items-center gap-4 sm:gap-6 z-10 shrink-0"
        style={{
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        <button
          onClick={anterior}
          disabled={passoAtual === 0}
          className="p-4 rounded-full bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 active:bg-slate-600 hover:border-slate-500 disabled:opacity-30 disabled:hover:scale-100 disabled:active:bg-slate-800 transition-all duration-300 shadow-lg min-h-[52px] min-w-[52px] flex items-center justify-center touch-manipulation active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={proximo}
          disabled={passoAtual === receita.passos.length - 1}
          className="group relative px-5 sm:px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-slate-900 font-bold text-base sm:text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:active:scale-100 min-h-[52px] touch-manipulation flex items-center justify-center gap-2"
        >
          <span>Próximo</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </footer>
    </div>
  );
}

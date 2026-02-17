import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, PlusCircle, ChefHat, X } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Início' },
  { to: '/livro', icon: BookOpen, label: 'Livro de Receitas' },
  { to: '/cadastro', icon: PlusCircle, label: 'Nova Receita' },
];

interface SidebarProps {
  /** No mobile: drawer aberto/fechado */
  isOpen?: boolean;
  onClose?: () => void;
  /** true = renderiza como drawer (fixed overlay) */
  asDrawer?: boolean;
}

export function Sidebar({ isOpen = true, onClose, asDrawer = false }: SidebarProps) {
  const content = (
    <>
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between sm:block">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/30">
            <ChefHat className="text-orange-400 w-6 h-6" />
          </div>
          <span className="font-bold text-gray-100 tracking-tight text-base sm:text-inherit">
            Chef Hands-Free
          </span>
        </div>
        {asDrawer && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation sm:hidden"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      <nav className="p-3 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={asDrawer ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] touch-manipulation ${
                isActive
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent active:bg-white/10'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  if (asDrawer) {
    return (
      <>
        <div
          role="presentation"
          aria-hidden="true"
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
        />
        <aside
          className={`
            fixed top-0 left-0 z-50 h-full w-[min(280px,85vw)] max-w-full
            flex flex-col bg-slate-900/95 backdrop-blur-xl border-r border-white/10
            transform transition-transform duration-300 ease-out md:hidden
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{ paddingLeft: 'env(safe-area-inset-left)' }}
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      className="w-56 shrink-0 flex flex-col bg-slate-900/60 backdrop-blur-xl border-r border-white/10 min-h-screen hidden md:flex"
      style={{ paddingLeft: 'env(safe-area-inset-left)' }}
    >
      {content}
    </aside>
  );
}

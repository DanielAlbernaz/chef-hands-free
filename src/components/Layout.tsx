import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-h-[100dvh] bg-slate-900 text-white">
      {/* Desktop: sidebar fixo */}
      <Sidebar asDrawer={false} />

      {/* Mobile: drawer */}
      <Sidebar
        asDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Barra superior só no mobile */}
        <header
          className="flex md:hidden items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl shrink-0"
          style={{
            paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))',
          }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-gray-100 truncate">Chef Hands-Free</span>
          <div className="w-10 shrink-0" aria-hidden />
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

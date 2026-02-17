import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Receita } from '../types/receita';

const STORAGE_KEY = 'chef-hands-free-receitas';

interface ReceitasContextValue {
  receitas: Receita[];
  adicionarReceita: (r: Omit<Receita, 'id' | 'criadoEm'>) => void;
  removerReceita: (id: string) => void;
  getReceita: (id: string) => Receita | undefined;
  atualizarReceita: (id: string, r: Partial<Receita>) => void;
}

const ReceitasContext = createContext<ReceitasContextValue | null>(null);

function loadFromStorage(): Receita[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveToStorage(receitas: Receita[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(receitas));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ReceitasProvider({ children }: { children: ReactNode }) {
  const [receitas, setReceitas] = useState<Receita[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(receitas);
  }, [receitas]);

  const adicionarReceita = useCallback((r: Omit<Receita, 'id' | 'criadoEm'>) => {
    const nova: Receita = {
      ...r,
      id: generateId(),
      criadoEm: new Date().toISOString(),
    };
    setReceitas((prev) => [...prev, nova]);
  }, []);

  const removerReceita = useCallback((id: string) => {
    setReceitas((prev) => prev.filter((rec) => rec.id !== id));
  }, []);

  const getReceita = useCallback(
    (id: string) => receitas.find((r) => r.id === id),
    [receitas]
  );

  const atualizarReceita = useCallback((id: string, updates: Partial<Receita>) => {
    setReceitas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  return (
    <ReceitasContext.Provider
      value={{
        receitas,
        adicionarReceita,
        removerReceita,
        getReceita,
        atualizarReceita,
      }}
    >
      {children}
    </ReceitasContext.Provider>
  );
}

export function useReceitas() {
  const ctx = useContext(ReceitasContext);
  if (!ctx) throw new Error('useReceitas deve ser usado dentro de ReceitasProvider');
  return ctx;
}

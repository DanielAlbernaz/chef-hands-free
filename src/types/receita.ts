/** Unidades comuns para ingredientes */
export const UNIDADES = [
  'g',
  'kg',
  'ml',
  'L',
  'xícara(s)',
  'colher(es) de sopa',
  'colher(es) de chá',
  'unidade(s)',
  'a gosto',
  'pitada',
  'dente(s)',
  'fatia(s)',
  'lata(s)',
  'caixa(s)',
] as const;

export type Unidade = (typeof UNIDADES)[number];

export interface Ingrediente {
  id: string;
  nome: string;
  quantidade: string;
  unidade: Unidade | string;
}

export interface Receita {
  id: string;
  titulo: string;
  tempoPreparo: string;
  ingredientes: Ingrediente[];
  passos: string[];
  criadoEm: string;
}

# Chef Hands-Free

App de receitas com controle por voz: dashboard, livro de receitas, cadastro iterativo e modo cozinha (passo a passo com comandos de voz no navegador).

## Stack

- **React** + **Vite** + **TypeScript**
- **Tailwind CSS** (v3) + **Lucide React**
- **Web Speech API** (reconhecimento e síntese de voz)
- **React Router** + **localStorage** para persistência

## Como rodar

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Funcionalidades

- **Dashboard** – tela inicial com acesso ao livro e nova receita
- **Livro de Receitas** – lista de receitas cadastradas
- **Nova Receita** – cadastro com nome, tempo, ingredientes (nome + quantidade + unidade) e passos
- **Ver Receita** – visualização da receita com ingredientes e modo de preparo
- **Cozinhar com voz** – passos em tela cheia; microfone para comandos "Próximo", "Voltar", "Repetir"

Otimizado para uso em **mobile** (layout responsivo, drawer no celular, safe area).

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReceitasProvider } from './context/ReceitasContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { LivroReceitas } from './pages/LivroReceitas';
import { CadastroReceita } from './pages/CadastroReceita';
import { VerReceita } from './pages/VerReceita';
import { Cozinha } from './pages/Cozinha';

function App() {
  return (
    <BrowserRouter>
      <ReceitasProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="livro" element={<LivroReceitas />} />
            <Route path="cadastro" element={<CadastroReceita />} />
            <Route path="receita/:id" element={<VerReceita />} />
          </Route>
          <Route path="cozinha/:id" element={<Cozinha />} />
        </Routes>
      </ReceitasProvider>
    </BrowserRouter>
  );
}

export default App;

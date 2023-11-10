import TelaMenu from "./interfaces/TelaMenuSistema.js";
import TelaCadastroPessoa from "./interfaces/TelaCadastroPessoa.jsx";
import TelaCadastroCategoria from "./interfaces/TelaFormCategoria.js";
import Tela404 from "./interfaces/Tela404.js";
import TelaCadastroLivro from "./interfaces/TelaCadastroLivro.jsx";
import TelaCadastroAutor from "./interfaces/TelaFormAutor.js";
import TelaCadastroUsuario from "./interfaces/TelaFormUsuarios.js";
import TelaCadastroExemplar from "./interfaces/TelaFormExemplar.jsx";
import TelaCadastroBaixa from "./interfaces/TelaFormBaixa.jsx";
import TelaFormEmprestimo from "./interfaces/TelaFormEmprestimo.jsx";
import TelaDevolucao from "./interfaces/TelaCadastroDevolucao.jsx";
import TelaFormRenovacao from "./interfaces/TelaFormRenovacao.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormLogin from "./Formularios/FormLogin.jsx";
import AppRoutes from "./AppRoutes.jsx";



function App() {
  return (
    <div className="App">
      <AppRoutes />

      {/* <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={<FormLogin />} />
            <Route exact path="/cadastroPessoa" element={<TelaCadastroPessoa /> } />
            <Route path="/cadastroCategoria" element={<TelaCadastroCategoria />} />
            <Route exact path="/cadastroLivro" element={<TelaCadastroLivro />} />
            <Route exact path="/cadastroAutor" element={<TelaCadastroAutor />} />
            <Route exact path="/cadastroUsuario" element={<TelaCadastroUsuario />} />
            <Route exact path="/" element={<TelaMenu />} />
            <Route exact path="/exemplar" element={<TelaCadastroExemplar />} />
            <Route exact path="/baixa" element={<TelaCadastroBaixa />} />
            <Route exact path="/emprestimo" element={<TelaFormEmprestimo />} />
            <Route exact path="/devolucao" element={<TelaDevolucao />} />
            <Route exact path="/renovacao" element={<TelaFormRenovacao />} />
            <Route exact path="*" element={<Tela404 />} />
         

        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

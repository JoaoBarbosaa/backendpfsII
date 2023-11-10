import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TelaMenu from "./interfaces/TelaMenuSistema.js";
import TelaCadastroPessoa from "./interfaces/TelaCadastroPessoa.jsx";
import TelaCadastroCategoria from "./interfaces/TelaFormCategoria.js";
import Tela404 from "./interfaces/Tela404.js";
import TelaCadastroLivro from "./interfaces/TelaCadastroLivro.jsx";
import TelaCadastroAutor from "./interfaces/TelaFormAutor.js";
import TelaCadastroUsuario from "./interfaces/TelaFormUsuarios.js";
import TelaCadastroExemplar from "./interfaces/TelaFormExemplar.jsx";
import TelaCadastroBaixa from "./interfaces/TelaFormBaixa.jsx";
import { AuthProvider, AuthContext } from "./contexts/auth.jsx"
import TelaFormEmprestimo from "./interfaces/TelaFormEmprestimo.jsx";
import TelaDevolucao from "./interfaces/TelaCadastroDevolucao.jsx";
import TelaFormRenovacao from "./interfaces/TelaFormRenovacao.jsx";
import LoginPage from "./LoginPage/index.jsx"

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        }
        return children;
    }
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/cadastroPessoa" element={<Private> <TelaCadastroPessoa /> </Private>} />
                    <Route exact path="/cadastroCategoria" element={<Private><TelaCadastroCategoria /> </Private>} />
                    <Route exact path="/cadastroLivro" element={<Private><TelaCadastroLivro /></Private>} />
                    <Route exact path="/cadastroAutor" element={<Private><TelaCadastroAutor /> </Private>} />
                    <Route exact path="/cadastroUsuario" element={<Private><TelaCadastroUsuario /> </Private>} />
                    <Route exact path="/" element={<Private><TelaMenu /> </Private>} />
                    <Route exact path ="/exemplar" element={<Private><TelaCadastroExemplar /></Private>} />
                    <Route exact path ="/baixa" element={<Private><TelaCadastroBaixa /></Private>} />
                    <Route exact path ="/emprestimo" element={<Private><TelaFormEmprestimo /></Private>} />
                    <Route exact path ="/devolucao" element={<Private><TelaDevolucao /></Private>} />
                    <Route exact path ="/renovacao" element={<Private><TelaFormRenovacao /></Private>} />
                    <Route exact path="*" element={<Tela404 />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;

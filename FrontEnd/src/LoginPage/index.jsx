import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { AuthContext } from "../contexts/auth";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [cpf, setCpf] = useState("");
    const [senha, setsenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await login(cpf, senha);
        } catch (error) {
            console.error("Erro ao fazer login", error);
            alert("Erro ao fazer login");
        }
    }

    return (
        <div id="corpo" className="login">
            <div className="mainForm">
                <h1 className="title">Login do Sistema</h1>
                <form action="form" onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="CPF"
                        />
                    </div>
                    <div className="field">
                        <input
                            type="password"
                            name="senha"
                            id="senha"
                            value={senha}
                            onChange={(e) => setsenha(e.target.value)}
                            placeholder="Senha"
                        />
                    </div>
                    <div className="actions">
                        <Button type="submit" className="botao">Entrar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

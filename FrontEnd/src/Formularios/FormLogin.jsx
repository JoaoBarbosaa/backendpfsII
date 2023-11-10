import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./estilos/estiloLogin.css";
import { urlBase } from "../utilitarios/definicoes";

export default function FormLogin(props) {

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const [user, setUser] = useState(null)

  const hanfleLogin = async (e) => {
    e.preventDefault();
    console.log(cpf, senha);

    try {
      const response = await fetch(`${urlBase}/usuario/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cpf: cpf, senha: senha })
        });

        console.log(response);

        if (!response.ok) {
          setError("CPF ou senha inválidos");
        } else {
          const data = await response.json(); // Use response.json() para extrair dados do corpo da resposta
          console.log(data);
          setError("");
        }

        setUser(response.data);

    } catch (error) {
      if (!error?.response) {
        setError("Servidor não encontrado");
      } else if (error.response.status === 401) {
        setError("CPF ou senha inválidos");
      } else {
        setError("Erro ao fazer login");
      }
    }
  };

  return (
    <div id="corpo" className="login">
      <div className="mainForm">
        
        <h1 className="title">Login Sistema</h1>
        <form action="form">
          <div className="field">
            <input
              type="text"
              name="cpf"
              id="cpf"
              required
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF"
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="senha"
              id="senha"
              required
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
            />
          </div>
          <div className="actions">
            <Button
              type="submit"
              className="botao"
              onClick={(e) => hanfleLogin(e)}
            >
              Login
            </Button>
          </div>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
}
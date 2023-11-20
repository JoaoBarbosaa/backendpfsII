import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../contexts/../utilitarios/definicoes.js"
const Swal = require('sweetalert2')
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);


  const login = async (cpf, senha) => {
    try {
      const response = await fetch(`${urlBase}/usuario/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, senha }),
      });
      if (!response.ok) {
        // Lida com o caso de erro na resposta
        setError("CPF ou senha inválidos");
        Swal.fire({
          icon: "error",
          title: "Usuário ou senha inválida",
          text: "Tente novamente!",
        });
        return;
      }

      const loggerUser = await response.json();

      localStorage.setItem("user", JSON.stringify(loggerUser)); //string

      setUser(loggerUser);
      navigate("/");

    } catch (error) {
      console.error("Erro ao fazer login", error);
      setError("Erro ao fazer login");
    }
  }
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};


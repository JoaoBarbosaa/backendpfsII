import { Router } from "express";
import UsuarioCTRL from "../Controle/usuarioCtrl.js";
import conectar from "../Persistencia/Conexao.js";

const rotaUsuario = new Router();
const usuarioCTRL = new UsuarioCTRL();

rotaUsuario.post('/login', async (req, res) => {
    const db = await conectar();
    const { cpf, senha } = req.body;
    const query = `SELECT * FROM usuario WHERE cpf = ? AND senha = ?`;

    try {
        const [rows, fields] = await db.execute(query, [cpf, senha]);

        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensagem: 'Erro ao acessar o banco de dados' });
    }
})

  
.post("/", usuarioCTRL.gravar)
.put("/", usuarioCTRL.atualizar)
.delete("/", usuarioCTRL.excluir)
.get("/", usuarioCTRL.consultar)
.get('/buscar/:nome', usuarioCTRL.consultarNome)
.get("/:cpf", usuarioCTRL.consultarPeloCPF);

export default rotaUsuario;

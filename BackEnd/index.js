import express from "express";
import rotaAutor from "./Rotas/rotaAutor.js";
import rotaPessoa from "./Rotas/rotaPessoa.js";
import rotaAcervo from './Rotas/rotaAcervo.js';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaUsuario from './Rotas/rotaUsuario.js';
import rotaExemplar from './Rotas/rotaExemplar.js'
import rotaEmprestimo from './Rotas/rotaEmprestimo.js';
import rotaDevolucao from './Rotas/rotaDevolucao.js';
import rotaBaixa from './Rotas/rotaBaixa.js'
import cors from 'cors'

const app = new express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/autor", rotaAutor);
app.use("/pessoas", rotaPessoa);
app.use('/acervos', rotaAcervo);
app.use('/categoria', rotaCategoria);
app.use('/usuario', rotaUsuario);
app.use('/exemplar', rotaExemplar);
app.use('/emprestimo', rotaEmprestimo);
app.use('/devolucao', rotaDevolucao);
app.use('/baixa', rotaBaixa);


app.listen(3020, "localhost", () => {
  console.log("api escutando na porta 3020");
});


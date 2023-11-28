import Exemplar from "../Modelo/Exemplar.js";
import Acervo from "../Modelo/Acervo.js";
import conectar from "./Conexao.js";

export default class ExemplarDB {

    async incluir(exemplar) {

        if (exemplar instanceof Exemplar) {
            const conexao = await conectar();
            const sql = "INSERT INTO exemplar(quantidade, dataCadastro, status, codigoAcervo) VALUES(?, ?, ?, ?)";
            const parametros = [
                exemplar.quantidade,
                exemplar.dataCadastro,
                exemplar.status,
                exemplar.acervo.codigoRegisto,
            ];
            const resultado = await conexao.query(sql, parametros);
            return await resultado[0].insertID;
        }
    }

    async alterar(exemplar) {

        if (exemplar instanceof Exemplar) {
            const conexao = await conectar();
            const sql = "UPDATE exemplar SET quantidade=?, dataCadastro=?, status = ?, codigoAcervo=? WHERE codigo=?"
            const valores = [
                exemplar.quantidade,
                exemplar.dataCadastro,
                exemplar.status,
                exemplar.acervo.codigoRegisto,
                exemplar.codigo
            ]
            await conexao.query(sql, valores);

        }
    }




    async excluir(exemplar) {

        if (exemplar instanceof Exemplar) {
            const conexao = await conectar();
            const sql = "DELETE FROM exemplar WHERE codigo=?";
            const valores = [exemplar.codigo];
            await conexao.query(sql, valores);

        }
    }

    async consultar(termo) {
        const listaExemplar = [];
        const conexao = await conectar();
        const sql = `SELECT e.codigo, e.quantidade, e.dataCadastro, e.status, e.codigoAcervo, a.tituloDoLivro 
                        FROM exemplar as e INNER JOIN acervo as a 
                        ON e.codigoAcervo = a.codigoRegisto 
                        WHERE a.tituloDoLivro LIKE ? ORDER BY e.codigo;`;
        const parametros = ['%' + termo + '%'];

        const [rows] = await conexao.query(sql, parametros);


        for (const row of rows) {
            const exemplarFormatado = {
                codigo: row.codigo,
                quantidade: row.quantidade,
                dataCadastro: row.dataCadastro,
                status: row.status,
                acervo: {
                    codigo: row.codigoAcervo,
                    titulo: row.tituloDoLivro
                }
            };
            listaExemplar.push(exemplarFormatado);
        }

        return listaExemplar;
    }

    
    async consultarCodigo(codigo) {
        const listaExemplar = [];
        const conexao = await conectar();
        const sql = `SELECT e.codigo, e.quantidade, e.dataCadastro, e.status, e.codigoAcervo, a.tituloDoLivro 
                        FROM exemplar as e INNER JOIN acervo as a 
                        ON e.codigoAcervo = a.codigoRegisto 
                        WHERE e.codigo = ?`;
        const parametros = [codigo];

        const [rows] = await conexao.query(sql, parametros);


        for (const row of rows) {
            const exemplarFormatado = {
                codigo: row.codigo,
                quantidade: row.quantidade,
                dataCadastro: row.dataCadastro,
                status: row.status,
                acervo: {
                    codigo: row.codigoAcervo,
                    titulo: row.tituloDoLivro
                }
            };
            listaExemplar.push(exemplarFormatado);
        }

        return listaExemplar;
    }
}
import Baixa from "../Modelo/Baixa.js";
import Exemplar from "../Modelo/Exemplar.js";
import conectar from "./Conexao.js";

export default class BaixaDB {

    async incluir(baixa) {

        if (baixa instanceof Baixa) {
            const conexao = await conectar();
            const sql = "INSERT INTO baixa(motivBaixa, codigoExemplar) VALUES(?, ?)";
            const parametros = [
                baixa.motivBaixa,
                baixa.exemplar.codigo
            ];
            const resultado = await conexao.query(sql, parametros);
            return await resultado[0].insertID;
        }
    }


    async excluir(baixa) {

        if (baixa instanceof Baixa) {
            const conexao = await conectar();
            const sql = "DELETE FROM baixa WHERE codigo=?";
            const valores = [baixa.codigo];
            await conexao.query(sql, valores);

        }
    }

    async alterarStatus(codigo) {
        const conexao = await conectar();
        const sql = `UPDATE exemplar SET status='Desativado' WHERE codigo=${codigo.exemplar.codigo}`;
        await conexao.query(sql);
}


    async consultar(termo) {
        const listaBaixa = [];
        const conexao = await conectar();
        const sql = `SELECT b.codigo, b.motivBaixa,
                     b.codigoExemplar, a.tituloDoLivro
                      FROM baixa as b INNER JOIN exemplar 
                      as e ON b.codigoExemplar = e.codigo 
                      INNER JOIN acervo as a on a.codigoRegisto = 
                      e.codigoAcervo WHERE a.tituloDoLivro LIKE ?`;
        const parametros = ['%' + termo + '%'];

        const [rows] = await conexao.query(sql, parametros);


        for (const row of rows) {
            const baixaFormatada = {
                codigo: row.codigo,
                motivBaixa: row.motivBaixa,
                exemplar: {
                    codigo: row.codigoExemplar,
                    titulo: row.tituloDoLivro
                }
            };
            listaBaixa.push(baixaFormatada);
        }

        return listaBaixa;
    }
}
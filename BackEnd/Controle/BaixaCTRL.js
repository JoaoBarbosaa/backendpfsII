import Baixa from '../Modelo/Baixa.js';
import Exemplar from '../Modelo/Exemplar.js';

export default class ExemplarCTRL{

  gravar(requisicao, resposta){
    resposta.type("application/json");
    
    if(requisicao.method === "POST" && requisicao.is('application/json')){
        const dados = requisicao.body;
        const motivBaixa = dados.motivBaixa;
        const codExemplar = dados.exemplar && dados.exemplar.codigo;
        const exemplar = new Exemplar(0,"")
        
  
        if(!dados.exemplar){
            resposta.json({
                status: false,
                mensagem: "Dados de exemplar não encontrado"
            });
            return;}
        
        exemplar.consultarCodigo(codExemplar)
        .then((pessoaEncontrada) => {


            if (pessoaEncontrada && pessoaEncontrada.length > 0){
                const primeiraPessoa = pessoaEncontrada[0];
                const baixa = new Baixa(0, motivBaixa, primeiraPessoa)
                baixa.gravar().then((emprestimoGravado)=> {
                    resposta.json({
                        status:true,
                        baixa: {
                            codigo: baixa.codigo,
                            motivBaixa: baixa.motivBaixa,
                            exemplar: {
                                codigo: baixa.exemplar.codigo,
                            }
                        }
                    })
                })

            }
        })
        
                
        }}

    excluir(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const baixa = new Baixa(codigo);

            baixa.remover().then(()=>{
                resposta.json({
                    status:true,
                    mensagem:"Baixa excluída com sucesso!"
                })
            })
            .catch((erro) => {
                resposta.json({
                    status:false,
                    mensagem: erro
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const termo = requisicao.query.termo||"";
            const baixa = new Baixa();

            baixa.consultar(termo)
            .then((baixas)=>{
                resposta.json(baixas);
            })
            .catch((erro) => {
                resposta.json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Requisição invalida! Método não permitido!"
            });
        }
    }

  }
  
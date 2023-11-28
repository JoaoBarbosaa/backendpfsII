import Acervo from '../Modelo/Acervo.js';
import Exemplar from '../Modelo/Exemplar.js';

export default class ExemplarCTRL{

    gravar(requisicao, resposta) {
        resposta.type("application/json");
      
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
          const dados = requisicao.body;
        
          // Verifica se os dados necessários foram fornecidos
          if (!dados.quantidade || !dados.dataCadastro || !dados.acervo || !dados.status || !dados.acervo.codigoRegisto) {
            resposta.json({
              status: false,
              mensagem: "Dados incompletos. Certifique-se de fornecer quantidade, dataCadastro e acervo com código."
            });
            return;
          }
      
          // Cria o objeto exemplar
          const quantidade = dados.quantidade;
          const dataCadastro = dados.dataCadastro;
          const status = dados.status;
          const codigoAcervo = dados.acervo.codigoRegisto;
          const acervo = new Acervo(codigoAcervo); // Certifique-se de passar o código do acervo
      
          acervo.consultarcodigoRegisto(codigoAcervo)
            .then((acervoEncontrado) => {
                if (acervoEncontrado && acervoEncontrado.length > 0) { // Verifica se acervoEncontrado não está vazio
                const primeiroAcervo = acervoEncontrado[0]; // Acesse o primeiro objeto na lista
                const exemplar = new Exemplar(0, quantidade, dataCadastro, status, primeiroAcervo);
          
                exemplar.gravar()
                    .then((exemplarGravado) => {
                    resposta.json({
                        status: true,
                        exemplar: {
                        codigo: exemplarGravado.codigo,
                        quantidade: exemplarGravado.quantidade,
                        dataCadastro: exemplarGravado.dataCadastro,
                        status: exemplarGravado.status,
                        acervo: {
                            codigo: exemplarGravado.acervo.codigoRegisto
                        }
                        },
                        mensagem: "Exemplar gravado com sucesso!"
                    });
                    })
                .catch((erro) => {
                resposta.json({
                    status: false,
                    mensagem: erro 
                });
                });
            } else {
            resposta.json({
                status: false,
                mensagem: "Acervo não encontrado ou vazio"
            });
            }
        })
        .catch((erro) => {
            resposta.json({
            status: false,
            mensagem: erro
            });
        });
        
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
          

            if (!dados.codigo || !dados.quantidade || !dados.dataCadastro || !dados.acervo || dados.codigoAcervo) {
              resposta.json({
                status: false,
                mensagem: "Dados incompletos. Certifique-se de fornecer quantidade, dataCadastro e acervo com código."
              });
              return;
            }
            
            const codigo = dados.codigo;
            const quantidade = dados.quantidade;
            const dataCadastro = dados.dataCadastro;
            const status = dados.status;
            const codigoAcervo = dados.acervo.codigoRegisto;
            const acervo = new Acervo(codigoAcervo);
          
            acervo.consultarcodigoRegisto(codigoAcervo)
              .then((acervoEncontrado) => {
                if (acervoEncontrado && acervoEncontrado.length > 0) {
                  const primeiroAcervo = acervoEncontrado[0];
                  const exemplar = new Exemplar(codigo, quantidade, dataCadastro, status, primeiroAcervo);
          
                  exemplar.atualizar()
                    .then((exemplarAtualizado) => {
                      resposta.json({
                        status: true,
                        exemplar: {
                          codigo: exemplarAtualizado.codigo,
                          quantidade: exemplarAtualizado.quantidade,
                          dataCadastro: exemplarAtualizado.dataCadastro,
                          status: exemplarAtualizado.status,
                          acervo: {
                            codigo: exemplarAtualizado.acervo.codigoRegisto,
                            titulo: exemplarAtualizado.acervo.tituloDoLivro
                          }
                        },
                        mensagem: "Exemplar atualizado com sucesso!"
                      });
                    })
                    .catch((erro) => {
                      resposta.json({
                        status: false,
                        mensagem: "Erro ao atualizar o exemplar: " + erro
                      });
                    });
                } else {
                  resposta.json({
                    status: false,
                    mensagem: "Acervo não encontrado ou vazio"
                  });
                }
              })
              .catch((erro) => {
                resposta.json({
                  status: false,
                  mensagem: "Erro ao consultar o acervo: " + erro
                });
              });
          }
    }


    excluir(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const exemplar = new Exemplar(codigo);

            exemplar.remover().then(()=>{
                resposta.json({
                    status:true,
                    mensagem:"Exemplar excluído com sucesso!"
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
            const exemplar = new Exemplar();

            exemplar.consultar(termo)
            .then((exemplares)=>{
                resposta.json(exemplares);
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

      
    consultarCodigo(requisicao, resposta){
      resposta.type("application/json")
      const codigo = requisicao.params['codigo'];

      if(requisicao.method === "GET"){
          const exemplar = new Exemplar();
          exemplar.consultarCodigo(codigo).then((exemplar)=>{
              resposta.json(exemplar);

      }).catch((erro) => {
          resposta.json({
              status: false,
              mensagem: erro.message
          })
      });
      } else {
      resposta.status(400).json({
          status:false,
          mensagem:"Método não permitido! Consulte a documentação da API"
      });
      }

  }
}
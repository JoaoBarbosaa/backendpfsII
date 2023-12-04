import Pagina from "../templates/componentes/Pagina.js";
import FormExemplar from "../Formularios/FormBaixa.jsx";
import TabelaExemplar from "../tabelas/TabelaBaixa.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
import "../tabelas/estilos/tabela.css";
import {Spinner} from "react-bootstrap"
import { useState, useEffect } from "react";

export default function TelaFormBaixa(props){

    const [exibirTabela, setExibirTabela] = useState (true);
    const [baixas, setBaixas] = useState ([]);
    const [modoEdicao, setModoEdicao] = useState (false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState (false);
    const [baixaEmEdicao, setBaixaEmEdicao] = useState({
        codigo: "",
        motivBaixa: "",
        exemplar: {
            codigo: "",
        }
    });
    
    function prepararBaixaParaEdicao(baixa) {
        setModoEdicao(true);
        setBaixaEmEdicao({
            codigo: baixa.codigo,
            quantidade: baixa.motivBaixa,
            exemplar: {
                codigo: baixa.exemplar.codigo
            },
            
        });
        setExibirTabela(false);
    }
    

    function apagarBaixa(baixa){
        fetch(urlBase+"/baixa", {
            method: "DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(baixa)
        }).then((resposta) =>{
            return resposta.json()
        }).then((retorno) => {
            if(retorno.resultado){
                alert("Não foi possível excluir a baixa")
            }
            else{
                buscarBaixa()
            }
        })
    }


    function buscarBaixa() {
        fetch(urlBase + "/baixa", {
            method: "GET"
        })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados)) {
                setBaixas(dados);
                exibirTabela(true);
            } else {
                setErro(dados.status);
            }
            setProcessado(true);
        })
        .catch((error) => {
            console.error('Erro na busca de exemplar:', error);
            setProcessado(true);
        });
    }
    

    useEffect(() =>{
        buscarBaixa();
    },[])

    useEffect(() => {
        if(exibirTabela){
            buscarBaixa();
        }
    }, [exibirTabela])

    if (erro){
        return <div>
            <p>Erro ao obter os exemplar do Backend : {erro.message}</p>
        </div>
    }else if (!processado){
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando exemplar...</span>
        </Spinner>
    }
    else{
        return <Pagina>
            <div>
            {
                exibirTabela ? 
                <TabelaExemplar 
                listaBaixa={baixas} 
                exibirTabela={setExibirTabela}
                editarBaixa={prepararBaixaParaEdicao}
                excluirBaixa={apagarBaixa}
                setModoEdicao={setModoEdicao}
                buscar={buscarBaixa}
                setBaixas={setBaixas}
                /> 
                :
                <FormExemplar 
                listaBaixas={baixas} 
                setBaixas={setBaixas}
                exibirTabela={setExibirTabela}
                buscar={buscarBaixa}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                baixa={baixaEmEdicao}
                />
            }
            </div>
        </Pagina>
        }
}
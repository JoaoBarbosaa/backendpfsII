import ExemplarDB from "../Persistencia/ExemplarBD.js";


export default class Exemplar{

    #codigo;
    #quantidade;
    #dataCadastro;
    #status
    #acervo;

    constructor(codigo=0, quantidade=0, dataCadastro="", status="", acervo={}){
        this.#codigo = codigo;
        this.#quantidade = quantidade;
        this.#dataCadastro = dataCadastro;
        this.#status = status;
        this.#acervo = acervo;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get quantidade(){
        return this.#quantidade;
    }
    set quantidade(novaQuantidade){
        this.#quantidade = novaQuantidade;
    }

    get dataCadastro(){
        return this.#dataCadastro;
    }
    set dataCadastro(novaDataCadastro){
        this.#dataCadastro = novaDataCadastro;
    }

    get status(){
        return this.#status;
    }
    set status(novoStatus){
        this.#status = novoStatus;
    }

    get acervo(){
        return this.#acervo;
    }
    set acervo(novoAcervo){
        this.#acervo = novoAcervo;
    }
    

    toJSON(){
        return {
            "codigo"      :this.#codigo,
            "quantidade"  :this.#quantidade,
            "dataCadastro":this.#dataCadastro,
            "status"      :this.#status,
            "acervo"      :this.#acervo
        }
    }


    async gravar(){
        const exemplarDB = new ExemplarDB();
        this.#codigo = await exemplarDB.incluir(this);
    }
    async atualizar(){
        const exemplarDB = new ExemplarDB();
        await exemplarDB.alterar(this);
    }


    async remover(){
        const exemplarDB = new ExemplarDB();
        await exemplarDB.excluir(this);
    }

    async consultar(termo){
        const exemplarDB = new ExemplarDB();
        const exemplar = await exemplarDB.consultar(termo);
        return exemplar;
    }

    async consultarCodigo(codigo){
        const exemplarDB = new ExemplarDB();
        const exemplar = await exemplarDB.consultarCodigo(codigo);
        return exemplar;
    }
}
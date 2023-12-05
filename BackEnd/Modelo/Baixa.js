import BaixaDB from "../Persistencia/BaixaBD.js";


export default class Baixa{

    #codigo;
    #motivBaixa;
    #exemplar;

    constructor(codigo=0, motivBaixa="", exemplar={}){
        this.#codigo = codigo;
        this.#motivBaixa = motivBaixa;
        this.#exemplar = exemplar;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get motivBaixa(){
        return this.#motivBaixa;
    }
    set motivBaixa(novaMotivBaixa){
        this.#motivBaixa = novaMotivBaixa;
    }

    get exemplar(){
        return this.#exemplar;
    }
    set exemplar(novoExemplar){
        this.#exemplar = novoExemplar;
    }
    

    toJSON(){
        return {
            "codigo"      :this.#codigo,
            "motivBaixa"  :this.#motivBaixa,
            "exemplar"      :this.#exemplar
        }
    }


    async gravar(){
        const baixaDB = new BaixaDB();
        this.#codigo = await baixaDB.incluir(this);
    }

    async atualizarStatus(){
        const exemplarDB = new BaixaDB();
        await exemplarDB.alterarStatus(this);
    }

    async alterarStatusDelete(){
        const exemplarDB = new BaixaDB();
        await exemplarDB.alterarStatusDelete(this);
    }

    async remover(){
        const baixaDB = new BaixaDB();
        await baixaDB.excluir(this);
    }

    async consultar(termo){
        const baixaDB = new BaixaDB();
        const baixa = await baixaDB.consultar(termo);
        return baixa;
    }

    async consultarBaixa(motivBaixa){
        const baixaDB = new BaixaDB();
        const baixa = await baixaDB.consultarBaixa(motivBaixa);
        return baixa;
    }
}
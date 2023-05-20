import FormLivro from "../Formularios/FormLivro.jsx";
import Pagina from "../templates/componentes/Pagina.js";
import TabelaLivro from "../tabelas/TabelaLivro.jsx";
import listaLivros from "../dados/monkLivros.js";
import { useState } from "react";


export default function TelaCadastroLivro(props){

    const [exibirTabela, setExibirTabela] = useState(true);
    const [livros, setLivros] = useState(listaLivros);
    
    return (
            
            <Pagina>
                <div>
                    {
                        exibirTabela ? 
                        <TabelaLivro listaLivros={livros} 
                                     setLivros={setLivros}
                                     exibirTabela={setExibirTabela}/> 
                        : 
                        <FormLivro listaLivros={livros}
                                   setLivros={setLivros} 
                                   exibirTabela={setExibirTabela}/>
                    }
                </div>
            </Pagina>
            
            
    );
}

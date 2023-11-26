import React, { useState } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import "./estilos/tabela.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRef } from "react";
import { utils, writeFileXLSX } from "xlsx";

export default function TabelaRenovacao(props) {
    const [termoDeBusca, setTermoDeBusca] = useState('');
    const [exemplar, setExemplar] = useState([]);
    const [acervoLista, setAcervoLista] = useState([]);

    const tbl = useRef(null)

    function imprimir(){
      const wb = utils.table_to_book(tbl.current);
        writeFileXLSX(wb, "renovacao    .xlsx");
    }
    return (

        <body id="corpo" className="colorwhite ">


            <Container className="border mb-2 mt-2 corpoTabela" >
                <h2 className="text-center m-4">Renovação Cadastradas</h2>
                <Row className='mb-2 mt-2 '>
                    <Col>
                        <Button variant="success"
                            onClick={() => {
                                props.exibirTabela(false);
                                props.setModoEdicao(false);
                            }}>
                            Cadastrar
                        </Button>
                    </Col>
                </Row>
                <Col>
                 <Button variant="primary" onClick={imprimir}>Exportar para Excel</Button>
                </Col>
                <Table ref={tbl} striped bordered hover className="text-center">
                    <thead className="colorwhite">
                        <tr>
                            <th>Código</th>
                            <th>Data da Renovação</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Categoria</th>
                            <th>Titulo</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {props.listaEmprestimos?.map((emprestimo, indice) => {

                            const dataEmprestimo = new Date(emprestimo.dataEmprestimo);
                            const dia = String(dataEmprestimo.getDate()).padStart(2, '0');
                            const mes = String(dataEmprestimo.getMonth() + 1).padStart(2, '0'); // Adicione 1 ao mês, pois ele é baseado em zero
                            const ano = dataEmprestimo.getFullYear();
                            const dataFormatada = `${dia}/${mes}/${ano}`;

                            const cpf = emprestimo.pessoa.cpf;
                            const cpfLimpo = cpf.replace(/\D/g, '');
                            const cpfFormatado = cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');


                            return (
                                <tr key={indice}>
                                    <td id="colorwhite">{emprestimo.codigo}</td>
                                    <td id="colorwhite">{dataFormatada}</td>
                                    <td id="colorwhite">{emprestimo.pessoa.nome}</td>
                                    <td id="colorwhite">{cpfFormatado}</td>
                                    <td id="colorwhite">{emprestimo.pessoa.categoria}</td>
                                    <td id="colorwhite">
                                        {emprestimo.listaExemplares.map((exemplar, index) => {
                                            if (exemplar && exemplar.exemplar && exemplar.exemplar.acervo) {

                                                const titulo = exemplar.exemplar.acervo.titulo;
                                                return <div key={index}>{titulo}</div>;
                                            } else {
                                                return <div key={index}>Título não definido</div>;
                                            }
                                        })}
                                    </td>


                                    <td>
                                        <Button variant="danger"
                                            onClick={() => {
                                                if (window.confirm("Deseja realmente excluir o empréstimo?")) {
                                                    props.excluirEmprestimo(emprestimo);
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

            </Container>
        </body>
    );
}

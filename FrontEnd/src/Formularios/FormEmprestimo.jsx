import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col } from 'react-bootstrap';
import { urlBase } from "../utilitarios/definicoes.js";
import TabelaItensEmprestimo from '../tabelas/TabelaItensEmprestimo.jsx';
import CaixaSelecao from '../componentes/busca/CaixaSelecao.jsx';
import { useRef } from "react";
import { utils, writeFileXLSX } from "xlsx";
const Swal = require('sweetalert2')


export default function Formulario(props) {

    const [validado, setValidado] = useState(false);
    const [listaPessoa, setListaPessoa] = useState([]);
    const [pessoaSelecionada, setPessoaSelecionada] = useState({});
    const [exemplarSelecionado, setExemplarSelecionado] = useState({});
    const [listaExemplares, setListaExemplares] = useState([]);
    const [listaEmprestimosSelecionados, setListaEmprestimosSelecionados] = useState([]);

    const [emprestimo, setEmprestimo] = useState({
        codigo: "",
        dataRenovacao: "",
        pessoa: {
            cpf: pessoaSelecionada.cpf
        },
        listaExemplares: [],
    });

    useEffect(() => {
        fetch(urlBase + "/pessoas")
            .then((resposta) => resposta.json())
            .then((dados) => {
                setListaPessoa(dados);
            })
            .then((dados) => {
                setListaExemplares(dados);
            })
            .catch((erro) => {
                alert("Erro ao buscar os dados de pessoa");
                console.error(erro);
            });
    }, []);

    function manipularMudanca(evento) {
        const elemForm = evento.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setEmprestimo({ ...emprestimo, [id]: valor });
    }



    function gravarEmprestimo(emprestimo) {

        let listaItens = []
        for (const item of listaEmprestimosSelecionados) {
            listaItens.push({
                exemplar: {
                    codigo: item.codigo
                }
            })
        }


        fetch(urlBase + "/emprestimo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "dataEmprestimo": emprestimo.dataEmprestimo,
                "pessoa": {
                    "cpf": pessoaSelecionada.cpf
                },
                "listaExemplares": listaItens
            }),
        }).then((resposta) => resposta.json())
            .then((dados) => {
                if (dados.resultado) {
                    Swal.fire("Não foi possivel gravar o emprestimo")
                }
                else {
                    props.setModoEdicao(false);
                    props.exibirTabela(true);
                    Swal.fire(
                        'Emprestimo Cadastrado!',
                        'Com sucesso no sistema',
                        'success')
                }
            })
            .catch((erro) => {
                Swal.fire("Erro ao cadastrar o emprestimo");
                console.error(erro);

            });
    }

    const manipulaSubmissao = (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;

        if (form.checkValidity()) {
            gravarEmprestimo(emprestimo);
            setValidado(false);
        }
        else {
            setValidado(true);
        }
  
    };


    return (
        <body id="corpo">
            <Container className="background mb-3">
                <Form
                    id="formEmprestimo"
                    noValidate
                    validated={validado}
                    onSubmit={manipulaSubmissao}
                    className="mainForm"
                >
                    <h1 className="text-center colorWhite">Renovação de Exemplar</h1>
                    <Row>
                        <Col md={5}>
                            <Form.Group>

                                <Form.Label htmlFor="codigo" className="form-label">Codigo</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    value={emprestimo.codigo}
                                    placeholder="Automático"
                                    id="codigo"
                                    onChange={manipularMudanca}
                                    disabled />
                            </Form.Group>
                        </Col>

                        <Col md={5}>
                            <Form.Group className="mb-3" controlId="dataEmprestimo">
                                <Form.Label>Data da Renovacao</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="dataEmprestimo"
                                    onChange={manipularMudanca}
                                    value={emprestimo.dataEmprestimo}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Selecione uma data de Renovacao válida
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="pessoa">
                                <Form.Label>Selecione o Pessoa:</Form.Label>
                                <CaixaSelecao
                                    enderecoFonteDados={urlBase + "/pessoas"}
                                    campoChave={"cpf"}
                                    campoExibicao={"nome"}
                                    funcaoSelecao={setPessoaSelecionada}
                                    valor={pessoaSelecionada}
                                    id="pessoa"
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Container>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exemplar">
                                    <Form.Label>Selecione o Exemplar:</Form.Label>
                                    <CaixaSelecao
                                        enderecoFonteDados={`${urlBase}/exemplar`}
                                        campoChave="codigo"
                                        campoExibicao="acervo,titulo"
                                        funcaoSelecao={setExemplarSelecionado}
                                        valor={exemplarSelecionado}
                                        id="exemplar"
                                    />
                                </Form.Group>
                            </Col>
{/* 
                            <Col md={7}>
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={manipularMudanca}
                                    value={exemplarSelecionado && exemplarSelecionado.acervo && exemplarSelecionado.acervo.titulo}
                                    nome="exemplarSelecionado"
                                    disabled
                                    required
                                />
                            </Col>  */}
                        </Row>

                        <Row>

                        <Col md={4}>
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={manipularMudanca}
                                    value={exemplarSelecionado.codigo}
                                    nome="exemplarSelecionado"
                                    disabled
                                    required
                                />
                            </Col>

                            <Col md={4}>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={manipularMudanca}
                                    value={exemplarSelecionado.quantidade}
                                    nome="exemplarSelecionado"
                                    disabled
                                    required
                                />
                            </Col>

                            <Col md={4}>
                                <Form.Label>Data Cadastro</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={manipularMudanca}
                                    value={exemplarSelecionado.dataCadastro}
                                    nome="exemplarSelecionado"
                                    disabled
                                    required
                                />
                            </Col>
                        </Row>


                        <br />
                        <Col md={1} onClick={() => {
                            const newItem = {
                                codigo: exemplarSelecionado.codigo,
                                dataEmprestimo: emprestimo.dataEmprestimo,
                                pessoa: {
                                    cpf: pessoaSelecionada.cpf
                                },
                                listaExemplar: [
                                    {
                                        exemplar: {
                                            codigo: exemplarSelecionado.codigo
                                          
                                        }
                                    }
                                ]
                            }
                            
                            setListaEmprestimosSelecionados([...listaEmprestimosSelecionados, newItem]);
                        }}>
                            <Button>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-plus-square"
                                    viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </Button>
                        </Col>

                        <Row>
                            <TabelaItensEmprestimo
                                listaItens={listaEmprestimosSelecionados}
                                dadosEmprestimo={emprestimo}
                                setEmprestimo={setEmprestimo}
                                setListaItens={setListaEmprestimosSelecionados}
                            />
                        </Row>

                    </Container>

                    <Row className='mb-3 botao'>
                        <div className="botao">
                            <Button type="submit"
                                className="botao"
                                id="cadastrar">{props.modoEdicao ? "Atualizar" : "Cadastrar"}
                            </Button>{' '}

                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    props.exibirTabela(true);
                                    props.setModoEdicao(false);
                                }}
                            >Voltar
                            </Button>{' '}

                        </div>
                    </Row>

                </Form>
            </Container >
        </body >
    );
}

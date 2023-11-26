import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col } from 'react-bootstrap';
import "./estilos/EstiloForm.css";
import CaixaSelecao from "../componentes/busca/CaixaSelecao";
import { urlBase } from "../utilitarios/definicoes.js";
const Swal = require('sweetalert2')

export default function FormExemplar(props) {

  const [validado, setValidado] = useState(false);
  const [tituloSelecionado, setTituloSelecionado] = useState({});

  useEffect(() => {
    setExemplar(props.exemplar);
    setTituloSelecionado(props.exemplar.acervo);
  }, [props.exemplar]);

  const [exemplar, setExemplar] = useState(props.exemplar);

  function manipularMudanca(evento) {
    const elemForm = evento.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setExemplar({ ...exemplar, [id]: valor });
  }

  function manipulaEvento(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    const form = evento.currentTarget;

    if (form.checkValidity()) {
      gravarDados({ ...exemplar, acervo: tituloSelecionado });
      setValidado(false);
    }
    else {
      setValidado(true);
    }

  }


  function gravarDados(exemplar) {
    if (!props.modoEdicao) {
      fetch(urlBase + "/exemplar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exemplar),
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          if (dados.resultado) {
            alert("Não foi possível inserir o exemplar");
          } else {
            Swal.fire(
              'Exemplar cadastrado',
              'Com sucesso no sistema',
              'success')
            props.setModoEdicao(false);
            props.exibirTabela(true);
            console.log(exemplar.acervo);
          }
        })
        .catch((error) => {
          console.error('Erro na inserção do exemplar:', error);
        });
    } else {
      fetch(urlBase + "/exemplar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exemplar),
      })
        .then((resposta) => {
          if (!resposta.ok) {
            throw new Error('Erro na atualização');
          }
          return resposta.json(); 
        })
        .then((dadosAtualizados) => {
        
          if (dadosAtualizados.resultado) {
            Swal.fire("Não foi possível atualizar o exemplar");
          } else {
            Swal.fire("Exemplar atualizado com sucesso");
            
            props.exibirTabela(true);
            console.log(exemplar.acervo); 
          }
        })
        .catch((error) => {
          console.error('Erro na atualização do exemplar:', error + "\nDados: " + JSON.stringify(exemplar));
        });
    }




  }

  return (
    <body id="corpo">
      <Container className="background mb-3">
        <Form
          id="formExemplar"
          noValidate
          validated={validado}
          onSubmit={manipulaEvento}
          className="mainForm"
        >
          <h1 className="text-center colorWhite">Cadastro de Exemplar</h1>
          <Row>
            <Col md={3}>
              <Form.Group>

                <Form.Label htmlFor="codigo" className="form-label">Codigo</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={exemplar.codigo}
                  placeholder="Automático"
                  id="codigo"
                  onChange={manipularMudanca} disabled />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="quantidade">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite a quantidade"
                  id="quantidade"
                  onChange={manipularMudanca}
                  value={exemplar.quantidade}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Digite uma quantidade válida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="dataCadastro">
                <Form.Label>Data de Cadastro</Form.Label>
                <Form.Control
                  type="date"
                  id="dataCadastro"
                  onChange={manipularMudanca}
                  value={exemplar.dataCadastro}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Selecione uma data de cadastro válida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>


          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o status"
                  id="status"
                  onChange={manipularMudanca}
                  value={exemplar.status}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Digite um status válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="titulo">
                <Form.Label>Selecione o Título:</Form.Label>
                <CaixaSelecao
                  enderecoFonteDados={urlBase + "/acervos"}
                  campoChave={"codigoRegisto"}
                  campoExibicao={"tituloDoLivro"}
                  funcaoSelecao={setTituloSelecionado}
                  valor={tituloSelecionado}
                  id="acervo"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3 botao'>
            <div className="botao">
              <Button type="submit"
                className="botao"
                id="cadastrar">{props.modoEdicao ? "Atualizar" : "Cadastrar"}
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  props.exibirTabela(true);
                  props.setModoEdicao(false);
                }}
              >Voltar
              </Button>

            </div>
          </Row>
        </Form>
      </Container>
    </body>
  );
}

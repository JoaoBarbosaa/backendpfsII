import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col } from 'react-bootstrap';
import "./estilos/EstiloForm.css";
import CaixaSelecao from "../componentes/busca/CaixaSelecaoBaixa.jsx";
import { urlBase } from "../utilitarios/definicoes.js";
const Swal = require('sweetalert2')

export default function FormBaixa(props) {

  const [validado, setValidado] = useState(false);
  const [tituloSelecionado, setTituloSelecionado] = useState({});

  useEffect(() => {
    setBaixa(props.baixa);
    setTituloSelecionado(props.baixa.exemplar);
  }, [props.baixa]);

  const [baixa, setBaixa] = useState(props.baixa);

  function manipularMudanca(evento) {
    const elemForm = evento.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setBaixa({ ...baixa, [id]: valor });
  }

  function manipulaEvento(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    const form = evento.currentTarget;

    if (form.checkValidity()) {
      gravarDados({ ...baixa, exemplar: tituloSelecionado });
      setValidado(false);
    }
    else {
      setValidado(true);
    }

  }


  function gravarDados(baixa) {
    if(!props.modoEdicao){
      fetch(urlBase+"/baixa",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(baixa),
      }).then((resposta) =>{
        console.log(baixa)
        props.setModoEdicao(false);
        props.exibirTabela(true);
        Swal.fire(
          'Baixa realizada!',
          'Com sucesso no sistema',
          'success')
      })
  
  }}


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
          <h1 className="text-center colorWhite">Baixa de Exemplar</h1>
          <Row>
            <Col md={3}>
              <Form.Group>

                <Form.Label htmlFor="codigo" className="form-label">Codigo</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={baixa.codigo}
                  placeholder="Automático"
                  id="codigo"
                  onChange={manipularMudanca} disabled />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="motivBaixa">
                <Form.Label>Motivo da Baixa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o motivo da baixa do exemplar"
                  id="motivBaixa"
                  onChange={manipularMudanca}
                  value={baixa.motivBaixa}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Digite uma quantidade válida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>

            <Col>
              <Form.Group className="mb-3" controlId="titulo">
                <Form.Label>Selecione o Exemplar</Form.Label>
                <CaixaSelecao
                  enderecoFonteDados={urlBase + "/exemplar"}
                  campoChave={"codigo"}
                  campoExibicao="acervo,titulo"
                  funcaoSelecao={setTituloSelecionado}
                  valor={tituloSelecionado}
                  id="exemplar"
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
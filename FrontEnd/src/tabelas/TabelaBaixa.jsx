import { Button, Table, Form, Container, Row, Col } from "react-bootstrap";
import "./estilos/tabela.css";
import { urlBase } from "../utilitarios/definicoes";
import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRef } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { TfiHelpAlt } from "react-icons/tfi";
import Image from 'react-bootstrap/Image';
const Swal = require('sweetalert2')
export default function TabelaBaixa(props) {
  const tbl = useRef(null)

  function imprimir(){
    const wb = utils.table_to_book(tbl.current);
      writeFileXLSX(wb, "baixaexemplar.xlsx");
  }
  return (
    <body id="corpo" className="colorwhite ">
      <Container className="border mb-2 mt-2 corpoTabela" >
        <h2 className="text-center m-4 ">Baixas realizadas</h2>
        <TfiHelpAlt onClick={() => {
            Swal.fire({
              title: "Precisa de ajuda?",
              html: `<hr><p>Para efetuar um cadastro, clicar no botão verde. <span><Image src="/cadastrar.png" alt="Descrição da imagem" fluid/></span></p>
              <p><Image src="/exemplo.png" alt="Descrição da imagem"/></p>
              <p>Preencha todos os campos e clique no botão <Strong>"Cadastrar"</Strong> novamente.</p>
              <hr>
              <p>Para excluir um determinado item, clique no ícone da lixeira em vermelho. <br><span><Image src="/delete.png" alt="Descrição da imagem"/></span></p>
              <hr>
              <p>Para gerar um relatório em Excel, clique no botão em azul". <br><span><Image src="/exportar.png" alt="Descrição da imagem"/></span></p>
              `,
              icon: "question"
            });
          }} />
        <Row className='mb-2 mt-2 '>
          <Col>
            <Button variant="success"
              onClick={() => {
                props.exibirTabela(false)
                props.setModoEdicao(false)
              }}>
              Cadastrar
            </Button>
          </Col>
        <Col md="2">
            <Button variant="primary" onClick={imprimir}>Exportar para Excel</Button>
        </Col>
        </Row>
        <Table ref={tbl} striped bordered hover className="text-center">
          <thead className="colorwhite">
            <tr>
              <th>Codigo</th>
              <th>Motivo Baixa</th>
              <th>Codigo Exemplar</th>
              <th>Titulo do Exemplar</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.listaBaixa?.map((baixa, i) => {

              return (
                <tr key={i}>
                  <td id="colorwhite">{baixa.codigo}</td>
                  <td id="colorwhite">{baixa.motivBaixa}</td>
                  <td id="colorwhite">{baixa.exemplar.codigo}</td>
                  <td id="colorwhite">{baixa.exemplar.titulo}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        Swal.fire({
                          title: "Tem certeza?",
                          text: "Você não poderá reverter isso",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sim, exclui isso!"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Deletado!",
                              text: "Baixa deletada com sucesso. ",
                              icon: "success"
                            });
                            props.excluirBaixa(baixa);
                          }
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
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

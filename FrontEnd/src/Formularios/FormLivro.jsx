import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import "./estilos/EstiloForm.css";
import { urlBase } from '../utilitarios/definicoes';

export default function FormLivro(props) {

    const [valido, setValidated] = useState(false);

    const [livro, setLivro] = useState(props.livros)

    function manipularMudanca(e){
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setLivro({...livro, [id]:valor});
    }

    function gravarDados(livro){
        if(!props.modoEdicao){
            fetch(urlBase+"/acervos",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
            }).then((resposta) =>{
                window.alert("Titulo gravado  com sucesso!!")
            })
        }else{
            fetch(urlBase+"/acervos",{
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
            }).then((resposta) =>{
                window.alert("Titulo atualizado  com sucesso!!")
            })
        }

    }

  
    function manipulaEvento(evento) {
        const form = evento.currentTarget;

        if (!form.checkValidity()) {
            evento.preventDefault();
            evento.stopPropagation();
        }
        else{
            gravarDados(livro)
        }
        setValidated(true);
        return false;
    };

    return(
        <>
            <div className='row justify-content-center' id="corpo">
                <div>
                    <Form onoValidate validated={valido} onSubmit={manipulaEvento} className="p-5 border rounded mainForm" noValidate>
                    <h3 className="text-center mb-5 colorWhite">Cadastro de Título</h3>
                        <Row className="row mb-3">
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label htmlFor="codigoRegisto" className="form-label">Codigo Registro</Form.Label>
                                <Form.Control type="text" className="form-control" value={livro.codigoRegisto} placeholder="Automático" id="codigoRegisto" onChange={manipularMudanca} disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="tituloDoLivro" className="form-label">Titulo Do Livro</Form.Label>
                                <Form.Control type="text" value={livro.tituloDoLivro} className="form-control" id="tituloDoLivro" onChange={manipularMudanca} required />
                                <Form.Control.Feedback type='invalid'>Titulo do Livro</Form.Control.Feedback>
                                
                            </Form.Group>
                        </Col>
                        </Row>
                        
                        <Row className="row mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="editora" className="form-label">Editora</Form.Label>
                                    <Form.Control  type="text" value={livro.editora} className="form-control" id="editora" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe Editora</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label htmlFor="edicao" className="form-label">Edição</Form.Label>
                                    <Form.Control  type="text" value={livro.edicao} className="form-control" id="edicao" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe Edição</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                <Form.Label htmlFor="anoDePublicacao" className="form-label">Ano Publicação</Form.Label>
                                    <Form.Control  type="date" value={livro.anoDePublicacao} className="form-control" id="anoDePublicacao" onChange={manipularMudanca} required />
                                    <Form.Control.Feedback type='invalid'>Informe o Ano de Publicação</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />

                        <Row className='mb-3 botao'>
                            <div>
                                <Button type="submit" variant="success" id="cadastrar">{props.modoEdicao ? " Atualizar": "Cadastrar" } </Button>{' '}
                                <Button type="button" className="btn btn-secondary" variant="warning" onClick={()=>{ props.exibirTabela(true); 
                                props.setModoEdicao(false)}}>Voltar</Button>{' '}
                            </div>
                        </Row>
                        
                    </Form>
                </div>   
            </div>    
           
                    

        </>
    )
}
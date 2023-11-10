import { Button, Container, Form, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icone from '../../img/icone.png'
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import '../estilos/MenuCss.css'


export default function Menu(props) {

  const { authenticated, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg">
      <Container fluid >
        <Image src={Icone} width='75' className='icone'></Image>
        <Navbar.Brand href="#"><Link className='linkDeco Menu' to='/'>Quintal da Leitura</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Cadastros" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#"><Link className='linkDeco' to="/cadastroLivro">Cadastro de Titulo</Link></NavDropdown.Item>
              <NavDropdown.Item href="#"><Link className='linkDeco' to='/cadastroAutor'>Cadastro de Autor</Link></NavDropdown.Item>
              <NavDropdown.Item href="#"><Link className='linkDeco' to='/cadastroCategoria'>Cadastro de Categoria</Link></NavDropdown.Item>
              <NavDropdown.Item href="#"><Link className='linkDeco' to='/cadastroPessoa'>Cadastro de Pessoa</Link></NavDropdown.Item>
              <NavDropdown.Item href="#"><Link className='linkDeco' to='/cadastroUsuario'>Cadastro de Usuários</Link></NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/exemplar" className='linkDeco'>Exemplar</Nav.Link>

            <Nav.Link href="/emprestimo">
              Empréstimo
            </Nav.Link>

            <Nav.Link href="/renovacao">
              Renovar
            </Nav.Link>

            <Nav.Link href="/devolucao">
              Devolução
            </Nav.Link>

            <Nav.Link href="/baixa">
              Baixa
            </Nav.Link>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className='botão'>
              Pesquisar
            </Button>

          </Form>
          <button
            className="btn-sair"
            onClick={handleLogout}
            style={{ marginLeft: '8px' }}
          >
            Sair
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
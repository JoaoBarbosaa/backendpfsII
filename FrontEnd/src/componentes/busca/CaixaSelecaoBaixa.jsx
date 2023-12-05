import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

export default function CaixaSelecao({ 
  enderecoFonteDados,
  campoChave,
  campoExibicao,
  funcaoSelecao 
}) {

  const [valorSelecionado, setValorSelecionado] = useState({
    [campoChave]: 0,
    [campoExibicao]: "Não foi possível obter os dados do backend"
  });
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    try {
      setCarregandoDados(true);
      fetch(enderecoFonteDados, { method: "GET" })
        .then((resposta) => {
          if (resposta.ok) {  
            return resposta.json();
          } else {
            return [{
              [campoChave]: 0,
              [campoExibicao]: "Não foi possível obter os dados do backend"
            }];
          }
        })
        .then((listaDados) => {
          setCarregandoDados(false);
          const exemplaresAtivos = listaDados.filter(item => item.status === 'Ativo');
          setDados(exemplaresAtivos);
          if (listaDados.length > 0){
            setValorSelecionado(listaDados[0]);
            funcaoSelecao(listaDados[0]);     
          }
        });
    } catch (erro) {
      setCarregandoDados(false);
      setDados([{
        [campoChave]: 0,
        [campoExibicao]: "Não foi possível obter os dados do backend: " + erro.message 
      }]);
    }
  }, []);

  return (
    <Container border>
      <Row>
        <Col md={11}>
          <Form.Select
            onChange={(evento) => {
              const itemSelecionado = evento.currentTarget.value;
              const pos = dados.findIndex((item) => item[campoChave] && item[campoChave].toString() === itemSelecionado);
              if (pos !== -1) {
                setValorSelecionado(dados[pos]);
                funcaoSelecao(dados[pos]);
              }
            }}>
            {dados.map((item) => {
                            let exibicao = campoExibicao.split(",");

                            return (
                                <option key={item[campoChave]} value={item[campoChave]}>
                                    {exibicao.length > 1
                                        ? item[exibicao[0]][exibicao[1]]
                                        : item[campoExibicao]}
                                </option>
                            );
                        })}
          </Form.Select>
        </Col>
        <Col md={1}>
          <Spinner 
            className={carregandoDados ? "visible" : "invisible"}
          ></Spinner>
        </Col>
      </Row>
    </Container>
  );
}

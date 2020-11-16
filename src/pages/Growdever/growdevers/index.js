import React, { useState, useEffect } from 'react';
import { Container, Row, Col, NavItem, Nav, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import { Div, Article, Section, Img, Button } from '../../movies/styles';

const Classes = (props) => {
  const [growdevers, setGrowdevers] = useState([]);
  const uid = localStorage.getItem('userUid');

  async function handleDeleteGrowdevers(uid) {
    await api
      .delete(`/growdevers/${uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => {
        setGrowdevers(growdevers.filter((growdever) => growdever.uid !== uid));
      })
      .catch((error) => console.log('Erro ao deletar aluno!'));
  }

  useEffect(() => {
    api
      .get(`/growdevers`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        // },
      })
      .then((response) => setGrowdevers(response.data.growdever))

      .catch((error) => alert('Error ao buscar alunos cadastrados.'));
  }, []);

  return (
    <Section
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Div>
        <Nav style={{ padding: '20px' }}>
          <NavItem className="ml-2" style={{ width: '13%' }}>
            <Img alt="Academy" className="w-75" />
          </NavItem>
          <NavItem>
            <Link to="/" style={{ paddingLeft: '10%' }} className="ml-auto">
              <Button type="button">Cadastrar aulas</Button>
            </Link>
          </NavItem>
        </Nav>
      </Div>
      <Container>
        <Row>
          <Col>
            <Article style={{ width: '90%', opacity: '0.8', padding: '21px' }}>
              <Table
                style={{
                  width: '100%',
                  margin: 'auto',
                  paddingTop: '50px',
                  color: '#ffffff',
                }}
              >
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Programa</th>
                  </tr>
                </thead>
                <tbody>
                  {growdevers.map((growdever) => (
                    <React.Fragment key={growdever.uid}>
                      <tr>
                        <td>{growdever.name}</td>
                        <td>{growdever.email}</td>
                        <td>{growdever.phone}</td>
                        <td>{growdever.program}</td>
                        {/* <td>{`${classe.watched ? 'Sim' : 'Não'}`}</td> */}
                        <td>
                          <span>
                            <Button
                              style={{ width: '100px' }}
                              onClick={() =>
                                handleDeleteGrowdevers(growdever.uid)
                              }
                            >
                              Excluir
                            </Button>
                          </span>
                        </td>
                        <td>
                          <span>
                            <Button
                              style={{ width: '100px' }}
                              // onClick={() =>
                              //   handleDeleteGrowdevers(growdever.uid)
                              // }
                            >
                              Editar
                            </Button>
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Article>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Classes;

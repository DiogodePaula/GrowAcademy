import React, { useState, useEffect } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  NavItem,
  Nav,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logo from '../image/logo.png';
import { Div, Article, Section, Img, Button } from '../movies/styles';
import img from '../image/vingadores.jpg';

const Classes = (props) => {
  const [classes, setClasses] = useState([]);
  const uid = localStorage.getItem('userUid');

  async function handleDeleteClasse(uid) {
    await api
      .delete(`/classes/${uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => {
        setClasses(classes.filter((classe) => classe.uid !== uid));
      })
      .catch((error) => console.log('Erro ao deletar materia'));
  }

  useEffect(() => {
    api
      .get(`/classes/${uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => setClasses(response.data.classe))
      // eslint-disable-next-line no-alert
      .catch((error) => alert('Error ao buscar filmes cadastrados.'));
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
            <Img src={logo} alt="Academy" className="w-75" />
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
            <Article style={{ width: '50%', opacity: '0.8', padding: '21px' }}>
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
                    <th>Duração</th>
                    <th>Gênero</th>
                    <th>Já assistiu</th>
                    <th>Excluir Filme?</th>
                  </tr>
                </thead>
                <tbody style={{}}>
                  {classes.map((classe) => (
                    <React.Fragment key={classe.uid}>
                      <tr>
                        <td>{classe.name}</td>
                        <td>{classe.duration}</td>
                        <td>{classe.type}</td>
                        <td>{`${classe.watched ? 'Sim' : 'Não'}`}</td>
                        <td>
                          <span>
                            <Button
                              style={{ width: '100px' }}
                              onClick={() => handleDeleteClasse(classe.uid)}
                            >
                              Excluir
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

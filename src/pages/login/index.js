import { FormGroup, Label, Input } from 'reactstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as loginActions from '../../store/login/action';
import api from '../../services/api';

import { Article, Button, Section } from '../movies/styles';
import logo from '../image/logo-dark.png';

const Example = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await api.post('/login', {
        login,
        password,
      });
      const userType = response?.data?.user?.type;
      const isGrowdever = response?.data?.user?.growdever;

      if (
        response?.data?.token &&
        (isGrowdever !== null || userType === 'Admin')
      ) {
        dispatch(loginActions.login(response.data));
      }
    } catch (error) {
      alert('error ao tentar logar');
    }
  }

  return (
    <Section>
      <picture
        className="col-12"
        style={{ textAlign: 'center', marginTop: '2em' }}
      >
        <img src={logo} alt="Growdev" className="" />
      </picture>
      <div className="container">
        <div className="row">
          <Article className="col-sm-12 col-lg-5">
            <FormGroup>
              <Label for="examplePassword">login</Label>
              <Input
                type="text"
                value={login}
                placeholder="login"
                style={{ width: '100%' }}
                onChange={(e) => setLogin(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplelogin">Password</Label>
              <Input
                type="password"
                value={password}
                placeholder="password"
                style={{ width: '100%' }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button onClick={handleLogin}>Login</Button>
            <Link to="/register" style={{ float: 'right' }}>
              <Button>Criar conta</Button>
            </Link>
          </Article>
        </div>
      </div>
    </Section>
  );
};

export default Example;

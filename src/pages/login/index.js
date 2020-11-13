import { FormGroup, Label, Input } from 'reactstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as loginActions from '../../store/login/action';
import api from '../../services/api';

import { Article, Button } from '../movies/styles';
import logo from '../image/logo.png';
import imgLogin from '../image/login-img.jpg';

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

      if (response.data.token) {
        dispatch(loginActions.login(response.data.token));
        localStorage.setItem('tokenAuth', response.data.token);
      }
      localStorage.setItem('userUid', response.data.user.uid);
    } catch (error) {
      alert('error ao tentar logar');
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${imgLogin})`,
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '2em',
      }}
    >
      <div className="col-12" style={{ width: '43%', margin: 'auto' }}>
        <img src={logo} alt="FILMESFLIX" className="" />
      </div>
      <br />
      <div className="container">
        <div className="row">
          <section className="col-12">
            <Article style={{ width: '600px', margin: 'auto' }}>
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
              <Link to="/register" style={{ paddingLeft: '10px' }}>
                <Button>Criar conta</Button>
              </Link>
            </Article>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Example;

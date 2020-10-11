import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Router from './routeWrapper';

import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import CriarConta from '../pages/criarConta';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router path="/" exact component={HomePage} />
        <Router path="/login" exact component={LoginPage} />
        <Router path="/create" exact component={CriarConta} />
      </Switch>
    </BrowserRouter>
  );
};

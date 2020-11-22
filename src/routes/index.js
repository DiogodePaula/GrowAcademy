import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Router from './routeWrapper';

import HomeAdmin from '../pages/Admin/homeAdmin';
import AdminAddGrow from '../pages/Admin/criarConta';
import ClassesAdmin from '../pages/Admin/criarCurso';

import HomePage from '../pages/Growdever/homeGrow';
import LoginPage from '../pages/login';
import UserPage from '../pages/Admin/user';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router path="/" exact isPrivate component={HomeAdmin} />
        <Router
          path="/admin-growdever"
          exact
          isPrivate
          component={AdminAddGrow}
        />
        <Router path="/admin-class" exact isPrivate component={ClassesAdmin} />
        <Router path="/HomePage" exact component={HomePage} />
        <Router path="/login" exact component={LoginPage} />
        <Router path="/register" exact component={UserPage} />
        {/* <Router path="/classes" exact isPrivate component={Classes} /> */}
      </Switch>
    </BrowserRouter>
  );
};

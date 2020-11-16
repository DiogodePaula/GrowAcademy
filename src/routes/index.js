import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Router from './routeWrapper';

import HomeAdmin from '../pages/Admin/homeAdmin';
import AdminAddGrow from '../pages/Admin/criarConta';
import ClassesAdmin from '../pages/Admin/criarCurso';

import HomePage from '../pages/Growdever/homeGrow';
import LoginPage from '../pages/login';
import UserPage from '../pages/Admin/user';
import MyMovies from '../pages/myMovies';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router path="/admin-home" exact isPrivate component={HomeAdmin} />
        <Router
          path="/admin-home/user"
          exact
          isPrivate
          component={AdminAddGrow}
        />
        <Router
          path="/admin-home/class"
          exact
          isPrivate
          component={ClassesAdmin}
        />

        <Router path="/HomePage" exact isPrivate component={HomePage} />
        <Router path="/movie" exact isPrivate component={MyMovies} />
        <Router path="/" exact component={LoginPage} />
        <Router path="/register" exact component={UserPage} />
        {/* <Router path="/classes" exact isPrivate component={Classes} /> */}
      </Switch>
    </BrowserRouter>
  );
};

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from '../../services/api';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ color: '#ffffff' }}
    >
      {'© 2020 growdev. '}
      <Link color="inherit" href="https://growdev.com.br/" target="_blank">
        All rights reserved Growdev.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState('');

  async function handleUser() {
    await api
      .post('/users', { name, login, password })
      .then((response) => setUsers([...users, response.data]))
      .catch((error) => console.log(error));
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        backgroundColor: '#2b385b',
        color: '#ffffff',
        paddingBottom: '20px',
        borderRadius: '20px',
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <br />
        <Avatar
          style={{ backgroundColor: '#e16e0e' }}
          className={classes.avatar}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Nome"
                variant="outlined"
                required
                fullWidth
                label="Nome"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ backgroundColor: '#ffffff' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Login"
                name="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{ backgroundColor: '#ffffff' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#ffffff' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUser}
            style={{ backgroundColor: '#e16e0e' }}
          >
            Criar conta
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" style={{ color: '#ffffff' }}>
                Já tem conta? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

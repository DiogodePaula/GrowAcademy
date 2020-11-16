import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { Toolbar, AppBar } from '@material-ui/core';

import api from '../../../services/api';

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
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [userSelected, setUserSelected] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [user, setUser] = useState([]);
  const [growdever, setGrowdevers] = useState([]);

  const userLogin = useSelector((state) => state?.login);

  async function handleGrowdever() {
    await api
      .post(
        '/growdevers',
        { name, email, phone, program },
        {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        }
      )
      .then((response) => setGrowdevers([...growdever, response.data]))
      .catch((error) => console.log(error));
    setName('');
    setEmail('');
    setPhone('');
    setProgram('');
  }

  useEffect(() => {
    api
      .get(`/users`, {
        headers: {
          Authorization: `Bearer ${userLogin}`,
        },
      })

      .then((response) => setUser(response.data.user))

      .catch((error) => alert('Error ao buscar alunos cadastrados.'));
  }, []);
  console.log(userLogin);
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
        style={{ backgroundColor: '#2b385b' }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
            style={{ color: '#ffffff' }}
          >
            Grow<span style={{ color: '#e16e0e' }}>dev</span>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="/admin-home/class"
              className={classes.link}
              style={{
                width: '150px',
                color: '#2b385b',
                backgroundColor: '#ffffff',
                padding: '5px',
                borderRadius: '5px',
                fontWeight: '600',
              }}
            >
              Cadastrar Cursos
            </Link>
            <Link
              href="/admin-home"
              color="primary"
              variant="outlined"
              className={classes.link}
              style={{
                width: '150px',
                color: '#2b385b',
                backgroundColor: '#ffffff',
                padding: '5px 10px',
                borderRadius: '5px',
                fontWeight: '600',
              }}
            >
              HOME
            </Link>

            <Button
              type="button"
              style={{
                color: '#2b385b',
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                fontWeight: '600',
              }}
              // onClick={() => dispatch(loginActions.logout())}
            >
              Logout
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
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
            Cadastro de Growdever
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
                  label="Email"
                  name="Login"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="program"
                  label="Program"
                  type="program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
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
              onClick={handleGrowdever}
              style={{ backgroundColor: '#e16e0e' }}
            >
              Adicionar Growdever
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      <Container maxWidth="xl" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ color: '#2b385b', fontWeight: '700' }}
        >
          <article
            style={{
              width: '90%',
              margin: 'auto',
              color: '#2b385b',
              border: 'solid 3px #2b385b',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <table
              style={{
                width: '100%',
                margin: 'auto',
                paddingTop: '50px',
                color: '#ffffff',
              }}
            >
              <thead>
                <tr
                  style={{
                    marginBottom: '1em',
                    color: '#e16e0e',
                  }}
                >
                  <th>Login</th>
                  <th>Name</th>
                  <th>Tipo</th>
                  {/* <th>Programa</th> */}
                  {/* <th>Excluir</th> */}
                  {/* <th>Editar</th> */}
                </tr>
              </thead>
              <tbody style={{}}>
                {user.map((users) => (
                  <React.Fragment key={users.uid}>
                    <tr style={{ color: '#2b385b', marginTop: '1em' }}>
                      <td>{users.login}</td>
                      <td>{users.name}</td>
                      <td>{`${users.type ? 2 : 1}`}</td>

                      {/* <td>{`${users.type ? 'Sim' : 'Não'}`}</td> */}
                      <td>
                        <span>
                          <Button
                            style={{ width: '100px' }}
                            // onClick={() => handleDeleteusers(user.uid)}
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
            </table>
          </article>
        </Typography>
      </Container>
      {/* End footer */}
    </>
  );
}

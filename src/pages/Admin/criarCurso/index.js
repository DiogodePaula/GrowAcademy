import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/AccountBox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Button2 } from '../homeAdmin/styles';

import api from '../../../services/api';
import * as loginActions from '../../../store/login/action';

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

export default function Classes() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userSelected, setUserSelected] = useState('');
  const [bootcamp, setBootcamp] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [status, setStatus] = useState('');

  const [classe, setClasses] = useState([]);

  async function handleClasse(e) {
    e.preventDefault();

    await api
      .post(
        '/classes',
        { bootcamp, date, hour, status }
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        //   },
        // }
      )
      .then((response) => {
        setClasses([...classe, response.data.classe]);
        alert('Bootcamp cadatsrado com sucesso!!');
      })
      .catch((error) => alert('Erro ao cadastrar filme.', error));
    setBootcamp('');
    setDate('');
    setHour('');
    setStatus('');
  }

  useEffect(() => {
    api
      .get(`/classes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => setClasses(response.data.classe))

      .catch((error) => alert('Error ao buscar programas.'));
  }, []);

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
            style={{ color: '#ffffff', display: 'flex', flexGrow: '1' }}
          >
            Grow<span style={{ color: '#e16e0e' }}>dev</span>
          </Typography>
          <nav>
            <Link
              color="textPrimary"
              href="/"
              className={classes.link}
              style={{
                width: '150px',
                color: '#2b385b',
                backgroundColor: '#ffffff',
                padding: '5px',
                borderRadius: '5px',
                fontWeight: '600',
                textDecoration: 'none',
                height: '40px',
              }}
            >
              Home
            </Link>
            <Link
              href="/admin-growdever"
              color="primary"
              variant="outlined"
              className={classes.link}
              style={{
                width: '150px',
                color: '#2b385b',
                backgroundColor: '#ffffff',
                padding: '5px',
                borderRadius: '5px',
                fontWeight: '600',
                textDecoration: 'none',
                height: '40px',
              }}
            >
              Cadastrar Growdever
            </Link>
            <Button2
              style={{
                color: '#ffffff',
                backgroundColor: '#DC3545',
                borderRadius: '5px',
                fontWeight: '600',
                height: '40px',
              }}
              onClick={() => dispatch(loginActions.logout())}
            >
              Deslogar
            </Button2>
          </nav>
        </Toolbar>
      </AppBar>
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
                  name="Bootcamp"
                  variant="outlined"
                  required
                  fullWidth
                  label="Bootcamp"
                  autoFocus
                  value={bootcamp}
                  onChange={(e) => setBootcamp(e.target.value)}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Date"
                  name="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="hour"
                  label="hour"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="status"
                  label="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
              onClick={handleClasse}
              style={{ backgroundColor: '#e16e0e' }}
            >
              Adicionar Growdever
            </Button>
          </form>
        </div>
      </Container>
      <TableContainer
        component={Paper}
        style={{
          width: '90%',
          margin: 'auto',
          marginTop: '5em',
          border: 'solid 1px #2B385B',
        }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Bootcamps</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Hour</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classe.map((clas) => (
              <React.Fragment key={clas.uid}>
                <TableRow>
                  <TableCell align="center">{clas.bootcamp}</TableCell>
                  <TableCell align="center">{clas.date}</TableCell>
                  <TableCell align="center">{clas.hour}</TableCell>
                  <TableCell align="center">{clas.status}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

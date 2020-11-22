import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import * as loginActions from '../../../store/login/action';
import { Button2 } from './styles';

import api from '../../../services/api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
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

const tiers = [
  {
    title: 'Programa Starter',
    price: '0',
    description: [
      '15 vagas',
      'terças e quintas',
      '18h as 22h 30min',
      'Techpark Feevale',
    ],
    buttonText: 'Saiba mais',
    buttonVariant: 'outlined',
    link: 'https://growdev.com.br/starter',
  },
  {
    title: 'Programa Advanced',
    // subheader: 'Most popular',
    price: '15',
    description: [
      '15 vagas',
      'segundas e quartas',
      '18h as 22h 30min',
      'Techpark Feevale',
    ],
    buttonText: 'Saiba mais',
    buttonVariant: 'contained',
  },
  {
    title: 'Machine learning',
    price: '30',
    description: [
      '10 vagas',
      'quartas e sextas',
      '18h as 22h 30min',
      'Techpark Feevale',
    ],
    buttonText: 'Saiba mais',
    buttonVariant: 'outlined',
  },
];

export default function Pricing() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [growdevers, setGrowdevers] = useState([]);
  // const uid = localStorage.getItem('userUid');

  async function handleDeleteGrowdevers(uid) {
    await api
      .delete(`/growdevers/${uid}`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        // },
      })
      .then(() => {
        setGrowdevers(growdevers.filter((growdever) => growdever.uid !== uid));
      })
      .catch(() => console.log('Erro ao deletar aluno!'));
  }

  useEffect(() => {
    api
      .get(`/growdevers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => setGrowdevers(response.data.growdever))

      .catch((error) => alert('Error ao buscar alunos cadastrados.'));
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
            style={{ color: '#ffffff' }}
          >
            Grow<span style={{ color: '#e16e0e' }}>dev</span>
          </Typography>
          <nav>
            <Link
              color="textPrimary"
              href="/admin-class"
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
              Cadastrar Cursos
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
      <Container maxWidth="md" component="main" style={{ marginTop: '5em' }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                  style={{ backgroundColor: '#2b385b', color: '#ffffff' }}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button2
                    fullWidth
                    variant={tier.buttonVariant}
                    style={{
                      backgroundColor: '#e16e0e',
                      color: '#ffffff',
                      border: 'solid 2px #e16e0e',
                    }}
                  >
                    {tier.buttonText}
                  </Button2>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Container
          maxWidth="xl"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ color: '#2b385b', fontWeight: '700' }}
          >
            <h1>Growdevers</h1>
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
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Programa</th>
                  </tr>
                </thead>

                <tbody>
                  {growdevers.map((growdever) => (
                    <React.Fragment key={growdever.uid}>
                      <tr style={{ color: '#2b385b', marginTop: '1em' }}>
                        <td>{growdever.name}</td>
                        <td>{growdever.email}</td>
                        <td>{growdever.phone}</td>
                        <td>{growdever.program}</td>
                        {/* <td>{`${classe.watched ? 'Sim' : 'Não'}`}</td> */}
                        <td>
                          <span>
                            <Button2
                              style={{ width: '100px' }}
                              onClick={() =>
                                handleDeleteGrowdevers(growdever.uid)
                              }
                            >
                              Excluir
                            </Button2>
                          </span>
                        </td>
                        <td>
                          <span>
                            <Button2
                              style={{ width: '100px' }}
                              // onClick={() =>
                              //   handleDeleteGrowdevers(growdever.uid)
                              // }
                            >
                              Editar
                            </Button2>
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

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

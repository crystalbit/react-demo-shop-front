import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../Api';

const useStyles = makeStyles(theme => ({
  inner: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    width: 400
  },
  buttonLogin: {
    marginTop: 20
  }
}));

export default function LoginTab(props) {
  const classes = useStyles();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('Unknown error');
  const [ showErrorMessage, toggleErrorMessage ] = useState(false);

  if (props.loginItem.auth === true) return (
    <Paper className={classes.paper}>
      <div className={classes.inner}>
        Hi, {props.loginItem.client.name}! You are logged in.
      </div>
    </Paper>
  );

  return (
    <Paper className={classes.paper}>
      <div className={classes.inner}>
        <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={() => toggleErrorMessage(false)}>
          <Alert onClose={() => toggleErrorMessage(false)} severity="error" elevation={6} variant="filled">
            {errorMessage}
          </Alert>
        </Snackbar>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="email"
              label="email"
              type="email"
              fullWidth
              autoFocus
              required
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="password"
              label="password"
              type="password"
              fullWidth
              required
              onChange={event => setPassword(event.target.value)}
              value={password}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonLogin}
            onClick={() => Api.login(email, password).then(loginData => {
              if (loginData.auth) {
                props.updateLoginItem(loginData);
              } else {
                setErrorMessage('Wrong password');
                toggleErrorMessage(true);
              }
            })}
          >
            Login
          </Button>
        </Grid>
      </div>
    </Paper>
  );
}

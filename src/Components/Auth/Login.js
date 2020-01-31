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
    maxWidth: 400
  },
  buttonLogin: {
    marginTop: 20
  }
}));

export default function(props) {
  const classes = useStyles();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('Unknown error');
  const [ showErrorMessage, toggleErrorMessage ] = useState(false);

  return (
    <Paper className={classes.paper}>
      <div className={classes.inner}>
        Login
        <Snackbar open={showErrorMessage} autoHideDuration={6000} onClose={() => toggleErrorMessage(false)}>
          <Alert onClose={() => toggleErrorMessage(false)} severity="error" elevation={6} variant="filled">
            {errorMessage}
          </Alert>
        </Snackbar>
        <TextField
          id="loginEmail"
          label="Email"
          type="email"
          fullWidth
          autoFocus
          required
          onChange={event => setEmail(event.target.value)}
          value={email}
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="loginPassword"
          label="Password"
          type="password"
          fullWidth
          required
          onChange={event => setPassword(event.target.value)}
          value={password}
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
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

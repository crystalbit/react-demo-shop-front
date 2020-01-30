import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../Api';
import ClientForm from '../Shared/ClientForm';
import validatePassword from '../../Helpers/validatePassword';

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
  const [ newClient, setNewClient ] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [ password, setPassword ] = useState('');
  const [ validationData, setValidationData ] = useState({});
  const [ validationDataPassword, setValidationDataPassword ] = useState(true); // not to show in red at startup
  const [ errorMessage, setErrorMessage ] = useState('Unknown error');
  const [ showErrorMessage, toggleErrorMessage ] = useState(false);

  const setAndValidatePassword = password => {
    setPassword(password);
    setValidationDataPassword(validatePassword(password));
  }

  const register = () => {
    if (
      validationData.name
      || validationData.address
      || validationData.phone
      || validationData.email
      || !validationDataPassword
      || (!validationData.name && !newClient.name /* not init-ed */)
    ) {
      setErrorMessage('Please, fill in the form with correct data');
      toggleErrorMessage(true);
      return;
    }

    Api.register(newClient, password).then(loginData => {
      if (loginData.auth) {
        props.updateLoginItem(loginData);
      } else {
        let mistake = validationData.name || validationData.address || validationData.email ||
              validationData.phone || validationData.password || 'Registration error';
        if (!password) mistake = 'Please, fill in your password';
        setErrorMessage(mistake);
        toggleErrorMessage(true);
      }
    });
  }

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
            <ClientForm
              client={newClient}
              setClient={setNewClient}
              validationData={validationData}
              setValidationData={setValidationData}
            />
            <TextField
              id="password"
              label="New password"
              required
              fullWidth
              error={!validationDataPassword}
              helperText={!validationDataPassword ? 'Select password to be 6 to 16 English/Russian symbols, digits and that stuff: @#$%^&*' : null}
              InputProps={{
                value: password,
                onChange: event => setAndValidatePassword(event.target.value)
              }}
              style={{ margin: 8 }}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonLogin}
            onClick={register}
          >
            Register
          </Button>
        </Grid>
      </div>
    </Paper>
  );
}

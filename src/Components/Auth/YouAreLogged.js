import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  inner: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    maxWidth: 600,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5
  }
}));

export default function(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.inner}>
        {props.loginItem.auth === null ? (
          <React.Fragment>
            Loading...
          </React.Fragment>
        ) : (
          <React.Fragment>
            Hi, {props.loginItem.client.name}! You are logged in.
          </React.Fragment>
        )}
      </div>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to={{ pathname: '/' }}
        className={classes.button}
      >
        Main page
      </Button>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/checkout"
        className={classes.button}
      >
        Cart
      </Button>
    </Paper>
  );
}
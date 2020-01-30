import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

export default function(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.inner}>
        Hi, {props.loginItem.client.name}! You are logged in.
      </div>
    </Paper>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexWrap:'wrap'
  },
  item: {
    display: 'flex'
  }
}));

export default function(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2} className={classes.root}>
          <Grid item key={0} className={classes.item}>
            <Login
              loginItem={props.loginItem}
              updateLoginItem={props.updateLoginItem}
            />
          </Grid>
          <Grid item key={1} className={classes.item}>
            <Register
              updateLoginItem={props.updateLoginItem}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

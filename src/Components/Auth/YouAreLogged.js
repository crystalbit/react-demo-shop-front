import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Api from '../../Api';
import OrderList from '../Orders/List';

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

  const [ orders, setOrders ] = useState(null);

  useEffect(() => {
    Api.orders().then(setOrders);
  }, [props.loginItem.auth]);

  return (
    <React.Fragment>
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
          //component={Link}
          //to="/"
          onClick={() => window.location = ('/')}
          className={classes.button}
        >
          Main page
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => window.location = ('/checkout')}
          className={classes.button}
        >
          Cart
        </Button>
      </Paper>
      <div>
        <OrderList
          orders={orders}
        />
      </div>
    </React.Fragment>
    
  );
}
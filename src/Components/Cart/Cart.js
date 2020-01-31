import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element';
import Checkout from './Checkout';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import getSubtotal from '../../Helpers/getSubtotal';

const useStyles = makeStyles(theme => ({
  emptyCart: {
    flexGrow: 1,
    height: 150,
    padding: 20,
    marginLeft: 8
  }
}));

export default function(props) {
  const classes = useStyles();

  return(
    <React.Fragment>
      <Grid container spacing={2} justify="space-around">
        <Grid item xs={12} sm={6}>
          {props.cart && !getSubtotal(props.cart) ? (
            <Paper className={classes.emptyCart}>
              Cart is empty
            </Paper>
          ) : ''}
          {props.cart ? Object.keys(props.cart).map(id => props.cart[id] && props.cart[id].quantity > 0 ? (
            <Element
              key={id}
              id={id}
              quantity={props.cart[id] ? props.cart[id].quantity : 0}
              name={props.cart[id] ? props.cart[id].name : 'product not exists'}
              price={props.cart[id] ? props.cart[id].price : 0}
              image={props.cart[id] ? props.cart[id].image : 0}
              onMore={id => props.onSetCart({
                ...props.cart,
                [id]: {
                  id: id,
                  quantity: props.cart[id] ? props.cart[id].quantity + 1 : 1,
                  name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                  price: props.productsById[id] ? props.productsById[id].price : 0,
                  image: props.productsById[id] ? props.productsById[id].image : '',
                }
              })}
              onLess={id => props.onSetCart({
                ...props.cart,
                [id]: {
                  id: id,
                  quantity: props.cart[id] ? props.cart[id].quantity - 1 : 0,
                  name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                  price: props.productsById[id] ? props.productsById[id].price : 0,
                  image: props.productsById[id] ? props.productsById[id].image : '',
                }
              })}
              onDelete={id => props.onSetCart({
                ...props.cart,
                [id]: {
                  id: id,
                  quantity: 0,
                  name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                  price: props.productsById[id] ? props.productsById[id].price : 0,
                  image: props.productsById[id] ? props.productsById[id].image : '',
                }
              })}
            />) : ''
          ) : ''}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Checkout
            cart={props.cart}
            onClearCart={() => props.onSetCart({})}
            client={props.client}
            setClient={props.setClient}
            loginItem={props.loginItem}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

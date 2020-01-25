import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element';
import Checkout from './Checkout';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({

}));

export default function(props) {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Grid container spacing={2} justify="space-around">
                <Grid item xs={12} sm={6} className={classes.leftItem}>
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
                                    quantity: props.cart[id] ? props.cart[id].quantity + 1 : 1,
                                    name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                                    price: props.productsById[id] ? props.productsById[id].price : 0,
                                    image: props.productsById[id] ? props.productsById[id].image : '',
                                }
                            })}
                            onLess={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: props.cart[id] ? props.cart[id].quantity - 1 : 0,
                                    name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                                    price: props.productsById[id] ? props.productsById[id].price : 0,
                                    image: props.productsById[id] ? props.productsById[id].image : '',
                                }
                            })}
                            onDelete={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: 0,
                                    name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                                    price: props.productsById[id] ? props.productsById[id].price : 0,
                                    image: props.productsById[id] ? props.productsById[id].image : '',
                                }
                            })}
                        />) : ''
                    ) : ''}
                </Grid>
                <Grid item sm={12} md={6}>
                    <Checkout />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
import CartThumbnail from './Cart/Thumbnail';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    center: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: 400
    },
    grid: {
        display: 'flex',
    }
}));

function ProductList(props) {
    const classes = useStyles();



    if (props.error) return (
        <div className={classes.center}>
            <Chip
                icon={<AutorenewIcon />}
                label="Error retrieving data. Click to retry"
                clickable
                onClick={props.update}
                color="primary"
            />
        </div>
    );

    if (props.loading) return (
        <div className={classes.center}>
            <CircularProgress />
        </div>
    );

    let cartSum = 0;
    for (let i of Object.keys(props.cart)) {
        cartSum = cartSum + (props.productsById[i] ? props.productsById[i].price : 0) * (props.cart[i] ? props.cart[i].quantity : 0);
    }

    return(
        <React.Fragment>
            {cartSum ? <CartThumbnail
                sum={cartSum}
            /> : ''}
            <Grid container justify="center" spacing={2}>
                {props.products.map(product => (
                    <Grid item key={product.code} className={classes.grid}>
                        <Product 
                            product={product}
                            quantity={props.cart[product.id] ? props.cart[product.id].quantity : 0}
                            onAdd={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: props.cart[id] ? props.cart[id].quantity + 1 : 1,
                                    name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                                    price: props.productsById[id] ? props.productsById[id].price : 0,
                                    image: props.productsById[id] ? props.productsById[id].image : '',
                                }
                            })}
                            onClear={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: 0,
                                    name: props.productsById[id] ? props.productsById[id].name : 'product not exists',
                                    price: props.productsById[id] ? props.productsById[id].price : 0,
                                    image: props.productsById[id] ? props.productsById[id].image : '',
                                }
                            })}
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}

export default ProductList;
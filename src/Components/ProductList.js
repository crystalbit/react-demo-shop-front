import React, { useState, useEffect } from 'react';
import api from '../Api';
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

    const [ error, setError ] = useState(false);
    const [ products, setProducts ] = useState([]);
    const [ productsById, setProductsById ] = useState([]);
    const [ updates, invokeUpdate ] = useState(0);

    useEffect(() => {
        api.getProducts()
        .then(products => {
            if (!products) {
                setError(true);
            } else {
                setError(false);
                props.onLoadingChange(false);
                setProducts(products);
                let productsObject = {};
                products.forEach(product => {
                    productsObject[product.id] = product;
                })
                setProductsById(productsObject);
            }
        })
        .catch(() => setError(true));
    }, [props, updates]);

    if (error) return (
        <div className={classes.center}>
            <Chip
                icon={<AutorenewIcon />}
                label="Error retrieving data. Click to retry"
                clickable
                onClick={() => invokeUpdate(updates + 1)}
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
        cartSum = cartSum + (productsById[i] ? productsById[i].price : 0) * (props.cart[i] ? props.cart[i].price : 0);
    }

    return(
        <React.Fragment>
            {cartSum ? <CartThumbnail
                sum={cartSum}
            /> : ''}
            <Grid container justify="center" spacing={2}>
                {products.map(product => (
                    <Grid item key={product.code} className={classes.grid}>
                        <Product 
                            product={product}
                            quantity={props.cart[product.id] ? props.cart[product.id].quantity : 0}
                            onAdd={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: props.cart[id] ? props.cart[id].quantity + 1 : 1,
                                    name: productsById[id] ? productsById[id].name : 'product not exists',
                                    price: productsById[id] ? productsById[id].price : 0,
                                    image: productsById[id] ? productsById[id].image : '',
                                }
                            })}
                            onClear={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: 0,
                                    name: productsById[id] ? productsById[id].name : 'product not exists',
                                    price: productsById[id] ? productsById[id].price : 0,
                                    image: productsById[id] ? productsById[id].image : '',
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
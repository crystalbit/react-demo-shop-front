import React, { useState, useEffect } from 'react';
import api from '../Api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    center: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: 400
    }
}));

function ProductList(props) {
    const classes = useStyles();

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ products, setProducts ] = useState([]);
    const [ updates, invokeUpdate ] = useState(0);


    useEffect(() => {
        api.getProducts()
        .then(products => {
            if (!products) {
                setError(true);
            } else {
                setLoading(false);
                setProducts(products);
            }
        })
        .catch(() => setError(true));
    }, [updates]);

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

    if (loading) return (
        <div className={classes.center}>
            <CircularProgress />
        </div>
    );

    return(
        <Grid container justify="center" spacing={2}>
            {products.map(product => (
                <Grid item key={product.code}>
                    <Product 
                        product={product}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
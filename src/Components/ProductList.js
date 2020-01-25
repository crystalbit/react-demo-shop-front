import React, { useState, useEffect } from 'react';
import api from '../Api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import Product from './Product';
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

    return(
        <Grid container justify="center" spacing={2}>
            {products.map(product => (
                <Grid item key={product.code} className={classes.grid}>
                    <Product 
                        product={product}
                        
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
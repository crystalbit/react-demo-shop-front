import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({

}));

export default function(props) {
    const classes = useStyles();



    return(
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    {props.cart ? Object.keys(props.cart).map(id => (
                        <Element
                            id={id}
                            quantity={props.cart[id] ? props.cart[id].quantity : 0}
                            name={props.cart[id] ? props.cart[id].name : 'product not exists'}
                            price={props.cart[id] ? props.cart[id].price : 0}
                            image={props.cart[id] ? props.cart[id].image : 0}
                            /* onAdd={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: props.cart[id] ? props.cart[id].quantity + 1 : 1,
                                    name: productsById[id] ? productsById[id].name : 'product not exists',
                                    price: productsById[id] ? productsById[id].price : 0,
                                    image: productsById[id] ? productsById[id].image : '',
                                }
                            })}
                            onDelete={id => props.onSetCart({
                                ...props.cart,
                                [id]: {
                                    quantity: props.cart[id] ? props.cart[id].quantity - 1 : 0,
                                    name: productsById[id] ? productsById[id].name : 'product not exists',
                                    price: productsById[id] ? productsById[id].price : 0,
                                    image: productsById[id] ? productsById[id].image : '',
                                }
                            })} */
                        />)
                    ) : ''}
                </Grid>
                <Grid item sm={12} md={6}>
                    total
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

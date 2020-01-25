import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element';

const useStyles = makeStyles(theme => ({

}));

export default function(props) {
    const classes = useStyles();



    return(
        <React.Fragment>
            {props.cart ? Object.keys(props.cart).map(id => <Element
                                         quantity={props.cart[id] ? props.cart[id].quantity : 0}
                                         name={props.cart[id] ? props.cart[id].name : 'product not exists'}
                                         price={props.cart[id] ? props.cart[id].price : 0}
                                       />) : ''}
        </React.Fragment>
    );
}

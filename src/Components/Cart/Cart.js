import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element';

const useStyles = makeStyles(theme => ({

}));

export default function(props) {
    const classes = useStyles();



    return(
        <React.Fragment>
            {props.cart ? Object.keys(props.cart).map(element => <Element
                                         quantity={1}
                                       />) : ''}
        </React.Fragment>
    );
}

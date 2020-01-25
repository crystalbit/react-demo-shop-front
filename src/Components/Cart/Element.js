import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

export default function(props) {
    const classes = useStyles();

    return(
        <React.Fragment>
            {props.quantity || -1}
        </React.Fragment>
    );
}

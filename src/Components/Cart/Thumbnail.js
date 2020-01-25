import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    rootChip: {
        position: 'fixed',
        right: 30,
        zIndex: 100,
        [theme.breakpoints.down('xs')]: {
            bottom: 30
        }
    }
}));

export default function(props) {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Box component={Link} to="/checkout">
                <Chip
                    className={classes.rootChip}
                    icon={<ShoppingCartIcon />}
                    label={'$' + (props.sum || 0).toFixed(2)}
                    clickable
                    color="primary"
                />
            </Box>
        </React.Fragment>
    );
}

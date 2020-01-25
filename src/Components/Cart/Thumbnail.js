import React from 'react';
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
        },
        [theme.breakpoints.down('sm')]: {

        }
    },
    rootBottom: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 101,
        borderTop: 1,
        borderTopStyle: 'solid',
        borderColor: 'black'
    }
}));

export default function(props) {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Box component="div" display={{ xs: 'block', sm: 'block' }}>
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

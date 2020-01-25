import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { BottomNavigation, BottomNavigationAction, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    rootChip: {
        position: 'fixed',
        right: 30,
        zIndex: 100
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
            <Box component="div" display={{ xs: 'block', sm: 'none' }}>
                <BottomNavigation
                    value={0}
                    showLabels
                    className={classes.rootBottom}
                >
                    <BottomNavigationAction label={'$' + (props.sum || 0).toFixed(2)} icon={<ShoppingCartIcon />} />
                </BottomNavigation>
            </Box>
            <Box component="div" display={{ xs: 'none', sm: 'block' }}>
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

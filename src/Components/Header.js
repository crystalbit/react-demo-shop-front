import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import logo from '../images/ninja.gif';

const useStyles = makeStyles(theme => ({
    root: {
      marginBottom: 20,
      marginRight: -10
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    logo: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginTop: 10,
      marginBottom: 10
    },
}));

export default function(props) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Avatar alt="Circle Pizza Logo" src={logo} className={classes.logo} />
                    <Typography variant="h6">
                        Ninja Pizza!
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

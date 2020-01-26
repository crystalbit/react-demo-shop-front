import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: 20,
      marginRight: -10
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    rightQuote: {
      textAlign: 'right',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 25
    },
    leftQuote: {
      textAlign: 'left',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 25
    }
}));

export default function(props) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.leftQuote}>
                        “May the Pizza be with you.” Star Wars, 1977
                    </Typography>
                    {/* <Avatar alt="Pizza!" src={ninja} className={classes.large} /> */}
                    <Typography className={classes.rightQuote}>
                        “I'm going to make you a pizza you can't refuse.” The Godfather, 1972 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

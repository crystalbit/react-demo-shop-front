import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import config from '../../config';
import path from 'path';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        //flexDirection: 'column',
        //justifyContent: 'space-between'
        alignItems: 'center'
    },
    name: {
        marginLeft: 5
    },
    controls: {
        textAlign: 'right'
    },
    // details: {
    //     display: 'flex',
        
    // },
    cover: {
        width: 280 / 2,
        height: 100,
        display: 'flex'
    },
    content: {
        display: 'flex',
        flex: '1 0 auto',
    },
    btngroup: {
        marginLeft: 10
    }
}));

export default function(props) {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Box mb={2} px={2}>
                <Paper className={classes.card} style={{width: '100%'}}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <CardMedia
                                className={classes.cover}
                                image={path.join(config.directories.images, props.image)}
                                title={props.name || ''}
                            />
                        </Grid>
                    
                        <Grid item>
                            <Typography component="h5" variant="h5" className={classes.name}>
                                {props.name}
                            </Typography>
                        </Grid>
                    
                        <Grid item className={classes.controls}>
                            <Typography component="h5" variant="h5">
                                {props.quantity}
                                <ButtonGroup className={classes.btngroup}>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                        //setCount(Math.max(count - 1, 0));
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        aria-label="increase"
                                        onClick={() => {
                                        //setCount(count + 1);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.quantity} x ${props.price} = ${(props.quantity * props.price).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    );
}

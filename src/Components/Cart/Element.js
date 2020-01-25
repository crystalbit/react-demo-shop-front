import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import config from '../../config';
import path from 'path';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 5
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 90,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
}));

export default function(props) {
    const classes = useStyles();

    return (
   <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt={props.name} src={path.join(config.directories.images, props.image)} />
            </div>
            <div>
                <ButtonGroup className={classes.btngroup}>
                    <Button
                        aria-label="reduce"
                        onClick={() => props.onLess(props.id)}
                    >
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                        aria-label="increase"
                        onClick={() => props.onMore(props.id)}
                    >
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup>
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                    {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {props.quantity} x ${props.price} = ${(props.quantity * props.price).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">

                </Typography>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => props.onDelete(props.id)}>
                  Remove
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                ${(props.quantity * props.price).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    );

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
                            <Typography variant="h6" color="textPrimary" className={classes.pricing}>
                                {props.quantity} x ${props.price} = ${(props.quantity * props.price).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </React.Fragment>
    );
}

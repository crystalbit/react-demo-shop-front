import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import config from '../../config';
import path from 'path';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      marginBottom: 5,
      marginLeft: 8
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto'
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
    }
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
}

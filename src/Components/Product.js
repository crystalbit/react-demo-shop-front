import React/*, { useState, useEffect }*/ from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import config from '../config';
import path from 'path';

const useStyles = makeStyles(theme => ({
  card: {
    width: 280,
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  content: {
    flex: 1
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '12px'
  },
  actionsTypography: {
    marginBottom: '5px'
  }
}));

function Product(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.product.name}
        subheader={props.product.subheader ? '🌠' + props.product.subheader + ' 🌠' : '🍕'}
      />
      <CardMedia
        className={classes.media}
        image={path.join(config.directories.images, props.product.image || '')}
        title={props.product.name}
      />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <Typography variant="h5" className={classes.actionsTypography} color="textPrimary" component="p">
          ${props.product.price}
        </Typography>
        <Badge badgeContent={props.quantity} color="secondary">
          <Chip
            mr={4}
            icon={<ShoppingCartIcon />}
            label="Add to cart"
            clickable
            color="primary"
            onClick={() => props.onAdd(props.product.id)}
            onDelete={props.quantity ? () => props.onClear(props.product.id) : null}
          />
        </Badge>
      </CardActions>
    </Card>
  );
}

export default Product;

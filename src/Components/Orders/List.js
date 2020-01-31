import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import moment from 'moment';
import path from 'path';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    disply: 'block'
  },
  inner: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    minWidth: 400,
    textAlign: 'center'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

export default function(props) {
  const classes = useStyles();
  console.log(props.orders)

  const [ opened, setOpened ] = useState(0);

  if (!props.orders) return '';

  return (
<Paper className={classes.paper}>
  <div className={classes.inner}>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Your orders
        </ListSubheader>
      }
      className={classes.root}
    >
      {props.orders.map(order => (
        <React.Fragment key={order.id}>
          <ListItem
            button
            onClick={() => order.id === opened ? setOpened(-1) : setOpened(order.id)}
            key={order.id * 1000}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={moment(order.createdAt).format('LLL') + ' $' + (
              (parseFloat(order.delivery_cost) || 0) + order.products.map(it => it.price * it.quantity)
                                                                     .reduce((a, b) => a + b)
            )} />
            {opened === order.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={opened === order.id} timeout="auto" unmountOnExit key={order.id}>
            {order.products.map(product => (
              <List component="div" disablePadding key={order.id * 10000 + product.id}>
                <ListItem button className={classes.nested}>
                  <ListItemAvatar>
                    <Avatar alt={product.name} src={path.join(config.directories.images, product.image)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={'$' + product.price + ' x ' + product.quantity}
                  />
                </ListItem>
              </List>
            ))}
            {parseFloat(order.delivery_cost) !== 0 && (
              <List component="div" disablePadding key="delivery">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Delivery"
                    secondary={'$' + order.delivery_cost}
                  />
                </ListItem>
              </List>
            )}
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    </div>
    </Paper>
    );
}
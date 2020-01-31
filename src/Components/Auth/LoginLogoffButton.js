import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Api from '../../Api';

export default function(props) {
  if (props.loginItem.auth === null) return (
    <div>...</div>
  );
  // if logged show logoff
  if (props.loginItem.auth === true) return (
    <div>
      <Chip label={'Hi, ' + props.loginItem.client.name} size="small" />
      <Chip
        label="Orders"
        size="small"
        component={Link}
        color="secondary"
        clickable
        to="/login"
      />
      <Button
        color={props.color || 'inherit'}
        onClick={() => Api.logout().then(props.updateLoginItem)}
      >
        Logoff
      </Button>
    </div>
  );

  return (
    <Button
      component={Link}
      variant={props.variant || ''}
      to="/login"
      color={props.color || 'inherit'}
    >
      Login
    </Button>
  );
}
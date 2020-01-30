import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Api from '../Api';

export default function(props) {
    // if logged show logoff
    if (props.loginItem.auth === true) return (
        <div>
            <Chip label={'Hi, ' + props.loginItem.client.name} />
            <Button
                color="inherit"
                onClick={() => Api.logout().then(props.updateLoginItem)}
            >
                Logoff
            </Button>
        </div>
    );

    return (
        <Button
            color="inherit"
            component={Link}
            to="/login"
        >
            Login
        </Button>
    );
}
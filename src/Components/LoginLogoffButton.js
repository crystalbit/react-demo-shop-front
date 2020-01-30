import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function(props) {
    // if logged show logoff
    if (props.loginItem.auth === true) return (
        <Button
            color="inherit"
            component={Link}
            to="/"
        >
            Logoff
        </Button>
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextMaskCustom from '../Shared/TextMaskCustom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import helpers from '../../Helpers';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: 20
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: '100%'
    },
    image: {
        width: 128,
        height: 90,
    },
    orderButton: {
        marginTop: 15
    },
    backButton: {
        marginTop: 25
    },
    costData: {
        textAlign: 'right'
    },
    divider: {
        marginTop: 10,
        marginBottom: 20
    },
    deliveryDisclaimer: {
        textAlign: 'right'
    }
}));

export default function(props) {
    const classes = useStyles();
    const [ client, setClient ] = helpers.useLocalStorage('client', {
        name: '',
        address: '',
        email: '',
        phone: ''
    });
    const [ mask, setMask ] = useState(client.phone || '(   )    -    ');

    let subtotal = 0;
    for (let id of Object.keys(props.cart)) {
        subtotal = subtotal + props.cart[id].price * props.cart[id].quantity;
    }
    const delivery = subtotal >= 50 ? 0 : 5;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.costData}>
                    <Typography variant="h5">
                        Subtotal: ${subtotal}
                    </Typography>
                    <Typography variant="h5">
                        Delivery: ${delivery}
                    </Typography>
                    <Typography variant="h3">
                        Total: ${subtotal + delivery}
                    </Typography>
                    {delivery ? (
                        <Typography variant="caption">
                            we offer free delivery for orders starting from $50
                        </Typography>
                    ) : ''}
                </div>
                <Divider variant="middle" className={classes.divider} />
                <form>
                    <TextField
                        id="name"
                        required
                        InputProps={{
                            value: client.name,
                            onChange: event => setClient({ ...client, name: event.target.value}),
                        }}
                        label="Name"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        id="address"
                        required
                        InputProps={{
                            value: client.address,
                            onChange: event => setClient({ ...client, address: event.target.value}),
                        }}
                        label="Delivery address"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <div>
                        <TextField
                            id="email"
                            InputProps={{
                                value: client.email,
                                onChange: event => setClient({ ...client, email: event.target.value}),
                            }}
                            label="Your email"
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            id="phone"
                            required
                            InputProps={{
                                inputComponent: TextMaskCustom,
                                value: mask,
                                onChange: event => {
                                    setMask(event.target.value);
                                    setClient({ ...client, phone: mask})
                                },
                            }}
                            label="Phone number"
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button
                            aria-label="Make an order"
                            onClick={() => alert('wassup')}
                            color="primary"
                            variant="outlined"
                            className={classes.orderButton}
                        >
                            Make an order
                        </Button>
                    </div>
                    <Button
                        aria-label="Go back"
                        color="primary"
                        variant="outlined"
                        component={Link}
                        to="/"
                        className={classes.backButton}
                    >
                        &lt;&lt; Back to the shop
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

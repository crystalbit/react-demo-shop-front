import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    }
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
inputRef: PropTypes.func.isRequired,
};

export default function(props) {
    const classes = useStyles();
    const [ mask, setMask ] = useState('(   )    -    ');

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form>
                    <TextField
                        id="name"
                        required
                        label="Name"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        id="address"
                        required
                        label="Delivery address"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <div>
                        <TextField
                            id="email"
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
                                onChange: event => setMask(event.target.value),
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
                </form>
            </Paper>
        </div>
    );
}

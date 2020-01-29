import React, { useState } from 'react';
import TextMaskCustom from './TextMaskCustom';
import TextField from '@material-ui/core/TextField';
import validateClient from '../../Helpers/validateClient';

export default function (props) {
  const [ mask, setMask ] = useState((props.client ? props.client.phone : null) || '+7 (   )    -    ');

  const setClient = param => {
    const validation = validateClient(param);
    props.setValidationData(validation);
    props.setClient(param);
  }

  return (
    <React.Fragment>
      <TextField
        id="name"
        required
        error={!!props.validationData ? props.validationData.name : false}
        helperText={props.validationData ? props.validationData.name : null || null}
        InputProps={{
          value: props.client && props.client.name,
          onChange: event => setClient({ ...props.client, name: event.target.value})
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
        error={!!props.validationData.address}
        helperText={props.validationData.address || null}
        InputProps={{
          value: props.client && props.client.address,
          onChange: event => setClient({ ...props.client, address: event.target.value}),
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
          error={!!props.validationData.email}
          helperText={props.validationData.email || null}
          InputProps={{
            value: props.client && props.client.email,
            onChange: event => setClient({ ...props.client, email: event.target.value}),
          }}
          label="Your email"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="phone"
          required
          error={!!props.validationData.phone}
          helperText={props.validationData.phone || null}
          InputProps={{
            inputComponent: TextMaskCustom,
            value: mask,
            onChange: event => {
              setMask(event.target.value);
              setClient({ ...props.client, phone: event.target.value})
            },
          }}
          label="Phone number"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </div>
    </React.Fragment>
  );
}

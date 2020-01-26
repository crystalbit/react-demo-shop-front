import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import phoneMask from '../../Helpers/phoneMask';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={phoneMask}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default TextMaskCustom;

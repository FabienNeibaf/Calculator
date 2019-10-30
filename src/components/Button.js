import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, color = '#db8619', wide = false }) => (
  <button style={{ backgroundColor: color }} className={wide ? 'x2' : ''}>
    {name}
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  wide: PropTypes.bool,
};

export default Button;

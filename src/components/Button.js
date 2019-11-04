import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, color, wide }) => (
  <button style={{ backgroundColor: color }} className={wide ? 'x2' : ''}>
    {name}
  </button>
);

Button.defaultProps = {
  wide: false,
  color: '#db8619',
};

Button.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  wide: PropTypes.bool,
};

export default Button;

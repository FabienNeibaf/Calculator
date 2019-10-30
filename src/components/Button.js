import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name }) => (
  <button className={name === '0' ? 'zero' : ''}>{name}</button>
);

Button.propTypes = {
  name: PropTypes.string,
};

export default Button;

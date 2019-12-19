import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, type, clickHandler }) => {
  const handleClick = () => clickHandler(name);

  return (
    <button className={type} onClick={handleClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default Button;

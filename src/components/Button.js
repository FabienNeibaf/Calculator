import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, color, wide, clickHandler }) => {
  const handleClick = () => clickHandler(name);

  return (
    <button
      style={{ backgroundColor: color }}
      className={wide ? 'x2' : ''}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

Button.defaultProps = {
  wide: false,
  color: '#db8619',
};

Button.propTypes = {
  wide: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ step, result }) => (
  <h1 id="Display">
    <span>{step}</span>
    {result}
  </h1>
);

Display.defaultProps = {
  result: '0',
};

Display.propTypes = {
  step: PropTypes.string,
  result: PropTypes.string,
};

export default Display;

import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ step, result }) => (
  <h1 id="Display">
    <span>{step}</span>
    {result || 0}
  </h1>
);

Display.propTypes = {
  step: PropTypes.string,
  result: PropTypes.string,
};

export default Display;

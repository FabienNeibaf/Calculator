import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ expression, result }) => (
  <h1 id="Display">
    <span>{expression}</span>
    {result}
  </h1>
);

Display.defaultProps = {
  result: '0',
};

Display.propTypes = {
  expression: PropTypes.string,
  result: PropTypes.string,
};

export default Display;

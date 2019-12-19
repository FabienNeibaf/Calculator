import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ expression, result }) => (
  <div id="Display">
    <p>{expression}</p>
    <p>{result}</p>
  </div>
);

Display.defaultProps = {
  result: '0',
};

Display.propTypes = {
  expression: PropTypes.string,
  result: PropTypes.string,
};

export default Display;

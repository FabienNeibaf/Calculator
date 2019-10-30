import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ result = 0 }) => <h1>{result}</h1>;

Display.propTypes = {
  result: PropTypes.string,
};

export default Display;

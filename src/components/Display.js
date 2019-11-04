import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ result }) => <h1 id="Display">{result}</h1>;

Display.defaultProps = {
  result: '0',
};

Display.propTypes = {
  result: PropTypes.string,
};

export default Display;

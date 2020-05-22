import ChartsTemplate from './Charts.template';
import React from 'react';
import propTypes from 'prop-types';

const ChartsContainer = props => {
  return <ChartsTemplate {...props}></ChartsTemplate>;
};
ChartsContainer.propTypes = {};
ChartsContainer.defaultProps = {};

export default ChartsContainer;

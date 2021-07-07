import PropTypes from 'prop-types';
import raceType from './raceType';

const allRacesType = PropTypes.shape({
  nodes: PropTypes.arrayOf(raceType),
});

export default allRacesType;

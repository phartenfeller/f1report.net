import PropTypes from 'prop-types';
import driverType from './driverType';

const driverStandingsType = PropTypes.shape({
  points: PropTypes.number.isRequired,
  wins: PropTypes.string.isRequired,
  driverid: PropTypes.string.isRequired,
  driverByDriverid: driverType.isRequired,
});

export default driverStandingsType;

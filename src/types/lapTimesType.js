import PropTypes from 'prop-types';
import driverType from './driverType';

export default PropTypes.arrayOf(
  PropTypes.shape({
    driverByDriverid: driverType.isRequired,
    lap: PropTypes.string.isRequired,
    milliseconds: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired
);

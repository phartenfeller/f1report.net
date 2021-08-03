import PropTypes from 'prop-types';
import driverType from './driverType';

export default PropTypes.arrayOf(
  PropTypes.shape({
    nodeId: PropTypes.string,
    driverByDriverid: driverType.isRequired,
    lap: PropTypes.string.isRequired,
    milliseconds: PropTypes.string.isRequired,
    stop: PropTypes.string.isRequired,
  }).isRequired
);

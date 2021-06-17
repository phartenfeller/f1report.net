import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    driverByDriverid: PropTypes.shape({
      driverid: PropTypes.string.isRequired,
      driverDisplayName: PropTypes.string.isRequired,
    }).isRequired,
    lap: PropTypes.string.isRequired,
    milliseconds: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired
);

import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    avglaptimes: PropTypes.number.isRequired,
    driverid: PropTypes.string.isRequired,
    relevantLapCount: PropTypes.string.isRequired,
  }).isRequired
);

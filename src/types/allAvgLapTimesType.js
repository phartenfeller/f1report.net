import PropTypes from 'prop-types';

export default PropTypes.shape({
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      constructor_name: PropTypes.string.isRequired,
      driver_forename: PropTypes.string.isRequired,
      driver_surname: PropTypes.string.isRequired,
      driver_number: PropTypes.number,
      avg_lapTime_s: PropTypes.number,
      median_lapTime_s: PropTypes.number,
    })
  ),
});

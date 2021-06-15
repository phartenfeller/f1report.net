import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    constructor_name: PropTypes.string.isRequired,
    avg_lapTime_s: PropTypes.number,
    median_lapTime_s: PropTypes.number,
  })
);

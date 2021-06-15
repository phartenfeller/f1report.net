import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    lap: PropTypes.number.isRequired,
    driver_forename: PropTypes.string.isRequired,
    constructor_name: PropTypes.string.isRequired,
    driver_surname: PropTypes.string.isRequired,
    driver_name: PropTypes.string.isRequired,
    driver_number: PropTypes.number,
    position: PropTypes.number,
  })
);

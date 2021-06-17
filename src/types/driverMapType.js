import PropTypes from 'prop-types';

export default PropTypes.objectOf(
  PropTypes.shape({
    constructor: PropTypes.string.isRequired,
    forename: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })
);

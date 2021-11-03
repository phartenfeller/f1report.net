import PropTypes from 'prop-types';

export default PropTypes.shape({
  key: PropTypes.string.isRequired,
  json: PropTypes.string.isRequired,
}).isRequired;

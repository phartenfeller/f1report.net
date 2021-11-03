import PropTypes from 'prop-types';

export default PropTypes.shape({
  driverid: PropTypes.string.isRequired,
  points: PropTypes.string,
  poles: PropTypes.string,
  second: PropTypes.string,
  thirds: PropTypes.string,
  toptens: PropTypes.string,
  undertens: PropTypes.string,
  wins: PropTypes.string,
}).isRequired;

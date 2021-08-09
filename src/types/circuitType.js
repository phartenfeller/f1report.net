import PropTypes from 'prop-types';

export default PropTypes.shape({
  circuitid: PropTypes.number,
  circuitref: PropTypes.string,
  name: PropTypes.string,
  country: PropTypes.string,
  location: PropTypes.string,
  url: PropTypes.string,
  circuitstatByCircuitid: PropTypes.shape({
    firstrace: PropTypes.string,
    lastrace: PropTypes.string,
    racecount: PropTypes.string,
    racecountrank: PropTypes.string,
    mostconstructorpodiums: PropTypes.string,
    mostcostructorwins: PropTypes.string,
    mostdriverpodiums: PropTypes.string,
    mostdriverstarts: PropTypes.string,
    mostdriverwins: PropTypes.string,
  }).isRequired,
});

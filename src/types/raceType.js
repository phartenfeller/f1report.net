import PropTypes from 'prop-types';

const raceType = PropTypes.shape({
  circuitByCircuitid: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  raceid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
});

export default raceType;

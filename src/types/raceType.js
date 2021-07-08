import PropTypes from 'prop-types';

const raceType = PropTypes.shape({
  circuitByCircuitid: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }),
  date: PropTypes.string,
  raceid: PropTypes.string,
  name: PropTypes.string,
  round: PropTypes.string,
  year: PropTypes.string,
});

export default raceType;

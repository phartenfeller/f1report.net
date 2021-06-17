import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    avglaptimes: PropTypes.number.isRequired,
    relevantLapCount: PropTypes.string.isRequired,
    constructorTeamByConstructorid: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
);

import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    avglaptimes: PropTypes.number.isRequired,
    constructorTeamByConstructorid: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
);

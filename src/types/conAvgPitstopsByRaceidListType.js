import PropTypes from 'prop-types';
import constructorType from './constructorType';

export default PropTypes.arrayOf(
  PropTypes.shape({
    avglaptimes: PropTypes.number.isRequired,
    constructorTeamByConstructorid: constructorType,
  }).isRequired
);

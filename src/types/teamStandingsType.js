import PropTypes from 'prop-types';
import constructorType from './constructorType';

const teamStandingsType = PropTypes.shape({
  points: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  wins: PropTypes.string.isRequired,
  constructorid: PropTypes.string.isRequired,
  constructorTeamByConstructorid: constructorType.isRequired,
});

export default teamStandingsType;

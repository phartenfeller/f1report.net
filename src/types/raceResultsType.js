import PropTypes from 'prop-types';
import driverType from './driverType';

export default PropTypes.shape({
  constructorTeamByConstructorid: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  driverByDriverid: driverType,
  fastestlap: PropTypes.string,
  fastestlapspeed: PropTypes.string,
  fastestlaptime: PropTypes.string,
  grid: PropTypes.string,
  laps: PropTypes.string,
  number: PropTypes.string,
  points: PropTypes.number,
  position: PropTypes.string,
  resultid: PropTypes.string,
  statusByStatusid: PropTypes.shape({
    status: PropTypes.string,
  }),
  time: PropTypes.string,
});

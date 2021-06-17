import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    constructorTeamByConstructorid: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    driverByDriverid: PropTypes.shape({
      driverDisplayName: PropTypes.string.isRequired,
      driverid: PropTypes.string.isRequired,
      forename: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
    fastestlap: PropTypes.string.isRequired,
    fastestlapspeed: PropTypes.string.isRequired,
    fastestlaptime: PropTypes.string.isRequired,
    grid: PropTypes.string.isRequired,
    laps: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    position: PropTypes.string,
    resultid: PropTypes.string.isRequired,
    statusByStatusid: PropTypes.shape({
      status: PropTypes.string.isRequired,
    }).isRequired,
    time: PropTypes.string,
  })
);

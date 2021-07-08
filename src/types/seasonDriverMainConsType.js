import PropTypes from 'prop-types';
import constructorType from './constructorType';
import driverType from './driverType';

const seasonDriverMainConsType = PropTypes.shape({
  year: PropTypes.string,
  driverid: PropTypes.string,
  driverByDriverid: driverType,
  constructorTeamByConstructorid: constructorType,
});

export default seasonDriverMainConsType;

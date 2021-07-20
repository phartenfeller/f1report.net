import PropTypes from 'prop-types';
import React from 'react';
import { seasonDriverMainConsType } from '../../types';
import TeamDisplay from './teamDisplay';

const DriverTeamDisplay = ({ driverId, seasondrivermainconsByYearList }) => {
  const driverTeam = seasondrivermainconsByYearList.find(
    (e) => parseInt(e.driverid) === parseInt(driverId)
  );

  if (driverTeam?.constructorTeamByConstructorid?.name) {
    const teamName = driverTeam.constructorTeamByConstructorid.name;
    return <TeamDisplay teamName={teamName} />;
  }

  return <span>-</span>;
};

DriverTeamDisplay.propTypes = {
  driverId: PropTypes.string.isRequired,
  seasondrivermainconsByYearList: PropTypes.arrayOf(seasonDriverMainConsType)
    .isRequired,
};

export default DriverTeamDisplay;

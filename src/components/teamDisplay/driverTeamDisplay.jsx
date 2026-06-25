import React from 'react';
import TeamDisplay from './TeamDisplay';

const DriverTeamDisplay = ({ driverId, seasondrivermainconsByYearList }) => {
  const driverTeam = seasondrivermainconsByYearList.find(
    (e) => parseInt(e.driverId) === parseInt(driverId)
  );

  if (driverTeam?.teamName) { // changed from constructorTeamByConstructorid.name
    const teamName = driverTeam.teamName;
    return <TeamDisplay teamName={teamName} />;
  }
  // Check if original prop shape is used (nested object)
  if (driverTeam?.constructorTeamByConstructorid?.name) {
      const teamName = driverTeam.constructorTeamByConstructorid.name;
      return <TeamDisplay teamName={teamName} />;
  }

  return <span>-</span>;
};

export default DriverTeamDisplay;

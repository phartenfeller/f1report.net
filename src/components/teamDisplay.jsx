import PropTypes from 'prop-types';
import React from 'react';
import getTeamColor from '../util/f1TeamColors';

const TeamDisplay = ({ driverId, resultsByRaceidList }) => {
  const driverTeam = resultsByRaceidList.find(
    (e) => parseInt(e.driverid) === parseInt(driverId)
  );

  if (driverTeam?.constructorTeamByConstructorid?.name) {
    const teamName = driverTeam.constructorTeamByConstructorid.name;
    const color = getTeamColor(teamName);
    return (
      <div className="inline-flex items-center">
        <div
          className="h-4 w-4 rounded-full mr-2"
          style={{ background: color }}
        />
        <span>{teamName}</span>
      </div>
    );
  }

  return <span>-</span>;
};

TeamDisplay.propTypes = {
  driverId: PropTypes.string.isRequired,
  resultsByRaceidList: PropTypes.arrayOf(
    PropTypes.shape({
      driverid: PropTypes.string.isRequired,
      constructorTeamByConstructorid: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default TeamDisplay;

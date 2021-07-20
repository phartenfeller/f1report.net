import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { teamStandingsType } from '../../types';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

const TeamStandingsBar = ({ teamStandings }) => {
  const data = teamStandings.map((s) => ({
    points: s.points,
    constructor: s.constructorTeamByConstructorid.name,
    constructorid: s.constructorid,
    tooltip: `${s.constructorTeamByConstructorid.name}: ${s.points}`,
    color: getTeamColor(s.constructorTeamByConstructorid.name),
  }));

  function tooltip(obj) {
    return (
      <div className="inline-flex items-center bg-white px-3 py-1 rounded shadow-lg">
        <div
          className="rounded-full h-4 w-4 mr-2"
          style={{ background: obj.color }}
        />
        <span>{obj.data.tooltip}</span>
      </div>
    );
  }

  return (
    <div className="">
      <div className="" style={{ height: '600px' }}>
        <ResponsiveBar
          tooltip={tooltip}
          layout="horizontal"
          minValue={0}
          data={data}
          keys={['points']}
          indexBy="constructor"
          margin={{ top: 2, right: 130 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={getColor}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Seconds',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Constructors',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

TeamStandingsBar.propTypes = {
  teamStandings: PropTypes.arrayOf(teamStandingsType).isRequired,
};

export default TeamStandingsBar;

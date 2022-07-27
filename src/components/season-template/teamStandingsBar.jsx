import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { teamStandingsType } from '../../types';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

function getAria(obj) {
  return `${obj.data.constructor}: ${obj.data.points} points`;
}

const TeamStandingsBar = ({ teamStandings, year }) => {
  const data = teamStandings.map((s) => ({
    points: s.points,
    constructor: s.constructorTeamByConstructorid.name,
    constructorid: s.constructorid,
    tooltip: `${s.constructorTeamByConstructorid.name}: ${s.points}`,
    color: getTeamColor(s.constructorTeamByConstructorid.name),
  }));

  function tooltip(obj) {
    return (
      <div className="inline-flex items-center rounded bg-white px-3 py-1 shadow-lg">
        <div
          className="mr-2 h-4 w-4 rounded-full"
          style={{ background: obj.color }}
        />
        <span>{obj.data.tooltip}</span>
      </div>
    );
  }

  return (
    <div className="">
      <figure>
        <div className="" style={{ height: '600px' }}>
          <ResponsiveBar
            // eslint-disable-next-line react/jsx-no-bind
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
            role="application"
            ariaLabel={`${year} Constructor Standings`}
            barAriaLabel={getAria}
          />
        </div>
        <figcaption>{`${year} Constructor Standings`}</figcaption>
      </figure>
    </div>
  );
};

TeamStandingsBar.propTypes = {
  teamStandings: PropTypes.arrayOf(teamStandingsType).isRequired,
  year: PropTypes.string.isRequired,
};

export default TeamStandingsBar;

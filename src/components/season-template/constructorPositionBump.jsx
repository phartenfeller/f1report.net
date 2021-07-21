import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { raceType } from '../../types';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return obj.color;
}

function tooltip({ serie }) {
  return (
    <div className="inline-flex items-center bg-white px-3 py-1 rounded shadow-lg">
      <div
        className="rounded-full h-4 w-4 mr-2"
        style={{ background: serie.color }}
      />
      <span>{serie.id}</span>
    </div>
  );
}

const ConstructorPositionBump = ({ racesByYearList }) => {
  const data = [];
  for (let i = 0; i < racesByYearList.length; i += 1) {
    const race = racesByYearList[i];
    const { round, constructorstandingsByRaceidList } = race;

    // sometimes there race results where everybody has 0 pts. filter them out
    let pointsInRound = 0;
    for (let j = 0; j < race.constructorstandingsByRaceidList.length; j += 1) {
      pointsInRound += race.constructorstandingsByRaceidList[j].points;
    }

    if (pointsInRound !== 0) {
      for (let j = 0; j < constructorstandingsByRaceidList.length; j += 1) {
        const { position, constructorTeamByConstructorid } =
          constructorstandingsByRaceidList[j];
        const { name } = constructorTeamByConstructorid;

        const index = data.findIndex((teams) => teams.id === name);

        if (index === -1) {
          data.push({
            id: name,
            color: getTeamColor(name),
            data: [{ x: round, y: position }],
          });
        } else {
          data[index].data.push({
            x: round,
            y: position,
          });
        }
      }
    }
  }

  return (
    <div style={{ height: '600px' }}>
      <ResponsiveBump
        tooltip={tooltip}
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={getColor}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Position',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
      />
    </div>
  );
};

ConstructorPositionBump.propTypes = {
  racesByYearList: PropTypes.arrayOf(raceType).isRequired,
};

export default ConstructorPositionBump;

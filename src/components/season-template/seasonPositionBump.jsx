import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { raceType, seasonDriverMainConsType } from '../../types';
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

const SeasonPositionBump = ({
  racesByYearList,
  seasondrivermainconsByYearList,
}) => {
  const data = [];
  for (let i = 0; i < racesByYearList.length; i += 1) {
    const race = racesByYearList[i];
    const { round, driverstandingsByRaceidList } = race;

    // sometimes there race results where everybody has 0 pts. filter them out
    let pointsInRound = 0;
    for (let j = 0; j < race.driverstandingsByRaceidList.length; j += 1) {
      pointsInRound += race.driverstandingsByRaceidList[j].points;
    }

    if (pointsInRound !== 0) {
      for (let j = 0; j < driverstandingsByRaceidList.length; j += 1) {
        const { driverid, position } = driverstandingsByRaceidList[j];

        const driverInfo = seasondrivermainconsByYearList.find(
          (s) => s.driverid === driverid
        );

        const driver = driverInfo?.driverByDriverid?.driverDisplayName;
        const index = data.findIndex((drivers) => drivers.id === driver);

        if (index === -1) {
          const team = driverInfo?.constructorTeamByConstructorid?.name;

          data.push({
            id: driver,
            color: getTeamColor(team),
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
    <div style={{ height: '800px' }}>
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

SeasonPositionBump.propTypes = {
  racesByYearList: PropTypes.arrayOf(raceType).isRequired,
  seasondrivermainconsByYearList: PropTypes.arrayOf(seasonDriverMainConsType)
    .isRequired,
};

export default SeasonPositionBump;

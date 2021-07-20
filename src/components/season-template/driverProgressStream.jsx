import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import getTeamColor from '../../util/f1TeamColors';
import {
  raceType,
  seasonDriverMainConsType,
  driverStandingsType,
} from '../../types';

const DriverProgressStream = ({
  racesByYearList,
  seasondrivermainconsByYearList,
  driverstandingsByRaceidList,
}) => {
  // sorted by position
  const drivers = driverstandingsByRaceidList.map((s) => s.driverid);

  const map = {};
  const pointsInRound = {};

  for (let i = 0; i < racesByYearList.length; i += 1) {
    const race = racesByYearList[i];
    if (!map[race.round]) {
      map[race.round] = {};
      drivers.forEach((d) => {
        map[race.round][d] = 0;
      });
      pointsInRound[race.round] = 0;
      for (let j = 0; j < race.driverstandingsByRaceidList.length; j += 1) {
        pointsInRound[race.round] += race.driverstandingsByRaceidList[j].points;
      }
    }

    for (let j = 0; j < race.driverstandingsByRaceidList.length; j += 1) {
      const result = race.driverstandingsByRaceidList[j];
      if (result.points && typeof result.points === 'number') {
        const pctOfAllPoints = Math.round(
          (result.points / pointsInRound[race.round]) * 100
        );
        map[race.round][result.driverid] = pctOfAllPoints;
      }
    }
  }

  const data = [];
  Object.keys(map).forEach((round) => {
    if (Object.keys(map[round]).length > 0 && pointsInRound[round] > 0) {
      data.push(map[round]);
    }
  });

  function getColor({ index }) {
    const driverid = drivers[index];
    const info = seasondrivermainconsByYearList.find(
      (s) => s.driverid === driverid
    );

    return getTeamColor(info?.constructorTeamByConstructorid?.name);
  }

  function getDriverById({ id }) {
    const info = seasondrivermainconsByYearList.find((s) => s.driverid === id);
    return info?.driverByDriverid?.driverDisplayName;
  }

  return (
    <div style={{ height: '600px' }}>
      <ResponsiveStream
        data={data}
        keys={drivers}
        margin={{ top: 10, right: 110, bottom: 20, left: 5 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
        }}
        offsetType="silhouette"
        colors={getColor}
        fillOpacity={0.7}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [] }}
        legendLabel={getDriverById}
        tooltipLabel={getDriverById}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999999',
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
};

DriverProgressStream.propTypes = {
  racesByYearList: PropTypes.arrayOf(raceType).isRequired,
  driverstandingsByRaceidList:
    PropTypes.arrayOf(driverStandingsType).isRequired,
  seasondrivermainconsByYearList: PropTypes.arrayOf(seasonDriverMainConsType)
    .isRequired,
};

export default DriverProgressStream;

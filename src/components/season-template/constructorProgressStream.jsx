import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import getTeamColor from '../../util/f1TeamColors';
import { raceType, teamStandingsType } from '../../types';

const ConstructorProgressStream = ({ racesByYearList, teamStandings }) => {
  // sorted by position
  const teams = teamStandings.map((t) => t.constructorid);

  const map = {};
  const pointsInRound = {};

  for (let i = 0; i < racesByYearList.length; i += 1) {
    const race = racesByYearList[i];
    if (!map[race.round]) {
      map[race.round] = {};
      teams.forEach((t) => {
        map[race.round][t] = 0;
      });
      pointsInRound[race.round] = 0;
      for (
        let j = 0;
        j < race.constructorstandingsByRaceidList.length;
        j += 1
      ) {
        pointsInRound[race.round] +=
          race.constructorstandingsByRaceidList[j].points;
      }
    }

    for (let j = 0; j < race.constructorstandingsByRaceidList.length; j += 1) {
      const result = race.constructorstandingsByRaceidList[j];
      if (result.points && typeof result.points === 'number') {
        const pctOfAllPoints = Math.round(
          (result.points / pointsInRound[race.round]) * 100
        );
        map[race.round][result.constructorid] = pctOfAllPoints;
      }
    }
  }

  const data = [];
  Object.keys(map).forEach((round) => {
    if (Object.keys(map[round]).length > 0 && pointsInRound[round] > 0) {
      data.push(map[round]);
    }
  });

  function getColor({ id }) {
    const info = teamStandings.find((t) => t.constructorid === id);
    return getTeamColor(info?.constructorTeamByConstructorid?.name);
  }

  function getDriverById({ id }) {
    const info = teamStandings.find((t) => t.constructorid === id);
    return info?.constructorTeamByConstructorid?.name;
  }

  return (
    <div style={{ height: '600px' }}>
      <ResponsiveStream
        data={data}
        keys={teams}
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
        label={getDriverById}
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

ConstructorProgressStream.propTypes = {
  racesByYearList: PropTypes.arrayOf(raceType).isRequired,
  teamStandings: PropTypes.arrayOf(teamStandingsType).isRequired,
};

export default ConstructorProgressStream;

import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import getTeamColor from '../../util/f1TeamColors';

const DriverProgressStream = ({
  driverStandingsBySeason,
  seasondrivermainconsByYearList,
  currentStandings
}) => {
  // sorted by position from current standings
  const drivers = currentStandings.map((s) => s.driverId);

  const map = {};
  const pointsInRound = {};

  // driverStandingsBySeason is flat list: { raceId, round, driverId, points, ... }
  driverStandingsBySeason.forEach(stat => {
      const round = stat.round;
      if (!map[round]) {
          map[round] = {};
          drivers.forEach(d => map[round][d] = 0);
          pointsInRound[round] = 0;
      }
      // Sum points for the round (accumulate all drivers' points in that round)
      // wait, loop below calculates pointsInRound by iterating again.
      // We can just accumulate here.
  });
  
  // Need to populate map fully first
  Object.keys(map).forEach(round => {
      // Find all stats for this round
      const stats = driverStandingsBySeason.filter(s => s.round == round);
      let total = 0;
      stats.forEach(s => total += s.points);
      pointsInRound[round] = total;

       stats.forEach(s => {
           if (s.points && typeof s.points === 'number') {
              const pct = Math.round((s.points / total) * 100);
              map[round][s.driverId] = pct; 
           }
       });
  });

  const data = [];
  Object.keys(map).forEach((round) => {
    if (Object.keys(map[round]).length > 0 && pointsInRound[round] > 0) {
      data.push(map[round]);
    }
  });

  function getColor({ id }) {
    const info = seasondrivermainconsByYearList.find((s) => s.driverId === id);
    return getTeamColor(info?.teamName);
  }

  function getDriverById({ id }) {
    // We need driver displayName. 
    // We can find it in seasondrivermainconsByYearList or currentStandings
    const info = seasondrivermainconsByYearList.find((s) => s.driverId === id);
    return info?.driverDisplayName || id;
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

export default DriverProgressStream;

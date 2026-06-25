import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import getTeamColor from '../../util/f1TeamColors';

const ConstructorProgressStream = ({ constructorStandingsBySeason, currentStandings }) => {
  // sorted by position
  const teams = currentStandings.map((t) => t.constructorId);

  const map = {};
  const pointsInRound = {};

  constructorStandingsBySeason.forEach(stat => {
      const round = stat.round;
      if (!map[round]) {
          map[round] = {};
          teams.forEach(t => map[round][t] = 0);
      }
  });

  Object.keys(map).forEach(round => {
      const stats = constructorStandingsBySeason.filter(s => s.round == round);
      let total = 0;
      stats.forEach(s => total += s.points);
      pointsInRound[round] = total;

      stats.forEach(s => {
          if (s.points && typeof s.points === 'number' && pointsInRound[round] > 0) {
             const pct = Math.round((s.points / total) * 100);
             map[round][s.constructorId] = pct;
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
    const info = currentStandings.find((t) => t.constructorId === id);
    return getTeamColor(info?.name);
  }

  function getDriverById({ id }) {
    const info = currentStandings.find((t) => t.constructorId === id);
    return info?.name;
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

export default ConstructorProgressStream;

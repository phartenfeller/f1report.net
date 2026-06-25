import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return obj.color;
}

function tooltip({ serie }) {
  return (
    <div className="inline-flex items-center bg-white px-3 py-1 rounded shadow-lg text-black">
      <div
        className="rounded-full h-4 w-4 mr-2"
        style={{ background: serie.color }}
      />
      <span>{serie.id}</span>
    </div>
  );
}

const ConstructorPositionBump = ({ constructorStandingsBySeason }) => {
  const data = [];
  
  const rounds = [...new Set(constructorStandingsBySeason.map(s => s.round))].sort((a,b) => a-b);
  
  const pointsInRound = {};
  rounds.forEach(round => {
     const stats = constructorStandingsBySeason.filter(s => s.round == round);
     pointsInRound[round] = stats.reduce((acc, curr) => acc + curr.points, 0);
  });

  constructorStandingsBySeason.forEach(stat => {
      if (pointsInRound[stat.round] === 0) return;

      const teamName = stat.name;

      let series = data.find(d => d.id === teamName);
      if (!series) {
          series = {
              id: teamName,
              color: getTeamColor(teamName),
              data: []
          };
          data.push(series);
      }
      
      series.data.push({
          x: stat.round,
          y: stat.position
      });
  });

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

export default ConstructorPositionBump;

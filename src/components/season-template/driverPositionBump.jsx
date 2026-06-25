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

const DriverPositionBump = ({
  driverStandingsBySeason,
  seasondrivermainconsByYearList,
}) => {
  const data = [];
  
  // We need to group by driver
  // driverStandingsBySeason has all stats.
  // We want to construct series: { id: driverName, color, data: [{x: round, y: position}] }

  // First identify all drivers that have at least one valid result in a round where total points > 0
  // Iterate rounds
  const rounds = [...new Set(driverStandingsBySeason.map(s => s.round))].sort((a,b) => a-b);
  
  // Pre-calculate points per round to determine if we skip it (like in original code)
  const pointsInRound = {};
  rounds.forEach(round => {
     const stats = driverStandingsBySeason.filter(s => s.round == round);
     pointsInRound[round] = stats.reduce((acc, curr) => acc + curr.points, 0);
  });

  const processedDrivers = new Set();
  
  // Sort standings by round ensures we process in order? check.
  
  driverStandingsBySeason.forEach(stat => {
      if (pointsInRound[stat.round] === 0) return;

      const driverId = stat.driverId;
      const driverInfo = seasondrivermainconsByYearList.find(s => s.driverId === driverId);
      const driverName = driverInfo?.driverDisplayName || stat.driverDisplayName;
      const teamName = driverInfo?.teamName;

      let series = data.find(d => d.id === driverName);
      if (!series) {
          series = {
              id: driverName,
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

export default DriverPositionBump;

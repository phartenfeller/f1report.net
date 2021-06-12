import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import allLapTimesType from '../../types/allLapTimesType';
import getTeamColor from '../../util/f1TeamColors';

function getLaps(count, amount) {
  const laps = [1];
  const step = count / amount;

  for (let i = 1; i < amount; i += 1) {
    const last = laps[laps.length - 1];
    laps.push(last + step);
  }

  if (count % amount !== 0) {
    laps.push(count);
  }

  return laps.map((l) => Math.round(l));
}

function getCharData(arr, relevantLaps) {
  const drivers = [];

  const data = arr.reduce((prev, curr) => {
    if (!relevantLaps.includes(curr.lap)) return prev;
    if (!drivers.includes(curr.driver_name)) {
      drivers.push(curr.driver_name);
      const newObj = {
        id: curr.driver_name,
        constructor_name: curr.constructor_name,
        data: [
          {
            y: curr.position,
            x: curr.lap,
          },
        ],
      };
      prev.push(newObj);
    } else {
      const index = prev.findIndex((e) => e.id === curr.driver_name);
      prev[index].data.push({ y: curr.position, x: curr.lap });
    }
    return prev;
  }, []);

  // set last pos of retired drivers to null
  // otherwise e. g. first one crashes halfway -> chart still first because no data update
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].data.length < relevantLaps.length) {
      const nextLapEntry = relevantLaps[data[i].data.length];
      if (nextLapEntry) {
        data[i].data.push({
          y: null,
          x: nextLapEntry,
        });
      }
    }
  }

  return data;
}

function getColor(obj) {
  return getTeamColor(obj.constructor_name);
}

const PositionChart = ({ allLapTimes }) => {
  const laps = allLapTimes.nodes.map((l) => l.lap);
  const relevantLaps = getLaps(Math.max(...laps), 12);

  const data = getCharData(allLapTimes.nodes, relevantLaps);

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveBump
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

PositionChart.propTypes = {
  allLapTimes: allLapTimesType.isRequired,
};

export default PositionChart;

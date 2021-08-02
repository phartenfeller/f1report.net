import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import PropTypes from 'prop-types';
import { driverMapType, lapTimesType, raceResultsType } from '../../types';
import getTeamColor from '../../util/f1TeamColors';

function getLaps(count, amount) {
  let laps = [0, 1];
  const step = count / amount;

  for (let i = 1; i < amount; i += 1) {
    const last = laps[laps.length - 1];
    laps.push(last + step);
  }

  laps = laps.map((l) => Math.round(l));

  // add one before last lap for lapped drivers
  if (!laps.includes(count - 1)) {
    laps.push(count - 1);
  }

  // add last lap
  if (!laps.includes(count)) {
    laps.push(count);
  }

  return laps;
}

function getChartData(arr, relevantLaps, driverMap, resultsByRaceidList) {
  const drivers = [];
  const data = [];

  const highestGrid = Math.max(
    ...resultsByRaceidList.map((r) => parseInt(r.grid))
  );
  let boxStartIdx = highestGrid;

  // add starting position as lap 0
  resultsByRaceidList.forEach((res) => {
    drivers.push(res.driverByDriverid.driverDisplayName);

    const display = res.driverByDriverid.driverDisplayName;
    const { driverid } = res.driverByDriverid;
    let { grid } = res;

    if (parseInt(grid) === 0) {
      boxStartIdx += 1;
      grid = boxStartIdx;
    }

    data.push({
      id: display,
      constructor_name: driverMap[driverid].constructor,
      data: [{ y: parseInt(grid), x: 0 }],
    });
  });

  arr.forEach((curr) => {
    const { driverDisplayName } = curr.driverByDriverid;

    if (!relevantLaps.includes(parseInt(curr.lap))) return;

    const index = data.findIndex((e) => e.id === driverDisplayName);
    data[index].data.push({ y: curr.position, x: curr.lap });
  });

  // set last pos of retired drivers to null
  // otherwise e. g. first one crashes halfway -> chart still same pos because no data update
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

function tooltip(obj) {
  return (
    <div className="p-2 rounded shadow bg-white inline-flex items-center">
      <div
        className="rounded-full h-4 w-4 mr-2"
        style={{ background: obj.serie.color }}
      />
      <span>{`${obj.serie.id} (${obj.serie.constructor_name})`}</span>
    </div>
  );
}

const PositionChart = ({
  laptimesByRaceidList,
  driverMap,
  resultsByRaceidList,
}) => {
  const laps = laptimesByRaceidList.map((l) => l.lap);
  const relevantLaps = getLaps(Math.max(...laps), 12);

  const data = getChartData(
    laptimesByRaceidList,
    relevantLaps,
    driverMap,
    resultsByRaceidList
  );

  return (
    <div style={{ height: '500px' }}>
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

PositionChart.propTypes = {
  laptimesByRaceidList: lapTimesType.isRequired,
  driverMap: driverMapType.isRequired,
  resultsByRaceidList: PropTypes.arrayOf(raceResultsType).isRequired,
};

export default PositionChart;

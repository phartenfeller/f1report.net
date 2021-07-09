import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { driverMapType, lapTimesType } from '../../types';
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

function getChartData(arr, relevantLaps, driverMap) {
  const drivers = [];

  const data = arr.reduce((prev, curr) => {
    const { driverid, driverDisplayName } = curr.driverByDriverid;

    if (!relevantLaps.includes(parseInt(curr.lap))) return prev;
    if (!drivers.includes(driverid)) {
      drivers.push(driverid);
      const newObj = {
        id: driverDisplayName,
        constructor_name: driverMap[driverid].constructor,
        data: [
          {
            y: curr.position,
            x: curr.lap,
          },
        ],
      };
      prev.push(newObj);
    } else {
      const index = prev.findIndex((e) => e.id === driverDisplayName);
      prev[index].data.push({ y: curr.position, x: curr.lap });
    }
    return prev;
  }, []);

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

const PositionChart = ({ laptimesByRaceidList, driverMap }) => {
  const laps = laptimesByRaceidList.map((l) => l.lap);
  const relevantLaps = getLaps(Math.max(...laps), 12);

  const data = getChartData(laptimesByRaceidList, relevantLaps, driverMap);

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
};

export default PositionChart;

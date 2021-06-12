import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import allAvgLapTimesType from '../../types/allAvgLapTimesType';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  console.log({ obj });
  return getTeamColor(obj.data.constructor_name);
}

const AvgTimingsBar = ({ allAvgLapTimes, mode, desc, annotations }) => {
  const key = mode === 'avg' ? 'avg_lapTime_s' : 'median_lapTime_s';
  const data = allAvgLapTimes.nodes.sort((a, b) => a[key] - b[key]);

  const times = allAvgLapTimes.nodes.map((t) => t[key]);
  const chartMinTime = Math.min(...times).toFixed(0) - 1;

  return (
    <div className="">
      <div className="text-gray-600">
        {annotations.map((a, i) => (
          <p key={a}>{`${'*'.repeat(i + 1)} ${a}`}</p>
        ))}
      </div>
      <div className="" style={{ height: '450px' }}>
        <ResponsiveBar
          layout="horizontal"
          minValue={chartMinTime}
          data={data}
          keys={[key]}
          indexBy="driver_surname"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={getColor}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisLeft={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Driver',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: desc,
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

AvgTimingsBar.propTypes = {
  allAvgLapTimes: allAvgLapTimesType.isRequired,
  mode: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.string),
};

AvgTimingsBar.defaultProps = {
  annotations: [],
};

export default AvgTimingsBar;

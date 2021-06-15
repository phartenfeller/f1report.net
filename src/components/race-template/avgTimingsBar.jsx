import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import getTeamColor from '../../util/f1TeamColors';

const lapTimesType = PropTypes.arrayOf(
  PropTypes.shape({
    constructor_name: PropTypes.string.isRequired,
    driver_forename: PropTypes.string,
    driver_surname: PropTypes.string,
    driver_name: PropTypes.string,
    driver_number: PropTypes.number,
    avg_lapTime_s: PropTypes.number,
    median_lapTime_s: PropTypes.number,
  })
);

function getColor(obj) {
  return getTeamColor(obj.data.constructor_name);
}

const AvgTimingsBar = ({ avgLapTimes, mode, desc, annotations, index }) => {
  const key = mode === 'avg' ? 'avg_lapTime_s' : 'median_lapTime_s';
  const data = avgLapTimes.sort((a, b) => a[key] - b[key]);

  const times = avgLapTimes.map((t) => t[key]);
  const chartMinTime = Math.min(...times).toFixed(0) - 1;

  function tooltip(obj) {
    return (
      <div className="inline-flex items-center">
        <div
          className="rounded-full h-4 w-4 mr-2"
          style={{ background: obj.color }}
        />
        {index === 'constructor_name' ? (
          <span>{`${obj.value}s | ${obj.indexValue}`}</span>
        ) : (
          <span>{`${obj.value}s | ${obj.indexValue}  (${obj.data.constructor_name})`}</span>
        )}
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-gray-600">
        {annotations.map((a, i) => (
          <p key={a}>{`${'*'.repeat(i + 1)} ${a}`}</p>
        ))}
      </div>
      <div className="" style={{ height: '450px' }}>
        <ResponsiveBar
          tooltip={tooltip}
          layout="horizontal"
          minValue={chartMinTime}
          data={data}
          keys={[key]}
          indexBy={index}
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
            legend: 'Seconds',
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
  avgLapTimes: lapTimesType.isRequired,
  mode: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.string.isRequired,
};

AvgTimingsBar.defaultProps = {
  annotations: [],
};

export default AvgTimingsBar;

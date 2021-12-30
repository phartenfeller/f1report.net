import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

const AvgTimingsBar = ({ times, desc, annotations }) => {
  const data = times.sort((a, b) => a.time - b.time);

  const onlyTimes = times.map((t) => t.time);
  const chartMinTime = Math.min(...onlyTimes).toFixed(0) - 1;

  function tooltip(obj) {
    return (
      <div className="inline-flex items-center bg-white p-2 shadow rounded">
        <div
          className="rounded-full h-4 w-4 mr-2"
          style={{ background: obj.color }}
        />
        <span>{obj.data.tooltip}</span>
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-zinc-600">
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
          keys={['time']}
          indexBy="id"
          margin={{ top: 20, right: 130, bottom: 20, left: 60 }}
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
  times: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      tooltip: PropTypes.string.isRequired,
      constructor: PropTypes.string.isRequired,
    })
  ).isRequired,
  desc: PropTypes.string.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.string),
};

AvgTimingsBar.defaultProps = {
  annotations: [],
};

export default AvgTimingsBar;

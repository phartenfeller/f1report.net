import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}


function getContrastColor(hexColor) {
  if (!hexColor || !hexColor.startsWith('#')) return 'black';
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

function getAria(obj) {
  return obj.data.tooltip;
}

const AvgTimingsBar = ({ times, desc, annotations = [], title }) => {
  const data = times.sort((a, b) => a.time - b.time);

  const validTimes = times
    .map((t) => t.time)
    .filter((t) => t > 0 && Number.isFinite(t));
  const minTime = validTimes.length > 0 ? Math.min(...validTimes) : 0;
  const chartMinTime = Math.floor(minTime) - 1;

  function tooltip(obj) {
    return (
      <div className="flex items-center whitespace-nowrap rounded bg-white p-2 text-black shadow">
        <div
          className="mr-2 h-4 w-4 rounded-full"
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
      <figure>
        <div className="" style={{ height: '450px' }}>
          <ResponsiveBar
            tooltip={tooltip}
            layout="horizontal"
            minValue={chartMinTime > 0 ? chartMinTime : 'auto'}
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
            labelPosition="end"
            labelOffset={-50}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={(d) => getContrastColor(d.color.trim())}
            animate
            motionStiffness={90}
            motionDamping={15}
            role="application"
            ariaLabel={title}
            barAriaLabel={getAria}
            motionConfig={{
              mass: 1,
              tension: 200,
              friction: 25,
              clamp: true
            }}
          />
        </div>
        <figcaption className="mt-3">{title}</figcaption>
      </figure>
    </div>
  );
};

export default AvgTimingsBar;

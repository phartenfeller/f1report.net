import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import getTeamColor from '../../util/f1TeamColors';

const VAL_KEY = 'value';
const ENT_KEY = 'entity';

// Need to safely access colors object if getTeamColor returns something strict, 
// but getTeamColor returns hex string.
// However, nivo expects a function: (node) => color.
// node.data contains the row data.

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

function tooltip(obj) {
  return (
    <div className="inline-flex items-center rounded bg-white px-3 py-1 shadow-lg border border-gray-200">
      <div
        className="mr-2 h-4 w-4 rounded-full"
        style={{ background: obj.color }}
      />
      <span className='text-gray-900'>{obj.data.tooltip}</span>
    </div>
  );
}

function getAria(obj) {
  return obj.data.aria;
}

const BlogBarChart = ({
  inputData,
  axisBottomLabel,
  axisRightLabel,
  title,
}) => {
  if (!inputData || !inputData.length || inputData.length === 0) {
    console.error(`BlogBarChart: inputData is required`);
    return null;
  }

  const data = inputData.map((d) => {
    return {
      value: parseFloat(d[VAL_KEY]),
      entity: d[ENT_KEY],
      constructor: d.constructor,
      aria: d.aria,
      tooltip: `${d[ENT_KEY]}: ${d[VAL_KEY]}`,
    };
  });

  return (
    <div className="mb-8 max-w-[92vw]">
      <figure className="">
        <div style={{ height: '600px' }}>
          <ResponsiveBar
            tooltip={tooltip}
            layout="horizontal"
            minValue={0}
            data={data}
            keys={[VAL_KEY]}
            indexBy={ENT_KEY}
            margin={{ top: 2, right: 130, bottom: 2 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={getColor}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: axisBottomLabel,
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisRight={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: axisRightLabel,
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            axisLeft={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#ffffff"
            animate
            motionStiffness={90}
            motionDamping={15}
            role="application"
            ariaLabel={`Bar Chart: ${title}`}
            barAriaLabel={getAria}
          />
        </div>
        <figcaption>{title}</figcaption>
      </figure>
    </div>
  );
};

export default BlogBarChart;

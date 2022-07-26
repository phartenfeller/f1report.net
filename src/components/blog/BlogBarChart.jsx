import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import getTeamColor from '../../util/f1TeamColors';

const VAL_KEY = 'value';
const ENT_KEY = 'entity';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

function tooltip(obj) {
  return (
    <div className="inline-flex items-center rounded bg-white px-3 py-1 shadow-lg">
      <div
        className="mr-2 h-4 w-4 rounded-full"
        style={{ background: obj.color }}
      />
      <span>{obj.data.tooltip}</span>
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
    throw new Error(
      `BlogBarChart: inputData is required - received ${inputData}`
    );
  }

  const data = inputData.map((d) => {
    if (!d[VAL_KEY] || !d[ENT_KEY]) {
      throw new Error(
        `BlogBarChart: row need value or entity ${JSON.stringify(d)}`
      );
    }

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
            // eslint-disable-next-line react/jsx-no-bind
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

BlogBarChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  inputData: PropTypes.array.isRequired,
  axisBottomLabel: PropTypes.string.isRequired,
  axisRightLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BlogBarChart;

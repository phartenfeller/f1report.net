import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

function getAria(obj) {
  return `${obj.data.driver}: ${obj.data.points} points`;
}

const DriverStandingsBar = ({ standings, seasondrivermainconsByYearList, year }) => {
  const data = standings.map((s) => ({
    points: s.points,
    driver: s.driverDisplayName,
    driverId: s.driverId,
    tooltip: `${s.driverDisplayName}: ${s.points}`,
  }));

  for (let i = 0; i < data.length; i += 1) {
    const constr = seasondrivermainconsByYearList.find(
      (r) => r.driverId === data[i].driverId
    );
    if (constr) {
      data[i].constructor = constr.teamName;
    }
  }

  function tooltip(obj) {
    return (
      <div className="inline-flex items-center rounded bg-white px-3 py-1 shadow-lg text-black">
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
      <figure className="">
        <div className="" style={{ height: '600px' }}>
          <ResponsiveBar
            tooltip={tooltip}
            layout="horizontal"
            minValue={0}
            data={data}
            keys={['points']}
            indexBy="driver"
            margin={{ top: 2, right: 130 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={getColor}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Points',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisRight={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Drivers',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#ffffff"
            animate
            motionStiffness={90}
            motionDamping={15}
            role="application"
            ariaLabel={`${year} Driver Standings`}
            barAriaLabel={getAria}
          />
        </div>
        <figcaption>{`${year} Driver Standings`}</figcaption>
      </figure>
    </div>
  );
};

export default DriverStandingsBar;

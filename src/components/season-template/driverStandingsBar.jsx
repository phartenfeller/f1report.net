import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { raceResultsType, driverStandingsType } from '../../types';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

function getAria(obj) {
  return `${obj.data.driver}: ${obj.data.points} points`;
}

const DriverStandingsBar = ({ standings, resultsByRaceidList, year }) => {
  const data = standings.map((s) => ({
    points: s.points,
    driver: s.driverByDriverid.driverDisplayName,
    driverId: s.driverid,
    tooltip: `${s.driverByDriverid.driverDisplayName}: ${s.points}`,
  }));

  for (let i = 0; i < data.length; i += 1) {
    const constr = resultsByRaceidList.find(
      (r) => r.driverid === data[i].driverId
    );
    if (constr) {
      data[i].constructor = constr.constructorTeamByConstructorid.name;
    }
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

  return (
    <div className="">
      <figure className="">
        <div className="" style={{ height: '600px' }}>
          <ResponsiveBar
            // eslint-disable-next-line react/jsx-no-bind
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
              legend: 'Seconds',
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

DriverStandingsBar.propTypes = {
  standings: PropTypes.arrayOf(driverStandingsType).isRequired,
  resultsByRaceidList: PropTypes.arrayOf(raceResultsType).isRequired,
  year: PropTypes.string.isRequired,
};

export default DriverStandingsBar;

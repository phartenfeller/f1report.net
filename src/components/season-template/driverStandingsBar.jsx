import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { raceResultsType } from '../../types';
import standingsType from '../../types/standingsType';
import getTeamColor from '../../util/f1TeamColors';

function getColor(obj) {
  return getTeamColor(obj.data.constructor);
}

const DriverStandingsBar = ({ standings, resultsByRaceidList }) => {
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
    data[i].constructor = constr.constructorTeamByConstructorid.name;
  }

  function tooltip(obj) {
    return (
      <div className="inline-flex items-center">
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
        />
      </div>
    </div>
  );
};

DriverStandingsBar.propTypes = {
  standings: PropTypes.arrayOf(standingsType).isRequired,
  resultsByRaceidList: PropTypes.arrayOf(raceResultsType).isRequired,
};

export default DriverStandingsBar;

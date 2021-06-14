import React from 'react';
import allAvgLapTimesType from '../../types/allAvgLapTimesType';
import TabsContainer from '../tabsContainer';
import AvgTimingsBar from './avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const DriverLapTimes = ({ allAvgLapTimes, allAvgLapTimesTop70Pct }) => {
  const tabs = [
    {
      tabId: 1,
      tabName: AVG,
      component: (
        <AvgTimingsBar
          allAvgLapTimes={allAvgLapTimes}
          mode="avg"
          desc={AVG}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
          index="driver_name"
        />
      ),
    },
    {
      tabId: 2,
      tabName: MEDIAN,
      component: (
        <AvgTimingsBar
          allAvgLapTimes={allAvgLapTimes}
          mode="median"
          desc={MEDIAN}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
          index="driver_name"
        />
      ),
    },
    {
      tabId: 3,
      tabName: TOP70,
      component: (
        <AvgTimingsBar
          allAvgLapTimes={allAvgLapTimesTop70Pct}
          mode="avg"
          desc={TOP70}
          annotations={[
            // eslint-disable-next-line dot-notation
            `of the drivers who drove ${allAvgLapTimesTop70Pct.nodes[0]['relevant_lap_count']} Laps`,
          ]}
          index="driver_name"
        />
      ),
    },
  ];

  return (
    <>
      <TabsContainer tabs={tabs} defaultTabId={1} />
    </>
  );
};

DriverLapTimes.propTypes = {
  allAvgLapTimes: allAvgLapTimesType.isRequired,
  allAvgLapTimesTop70Pct: allAvgLapTimesType.isRequired,
};

export default DriverLapTimes;

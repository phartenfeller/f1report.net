import React from 'react';
import avgLapTimesType from '../../types/avgLapTimesType';
import TabsContainer from '../tabsContainer';
import AvgTimingsBar from './avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const DriverLapTimes = ({ avgLapTimes, avgLapTimesTop70Pcts }) => {
  const tabs = [
    {
      tabId: 1,
      tabName: AVG,
      component: (
        <AvgTimingsBar
          avgLapTimes={avgLapTimes}
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
          avgLapTimes={avgLapTimes}
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
          avgLapTimes={avgLapTimesTop70Pcts}
          mode="avg"
          desc={TOP70}
          annotations={[
            // eslint-disable-next-line dot-notation
            `of the drivers who drove ${avgLapTimesTop70Pcts[0]['relevant_lap_count']} Laps`,
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
  avgLapTimes: avgLapTimesType.isRequired,
  avgLapTimesTop70Pcts: avgLapTimesType.isRequired,
};

export default DriverLapTimes;

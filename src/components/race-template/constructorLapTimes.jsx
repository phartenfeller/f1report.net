import React from 'react';
import avgConstructorLapTimesType from '../../types/avgConstructorLapTimesType';
import TabsContainer from '../tabsContainer';
import AvgTimingsBar from './avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const ConstructorLapTimes = ({
  avgConstructorLapTimes,
  avgConstructorLapTimes70Pcts,
}) => {
  const tabs = [
    {
      tabId: 1,
      tabName: AVG,
      component: (
        <AvgTimingsBar
          avgLapTimes={avgConstructorLapTimes}
          mode="avg"
          desc={AVG}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
          index="constructor_name"
        />
      ),
    },
    {
      tabId: 2,
      tabName: MEDIAN,
      component: (
        <AvgTimingsBar
          avgLapTimes={avgConstructorLapTimes}
          mode="median"
          desc={MEDIAN}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
          index="constructor_name"
        />
      ),
    },
    {
      tabId: 3,
      tabName: TOP70,
      component: (
        <AvgTimingsBar
          avgLapTimes={avgConstructorLapTimes70Pcts}
          mode="avg"
          desc={TOP70}
          annotations={[
            // eslint-disable-next-line dot-notation
            `Best ${avgConstructorLapTimes70Pcts[0]['relevant_lap_count']} Laps of both drivers`,
            // eslint-disable-next-line dot-notation
            `Only Teams that completed ${avgConstructorLapTimes70Pcts[0]['relevant_lap_count']} Laps`,
          ]}
          index="constructor_name"
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

ConstructorLapTimes.propTypes = {
  avgConstructorLapTimes: avgConstructorLapTimesType.isRequired,
  avgConstructorLapTimes70Pcts: avgConstructorLapTimesType.isRequired,
};

export default ConstructorLapTimes;

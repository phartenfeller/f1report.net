import React from 'react';
import allAvgConstructorLapTimesType from '../../types/allAvgConstructorLapTimesType';
import TabsContainer from '../tabsContainer';
import AvgTimingsBar from './avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const ConstructorLapTimes = ({
  allAvgConstructorLapTimes,
  allAvgConstructorLapTimes70Pct,
}) => {
  const tabs = [
    {
      tabId: 1,
      tabName: AVG,
      component: (
        <AvgTimingsBar
          allAvgLapTimes={allAvgConstructorLapTimes}
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
          allAvgLapTimes={allAvgConstructorLapTimes}
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
          allAvgLapTimes={allAvgConstructorLapTimes70Pct}
          mode="avg"
          desc={TOP70}
          annotations={[
            // eslint-disable-next-line dot-notation
            `Best ${allAvgConstructorLapTimes70Pct.nodes[0]['relevant_lap_count']} Laps of both drivers`,
            // eslint-disable-next-line dot-notation
            `Only Teams that completed ${allAvgConstructorLapTimes70Pct.nodes[0]['relevant_lap_count']} Laps`,
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
  allAvgConstructorLapTimes: allAvgConstructorLapTimesType.isRequired,
  allAvgConstructorLapTimes70Pct: allAvgConstructorLapTimesType.isRequired,
};

export default ConstructorLapTimes;

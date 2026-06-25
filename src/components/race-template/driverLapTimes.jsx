import React from 'react';
import TabsContainer from '../TabsContainer';
import AvgTimingsBar from '../charts/AvgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const DriverLapTimes = ({
  driAvgLaptsByRaceidList,
  driAvgLapt70PsByRaceidList,
  driverMap,
}) => {
  const avgTimes = driAvgLaptsByRaceidList.map((time) => ({
    id: driverMap[time.driverId].displayName,
    time: parseFloat(time.avgLapTimeS),
    tooltip: `${driverMap[time.driverId].displayName} (${
      driverMap[time.driverId].constructor
    }): ${time.avgLapTimeS} seconds`,
    constructor: driverMap[time.driverId].constructor,
  }));

  const medianTimes = driAvgLaptsByRaceidList.map((time) => ({
    id: driverMap[time.driverId].displayName,
    time: parseFloat(time.medianLapTimeS),
    tooltip: `${driverMap[time.driverId].displayName} (${
      driverMap[time.driverId].constructor
    }): ${time.medianLapTimeS} seconds`,
    constructor: driverMap[time.driverId].constructor,
  }));

  const top70Times = driAvgLapt70PsByRaceidList.map((time) => ({
    id: driverMap[time.driverId].displayName,
    time: parseFloat(time.avgLapTimeS),
    tooltip: `${driverMap[time.driverId].displayName} (${
      driverMap[time.driverId].constructor
    }): ${time.avgLapTimeS} seconds`,
    constructor: driverMap[time.driverId].constructor,
  }));

  const relevantLapCount =
    driAvgLapt70PsByRaceidList &&
    driAvgLapt70PsByRaceidList[0] &&
    driAvgLapt70PsByRaceidList[0].relevantLapCount
      ? driAvgLapt70PsByRaceidList[0].relevantLapCount
      : '?';

  const tabs = [
    {
      tabId: 1,
      tabName: AVG,
      component: (
        <AvgTimingsBar
          times={avgTimes}
          desc={AVG}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
          title="Average Driver Lap Times"
        />
      ),
    },
    {
      tabId: 2,
      tabName: MEDIAN,
      component: (
        <AvgTimingsBar
          times={medianTimes}
          desc={MEDIAN}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
          title="Median Driver Lap Times"
        />
      ),
    },
    {
      tabId: 3,
      tabName: TOP70,
      component: (
        <AvgTimingsBar
          times={top70Times}
          desc={TOP70}
          annotations={[
            `of the drivers who drove ${relevantLapCount} Laps`,
          ]}
          title="Average Top 70 % Driver Lap Times"
        />
      ),
    },
  ];

  return <TabsContainer tabs={tabs} defaultTabId={1} />;
};

export default DriverLapTimes;

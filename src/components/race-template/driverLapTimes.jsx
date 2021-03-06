import React from 'react';
import { driAvgLapt70PType, driAvgLaptType, driverMapType } from '../../types';
import TabsContainer from '../tabsContainer';
import AvgTimingsBar from '../charts/avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const DriverLapTimes = ({
  driAvgLaptsByRaceidList,
  driAvgLapt70PsByRaceidList,
  driverMap,
}) => {
  const avgTimes = driAvgLaptsByRaceidList.map((time) => ({
    id: driverMap[time.driverid].displayName,
    time: parseFloat(time.avglaptimes),
    tooltip: `${driverMap[time.driverid].displayName} (${
      driverMap[time.driverid].constructor
    }): ${time.avglaptimes} seconds`,
    constructor: driverMap[time.driverid].constructor,
  }));

  const medianTimes = driAvgLaptsByRaceidList.map((time) => ({
    id: driverMap[time.driverid].displayName,
    time: parseFloat(time.medianlaptimes),
    tooltip: `${driverMap[time.driverid].displayName} (${
      driverMap[time.driverid].constructor
    }): ${time.medianlaptimes} seconds`,
    constructor: driverMap[time.driverid].constructor,
  }));

  const top70Times = driAvgLapt70PsByRaceidList.map((time) => ({
    id: driverMap[time.driverid].displayName,
    time: parseFloat(time.avglaptimes),
    tooltip: `${driverMap[time.driverid].displayName} (${
      driverMap[time.driverid].constructor
    }): ${time.avglaptimes} seconds`,
    constructor: driverMap[time.driverid].constructor,
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
            // eslint-disable-next-line dot-notation
            `of the drivers who drove ${relevantLapCount} Laps`,
          ]}
          title="Average Top 70 % Driver Lap Times"
        />
      ),
    },
  ];

  return <TabsContainer tabs={tabs} defaultTabId={1} />;
};

DriverLapTimes.propTypes = {
  driAvgLapt70PsByRaceidList: driAvgLapt70PType.isRequired,
  driAvgLaptsByRaceidList: driAvgLaptType.isRequired,
  driverMap: driverMapType.isRequired,
};

export default DriverLapTimes;

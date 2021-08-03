import React from 'react';
import { conAvgLapt70PType, conAvgLaptType } from '../../types';
import TabsContainer from '../tabsContainer';
import AvgTimingsBar from '../charts/avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const ConstructorLapTimes = ({
  conAvgLaptsByRaceidList,
  conAvgLapt70PsByRaceidList,
}) => {
  const avgTimes = conAvgLaptsByRaceidList.map((time) => ({
    id: time.constructorTeamByConstructorid.name,
    time: parseFloat(time.avglaptimes),
    tooltip: `${time.avglaptimes} | ${time.constructorTeamByConstructorid.name} `,
    constructor: time.constructorTeamByConstructorid.name,
  }));

  const mediumTimes = conAvgLaptsByRaceidList.map((time) => ({
    id: time.constructorTeamByConstructorid.name,
    time: parseFloat(time.medianlaptimes),
    tooltip: `${time.medianlaptimes} | ${time.constructorTeamByConstructorid.name} `,
    constructor: time.constructorTeamByConstructorid.name,
  }));

  const top70Times = conAvgLapt70PsByRaceidList.map((time) => ({
    id: time.constructorTeamByConstructorid.name,
    time: parseFloat(time.avglaptimes),
    tooltip: `${time.avglaptimes} | ${time.constructorTeamByConstructorid.name} `,
    constructor: time.constructorTeamByConstructorid.name,
  }));

  const relevantLapCount =
    conAvgLapt70PsByRaceidList &&
    conAvgLapt70PsByRaceidList[0] &&
    conAvgLapt70PsByRaceidList[0].relevantLapCount
      ? conAvgLapt70PsByRaceidList[0].relevantLapCount
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
        />
      ),
    },
    {
      tabId: 2,
      tabName: MEDIAN,
      component: (
        <AvgTimingsBar
          times={mediumTimes}
          desc={MEDIAN}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
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
            `Best ${relevantLapCount} Laps of both drivers`,
            `Only Teams that completed ${relevantLapCount} Laps`,
          ]}
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
  conAvgLapt70PsByRaceidList: conAvgLapt70PType.isRequired,
  conAvgLaptsByRaceidList: conAvgLaptType.isRequired,
};

export default ConstructorLapTimes;

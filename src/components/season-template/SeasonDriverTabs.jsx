import React from 'react';
import TabsContainer from '../TabsContainer';
import DriverStandingsTable from './DriverStandingsTable';
import DriverStandingsBar from './DriverStandingsBar';
import DriverProgressStream from './DriverProgressStream';
import DriverPositionBump from './DriverPositionBump';

const SeasonDriverTabs = ({
  driverStandings,
  seasonDriverMainCons,
  driverStandingsBySeason,
  year
}) => {
  const tabs = [
    {
      tabId: 1,
      tabName: 'Table',
      component: (
        <DriverStandingsTable
          standings={driverStandings}
          seasondrivermainconsByYearList={seasonDriverMainCons}
        />
      ),
    },
    {
      tabId: 2,
      tabName: 'Bar Chart',
      component: (
        <DriverStandingsBar
          standings={driverStandings}
          seasondrivermainconsByYearList={seasonDriverMainCons}
          year={year}
        />
      ),
    },
    {
      tabId: 3,
      tabName: 'Point Distribution per Race',
      component: (
        <DriverProgressStream
          driverStandingsBySeason={driverStandingsBySeason}
          seasondrivermainconsByYearList={seasonDriverMainCons}
          currentStandings={driverStandings}
        />
      ),
    },
    {
      tabId: 4,
      tabName: 'Position Changes',
      component: (
        <DriverPositionBump
          driverStandingsBySeason={driverStandingsBySeason}
          seasondrivermainconsByYearList={seasonDriverMainCons}
        />
      ),
    },
  ];

  return <TabsContainer tabs={tabs} defaultTabId={1} />;
};

export default SeasonDriverTabs;

import React from 'react';
import TabsContainer from '../TabsContainer';
import TeamStandingsTable from './TeamStandingsTable';
import TeamStandingsBar from './TeamStandingsBar';
import ConstructorProgressStream from './ConstructorProgressStream';
import ConstructorPositionBump from './ConstructorPositionBump';

const SeasonConstructorTabs = ({
  constructorStandings,
  constructorStandingsBySeason,
  year
}) => {
  const tabs = [
    {
      tabId: 1,
      tabName: 'Table',
      component: (
        <TeamStandingsTable teamStandings={constructorStandings} />
      ),
    },
    {
      tabId: 2,
      tabName: 'Bar Chart',
      component: (
        <TeamStandingsBar
          teamStandings={constructorStandings}
          year={year}
        />
      ),
    },
    {
      tabId: 3,
      tabName: 'Point Distribution per Race',
      component: (
        <ConstructorProgressStream
          constructorStandingsBySeason={constructorStandingsBySeason}
          currentStandings={constructorStandings}
        />
      ),
    },
    {
      tabId: 4,
      tabName: 'Position Changes',
      component: <ConstructorPositionBump constructorStandingsBySeason={constructorStandingsBySeason} />,
    },
  ];

  return <TabsContainer tabs={tabs} defaultTabId={1} />;
};

export default SeasonConstructorTabs;

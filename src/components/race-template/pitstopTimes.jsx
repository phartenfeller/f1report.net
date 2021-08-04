import React from 'react';
import PropTypes from 'prop-types';
import {
  conAvgPitstopsByRaceidListType,
  seasonDriverMainConsType,
} from '../../types';
import pitstopsByRaceidListType from '../../types/pitstopsByRaceidListType';
import arrayWithValues from '../../util/arrayWithValues';
import AvgTimingsBar from '../charts/avgTimingsBar';
import { LinkableH2 } from '../headers';
import TabsContainer from '../tabsContainer';
import PitStopTable from './pitStopTable';

const PitStopTimes = ({
  conAvgPitstopsByRaceidList,
  pitstopsByRaceidList,
  seasondrivermainconsByYearList,
}) => {
  const conTimes = conAvgPitstopsByRaceidList.map(
    ({ avgpittimes, constructorTeamByConstructorid }) => ({
      id: constructorTeamByConstructorid?.name,
      time: avgpittimes,
      constructor: constructorTeamByConstructorid?.name,
      tooltip: `${avgpittimes} | ${constructorTeamByConstructorid?.name} `,
    })
  );
  const tabs = [
    {
      tabId: 1,
      tabName: 'Average Constructor Pitstops',
      component: (
        <AvgTimingsBar times={conTimes} desc="Average Constructor Pitstops" />
      ),
    },
    {
      tabId: 2,
      tabName: 'Pitstop List',
      component: (
        <PitStopTable
          pitstopsByRaceidList={pitstopsByRaceidList}
          seasondrivermainconsByYearList={seasondrivermainconsByYearList}
        />
      ),
    },
  ];

  return (
    <>
      {arrayWithValues(conAvgPitstopsByRaceidList) ? (
        <div>
          <LinkableH2>Pitstop Times</LinkableH2>
          <TabsContainer tabs={tabs} defaultTabId={1} />
        </div>
      ) : null}
    </>
  );
};

PitStopTimes.propTypes = {
  conAvgPitstopsByRaceidList: conAvgPitstopsByRaceidListType.isRequired,
  pitstopsByRaceidList: pitstopsByRaceidListType.isRequired,
  seasondrivermainconsByYearList: PropTypes.arrayOf(
    seasonDriverMainConsType.isRequired
  ).isRequired,
};

export default PitStopTimes;

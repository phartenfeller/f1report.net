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
import DriverTeamDisplay from '../teamDisplay/driverTeamDisplay';

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
        <div className="py-2 align-middle min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="c-table-heading">
                    Driver
                  </th>
                  <th scope="col" className="hidden lg:c-table-heading">
                    Constructor
                  </th>
                  <th scope="col" className="hidden lg:c-table-heading">
                    Lap
                  </th>
                  <th scope="col" className="hidden md:c-table-heading">
                    Stop
                  </th>
                  <th scope="col" className="c-table-heading">
                    Time (s)
                  </th>
                </tr>
              </thead>
              <tbody>
                {pitstopsByRaceidList.map(
                  (
                    { nodeId, lap, milliseconds, stop, driverByDriverid },
                    i
                  ) => (
                    <tr
                      key={nodeId}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="c-table-cell font-medium">
                        {driverByDriverid?.driverDisplayName}
                      </td>
                      <td className="hidden lg:c-table-cell">
                        <DriverTeamDisplay
                          driverId={driverByDriverid?.driverid}
                          seasondrivermainconsByYearList={
                            seasondrivermainconsByYearList
                          }
                        />
                      </td>
                      <td className="hidden lg:c-table-cell">{lap}</td>
                      <td className="hidden md:c-table-cell">{stop}</td>
                      <td className="c-table-cell">
                        {(parseInt(milliseconds) / 1000).toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
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

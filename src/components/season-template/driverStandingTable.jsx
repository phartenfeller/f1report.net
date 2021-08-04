import PropTypes from 'prop-types';
import React from 'react';
import { seasonDriverMainConsType, driverStandingsType } from '../../types';
import TeamDisplay from '../teamDisplay/driverTeamDisplay';

const DriverStandingsTable = ({
  standings,
  seasondrivermainconsByYearList,
}) => (
  <div className="py-2 align-middle inline-block min-w-full">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="c-table-heading">
              #
            </th>
            <th scope="col" className="c-table-heading">
              Driver
            </th>
            <th scope="col" className="hidden md:c-table-heading">
              Team
            </th>
            <th scope="col" className="hidden lg:c-table-heading">
              Wins
            </th>
            <th scope="col" className="c-table-heading">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map(
            ({ position, points, wins, driverByDriverid, driverid }, i) => (
              <tr
                key={driverid}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="c-table-cell font-medium">{position}</td>
                <td className="c-table-cell font-medium">
                  {driverByDriverid.driverDisplayName}
                </td>
                <td className="hidden md:c-table-cell">
                  <TeamDisplay
                    driverId={driverid}
                    seasondrivermainconsByYearList={
                      seasondrivermainconsByYearList
                    }
                  />
                </td>
                <td className="hidden lg:c-table-cell">{wins}</td>
                <td className="c-table-cell text-right pr-4 md:text-left md:pr-0">
                  {points}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);

DriverStandingsTable.propTypes = {
  standings: PropTypes.arrayOf(driverStandingsType).isRequired,
  seasondrivermainconsByYearList: PropTypes.arrayOf(seasonDriverMainConsType)
    .isRequired,
};

export default DriverStandingsTable;

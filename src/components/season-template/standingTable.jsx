import PropTypes from 'prop-types';
import React from 'react';
import { raceResultsType } from '../../types';
import standingsType from '../../types/standingsType';
import TeamDisplay from '../teamDisplay';

const StandingsTable = ({ standings, resultsByRaceidList }) => (
  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="table-heading hidden lg:table-cell">
              #
            </th>
            <th scope="col" className="table-heading">
              Driver
            </th>
            <th scope="col" className="table-heading">
              Team
            </th>
            <th scope="col" className="table-heading hidden lg:table-cell">
              Wins
            </th>
            <th scope="col" className="table-heading hidden md:table-cell">
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
                <td className="hidden lg:table-cell font-medium">{position}</td>
                <td className="table-cell font-medium">
                  {driverByDriverid.driverDisplayName}
                </td>
                <td className="hidden lg:table-cell">
                  <TeamDisplay
                    driverId={driverid}
                    resultsByRaceidList={resultsByRaceidList}
                  />
                </td>
                <td className="hidden lg:table-cell">{wins}</td>
                <td className="hidden md:table-cell">{points}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);

StandingsTable.propTypes = {
  standings: PropTypes.arrayOf(standingsType).isRequired,
  resultsByRaceidList: PropTypes.arrayOf(raceResultsType).isRequired,
};

export default StandingsTable;

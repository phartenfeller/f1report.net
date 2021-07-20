import PropTypes from 'prop-types';
import React from 'react';
import { teamStandingsType } from '../../types';
import TeamDisplay from '../teamDisplay/teamDisplay';

const TeamStandingsTable = ({ teamStandings }) => (
  <div className="py-2 align-middle inline-block min-w-full">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="table-heading">
              #
            </th>
            <th scope="col" className="table-heading">
              Team
            </th>
            <th scope="col" className="table-heading hidden lg:table-cell">
              Wins
            </th>
            <th scope="col" className="table-heading">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {teamStandings.map(
            (
              {
                position,
                points,
                wins,
                constructorTeamByConstructorid,
                constructorid,
              },
              i
            ) => (
              <tr
                key={constructorid}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="table-cell font-medium">{position}</td>
                <td className="hidden md:table-cell">
                  <TeamDisplay teamName={constructorTeamByConstructorid.name} />
                </td>
                <td className="hidden lg:table-cell">{wins}</td>
                <td className="table-cell text-right pr-4 md:text-left md:pr-0">
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

TeamStandingsTable.propTypes = {
  teamStandings: PropTypes.arrayOf(teamStandingsType).isRequired,
};

export default TeamStandingsTable;
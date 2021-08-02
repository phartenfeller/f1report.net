import PropTypes from 'prop-types';
import React from 'react';
import { raceResultsType } from '../../types';
import TeamDisplay from '../teamDisplay/teamDisplay';

const RaceResultsTable = ({ resultsByRaceidList }) => (
  <div className="py-2 align-middle min-w-full">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="table-heading">
              #
            </th>
            <th scope="col" className="table-heading">
              Driver
            </th>
            <th scope="col" className="table-heading">
              Constructor
            </th>
            <th scope="col" className="table-heading">
              Pts.
            </th>
            <th scope="col" className="table-heading">
              Time
            </th>
            <th scope="col" className="table-heading">
              Result
            </th>
            <th scope="col" className="table-heading">
              Fastest L.
            </th>
            <th scope="col" className="table-heading">
              Grid
            </th>
          </tr>
        </thead>
        <tbody>
          {resultsByRaceidList.map(
            (
              {
                resultid,
                fastestlap,
                constructorTeamByConstructorid,
                driverByDriverid,
                grid,
                laps,
                points,
                position,
                statusByStatusid,
                time: finishTime,
                fastestlapspeed,
                fastestlaptime,
              },
              i
            ) => (
              <tr
                key={resultid}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="table-cell font-medium">{position}</td>
                <td className="table-cell">
                  {driverByDriverid.forename} {driverByDriverid.surname}{' '}
                  {driverByDriverid.number
                    ? `(${driverByDriverid.number})`
                    : null}
                </td>
                <td className="table-cell">
                  <TeamDisplay teamName={constructorTeamByConstructorid.name} />
                </td>
                <td className="table-cell">{points}</td>
                <td className="table-cell">{finishTime}</td>
                <td className="table-cell" title={`Laps: ${laps}`}>
                  {statusByStatusid.status}
                </td>
                <td
                  className="table-cell"
                  title={`Lap: ${fastestlap}, Speed: ${fastestlapspeed}`}
                >
                  {fastestlaptime}
                </td>
                <td className="table-cell">{grid}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);

RaceResultsTable.propTypes = {
  resultsByRaceidList: PropTypes.arrayOf(raceResultsType).isRequired,
};

export default RaceResultsTable;

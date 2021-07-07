import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { raceType } from '../types';

const RaceDetailsTable = ({ racesByYearList }) => (
  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="table-heading hidden lg:table-cell">
              #
            </th>
            <th scope="col" className="table-heading">
              Race
            </th>
            <th scope="col" className="table-heading hidden lg:table-cell">
              Circuit
            </th>
            <th scope="col" className="table-heading hidden md:table-cell">
              Location
            </th>
            <th scope="col" className="table-heading hidden md:table-cell">
              Date
            </th>
            <th scope="col" className="table-heading hidden md:table-cell">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {racesByYearList.map(
            (
              { circuitByCircuitid, date, raceid, raceSlug, round, name },
              i
            ) => (
              <tr
                key={raceid}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="hidden lg:table-cell font-medium">{round}</td>
                <td className="table-cell font-medium">{name}</td>
                <td className="hidden lg:table-cell">
                  {circuitByCircuitid.name}
                </td>
                <td className="hidden md:table-cell">
                  {circuitByCircuitid.location} - {circuitByCircuitid.country}
                </td>
                <td className="hidden md:table-cell">{date}</td>
                <td className="table-cell">
                  <Link to={`/races/${raceSlug}`} className="standard-link">
                    Details
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);

RaceDetailsTable.propTypes = {
  racesByYearList: PropTypes.arrayOf(raceType).isRequired,
};

export default RaceDetailsTable;

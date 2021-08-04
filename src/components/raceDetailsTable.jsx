import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { raceType } from '../types';

const RaceDetailsTable = ({ racesByYearList }) => (
  <div className="py-2 align-middle inline-block min-w-full">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="hidden lg:c-table-heading">
              #
            </th>
            <th scope="col" className="c-table-heading">
              Race
            </th>
            <th scope="col" className="hidden lg:c-table-heading">
              Circuit
            </th>
            <th scope="col" className="hidden md:c-table-heading">
              Location
            </th>
            <th scope="col" className="hidden md:c-table-heading">
              Date
            </th>
            <th scope="col" className="hidden md:c-table-heading">
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
                <td className="hidden lg:c-table-cell font-medium">{round}</td>
                <td className="c-table-cell font-medium">{name}</td>
                <td className="hidden lg:c-table-cell">
                  {circuitByCircuitid.name}
                </td>
                <td className="hidden md:c-table-cell">
                  {circuitByCircuitid.location} - {circuitByCircuitid.country}
                </td>
                <td className="hidden md:c-table-cell">{date}</td>
                <td className="c-table-cell">
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

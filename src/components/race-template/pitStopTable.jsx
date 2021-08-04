/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import { seasonDriverMainConsType } from '../../types';
import pitstopsByRaceidListType from '../../types/pitstopsByRaceidListType';
import DriverTeamDisplay from '../teamDisplay/driverTeamDisplay';

const NO_FILL = `#D1D5DB`;
const FILL = `#374151`;

const SortedHeaderRenderer = ({ column }) => {
  let top = NO_FILL;
  let bottom = NO_FILL;

  if (column.isSorted && column.isSortedDesc) {
    bottom = FILL;
  } else if (column.isSorted) {
    top = FILL;
  }

  return (
    <div className="flex justify-between w-full">
      <span>{column.render('Header')}</span>
      <svg
        className="h-4 w-4"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M63.5 11L97.708 41H29.292L63.5 11Z" fill={top} />
        <path d="M63.5 114L29.292 84L97.708 84L63.5 114Z" fill={bottom} />
      </svg>
    </div>
  );
};

const cellClasses = (column) => {
  if (column.showAt) {
    return `hidden ${column.showAt}:c-table-cell`;
  }
  return 'c-table-cell';
};

const headerClasses = (column) => {
  if (column.showAt) {
    return `hidden ${column.showAt}:c-table-heading`;
  }
  return 'c-table-heading';
};

const PitStopTable = ({
  pitstopsByRaceidList,
  seasondrivermainconsByYearList,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverByDriverid.driverDisplayName',
      },
      {
        Header: 'Constructor',
        accessor: 'driverByDriverid.driverid',
        Cell: ({ value }) => (
          <DriverTeamDisplay
            driverId={value}
            seasondrivermainconsByYearList={seasondrivermainconsByYearList}
          />
        ),
        showAt: 'lg',
      },
      {
        Header: 'Lap',
        accessor: 'lap',
        showAt: 'lg',
      },
      {
        Header: 'Stop',
        accessor: 'stop',
        showAt: 'md',
      },
      {
        Header: 'Time',
        accessor: 'milliseconds',
        Cell: ({ value }) => <> {(parseInt(value) / 1000).toFixed(2)}</>,
      },
    ],
    [seasondrivermainconsByYearList]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pitstopsByRaceidList }, useSortBy);

  return (
    <div className="py-2 align-middle min-w-full">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={headerClasses(column)}
                  >
                    <SortedHeaderRenderer column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={cellClasses(cell.column)}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PitStopTable.propTypes = {
  pitstopsByRaceidList: pitstopsByRaceidListType.isRequired,
  seasondrivermainconsByYearList: PropTypes.arrayOf(
    seasonDriverMainConsType.isRequired
  ).isRequired,
};

export default PitStopTable;

import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import DriverTeamDisplay from '../teamDisplay/DriverTeamDisplay';

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
  const base = 'px-4 py-4 whitespace-nowrap text-slate-600 font-medium tabular-nums';
  if (column.showAt) {
    return `${base} hidden ${column.showAt}:table-cell`;
  }
  return base;
};

const headerClasses = (column) => {
  const base = 'px-4 py-3 font-semibold text-slate-500 text-left uppercase tracking-wider';
  if (column.showAt) {
    return `${base} hidden ${column.showAt}:table-cell`;
  }
  return base;
};

const PitStopTable = ({
  pitstopsByRaceidList,
  seasondrivermainconsByYearList,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverDisplayName',
      },
      {
        Header: 'Constructor',
        accessor: 'driverId',
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
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table
        {...getTableProps()}
        className="min-w-full text-left text-sm whitespace-nowrap"
      >
        <thead className="uppercase tracking-wider border-b-2 border-slate-100">
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
        <tbody {...getTableBodyProps()} className="divide-y divide-slate-100">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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
  );
};

export default PitStopTable;

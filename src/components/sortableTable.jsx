/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { useSortBy, useTable } from 'react-table';

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

SortedHeaderRenderer.propTypes = {
  column: PropTypes.object.isRequired,
};

const cellClasses = (column) => {
  // needed to be written out for purging styles
  if (column.showAt) {
    switch (column.showAt) {
      case 'sm':
        return 'hidden sm:c-table-cell';
      case 'md':
        return 'hidden md:c-table-cell';
      case 'lg':
        return 'hidden lg:c-table-cell';
      default:
        // eslint-disable-next-line no-console
        console.error(`SortableTable => Unknown showAt "${column.showAt}"`);
        return 'c-table-cell';
    }
  }
  return 'c-table-cell';
};

const headerClasses = (column) => {
  if (column.showAt) {
    switch (column.showAt) {
      case 'sm':
        return 'hidden sm:c-table-heading';
      case 'md':
        return 'hidden md:c-table-heading';
      case 'lg':
        return 'hidden lg:c-table-heading';
      default:
        // eslint-disable-next-line no-console
        console.error(`SortableTable => Unknown showAt "${column.showAt}"`);
        return 'c-table-heading';
    }
  }

  return 'c-table-heading';
};

const SortableTable = ({ data, columns, defaultSort }) => {
  let initialState = null;
  if (defaultSort) {
    initialState = {
      sortBy: defaultSort,
    };
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className="py-2 align-middle min-w-full">
      <div className="shadow-muted overflow-hidden border-b border-gray-200 sm:rounded-lg">
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

SortableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  defaultSort: PropTypes.array,
};

SortableTable.defaultProps = {
  defaultSort: null,
};

export default SortableTable;

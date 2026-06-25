import React from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

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
    <div className="flex w-full justify-between">
      <span>{column.render('Header')}</span>
      <svg
        className="mr-2 h-4 w-4"
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

const PaginationBar = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  gotoPage,
  nextPage,
  previousPage,
}) => (
  <div className="border-t border-zinc-200 bg-zinc-100 p-2">
    <div className="space-x-3 text-center text-zinc-700">
      <button
        type="button"
        className="rounded bg-white px-2 shadow hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-zinc-300 disabled:shadow-none"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {'<<'}
      </button>
      <button
        type="button"
        className="rounded bg-white px-2 shadow hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-zinc-300 disabled:shadow-none"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {'<'}
      </button>
      <span className="space-x-2">
        <span className="font-light">Page</span>
        <span className="font-semibold">{pageIndex + 1}</span>
        <span className="font-light">of</span>
        <span className="font-semibold">{pageOptions.length}</span>
      </span>
      <button
        type="button"
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className="rounded bg-white px-2 shadow hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-zinc-300 disabled:shadow-none"
      >
        {'>'}
      </button>
      <button
        type="button"
        className="rounded bg-white px-2 shadow hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-zinc-300 disabled:shadow-none"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>
    </div>
  </div>
);

const cellClasses = (column) => {
  const base = 'px-4 py-4 whitespace-nowrap text-slate-600 font-medium tabular-nums';
  if (column.showAt) {
    return `${base} hidden ${column.showAt}:table-cell`;
  }
  if (column.className) {
      return `${base} ${column.className}`;
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

const SortableTable = ({ data, columns, defaultSort, pagination }) => {
  const initialState = {};

  const props = [{ columns, data, initialState }, useSortBy];

  if (defaultSort) {
    initialState.sortBy = defaultSort;
  }

  if (pagination) {
    initialState.pageSize = pagination;
    props.push(usePagination);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,

    // pagination
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(...props);

  const iterator = pagination ? page : rows;

  if (!columns || columns.length === 0) {
    return (
      <div className="min-w-full py-2 align-middle">
        <div className="bg-white p-8 text-center font-semibold shadow-muted sm:rounded-lg">
          No columns selected to display...
        </div>
      </div>
    );
  }

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
          {iterator.map((row, i) => {
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
      {pagination && (
        <PaginationBar
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  );
};

export default SortableTable;

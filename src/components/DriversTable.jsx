import React, { useMemo } from 'react';
import SortableTable from './SortableTable';

const LinkCell = ({ value, row }) => (
  <a 
    href={`/drivers/${value}`} 
    className="text-blue-600 hover:text-blue-800 hover:underline"
  >
    Stats
  </a>
);

const DriversTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverDisplayName',
        className: 'font-semibold',
      },
      {
        Header: 'Total Races',
        accessor: 'races',
      },
      {
        Header: 'Wins',
        accessor: 'wins',
      },
      {
        Header: 'Podiums',
        accessor: 'podiums',
      },
      {
        Header: 'Points',
        accessor: 'points',
      },
      {
        Header: 'More Info',
        accessor: 'driverRef',
        Cell: LinkCell,
        disableSortBy: true,
      },
    ],
    []
  );

  const defaultSort = useMemo(() => [
    {
      id: 'points', // Sort by points by default as "most successful" metric
      desc: true,
    },
  ], []);

  return (
    <div className="w-full">
      <SortableTable
        columns={columns}
        data={data}
        defaultSort={defaultSort}
        pagination={20}
      />
    </div>
  );
};

export default DriversTable;

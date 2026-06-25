import React, { useMemo } from 'react';
import SortableTable from './SortableTable';

const LinkCell = ({ value }) => (
  <a 
    href={`/constructors/${value}`} 
    className="text-blue-600 hover:text-blue-800 hover:underline"
  >
    Stats
  </a>
);

const ConstructorsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Constructor',
        accessor: 'name',
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
        accessor: 'constructorRef',
        Cell: LinkCell,
        disableSortBy: true,
      },
    ],
    []
  );

  const defaultSort = useMemo(() => [
    {
      id: 'points',
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

export default ConstructorsTable;

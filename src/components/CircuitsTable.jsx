import React, { useMemo } from 'react';
import SortableTable from './SortableTable';
import TeamDisplay from './teamDisplay/TeamDisplay';

// Use TeamDisplay for constructor wins
const TeamCell = ({ value }) => <TeamDisplay teamName={value} />;

const LinkCell = ({ value }) => (
  <a 
    href={`/circuits/${value}`} 
    className="text-blue-600 hover:text-blue-800 hover:underline"
  >
    Circuit Details
  </a>
);

const CircuitsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Total Races',
        accessor: 'raceCount',
        showAt: 'sm',
      },
      {
        Header: 'Most Wins (Driver)',
        accessor: 'mostDriverWins',
        showAt: 'md',
      },
      {
        Header: 'Most Wins (Constructor)',
        accessor: 'mostCostructorWins',
        showAt: 'md',
        Cell: TeamCell,
      },
      {
        Header: 'More Info',
        accessor: 'circuitRef',
        Cell: LinkCell,
      },
    ],
    []
  );

  const defaultSort = useMemo(() => [
    {
      id: 'raceCount',
      desc: true,
    },
  ], []);

  return (
    <div className="w-full">
      <SortableTable
        columns={columns}
        data={data}
        defaultSort={defaultSort}
      />
    </div>
  );
};

export default CircuitsTable;

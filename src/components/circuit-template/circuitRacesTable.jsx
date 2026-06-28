import React, { useMemo } from 'react';
import SortableTable from '../SortableTable';
import TBD from '../TBD';
// We need links. In React we use <a> or simple links because we are in Astro Island mostly.
// But to use internal routing nicely, <a> is fine for MPA.
import TeamDisplay from '../teamDisplay/TeamDisplay';
import DriverLink from '../links/DriverLink.jsx';

const defaultSort = [
  {
    id: 'year',
    desc: true,
  },
];

const CircuitRacesTable = ({ racesByCircuitidList }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Race',
        accessor: 'name',
        showAt: 'lg',
      },
      {
        Header: 'Year',
        accessor: 'year',
        Cell: ({ value }) => (
          <a href={`/seasons/${value}`} className="standard-link hover:underline text-blue-600">
            {value}
          </a>
        ),
      },
      {
        Header: 'Winner (Driver)',
        // Accessor handles nested path? react-table supports dot notation.
        // My query returns flat "winnerDriver".
        accessor: 'winnerDriver',
        showAt: 'sm',
        Cell: ({ value, row }) =>
          value ? (
            <DriverLink name={value} driverRef={row.original.winnerDriverRef} />
          ) : (
            <TBD />
          ),
      },
      {
        Header: 'Winner (Constructor)',
        accessor: 'winnerConstructor',
        showAt: 'md',
        Cell: ({ value }) =>
          value ? <TeamDisplay teamName={value} /> : <TBD />,
      },
      {
        Header: 'More Info',
        // In my query, I should have raceSlug.
        accessor: 'race_slug', 
        // Wait, check db.ts query. "r.*"
        // races table has race_slug column?
        // Let's check schema.
        // schema: race_slug text.
        // My getAllRaces returns race_slug as raceSlug.
        // My getRacesByCircuitId returns "r.*". 
        // Row objects will have "race_slug" or "raceSlug"? Depending on DB driver mapping.
        // Bun's sqlite usually returns column names as is. So "race_slug".
        Cell: ({ row }) => (
           <a href={`/races/${row.original.raceSlug || row.original.race_slug}`} className="standard-link hover:underline text-blue-600">
            Race Details
          </a>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <SortableTable
        columns={columns}
        data={racesByCircuitidList}
        defaultSort={defaultSort}
      />
    </div>
  );
};

export default CircuitRacesTable;

import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { raceType } from '../../types';
import SortableTable from '../sortableTable';
import TBD from '../tbd';
import TeamDisplay from '../teamDisplay/teamDisplay';

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
      },
      {
        Header: 'Winner (Driver)',
        accessor: 'resultsByRaceidList[0].driverByDriverid.driverDisplayName',
        showAt: 'sm',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (value ? <>{value}</> : <TBD />),
      },
      {
        Header: 'Winner (Constructor)',
        accessor: 'resultsByRaceidList[0].constructorTeamByConstructorid.name',
        showAt: 'md',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) =>
          value ? <TeamDisplay teamName={value} /> : <TBD />,
      },
      {
        Header: 'More Info',
        accessor: 'raceSlug',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <Link to={`/races/${value}`} className="standard-link">
            Race Details
          </Link>
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

CircuitRacesTable.propTypes = {
  racesByCircuitidList: PropTypes.arrayOf(raceType).isRequired,
};

export default CircuitRacesTable;

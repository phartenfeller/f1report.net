import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { raceType } from '../../types';
import SortableTable from '../sortableTable';
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
      },
      {
        Header: 'Winner (Constructor)',
        accessor: 'resultsByRaceidList[0].constructorTeamByConstructorid.name',
        showAt: 'md',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <TeamDisplay teamName={value} />,
      },
      {
        Header: 'More Info',
        accessor: 'raceSlug',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <Link to={value} className="standard-link">
            Details
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

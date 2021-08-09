/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import { raceType } from '../types';
import SortableTable from './sortableTable';
import TeamDisplay from './teamDisplay/teamDisplay';
import TBD from './tbd';
import CircuitLink from './links/circuitLink';

const defaultSort = [
  {
    id: 'round',
    desc: false,
  },
];

const RaceDetailsTable = ({ racesByYearList }) => {
  const data = useMemo(
    () =>
      racesByYearList.map(
        ({
          circuitByCircuitid,
          date,
          raceSlug,
          round,
          name,
          resultsByRaceidList,
        }) => ({
          round,
          race: name,
          circuit: {
            name: circuitByCircuitid.name,
            ref: circuitByCircuitid.circuitref,
            location: circuitByCircuitid.location,
            country: circuitByCircuitid.country,
          },
          date,
          raceSlug,
          winnerDriver:
            resultsByRaceidList?.[0]?.driverByDriverid?.driverDisplayName,
          winnerConstructor:
            resultsByRaceidList?.[0]?.constructorTeamByConstructorid?.name,
        })
      ),
    [racesByYearList]
  );

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'round',
      },
      {
        Header: 'Race',
        accessor: 'race',
      },
      {
        Header: 'Circuit',
        accessor: 'circuit',
        showAt: 'sm',
        Cell: ({ value }) => (
          <CircuitLink
            name={value.name}
            circuitref={value.ref}
            location={value.location}
            country={value.country}
          />
        ),
      },
      {
        Header: 'Winner (Driver)',
        accessor: 'winnerDriver',
        showAt: 'lg',
        Cell: ({ value }) => (value ? <>{value}</> : <TBD />),
      },
      {
        Header: 'Winner (Constructor)',
        accessor: 'winnerConstructor',
        showAt: 'lg',
        Cell: ({ value }) =>
          value ? <TeamDisplay teamName={value} /> : <TBD />,
      },
      {
        Header: 'Date',
        accessor: 'date',
        showAt: 'md',
      },
      {
        Header: ' ',
        accessor: 'raceSlug',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <Link to={`/races/${value}`} className="standard-link">
            Details
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <SortableTable columns={columns} data={data} defaultSort={defaultSort} />
    </div>
  );
};

RaceDetailsTable.propTypes = {
  racesByYearList: PropTypes.arrayOf(raceType).isRequired,
};

export default RaceDetailsTable;

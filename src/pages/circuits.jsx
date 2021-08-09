import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Header1 } from '../components/headers';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SortableTable from '../components/sortableTable';
import TeamDisplay from '../components/teamDisplay/teamDisplay';
import { circuitType, constructorType, driverType } from '../types';
import arrayWithValues from '../util/arrayWithValues';

export const query = graphql`
  {
    postgres {
      allCircuitsList {
        circuitref
        name
        country
        circuitstatByCircuitid {
          firstrace
          lastrace
          mostconstructorpodiums
          mostcostructorwins
          mostdriverpodiums
          mostdriverstarts
          mostdriverwins
          racecount
          racecountrank
        }
      }
      allConstructorTeamsList {
        constructorid
        name
      }
      allDriversList {
        driverid
        driverDisplayName
      }
    }
  }
`;

function getFirst(stat) {
  const data = JSON.parse(stat);
  if (!arrayWithValues(data)) {
    return null;
  }

  return data.find(({ rank }) => parseInt(rank) === 1);
}

function getDriver(stat, drivers) {
  const first = getFirst(stat);
  if (!first) {
    return null;
  }

  const driver = drivers.find(
    ({ driverid }) => parseInt(driverid) === parseInt(first.driverId)
  );

  return driver.driverDisplayName;
}

function getConstructor(stat, constructors) {
  const first = getFirst(stat);
  if (!first) {
    return null;
  }

  const constr = constructors.find(
    ({ constructorid }) =>
      parseInt(constructorid) === parseInt(first.constructorid)
  );

  return constr.name;
}

const defaultSort = [
  {
    id: 'racecount',
    desc: true,
  },
];

const Circuits = ({ data }) => {
  const { allCircuitsList, allConstructorTeamsList, allDriversList } =
    data.postgres;

  const tabData = allCircuitsList.map((c) => ({
    name: c.name,
    country: c.country,
    circuitref: c.circuitref,
    racecount: c.circuitstatByCircuitid.racecount,
    mostdriverwins: getDriver(
      c.circuitstatByCircuitid.mostdriverwins,
      allDriversList
    ),
    mostcostructorwins: getConstructor(
      c.circuitstatByCircuitid.mostcostructorwins,
      allConstructorTeamsList
    ),
  }));

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
        accessor: 'racecount',
        showAt: 'sm',
      },
      {
        Header: 'Most Wins (Driver)',
        accessor: 'mostdriverwins',
        showAt: 'md',
      },
      {
        Header: 'Most Wins (Constructor)',
        accessor: 'mostcostructorwins',
        showAt: 'md',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <TeamDisplay teamName={value} />,
      },
      {
        Header: 'More Info',
        accessor: 'circuitref',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <Link to={`/circuits/${value}`} className="standard-link">
            Circuit Details
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <SEO title="Circuits" />
      <Header1>All Circuits</Header1>
      <div className="max-w-4k-limit mx-auto">
        <SortableTable
          columns={columns}
          data={tabData}
          defaultSort={defaultSort}
        />
      </div>
    </Layout>
  );
};

Circuits.propTypes = {
  data: PropTypes.shape({
    postgres: PropTypes.shape({
      allCircuitsList: PropTypes.arrayOf(circuitType).isRequired,
      allConstructorTeamsList: PropTypes.arrayOf(constructorType).isRequired,
      allDriversList: PropTypes.arrayOf(driverType).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Circuits;

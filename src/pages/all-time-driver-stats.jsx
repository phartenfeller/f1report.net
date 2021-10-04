import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import DriverCard from '../components/dataDisplay/DriverCard';
import { LinkableH2 } from '../components/headers';
import Header1 from '../components/headers/header1';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SortableTable from '../components/sortableTable';

export const query = graphql`
  {
    postgres {
      allDriAlltimeStatsList {
        driverid
        points
        driverByDriverid {
          driverDisplayName
        }
        fastestlaps
        podiums
        poles
        seconds
        thirds
        toptens
        undertens
        wins
      }
      allDriAlltimeStatsPreparedsList {
        key
        json
      }
    }
  }
`;

const defaultSort = [
  {
    id: 'points',
    desc: true,
  },
];

const CardStats = ({ allDriAlltimeStatsPreparedsList }) => {
  const data = {};
  allDriAlltimeStatsPreparedsList.forEach(({ key, json }) => {
    data[key] = JSON.parse(json);
  });

  return (
    <div>
      <div>
        <LinkableH2>General</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard list={data.points} accessor="val" header="Most Points" />
          <DriverCard list={data.wins} accessor="val" header="Most Wins" />
          <DriverCard
            list={data.podiums}
            accessor="val"
            header="Most Podiums"
          />
          <DriverCard list={data.poles} accessor="val" header="Most Poles" />
          <DriverCard
            list={data.fastestlaps}
            accessor="val"
            header="Most Fastest Laps"
          />
        </div>
      </div>
      <div>
        <LinkableH2>Finish Position</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard
            list={data.toptens}
            accessor="val"
            header="Most Top 10 Finishes"
          />
          <DriverCard
            list={data.undertens}
            accessor="val"
            header="Most Finishes Out of Top 10"
          />
        </div>
      </div>
      <div>
        <LinkableH2>Average</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard
            list={data.avgPointsPerRace}
            accessor="val"
            header="Best Average Points per Race"
            note="At least 5 races"
          />
          <DriverCard
            list={data.avgGridPosition}
            accessor="val"
            header="Best Average Grid Position"
            note="At least 5 races"
          />
        </div>
      </div>
      <div>
        <LinkableH2>Ratios</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard
            list={data.winratio}
            accessor="val"
            header="Best Win Ratio"
            note="At least 5 races"
          />
          <DriverCard
            list={data.podiumratio}
            accessor="val"
            header="Best Podium Ratio"
            note="At least 5 races"
          />
          <DriverCard
            list={data.toptensratio}
            accessor="val"
            header="Best Top 10 Finishes Ratio"
            note="At least 5 races"
          />
        </div>
      </div>
    </div>
  );
};

const AllTimeDriverStats = ({ data }) => {
  const { allDriAlltimeStatsList, allDriAlltimeStatsPreparedsList } =
    data.postgres;

  const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverByDriverid.driverDisplayName',
        className: 'font-semibold',
        // eslint-disable-next-line react/prop-types
        // Cell: ({ value }) => <span className="font-semibold">{value}</span>,
      },
      {
        Header: 'Points',
        accessor: 'points',
      },
      {
        Header: 'Podiums',
        accessor: 'podiums',
      },
      {
        Header: 'Wins',
        accessor: 'wins',
      },
      {
        Header: 'Seconds',
        accessor: 'seconds',
      },
      {
        Header: 'Thirds',
        accessor: 'thirds',
      },
      {
        Header: 'Top 10s',
        accessor: 'toptens',
      },
      {
        Header: 'Under 10s',
        accessor: 'undertens',
      },
    ],
    []
  );

  return (
    <Layout>
      <SEO title="Races" />
      <Header1>All Time Driver Stats</Header1>

      <div className="my-6">
        <CardStats
          allDriAlltimeStatsPreparedsList={allDriAlltimeStatsPreparedsList}
        />
      </div>

      <div>
        <LinkableH2>Table Stats</LinkableH2>
        <SortableTable
          columns={columns}
          data={allDriAlltimeStatsList}
          defaultSort={defaultSort}
          pagination={30}
        />
      </div>
    </Layout>
  );
};

AllTimeDriverStats.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AllTimeDriverStats;

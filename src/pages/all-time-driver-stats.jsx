import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
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
    }
  }
`;

const defaultSort = [
  {
    id: 'points',
    desc: true,
  },
];

const AllTimeDriverStats = ({ data }) => {
  const allDriAlltimeStatsList = data.postgres.allDriAlltimeStatsList;

  const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverByDriverid.driverDisplayName',
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

      <SortableTable
        columns={columns}
        data={allDriAlltimeStatsList}
        defaultSort={defaultSort}
        pagination={30}
      />
    </Layout>
  );
};

AllTimeDriverStats.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AllTimeDriverStats;

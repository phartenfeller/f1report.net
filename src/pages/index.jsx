import { graphql, Link } from 'gatsby';
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import Infobox from '../components/alerts/infobox';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  {
    postgres {
      allSeasons(last: 1) {
        nodes {
          year
          racesByYearList(orderBy: DATE_DESC) {
            round
            time
            raceSlug
            name
            laptimesByRaceidList(first: 3) {
              driverid
              lap
              position
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const pastRaces = data.postgres.allSeasons.nodes[0].racesByYearList.filter(
    (race) => race.laptimesByRaceidList.length > 0
  );

  const lastRace = pastRaces.sort(
    (a, b) => parseInt(b.round) - parseInt(a.round)
  )[0];

  return (
    <Layout noMarginTop>
      <SEO title="Home" />
      <div className="flex justify-center">
        <div className="bg-white lg:w-2/3 mx-4 shadow">
          <h2 className="pt-6 mb-12 text-center text-3xl font-bold tracking-wide">
            Welcome to F1 Report
          </h2>
          <div className="mx-4 lg:mx-16">
            <div className="mb-12">
              <Infobox text="This site is under active development, more data and analytics will be added soon" />
            </div>
            <div className="prose-lg">
              <p>
                F1 Report offers in-depth data analytics on F1. I am currently
                focusing the development on Race analytics. Head over to the
                <Link to="/races/" className="mx-1 standard-link">
                  Race overview
                </Link>
                and check out some races.
              </p>
              <p>
                This site delivers analytics <b>after a race has happened</b>. I
                do not have access to live data and training data.
              </p>
              <p>
                If you have any feedback or ideas feel free to{' '}
                <a className="standard-link" href="https://hartenfeller.dev">
                  contact me
                </a>
                .
              </p>
            </div>
            <div className="mt-5">
              <Link
                to={`/races/${lastRace.raceSlug}`}
                className="p-6 rounded shadow flex items-center justify-between w-full bg-f1red text-white text-lg tracking-wide font-semibold hover:bg-f1red/[0.65] focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-400"
              >
                Last Race: {lastRace.name}
                <ChevronRightIcon
                  className="h-7 w-7 text-red-200"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="mt-5 mb-8">
              <Link
                to="/races/"
                className="p-6 rounded shadow flex items-center justify-between w-full bg-black text-white text-lg tracking-wide font-semibold hover:bg-gray-800 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-600"
              >
                All Races
                <ChevronRightIcon
                  className="h-7 w-7 text-gray-400"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    postgres: PropTypes.shape({
      allSeasons: PropTypes.shape({
        nodes: PropTypes.arrayOf(
          PropTypes.shape({
            year: PropTypes.string,
            racesByYearList: PropTypes.arrayOf(
              PropTypes.shape({
                round: PropTypes.string,
                time: PropTypes.string,
                raceSlug: PropTypes.string,
                name: PropTypes.string,
                // eslint-disable-next-line react/forbid-prop-types
                laptimesByRaceidList: PropTypes.array,
              })
            ),
          })
        ),
      }),
    }),
  }).isRequired,
};

export default IndexPage;

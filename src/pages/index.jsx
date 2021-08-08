import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Infobox from '../components/alerts/infobox';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkList from '../components/index/LinkList';
import LandingHero from '../components/landingPage/landingHero';

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
    <Layout noMarginTop noHeader noMarginSides noMarginBottom>
      <SEO title="Home" />
      <div className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LandingHero />
          <div className="mt-12">
            <div className="mb-12">
              <Infobox text="This site is under active development, more data and analytics will be added soon" />
            </div>
            <div className="prose-lg">
              <p>
                I can only generate statistics <b>after a race has happened</b>.
                I do not have access to live data and training data.
              </p>
              <p>
                If you have any feedback or ideas feel free to{' '}
                <a className="standard-link" href="https://hartenfeller.dev">
                  contact me
                </a>
                .
              </p>
            </div>
            <div className="mt-5 mb-16 space-y-2">
              <LinkList
                target={`/races/${lastRace.raceSlug}`}
                display={`Last Race: ${lastRace.name}`}
              />
              <LinkList
                target={`/seasons/${data.postgres.allSeasons.nodes[0].year}`}
                display={`Current Season: ${data.postgres.allSeasons.nodes[0].year}`}
              />
              <LinkList target="/races/" display="All Races" />
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

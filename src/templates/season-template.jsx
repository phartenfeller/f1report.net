/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import LinkableH2 from '../components/linkableH2';
import RaceDetailsTable from '../components/raceDetailsTable';
import DriverStandingsBar from '../components/season-template/driverStandingsBar';
import StandingsTable from '../components/season-template/standingTable';
import SEO from '../components/seo';
import TabsContainer from '../components/tabsContainer';

export const query = graphql`
  query seasonData($year: PostGraphile_BigInt!) {
    postgres {
      seasonByYear(year: $year) {
        url
        year
        seasonlastracesByYearList {
          raceByLastraceid {
            driverstandingsByRaceidList(orderBy: POSITION_ASC) {
              position
              points
              wins
              driverid
              driverByDriverid {
                driverDisplayName
              }
            }
            resultsByRaceidList {
              driverid
              constructorTeamByConstructorid {
                name
              }
            }
          }
        }
        racesByYearList(orderBy: DATE_ASC) {
          circuitByCircuitid {
            name
            country
            location
          }
          date
          raceid
          raceSlug
          round
          year
          name
          constructorstandingsByRaceidList {
            position
            constructorTeamByConstructorid {
              name
            }
          }
        }
      }
    }
  }
`;

const SeasonTemplate = ({ data }) => {
  const { seasonByYear } = data.postgres;
  const { url, year, racesByYearList, seasonlastracesByYearList } =
    seasonByYear;

  const { raceByLastraceid } = seasonlastracesByYearList[0];
  const { driverstandingsByRaceidList, resultsByRaceidList } = raceByLastraceid;

  const driverTabs = [
    {
      tabId: 1,
      tabName: 'Table',
      component: (
        <StandingsTable
          standings={driverstandingsByRaceidList}
          resultsByRaceidList={resultsByRaceidList}
        />
      ),
    },
    {
      tabId: 2,
      tabName: 'Bar Chart',
      component: (
        <DriverStandingsBar
          standings={driverstandingsByRaceidList}
          resultsByRaceidList={resultsByRaceidList}
        />
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-wide mb-3">{`${year} Season`}</h1>
      <SEO title={`Season ${year}`} />
      <div>
        <a href={url} className="standard-link">
          Wikipedia Article
        </a>
      </div>
      <div>
        <LinkableH2 text="Driver Standings" />
        <TabsContainer tabs={driverTabs} defaultTabId={1} />
      </div>
      <div>
        <LinkableH2 text="Races" />
        <RaceDetailsTable racesByYearList={racesByYearList} />
      </div>
    </Layout>
  );
};

export default SeasonTemplate;

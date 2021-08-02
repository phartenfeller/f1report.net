/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import RaceDetailsTable from '../components/raceDetailsTable';
import DriverStandingsBar from '../components/season-template/driverStandingsBar';
import DriverPositionBump from '../components/season-template/driverPositionBump';
import DriverProgressStream from '../components/season-template/driverProgressStream';
import DriverStandingsTable from '../components/season-template/driverStandingTable';
import SEO from '../components/seo';
import TabsContainer from '../components/tabsContainer';
import TeamStandingsTable from '../components/season-template/teamStandingTable';
import TeamStandingsBar from '../components/season-template/teamStandingsBar';
import ConstructorProgressStream from '../components/season-template/constructorProgressStream';
import { Header1, LinkableH2 } from '../components/headers';
import ConstructorPositionBump from '../components/season-template/constructorPositionBump';
import arrayWithValues from '../util/arrayWithValues';

export const query = graphql`
  query seasonData($year: PostGraphile_BigInt!) {
    postgres {
      seasonByYear(year: $year) {
        url
        year
        seasondrivermainconsByYearList {
          year
          constructorTeamByConstructorid {
            name
          }
          driverid
          driverByDriverid {
            driverDisplayName
          }
        }
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
            constructorstandingsByRaceidList(orderBy: POSITION_ASC) {
              points
              position
              constructorid
              wins
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
            points
            position
            constructorid
            wins
            constructorTeamByConstructorid {
              name
            }
          }
          driverstandingsByRaceidList {
            driverid
            points
            position
          }
          resultsByRaceidList {
            driverid
            points
          }
        }
      }
    }
  }
`;

const metaTags = ({ driverstandingsByRaceidList, year }) => {
  const meta = [];
  let description;
  let one;
  let two;

  // description
  if (arrayWithValues(driverstandingsByRaceidList)) {
    one = driverstandingsByRaceidList.find((r) => parseInt(r.position) === 1)
      ?.driverByDriverid?.driverDisplayName;
    two = driverstandingsByRaceidList.find((r) => parseInt(r.position) === 2)
      ?.driverByDriverid?.driverDisplayName;
    const third = driverstandingsByRaceidList.find(
      (r) => parseInt(r.position) === 3
    )?.driverByDriverid?.driverDisplayName;
    description = `Results the ${year} season: 1st ${one}, 2nd: ${two}, 3rd ${third}`;
  } else {
    description = `Details of the upcoming season of ${year}`;
  }

  // keywords
  const keywords = {
    name: 'keywords',
    content: `Season, ${year}`,
  };
  if (one) {
    keywords.content += `, ${one}`;
  }
  if (two) {
    keywords.content += `, ${two}`;
  }
  meta.push(keywords);

  return { meta, description };
};

const SeasonTemplate = ({ data }) => {
  const { seasonByYear } = data.postgres;
  const {
    url,
    year,
    racesByYearList,
    seasonlastracesByYearList,
    seasondrivermainconsByYearList,
  } = seasonByYear;

  const { raceByLastraceid } = seasonlastracesByYearList[0];
  const {
    driverstandingsByRaceidList,
    resultsByRaceidList,
    constructorstandingsByRaceidList,
  } = raceByLastraceid;

  const driverTabs = [
    {
      tabId: 1,
      tabName: 'Table',
      component: (
        <DriverStandingsTable
          standings={driverstandingsByRaceidList}
          seasondrivermainconsByYearList={seasondrivermainconsByYearList}
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
    {
      tabId: 3,
      tabName: 'Point Distribution per Race',
      component: (
        <DriverProgressStream
          racesByYearList={racesByYearList}
          seasondrivermainconsByYearList={seasondrivermainconsByYearList}
          driverstandingsByRaceidList={driverstandingsByRaceidList}
        />
      ),
    },
    {
      tabId: 4,
      tabName: 'Position Changes',
      component: (
        <DriverPositionBump
          racesByYearList={racesByYearList}
          seasondrivermainconsByYearList={seasondrivermainconsByYearList}
        />
      ),
    },
  ];

  const constructorTabs = [
    {
      tabId: 1,
      tabName: 'Table',
      component: (
        <TeamStandingsTable teamStandings={constructorstandingsByRaceidList} />
      ),
    },
    {
      tabId: 2,
      tabName: 'Bar Chart',
      component: (
        <TeamStandingsBar teamStandings={constructorstandingsByRaceidList} />
      ),
    },
    {
      tabId: 3,
      tabName: 'Point Distribution per Race',
      component: (
        <ConstructorProgressStream
          racesByYearList={racesByYearList}
          teamStandings={constructorstandingsByRaceidList}
        />
      ),
    },
    {
      tabId: 4,
      tabName: 'Position Changes',
      component: <ConstructorPositionBump racesByYearList={racesByYearList} />,
    },
  ];

  const { meta, description } = metaTags({ driverstandingsByRaceidList, year });

  return (
    <Layout>
      <Header1>{`${year} Season`}</Header1>
      <SEO title={`Season ${year}`} description={description} meta={meta} />
      <div>
        <a href={url} className="standard-link">
          Wikipedia Article
        </a>
      </div>
      <div>
        <LinkableH2>Driver Standings</LinkableH2>
        <TabsContainer tabs={driverTabs} defaultTabId={1} />
      </div>
      <div>
        <LinkableH2>Constructor Standings</LinkableH2>
        <TabsContainer tabs={constructorTabs} defaultTabId={1} />
      </div>
      <div>
        <LinkableH2>Races</LinkableH2>
        <RaceDetailsTable racesByYearList={racesByYearList} />
      </div>
    </Layout>
  );
};

export default SeasonTemplate;

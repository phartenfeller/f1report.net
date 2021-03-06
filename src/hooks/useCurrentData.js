import { graphql, useStaticQuery } from 'gatsby';

const getLastRace = (seasons) => {
  let pastRaces = [];
  try {
    pastRaces = seasons[0].racesByYearList.filter(
      (race) => race.laptimesByRaceidList.length > 0
    );

    // no race has yet taken place in new season, check last race of last season
    if (pastRaces.length === 0) {
      pastRaces = seasons[1].racesByYearList.filter(
        (race) => race.laptimesByRaceidList.length > 0
      );
    }

    const lastRace = pastRaces.sort(
      (a, b) => parseInt(b.round) - parseInt(a.round)
    )[0];

    return lastRace;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Could not get last race`, err);
    return null;
  }
};

const getNextRace = (seasons) => {
  try {
    const futureRaces = seasons[0].racesByYearList.filter(
      (race) => race.laptimesByRaceidList.length === 0
    );

    const nextRace = futureRaces.sort(
      (a, b) => parseInt(a.round) - parseInt(b.round)
    )[0];
    return nextRace;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Could not get next race`, err);
    return null;
  }
};

function getDriverStandings(seasons) {
  return seasons?.[0]?.seasonlastracesByYearList?.[0]?.raceByLastraceid
    ?.driverstandingsByRaceidList;
}

function getConstructorStandings(seasons) {
  return seasons?.[0]?.seasonlastracesByYearList?.[0]?.raceByLastraceid
    ?.constructorstandingsByRaceidList;
}

export default () => {
  const data = useStaticQuery(graphql`
    {
      postgres {
        allSeasons(last: 2) {
          nodes {
            year
            racesByYearList(orderBy: DATE_DESC) {
              year
              round
              time
              raceSlug
              name
              circuitByCircuitid {
                name
                location
                country
                circuitref
              }
              laptimesByRaceidList(first: 3) {
                driverid
                lap
                position
              }
              fp1Date
              date
              qualiDate
              sprintDate
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
          }
        }
      }
    }
  `);

  // highest year is with index 0
  const seasons = data.postgres.allSeasons.nodes.sort(
    (a, b) => b.year - a.year
  );

  const lastRace = getLastRace(seasons);
  const nextRace = getNextRace(seasons);
  const driverStandings = getDriverStandings(seasons);
  const constructorStandings = getConstructorStandings(seasons);
  const getCurrentYear = () => seasons[0].year;

  return {
    lastRace,
    nextRace,
    currentSeason: data.postgres.allSeasons.nodes[0].year,
    driverStandings,
    constructorStandings,
    getCurrentYear,
  };
};

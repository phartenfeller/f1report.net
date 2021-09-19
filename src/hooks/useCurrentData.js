import { graphql, useStaticQuery } from 'gatsby';

const getLastRace = (data) => {
  try {
    const pastRaces = data.postgres.allSeasons.nodes[0].racesByYearList.filter(
      (race) => race.laptimesByRaceidList.length > 0
    );

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

const getNextRace = (data) => {
  try {
    const futureRaces =
      data.postgres.allSeasons.nodes[0].racesByYearList.filter(
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

export default () => {
  const data = useStaticQuery(graphql`
    {
      postgres {
        allSeasons(last: 1) {
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
            }
          }
        }
      }
    }
  `);

  const lastRace = getLastRace(data);
  const nextRace = getNextRace(data);

  return {
    lastRace,
    nextRace,
    currentSeason: data.postgres.allSeasons.nodes[0].year,
  };
};

import { graphql, useStaticQuery } from 'gatsby';

const seasonMap = new Map();

const useRaceHistory = () => {
  const data = useStaticQuery(graphql`
    {
      postgres {
        allSeasons {
          nodes {
            year
            racesByYearList(orderBy: DATE_ASC) {
              raceid
              year
              round
              time
              raceSlug
              name
            }
          }
        }
      }
    }
  `);

  data.postgres.allSeasons.nodes.forEach((season) => {
    seasonMap.set(season.year, season);
  });

  const getPreviousAndNextRaceLink = ({ year, raceid }) => {
    const ret = { previous: null, next: null };
    if (!year) return ret;

    if (!seasonMap.has(year)) {
      console.error(`useRaceHistory: cannot season ${year}`);
      return ret;
    }
    const { racesByYearList } = seasonMap.get(year);
    const idx = racesByYearList.findIndex((r) => r.raceid === raceid);

    if (!idx && idx !== 0) {
      console.error(
        `useRaceHistory: cannot find raceid ${raceid} in season ${year}`,
        racesByYearList
      );
      return ret;
    }

    if (idx !== 0) {
      ret.previous = `/races/${racesByYearList[idx - 1].raceSlug}`;
    }

    if (idx !== racesByYearList.length - 1) {
      ret.next = `/races/${racesByYearList[idx + 1].raceSlug}`;
    }

    return ret;
  };

  return { getPreviousAndNextRaceLink };
};

export default useRaceHistory;

/* eslint-disable no-console */
import { graphql, useStaticQuery } from 'gatsby';
import getTeamColor from '../util/f1TeamColors';

function getConstructorAndSeason(data) {
  return (driverid, year) => {
    const yearData = data.find(
      (d) => parseInt(d.year) === parseInt(year)
    ).seasondrivermainconsByYearList;

    if (!yearData) {
      console.warn(`useDriverConsturctors: cannot find year ${year}`);
      return null;
    }

    const driverData = yearData.find(
      (d) => parseInt(d.driverid) === parseInt(driverid)
    );

    if (!driverData) {
      console.warn(
        `useDriverConsturctors: cannot find driver ${driverid} (in year ${year})`
      );
      return null;
    }

    return {
      constructor: driverData.constructorTeamByConstructorid.name,
      color: getTeamColor(driverData.constructorTeamByConstructorid.name),
    };
  };
}

const useDriverConsturctors = () => {
  const data = useStaticQuery(graphql`
    {
      postgres {
        allSeasons {
          nodes {
            year
            seasondrivermainconsByYearList {
              constructorTeamByConstructorid {
                name
              }
              driverid
              driverByDriverid {
                driverDisplayName
              }
            }
          }
        }
      }
    }
  `);

  const getConsturctor = getConstructorAndSeason(
    data.postgres.allSeasons.nodes
  );

  return {
    getConstructor: getConsturctor,
  };
};

export default useDriverConsturctors;

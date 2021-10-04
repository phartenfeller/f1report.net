import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    {
      postgres {
        allDriversList {
          driverid
          driverDisplayName
          nationality
          number
          surname
          forename
        }
      }
    }
  `);

  const getDriver = (desiredId) =>
    data.postgres.allDriversList.find(
      (d) => parseInt(d.driverid) === parseInt(desiredId)
    );

  return {
    getDriver,
    allDrivers: data.postgres.allDriversList,
  };
};

import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';

const useDriverIndex = () => {
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(
      () =>
        data.postgres.allDriversList.find(
          (d) => parseInt(d.driverid) === parseInt(desiredId)
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [desiredId, data.postgres.allDriversList]
    );

  return {
    getDriver,
    allDrivers: data.postgres.allDriversList,
  };
};

export default useDriverIndex;

import React from 'react';
import { Link } from 'gatsby';
import useCurrentData from '../../hooks/useCurrentData';
import useDriverConsturctors from '../../hooks/useDriverConsturctors';

const LpDriverStandings = () => {
  const { driverStandings, getCurrentYear } = useCurrentData();
  const { getConstructor } = useDriverConsturctors();

  const year = getCurrentYear();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-xl font-semibold tracking-wide text-zinc-900">
          Driver Standings
        </h2>
        <Link
          className="standard-link font-light uppercase"
          to={`/seasons/${year}#driver-standings/`}
        >
          more
        </Link>
      </div>
      {driverStandings && driverStandings.length && driverStandings.length > 0 && (
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border-2 border-zinc-300/50 sm:rounded-lg">
            <div className="overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-100">
                  <tr>
                    <th scope="col" className="c-table-heading">
                      #
                    </th>
                    <th scope="col" className="c-table-heading">
                      Driver
                    </th>
                    <th scope="col" className="c-table-heading text-right">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {driverStandings
                    .slice(0, 10)
                    .map(
                      ({ position, points, driverByDriverid, driverid }, i) => {
                        const { color, constructor } = getConstructor(
                          driverid,
                          year
                        );

                        return (
                          <tr
                            key={driverid}
                            className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}
                          >
                            <td className="c-table-cell font-medium">
                              {position}
                            </td>
                            <td className="c-table-cell flex font-medium">
                              <div
                                title={constructor}
                                aria-hidden="true"
                                className="mr-2 h-4 w-4 rounded-full"
                                style={{
                                  background: color,
                                }}
                              />
                              <span>{driverByDriverid.driverDisplayName}</span>
                            </td>
                            <td className="c-table-cell text-right font-medium">
                              {points}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

LpDriverStandings.propTypes = {};

export default LpDriverStandings;

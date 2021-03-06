import React from 'react';
import { Link } from 'gatsby';
import useCurrentData from '../../hooks/useCurrentData';
import getTeamColor from '../../util/f1TeamColors';

const LpTeamStandings = () => {
  const { constructorStandings, getCurrentYear } = useCurrentData();

  const year = getCurrentYear();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-xl font-semibold tracking-wide text-zinc-900">
          Constructor Standings
        </h2>
        <Link
          className="standard-link font-light uppercase"
          to={`/seasons/${year}#constructor-standings`}
          title="Constructor Standings Insights"
        >
          more
          <span className="sr-only">Constructor Standings Insights</span>
        </Link>
      </div>
      {constructorStandings &&
        constructorStandings.length &&
        constructorStandings.length > 0 && (
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
                    {constructorStandings
                      .slice(0, 10)
                      .map(
                        (
                          {
                            position,
                            points,
                            constructorTeamByConstructorid,
                            constructorid,
                          },
                          i
                        ) => {
                          const color = getTeamColor(
                            constructorTeamByConstructorid?.name
                          );
                          return (
                            <tr
                              key={constructorid}
                              className={
                                i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'
                              }
                            >
                              <td className="c-table-cell font-medium">
                                {position}
                              </td>
                              <td className="c-table-cell flex font-medium">
                                <div
                                  aria-hidden="true"
                                  className="mr-2 h-4 w-4 rounded-full"
                                  style={{
                                    background: color,
                                  }}
                                />
                                <span>
                                  {constructorTeamByConstructorid?.name}
                                </span>
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

LpTeamStandings.propTypes = {};

export default LpTeamStandings;

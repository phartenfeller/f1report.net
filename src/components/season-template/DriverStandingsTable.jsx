import React from 'react';
import TeamDisplay from '../teamDisplay/DriverTeamDisplay';

const DriverStandingsTable = ({
  standings,
  seasondrivermainconsByYearList,
}) => (
  <div className="overflow-x-auto -mx-4 sm:mx-0">
    <table className="min-w-full text-left text-sm whitespace-nowrap">
      <thead className="uppercase tracking-wider border-b-2 border-slate-100">
        <tr>
          <th scope="col" className="px-4 py-3 font-semibold text-slate-500">
            #
          </th>
          <th scope="col" className="px-4 py-3 font-semibold text-slate-500">
            Driver
          </th>
          <th scope="col" className="hidden px-4 py-3 font-semibold text-slate-500 md:table-cell">
            Team
          </th>
          <th scope="col" className="hidden px-4 py-3 font-semibold text-slate-500 lg:table-cell">
            Wins
          </th>
          <th scope="col" className="px-4 py-3 font-semibold text-slate-500 text-right">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {standings.map((s, i) => (
          <tr key={s.driverId}>
            <td className="px-4 py-4 font-medium tabular-nums text-slate-900">{s.position}</td>
            <td className="px-4 py-4 font-medium text-slate-900">
              {s.driverDisplayName}
            </td>
            <td className="hidden px-4 py-4 md:table-cell text-slate-600">
              <TeamDisplay
                driverId={s.driverId}
                seasondrivermainconsByYearList={seasondrivermainconsByYearList}
              />
            </td>
            <td className="hidden px-4 py-4 lg:table-cell tabular-nums text-slate-600">{s.wins}</td>
            <td className="px-4 py-4 text-right font-bold tabular-nums text-slate-900 pr-4">
              {s.points}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DriverStandingsTable;

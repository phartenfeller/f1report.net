import React from 'react';
import TeamDisplay from '../teamDisplay/TeamDisplay';

const TeamStandingsTable = ({ teamStandings }) => (
  <div className="overflow-x-auto -mx-4 sm:mx-0">
    <table className="min-w-full text-left text-sm whitespace-nowrap">
      <thead className="uppercase tracking-wider border-b-2 border-slate-100">
        <tr>
          <th scope="col" className="px-4 py-3 font-semibold text-slate-500">
            #
          </th>
          <th scope="col" className="px-4 py-3 font-semibold text-slate-500">
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
        {teamStandings.map((s, i) => (
          <tr key={s.constructorId}>
            <td className="px-4 py-4 font-medium tabular-nums text-slate-900">{s.position}</td>
            <td className="hidden px-4 py-4 md:table-cell text-slate-900">
              <TeamDisplay teamName={s.name} />
            </td>
            <td className="hidden px-4 py-4 lg:table-cell tabular-nums text-slate-600">{s.wins}</td>
            <td className="px-4 py-4 text-right font-bold tabular-nums text-slate-900 pr-4 ">
              {s.points}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TeamStandingsTable;

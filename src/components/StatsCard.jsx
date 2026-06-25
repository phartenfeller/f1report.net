import React from 'react';

const CardRank = ({ rank, name, value, last, color }) => {
  let rankText = `${rank}th`;
  let rankClass = "other-rank-styles";

  if (rank === 1) {
    rankText = "1st";
    rankClass = "first-styles";
  } else if (rank === 2) {
    rankText = "2nd";
    rankClass = "second-styles";
  } else if (rank === 3) {
    rankText = "3rd";
    rankClass = "third-styles";
  }

  return (
    <li className="list-none">
      <dl className={`grid grid-cols-3 py-2 items-center ${!last ? "border-b border-zinc-200" : ""}`}>
        <span className={rankClass}>{rankText}</span>
        <div className="flex items-center space-x-2">
             {color && (
               <span 
                 className="w-3 h-3 rounded-full flex-shrink-0" 
                 style={{ backgroundColor: color }}
                 title="Legacy Team"
                />
             )}
          <dt className="text-slate-600 truncate">{name}</dt>
        </div>
        <dd className="text-slate-700 text-lg font-semibold text-right">
          {value}
        </dd>
      </dl>
    </li>
  );
};

export default function StatsCard({ list, accessor, header, note }) {
  if (!list || list.length === 0) return null;

  // Sort by rank if available, otherwise assume sorted? 
  // DriverCard.astro sorts by rank.
  // The prepared stats likely have rank.
  // When merging, we need to re-rank.
  
  const displayList = list.slice(0, 5); // Show top 5

  return (
    <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6 text-slate-900">
      <h3 className="font-bold text-xl mb-6 tracking-wide text-zinc-900">
        {header}
      </h3>
      <ol className="m-0 p-0">
        {displayList.map((p, i) => (
          <CardRank
            key={`${p.name}-${i}`}
            rank={i + 1}
            name={p.driverDisplayName || p.name}
            value={p[accessor]}
            color={p.legacy_color}
            last={i === displayList.length - 1}
          />
        ))}
      </ol>
      {note && <div className="mt-3 text-zinc-500 font-light text-sm">* {note}</div>}
    </div>
  );
}

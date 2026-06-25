import React, { useState, useMemo } from 'react';
import AllTimeConstructorStatsTable from './AllTimeConstructorStatsTable';
import StatsCard from './StatsCard';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ConstructorStatsView({ 
  stats, 
  legacyStats, 
  preparedStats, 
  legacyPreparedStats 
}) {
  const [includeLegacy, setIncludeLegacy] = useState(false);

  // Merge Table Data
  const tableData = useMemo(() => {
    let data = [...stats];
    if (includeLegacy) {
      data = [...data, ...legacyStats];
      // Sort? The table sorts itself. But initially it might be mixed.
    }
    return data;
  }, [stats, legacyStats, includeLegacy]);

  // Merge Card Data
  const cardData = useMemo(() => {
    // Create lookups
    const nameMap = new Map();
    const colorMap = new Map();

    stats.forEach(s => {
        // Handle both casing just in case
        const id = s.constructorId || s.constructorid;
        if (id) nameMap.set(id, s.name);
    });

    legacyStats.forEach(s => {
        const id = s.legacy_id;
        if (id) {
             nameMap.set(`leg_${id}`, s.name);
             colorMap.set(`leg_${id}`, s.legacy_color);
        }
    });

    // Helper to parse if string
    const parse = (items) => {
        if (!items) return {};
        const res = {};
        items.forEach(item => {
            try {
                res[item.key] = typeof item.json === 'string' ? JSON.parse(item.json) : item.json;
            } catch (e) {
                console.error("Error parsing stats", e);
            }
        });
        return res;
    };

    const std = parse(preparedStats);
    const leg = parse(legacyPreparedStats);

    const keys = Object.keys(std);
    const result = {};

    keys.forEach(key => {
        let list = (std[key] || []).map(p => ({
            ...p,
            name: nameMap.get(p.constructorId) || 'Unknown',
            // Standard teams don't have legacy_color
        }));

        if (includeLegacy && leg[key]) {
             const legacyList = (leg[key] || []).map(p => ({
                ...p,
                name: nameMap.get(`leg_${p.legacy_id}`) || 'Unknown',
                legacy_color: colorMap.get(`leg_${p.legacy_id}`)
             }));
            
            // Merge and sort
            list = [...list, ...legacyList];
            // Sort descending by value
            list.sort((a, b) => (b.val || 0) - (a.val || 0));
        }
        result[key] = list;
    });

    return result;
  }, [preparedStats, legacyPreparedStats, includeLegacy, stats, legacyStats]);

  return (
    <div className='space-y-12'>
      
      {/* Toggle */}
      <div className="flex items-center justify-end space-x-4">
        <span className={`text-sm font-medium ${includeLegacy ? 'text-zinc-900' : 'text-zinc-500'}`}>
           Include Legacy Teams
        </span>
        <Switch
            checked={includeLegacy}
            onChange={setIncludeLegacy}
            className={classNames(
                includeLegacy ? 'bg-indigo-600' : 'bg-zinc-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
            >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={classNames(
                includeLegacy ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
      </div>

       {/* General */}
      <div>
        <h2 id="general" className="text-2xl font-bold text-zinc-900 group flex items-center mb-4">
            <a href="#general" className='hover:no-underline underline decoration-zinc-300 underline-offset-4'>General</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12 mt-4">
          <StatsCard list={cardData.points} accessor="val" header="Most Points" />
          <StatsCard list={cardData.wins} accessor="val" header="Most Wins" />
          <StatsCard list={cardData.podiums} accessor="val" header="Most Podiums" />
          <StatsCard list={cardData.poles} accessor="val" header="Most Poles" />
          <StatsCard list={cardData.fastestlaps} accessor="val" header="Most Fastest Laps" />
        </div>
      </div>

      {/* Finish Position */}
      <div>
        <h2 id="finish-position" className="text-2xl font-bold text-zinc-900 group flex items-center mb-4">
             <a href="#finish-position" className='hover:no-underline underline decoration-zinc-300 underline-offset-4'>Finish Position</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12 mt-4">
           <StatsCard list={cardData.toptens} accessor="val" header="Most Top 10 Finishes" />
           <StatsCard list={cardData.undertens} accessor="val" header="Most Finishes Out of Top 10" />
        </div>
      </div>

      {/* Average */}
      <div>
        <h2 id="average" className="text-2xl font-bold text-zinc-900 group flex items-center mb-4">
             <a href="#average" className='hover:no-underline underline decoration-zinc-300 underline-offset-4'>Average</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12 mt-4">
          <StatsCard list={cardData.avgPointsPerRace} accessor="val" header="Best Average Points per Race" note="At least 5 races" />
          <StatsCard list={cardData.avgGridPosition} accessor="val" header="Best Average Grid Position" note="At least 5 races" />
        </div>
      </div>

      {/* Ratios */}
      <div>
        <h2 id="ratios" className="text-2xl font-bold text-zinc-900 group flex items-center mb-4">
            <a href="#ratios" className='hover:no-underline underline decoration-zinc-300 underline-offset-4'>Ratios</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12 mt-4">
          <StatsCard list={cardData.winratio} accessor="val" header="Best Win Ratio" note="At least 5 races" />
          <StatsCard list={cardData.podiumratio} accessor="val" header="Best Podium Ratio" note="At least 5 races" />
          <StatsCard list={cardData.toptensratio} accessor="val" header="Best Top 10 Finishes Ratio" note="At least 5 races" />
        </div>
      </div>

      <div className="mt-12">
        <h2 id="table-stats" className="text-2xl font-bold text-zinc-900 group flex items-center mb-4">
             <a href="#table-stats" className='hover:no-underline underline decoration-zinc-300 underline-offset-4'>Table Stats</a>
        </h2>
        <div className="mt-4">
          <AllTimeConstructorStatsTable data={tableData} />
        </div>
      </div>

    </div>
  );
}

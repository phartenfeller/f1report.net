import React, { useMemo, useState } from 'react';
import SortableTable from './SortableTable';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/20/solid'; // Updated import for v2

const ColumnSelector = ({ selected, setSelected, columns }) => {
  const handleCheckbox = (e) => {
    const accessor = e.target.dataset.value;

    if (!e.target.checked) {
      setSelected(selected.filter((c) => c !== accessor));
    } else {
      setSelected([...selected, accessor]);
    }
  };

  return (
    <Disclosure as="section" aria-labelledby="filter-heading" className="">
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>
      <div className="relative py-4">
        <div className="max-w-7xl flex space-x-6 divide-x divide-zinc-200 text-sm">
          <div>
            <DisclosureButton className="pr-2 py-1 rounded group text-zinc-500 hover:text-zinc-700 font-medium flex items-center select-none focus:outline-none focus:ring-1 focus:ring-blue-300">
              <FunnelIcon
                className="flex-none w-5 h-5 mr-2 text-zinc-300 group-hover:text-zinc-400"
                aria-hidden="true"
              />
              {selected.length} Columns selected
            </DisclosureButton>
          </div>
        </div>
      </div>
      <DisclosurePanel className="mb-8 p-4 rounded-lg bg-zinc-50 text-slate-800 max-w-5xl text-sm border-2 border-dashed border-zinc-300">
        <div className="">
          <fieldset>
            <legend className="block font-medium">Displayed Columns</legend>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-cols-max gap-y-5 pt-6 sm:pt-4 ">
              {columns.map(({ Header, accessor }) => (
                <div
                  key={Header}
                  className="flex items-center text-sm md:text-base sm:text-sm mr-5"
                >
                  <input
                    id={`price-${accessor}`}
                    name={Header}
                    type="checkbox"
                    className="flex-shrink-0 h-4 w-4 border-zinc-300 rounded text-red-600 focus:ring-red-300"
                    checked={selected.includes(accessor)}
                    onChange={handleCheckbox}
                    data-value={accessor}
                  />
                  <label
                    htmlFor={`price-${accessor}`}
                    className="ml-3 min-w-0 flex-1 text-zinc-600 select-none"
                  >
                    {Header}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default function AllTimeStatsTable({ data }) {
    const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverDisplayName',
        className: 'font-semibold',
      },
      {
        Header: 'Points',
        accessor: 'points',
      },
      {
        Header: 'Races',
        accessor: 'races',
      },
      {
        Header: 'Podiums',
        accessor: 'podiums',
      },
      {
        Header: 'Wins',
        accessor: 'wins',
      },
      {
        Header: 'Seconds',
        accessor: 'seconds',
      },
      {
        Header: 'Thirds',
        accessor: 'thirds',
      },
      {
        Header: 'Top 10s',
        accessor: 'toptens',
      },
      {
        Header: 'Under 10s',
        accessor: 'undertens',
      },
      {
        Header: 'Avg Grid Pos',
        accessor: 'avggridposition',
      },
      {
        Header: 'Avg Points per Race',
        accessor: 'avgpointsperrace',
      },
      {
        Header: 'Podium Ratio',
        accessor: 'podiumratio',
      },
      {
        Header: 'Top 10s Ratio',
        accessor: 'toptensratio',
      },
      {
        Header: 'Win Ratio',
        accessor: 'winratio',
      },
    ],
    []
  );

  // Default selection matching original
  const [selected, setSelected] = useState([
      'driverDisplayName', 'points', 'races', 'podiums', 'wins', 'seconds', 'thirds', 'toptens', 'undertens'
  ]);

  const filteredColumns = columns.filter((c) => selected.includes(c.accessor));

  const defaultSort = useMemo(() => [
      {
        id: 'points',
        desc: true,
      },
    ], []);

    return (
        <div>
            <ColumnSelector
                columns={columns}
                selected={selected}
                setSelected={setSelected}
            />
             <SortableTable
                columns={filteredColumns}
                data={data}
                defaultSort={defaultSort}
                pagination={30}
            />
        </div>
    )
}

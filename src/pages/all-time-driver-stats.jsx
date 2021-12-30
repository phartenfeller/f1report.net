/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { FilterIcon } from '@heroicons/react/solid';
import DriverCard from '../components/dataDisplay/DriverCard';
import { LinkableH2 } from '../components/headers';
import Header1 from '../components/headers/header1';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SortableTable from '../components/sortableTable';
import {
  allDriAlltimeStatsListType,
  allDriAlltimeStatsPreparedListType,
} from '../types';
import useDriverIndex from '../hooks/useDriverIndex';
import useScreenWidth from '../hooks/useScreenWidth';

export const query = graphql`
  {
    postgres {
      allDriAlltimeStatsList {
        driverid
        points
        fastestlaps
        podiums
        poles
        seconds
        thirds
        toptens
        undertens
        wins
        races
        avggridposition
        avgpointsperrace
        podiumratio
        toptensratio
        winratio
      }
      allDriAlltimeStatsPreparedsList {
        key
        json
      }
    }
  }
`;

const defaultSort = [
  {
    id: 'points',
    desc: true,
  },
];

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
            <Disclosure.Button className="pr-2 py-1 rounded group text-zinc-500 hover:text-zinc-700 font-medium flex items-center select-none focus:outline-none focus:ring-1 focus:ring-blue-300">
              <FilterIcon
                className="flex-none w-5 h-5 mr-2 text-zinc-300 group-hover:text-zinc-400"
                aria-hidden="true"
              />
              {selected.length} Columns selected
            </Disclosure.Button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="mb-8 p-4 rounded-lg bg-zinc-50 max-w-5xl text-sm border-2 border-dashed border-zinc-300">
        <div className="">
          <fieldset>
            <legend className="block font-medium">Displayed Columns</legend>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-cols-max gap-y-5 pt-6 sm:pt-4 ">
              {columns.map(({ Header, accessor }) => (
                <div
                  key={Header}
                  className="flex items-center text-sm md:text-base sm:text-sm mr-5"
                >
                  <input
                    id={`price-${accessor}`}
                    name={Header}
                    // defaultValue={option.value}
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
      </Disclosure.Panel>
    </Disclosure>
  );
};

const CardStats = ({ allDriAlltimeStatsPreparedsList }) => {
  const data = {};
  allDriAlltimeStatsPreparedsList.forEach(({ key, json }) => {
    data[key] = JSON.parse(json);
  });

  return (
    <div>
      <div>
        <LinkableH2>General</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard list={data.points} accessor="val" header="Most Points" />
          <DriverCard list={data.wins} accessor="val" header="Most Wins" />
          <DriverCard
            list={data.podiums}
            accessor="val"
            header="Most Podiums"
          />
          <DriverCard list={data.poles} accessor="val" header="Most Poles" />
          <DriverCard
            list={data.fastestlaps}
            accessor="val"
            header="Most Fastest Laps"
          />
        </div>
      </div>
      <div>
        <LinkableH2>Finish Position</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard
            list={data.toptens}
            accessor="val"
            header="Most Top 10 Finishes"
          />
          <DriverCard
            list={data.undertens}
            accessor="val"
            header="Most Finishes Out of Top 10"
          />
        </div>
      </div>
      <div>
        <LinkableH2>Average</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard
            list={data.avgPointsPerRace}
            accessor="val"
            header="Best Average Points per Race"
            note="At least 5 races"
          />
          <DriverCard
            list={data.avgGridPosition}
            accessor="val"
            header="Best Average Grid Position"
            note="At least 5 races"
          />
        </div>
      </div>
      <div>
        <LinkableH2>Ratios</LinkableH2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
          <DriverCard
            list={data.winratio}
            accessor="val"
            header="Best Win Ratio"
            note="At least 5 races"
          />
          <DriverCard
            list={data.podiumratio}
            accessor="val"
            header="Best Podium Ratio"
            note="At least 5 races"
          />
          <DriverCard
            list={data.toptensratio}
            accessor="val"
            header="Best Top 10 Finishes Ratio"
            note="At least 5 races"
          />
        </div>
      </div>
    </div>
  );
};

CardStats.propTypes = {
  allDriAlltimeStatsPreparedsList: PropTypes.arrayOf(
    allDriAlltimeStatsPreparedListType
  ).isRequired,
};

const AllTimeDriverStats = ({ data }) => {
  const { allDriAlltimeStatsList, allDriAlltimeStatsPreparedsList } =
    data.postgres;

  const driverIndex = useDriverIndex();

  const tableStats = allDriAlltimeStatsList.map((obj) => {
    const nObj = obj;
    nObj.driverDisplayName = driverIndex.getDriver(
      obj.driverid
    ).driverDisplayName;
    return nObj;
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Driver',
        accessor: 'driverDisplayName',
        className: 'font-semibold',
        // eslint-disable-next-line react/prop-types
        // Cell: ({ value }) => <span className="font-semibold">{value}</span>,
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

  const screenWidth = useScreenWidth();
  const getDefaultSelectedCount = () => {
    if (screenWidth < 600) {
      return 4;
    } else if (screenWidth < 900) {
      return 6;
    } else {
      return 9;
    }
  };

  const [selected, setSelected] = useState(
    columns
      .map((c) => c.accessor)
      .filter((c, i) => i < getDefaultSelectedCount())
  );

  const filteredColumns = columns.filter((c) => selected.includes(c.accessor));

  return (
    <Layout>
      <SEO title="Races" />
      <Header1>All Time Driver Stats</Header1>

      <div className="text-zinc-600">
        * all points are calculated after todays rules.
      </div>

      <div className="my-6">
        <CardStats
          allDriAlltimeStatsPreparedsList={allDriAlltimeStatsPreparedsList}
        />
      </div>

      <div>
        <LinkableH2>Table Stats</LinkableH2>
        <ColumnSelector
          columns={columns}
          selected={selected}
          setSelected={setSelected}
        />

        <SortableTable
          columns={filteredColumns}
          data={tableStats}
          defaultSort={defaultSort}
          pagination={30}
        />
      </div>
    </Layout>
  );
};

AllTimeDriverStats.propTypes = {
  data: PropTypes.shape({
    postgres: PropTypes.shape({
      allDriAlltimeStatsList: PropTypes.arrayOf(allDriAlltimeStatsListType)
        .isRequired,
      allDriAlltimeStatsPreparedsList: PropTypes.arrayOf(
        allDriAlltimeStatsPreparedListType
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AllTimeDriverStats;

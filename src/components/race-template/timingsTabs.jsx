import React, { useState } from 'react';
import allAvgLapTimesType from '../../types/allAvgLapTimesType';
import AvgTimingsBar from './avgTimingsBar';

const AVG = 'Average Lap Times';
const MEDIAN = 'Median Lap Times';
const TOP70 = 'Average Top 70% Laps';

const tabs = [AVG, MEDIAN, TOP70];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TimingsTabs = ({ allAvgLapTimes, allAvgLapTimesTop70Pct }) => {
  const [active, setActive] = useState(AVG);

  return (
    <div>
      <div className="">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActive(tab)}
                className={classNames(
                  tab === active
                    ? 'border-red-400 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring-1 focus:ring-red-300'
                )}
                aria-current={tab === active ? 'page' : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {active === AVG && (
        <AvgTimingsBar
          allAvgLapTimes={allAvgLapTimes}
          mode="avg"
          desc={AVG}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
        />
      )}
      {active === MEDIAN && (
        <AvgTimingsBar
          allAvgLapTimes={allAvgLapTimes}
          mode="median"
          desc={MEDIAN}
          annotations={[
            'of the drivers which finished',
            'without extreme laps (time < 1.5 * fastest lap)',
          ]}
        />
      )}
      {active === TOP70 && (
        <AvgTimingsBar
          allAvgLapTimes={allAvgLapTimesTop70Pct}
          mode="avg"
          desc={TOP70}
          annotations={[
            // eslint-disable-next-line dot-notation
            `of the drivers who drove ${allAvgLapTimesTop70Pct.nodes[0]['relevant_lap_count']} Laps`,
          ]}
        />
      )}
    </div>
  );
};

TimingsTabs.propTypes = {
  allAvgLapTimes: allAvgLapTimesType.isRequired,
  allAvgLapTimesTop70Pct: allAvgLapTimesType.isRequired,
};

export default TimingsTabs;

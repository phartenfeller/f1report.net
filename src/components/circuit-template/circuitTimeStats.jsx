import PropTypes from 'prop-types';
import React from 'react';

const CircuitTimeStats = ({
  firstrace,
  lastrace,
  racecount,
  racecountrank,
}) => (
  <dl className="mt-5 grid grid-cols-1 gap-5 xl:gap-12 sm:grid-cols-3">
    <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">First Race</dt>
      <dd className="mt-1 font-yrsa text-5xl font-semibold text-gray-900">
        {firstrace}
      </dd>
    </div>

    <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">Last Race</dt>
      <dd className="mt-1 font-yrsa text-5xl font-semibold text-gray-900">
        {lastrace}
      </dd>
    </div>

    <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">
        Total Races
      </dt>
      <dd className="mt-1">
        <span className="font-yrsa text-5xl font-semibold text-gray-900">
          {racecount}
        </span>
        <span className="ml-3 font-light text-lg text-blueGray-600">{`(rank ${racecountrank})`}</span>
      </dd>
    </div>
  </dl>
);

CircuitTimeStats.propTypes = {
  firstrace: PropTypes.string.isRequired,
  lastrace: PropTypes.string.isRequired,
  racecount: PropTypes.string.isRequired,
  racecountrank: PropTypes.string.isRequired,
};

export default CircuitTimeStats;

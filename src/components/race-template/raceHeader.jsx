import PropTypes from 'prop-types';
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'gatsby';
import useRaceHistory from '../../hooks/useRaceHistory';

const NavigationButton = ({}) => {};

const linkClasses =
  'rounded-md border border-slate-300/75 px-3 py-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 ';
const disabledButtonClasses =
  'cursor-not-allowed rounded-md border border-slate-100 px-3 py-2 text-slate-200';

const RaceNavigationButtons = ({ year, raceid }) => {
  const { getPreviousAndNextRaceLink } = useRaceHistory();
  const { previous, next } = getPreviousAndNextRaceLink({
    year,
    raceid,
  });

  return (
    <div className="flex space-x-1">
      {previous ? (
        <Link to={previous} className={linkClasses}>
          <ChevronLeftIcon
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <button disabled className={disabledButtonClasses}>
          <ChevronLeftIcon
            className="h-5 w-5 flex-shrink-0 "
            aria-hidden="true"
          />
        </button>
      )}
      {next ? (
        <Link to={next} className={linkClasses}>
          <ChevronRightIcon
            className="h-5 w-5 flex-shrink-0 "
            aria-hidden="true"
          />
        </Link>
      ) : (
        <button disabled className={disabledButtonClasses}>
          <ChevronRightIcon
            className="h-5 w-5 flex-shrink-0 "
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};

const RaceHeader = ({ pageTitle, year, raceid }) => {
  return (
    <div className="sticky top-0 z-10 hidden justify-between bg-white py-3 px-4 shadow-sm lg:flex">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <Link
                to="/races"
                className="text-md font-medium text-slate-500 hover:text-slate-700"
              >
                All races
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <Link
                to={`/seasons/${year}#races`}
                className="text-md ml-4 font-medium text-slate-500 hover:text-slate-700"
              >
                {year}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <span className="text-md ml-4 font-medium text-slate-500 ">
                {pageTitle}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <RaceNavigationButtons year={year} raceid={raceid} />
    </div>
  );
};

RaceHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  raceid: PropTypes.string.isRequired,
};

export default RaceHeader;

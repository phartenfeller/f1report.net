import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Fragment, memo } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  CalendarIcon,
  ClipboardListIcon,
  UserIcon,
} from '@heroicons/react/outline';
import classNames from '../util/classNames';
import useCurrentData from '../hooks/useCurrentData';

const getRaces = ({ lastRace, nextRace, currentSeason }) => {
  const arr = [];

  if (lastRace) {
    arr.push({
      name: 'Last',
      description: `${lastRace.name} ${lastRace.year}`,
      href: `/races/${lastRace.raceSlug}`,
      icon: ArrowCircleLeftIcon,
    });
  }

  if (nextRace) {
    arr.push({
      name: 'Next',
      description: `${nextRace.name} ${nextRace.year}`,
      href: `/races/${nextRace.raceSlug}`,
      icon: ArrowCircleRightIcon,
    });
  }

  arr.push({
    name: 'Current season',
    description: `Races of the year ${currentSeason}`,
    href: `/seasons/${currentSeason}#races`,
    icon: CalendarIcon,
  });

  arr.push({
    name: 'All',
    description: `All races ever`,
    href: `/races`,
    icon: ClipboardListIcon,
  });

  return arr;
};

const getCircuits = ({ lastRace, nextRace }) => {
  const arr = [];

  if (lastRace) {
    arr.push({
      name: 'Last Race',
      description: `${lastRace.circuitByCircuitid.name} - ${lastRace.circuitByCircuitid.country}`,
      href: `/circuits/${lastRace.circuitByCircuitid.circuitref}`,
      icon: ArrowCircleLeftIcon,
    });
  }

  if (nextRace) {
    arr.push({
      name: 'Next Race',
      description: `${nextRace.circuitByCircuitid.name} - ${nextRace.circuitByCircuitid.country}`,
      href: `/circuits/${nextRace.circuitByCircuitid.circuitref}`,
      icon: ArrowCircleRightIcon,
    });
  }

  arr.push({
    name: 'All',
    description: `All circuits ever`,
    href: `/circuits`,
    icon: ClipboardListIcon,
  });

  return arr;
};

const statsHeaderItems = [
  {
    name: 'Drivers',
    description: `Alltime Driver Stats`,
    href: `/all-time-driver-stats`,
    icon: UserIcon,
  },
];

const HeaderMenuItem = ({ items, name }) => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button className="p-1 group rounded-md inline-flex items-center text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700">
          <span>{name}</span>
          <ChevronDownIcon
            className={classNames(
              open ? 'text-black opacity-40' : 'opacity-60',
              'ml-2 h-5 w-5 text-white group-hover:text-red-300'
            )}
            aria-hidden="true"
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-sm sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <item.icon
                      className="flex-shrink-0 h-6 w-6 text-teal-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

HeaderMenuItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
};

const MemoMenuItem = memo(HeaderMenuItem);

const Header = ({ siteTitle }) => {
  const { lastRace, nextRace, currentSeason } = useCurrentData();
  const races = getRaces({ lastRace, nextRace, currentSeason });
  const circuits = getCircuits({ lastRace, nextRace });

  return (
    <header className="bg-f1red py-3 pl-3 pr-6">
      <div className="flex justify-between">
        <span className="text-xl">
          <Link
            to="/"
            className="text-white px-3 py-1 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            {siteTitle}
          </Link>
        </span>

        <div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-6 items-center"
          >
            <MemoMenuItem items={races} name="Races" />
            <MemoMenuItem items={circuits} name="Circuits" />
            <MemoMenuItem items={statsHeaderItems} name="Stats" />
          </Popover.Group>
        </div>

        <div />
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

import { graphql, Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Layout from '../components/layout';
import SEO from '../components/seo';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const allRacesType = PropTypes.shape({
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      circuitByCircuitid: PropTypes.shape({
        name: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
      }).isRequired,
      date: PropTypes.string.isRequired,
      raceid: PropTypes.string.isRequired,
      race: PropTypes.string.isRequired,
      round: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ),
});

export const query = graphql`
  {
    postgres {
      allRaces(orderBy: YEAR_DESC) {
        nodes {
          circuitByCircuitid {
            name
            country
            location
          }
          date
          raceid
          raceSlug
          round
          year
        }
      }
    }
  }
`;

const RaceDetailsTable = ({ allRaces, year }) => {
  const yearRaces = allRaces.nodes
    .filter((r) => r.year === year)
    .sort((a, b) => a.round - b.round);

  return (
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="table-heading hidden lg:table-cell">
                #
              </th>
              <th scope="col" className="table-heading">
                Race
              </th>
              <th scope="col" className="table-heading hidden lg:table-cell">
                Circuit
              </th>
              <th scope="col" className="table-heading hidden md:table-cell">
                Location
              </th>
              <th scope="col" className="table-heading hidden md:table-cell">
                Date
              </th>
              <th scope="col" className="table-heading hidden md:table-cell">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {yearRaces.map(
              (
                { circuitByCircuitid, date, raceId, raceSlug, round, name },
                i
              ) => (
                <tr
                  key={raceId}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="hidden lg:table-cell font-medium">{round}</td>
                  <td className="table-cell font-medium">{name}</td>
                  <td className="hidden lg:table-cell">
                    {circuitByCircuitid.name}
                  </td>
                  <td className="hidden md:table-cell">
                    {circuitByCircuitid.location} - {circuitByCircuitid.country}
                  </td>
                  <td className="hidden md:table-cell">{date}</td>
                  <td className="table-cell">
                    <Link to={`/races/${raceSlug}`} className="standard-link">
                      Details
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RaceDetailsTable.propTypes = {
  allRaces: allRacesType.isRequired,
  year: PropTypes.number.isRequired,
};

const Races = ({ data }) => {
  const { allRaces } = data.postgres;

  const yearsArr = [];
  for (let i = 0; i < allRaces.nodes.length; i += 1) {
    yearsArr.push(allRaces.nodes[i].year);
  }
  const uniqueYears = [...new Set(yearsArr)];

  return (
    <Layout>
      <SEO title="Races" />
      <div className="mx-8">
        <h2 className="mt-2 mb-12 text-3xl font-semibold tracking-wide">
          All Races
        </h2>

        <div>
          {uniqueYears.map((y) => (
            <Disclosure as="div" key={y} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="text-left bg-white rounded shadow p-4 w-full flex justify-between items-start text-gray-400 hover:shadow-lg focus:outline-none focus:ring focus:ring-red-300">
                      <span className="font-medium text-gray-900">{y}</span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={classNames(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-6 w-6 transform'
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <RaceDetailsTable allRaces={allRaces} year={y} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </Layout>
  );
};

Races.propTypes = {
  data: PropTypes.shape({
    postgres: PropTypes.shape({
      allRaces: allRacesType.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Races;

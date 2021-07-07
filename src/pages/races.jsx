import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { raceType } from '../types';
import RaceDetailsTable from '../components/raceDetailsTable';
import classNames from '../util/classNames';

export const query = graphql`
  {
    postgres {
      allSeasonsList(orderBy: YEAR_DESC) {
        year
        racesByYearList(orderBy: DATE_ASC) {
          circuitByCircuitid {
            name
            country
            location
          }
          date
          raceid
          raceSlug
          round
          name
          year
        }
      }
    }
  }
`;

const Races = ({ data }) => {
  const { allSeasonsList } = data.postgres;

  return (
    <Layout>
      <SEO title="Races" />
      <h1 className="mt-2 mb-12 text-3xl font-semibold tracking-wide">
        All Races
      </h1>

      <div>
        {allSeasonsList.map(({ year, racesByYearList }, i) => (
          <Disclosure
            as="div"
            key={year}
            className="pt-6"
            defaultOpen={i === 0}
          >
            {({ open }) => (
              <>
                <dt className="text-lg">
                  <Disclosure.Button className="text-left bg-white rounded shadow p-4 w-full flex justify-between items-start text-gray-400 hover:shadow-lg focus:outline-none focus:ring focus:ring-red-300">
                    <span className="font-medium text-gray-900">{year}</span>
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
                  <RaceDetailsTable racesByYearList={racesByYearList} />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </Layout>
  );
};

Races.propTypes = {
  data: PropTypes.shape({
    postgres: PropTypes.shape({
      allSeasonsList: PropTypes.arrayOf(
        PropTypes.shape({
          year: PropTypes.string.isRequired,
          racesByYearList: PropTypes.arrayOf(raceType).isRequired,
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default Races;

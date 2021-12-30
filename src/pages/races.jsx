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
import Header1 from '../components/headers/header1';

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
            circuitref
          }
          date
          raceid
          raceSlug
          round
          name
          year
          resultsByRaceidList(condition: { position: "1" }) {
            driverByDriverid {
              driverDisplayName
            }
            constructorTeamByConstructorid {
              name
            }
          }
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
      <Header1>All Races</Header1>

      <div className="mx-auto max-w-4k-limit">
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
                  <Disclosure.Button className="text-left bg-white rounded shadow-muted-sm p-4 w-full flex justify-between items-start text-zinc-400 hover:shadow-muted focus:outline-none focus:ring focus:ring-red-300">
                    <span className="font-medium text-zinc-900">{year}</span>
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
                <Disclosure.Panel as="dd" className="my-6 px-3">
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

import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query raceData($id: Int!) {
    races(raceId: { eq: $id }) {
      circuit_name
      circuit_url
      country
      date
      location
      race_name
      race_slug
      race_url
      round
      time
      year
    }
    allRaceResult(filter: { raceId: { eq: $id } }, sort: { fields: position }) {
      nodes {
        constructor_name
        driver_forename
        driver_number
        driver_surname
        fastestLap
        fastestLapSpeed
        fastestLapTime
        grid
        laps
        number
        points
        position
        resultId
        status
        time
      }
    }
  }
`;

const RaceTemplate = ({ data }) => {
  const { races, allRaceResult } = data;
  const {
    race_name,
    year,
    circuit_name,
    country,
    location,
    circuit_url,
    race_url,
  } = races;

  return (
    <Layout>
      <SEO title="Page two" />
      <h1 className="text-3xl font-bold tracking-wide">
        {race_name} ({year})
      </h1>
      <div>
        <span>Track: </span>
        <a href={circuit_url}>{circuit_name}</a>
        <span>
          {' '}
          - {location} - {country}
        </span>
      </div>
      <div>
        <a href={race_url}>Wikipedia Link</a>
      </div>
      <div>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="table-heading">
                    #
                  </th>
                  <th scope="col" className="table-heading">
                    Driver
                  </th>
                  <th scope="col" className="table-heading">
                    Constructor
                  </th>
                  <th scope="col" className="table-heading">
                    Pts.
                  </th>
                  <th scope="col" className="table-heading">
                    Time
                  </th>
                  <th scope="col" className="table-heading">
                    Result
                  </th>
                  <th scope="col" className="table-heading">
                    Fastest L.
                  </th>
                  <th scope="col" className="table-heading">
                    Grid
                  </th>
                </tr>
              </thead>
              <tbody>
                {allRaceResult.nodes.map(
                  (
                    {
                      constructor_name,
                      driver_forename,
                      driver_surname,
                      fastestLap,
                      fastestLapSpeed,
                      fastestLapTime,
                      grid,
                      laps,
                      number,
                      points,
                      position,
                      resultId,
                      status,
                      time,
                    },
                    i
                  ) => (
                    <tr
                      key={resultId}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="table-cell font-medium">{position}</td>
                      <td className="table-cell">
                        {driver_forename} {driver_surname} ({number})
                      </td>
                      <td className="table-cell">{constructor_name}</td>
                      <td className="table-cell">{points}</td>
                      <td className="table-cell">{time}</td>
                      <td className="table-cell" title={`Laps: ${laps}`}>
                        {status}
                      </td>
                      <td
                        className="table-cell"
                        title={`Lap: ${fastestLap}, Speed: ${fastestLapSpeed}`}
                      >
                        {fastestLapTime}
                      </td>
                      <td className="table-cell">{grid}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

RaceTemplate.propTypes = {
  data: PropTypes.shape({
    races: PropTypes.shape({
      race_name: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      circuit_name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      circuit_url: PropTypes.string.isRequired,
      race_url: PropTypes.string.isRequired,
    }).isRequired,
    allRaceResult: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          constructor_name: PropTypes.string.isRequired,
          driver_forename: PropTypes.string.isRequired,
          driver_surname: PropTypes.string.isRequired,
          fastestLap: PropTypes.number,
          fastestLapSpeed: PropTypes.string,
          fastestLapTime: PropTypes.string,
          grid: PropTypes.number.isRequired,
          laps: PropTypes.number.isRequired,
          number: PropTypes.number.isRequired,
          points: PropTypes.number.isRequired,
          position: PropTypes.number,
          resultId: PropTypes.number.isRequired,
          status: PropTypes.string.isRequired,
          time: PropTypes.string,
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default RaceTemplate;

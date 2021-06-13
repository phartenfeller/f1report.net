import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Infobox from '../components/alerts/infobox';
import Warningbox from '../components/alerts/warningbox';
import Layout from '../components/layout';
import PositionChart from '../components/race-template/positionChart';
import TimingsTabs from '../components/race-template/timingsTabs';
import SEO from '../components/seo';
import allAvgLapTimesType from '../types/allAvgLapTimesType';
import allLapTimesType from '../types/allLapTimesType';
import allRaceResultType from '../types/allRaceResultType';

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
      raceId
    }

    allRaceResult(filter: { raceId: { eq: $id } }, sort: { fields: position }) {
      nodes {
        constructor_name
        driver_forename
        driver_number
        driver_surname
        driver_name
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

    allAvgLapTimes(
      filter: { raceId: { eq: $id } }
      sort: { fields: avg_lapTime_s }
    ) {
      nodes {
        constructor_name
        driver_forename
        driver_number
        driver_surname
        driver_name
        avg_lapTime_s
        median_lapTime_s
      }
    }

    allAvgLapTimesTop70Pct(
      filter: { raceId: { eq: $id } }
      sort: { fields: avg_lapTime_s }
    ) {
      nodes {
        constructor_name
        driver_forename
        driver_number
        driver_surname
        driver_name
        avg_lapTime_s
        relevant_lap_count
      }
    }

    allLapTimes(filter: { raceId: { eq: $id } }) {
      nodes {
        lap
        driver_forename
        constructor_name
        driver_surname
        driver_name
        driver_number
        position
      }
    }
  }
`;

const RaceTemplate = ({ data }) => {
  const {
    races,
    allRaceResult,
    allAvgLapTimes,
    allAvgLapTimesTop70Pct,
    allLapTimes,
  } = data;
  const {
    race_name,
    year,
    circuit_name,
    country,
    location,
    circuit_url,
    race_url,
    raceId,
  } = races;

  return (
    <Layout>
      <SEO title={`${race_name} (${year})`} />
      <div className="mt-5 mx-6">
        <h1 className="text-3xl font-bold tracking-wide mb-3" data-id={raceId}>
          {race_name} ({year})
        </h1>
        <div>
          <span>Track: </span>
          <a href={circuit_url} className="standard-link">
            {circuit_name}
          </a>
          <span>
            {' '}
            - {location} - {country}
          </span>
        </div>
        <div>
          <a href={race_url} className="standard-link">
            Wikipedia Article
          </a>
        </div>
        <div className="md:hidden my-6 rounded border-2 border-gray-400">
          <Infobox text="For a better experience and more Info please use a bigger screen" />
        </div>
        <div className="hidden md:block mt-5">
          <h2 className="text-2xl font-semibold tracking-wide mb-3">
            Race Results
          </h2>
          <div className="py-2 align-middle min-w-full">
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
        {allRaceResult.nodes && allRaceResult.nodes.length > 0 ? (
          <div>
            <div>
              <h2 className="text-2xl font-semibold tracking-wide mb-3">
                Positions
              </h2>
              <PositionChart allLapTimes={allLapTimes} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-wide mb-3">
                Lap Time Statistics
              </h2>
              <TimingsTabs
                allAvgLapTimes={allAvgLapTimes}
                allAvgLapTimesTop70Pct={allAvgLapTimesTop70Pct}
              />
            </div>
          </div>
        ) : (
          <div className="m-0 lg:m-16 rounded border-2 border-gray-300">
            <Warningbox
              title="No data found"
              text="Either the race did not take place yet or there was an errror."
            />
          </div>
        )}
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
      raceId: PropTypes.number.isRequired,
    }).isRequired,
    allRaceResult: allRaceResultType.isRequired,
    allAvgLapTimes: allAvgLapTimesType.isRequired,
    allAvgLapTimesTop70Pct: allAvgLapTimesType.isRequired,
    allLapTimes: allLapTimesType.isRequired,
  }).isRequired,
};

export default RaceTemplate;

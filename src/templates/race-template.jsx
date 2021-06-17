import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Infobox from '../components/alerts/infobox';
import Warningbox from '../components/alerts/warningbox';
import Layout from '../components/layout';
import PositionChart from '../components/race-template/positionChart';
import DriverLapTimes from '../components/race-template/driverLapTimes';
import SEO from '../components/seo';
import {
  lapTimesType,
  raceResultsType,
  conAvgLapt70PType,
  conAvgLaptType,
  driAvgLapt70PType,
  driAvgLaptType,
} from '../types';
import ConstructorLapTimes from '../components/race-template/constructorLapTimes';

export const query = graphql`
  query raceData($raceid: PostGraphile_BigInt!) {
    postgres {
      raceByRaceid(raceid: $raceid) {
        circuitByCircuitid {
          country
          location
          name
          url
        }
        round
        raceid
        time
        url
        year
        name
        date
        laptimesByRaceidList {
          lap
          milliseconds
          position
          time
          driverByDriverid {
            driverDisplayName
            driverid
          }
        }
        driAvgLapt70PsByRaceidList {
          avglaptimes
          relevantLapCount
          driverid
        }
        driAvgLaptsByRaceidList {
          avglaptimes
          medianlaptimes
          driverid
        }
        conAvgLapt70PsByRaceidList {
          relevantLapCount
          avglaptimes
          constructorTeamByConstructorid {
            name
          }
        }
        conAvgLaptsByRaceidList {
          avglaptimes
          medianlaptimes
          constructorTeamByConstructorid {
            name
          }
        }
        resultsByRaceidList {
          resultid
          fastestlap
          constructorTeamByConstructorid {
            name
          }
          driverByDriverid {
            forename
            surname
            number
            driverDisplayName
            driverid
          }
          grid
          laps
          points
          number
          position
          statusByStatusid {
            status
          }
          time
          fastestlapspeed
          fastestlaptime
        }
      }
    }
  }
`;

const getDriverMap = (resultsByRaceidList) => {
  const map = {};

  resultsByRaceidList.forEach((res) => {
    map[res.driverByDriverid.driverid] = {
      constructor: res.constructorTeamByConstructorid.name,
      forename: res.driverByDriverid.forename,
      surname: res.driverByDriverid.surname,
      displayName: res.driverByDriverid.driverDisplayName,
      number: res.driverByDriverid.number,
    };
  });

  return map;
};

const RaceTemplate = ({ data }) => {
  const { raceByRaceid } = data.postgres;

  const {
    circuitByCircuitid,
    raceid,
    url,
    year,
    name,
    laptimesByRaceidList,
    driAvgLapt70PsByRaceidList,
    driAvgLaptsByRaceidList,
    conAvgLapt70PsByRaceidList,
    conAvgLaptsByRaceidList,
    resultsByRaceidList,
  } = raceByRaceid;

  const {
    country,
    location,
    name: curcuit,
    url: circuitUrl,
  } = circuitByCircuitid;

  const driverMap = getDriverMap(resultsByRaceidList);

  return (
    <Layout>
      <SEO title={`${name} (${year})`} />
      <div className="mt-5 mx-6">
        <h1 className="text-3xl font-bold tracking-wide mb-3" data-id={raceid}>
          {name} ({year})
        </h1>
        <div>
          <span>Track: </span>
          <a href={circuitUrl} className="standard-link">
            {curcuit}
          </a>
          <span>
            {' '}
            - {location} - {country}
          </span>
        </div>
        <div>
          <a href={url} className="standard-link">
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
                  {resultsByRaceidList.map(
                    (
                      {
                        resultid,
                        fastestlap,
                        constructorTeamByConstructorid,
                        driverByDriverid,
                        grid,
                        laps,
                        points,
                        position,
                        statusByStatusid,
                        time: finishTime,
                        fastestlapspeed,
                        fastestlaptime,
                      },
                      i
                    ) => (
                      <tr
                        key={resultid}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="table-cell font-medium">{position}</td>
                        <td className="table-cell">
                          {driverByDriverid.forename} {driverByDriverid.surname}{' '}
                          ({driverByDriverid.number})
                        </td>
                        <td className="table-cell">
                          {constructorTeamByConstructorid.name}
                        </td>
                        <td className="table-cell">{points}</td>
                        <td className="table-cell">{finishTime}</td>
                        <td className="table-cell" title={`Laps: ${laps}`}>
                          {statusByStatusid.status}
                        </td>
                        <td
                          className="table-cell"
                          title={`Lap: ${fastestlap}, Speed: ${fastestlapspeed}`}
                        >
                          {fastestlaptime}
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
        {resultsByRaceidList && resultsByRaceidList.length > 0 ? (
          <div>
            <div>
              <h2 className="text-2xl font-semibold tracking-wide mb-3">
                Positions
              </h2>
              <PositionChart
                laptimesByRaceidList={laptimesByRaceidList}
                driverMap={driverMap}
              />
            </div>
            {driAvgLaptsByRaceidList && driAvgLaptsByRaceidList.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold tracking-wide mb-3">
                  Driver Lap Time Statistics
                </h2>
                <DriverLapTimes
                  driAvgLaptsByRaceidList={driAvgLaptsByRaceidList}
                  driAvgLapt70PsByRaceidList={driAvgLapt70PsByRaceidList}
                  driverMap={driverMap}
                />
              </div>
            ) : null}
            {conAvgLaptsByRaceidList && conAvgLaptsByRaceidList.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold tracking-wide mb-3">
                  Constructor Lap Time Statistics
                </h2>
                <ConstructorLapTimes
                  conAvgLaptsByRaceidList={conAvgLaptsByRaceidList}
                  conAvgLapt70PsByRaceidList={conAvgLapt70PsByRaceidList}
                  driverMap={driverMap}
                />
              </div>
            ) : null}
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
    postgres: PropTypes.shape({
      raceByRaceid: PropTypes.shape({
        circuitByCircuitid: PropTypes.shape({
          country: PropTypes.string.isRequired,
          location: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired,
        conAvgLapt70PsByRaceidList: conAvgLapt70PType.isRequired,
        conAvgLaptsByRaceidList: conAvgLaptType.isRequired,
        date: PropTypes.string.isRequired,
        driAvgLapt70PsByRaceidList: driAvgLapt70PType.isRequired,
        driAvgLaptsByRaceidList: driAvgLaptType.isRequired,
        laptimesByRaceidList: lapTimesType.isRequired,
        name: PropTypes.string.isRequired,
        raceid: PropTypes.string.isRequired,
        resultsByRaceidList: raceResultsType.isRequired,
        round: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

// RaceTemplate.propTypes = {
//   data: PropTypes.shape({
//     sqliteRaces: PropTypes.shape({
//       race_name: PropTypes.string.isRequired,
//       year: PropTypes.number.isRequired,
//       circuit_name: PropTypes.string.isRequired,
//       country: PropTypes.string.isRequired,
//       location: PropTypes.string.isRequired,
//       circuit_url: PropTypes.string.isRequired,
//       race_url: PropTypes.string.isRequired,
//       raceId: PropTypes.number.isRequired,
//       raceResults: raceResultsType.isRequired,
//       avgLapTimes: avgLapTimesType.isRequired,
//       avgLapTimesTop70Pcts: avgLapTimesType.isRequired,
//       lapTimes: lapTimesType.isRequired,
//       avgConstructorLapTimes: avgConstructorLapTimesType.isRequired,
//       avgConstructorLapTimes70Pcts: avgConstructorLapTimesType.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

export default RaceTemplate;

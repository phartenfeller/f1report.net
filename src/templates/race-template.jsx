import { graphql, Link } from 'gatsby';
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
import conAvgPitstopsByRaceidListType from '../types/conAvgPitstopsByRaceidListType';
import HighlightVideos from '../components/race-template/highlightVideos';
import RaceNotes from '../components/race-template/raceNotes';
import { Header1, LinkableH2 } from '../components/headers';
import RaceResultsTable from '../components/race-template/raceResultsTable';
import arrayWithValues from '../util/arrayWithValues';

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
        highlightlinks
        racenotes
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
        conAvgPitstopsByRaceidList {
          avglaptimes
          constructorTeamByConstructorid {
            name
          }
        }
      }
    }
  }
`;

const metaTags = ({ resultsByRaceidList, country, year, name }) => {
  const meta = [];
  let description;
  let one;

  // description
  if (arrayWithValues(resultsByRaceidList)) {
    one = resultsByRaceidList.find((r) => parseInt(r.position) === 1)
      ?.driverByDriverid?.driverDisplayName;
    const two = resultsByRaceidList.find((r) => parseInt(r.position) === 2)
      ?.driverByDriverid?.driverDisplayName;
    const third = resultsByRaceidList.find((r) => parseInt(r.position) === 3)
      ?.driverByDriverid?.driverDisplayName;
    description = `Results of the race in ${country}: 1st ${one}, 2nd: ${two}, 3rd ${third}`;
  } else {
    description = `Details of the upcoming race in ${country}`;
  }

  // keywords
  const keywords = {
    name: 'keywords',
    content: `Race, ${name}, ${country}, ${year}`,
  };
  if (one) {
    keywords.content += `, ${one}`;
  }
  meta.push(keywords);

  return { meta, description };
};

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
    date,
    laptimesByRaceidList,
    driAvgLapt70PsByRaceidList,
    driAvgLaptsByRaceidList,
    conAvgLapt70PsByRaceidList,
    conAvgLaptsByRaceidList,
    resultsByRaceidList,
    highlightlinks,
    racenotes,
  } = raceByRaceid;

  const {
    country,
    location,
    name: curcuit,
    url: circuitUrl,
  } = circuitByCircuitid;

  const driverMap = getDriverMap(resultsByRaceidList);

  const pageTitle = `${name} (${year})`;

  const { meta, description } = metaTags({
    resultsByRaceidList,
    country,
    year,
    name,
  });

  const dateLocal =
    typeof window !== 'undefined' ? new Date(date).toLocaleDateString() : date;

  return (
    <Layout>
      <SEO title={pageTitle} description={description} meta={meta} />
      <Header1 dataId={raceid}>{pageTitle}</Header1>
      <div>
        <span>Date: </span>
        <time dateTime={date}>{dateLocal}</time>
      </div>
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
      <div className="mt-5">
        <LinkableH2>Race Results</LinkableH2>
        <RaceResultsTable resultsByRaceidList={resultsByRaceidList} />
        <Link to={`/seasons/${year}`} className="standard-link">
          Season overview
        </Link>
        <RaceNotes racenotes={racenotes} />
        <HighlightVideos highlightlinks={highlightlinks} />
      </div>
      {resultsByRaceidList && resultsByRaceidList.length > 0 ? (
        <div>
          <div>
            {laptimesByRaceidList && laptimesByRaceidList.length > 0 ? (
              <>
                <LinkableH2>Positions</LinkableH2>
                <PositionChart
                  laptimesByRaceidList={laptimesByRaceidList}
                  driverMap={driverMap}
                  resultsByRaceidList={resultsByRaceidList}
                />
              </>
            ) : null}
          </div>
          {driAvgLaptsByRaceidList && driAvgLaptsByRaceidList.length > 0 ? (
            <div>
              <LinkableH2>Driver Lap Time Statistics</LinkableH2>
              <DriverLapTimes
                driAvgLaptsByRaceidList={driAvgLaptsByRaceidList}
                driAvgLapt70PsByRaceidList={driAvgLapt70PsByRaceidList}
                driverMap={driverMap}
              />
            </div>
          ) : null}
          {conAvgLaptsByRaceidList && conAvgLaptsByRaceidList.length > 0 ? (
            <div>
              <LinkableH2>Constructor Lap Time Statistics</LinkableH2>
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
        resultsByRaceidList: PropTypes.arrayOf(raceResultsType).isRequired,
        round: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        highlightlinks: PropTypes.string,
        racenotes: PropTypes.string,
        conAvgPitstopsByRaceidList: conAvgPitstopsByRaceidListType.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default RaceTemplate;

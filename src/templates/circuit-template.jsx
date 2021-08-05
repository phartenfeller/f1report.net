/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import { Header1, LinkableH2 } from '../components/headers';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CircuitTimeStats from '../components/circuit-template/circuitTimeStats';
import CircuitPerformanceStats from '../components/circuit-template/circuitPerformanceStats';

import '../styles/ranks.css';

export const query = graphql`
  query circuitData($circuitid: PostGraphile_BigInt!) {
    postgres {
      circuitByCircuitid(circuitid: $circuitid) {
        circuitid
        circuitref
        name
        country
        location
        url
        circuitstatByCircuitid {
          firstrace
          lastrace
          mostconstructorpodiums
          mostcostructorwins
          mostdriverpodiums
          mostdriverstarts
          mostdriverwins
          racecount
          racecountrank
        }
      }
      allConstructorTeamsList {
        constructorid
        name
      }
      allDriversList {
        driverid
        driverDisplayName
      }
    }
  }
`;

const CircuitTemplate = ({ data }) => {
  const { allConstructorTeamsList, circuitByCircuitid, allDriversList } =
    data.postgres;

  const {
    circuitid,
    circuitref,
    name,
    circuitstatByCircuitid,
    country,
    location,
    url,
  } = circuitByCircuitid;

  const {
    firstrace,
    lastrace,
    mostconstructorpodiums,
    mostcostructorwins,
    mostdriverpodiums,
    mostdriverstarts,
    mostdriverwins,
    racecount,
    racecountrank,
  } = circuitstatByCircuitid;

  const meta = [];

  const pageTitle = name.toLowerCase().includes('circuit')
    ? name
    : `${name} (Circuit)`;
  const description = `${country} ${location}`;

  return (
    <Layout>
      <SEO title={pageTitle} description={description} meta={meta} />
      <Header1 dataId={circuitid}>{pageTitle}</Header1>
      <a href={url} className="standard-link">
        Circuit Wikipedia Page
      </a>
      <div>
        <LinkableH2>Time Stats</LinkableH2>
        <CircuitTimeStats
          firstrace={firstrace}
          lastrace={lastrace}
          racecount={racecount}
          racecountrank={racecountrank}
        />
      </div>
      <div>
        <LinkableH2>Performance Stats</LinkableH2>
        <CircuitPerformanceStats
          allConstructorTeamsList={allConstructorTeamsList}
          allDriversList={allDriversList}
          mostconstructorpodiums={mostconstructorpodiums}
          mostcostructorwins={mostcostructorwins}
          mostdriverpodiums={mostdriverpodiums}
          mostdriverstarts={mostdriverstarts}
          mostdriverwins={mostdriverwins}
        />
      </div>
    </Layout>
  );
};

export default CircuitTemplate;

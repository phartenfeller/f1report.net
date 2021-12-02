import React from 'react';
import Infobox from '../components/alerts/infobox';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkList from '../components/index/LinkList';
import LandingHero from '../components/landingPage/landingHero';
import useCurrentData from '../hooks/useCurrentData';

const IndexPage = () => {
  const { lastRace, currentSeason } = useCurrentData();

  return (
    <Layout noMarginTop noMarginSides noMarginBottom>
      <SEO title="Home" />
      <div className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LandingHero />
          <div className="mt-12">
            <div className="mb-12">
              <Infobox text="This site is under active development, more data and analytics will be added soon" />
            </div>
            <div className="prose-lg">
              <p>
                Stats are generated <b>after a race has happened</b>. I do not
                have access to live data and training data.
              </p>
              <p>
                If you have any feedback or ideas feel free to contact me{' '}
                <a className="standard-link" href="mailto:hello@f1report.net">
                  via email
                </a>{' '}
                or on{' '}
                <a
                  className="standard-link"
                  href="https://twitter.com/f1report_net"
                >
                  twitter
                </a>
                .
              </p>
            </div>
            <div className="mt-5 mb-16 space-y-2">
              <LinkList
                target={`/races/${lastRace.raceSlug}`}
                display={`Last Race: ${lastRace.name}`}
              />
              <LinkList
                target={`/seasons/${currentSeason}`}
                display={`Current Season: ${currentSeason}`}
              />
              <LinkList target="/races/" display="All Races" />
              <LinkList target="/circuits/" display="All Circuits" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

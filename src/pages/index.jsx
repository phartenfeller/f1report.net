import React, { useState, useEffect } from 'react';
import Infobox from '../components/alerts/infobox';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkList from '../components/index/LinkList';
import LandingHero from '../components/landingPage/landingHero';
import useCurrentData from '../hooks/useCurrentData';

const IndexPage = () => {
  const { lastRace, currentSeason } = useCurrentData();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const encoded =
        '97-71-86-115-98-71-57-65-90-106-70-121-90-88-66-118-99-110-81-117-98-109-86-48';

      const ascii = encoded.split('-');
      const res = String.fromCharCode(...ascii);
      setEmail(atob(res));
    }, 2000);
  }, [setEmail]);

  return (
    <Layout noMarginTop noMarginSides noMarginBottom>
      <SEO title="Home" />
      <div className="bg-white pb-24">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-12 mx-4 md:mx-8 lg:mx-12 items-center">
            <div className="xl:col-span-2">
              <LandingHero />
            </div>
            <div className="space-y-4 mt-12 lg:mt-0">
              {lastRace && (
                <LinkList
                  target={`/races/${lastRace.raceSlug}`}
                  display={`Last Race: ${lastRace.name}`}
                  primary
                />
              )}
              <LinkList
                target={`/seasons/${currentSeason}`}
                display={`Current Season: ${currentSeason}`}
              />
              <LinkList target="/races/" display="All Races" />
              <LinkList target="/circuits/" display="All Circuits" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <a
                  className="standard-link"
                  href={email ? `mailto:${email}` : '#loading'}
                >
                  {email ? 'via email' : 'via email (loading...)'}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

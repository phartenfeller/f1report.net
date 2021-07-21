import { Link } from 'gatsby';
import React from 'react';
import { Header1 } from '../components/headers';
import Layout from '../components/layout';
import SEO from '../components/seo';

const About = () => (
  <Layout noMarginTop>
    <SEO title="About" />
    <div className="flex justify-center">
      <div className="bg-white lg:w-2/3 mx-4 shadow pb-12">
        <div className="mx-4 lg:mx-16 my-8">
          <Header1>About</Header1>
        </div>
        <div className="mx-4 lg:mx-16 prose md:prose-lg">
          <p>
            Website by{' '}
            <a className="standard-link" href="https://hartenfeller.dev">
              Philipp Hartenfeller
            </a>
            . Published as{' '}
            <a
              className="standard-link"
              href="https://github.com/phartenfeller/f1-stats-page"
            >
              Open Source Software
            </a>
            .
          </p>
          <p>
            Data from{' '}
            <a className="standard-link" href="http://ergast.com/">
              ergast.com
            </a>
            under{' '}
            <a className="standard-link" href="http://ergast.com/mrd/terms/">
              these conditions
            </a>
            .
          </p>
          <p>
            The Website was developed with{' '}
            <a className="standard-link" href="https://www.gatsbyjs.com/">
              Gatsby
            </a>{' '}
            which uses{' '}
            <a className="standard-link" href="https://reactjs.org/">
              React
            </a>{' '}
            under the hood.
          </p>
          <p>
            The charts a are developed with{' '}
            <a className="standard-link" href="https://nivo.rocks/">
              Nivo
            </a>
            .
          </p>
          <p>
            Styled with{' '}
            <a className="standard-link" href="https://tailwindcss.com/">
              TailwindCSS
            </a>
            .
          </p>
          <div>
            <Link to="/license-info" className="standard-link">
              List of all open source software and licenses
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;

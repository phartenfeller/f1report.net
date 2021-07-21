import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Header1 } from '../components/headers';
import Layout from '../components/layout';
import SEO from '../components/seo';

const LicenseDisplay = ({ licenseText }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button className="p-1 flex items-center border border-gray-300 rounded w-full hover:bg-blue-50 focus:ring focus:ring-blue-400">
          <ChevronRightIcon
            className={`${open ? 'transform rotate-90' : ''} h-5 w-5`}
          />
          Open License
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          <pre>{licenseText}</pre>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

LicenseDisplay.propTypes = {
  licenseText: PropTypes.string.isRequired,
};

export const query = graphql`
  {
    allPackageLicense {
      edges {
        node {
          identifier
          license
          licenseText
          package
          url
          version
        }
      }
    }
  }
`;

const noIndexMeta = [{ property: 'robots', content: 'noindex' }];

const LicenseInfo = ({ data }) => (
  <Layout noMarginTop>
    <SEO title="License Info" meta={noIndexMeta} />
    <div className="flex justify-center">
      <div className="bg-white lg:w-2/3 mx-4 shadow pb-12">
        <div className="mx-4 lg:mx-16 my-8">
          <Header1>Licenses</Header1>
        </div>
        <div
          className="mx-4 lg:mx-16 prose md:prose-lg"
          style={{ maxWidth: 'none' }}
        >
          <p>
            This Website relies heavily on awesome Open Source Software. Thanks
            to all the awesome developers behind it!
          </p>
          <div>
            Notable mentions are:
            <ul>
              <li>
                <a className="standard-link" href="https://www.gatsbyjs.com/">
                  Gatsby
                </a>
                <span> - and it&apos;s whole awesome ecosystem</span>
              </li>
              <li>
                <a className="standard-link" href="https://reactjs.org/">
                  React
                </a>
                <span> (Which Gatsby depends on)</span>
              </li>
              <li>
                <a className="standard-link" href="https://nivo.rocks/">
                  Nivo
                </a>
                <span> (Charts Library)</span>
              </li>
              <li>
                <a className="standard-link" href="https://tailwindcss.com/">
                  TailwindCSS
                </a>
                <span> (CSS Library)</span>
              </li>
            </ul>
          </div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="p-2 flex items-center border border-gray-300 rounded w-full hover:bg-blue-50 focus:ring focus:ring-blue-400">
                  <ChevronRightIcon
                    className={`${open ? 'transform rotate-90' : ''} h-5 w-5`}
                  />
                  All Licenses
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  {data.allPackageLicense.edges.map(({ node }) => (
                    <div
                      key={node.identifier}
                      className="border-b border-gray-300 mt-4 pb-4"
                    >
                      {node.url ? (
                        <a className="standard-link" href={node.url}>
                          {node.identifier}
                        </a>
                      ) : (
                        <span className="text-black">{node.identifier}</span>
                      )}
                      <div>License: {node.license || '?'}</div>
                      {node.licenseText && (
                        <LicenseDisplay licenseText={node.licenseText} />
                      )}
                    </div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <div className="mt-5">
            Generated with
            <a
              href="https://github.com/phartenfeller/gatsby-source-package-licenses"
              className="standard-link"
            >
              gatsby-source-package-licenses
            </a>
            (my own package 😄)
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

LicenseInfo.propTypes = {
  data: PropTypes.shape({
    allPackageLicense: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            identifier: PropTypes.string.isRequired,
            license: PropTypes.string,
            licenseText: PropTypes.string,
            package: PropTypes.string.isRequired,
            url: PropTypes.string,
            version: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default LicenseInfo;

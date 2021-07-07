/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from './footer';
import Header from './header';
import '../styles/fonts.css';
import '../styles/tailwind.css';
import classNames from '../util/classNames';

const Layout = ({ children, noMarginTop = false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main
        className={classNames(
          'flex-grow mx-6 mb-24',
          noMarginTop ? '' : 'mt-5'
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  noMarginTop: PropTypes.bool,
};

Layout.defaultProps = {
  noMarginTop: false,
};

export default Layout;

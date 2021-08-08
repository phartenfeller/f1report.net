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

const Layout = ({
  children,
  noMarginTop = false,
  noHeader = false,
  noMarginSides = false,
  noMarginBottom = false,
}) => {
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
      {!noHeader && <Header siteTitle={data.site.siteMetadata.title} />}
      <main
        className={classNames(
          'flex-grow',
          noMarginTop ? '' : 'mt-5',
          noMarginSides ? '' : 'mx-6',
          noMarginBottom ? '' : 'mb-24'
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
  noHeader: PropTypes.bool,
  noMarginSides: PropTypes.bool,
  noMarginBottom: PropTypes.bool,
};

Layout.defaultProps = {
  noMarginTop: false,
  noHeader: false,
  noMarginSides: false,
  noMarginBottom: false,
};

export default Layout;

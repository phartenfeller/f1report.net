import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="bg-f1red py-3 px-6">
    <div>
      <span className="text-xl">
        <Link to="/" className="text-white">
          {siteTitle}
        </Link>
      </span>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

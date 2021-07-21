import PropTypes from 'prop-types';
import React from 'react';

const Header1 = ({ children, dataId }) => (
  <h1
    className="font-yrsa text-5xl font-bold tracking-wide mb-3"
    data-id={dataId}
  >
    {children}
  </h1>
);

Header1.propTypes = {
  children: PropTypes.node.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Header1.defaultProps = {
  dataId: null,
};

export default Header1;

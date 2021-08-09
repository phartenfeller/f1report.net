import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

const CircuitLink = ({ name, circuitref, location, country }) => {
  let tooltipText = null;

  if (country && location) {
    tooltipText = `${country} - ${location}`;
  } else {
    tooltipText = country || location;
  }

  return (
    <span data-tip={tooltipText}>
      <Link to={`/circuits/${circuitref}`} className="standard-link">
        <ReactTooltip effect="solid" />
        {name}
      </Link>
    </span>
  );
};

CircuitLink.propTypes = {
  name: PropTypes.string.isRequired,
  circuitref: PropTypes.string.isRequired,
  location: PropTypes.string,
  country: PropTypes.string,
};

CircuitLink.defaultProps = {
  location: null,
  country: null,
};

export default CircuitLink;

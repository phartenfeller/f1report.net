import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { ChevronRightIcon } from '@heroicons/react/solid';

const LinkList = ({ target, display }) => (
  <div>
    <Link
      to={target}
      className="p-6 rounded  border border-gray-200 flex items-center justify-between w-full text-lg tracking-wide font-semibold hover:bg-gray-100 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-300"
    >
      {display}
      <ChevronRightIcon className="h-7 w-7 text-gray-400" aria-hidden="true" />
    </Link>
  </div>
);

LinkList.propTypes = {
  target: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
};

export default LinkList;

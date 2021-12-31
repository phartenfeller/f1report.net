import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { ChevronRightIcon } from '@heroicons/react/solid';

const primaryClasses =
  'bg-gradient-to-tr from-[#fd3b3b] to-[#ff9d9d] text-white shadow-3d-red hover:opacity-75';
const defaultClasses =
  'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shadow-3d-gray';

const chevronPrimary = 'text-[#ffe4e4]';
const chevronDefault = 'text-zinc-400';

const LinkList = ({ target, display, primary }) => (
  <div>
    <Link
      to={target}
      className={`p-3 md:p-6 rounded flex items-center justify-between w-full md:text-lg font-semibold tracking-wide focus:outline-none focus:ring focus:ring-offset-2 select-none focus:ring-red-300 ${
        primary ? primaryClasses : defaultClasses
      }`}
    >
      {display}
      <ChevronRightIcon
        className={`h-7 w-7 ${primary ? chevronPrimary : chevronDefault}`}
        aria-hidden="true"
      />
    </Link>
  </div>
);

LinkList.propTypes = {
  target: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};

LinkList.defaultProps = {
  primary: false,
};

export default LinkList;

import PropTypes from 'prop-types';
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';

const Infobox = ({ text, link }) => (
  <div className="rounded-md bg-indigo-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <InformationCircleIcon
          className="h-5 w-5 text-indigo-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3 flex-1 md:flex md:justify-between">
        <p className="text-sm text-indigo-700">{text}</p>
        {link && (
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a
              href={link}
              className="whitespace-nowrap font-medium text-indigo-700 hover:text-indigo-600"
            >
              Details <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        )}
      </div>
    </div>
  </div>
);

Infobox.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

Infobox.defaultProps = {
  link: null,
};

export default Infobox;

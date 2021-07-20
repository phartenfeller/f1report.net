import PropTypes from 'prop-types';
import React from 'react';

const LinkableH2 = ({ text }) => {
  const id = text.replace(/ /g, '-').toLowerCase();

  return (
    <div>
      <a
        className="-ml-4 px-4 inline-flex group items-center mb-2 mt-12"
        href={`#${id}`}
      >
        <h2
          id={id}
          className="font-yrsa font-mediumtext-gray-900 group-hover:decoration-gray-400 group-hover:underline"
          style={{ fontSize: '42px', textDecorationThickness: '0.075em' }}
        >
          {text}
        </h2>
        <span className="font-mono text-gray-400 ml-2 text-4xl hidden group-hover:block">
          #
        </span>
      </a>
    </div>
  );
};

LinkableH2.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LinkableH2;

import PropTypes from 'prop-types';
import React from 'react';

const LinkableH2 = ({ children }) => {
  const id = children.replace(/ /g, '-').toLowerCase();

  return (
    <div>
      <a
        className="-ml-4 px-4 inline-flex group items-center mb-2 mt-12"
        href={`#${id}`}
      >
        <h2
          id={id}
          className="font-yrsa font-medium text-zinc-900 group-hover:decoration-zinc-400 group-hover:underline"
          style={{ fontSize: '42px', textDecorationThickness: '0.075em' }}
        >
          {children}
        </h2>
        <span className="font-mono text-zinc-400 ml-2 text-4xl hidden group-hover:block">
          #
        </span>
      </a>
    </div>
  );
};

LinkableH2.propTypes = {
  children: PropTypes.string.isRequired,
};

export default LinkableH2;

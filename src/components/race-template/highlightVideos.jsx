import PropTypes from 'prop-types';
import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

const HighlightLink = ({ link, text }) => (
  <span className="inline-flex items-center">
    <a href={link} className="standard-link">
      {text}
    </a>{' '}
    <ExternalLinkIcon className="inline-block text-blueGray-400 w-4 h-4" />
  </span>
);

HighlightLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const HighlightVideos = ({ highlightlinks }) => {
  if (!highlightlinks) return null;

  let highlightObject;

  if (highlightlinks) {
    try {
      highlightObject = JSON.parse(highlightlinks);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`Could not parse highlightlinks`, highlightlinks);
      return null;
    }
  }
  if (!highlightObject) return null;

  return (
    <div>
      <h3 className="text-3xl font-yrsa font-medium text-gray-700 pt-4 pb-2">
        Highlights
      </h3>
      <ul className="md:text-lg list-disc list-inside text-blueGray-700">
        {highlightObject.qualifyingHighlights ? (
          <li className="mb-2">
            <HighlightLink
              link={highlightObject.qualifyingHighlights}
              text="Qualifying Highlights"
            />
          </li>
        ) : null}
        {highlightObject.sprintHighlights ? (
          <li className="mb-2">
            <HighlightLink
              link={highlightObject.sprintHighlights}
              text="Sprint Highlights"
            />
          </li>
        ) : null}
        {highlightObject.raceHighlights ? (
          <li>
            <HighlightLink
              link={highlightObject.raceHighlights}
              text="Race Highlights"
            />
          </li>
        ) : null}
      </ul>
    </div>
  );
};

HighlightVideos.propTypes = {
  highlightlinks: PropTypes.string,
};

HighlightVideos.defaultProps = {
  highlightlinks: null,
};

export default HighlightVideos;

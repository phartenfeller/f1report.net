import PropTypes from 'prop-types';
import React from 'react';

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
    <>
      <h3 className="text-3xl font-yrsa font-medium text-gray-700 pt-4 pb-2">
        Highlights
      </h3>
      <ul className="md:text-lg list-disc list-inside text-blueGray-700">
        {highlightObject.qualifyingHighlights ? (
          <li className="mb-2">
            <a
              href={highlightObject.qualifyingHighlights}
              className="standard-link"
            >
              Qualifying Highlights
            </a>
          </li>
        ) : null}
        {highlightObject.sprintHighlights ? (
          <li className="mb-2">
            <a
              href={highlightObject.sprintHighlights}
              className="standard-link"
            >
              Sprint Highlights
            </a>
          </li>
        ) : null}
        {highlightObject.raceHighlights ? (
          <li>
            <a href={highlightObject.raceHighlights} className="standard-link">
              Race Highlights
            </a>
          </li>
        ) : null}
      </ul>
    </>
  );
};

HighlightVideos.propTypes = {
  highlightlinks: PropTypes.string,
};

HighlightVideos.defaultProps = {
  highlightlinks: null,
};

export default HighlightVideos;

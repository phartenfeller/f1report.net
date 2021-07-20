import PropTypes from 'prop-types';
import React from 'react';

const RaceNotes = ({ racenotes }) => {
  if (!racenotes) return null;

  let notesArray;

  if (racenotes) {
    try {
      notesArray = JSON.parse(racenotes);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`Could not parse racenotes`, racenotes);
      return null;
    }
  }
  if (!notesArray || !notesArray.length || notesArray.length === 0) return null;

  return (
    <>
      <h3 className="text-3xl font-yrsa font-medium text-gray-700 pt-4 pb-2">
        Race Notes
      </h3>
      <ul className="md:text-lg list-disc list-inside text-blueGray-700">
        {notesArray.map((note) => (
          <li className="mb-4">
            <span>{note.text}</span>
            {note.refs.map((ref, i) => (
              <div className="ml-6 md:ml-12">
                <span className="text-blueGray-500">{`[${i + 1}]`}</span>
                <a href={ref.link} className="standard-link">
                  {ref.title}
                </a>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};

RaceNotes.propTypes = {
  racenotes: PropTypes.string,
};

RaceNotes.defaultProps = {
  racenotes: null,
};

export default RaceNotes;

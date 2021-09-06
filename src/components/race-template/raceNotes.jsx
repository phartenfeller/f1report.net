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
    <div className="col-span-2">
      <h3 className="text-3xl font-yrsa font-medium text-gray-700 pt-4 pb-2">
        Race Notes
      </h3>
      <div className="prose">
        <ul className="md:text-lg text-blueGray-700">
          {notesArray.map((note) => (
            <li className="mb-4" key={note.text}>
              <span>{note.text}</span>
              {note.refs.map((ref, i) => (
                <div className="ml-6 md:ml-12" key={ref.link}>
                  <span className="text-blueGray-500">{`[${i + 1}]`}</span>
                  <a
                    href={ref.link}
                    className="px-1 rounded hover:text-blueGray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {ref.title}
                  </a>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

RaceNotes.propTypes = {
  racenotes: PropTypes.string,
};

RaceNotes.defaultProps = {
  racenotes: null,
};

export default RaceNotes;

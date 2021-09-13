import PropTypes from 'prop-types';
import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

const NoteLink = ({ link, title, i }) => {
  // extract website from url
  let { hostname } = new URL(link);

  // eslint-disable-next-line default-case
  switch (hostname) {
    case 'youtu.be':
      hostname = 'youtube.com';
      break;
  }

  return (
    <div className="ml-6 md:ml-12 my-2 space-x-1">
      <span className="text-blueGray-600 font-light">{`[${i + 1}]`}</span>
      <a
        href={link}
        className="px-1 rounded hover:text-blueGray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        target="_blank"
        rel="noreferrer"
      >
        {title}
      </a>
      <ExternalLinkIcon className="inline-block text-blueGray-400 w-4 h-4" />
      <span className="text-blueGray-600 font-light">{`(${hostname})`}</span>
    </div>
  );
};

NoteLink.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
};

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
      <div className="prose" style={{ maxWidth: '90ch' }}>
        <ul className="md:text-lg text-blueGray-700">
          {notesArray.map((note) => (
            <li className="mb-4" key={note.text}>
              <span>{note.text}</span>
              {note.refs.map((ref, i) => (
                <NoteLink
                  link={ref.link}
                  title={ref.title}
                  i={i}
                  key={ref.link}
                />
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

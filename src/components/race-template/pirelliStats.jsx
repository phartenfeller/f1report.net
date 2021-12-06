/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

const TyreLogo = ({ num }) => {
  let color;

  switch (num) {
    case 1:
      color = '#FFFDFE';
      break;
    case 2:
      color = '#FFF267';
      break;
    case 3:
      color = '#FF4E3F';
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn('Unhandeled TyreLogo =>', num);
  }

  return (
    <div className="w-12 h-12 mx-auto">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
        <circle cx="239.5" cy="239.5" r="218.5" fill="#1E2427" />
        <circle cx="240" cy="240" r="109" fill="#B4BDC1" />
        <circle cx="240" cy="240" r="85" fill="#7A7B7B" />
        <path
          d="M427 240c0 103.277-83.723 187-187 187S53 343.277 53 240 136.723 53 240 53s187 83.723 187 187zm-356.764 0c0 93.758 76.006 169.764 169.764 169.764 93.758 0 169.764-76.006 169.764-169.764 0-93.758-76.006-169.763-169.764-169.763-93.758 0-169.763 76.005-169.763 169.763z"
          fill={color}
        />
      </svg>
    </div>
  );
};

const TyreSelection = ({ startcompound, grandPrix, year }) => {
  const tyres = new Array(5).fill(null);
  for (let i = 0; i < 3; i += 1) {
    tyres[startcompound - 1 + i] = i + 1;
  }

  let sentence;

  switch (startcompound) {
    case 1:
      sentence = `The hardest tyre combination of C1, C2 and C3 was selected for the ${grandPrix} ${year}.`;
      break;
    case 2:
      sentence = `The medium tyre combination of C2, C3, C4 was selected for the ${grandPrix} ${year}.`;
      break;
    case 3:
      sentence = `The softest tyre combination of C3, C4, C5 was selected for the ${grandPrix} ${year}.`;
      break;
    default:
      sentence = null;
  }

  return (
    <>
      <h3 className="text-3xl font-bold mb-4 font-yrsa text-blueGray-800">
        Tyre selection
      </h3>
      <div className="grid grid-cols-5 select-none" aria-hidden="true">
        {tyres.map((tyre, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="w-16 text-center">
            <div className="mx-auto">
              <div className="font-semibold text-xl mb-3 text-blueGray-600">
                {`C${i + 1}`}
              </div>
              <div>
                {tyre ? (
                  <TyreLogo num={tyre} />
                ) : (
                  <span className="text-3xl text-blueGray-400">-</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="text-gray-700">{sentence}</div>
        <div className="mt-4 flex border border-gray-300 rounded-lg overflow-hidden">
          <div className="px-4 flex items-center bg-gray-100">
            <QuestionMarkCircleIcon className="text-gray-400 h-8 w-8" />
          </div>
          <span className="py-1 px-3 text-gray-600">
            Out of five possible tyre combinations Pirelli selects three for
            each race weekend. C1 is the hardest available tyre and C5 is the
            softest one. Intermediate and wet tyres are the same each weekend.
          </span>
        </div>
      </div>
    </>
  );
};

const TyreRegulations = ({
  eoscamperlimitfront,
  eoscamperlimitrear,
  minstartingpressurefront,
  minstartingpressurerear,
}) => (
  <>
    <h3 className="text-3xl font-bold mb-4 font-yrsa text-blueGray-800">
      Tyre regulations
    </h3>
    <table className="text-xl">
      <thead>
        <tr>
          <th className="text-left px-6 pb-2 text-blueGray-600 font-base">
            Category
          </th>
          <th className="text-center px-6 pb-2 text-blueGray-600 font-base">
            Front
          </th>
          <th className="text-center px-6 pb-2 text-blueGray-600 font-base">
            Rear
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-blueGray-800 px-6 py-1">
            Min. Starting Pressures
          </td>
          <td className="text-blueGray-600 px-6 py-1 text-center">
            {minstartingpressurefront.toFixed(1)} psi
          </td>
          <td className="text-blueGray-600 px-6 py-1 text-center">
            {minstartingpressurerear.toFixed(1)} psi
          </td>
        </tr>
        <tr>
          <td className="text-blueGray-800 px-6 py-1">EOS Camper Limit</td>
          <td className="text-blueGray-600 px-6 py-1 text-center">
            {eoscamperlimitfront.toFixed(2)}°
          </td>
          <td className="text-blueGray-600 px-6 py-1 text-center">
            {eoscamperlimitrear.toFixed(2)}°
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

function getBlockColor(i, value) {
  if (i + 1 > value) {
    return '#ebf0f5';
  }

  switch (i + 1) {
    case 1:
      return '#67E8F9';
    case 2:
      return '#38BDF8';
    case 3:
      return '#3B82F6';
    case 4:
      return '#4F46E5';
    case 5:
      return '#6D28D9';
    default:
      return null;
  }
}

const CharacteristicsBlock = ({ name, value }) => {
  const blocks = new Array(5).fill(null);

  return (
    <div className="mt-5 max-w-xl">
      <dl className="flex justify-between mr-2 mb-2">
        <dt>
          <h4 className="text-xl font-medium tracking-tight text-blueGray-700">
            {name}
          </h4>
        </dt>
        <dd className="text-xl font-light">{`${value} / 5`}</dd>
      </dl>
      <div className="grid grid-cols-5">
        {blocks.map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="h-6 mr-2 rounded"
            style={{ background: getBlockColor(i, value) }}
          />
        ))}
      </div>
    </div>
  );
};

const PirelliStats = ({ data, grandPrix, year }) => {
  const {
    pirellisource,
    startcompound,
    traction,
    braking,
    lateral,
    tyrestress,
    asphaltgrip,
    asphaltabrasion,
    downforce,
    eoscamperlimitfront,
    eoscamperlimitrear,
    minstartingpressurefront,
    minstartingpressurerear,
  } = data;

  return (
    <div className="rounded-lg shadow-muted w-full p-6 bg-white max-w-5xl mx-auto">
      <div className="space-y-8 sm:space-y-0 sm:flex justify-between">
        <div className="sm:w-1/2">
          <TyreSelection
            startcompound={startcompound}
            grandPrix={grandPrix}
            year={year}
          />
        </div>
        <div>
          <TyreRegulations
            eoscamperlimitfront={eoscamperlimitfront}
            eoscamperlimitrear={eoscamperlimitrear}
            minstartingpressurefront={minstartingpressurefront}
            minstartingpressurerear={minstartingpressurerear}
          />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold mt-8 mb-4 font-yrsa text-blueGray-800">
          Pirelli Track Characteristics
        </h3>
        <CharacteristicsBlock name="Traction" value={traction} />
        <CharacteristicsBlock name="Braking" value={braking} />
        <CharacteristicsBlock name="Lateral" value={lateral} />
        <CharacteristicsBlock name="Tyre Stress" value={tyrestress} />
        <CharacteristicsBlock name="Asphalt Grip" value={asphaltgrip} />
        <CharacteristicsBlock name="Asphalt Brasion" value={asphaltabrasion} />
        <CharacteristicsBlock name="Downforce" value={downforce} />
      </div>
      <div className="text-right mt-3">
        <a href={pirellisource} className="text-lg black-link">
          Source: Pirelli
        </a>
      </div>
    </div>
  );
};

PirelliStats.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.shape(PropTypes.any),
  grandPrix: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default PirelliStats;

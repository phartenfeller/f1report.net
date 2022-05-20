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
    <div className="mx-auto h-12 w-12">
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

function getDesc({ tyreArr, grandPrix, year }) {
  const tyreSelection = [];
  tyreArr.forEach((tyre, i) => {
    if (tyre) tyreSelection.push(i + 1);
  });
  const text = tyreSelection.join('-');

  switch (text) {
    case '1-2-3':
      return `The hardest compound combination of C1, C2 and C3 was selected for the ${grandPrix} ${year}.`;
    case '2-3-4':
      return `The medium compound combination of C2, C3, C4 was selected for the ${grandPrix} ${year}.`;
    case '3-4-5':
      return `The softest compound combination of C3, C4, C5 was selected for the ${grandPrix} ${year}.`;
    case '2-3-5':
      return `The C4 compound was skipped in favor of C5 in the ${grandPrix} ${year}.`;
    default:
      return null;
  }
}

const TyreSelection = ({ startcompound, compoundarr, grandPrix, year }) => {
  if (!startcompound && !compoundarr) return <span>No data available!</span>;

  const tyres = new Array(5).fill(null);

  if (startcompound) {
    for (let i = 0; i < 3; i += 1) {
      tyres[startcompound - 1 + i] = i + 1;
    }
  } else {
    const cpArr = JSON.parse(compoundarr);
    cpArr.forEach((tyreNum, i) => {
      tyres[tyreNum - 1] = i + 1;
    });
  }

  const sentence = getDesc({ tyreArr: tyres, grandPrix, year });

  return (
    <>
      <h3 className="mb-4 font-yrsa text-3xl font-bold text-slate-800">
        Tyre selection
      </h3>
      <div className="grid select-none grid-cols-5" aria-hidden="true">
        {tyres.map((tyre, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="w-16 text-center">
            <div className="mx-auto">
              <div className="mb-3 text-xl font-semibold text-slate-600">
                {`C${i + 1}`}
              </div>
              <div>
                {tyre ? (
                  <TyreLogo num={tyre} />
                ) : (
                  <span className="text-3xl text-slate-400">-</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="text-zinc-700">{sentence}</div>
        <div className="mt-4 flex overflow-hidden rounded-lg border border-zinc-300">
          <div className="flex items-center bg-zinc-100 px-4">
            <QuestionMarkCircleIcon className="h-8 w-8 text-zinc-400" />
          </div>
          <p className="py-1 px-3 text-zinc-600">
            Out of five possible tyre compounds Pirelli selects a set of three
            for each race weekend. C1 is the hardest available tyre and C5 is
            the softest one. Intermediate and wet tyres are the same each
            weekend. The hardest tyre in a reace is always coloured white, the
            middle one yellow and the softest one red.
          </p>
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
    <h3 className="mb-4 font-yrsa text-3xl font-bold text-slate-800">
      Tyre regulations
    </h3>
    <table className="text-xl">
      <thead>
        <tr>
          <th className="font-base px-6 pb-2 text-left text-slate-600">
            Category
          </th>
          <th className="font-base px-6 pb-2 text-center text-slate-600">
            Front
          </th>
          <th className="font-base px-6 pb-2 text-center text-slate-600">
            Rear
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-6 py-1 text-slate-800">Min. Starting Pressures</td>
          <td className="px-6 py-1 text-center text-slate-600">
            {minstartingpressurefront.toFixed(1)} psi
          </td>
          <td className="px-6 py-1 text-center text-slate-600">
            {minstartingpressurerear.toFixed(1)} psi
          </td>
        </tr>
        <tr>
          <td className="px-6 py-1 text-slate-800">EOS Camber Limit</td>
          <td className="px-6 py-1 text-center text-slate-600">
            {eoscamperlimitfront.toFixed(2)}°
          </td>
          <td className="px-6 py-1 text-center text-slate-600">
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
    case 6:
      return '#8928d9';
    default:
      return null;
  }
}

const CharacteristicsBlock = ({ name, value }) => {
  const blocks = new Array(5).fill(null);

  return (
    <div className="mt-5 max-w-xl">
      <dl className="mr-2 mb-2 flex justify-between">
        <dt>
          <h4 className="text-xl font-medium tracking-tight text-slate-700">
            {name}
          </h4>
        </dt>
        <dd className="">
          <span className="text-xl">{value}</span>
          <span className="text-sm font-light text-slate-400"> / 5</span>
        </dd>
      </dl>
      <div className="grid grid-cols-5">
        {blocks.map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="mr-2 h-6 rounded"
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
    compoundarr,
    traction,
    braking,
    lateral,
    tyrestress,
    trackevolution,
    asphaltgrip,
    asphaltabrasion,
    downforce,
    eoscamperlimitfront,
    eoscamperlimitrear,
    minstartingpressurefront,
    minstartingpressurerear,
  } = data;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-lg bg-white p-6 shadow-muted">
      <div className="justify-between space-y-8 sm:flex sm:space-y-0">
        <div className="sm:w-1/2">
          <TyreSelection
            startcompound={startcompound}
            compoundarr={compoundarr}
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
        <h3 className="mt-8 mb-4 font-yrsa text-3xl font-bold text-slate-800">
          Pirelli Track Characteristics
        </h3>
        <CharacteristicsBlock name="Traction" value={traction} />
        <CharacteristicsBlock name="Braking" value={braking} />
        <CharacteristicsBlock name="Lateral" value={lateral} />
        <CharacteristicsBlock name="Tyre Stress" value={tyrestress} />
        {trackevolution && (
          <CharacteristicsBlock name="Track Evolution" value={trackevolution} />
        )}
        <CharacteristicsBlock name="Asphalt Grip" value={asphaltgrip} />
        <CharacteristicsBlock name="Asphalt Abrasion" value={asphaltabrasion} />
        <CharacteristicsBlock name="Downforce" value={downforce} />
      </div>
      <div className="mt-3 text-right">
        <a href={pirellisource} className="black-link text-lg">
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
  year: PropTypes.string.isRequired,
};

export default PirelliStats;

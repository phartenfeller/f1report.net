import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import useCurrentData from '../../hooks/useCurrentData';

function getText(event, dateString) {
  if (!dateString) {
    return null;
  }

  const timeMs = new Date(dateString) - new Date(new Date().toDateString());

  if (timeMs > 0) {
    const timeDays = Math.floor(timeMs / (1000 * 60 * 60 * 24));
    if (timeDays === 0) {
      return `${event} is today`;
    }
    return `${event} in ${timeDays} days`;
  }
  return `${event} ✅`;
}

const LpNextRaceCountdown = () => {
  const { nextRace } = useCurrentData();
  const [countdownState, setCountdownState] = useState({ loaded: false });
  useEffect(() => {
    const state = {
      loaded: true,
      fp1: getText('FP1', nextRace.fp1Date),
      quali: getText('Qualifying', nextRace.qualiDate),
      sprint: getText('Sprint', nextRace.sprintDate),
      race: getText('Race', nextRace.date),
    };
    setCountdownState(state);
  }, [nextRace, setCountdownState]);

  if (!nextRace) {
    return <div>No data on next race</div>;
  }
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-xl font-semibold tracking-wide text-zinc-900">
          Next Race
        </h2>
        <Link
          className="standard-link font-light uppercase"
          to={`/races/${nextRace.raceSlug}`}
          title="Next Race Details"
        >
          more
          <span className="sr-only">details on next race</span>
        </Link>
      </div>

      <div className="inline-block min-w-full py-2 align-middle">
        <div className="verflow-hidden border-2 border-zinc-300/50 p-2 sm:rounded-lg">
          <h3 className="mb-3 text-xl font-light">
            {nextRace.name} {nextRace.year}
          </h3>
          {countdownState.loaded && (
            <ul className="list-inside list-disc pl-2 text-slate-800">
              {countdownState.fp1 && <li>{countdownState.fp1}</li>}
              {countdownState.quali && <li>{countdownState.quali}</li>}
              {countdownState.sprint && <li>{countdownState.sprint}</li>}
              {countdownState.race && <li>{countdownState.race}</li>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

LpNextRaceCountdown.propTypes = {};

export default LpNextRaceCountdown;

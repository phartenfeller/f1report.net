import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import useCurrentData from '../../hooks/useCurrentData';

const LpNextRaceCountdown = () => {
  const { nextRace } = useCurrentData();
  const [raceDays, setRaceDays] = useState('?');
  const [fp1Days, setFp1Days] = useState('FP1: ?');

  useEffect(() => {
    const diffInMs =
      new Date(nextRace.date) - new Date(new Date().toDateString());
    setRaceDays(Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

    const diffInMsFp1 =
      new Date(nextRace.fp1Date) - new Date(new Date().toDateString());
    if (diffInMsFp1 > 0) {
      setFp1Days(
        `FP1 in ${Math.floor(diffInMsFp1 / (1000 * 60 * 60 * 24))} days`
      );
    } else {
      setFp1Days('FP1 ✅');
    }
  }, [nextRace, setRaceDays, setFp1Days]);

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
        >
          more
        </Link>
      </div>

      <div className="inline-block min-w-full py-2 align-middle">
        <div className="verflow-hidden border-2 border-zinc-300/50 p-2 sm:rounded-lg">
          <h3 className="mb-3 text-xl font-light">
            {nextRace.name} {nextRace.year}
          </h3>
          <ul className="list-inside list-disc pl-2 text-slate-800">
            <li>{fp1Days}</li>
            <li>Race in {raceDays} days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

LpNextRaceCountdown.propTypes = {};

export default LpNextRaceCountdown;

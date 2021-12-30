import PropTypes from 'prop-types';
import React from 'react';
import { constructorType, driverType } from '../../types';
import classNames from '../../util/classNames';
import TeamDisplay from '../teamDisplay/teamDisplay';

const getRankText = (rank) => {
  switch (rank) {
    case 1:
      return ['1st', 'first-styles'];
    case 2:
      return ['2nd', 'second-styles'];
    case 3:
      return ['3rd', 'third-styles'];
    default:
      return [`${rank}th`, 'other-rank-styles'];
  }
};

const ListItem = ({ rank, name, count, last, category, team = false }) => {
  const [rankText, rankClass] = getRankText(rank);

  return (
    <li
      className={classNames(
        'grid grid-cols-3 py-2 items-center',
        last ? null : 'border-b border-zinc-200'
      )}
    >
      <span className={rankClass}>{rankText}</span>
      {team ? (
        <TeamDisplay teamName={name} textClasses="text-slate-600" />
      ) : (
        <span className="text-slate-600">{name}</span>
      )}
      <span className="text-slate-600 text-right">{`${count} ${category}`}</span>
    </li>
  );
};

ListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  team: PropTypes.bool,
};

ListItem.defaultProps = {
  team: false,
};

const TeamCard = ({ list, allConstructorTeamsList, category }) => {
  if (!list) return <></>;

  const teamArray = JSON.parse(list).sort((a, b) => a.rank - b.rank);

  return (
    <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
      <h4 className="font-bold text-xl mb-6 tracking-wide text-zinc-900">
        {`Most constructor ${category}`}
      </h4>
      <ol>
        {teamArray.map((p, i) => {
          const constructor = allConstructorTeamsList.find(
            (c) => parseInt(c.constructorid) === parseInt(p.constructorid)
          ).name;

          return (
            <ListItem
              key={p.rank}
              rank={p.rank}
              name={constructor}
              count={p.cnt}
              last={i === teamArray.length - 1}
              category={category}
              team
            />
          );
        })}
      </ol>
    </div>
  );
};

TeamCard.propTypes = {
  list: PropTypes.string.isRequired,
  allConstructorTeamsList: PropTypes.arrayOf(constructorType).isRequired,
  category: PropTypes.string.isRequired,
};

const DriverCard = ({ list, allDriversList, category }) => {
  if (!list) return <></>;

  const driverArray = JSON.parse(list).sort((a, b) => a.rank - b.rank);

  return (
    <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
      <h4 className="font-bold text-xl mb-6 tracking-wide text-zinc-900">
        {`Most driver ${category}`}
      </h4>
      <ol>
        {driverArray.map((p, i) => {
          const name = allDriversList.find(
            (c) => parseInt(c.driverid) === parseInt(p.driverId)
          ).driverDisplayName;

          return (
            <ListItem
              key={p.rank}
              rank={p.rank}
              name={name}
              count={p.cnt}
              last={i === driverArray.length - 1}
              category={category}
            />
          );
        })}
      </ol>
    </div>
  );
};

DriverCard.propTypes = {
  list: PropTypes.string.isRequired,
  allDriversList: PropTypes.arrayOf(driverType).isRequired,
  category: PropTypes.string.isRequired,
};

const CircuitPerformanceStats = ({
  allConstructorTeamsList,
  allDriversList,
  mostconstructorpodiums,
  mostcostructorwins,
  mostdriverpodiums,
  mostdriverstarts,
  mostdriverwins,
}) => {
  if (!mostconstructorpodiums && !mostdriverpodiums && !mostdriverstarts) {
    return <div className="text-2xl">No data yet!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-12">
      <DriverCard
        list={mostdriverwins}
        allDriversList={allDriversList}
        category="wins"
      />
      <DriverCard
        list={mostdriverpodiums}
        allDriversList={allDriversList}
        category="podiums"
      />
      <DriverCard
        list={mostdriverstarts}
        allDriversList={allDriversList}
        category="starts"
      />
      <TeamCard
        list={mostcostructorwins}
        allConstructorTeamsList={allConstructorTeamsList}
        category="wins"
      />
      <TeamCard
        list={mostconstructorpodiums}
        allConstructorTeamsList={allConstructorTeamsList}
        category="podiums"
      />
    </div>
  );
};

CircuitPerformanceStats.propTypes = {
  mostconstructorpodiums: PropTypes.string,
  mostcostructorwins: PropTypes.string,
  mostdriverpodiums: PropTypes.string,
  mostdriverstarts: PropTypes.string,
  mostdriverwins: PropTypes.string,
  allConstructorTeamsList: PropTypes.arrayOf(constructorType).isRequired,
  allDriversList: PropTypes.arrayOf(driverType).isRequired,
};

CircuitPerformanceStats.defaultProps = {
  mostconstructorpodiums: null,
  mostcostructorwins: null,
  mostdriverpodiums: null,
  mostdriverstarts: null,
  mostdriverwins: null,
};

export default CircuitPerformanceStats;

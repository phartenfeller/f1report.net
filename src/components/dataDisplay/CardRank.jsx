import PropTypes from 'prop-types';
import React from 'react';
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

const CardRank = ({ rank, name, value, last, team = false }) => {
  const [rankText, rankClass] = getRankText(rank);

  return (
    <li>
      <dl
        className={classNames(
          'grid grid-cols-3 py-2 items-center',
          last ? null : 'border-b border-gray-200'
        )}
      >
        <span className={rankClass}>{rankText}</span>
        {team ? (
          <TeamDisplay teamName={name} textClasses="text-blueGray-600" />
        ) : (
          <dt className="text-blueGray-600">{name}</dt>
        )}
        <dd className="text-blueGray-700 text-lg font-semibold text-right">
          {value}
        </dd>
      </dl>
    </li>
  );
};

CardRank.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired,
  team: PropTypes.bool,
};

CardRank.defaultProps = {
  team: false,
};

export default CardRank;

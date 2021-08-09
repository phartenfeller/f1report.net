import PropTypes from 'prop-types';
import React from 'react';
import getTeamColor from '../../util/f1TeamColors';

const TeamDisplay = ({ teamName, textClasses = '' }) => {
  if (!teamName) {
    return null;
  }

  const color = getTeamColor(teamName);

  return (
    <div className="inline-flex items-center">
      <div
        aria-hidden="true"
        className="h-4 w-4 rounded-full mr-2"
        style={{ background: color }}
      />
      <span className={textClasses}>{teamName}</span>
    </div>
  );
};

TeamDisplay.propTypes = {
  teamName: PropTypes.string,
  textClasses: PropTypes.string,
};

TeamDisplay.defaultProps = {
  teamName: null,
  textClasses: '',
};

export default TeamDisplay;

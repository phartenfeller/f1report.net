import PropTypes from 'prop-types';
import React from 'react';
import getTeamColor from '../../util/f1TeamColors';

const TeamDisplay = ({ teamName, textClasses = '' }) => {
  const color = getTeamColor(teamName);

  return (
    <div className="inline-flex items-center">
      <div
        className="h-4 w-4 rounded-full mr-2"
        style={{ background: color }}
      />
      <span className={textClasses}>{teamName}</span>
    </div>
  );
};

TeamDisplay.propTypes = {
  teamName: PropTypes.string.isRequired,
  textClasses: PropTypes.string,
};

TeamDisplay.defaultProps = {
  textClasses: '',
};

export default TeamDisplay;

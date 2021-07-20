import PropTypes from 'prop-types';
import React from 'react';
import useConsentState from '../state/useConsentState';

import '../styles/yt-player.css';

const YouTubePlayer = ({ url }) => {
  const { ytConsent, setYouTube } = useConsentState();
  const videoID = url.replace(/.*?v=/, '');

  return (
    <div className="video-wrapper my-6">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${videoID}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

YouTubePlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default YouTubePlayer;

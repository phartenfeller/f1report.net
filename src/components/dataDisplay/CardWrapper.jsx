import PropTypes from 'prop-types';
import React from 'react';

const CardWrapper = ({ note = null, children }) => (
  <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
    {children}
    {note ? (
      <div className="mt-3 text-zinc-500 font-light">{`* ${note}`}</div>
    ) : null}
  </div>
);

CardWrapper.propTypes = {
  note: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

CardWrapper.defaultProps = {
  note: null,
};

export default CardWrapper;

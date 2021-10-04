import PropTypes from 'prop-types';
import React from 'react';

const CardWrapper = ({ note = null, children }) => (
  <div className="px-4 py-5 bg-white shadow-muted rounded-lg overflow-hidden sm:p-6">
    {children}
    {note ? (
      <div className="mt-3 text-gray-500 font-light">{`* ${note}`}</div>
    ) : null}
  </div>
);

CardWrapper.propTypes = {
  note: PropTypes.string,
  children: PropTypes.element.isRequired,
};

CardWrapper.defaultProps = {
  note: null,
};

export default CardWrapper;

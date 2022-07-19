/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import SortableTable from '../sortableTable';

const InlineHtml = ({ value, classes }) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: value }} className={classes} />
);

const BlogTable = ({ data, columns, sortBy, sortDirection }) => {
  const defaultSort = [
    {
      id: sortBy,
      desc: sortDirection === 'desc',
    },
  ];

  const computedCols = useMemo(
    () =>
      columns
        .filter((col) => typeof col.hidden !== 'boolean' || !col.hidden)
        .map((col) => {
          if (typeof col.isHtml === 'boolean' && col.isHtml === true) {
            return {
              ...col,
              // eslint-disable-next-line react/no-unstable-nested-components
              Cell: ({ value }) => (
                <InlineHtml value={value} classes={col.classes} />
              ),
            };
          }

          return {
            ...col,
            // eslint-disable-next-line react/no-unstable-nested-components
            Cell: ({ value }) => <div className={col.classes}>{value}</div>,
          };
        }),
    [columns]
  );

  return (
    <div className="not-prose w-full max-w-[92vw] overflow-hidden overflow-x-auto">
      <SortableTable
        columns={computedCols}
        data={data}
        defaultSort={defaultSort}
      />
    </div>
  );
};

BlogTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
};

export default BlogTable;

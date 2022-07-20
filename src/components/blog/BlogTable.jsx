/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'gatsby';
import SortableTable from '../sortableTable';

const Discl = ({ children }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button className="flex rounded-md py-1 px-2 ring-1 ring-zinc-200 hover:bg-white focus:outline-none focus:ring-blue-300">
          <span>Expand</span>
          {/*
              Use the `open` render prop to rotate the icon when the panel is open
            */}
          <ChevronRightIcon
            className={`h-4 w-4 text-zinc-400 ${
              open ? 'rotate-90 transform' : ''
            }`}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          {children}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

const InlineHtml = ({ value, classes, disclosure = false }) => {
  if (disclosure) {
    return (
      <Discl>
        <div dangerouslySetInnerHTML={{ __html: value }} className={classes} />
      </Discl>
    );
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: value }} className={classes} />
  );
};

const placeholdersRegex = /\$.*\$/gim;
const ColLink = ({ value, classes, row, link }) => {
  let m;
  let finishedLink = link;

  // eslint-disable-next-line no-cond-assign
  while ((m = placeholdersRegex.exec(link)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === placeholdersRegex.lastIndex) {
      placeholdersRegex.lastIndex += 1;
    }

    // The result can be accessed through the `m`-variable.
    // eslint-disable-next-line no-loop-func
    m.forEach((match) => {
      const accessor = match.replace(/\$/g, '');
      const val = row.original[accessor];

      finishedLink = finishedLink.replace(match, val);
    });
  }

  return (
    <Link to={finishedLink} className={classes}>
      {value}
    </Link>
  );
};

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
                <InlineHtml
                  value={value}
                  classes={col.classes}
                  disclosure={col.disclosure}
                />
              ),
            };
          }

          if (col.link) {
            return {
              ...col,
              // eslint-disable-next-line react/no-unstable-nested-components
              Cell: ({ value, row }) => (
                <ColLink
                  value={value}
                  classes={col.classes}
                  row={row}
                  link={col.link}
                />
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

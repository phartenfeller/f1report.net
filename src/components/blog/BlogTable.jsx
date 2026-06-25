import React, { useMemo } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import SortableTable from '../SortableTable.jsx';
import TeamDisplay from '../teamDisplay/TeamDisplay.jsx';

const Discl = ({ children }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <DisclosureButton className="flex rounded-md py-1 px-2 ring-1 ring-zinc-200 hover:bg-white focus:outline-none focus:ring-blue-300">
          <span>Expand</span>
          <ChevronRightIcon
            className={`h-4 w-4 text-zinc-400 ${
              open ? 'rotate-90 transform' : ''
            }`}
          />
        </DisclosureButton>
        <DisclosurePanel className="text-gray-500">
          {children}
        </DisclosurePanel>
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

  while ((m = placeholdersRegex.exec(link)) !== null) {
    if (m.index === placeholdersRegex.lastIndex) {
      placeholdersRegex.lastIndex += 1;
    }

    m.forEach((match) => {
      const accessor = match.replace(/\$/g, '');
      const val = row.original[accessor];
      finishedLink = finishedLink.replace(match, val);
    });
  }

  // Use simple anchor tag for Astro MPA
  return (
    <a href={finishedLink} className={classes}>
      {value}
    </a>
  );
};

const BlogTable = ({ data, columns, sortBy, sortDirection }) => {
  const defaultSort = useMemo(() => [
    {
      id: sortBy,
      desc: sortDirection === 'desc',
    },
  ], [sortBy, sortDirection]);

  const computedCols = useMemo(
    () =>
      columns
        .filter((col) => typeof col.hidden !== 'boolean' || !col.hidden)
        .map((col) => {
          if (typeof col.isHtml === 'boolean' && col.isHtml === true) {
            return {
              ...col,
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

          if (col.teamDisplay && col.teamDisplay === true) {
            return {
              ...col,
              Cell: ({ value }) => (
                <TeamDisplay teamName={value} textClasses={col.classes} />
              ),
            };
          }

          return {
            ...col,
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

export default BlogTable;

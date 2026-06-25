import React, { useMemo } from 'react';
import SortableTable from './SortableTable';

// Helper for slugs since they aren't in the DB row directly for legacy
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-'); 
}

const LegacyConstructorsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Franchise Name',
        accessor: 'legacy_name',
        className: 'font-semibold',
        Cell: ({ row, value }) => (
            <div className="flex items-center space-x-2">
                {row.original.legacy_color && (
                    <span 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: row.original.legacy_color }}
                    />
                )}
                <span>{value}</span>
            </div>
        )
      },
      {
        Header: 'Combined Races',
        accessor: 'races',
      },
      {
        Header: 'Combined Wins',
        accessor: 'wins',
      },
      {
        Header: 'Combined Podiums',
        accessor: 'podiums',
      },
      {
        Header: 'Combined Points',
        accessor: 'points',
      },
      {
        Header: 'More Info',
        id: 'link', // Helper column
        accessor: (row) => slugify(row.legacy_name),
        Cell: ({ value }) => (
            <a 
                href={`/constructors-legacy/${value}`} 
                className="text-blue-600 hover:text-blue-800 hover:underline"
            >
                Stats
            </a>
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  const defaultSort = useMemo(() => [
    {
      id: 'points',
      desc: true,
    },
  ], []);

  return (
    <div className="w-full">
      <SortableTable
        columns={columns}
        data={data}
        defaultSort={defaultSort}
        pagination={20}
      />
    </div>
  );
};

export default LegacyConstructorsTable;

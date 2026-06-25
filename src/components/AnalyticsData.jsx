import React, { useMemo } from 'react';
import SortableTable from './SortableTable';

export default function AnalyticsData({ data }) {
    // data is the parsed JSON object
    if (!data) return null;

    const { 
        races, overallRaces, 
        wins, podiums, top10, 
        avgPosition, avgGridPosition,
        driverTitles, constructorTitles 
    } = data;

    const raceCount = races !== undefined ? races : overallRaces;

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Races" value={raceCount} />
                <StatCard title="Wins" value={wins} />
                <StatCard title="Podiums" value={podiums} />
                <StatCard title="Top 10s" value={top10} />
                <StatCard title="Avg Position" value={avgPosition} />
                <StatCard title="Avg Grid Pos" value={avgGridPosition} />
                {driverTitles > 0 && <StatCard title="Driver Titles" value={driverTitles} />}
                {constructorTitles > 0 && <StatCard title="Constructor Titles" value={constructorTitles} />}
            </div>

            {data.topDrivers && (
                <div>
                   <h3 className="text-xl font-bold mb-4">Top Drivers</h3>
                   <SimpleTable 
                        data={data.topDrivers} 
                        columns={[
                            { Header: 'Driver', accessor: 'name', className: 'font-semibold' },
                            { Header: 'Wins', accessor: 'wins', className: 'text-right' },
                            { Header: 'Podiums', accessor: 'podiums', className: 'text-right' },
                            { Header: 'Points', accessor: 'points', className: 'text-right' },
                            { Header: 'Races', accessor: 'races', className: 'text-right' },
                        ]}
                        defaultSort={[{ id: 'points', desc: true }]}
                    />
                </div>
            )}

            {data.topTeams && (
                <div>
                   <h3 className="text-xl font-bold mb-4">Top Teams</h3>
                   <SimpleTable 
                        data={data.topTeams} 
                        columns={[
                            { Header: 'Team', accessor: 'name', className: 'font-semibold' },
                            { Header: 'Wins', accessor: 'wins', className: 'text-right' },
                            { Header: 'Podiums', accessor: 'podiums', className: 'text-right' },
                            { Header: 'Points', accessor: 'points', className: 'text-right' },
                            { Header: 'Races', accessor: 'races', className: 'text-right' },
                        ]}
                        defaultSort={[{ id: 'points', desc: true }]}
                    />
                </div>
            )}

            {data.topCircuits && (
                <div>
                   <h3 className="text-xl font-bold mb-4">Top Circuits</h3>
                   <SimpleTable 
                        data={data.topCircuits} 
                        columns={[
                            { Header: 'Circuit', accessor: 'name', className: 'font-semibold' },
                            { Header: 'Wins', accessor: 'wins', className: 'text-right  ' },
                            { Header: 'Avg Points', accessor: 'avgPoints', className: 'text-right' },
                            { Header: 'Races', accessor: 'races', className: 'text-right' },
                        ]}
                        defaultSort={[{ id: 'avgPoints', desc: true }]}
                    />
                </div>
            )}
             {/* Add history etc if needed */}
        </div>
    );
}

function StatCard({ title, value }) {
    if (value === undefined || value === null) return null;
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-gray-800 mb-1">{value}</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{title}</span>
        </div>
    );
}

function SimpleTable({ data, columns, defaultSort }) {
    const tableColumns = useMemo(() => columns, [columns]);
    const ds = useMemo(() => defaultSort || [{ id: 'wins', desc: true }], []);

    return (
        <SortableTable
            columns={tableColumns}
            data={data}
            defaultSort={ds}
            pagination={10}
        />
    )
}

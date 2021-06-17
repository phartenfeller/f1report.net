import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

/*
select count(*), year, ct.name as constructor
  from laptimes l
  join races ra
    on l.raceid = ra.raceid
  join drivers d on d.driverid = l.driverid
  and d.surname = 'Vettel'
  join results r
    on d.driverid = r.driverid
   and ra.raceid = r.raceid
  join constructor_teams ct on r.constructorid = ct.constructorid
where l.position = 1
group by year, ct.name
union
select 0 as count, 2020 as year, 'Ferrari' as constructor
*/
const leadingLapsPerYear = [
  {
    count: 0,
    year: 2020,
    constructor: 'Ferrari',
  },
  {
    count: 1,
    year: 2014,
    constructor: 'Red Bull',
  },
  {
    count: 3,
    year: 2007,
    constructor: 'Toro Rosso',
  },
  {
    count: 4,
    year: 2021,
    constructor: 'Aston Martin',
  },
  {
    count: 49,
    year: 2008,
    constructor: 'Toro Rosso',
  },
  {
    count: 90,
    year: 2016,
    constructor: 'Ferrari',
  },
  {
    count: 160,
    year: 2019,
    constructor: 'Ferrari',
  },
  {
    count: 176,
    year: 2015,
    constructor: 'Ferrari',
  },
  {
    count: 212,
    year: 2009,
    constructor: 'Red Bull',
  },
  {
    count: 286,
    year: 2017,
    constructor: 'Ferrari',
  },
  {
    count: 345,
    year: 2018,
    constructor: 'Ferrari',
  },
  {
    count: 368,
    year: 2012,
    constructor: 'Red Bull',
  },
  {
    count: 382,
    year: 2010,
    constructor: 'Red Bull',
  },
  {
    count: 684,
    year: 2013,
    constructor: 'Red Bull',
  },
  {
    count: 739,
    year: 2011,
    constructor: 'Red Bull',
  },
];

/*
select round(avg(position), 2) as avg_pos, year, ct.name as constructor
  from results r
  join drivers d
    on r.driverid = d.driverid
   and d.surname = 'Vettel'
  join races r2 on r.raceid = r2.raceid
join constructor_teams ct on r.constructorid = ct.constructorid
 group by year, ct.name
;

*/
const avgPosPerYear = [
  // {
  //   avg_pos: 8,
  //   year: 2007,
  //   constructor: 'BMW Sauber',
  // },
  {
    avg_pos: 14.25,
    year: 2007,
    constructor: 'Toro Rosso',
  },
  {
    avg_pos: 7.17,
    year: 2008,
    constructor: 'Toro Rosso',
  },
  {
    avg_pos: 4.43,
    year: 2009,
    constructor: 'Red Bull',
  },
  {
    avg_pos: 3.63,
    year: 2010,
    constructor: 'Red Bull',
  },
  {
    avg_pos: 1.56,
    year: 2011,
    constructor: 'Red Bull',
  },
  {
    avg_pos: 4.42,
    year: 2012,
    constructor: 'Red Bull',
  },
  {
    avg_pos: 1.61,
    year: 2013,
    constructor: 'Red Bull',
  },
  {
    avg_pos: 5.06,
    year: 2014,
    constructor: 'Red Bull',
  },
  {
    avg_pos: 3.33,
    year: 2015,
    constructor: 'Ferrari',
  },
  {
    avg_pos: 4.06,
    year: 2016,
    constructor: 'Ferrari',
  },
  {
    avg_pos: 2.56,
    year: 2017,
    constructor: 'Ferrari',
  },
  {
    avg_pos: 3.15,
    year: 2018,
    constructor: 'Ferrari',
  },
  {
    avg_pos: 5.11,
    year: 2019,
    constructor: 'Ferrari',
  },
  {
    avg_pos: 10.4,
    year: 2020,
    constructor: 'Ferrari',
  },
  {
    avg_pos: 10.5,
    year: 2021,
    constructor: 'Aston Martin',
  },
];

function getLeadingLapsTooltip(obj) {
  return (
    <div className="bg-white p-2 rounded grid grid-cols-1">
      <span>{`Year: ${obj.point.data.x}`}</span>
      <span>{`Leading Laps: ${obj.point.data.y}`} </span>
      <span>{`Constructor: ${obj.point.data.constructor}`}</span>
    </div>
  );
}

function getAveragePosTooltip(obj) {
  return (
    <div className="bg-white p-2 rounded grid grid-cols-1">
      <span>{`Year: ${obj.point.data.x}`}</span>
      <span>{`Average Position: ${obj.point.data.y}`} </span>
      <span>{`Constructor: ${obj.point.data.constructor}`}</span>
    </div>
  );
}

const VettelAstonMartinReport = () => {
  const leadingLapsData = [
    {
      id: 'Leading Laps',
      color: '#015850',
      data: leadingLapsPerYear
        .map((d) => ({
          x: d.year,
          y: d.count,
          constructor: d.constructor,
        }))
        .sort((a, b) => a.x - b.x),
    },
  ];

  const avgPosData = [
    {
      id: 'Average Position',
      color: '#015850',
      data: avgPosPerYear
        .map((d) => ({
          x: d.year,
          y: d.avg_pos,
          constructor: d.constructor,
        }))
        .sort((a, b) => a.x - b.x),
    },
  ];

  return (
    <Layout>
      <SEO title="Sebastian Vettel at Aston Martin" />
      <h1>Sebastian Vettel</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

      <div style={{ height: '400px' }}>
        <ResponsiveLine
          tooltip={getAveragePosTooltip}
          data={avgPosData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Year',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Average Position',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh
          legends={[
            {
              anchor: 'top',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>

      <div style={{ height: '400px' }}>
        <ResponsiveLine
          tooltip={getLeadingLapsTooltip}
          data={leadingLapsData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Year',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Laps',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh
          legends={[
            {
              anchor: 'top',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default VettelAstonMartinReport;

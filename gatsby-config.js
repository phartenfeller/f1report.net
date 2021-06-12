module.exports = {
  siteMetadata: {
    title: `F1 Report`,
    description: `Data for every F1 race ever`,
    author: `@phartenfeller`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'races',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'races',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: './data/f1data.sqlite',
          },
          useNullAsDefault: true,
        },
        queryChain(x) {
          return x
            .select(
              'raceId',
              'race_slug',
              'year',
              'round',
              'race_name',
              'date',
              'time',
              'race_url',
              'circuit_name',
              'location',
              'country',
              'circuit_url'
            )
            .from('races_v');
        },
      },
    },
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'raceResult',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'raceResult',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: './data/f1data.sqlite',
          },
          useNullAsDefault: true,
        },
        queryChain(x) {
          return x
            .select(
              'resultId',
              'raceId',
              'number',
              'grid',
              'position',
              'positionOrder',
              'points',
              'laps',
              'time',
              'milliseconds',
              'fastestLap',
              'rank',
              'fastestLapTime',
              'fastestLapSpeed',
              'status',
              'driver_number',
              'driver_forename',
              'driver_surname',
              'driver_nationality',
              'driver_url',
              'constructor_name',
              'constructor_nationality',
              'constructor_url'
            )
            .from('race_results_v');
        },
      },
    },
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'lapTimes',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'lapTimes',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: './data/f1data.sqlite',
          },
          useNullAsDefault: true,
        },
        queryChain(x) {
          return x
            .select(
              'raceId',
              'lap',
              'position',
              'time',
              'milliseconds',
              'driver_forename',
              'driver_surname',
              'driver_number',
              'constructor_name'
            )
            .from('lap_times_v');
        },
      },
    },
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'avgLapTimes',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'avgLapTimes',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: './data/f1data.sqlite',
          },
          useNullAsDefault: true,
        },
        queryChain(x) {
          return x
            .select(
              'raceId',
              'avg_lapTime_s',
              'median_lapTime_s',
              'driver_forename',
              'driver_surname',
              'driver_number',
              'constructor_name'
            )
            .from('avg_lap_times');
        },
      },
    },
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'avgLapTimesTop70Pct',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'avgLapTimesTop70Pct',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: './data/f1data.sqlite',
          },
          useNullAsDefault: true,
        },
        queryChain(x) {
          return x
            .select(
              'raceId',
              'driver_forename',
              'driver_surname',
              'driver_number',
              'constructor_name',
              'driverId',
              'relevant_lap_count',
              'avg_lapTime_s'
            )
            .from('avg_lap_times_top_70_pct');
        },
      },
    },
  ],
};

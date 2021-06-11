module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
  ],
};

module.exports = {
  siteMetadata: {
    title: `F1 Report`,
    description: `Data for every Formula 1 race ever`,
    author: `Philipp Hartenfeller`,
    siteUrl: `https://f1report.xyz`,
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
        name: `Formula 1 Report`,
        short_name: `f1 report`,
        start_url: `/`,
        background_color: `#EF4444`,
        theme_color: `#EF4444`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://f1report.xyz/`,
      },
    },
    {
      // Querying to a SQLite database
      resolve: require.resolve(
        `/home/philipp/Code/_gatsby-sutff/gatsby-source-sqlite`
      ), // `gatsby-source-sqlite`,
      options: {
        fileName: './data/f1data.sqlite',
        cacheQueryResults: true,
        cacheTransformationByRowcount: false,
        queries: [
          {
            statement: `select * from races_v`,
            idFieldName: `raceId`,
            name: 'races',
          },
          {
            statement: `select * from drivers`,
            idFieldName: `driverId`,
            name: 'drivers',
            parents: [
              {
                parentName: 'lapTimes',
                foreignKey: 'driverId',
                cardinality: 'OneToOne',
              },
            ],
          },
          {
            statement: `select * from race_results_v`,
            idFieldName: `resultId`,
            name: `raceResult`,
            parents: [
              {
                parentName: 'races',
                foreignKey: 'raceId',
                cardinality: 'OneToMany',
              },
            ],
          },
          {
            statement: `select * from lap_times_v`,
            idFieldName: `lapId`,
            name: `lapTimes`,
            parents: [
              {
                parentName: 'races',
                foreignKey: 'raceId',
                cardinality: 'OneToMany',
              },
            ],
          },
          {
            statement: `select * from avg_lap_times`,
            idFieldName: `num_id`,
            name: `avgLapTimes`,
            parents: [
              {
                parentName: 'races',
                foreignKey: 'raceId',
                cardinality: 'OneToMany',
              },
            ],
          },
          {
            statement: `select * from avg_lap_times_top_70_pct`,
            idFieldName: `num_id`,
            name: `avgLapTimesTop70Pct`,
            parents: [
              {
                parentName: 'races',
                foreignKey: 'raceId',
                cardinality: 'OneToMany',
              },
            ],
          },
          {
            statement: `select * from avg_constructor_lap_times`,
            idFieldName: `num_id`,
            name: `avgConstructorLapTimes`,
            parents: [
              {
                parentName: 'races',
                foreignKey: 'raceId',
                cardinality: 'OneToMany',
              },
            ],
          },
          {
            statement: `select * from avg_constructor_lap_times_top_70_pct`,
            idFieldName: `num_id`,
            name: `avgConstructorLapTimes70Pct`,
            parents: [
              {
                parentName: 'races',
                foreignKey: 'raceId',
                cardinality: 'OneToMany',
              },
            ],
          },
        ],
      },
    },
  ],
};
